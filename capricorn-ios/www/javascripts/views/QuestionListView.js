window.QuestionListView = Backbone.View.extend({

	tagName: 'ul',
	className: 'answer-list',

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.model.bind("add", this.add);
    },

    add: function (question) {
        var self = this;
    	$(self.el).append(new QuestionListItemView({model:question}).render().el);
    },

    render:function () {
        var self = this;
        var i=0;
        $(this.el).empty();
        _.each(this.model.models, function (question) {
        	if(i%2 == 0){
        		question.set({CSSClass:'question-list-box'});
        	}else{
        		question.set({CSSClass:'question-list-nobox'});
        	}
        	i++;
            self.add(question);
        }, this);
        
        return this;
    }

});

window.QuestionListItemView = Backbone.View.extend({
  
    tagName: 'li',

    initialize:function () {
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});