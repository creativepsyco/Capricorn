window.AnswerListItem = Backbone.Model.extend({

    //urlRoot:"../api/employees",

    initialize:function () {
       	this.updateRating(0);
    	this.setLikeStatus(this.get('likedByViewer'));
    	this.setDislikeStatus(this.get('dislikedByViewer'));
    },

    setLikeStatus:function(like) {
    	if(like == true)
    	{
    		this.set({likeImg: 'css/images/likeButton-Green-24X24.png'});
    	}
    	else
    	{	
    		this.set({likeImg: 'css/images/likeButton-Grey-24X24.png'});
    	}
    	this.set({'likedByViewer':like});
    },

    setDislikeStatus:function(like) {
    	if(like == true)
    	{
    		this.set({dislikeImg: 'css/images/dislikeButton-Red-24X24.png'});
    	}
    	else
    	{	
    		this.set({dislikeImg: 'css/images/dislikeButton-Grey-24X24.png'});
    	}
    	this.set({'dislikedByViewer':like});
    },

    updateRating:function(val) {
    	var rating = parseInt(this.get('rating')) + val;
    	if(rating >= 0){
    		this.set({ratingImg:'css/images/answerRatingFlag_Green_40.png'});
    	}
    	else{
    		this.set({ratingImg:'css/images/answerRatingFlag_Red_40.png'});
    	}
    	this.set({'rating':rating});
    },

});

window.AnswerList = Backbone.Collection.extend({

    model: AnswerListItem,

    //url:"../api/employees",

});