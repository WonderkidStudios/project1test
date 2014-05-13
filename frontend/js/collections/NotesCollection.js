define([
	'backbone',
	'models/note/NoteModel'
], function(Backbone, NoteModel) {
	var NotesCollection = Backbone.Collection.extend({
		model: NoteModel,
		//url: "http://ecorougenotes.apiary-mock.com/notes"
		url: "http://127.0.0.1:3000/notes"
	});

	return NotesCollection;
});