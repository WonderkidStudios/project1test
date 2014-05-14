define([
	"backbone"
], function(Backbone) {
	var url = "http://127.0.0.1:3000/notes";
	var NoteModel = Backbone.Model.extend({
		url: url,
		sync: function(method, model, options) {
			options = options || {};
			options.url =  url;
			
			if(typeof model.id !== "undefined" && method === "update") {
				options.url =  url;
			} else if(typeof model.id !== "undefined") {
				options.url =  url + "/" + model.id;
			}
			
			return Backbone.sync.apply(this, arguments);
		},
		
		validate: function(attr) {
			var error = [];
			if(attr.id <= 0) {
				error.push("Wrong id!");
			}
			
			if(null === attr.title || !attr.title.length) {
				error.push("Wrong note title!");
			}
			if(error.length) {
				return error.join("\n");
			}
		},
		
		initialize: function() {
			this.on("change", this.onChange, this);
		},
		
		defaults: {
			title: "title"
		}
	});

	return NoteModel;
});