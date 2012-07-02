window.SkillView = Backbone.View.extend({

    initialize:function () {
    },

    renderAll: function() {
        this.badgeList = BadgeFactory.createBadgeList(this.model.get('topTags'));
        $(this.el).find('#skills-lst').html(new BadgeListView({model:this.badgeList}).render().el);
    },

    render:function () {
        $(this.el).find('#skills-content').html(this.template(this.model.get('user')));
        this.renderAll();
        return this;
    },
});