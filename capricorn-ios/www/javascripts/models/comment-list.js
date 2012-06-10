window.CommentListItem = Backbone.Model.extend({

    //urlRoot:"../api/employees",

    initialize:function () {
        //this.reports = new EmployeeCollection();
        //this.reports.url = '../api/employees/' + this.id + '/reports';
    }

});

window.CommentList = Backbone.Collection.extend({

    model: CommentListItem,

    //url:"../api/employees",

});

window.Comment = Backbone.Model.extend({

	url: function(){ 
        return 'http://mkc.herokuapp.com/ansComment/save';
    },
});