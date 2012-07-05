window.PostAnswerView = Backbone.View.extend({

    events: {
        'click #post-ans-btn': 'onSubmit',
        'focus textarea': 'onTyping',
        'click .ans-cam-btn': 'camClick',
        'click .ans-attachment-close': 'attachmentDelete',
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
                        takePicture2();
                    },
                    theme: "d"
                },
                //comment out for blackberry
                /*'Choose from Library': {
                    click: function() {
                        Upload.getPhotoFromLibrary(router.postAnswerView.onImageSelected);
                    },
                    theme: "d"
                }*/
            }
        })
    },

    uploadForBlackberry: function() {
        //add this statement from Blackbery
        var img = getBase64Image(document.getElementById('ans-attachment-img-bk'));
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
            router.postAnswerView.onImageUpload(data['upload']['links']['original'], 'Uploaded');
        }).error(function() {
            alert('Could not upload image. Please try again later!');
        });
    },

    attachmentDelete: function() {
        this.imageData = null;
        $('#ans-attachment-area').css('display', 'none');
    },

    onImageUpload: function(url, msg) {
        if (url == null || url == undefined || url.length < 1) {
            alert("Failed to upload" + msg);
        } else {
            //console.log("[uploaded imgurl]" + url);
            router.postAnswerView.saveData(url);
        }
    },

    onImageSelected: function(image_data, message) {
        router.postAnswerView.imageData = image_data;
        if (message.length > 1) {
            $('#ans-attachment-area').css('display', 'block');
            //$('#ans-attachment-img').attr('src', 'data:image/jpeg;base64,' + image_data);
            $('#ans-attachment-img').attr('src',image_data);
            $('#ans-attachment-img-bk').attr('src',image_data);
        }
    },

    initialize: function() {},

    onSubmit: function() {
        if(this.validate()){
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
        if(!IVLE.isLoggedIn())
        {
            alert('Please login to IVLE from Settings page');
            return false;
        }
        else if(window.uid == -1) {
            router.postLoginInit();
        }
        if($("#answer-area").attr('value') == "" ){
            return false;
        }
        return true;
    },

    saveData: function(url) {
        var this_ = this;
        var answer = null;
        if (this.model && this.model.get('mode') == 'edit') {
            answer = new EditAnswerModel({
                uid: this_.model.get('uid'),
                aid: this_.model.get('id'),
                pictureUrl: url,
                content: $('#answer-area').attr('value')
            });
        } else {
            if ($('#answer-area').attr('value').trim() != '') {
                answer = new AnswerModel({
                    uid: String(window.uid),
                    pictureUrl: url,
                    content: $('#answer-area').attr('value'),
                    qid: this.model.get('id')
                });
            }
        }
        answer.save(null, {
            success: function() {
                //console.log('[PostAnswerView] successfully modified the answer');
                try
                {
                    router.questionView.refresh();
                }
                catch (e) {}
                try {
                    router.answerView.refresh();
                }
                catch (e) {}
                $.mobile.hidePageLoadingMsg();
                history.back();
            },
            error: function() {
                alert('Failed to save the answer.');
            }
        });
    },

    render: function() {
        var this_ = this;
        if (this.model && this.model.get('mode') == 'edit') {
            $("#answer-area").attr('value', this_.model.get('content'));
            $('#ans-attachment-img').attr('src', this_.model.get('attachmentPic'));
            if(this.model.get('attachmentPic').trim() != "")
            {
                $('#ans-attachment-area').css('display', 'block');
            }
            else {
                $('#ans-attachment-area').css('display', 'none');
            }
        } else {
            this.imageData = null;
            $('#postAnswer-content').html(this.template(this.model.toJSON()));
             $("#answer-area").attr('value', '');
            $('#ans-attachment-area').css('display', 'none');
        }
        return this;
    }

});