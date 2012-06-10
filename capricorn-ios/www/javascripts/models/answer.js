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
        	userPic: response.userFacebookPic,
        	commentsCount: response.commentsCount,
        	comments: response.comments
    	};
    	if(parseInt(answer.rating) >= 0){
    		answer.ratingImg='css/images/answerRatingFlag_Green_40.png';
    	}
    	else{
    		answer.ratingImg='css/images/answerRatingFlag_Red_40.png';
    	}
    	return answer;
	},

    url: function(){ 
        //console.log('http://mkc.herokuapp.com/question/search/' + this.term);
        return 'http://mkc.herokuapp.com/answer/show/' + this.id + "/" + this.viewer;
    },

});


window.Like = Backbone.Model.extend({

    initialize:function () {
    },

    url: function(){ 
        return 'http://mkc.herokuapp.com/answer/rate';
    },

});