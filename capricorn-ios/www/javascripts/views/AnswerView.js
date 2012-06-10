window.AnswerView = Backbone.View.extend({

    initialize:function () {
    },

    events: {
        'click .comment-btn': 'onCommentClick',
        'click .like-btn': 'onLikeClick',
        'click .dislike-btn': 'onDislikeClick'
    },

    onLikeClick: function() {
        this.setLike();
        this.fixLikeDislikeInconsistency('Like');
        this.render();
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

    refresh: function() {
    	var that = this;
    	console.log('refresh');
    	this.model.fetch({
			success: function() {
				console.log(that.model);
				that.render();
	        },
	        error: function() {
	        	console.log('error!');
	            new Error({ message: "Error loading documents." });
	        }
	    });
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        var data = new CommentList(this.model.get('comments'));
        $(this.el).append(new CommentListView({model:data}).render().el);
        return this;
    }

});