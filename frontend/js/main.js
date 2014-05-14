require.config({
	paths: {
		jquery					: "lib/backbone.marionette/jquery",
		underscore				: "lib/backbone.marionette/underscore",
		backbone				: "lib/backbone.marionette/backbone",
		marionette				: "lib/backbone.marionette/backbone.marionette",
		"backbone.wreqr"		: "lib/backbone.marionette/backbone.wreqr",
		"backbone.babysitter"	: "lib/backbone.marionette/backbone.babysitter"
	},
	shim: {
		jquery: {
			exports: "$"
		},
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		marionette: {
			deps: ["jquery", "underscore", "backbone"],
			exports: "Marionette"
		} 
	}
});

require([
	"app"
], function(App) {
	App.start();
});