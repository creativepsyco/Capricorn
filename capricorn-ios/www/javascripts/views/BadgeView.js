window.BadgeView = Backbone.View.extend({

    initialize:function () {
    },

    renderAll: function() {
        this.badgeList = new BadgeList(this.model.get('badges'));
        $(this.el).find('#badge-lst').html(new BadgeListView({model:this.badgeList}).render().el);
    },

    render:function () {
        $(this.el).find('#badge-content').html(this.template(this.model.get('user')));
        this.renderAll();
        return this;
    },

});