define([
	"backbone",
	"marionette",
	"controllers/notes/NotesController"
], function(Backbone, Marionette, NotesController) {	
	var AppRouter = Marionette.AppRouter.extend({
		initialize: function(options) {
			this.controller = new NotesController();
		},
		
		appRoutes: {
			"notes": "showNotesAction"
		},
		
		routes: {
			"*actions": "indexRoute"
		},
		
		indexRoute: function() {}
	});

	var initialize = function() {
		var router = new AppRouter();
		Backbone.history.start();
	};
	
	return {
		initialize: initialize
	};
});