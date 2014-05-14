define([
	"jquery",
	"underscore",
	"marionette",
	"views/notes/NotesEditView",
	"text!/templates/notes/tpl_note.html"
], function($, _, Marionette, NotesEditView, tplNote) {
	return Marionette.ItemView.extend({
		tagName		: "tr",
		className	: "note",
		template	: _.template(tplNote),
		
		events: {
			"click .editLink"	: "editNote",
			"click .deleteLink"	: "deleteNote"
		},
		
		editNote: function(e) {
			e.preventDefault();
			
			new NotesEditView({model: this.model, el: $("#noteActions")}).render();
		},
		
		deleteNote: function(e) {
			e.preventDefault();
			this.model.destroy();
		},
		
		initialize: function() {
			this.render = _.bind(this.render, this);
			this.model.bind("change:title", this.render);
		}
	});
});