

var resultingArray; 


exports.listAllNotes = function (models) {
  return function (req, res) {
    
    var modelNotes = models.Notes;
  	return modelNotes.find(function (err, notesA) {
      if (!err) {
        mandatoryHeader(res);
        //res.set('Content-Type', 'application/json');
        return res.send(200, prepareNoteResults(notesA)); //return the list
      } else {
        console.log(err);
        mandatoryHeader(res);
        return res.send(500); //some unexpected error
      }
    });
  }

}

exports.createNote = function (models) {
  return function (req, res) {
    console.log ("createNote");
    //console.log(req.param('title'));
    
    var modelNotes = models.Notes;
    var note = new modelNotes({
      title: req.body.title,
    });
    note.save(function (err) {
      if (!err) {
        console.log("created");
        //res.set('Content-Type', 'application/json');
        mandatoryHeader(res);
        return res.send(201,prepareNoteResult(note)); //created
      } else {
        console.log(err);
        mandatoryHeader(res);
        return res.send(500); //some unexpected error
      }
    });
    
  }
}

exports.updateNote = function (models) {
  return function (req, res) {
    console.log ("updateNote");
    var modelNotes = models.Notes;
    
    //console.log (req);
    return modelNotes.findById(req.body.id, function (err, note) {
      if  (!note)
      {
        console.log("item "+req.body.id+" was not foud");
        mandatoryHeader(res);
        return res.send(404, 'NOT FOUND');
      }
      note.title = req.body.title;
      
      return note.save(function (err) {
        if (!err) {
          console.log("updated");
          //res.set('Content-Type', 'application/json');
          mandatoryHeader(res);
          return res.send(200, prepareNoteResult(note)); //updated sucessfully
        } else {
          console.log(err);
          mandatoryHeader(res);
          return res.send(500); //some unexpected error
        }
      });
    });
  }
}

exports.getNote = function (models) {
  return function (req, res) {
    console.log ("getNote");
    var modelNotes = models.Notes;  
    
    console.log (req);
    return modelNotes.findById(req.params[0], function (err, note) {
      if ((!err)&&(note)) {
        res.set({
                //'Content-Type': 'application/json',
                'X-My-Header': 'The Value',
                });
        mandatoryHeader(res);
        return res.send(200, prepareNoteResult(note)); //found and return it now
      } else {
        console.log(err);
        mandatoryHeader(res);
        return res.send(404, 'NOT FOUND');
      }
    });
  }
}


exports.deleteNote = function (models) {
  return function (req, res) {
    console.log ("deleteNote");
    var modelNotes = models.Notes;
    
    console.log (req);
    return modelNotes.findById(req.params[0], function (err, note) {
      
      if (!note)
      {
        console.log(err);
        mandatoryHeader(res);
        return res.send(404, 'NOT FOUND');
      }
      return note.remove(function (err) {
        if (!err) {
          console.log("removed");
          mandatoryHeader(res);
          return res.send(204);
        } else {
          console.log(err);
          mandatoryHeader(res);
          return res.send(500); //some unexpected error
        }
      });
    });
  }

}



//internal functions

  function mandatoryHeader(res){
   /*
    res.set({
                //'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Max-Age': '10',
                'Content-Type': 'application/json',
                });

*/
  }

  function prepareNoteResults(notesA){
    resultingArray = new Array();
    notesA.forEach(function (note){
      resultingArray[resultingArray.length] = prepareNoteResult(note);
    });
    return resultingArray;
  }

  //I do not want to implement an "id" field, since it may lead to mis-synchronization, so I better rename _id to id in the result
  function prepareNoteResult(note){

    var publicNote = {
      id: note._id,
      title: note.title,
    }
    return publicNote;
  }

