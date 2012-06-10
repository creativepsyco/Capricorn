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
		return false;
	},

    initialize:function () {
    },

    render:function () {
    	$('#attachment-area').css('display','none');
    }

});