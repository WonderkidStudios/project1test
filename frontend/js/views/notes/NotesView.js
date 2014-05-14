define([
	"underscore",
	"marionette",
	"collections/notes/NotesCollection",
	"views/notes/NotesCollectionView",
	"views/notes/NotesAddView",	
	"text!/templates/notes/tpl_notes.html"
], function(_,  Marionette, NotesCollection, NotesCollectionView, NotesAddView, tplNotes) {	
	var _this = null;
	return Marionette.ItemView.extend({
		el		: $("#notesBlock"),
		
		events: {
			"click .addLink"	: "addNote"
		},
		
		addNote: function(e) {
			e.preventDefault();
			
			new NotesAddView({
				model		: this.model,
				el			: $("#noteActions"),
				collection	: this.notes
			}).render();
		},
		
		initialize: function() {
			_this = this;
			this.notes = new NotesCollection();
		},
		
		render: function() {
			this.$el.html(tplNotes);
			
			this.notes.fetch({
				success: function(collection) {
					new NotesCollectionView({
						el			: ".notes",
						collection	: collection
					}).render();
				},
				error: function() {
					console.log("Error fetch!");
				}
			});
		}
	});
});