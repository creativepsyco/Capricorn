window.SettingsModel = Backbone.Model.extend({});

window.AttachmentModel = Backbone.Model.extend({});

window.ModelDelete = Backbone.Model.extend({
	url: function() {
		return "http://pakora.herokuapp.com/" + this.type + "/delete/" + this.id + "/" + this.uid;
	}
});