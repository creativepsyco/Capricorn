window.QuestionListItem = Backbone.Model.extend({

    //urlRoot:"../api/employees",

    initialize:function () {
        //this.reports = new EmployeeCollection();
        //this.reports.url = '../api/employees/' + this.id + '/reports';
    },
    parse: function(response) {
    	 var question = {
    	 	id: response.id,
        	title: response.title,
        	anscount: response.anscount,
        	tag1: response.tags[0],
        	tag2: response.tags[1],
        	tag3: response.tags[2]
    	};
    	return question;
	}

});

window.QuestionList = Backbone.Collection.extend({
    model: QuestionListItem,
    url:"http://fuckme.herokuapp.com/question/list",
});