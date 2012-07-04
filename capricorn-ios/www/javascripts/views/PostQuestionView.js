window.PostQuestionView = Backbone.View.extend({

	events: {
		'submit form': 'onSubmit',
		'click .cam-btn': 'camClick',
		'click .attachment-close': 'attachmentDelete',
		'focus textarea': 'onTyping'
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
			buttons: {
				'Take a Photo': {
					click: function() {
						//Upload.getPhotoFromCamera(router.postAnswerView.onImageSelected);
						takePicture();
					},
					theme: "d"
				},
				//Comment out for Blackberry Porting
				/*'Choose from Library': {
					click: function() {
						Upload.getPhotoFromLibrary(router.postQuestionView.onImageSelected);
					},
					theme: "d"
				}*/
			}
		})
	},

	attachmentDelete: function() {
		this.imageData = null;
		$('#attachment-area').css('display', 'none');
	},

	imageAttached: function(imageURI) {
		$('#attachment-img').attr('src', imageURI);
	},

	onSubmit: function() {
		if(this.validate())
		{
			$.mobile.showPageLoadingMsg();
			if (this.imageData != null) {
			//Upload.upload(this.imageData, this.onImageUpload);
			this.uploadForBlackberry();
			} else {
				this.saveData("");
			}
		}
		return false;
	},

	validate: function(){
		var tags = $('#question-tags').attr('value').split(',');
		if($('#question-description').attr('value') == "" || $('#question-title').attr('value').trim() == ""){
			alert('Some fields are incomplete.');
			return false;
		}
		if (this.model && this.model.get('mode') == 'edit') 
		{
			//let it be
		}else{
			if (tags.length < 3)
			{
				return false;
			}
		}
		return true;
	},

	uploadForBlackberry: function() {
		//add this statement from Blackbery
		var img = getBase64Image(document.getElementById('attachment-img-bk'));
		$.ajax({
			url: 'http://api.imgur.com/2/upload.json',
			type: 'POST',
			data: {
				type: 'base64',
				// get your key here, quick and fast http://imgur.com/register/api_anon
				key: "1748ee815be8f13cea057a29a7ec47ee",
				name: this.imageData,
				title: this.imageData,
				caption: this.imageData,
				image: img
			},
			dataType: 'json'
		}).success(function(data) {
			router.postQuestionView.onImageUpload(data['upload']['links']['original'], 'Uploaded');
		}).error(function() {
			alert('Could not upload image at this time. Please try again later!');
		});
	},

	saveData: function(url) {
		// Check if edit mode is on
        //console.log('[saveData-postQuestionView] entering save Data');
		var this_ = this;
		if (this_.model && this_.model.get('mode') == 'edit') {
			var question = new EditQuestionModel({
				uid: this_.model.get('uid'),
				qid: this_.model.get('id'),
				pictureUrl: url,
				title: $('#question-title').attr('value'),
				content: $('#question-description').attr('value')
			});

			question.save(
			null, {
				success: function() {
					console.log('[PostQuestionView] successfully saved the question');
					// set the default values
					$('#question-tags').css('visibility', 'visible');
					// Empty the div, even though it will be invisible.
					$('#question-title').attr('value', '');
					$('#question-description').attr('value', '');
					$('#attachment-area').css('display', 'none');
					$('#question-tags').attr('value', '');
					router.postQuestionView.model = null;

					// Get updated shit
					router.questionView.refresh();

					$.mobile.hidePageLoadingMsg();
					// Go back one view
					history.back();
				},
				error: function() {
                                        alert('Failed to update the question please try again later OR Maybe IVAN broke the API.');
				}
			});
		} else {
                        // Normal mode which just posts
			var tags = $('#question-tags').attr('value').split(',');
			var tagsArray = new Array(tags[0].trim(), tags[1].trim(), tags[2].trim());
			var question = new QuestionModel({
				uid: window.uid,
				pictureUrl: url,
				title: $('#question-title').attr('value'),
				content: $('#question-description').attr('value'),
				tags: tagsArray
			});
            question.save(null, {
	            success: function() {
                    console.log('[PostQuestionView] successfully saved the question');

                    // Get updated shit
                    //router.questionView.refresh();
                    // Go back one view
                    $.mobile.hidePageLoadingMsg();
                    history.back();
	            },
	            error: function() {
	                alert('Failed to update the question please try again later OR Maybe IVAN broke the API.');
	            }
            });
		}
	},

	onImageUpload: function(url, msg) {
		if (url == null || url == undefined || url.length < 1) {
			alert("Failed to upload" + msg);
		} else {
			console.log("[uploaded imgurl]" + url);
			router.postQuestionView.saveData(url);
		}
	},

	onImageSelected: function(image_data, message) {
		router.postQuestionView.imageData = image_data;
		if (message.length > 1) {
			$('#attachment-area').css('display', 'block');
			//$('#attachment-img').attr('src', 'data:image/png;base64,' + image_data);
			$('#attachment-img').attr('src',image_data);
			$('#attachment-img-bk').attr('src',image_data);
		}
	},

	initialize: function() {},

	render: function() {
		if (this.model && this.model.get('mode') == 'edit') 
		{
			console.log('[postQuestionView] Rendering in edit mode');
			$('#question-title').attr('value', this.model.get('title'));
			$('#question-description').attr('value', this.model.get('content'));
			$('#attachment-img').attr('src', this.model.get('pictureUrl'));
            $('#question-tags').css('visibility', 'collapse');
		} 
		else {

			$('#attachment-area').css('display', 'none');
            $('#question-tags').css('visibility', 'visible');
            $('#question-title').attr('value', '');
            $('#question-description').attr('value', '');
            $('#question-tags').attr('value', '');

			this.imageData = null;
		}
		return this;
	}

});