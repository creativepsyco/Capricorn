/*!
 * globals.js v0.0.1
 * contains the bare necessary code 
 * @author : mohit
 */
// Global VARS
var Global = {
	callback_func: null;
};

Global.APP_BASE_URL = "http://pakora.herokuapp.com/";

// Answer
Global.APP_BASE_ANSWER_DELETE = Global.APP_BASE_URL + "answer/delete/";

// Question
Global.APP_BASE_QUESTION_DELETE = Global.APP_BASE_URL + "question/delete";

// Answer Comment
Global.APP_BASE_ANSWER_COMMENT_DELETE = Global.APP_BASE_URL + "answercomment/";

// Util Functions
//
// Now I don't know and have not worked with Backbone.js so I put the stuff here
// TODO : Migrate it to the models etc whenever you have time
//
// Delete Answer
Global.deleteAnswer = function(callback_func, aid, uid) {
	Global.callback_func = callback_func;
	// Deletion Code
	var delListener = function(data) {
			if (Global.callback_func) {
				Global.callback_func(data);
			}
		};

	var del_URL = Global.APP_BASE_ANSWER_DELETE + aid + "/" + uid;
	$.ajax({
		url: del_URL,
		success: delListener,
		statusCode: {
			404: function() {
				alert("API cannot access url 404 occured");
			},
			500: function() {
				alert("API cannot get past server error 500");
			},
			503: function() {
				alert("503 error");
			}
		},
	}).done(delListener);
};

// 