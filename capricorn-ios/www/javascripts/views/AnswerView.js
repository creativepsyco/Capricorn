window.AnswerView = Backbone.View.extend({

    initialize: function() {},

    events: {
        'submit form': 'onCommentPost',
        'click #like-btn-av': 'onLikeClick',
        'click #dislike-btn-av': 'onDislikeClick',
        'focus textarea': 'onTyping',
        'click .post-cmnt-btn': 'onCommentPost',
        'click .attachment-btn': 'onAttachmentClick',
        'click #share-answer-btn': 'shareClick',
        'click #edit-answer-btn': 'editAnswer'
    },

    onTyping: function() {
        $(this.el).height($(window).height());
    },

    onAttachmentClick: function() {
        window.router.gotoAttachmentView(this.model.get('attachmentPic'));
    },

    onCommentPost: function() {
        $(this.el).focus();
        $('#comment-box').attr('value');
        var comment = new Comment({
            aid: router.answerView.model.get('id'),
            content: $('#comment-box').attr('value'),
            uid: String(window.uid)
        });
        $.mobile.showPageLoadingMsg();
        comment.save(null,{
            success: function() {
                $.mobile.hidePageLoadingMsg();
                $('#comment-box').attr('value', '');
                router.answerView.refresh();
            },
            error: function() {
            }
        });
        return false;
    },

    onLikeClick: function() {
        this.setLike();
        this.fixLikeDislikeInconsistency('Like');
        this.render();
    },

    setLike: function() {
        var like;
        if (this.model.get('likedByViewer') == true) {
            this.model.setLikeStatus(false);
            this.model.updateRating(-1);
            like = new Like({
                aid: this.model.get('id'),
                uid: String(window.uid),
                type: 'like',
                action: 'false'
            });
        } else {
            this.model.setLikeStatus(true);
            this.model.updateRating(1);
            like = new Like({
                aid: this.model.get('id'),
                uid: String(window.uid),
                type: 'like',
                action: 'true'
            });
        }
        like.save();
    },

    onDislikeClick: function() {
        this.setDislike();
        this.fixLikeDislikeInconsistency('Dislike');
        this.render();
    },

    setDislike: function() {
        var like;
        if (this.model.get('dislikedByViewer') == true) {
            this.model.setDislikeStatus(false);
            this.model.updateRating(1);
            like = new Like({
                aid: this.model.get('id'),
                uid: String(window.uid),
                type: 'dislike',
                action: 'false'
            });
        } else {
            this.model.setDislikeStatus(true);
            this.model.updateRating(-1);
            like = new Like({
                aid: this.model.get('id'),
                uid: String(window.uid),
                type: 'dislike',
                action: 'true'
            });
        }
        like.save();
    },

    fixLikeDislikeInconsistency: function(pref) {
        if (pref == 'Dislike' && this.model.get('likedByViewer') == true) {
            this.setLike();
        } else if (pref == 'Like' && this.model.get('dislikedByViewer') == true) {
            this.setDislike();
        }
    },

    refresh: function() {
        var that = this;
        this.model.fetch({
            success: function() {
                that.render();
            },
            error: function() {
                new Error({
                    message: "Error loading documents."
                });
            }
        });
    },

    initSwipeButton: function() {
        var this_ = this;
        if (this.model.get('uid') == window.uid) {
            $(this.el).find('.answer-box').attr('data-swipeurl', '#');
            this.swipeButton = $(this.el).find('.answer-box').swipeDelete({
                btnTheme: 'c',
                btnLabel: 'Delete',
                btnClass: 'aSwipeButton',
                hideElement: '.rating-img',
                click: function(e) {
                    e.preventDefault();
                    // Delete Answer
                    this_.deleteAnswer();
                }
            });
        }
    },

    deleteAnswer: function() {
        //var answerDelete = new AnswerDelete();
        var answerDelete = new ModelDelete();
        answerDelete.id = this.model.get('id');
        answerDelete.type = 'answer';
        answerDelete.uid = this.model.get('uid');
        $.mobile.showPageLoadingMsg();
        answerDelete.fetch({
            success: function() {
                $.mobile.hidePageLoadingMsg();
                router.questionView.refresh();
                history.back();
            },
            error: function() {
                alert("Deletion unsuccessful error occured");
            }
        });
    },

    editAnswer: function() {
        var this_ = this;
        if (this.model.get('uid') == window.uid) {
            // Correct answer 
            // User has right to edit
            var answerEditModel = new EditAnswerModel({
                uid: this_.model.get('uid'),
                rating: this_.model.get('rating'),
                content: this_.model.get('content'),
                answeredBy: this_.model.get('answeredBy'),
                likedByViewer: this_.model.get('likedByViewer'),
                dislikedByViewer: this_.model.get('dislikedByViewer'),
                userPic: this_.model.get('userPic'),
                commentsCount: this_.model.get('commentsCount'),
                comments: this_.model.get('comments'),
                answers: this_.model.get('answers'),
                id: this_.model.get('id'),
                attachmentPic: this_.model.get('attachmentPic'),
                mode: 'edit'
            });
            router.gotoEditAnswerView(answerEditModel);
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
                            // Logged in and posting
                            //console.log("[AnswerView] Logged  in and Posting to FB");
                            var description_to_post = this_.model.get('content');
                            var message_to_post = "";
                            var name_of_link = "Answer";
                            var link_in_post = "http://mskmkc.herokuapp.com";
                            var picture_post = this_.model.get('attachmentPic');
                            if (!picture_post || picture_post == undefined || picture_post.length < 1) {
                                picture_post = "http://i.imgur.com/Oh7sx.png";
                            }
                            var caption_post = Facebook.getCachedUserName() + " shared an answer from QuestioNUS";
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
                            // Logged in and posting
                            console.log("[AnswerView] Logged  in and Posting to FB");
                            var description_to_post = this_.model.get('content');
                            var message_to_post = "";
                            var name_of_link = "View " + Facebook.getCachedUserName() + "'s answer on QuestioNUS.";
                            var link_in_post = "http://pakora.herokuapp.com";
                            var picture_post = this_.model.get('attachmentPic');
                            if (!picture_post || picture_post == undefined || picture_post.length < 1) {
                                picture_post = "http://i.imgur.com/6bPQF.jpg";
                            }
                            var caption_post = Facebook.getCachedUserName() + " posted an answer on QuestioNUS";
                            Facebook.createPost(description_to_post, message_to_post, name_of_link, link_in_post, picture_post, caption_post);
                        }
                    },
                    theme: "d"
                },
                'Edit this post': {
                    click: function() {
                        router.answerView.editAnswer();
                        $.mobile.changePage('#postAnswer', {transition: 'slide'});
                    },
                    theme: "d"
                }
            }
        });
    },

    render: function() {
        $('#showAnswerContent').html(this.template(this.model.toJSON()));
        this.initSwipeButton();
        var data = new CommentList(this.model.get('comments'));
        $('#showAnswerContent').append(new CommentListView({
            model: data
        }).render().el);
        return this;
    }

});