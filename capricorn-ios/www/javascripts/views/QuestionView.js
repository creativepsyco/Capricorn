window.QuestionView = Backbone.View.extend({

    events: {
        'click #qn-attachment-btn': 'onAttachmentClick',
        'click #share-question-btn': 'shareClick',
        'click #question-edit-btn': 'editQuestion'
    },

    initialize: function() {},

    onAttachmentClick: function() {
        console.log('[attachment click]' + $('#qn-attachment-img').attr('attachmentPic'));
        router.gotoAttachmentView($('#qn-attachment-img').attr('attachmentPic'));
    },

    refresh: function() {
        var that = this;
        this.model.fetch({
            success: function() {
                that.render();
                setTimeout(that.refreshScroller(), 200);
            },
            error: function() {
                new Error({
                    message: "Error loading documents."
                });
            }
        });
    },

    refreshScroller: function() {
        var id = $.mobile.activePage.attr('id');
        myScroll[id].refresh();
    },

    initSwipeButton: function() {
        var this_ = this;
        if (this.model.get('uid') == window.uid) {
            $(this.el).find('.question-view-hdr').attr('data-swipeurl', '#');
            this.swipeBtn = $(this.el).find('.question-view-hdr').swipeDelete({
                btnTheme: 'c',
                btnLabel: 'Delete',
                btnClass: 'aSwipeButton',
                click: function(e) {
                    e.preventDefault();
                    this_.deleteQuestion();
                }
            });
        }
    },

    deleteQuestion: function() {
        //var questionDelete = new QuestionDelete();
        var questionDelete = new ModelDelete();
        questionDelete.id = this.model.get('id');
        questionDelete.type = 'question';
        questionDelete.uid = this.model.get('uid');
        $.mobile.showPageLoadingMsg();
        questionDelete.fetch({
            success: function() {
                $.mobile.hidePageLoadingMsg();
                history.back();
            },
            error: function() {
                alert("Could not delete the question. Try Again");
            }
        })
    },

    editQuestion: function() {
        var this_ = this;
        if (this.model.get('uid') == window.uid) {
            // Correct question 
            // User has right to edit
            var questionEditModel = new EditQuestionModel({
                uid: this_.model.get('uid'),
                title: this_.model.get('title'),
                content: this_.model.get('content'),
                tag1: this_.model.get('tag1'),
                tag2: this_.model.get('tag2'),
                tag3: this_.model.get('tag3'),
                askedBy: this_.model.get('askedBy'),
                userPic: this_.model.get('userPic'),
                answers: this_.model.get('answers'),
                id: this_.model.get('id'),
                attachmentPic: this_.model.get('attachmentPic'),
                mode: 'edit'
            });
            console.log('here');
            router.gotoEditQuestionView(questionEditModel);
        }
    },

    shareClick: function() {
        if (this.model.get('uid') == window.uid) {
            this.showShareEdit();
        }else{
            this.showShare();
        }
    },

    showShare: function() {
        var this_ = this;
        $('<div>').simpledialog2({
            mode: 'button',
            headerText: 'Share',
            headerClose: true,
            buttonPrompt: 'Please Choose One',
            buttons: {
                'Share on Facebook': {
                    click: function() {
                        if (!Facebook.getToken()) {
                            alert("Please login to Facebook from Settings page");
                        } else {
                            // Logged in
                            //console.log("[QuestionView] Logged  in and Posting to FB");
                            var description_to_post = this_.model.get('content');
                            var message_to_post = "";
                            var name_of_link = this_.model.get('title');
                            var link_in_post = "http://mskmkc.herokuapp.com";
                            var picture_post = this_.model.get('attachmentPic');
                            if (picture_post == null || picture_post == undefined || picture_post.length < 1) {
                                picture_post = "http://i.imgur.com/Oh7sx.png";
                            }
                            var caption_post = "Question";
                            Facebook.createPost(description_to_post, message_to_post, name_of_link, link_in_post, picture_post, caption_post);
                        }
                    },
                    theme: "d"
                }
            }
        });
    },

    showShareEdit: function() {
        var this_ = this;
        $('<div>').simpledialog2({
            mode: 'button',
            headerText: 'Share',
            headerClose: true,
            buttonPrompt: 'Please Choose One',
            buttons: {
                'Share on Facebook': {
                    click: function() {
                        if (!Facebook.getToken()) {
                            alert("Please login to Facebook from Settings page");
                        } else {
                            // Logged in
                            console.log("[QuestionView] Logged  in and Posting to FB");
                            var description_to_post = this_.model.get('content');
                            var message_to_post = "";
                            var name_of_link = this_.model.get('title');
                            var link_in_post = "http://mskmkc.herokuapp.com";
                            var picture_post = this_.model.get('attachmentPic');
                            if (picture_post == null || picture_post == undefined || picture_post.length < 1) {
                                picture_post = "http://i.imgur.com/Oh7sx.png";
                            }
                            var caption_post = "Question";
                            Facebook.createPost(description_to_post, message_to_post, name_of_link, link_in_post, picture_post, caption_post);
                        }
                    },
                    theme: "d"
                },

                'Edit this post': {
                    click: function() {
                        router.questionView.editQuestion();
                        $.mobile.changePage('#postQuestion', {transition: 'slide'});
                    },
                    theme: "d"
                }
            }
        });
    },


    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        this.initSwipeButton();
        var data = new AnswerList(this.model.get('answers'));
        $(this.el).append(new AnswerListView({
            model: data
        }).render().el);
        return this;
    }

});