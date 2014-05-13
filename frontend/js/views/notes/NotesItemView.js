define([
	"underscore",
	"marionette",
	"text!/templates/tpl_note.html"
], function(_, Marionette, tplNote) {
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
			var newTitle = prompt("Enter new note title:", this.model.get("title"));
			this.model.on("invalid", function(model, error) {
				alert(error);
			});
			this.model.save({title: newTitle}, {
				success: function() {
					//console.log("edit ok");
				},
				error: function(model, error) {
					console.log(error);
				}
			});
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