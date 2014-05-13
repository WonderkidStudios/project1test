define([
	"marionette",
	"views/notes/NotesItemView"
], function(Marionette, NotesItemView) {
	return Marionette.CollectionView.extend({
		tagName: 'table',
		itemView: NotesItemView,
		onBeforeRender: function() {
			this.$el.empty();
		}
	});
});