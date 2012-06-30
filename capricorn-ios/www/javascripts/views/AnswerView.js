window.AnswerView = Backbone.View.extend({

    initialize: function() {},

    events: {
        'submit form': 'onCommentPost',
        'click #like-btn-av': 'onLikeClick',
        'click #dislike-btn-av': 'onDislikeClick',
        'focus textarea': 'onTyping',
        'click .post-cmnt-btn': 'onCommentPost',
        'click .attachment-btn': 'onAttachmentClick',
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
            uid: '1'
        });
        comment.save();
        $('#comment-box').attr('value', '');
        this.refresh();
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
                uid: '1',
                type: 'like',
                action: 'false'
            });
        } else {
            this.model.setLikeStatus(true);
            this.model.updateRating(1);
            like = new Like({
                aid: this.model.get('id'),
                uid: '1',
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
                uid: '1',
                type: 'dislike',
                action: 'false'
            });
        } else {
            this.model.setDislikeStatus(true);
            this.model.updateRating(-1);
            like = new Like({
                aid: this.model.get('id'),
                uid: '1',
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
            $(this.el).find('.answer-box').attr('data-swipeurl', 'swiped.html?1');
            this.swipeButton = $(this.el).find('.answer-box').swipeDelete({
                btnTheme: 'c',
                btnLabel: 'Delete',
                btnClass: 'aSwipeButton',
                hideElement: '.rating-img',
                click: function(e) {
                    e.preventDefault();
                    // Delete Answer
                    this_.deleteAnswer();
                    history.back();
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
        answerDelete.fetch({
            success: function() {
                alert("successfully deleted");
            },
            error: function() {
                alert("Deletion unsuccessful error occured");
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