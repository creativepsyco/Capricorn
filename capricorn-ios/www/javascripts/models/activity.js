window.ActivityListItem = Backbone.Model.extend({

    initialize:function () {
    	if(this.get('type') == 'question')
		{
			this.set({activity:this.get('title')});
			this.set({prefix:'You asked'});
		}
		else if(this.get('type') == 'answer')
		{
			this.set({activity:this.get('content')});
			this.set({prefix:'You answered'});
		}
		else
		{
			this.set({activity:this.get('content')});
			this.set({prefix:'You commented'});
		}
    },

});

window.ActivityList = Backbone.Collection.extend({

    model: ActivityListItem,

    getAnswers: function() {
    	var answers = this.where({type:'answer'});
    	return answers;
    },

    getComments: function() {
    	return this.where({type:'ansComment'});
    },

    getQuestions: function() {
    	return this.where({type:'question'});
    },

});

window.Activity = Backbone.Model.extend({

    initialize:function () {
    },

    url: function(){ 
        return 'http://mskmkc.herokuapp.com/activity/all/' + this.uid;
    },

});