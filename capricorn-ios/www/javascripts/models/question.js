window.Question = Backbone.Model.extend({

    //urlRoot:"http://mkc.herokuapp.com/question/show/",

    initialize:function () {
        //this.reports = new EmployeeCollection();
        //this.reports.url = '../api/employees/' + this.id + '/reports';
    },

    parse: function(response) {
    	response = response[0];
    	 var question = {
    	 	id: response.id,
        	title: response.title,
        	content: response.content,
        	tag1: response.tags[0],
        	tag2: response.tags[1],
        	tag3: response.tags[2],
        	askedBy: response.askedBy,
        	userPic: response.userFacebookPic,
        	answers: response.answers
    	};
    	return question;
	},

    url: function(){ 
        //console.log('http://mkc.herokuapp.com/question/search/' + this.term);
        return 'http://sucky.herokuapp.com/question/show/' + this.id + "/" + this.viewer;
    },

});