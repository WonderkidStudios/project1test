define([
	'backbone',
	'models/NoteModel'
], function(Backbone, NoteModel) {
	var NotesCollection = Backbone.Collection.extend({
		model: NoteModel,
		url: "http://127.0.0.1:3000/notes"
	});

	return NotesCollection;
});