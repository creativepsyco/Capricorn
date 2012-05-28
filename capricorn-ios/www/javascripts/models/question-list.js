window.QuestionListItem = Backbone.Model.extend({

    //urlRoot:"../api/employees",

    initialize:function () {
        //this.reports = new EmployeeCollection();
        //this.reports.url = '../api/employees/' + this.id + '/reports';
    }

});

window.QuestionList = Backbone.Collection.extend({

    model: QuestionListItem,

    //url:"../api/employees",

});