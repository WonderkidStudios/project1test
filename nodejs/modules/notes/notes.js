var resultingArray; 

//get he list of all notes available
exports.listAllNotes = function (models) {
  return function (req, res) {
    log.line ("listAllNotes");
 
    var modelNotes = models.Notes;

  	return modelNotes.find(function (err, notesA) {
      if (!err) {
        return res.send(200, prepareNoteResults(notesA)); //return the list
      } else {
        log.error(err);
        return res.send(500); //some unexpected error
      }
    });
  }

}

//create a new note
exports.createNote = function (models) {
  return function (req, res) {
    log.line ("createNote");

    var modelNotes = models.Notes;
    var note = new modelNotes({
      title: req.body.title,
    });

    note.save(function (err) {
      if (!err) {
        log.line("created");
        return res.send(201,prepareNoteResult(note)); //created
      } else {
        log.error(err);
        return res.send(500); //some unexpected error
      }
    });
    
  }
}

//update an existing note
exports.updateNote = function (models) {
  return function (req, res) {
    log.line ("updateNote");
    var modelNotes = models.Notes;
    
    return modelNotes.findById(req.body.id, function (err, note) {
      if  (!note)
      {
        log.warn("item "+req.body.id+" was not foud");
        return res.send(404, 'NOT FOUND');
      }
      note.title = req.body.title;
      
      return note.save(function (err) {
        if (!err) {
          log.line("updated");
          return res.send(200, prepareNoteResult(note)); //updated sucessfully
        } else {
          log.error(err);
          return res.send(500); //some unexpected error
        }
      });
    });
  }
}

//get a single note by id
exports.getNote = function (models) {
  return function (req, res) {
    log.line ("getNote");
    var modelNotes = models.Notes;  
    
    //log.line (req);
    return modelNotes.findById(req.params[0], function (err, note) {
      if ((!err)&&(note)) {
        res.set({
                  'X-My-Header': 'The Value',
                });
        
        return res.send(200, prepareNoteResult(note)); //found and return it now
      } else {
        log.error(err);
        return res.send(404, 'NOT FOUND');
      }
    });
  }
}

//delete an existing method by id
exports.deleteNote = function (models) {
  return function (req, res) {
    log.line ("deleteNote");
    var modelNotes = models.Notes;
    
    return modelNotes.findById(req.params[0], function (err, note) {
      
      if (!note)
      {
        log.line(err);
        return res.send(404, 'NOT FOUND');
      }
      return note.remove(function (err) {
        if (!err) {
          log.line("removed");
          return res.send(204);
        } else {
          log.line(err);
          return res.send(500); //some unexpected error
        }
      });
    });
  }

}



//internal functions
 
  //Prepare the array with note results for the output
  function prepareNoteResults(notesA){
    resultingArray = new Array();
    notesA.forEach(function (note){
      resultingArray[resultingArray.length] = prepareNoteResult(note);
    });
    return resultingArray;
  }

  //I do not want to implement an "id" field, since it may lead to mis-synchronization, so I better rename _id to id in the result
  //Plus maybe in the future I may want to show only certain fields, etc.
  function prepareNoteResult(note){

    var publicNote = {
      id: note._id,
      title: note.title,
    }
    return publicNote;
  }

