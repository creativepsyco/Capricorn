window.AnswerListView = Backbone.View.extend({

	tagName: 'ul',
    className: 'answer-list',

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.model.bind("add", this.add);
    },

    add: function (answer) {
        var self = this;
    	$(self.el).append(new AnswerListItemView({model:answer}).render().el);
    },

    render:function () {
        var self = this;
        $(this.el).empty();
        _.each(this.model.models, function (answer) {
            self.add(answer);
        }, this);
        
        return this;
    }

});

window.AnswerListItemView = Backbone.View.extend({
  
    tagName: 'li',

    initialize:function () {
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});