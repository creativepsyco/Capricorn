window.SkillListView = Backbone.View.extend({

    tagName: 'ul',
    className: 'answer-list',
    count: 0,
    colors: ["#66abda", "#51bb60", "#ffa200", "#b61b39", "#494d4e"],

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.model.bind("add", this.add);
    },

    add: function (skill) {
        var self = this;
        skill.set({color:self.colors[self.count]});
        self.count = self.count > 4 ? 0 : self.count+1;
        $(self.el).append(new SkillListItemView({model:skill}).render().el);
    },

    render:function () {
        var self = this;
        $(this.el).empty();
        _.each(this.model.models, function (skill) {
            self.add(skill);
        }, this);
        
        return this;
    }

});

window.SkillListItemView = Backbone.View.extend({
  
    tagName: 'li',

    initialize:function () {
    },

    calculateBarLength: function() {
        var totalLength = $(this.el).find('.bar-back').width();
        var barLength = (totalLength/this.model.get('maxTagScore')) * this.model.get('userTagScore');
        return barLength;
    },
 
    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        $(this.el).find('.bar-front').css('width',this.calculateBarLength()+'%');
        return this;
    }

});