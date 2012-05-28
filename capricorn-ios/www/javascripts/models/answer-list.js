window.AnswerListItem = Backbone.Model.extend({

    //urlRoot:"../api/employees",

    initialize:function () {
        //this.reports = new EmployeeCollection();
        //this.reports.url = '../api/employees/' + this.id + '/reports';
    }

});

window.AnswerList = Backbone.Collection.extend({

    model: AnswerListItem,

    //url:"../api/employees",

});