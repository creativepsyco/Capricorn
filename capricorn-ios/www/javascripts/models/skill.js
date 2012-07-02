window.Skill = Backbone.Model.extend({
	url: function() {
		return "http://mskmkc.herokuapp.com/user/skill/" + this.uid;
	}
});

window.SkillListItem = Backbone.Model.extend({
});

window.SkillList = Backbone.Collection.extend({
    model: SkillListItem,
});