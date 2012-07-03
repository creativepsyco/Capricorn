window.Skill = Backbone.Model.extend({
	
	parse: function(response) {
    	 var skill = {
    	 	user: response.user,
        	badges: response.badges,
        	topTags: response.topTags
    	};
        skill.user.totalBadges = response.badges.length;
        if(response.topTags.length > 5)
        {
        	skill.topTags = response.topTags.slice(0,5);
        }
    	return skill;
	},

	url: function() {
		return "http://mskmkc.herokuapp.com/user/skill/" + this.uid;
	}
});

window.SkillListItem = Backbone.Model.extend({
});

window.SkillList = Backbone.Collection.extend({
    model: SkillListItem,
});