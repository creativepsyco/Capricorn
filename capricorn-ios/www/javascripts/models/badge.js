window.Badge = Backbone.Model.extend({

	parse: function(response) {
    	 var badge = {
    	 	user: response.user,
        	badges: response.badges,
    	};
        badge.user.totalBadges = response.badges.length;
    	return badge;
	},

	url: function() {
		return "http://mskmkc.herokuapp.com/badge/list/" + this.uid;
	}
});

window.BadgeListItem = Backbone.Model.extend({

});

window.BadgeList = Backbone.Collection.extend({
    model: BadgeListItem,
});

window.DemoBadge = Backbone.Model.extend({

});

window.DemoBadgeList = Backbone.Collection.extend({
    model: DemoBadge,
});

var BadgeFactory = {
    createBadgeList : function (activeBadges) {
        var allBadges = this.getBadgeList();
        var finalBadges = new BadgeList();
        for(i=0; i<activeBadges.length; i++)
        {
            var badge = allBadges.where({code:activeBadges[i].name})[0];
            badge.set({status:""});
            badge.set({tags:activeBadges[i].tags});
            finalBadges.push(badge);
        }
        var inactiveBadges = allBadges.where({status:"inactive"});
        for(i=0;i<inactiveBadges.length;i++)
        {
            var badge = inactiveBadges[i];
            badge.set({pic:"css/images/Badges/inactive.png"})
            finalBadges.push(badge);
        }
        return finalBadges;
    },

    createBadgeNameList : function (activeBadges) {
        var allBadges = this.getBadgeList();
        var finalBadges = new BadgeList();
        for(i=0; i<activeBadges.length; i++)
        {
            var badge = allBadges.where({code:activeBadges[i]})[0];
            badge.set({status:""});
            finalBadges.push(badge);
        }
        var inactiveBadges = allBadges.where({status:"inactive"});
        for(i=0;i<inactiveBadges.length;i++)
        {
            var badge = inactiveBadges[i];
            badge.set({pic:"css/images/Badges/inactive.png"})
            finalBadges.push(badge);
        }
        return finalBadges;
    },

    getBadgeList : function() {
        var advisor = new DemoBadge({ name: "Advisor", code:"ABadge1" , rule: "Post one answer and be an Advisor.", pic: "css/images/Badges/advisor_color.png", status:"inactive", tags:[] });
        var critic = new DemoBadge({ name: "Critic", code:"DLBadge5" , rule: "Disliked 5 answers!", pic: "css/images/Badges/critic_color.png", status:"inactive", tags:[] });
        var expert = new DemoBadge({ name: "Expert", code:"SBadge150", rule: "Earn 150 points and become an Expert!", pic: "css/images/Badges/expert_color.png", status:"inactive", tags:[] });
        var genius = new DemoBadge({ name: "Genius", code:"SBadge300", rule: "Earn 300 points to be a Genius!", pic: "css/images/Badges/genius_color.png", status:"inactive", tags:[] });
        var guru = new DemoBadge({ name: "Guru", code:"SBadge500", rule: "Achieve the ultimate level of knowledge - Guru with 500 points.", pic: "css/images/Badges/guru_color.png", status:"inactive", tags:[] });
        var inexperience = new DemoBadge({ name: "Inexperience", code:"SBadge0", rule: "Negative points for tags.", pic: "css/images/Badges/inexperience_color.png", status:"inactive", tags:[] });
        var inquisitive = new DemoBadge({ name: "Inquisitive", code:"QBadge5", rule: "Post 5 questions.", pic: "css/images/Badges/inquisitive_color.png", status:"inactive", tags:[] });
        var learner = new DemoBadge({ name: "Learner", code:"QBadge1", rule: "Post a question.", pic: "css/images/Badges/learner_color.png", status:"inactive", tags:[] });
        var police = new DemoBadge({ name: "Police", code:"DLBadge30", rule: "Disliked 30 answers in QuestioNUS.", pic: "css/images/Badges/police_color.png", status:"inactive", tags:[] });
        var professor = new DemoBadge({ name: "Professor", code:"ABadge30", rule: "Post 30 answers to be the Professor in QuestionNUS.", pic: "css/images/Badges/professor_color.png", status:"inactive", tags:[] });
        var proficient = new DemoBadge({ name: "Proficient", code:"SBadge100", rule: "Earn 100 points and be called \"Proficient\".", pic: "css/images/Badges/proficient_color.png", status:"inactive", tags:[] });
        var scholar = new DemoBadge({ name: "Scholar", code:"SBadge50", rule: "Earn 50 points to be a Scholar.", pic: "css/images/Badges/scholar_color.png", status:"inactive", tags:[] });
        var supporter = new DemoBadge({ name: "Supporter", code:"LBadge1", rule: "Liked one answer.", pic: "css/images/Badges/supporter_color.png", status:"inactive", tags:[] });
        return new DemoBadgeList([advisor, critic, expert, genius, guru, inexperience, inquisitive, learner, professor, police, proficient, scholar, supporter]);
    }
};