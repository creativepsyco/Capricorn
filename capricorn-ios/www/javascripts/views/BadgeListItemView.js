window.BadgeListView = Backbone.View.extend({

	tagName: 'ul',
	className: 'answer-list',

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.model.bind("add", this.add);
    },

    add: function (badge) {
        var self = this;
    	$(self.el).append(new BadgeListItemView({model:badge}).render().el);
    },

    render:function () {
        var self = this;
        $(this.el).empty();
        _.each(this.model.models, function (badge) {
            self.add(badge);
        }, this);
        
        return this;
    }

});

window.BadgeListItemView = Backbone.View.extend({
  
    tagName: 'li',

    initialize:function () {
    },

    createTag: function(name) {
        return "<label class='tag' style='margin-right:2px;'>"+name+"</label>";
    },
 
    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        var tagsArray = this.model.get('tags');
        var tagsHTML="";
        for(i=0;i<tagsArray.length;i++)
        {
            tagsHTML = tagsHTML + this.createTag(tagsArray[i]);
        }
        $(this.el).find('.tag-lst').html(tagsHTML);
        return this;
    }

});