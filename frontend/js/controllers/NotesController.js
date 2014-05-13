define([
	"jquery",
	"marionette",
	"collections/NotesCollection",
	"views/notes/NotesCollectionView",
	"models/note/NoteModel"
], function($, Marionette, NotesCollection, NotesCollectionView, NoteModel) {
	var App = null,
		notes = new NotesCollection();
	return Marionette.Controller.extend({		
		initialize: function(options) {
			App = options.App;
			//$(document).on("click", "#addNote", this.addNoteCallback);
			
			$("#addNote")
				.hide()
				.click(this.addNoteCallback);
		},
		
		addNoteCallback: function(e) {
			e.preventDefault();
			var noteTitle = prompt("Type note title here:", "default title");
			var newNote = new NoteModel({
				title: noteTitle
			});

			if (!newNote.isValid()) {
				alert(newNote.validationError);
			} else {
				newNote.save({}, {
					success: function(model, obj) {
						newNote.set("id", obj.id);
						notes.add(newNote);
					},
					error: function() {
						console.log("error save");
					}
				});
			}			
		},
		
		showNotesAction: function() {
			notes.fetch({
				success: function(collection) {
					$("#addNote").show();
					new NotesCollectionView({
						collection: collection,
						el: '.notes'
					}).render();
				}
			});
		}
	});
});