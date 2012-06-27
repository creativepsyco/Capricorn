window.PostQuestionView = Backbone.View.extend({

	events: {
		'submit form' : 'onSubmit',
		'click .cam-btn' : 'camClick',
		'click .attachment-close' : 'attachmentDelete',
		'focus textarea' : 'onTyping'
	},

	onTyping: function() {
        $(this.el).height($(window).height());
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
	        	Upload.getPhotoFromCamera(router.postQuestionView.onImageSelected);
	        },
	        theme: "d"
	      },
	      'Choose from Library': {
	        click: function () { 
	          	Upload.getPhotoFromLibrary(router.postQuestionView.onImageSelected);
	        },
	        theme: "d"
	      }
	    }
	  })
	},

	attachmentDelete: function() {
		this.imageData = null;
		$('#attachment-area').css('display','none');
	},

	imageAttached: function(imageURI) {
		$('#attachment-img').attr('src',imageURI);
	},

	onSubmit: function() {
		if(this.imageData != null)
		{
			Upload.upload(this.imageData, this.onImageUpload);
		}
		else
		{
			this.saveData("");
		}
		return false;
	},

	saveData: function(url) {
		var tags = $('#question-tags').attr('value').split(',');
		var tagsArray = new Array(tags[0].trim(),tags[1].trim(),tags[2].trim());
		var question = new QuestionModel({uid:"1", pictureUrl:url, title:$('#question-title').attr('value'), content:$('#question-description').attr('value'), tags:tagsArray});
		question.save();
	},

	onImageUpload: function(url, msg) 
    {
        if(url == null || url== undefined || url.length<1) {
            alert("Failed to upload" + msg);
        } else {
        	console.log("[uploaded imgurl]" + url);
            router.postQuestionView.saveData(url);
        }
    },

	onImageSelected: function(image_data, message) {
		router.postQuestionView.imageData = image_data;
		if(message.length>1) 
		{
			$('#attachment-area').css('display','block');
			$('#attachment-img').attr('src','data:image/jpeg;base64,' + image_data);
		}
	},

    initialize:function () {
    },

    render:function () {
    	$('#attachment-area').css('display','none');
    	this.imageData = null;
    	return this;
    }

});