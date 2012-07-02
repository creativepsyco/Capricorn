window.API_BASE_URL = "http://mskmkc.herokuapp.com/";

window.SettingsModel = Backbone.Model.extend({});

window.AttachmentModel = Backbone.Model.extend({});

window.ModelDelete = Backbone.Model.extend({
	url: function() {
		return window.API_BASE_URL + this.type + "/delete/" + this.id + "/" + this.uid;
	}
});

window.EditQuestionModel = Backbone.Model.extend({
	url: function() {
		return window.API_BASE_URL + "question/edit";
	}
});

window.EditAnswerModel = Backbone.Model.extend({
	url: function() {
		return window.API_BASE_URL + "answer/edit";
	}
});