define([
	"jquery",
	"underscore",
	"marionette",
	"models/NoteModel",
	"text!/templates/notes/tpl_note_add.html"
], function($, _,  Marionette, NoteModel, tplNoteAdd) {	
	var _this = null;
	
	return Marionette.ItemView.extend({
		template	: _.template(tplNoteAdd),
		
		ui: {
			titleBox: "input[type=text]"
		},
		
		events: {
			"click .btn-cancel"	: "onCancel",
			"click .btn-add"	: "onAdd"			
		},
		
		onAdd: function() {
			var newNote = new NoteModel({
				title: this.ui.titleBox[0].value
			});

			if (!newNote.isValid()) {
				alert(newNote.validationError);
			} else {
				newNote.save({}, {
					success: function(model, obj) {
						newNote.set("id", obj.id);
						_this.collection.add(newNote);
					},
					error: function() {
						console.log("Error add new note!");
					}
				});
			}
		},
		
		onCancel: function() {
			this.remove();
		},
		
		initialize: function() {
			_this = this;
			
			this.$el.empty();
			
			this.$el = $("<div />").addClass("add-action").appendTo(this.$el);
		}
	});
});