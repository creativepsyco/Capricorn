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
                        Upload.getPhotoFromCamera(router.postAnswerView.onImageSelected);
                    },
                    theme: "d"
                },
                'Choose from Library': {
                    click: function() {
                        Upload.getPhotoFromLibrary(router.postAnswerView.onImageSelected);
                    },
                    theme: "d"
                }
            }
        })
    },

    attachmentDelete: function() {
        this.imageData = null;
        $('#ans-attachment-area').css('display', 'none');
    },

    onImageUpload: function(url, msg) {
        if (url == null || url == undefined || url.length < 1) {
            alert("Failed to upload" + msg);
        } else {
            console.log("[uploaded imgurl]" + url);
            router.postAnswerView.saveData(url);
        }
    },

    onImageSelected: function(image_data, message) {
        router.postAnswerView.imageData = image_data;
        if (message.length > 1) {
            $('#ans-attachment-area').css('display', 'block');
            $('#ans-attachment-img').attr('src', 'data:image/jpeg;base64,' + image_data);
        }
    },

    initialize: function() {},

    onSubmit: function() {
        if (this.imageData != null) {
            Upload.upload(this.imageData, this.onImageUpload);
        } else {
            this.saveData("");
        }
        return false;
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
                    uid: window.uid,
                    pictureUrl: url,
                    content: $('#answer-area').attr('value'),
                    qid: this.model.get('id')
                });
            }
        }
        answer.save(null, {
            success: function() {
                console.log('[PostAnswerView] successfully modified the answer');
                router.questionView.refresh();
                history.back();
            },
            error: function() {
                alert('Failed to save the answer please try again later. Maybe IVAN broke the API.');
            }
        });
        router.questionView.refresh();
        setTimeout(history.back(), 500);
    },

    render: function() {
        var this_ = this;
        if (this.model && this.model.get('mode') == 'edit') {
            $("#answer-area").attr('value', this_.model.get('content'));
            $('#ans-attachment-img').attr('src', this_.model.get('attachmentPic'));
        } else {
            this.imageData = null;
            $('#postAnswer-content').html(this.template(this.model.toJSON()));
            $('#ans-attachment-area').css('display', 'none');
        }
        return this;
    }

});