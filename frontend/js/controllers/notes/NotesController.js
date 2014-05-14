define([
	"marionette",
	"views/notes/NotesView"
], function(Marionette, NotesView) {
	return Marionette.Controller.extend({		
		showNotesAction: function() {
			var notesView = new NotesView();
			notesView.render();
		}
	});
});