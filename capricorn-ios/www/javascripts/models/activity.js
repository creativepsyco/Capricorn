window.ActivityListItem = Backbone.Model.extend({

    initialize:function () {
    },

});

window.ActivityList = Backbone.Collection.extend({

    model: ActivityListItem,

});

window.Activity = Backbone.Model.extend({

    initialize:function () {
    },

    url: function(){ 
        return 'http://mkc.herokuapp.com/activity/all' + this.uid;
    },

});