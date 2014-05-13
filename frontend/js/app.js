define([
	"jquery",
	"marionette",
	"router",
	"views/notes/NotesCollectionView",
	"collections/NotesCollection"
], function($, Marionette, Router) {
	var app = new Marionette.Application();
	
	app.addInitializer(function(options) {
		$.ajaxSetup({
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Basic " + btoa("system" + ":" + "Sy5t3m"));
			}
		});
		
		Router.initialize(this);
	});
	
	return app;
});

