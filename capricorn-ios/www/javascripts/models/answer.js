window.Answer = Backbone.Model.extend({

    //urlRoot:"../api/employees",

    initialize:function () {
    },

    parse: function(response) {
    	response = response[0];
    	 var answer = {
    	 	id: response.id,
        	rating: response.rating,
        	content: response.content,
        	answeredBy: response.answeredBy,
            likedByViewer: response.likedByUser,
            dislikedByViewer: response.dislikedByUser,
        	userPic: response.userFacebookPic,
        	commentsCount: response.commentsCount,
        	comments: response.comments,
            uid: response.uid,
            attachmentPic: response.pictureUrl
    	};
        if(answer.attachmentPic == "")
        {
            answer.imgVisible = "collapse"
        }
        else {
            answer.imgVisible = "visible"
        }
    	if(parseInt(answer.rating) >= 0)
        {
    		answer.ratingImg='css/images/answerRatingFlag_Green_40.png';
    	}
    	else
        {
    		answer.ratingImg='css/images/answerRatingFlag_Red_40.png';
    	}
        if(answer.likedByViewer == true)
        {
            answer.likeImg='css/images/likeButton-Green-24X24.png';
        }
        else
        {   
            answer.likeImg='css/images/likeButton-Grey-24X24.png';
        }
        if(answer.dislikedByViewer == true)
        {
            answer.dislikeImg='css/images/dislikeButton-Red-24X24.png';
        }
        else
        {   
            answer.dislikeImg='css/images/dislikeButton-Grey-24X24.png';
        }
    	return answer;
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

    url: function(){ 
        //console.log('http://mkc.herokuapp.com/question/search/' + this.term);
        return 'http://pakora.herokuapp.com/answer/show/' + this.id + "/" + this.viewer;
    },

});


window.Like = Backbone.Model.extend({

    initialize:function () {
    },

    url: function(){ 
        return 'http://pakora.herokuapp.com/answer/rate';
    },

});

window.AnswerModel = Backbone.Model.extend({
    url: function(){ 
        return 'http://pakora.herokuapp.com/answer/save';
    },
});