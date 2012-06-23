window.PostQuestionView = Backbone.View.extend({

	events: {
		'submit form' : 'onSubmit',
		'click .cam-btn' : 'camClick',
		'click .attachment-close' : 'attachmentDelete'
	},

	camClick: function() {
		$('<div>').simpledialog2({
	    mode: 'button',
	    headerText: 'Attach Photo',
	    headerClose: true,
	    buttonPrompt: 'Please Choose One',
	    buttons : {
	      'Take a Photo': {
	        click: function () {
	        	$(document).find('#capturePhotoBtn').click();
	        },
	        theme: "d"
	      },
	      'Choose from Library': {
	        click: function () { 
	          	$(document).find("#getPhotoFromLibrary").click();
	        },
	        theme: "d"
	      }
	    }
	  })
	},

	attachmentDelete: function() {
		$('#attachment-area').css('display','none');
	},

	imageAttached: function(imageURI) {
		$('#attachment-img').attr('src',imageURI);
	},

	onSubmit: function() {
		var tags = $('#question-tags').attr('value').split(',');
		var tagsArray = new Array(tags[0].trim(),tags[1].trim(),tags[2].trim());
		var question = new QuestionModel({uid:"1", title:$('#question-title').attr('value'), content:$('#question-description').attr('value'), tags:tagsArray});
		question.save();
		return false;
	},

    initialize:function () {
    },

    render:function () {
    	$('#attachment-area').css('display','none');
    }

});