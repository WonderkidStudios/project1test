var routes = {};

routes.root = require(config.modulesDir + '/root/root.js');
//routes.video_js = require(config.modulesDir + '/video_js/video_js.coffee');
routes.notes = require(config.modulesDir + '/notes/notes.js');

module.exports = function(app, models) {
  app.get('/', routes.root.getIndex(models));
  //
  app.get('/notes', passport.authenticate('basic', { session: false }), routes.notes.listAllNotes(models));
  app.post('/notes', routes.notes.createNote(models));
  app.put('/notes', routes.notes.updateNote(models));
  app.get(/^\/notes\/(\w+)?$/, routes.notes.getNote(models));
  app.delete(/^\/notes\/(\w+)?$/, routes.notes.deleteNote(models));

};