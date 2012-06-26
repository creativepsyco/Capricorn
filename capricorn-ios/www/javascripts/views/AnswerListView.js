window.AnswerListView = Backbone.View.extend({

	tagName: 'ul',
    className: 'answer-list',

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.model.bind("add", this.add);
    },

    add: function (answer) {
        var self = this;
    	$(self.el).append(new AnswerListItemView({model:answer}).render().el);
    },

    render:function () {
        var self = this;
        $(this.el).empty();
        _.each(this.model.models, function (answer) {
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
        'click .attachment-btn' : 'onAttachmentClick',
    },

    onLikeClick: function() {
        this.setLike();
        this.fixLikeDislikeInconsistency('Like');
        this.render();
    },

    onAttachmentClick: function() {
        window.router.gotoAttachmentView(this.model.get('pictureUrl'));
    },

    setLike: function() {
        var like;
        if(this.model.get('likedByViewer') == true)
        {
            this.model.setLikeStatus(false);
            this.model.updateRating(-1);
            like = new Like({aid:this.model.get('id'),uid:'1',type:'like',action:'false'});
        }
        else
        {
            this.model.setLikeStatus(true);
            this.model.updateRating(1);
            like = new Like({aid:this.model.get('id'),uid:'1',type:'like',action:'true'});
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
        if(this.model.get('dislikedByViewer') == true)
        {
            this.model.setDislikeStatus(false);
            this.model.updateRating(1);
            like = new Like({aid:this.model.get('id'),uid:'1',type:'dislike',action:'false'});
        }
        else
        {
            this.model.setDislikeStatus(true);
            this.model.updateRating(-1);
            like = new Like({aid:this.model.get('id'),uid:'1',type:'dislike',action:'true'});
        }
        like.save();
    },

    fixLikeDislikeInconsistency: function(pref) {
        if(pref == 'Dislike' && this.model.get('likedByViewer') == true)
        {
            this.setLike();
        }
        else if(pref == 'Like' && this.model.get('dislikedByViewer') == true) 
        {
            this.setDislike();
        }
    },

    onCommentClick: function() {
        window.router.gotoAnswerView(this.model.get('id'));
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});