define([
	"backbone",
	"marionette",
	"controllers/NotesController"
], function(Backbone, Marionette, NotesController) {	
	var AppRouter = Marionette.AppRouter.extend({
		initialize: function(options) {
			this.controller = new NotesController({ App: options.App });
		},
		
		appRoutes: {
			"notes": "showNotesAction"
		},
		
		routes: {
			"*actions": "indexRoute"
		},
		
		indexRoute: function() {
			//console.log("index");
		}
	});

	var initialize = function(App) {
		var router = new AppRouter({App: App});
		Backbone.history.start();
	};
	
	return {
		initialize: function(App) {
			initialize(App);
		}
	};
});