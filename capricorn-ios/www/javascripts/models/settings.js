window.SettingsModel = Backbone.Model.extend({});

window.AttachmentModel = Backbone.Model.extend({});


window.QuestionDelete = Backbone.Model.extend({
	url: function() {
		return "http://pakora.herokuapp.com/question/delete/" + this.qid + "/" + this.uid;
	}
});

window.AnswerDelete = Backbone.Model.extend({
	url: function() {
		return "http://pakora.herokuapp.com/answer/delete/" + this.aid + "/" + this.uid;
	}
});

window.AnswerCommentDelete = Backbone.Model.extend({
	url: function() {
		return "http://pakora.herokuapp.com/answercomment/delete/" + this.cid + "/" + this.uid;
	}
});

window.ModelDelete = Backbone.Model.extend({
	url: function() {
		return "http://pakora.herokuapp.com/" + this.type + "/delete/" + this.id + "/" + this.uid;
	}
});