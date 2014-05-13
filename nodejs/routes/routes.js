var routes = {};

routes.root = require(config.modulesDir + '/root/root.js');
routes.notes = require(config.modulesDir + '/notes/notes.js');

//routing scheme
module.exports = function(app, models) {
  app.get('/', routes.root.getIndex(models));
  app.get('/notes', passport.authenticate('basic', { session: false }), routes.notes.listAllNotes(models));
  app.post('/notes', passport.authenticate('basic', { session: false }), routes.notes.createNote(models));
  app.put('/notes', passport.authenticate('basic', { session: false }), routes.notes.updateNote(models));
  app.get(/^\/notes\/(\w+)?$/, passport.authenticate('basic', { session: false }), routes.notes.getNote(models));
  app.delete(/^\/notes\/(\w+)?$/, passport.authenticate('basic', { session: false }), routes.notes.deleteNote(models));

};