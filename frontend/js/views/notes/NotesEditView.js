define([
	"jquery",
	"underscore",
	"marionette",
	"text!/templates/notes/tpl_note_edit.html"
], function($, _,  Marionette, tplNoteEdit) {	
	var _this = null;
	return Marionette.ItemView.extend({
		template	: _.template(tplNoteEdit),
		
		ui: {
			editBox: "input[type=text]"
		},
		
		events: {
			"click .btn-cancel"	: "onCancel",
			"click .btn-update"	: "onUpdate"			
		},
		
		onUpdate: function() {
			var newTitle = this.ui.editBox[0].value;

			this.model.save({title: newTitle}, {
				success: function() {
					_this.remove();
				},
				error: function(model, error) {
					console.log(error);
					_this.remove();
				}
			});
			
			if(this.model.validationError) {
				alert(this.model.validationError);
				this.remove();
			}
		},
		
		onCancel: function() {
			this.remove();
		},
		
		initialize: function() {
			_this = this;
			
			this.$el.empty();
			
			this.$el = $("<div />").addClass("edit-action").appendTo(this.$el);
		}
	});
});