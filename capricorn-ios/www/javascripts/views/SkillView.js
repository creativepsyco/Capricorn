window.SkillView = Backbone.View.extend({

    initialize:function () {
    },

    renderAll: function() {
        this.skillList = new SkillList(this.model.get('topTags'));
        $(this.el).find('#skills-lst').html(new SkillListView({model:this.skillList}).render().el);
    },

    createBadge: function(badge) {
        return "<td style='width:40px; vertical-align:top;''><div class='crop'><img src='"+ badge.get('pic') +"'/></div></td>";
    },

    render:function () {
        $(this.el).find('#skills-content').html(this.template(this.model.get('user')));
        window.activeUser = this.model.get('user').uid;
        var activeBadges = this.model.get('badges');
        var allBadges = BadgeFactory.createBadgeNameList(activeBadges);
        var badgeCol="";
        for(i=0; i<5; i++)
        {
            badgeCol = badgeCol + this.createBadge(allBadges.at(i));
        }
        $(this.el).find('#badge-row').html(badgeCol);
        this.renderAll();
        return this;
    },
});