//model for Mongo DB
module.exports = function(mongoose) {
  var NotesSchema, ObjectId, Schema;
  Schema = mongoose.Schema;
  ObjectId = Schema.ObjectId;
  
  NotesSchema = new Schema({
    title: String
  });
  
  this.model = mongoose.model('Notes', NotesSchema);
  return this;
};
