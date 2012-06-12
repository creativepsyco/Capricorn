window.ActivityView = Backbone.View.extend({

    initialize:function () {
    },

    renderAll: function() {
        var activityList = new ActivityList(this.model.get('activities'));
        $(this.el).find('#activity-lst').html(new ActivityListView({model:data}).render().el);
    },

    render:function () {
        $(this.el).find('#activity-content').html(this.template(this.model.toJSON()));
        this.renderAll();
        return this;
    },
});