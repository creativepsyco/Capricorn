window.AnswerListView = Backbone.View.extend({

    tagName: 'ul',
    className: 'answer-list',

    initialize: function() {
        this.model.bind("reset", this.render, this);
        this.model.bind("add", this.add);
    },

    add: function(answer) {
        var self = this;
        $(self.el).append(new AnswerListItemView({
            model: answer
        }).render().el);
    },

    render: function() {
        var self = this;
        $(this.el).empty();
        _.each(this.model.models, function(answer) {
            self.add(answer);
        }, this);

        return this;
    }

});

window.AnswerListItemView = Backbone.View.extend({

    tagName: 'li',

    events: {
        'click .comment-btn': 'onCommentClick',
        'click .like-btn': 'onLikeClick',
        'click .dislike-btn': 'onDislikeClick',
        'click .attachment-btn': 'onAttachmentClick',
    },

    onLikeClick: function() {
        this.setLike();
        this.fixLikeDislikeInconsistency('Like');
        this.refresh();
    },

    onAttachmentClick: function() {
        window.router.gotoAttachmentView(this.model.get('pictureUrl'));
    },

    setLike: function() {
        var like;
        if (this.model.get('likedByViewer') == true) {
            this.model.setLikeStatus(false);
            this.model.updateRating(-1);
            like = new Like({
                aid: this.model.get('id'),
                uid: window.uid,
                type: 'like',
                action: 'false'
            });
        } else {
            this.model.setLikeStatus(true);
            this.model.updateRating(1);
            like = new Like({
                aid: this.model.get('id'),
                uid: window.uid,
                type: 'like',
                action: 'true'
            });
        }
        like.save();
    },

    onDislikeClick: function() {
        this.setDislike();
        this.fixLikeDislikeInconsistency('Dislike');
        this.refresh();
    },

    setDislike: function() {
        var like;
        if (this.model.get('dislikedByViewer') == true) {
            this.model.setDislikeStatus(false);
            this.model.updateRating(1);
            like = new Like({
                aid: this.model.get('id'),
                uid: window.uid,
                type: 'dislike',
                action: 'false'
            });
        } else {
            this.model.setDislikeStatus(true);
            this.model.updateRating(-1);
            like = new Like({
                aid: this.model.get('id'),
                uid: window.uid,
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

    onCommentClick: function() {
        window.router.gotoAnswerView(this.model.get('id'));
    },

    refresh: function() {
        $(this.el).html(this.template(this.model.toJSON()));
    },

    initSwipeButton: function() {
        if (this.model.get('uid') == window.uid && this.swipeBtn == null) {
            $(this.el).attr('data-swipeurl', '#');
            var this_ = this;

            this.swipeBtn = $(this.el).swipeDelete({
                btnTheme: 'c',
                btnLabel: 'Delete',
                btnClass: 'aSwipeButton',
                hideElement: '.rating-img',
                click: function(e) {
                    e.preventDefault();
                    $(this).parents('li').slideUp();
                    this_.deleteAnswer();
                }
            });
        }
    },

    deleteAnswer: function() {
        var answerDelete = new ModelDelete();
        answerDelete.id = this.model.get('id');
        answerDelete.type = 'answer';
        answerDelete.uid = this.model.get('uid');
        answerDelete.fetch({
            success: function() {
                //alert("successfully deleted");
            },
            error: function() {
                alert("Deletion unsuccessful error occured");
            }
        });
    },

    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        this.initSwipeButton();
        return this;
    }

});