window.ActivityListView = Backbone.View.extend({

	tagName: 'ul',
    className: 'answer-list',

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.model.bind("add", this.add);
    },

    add: function (activity) {
        var self = this;
    	$(self.el).append(new ActivityListItemView({model:activity}).render().el);
    },

    render:function () {
        var self = this;
        $(this.el).empty();
        _.each(this.model.models, function (activity) {
           self.add(activity);
        }, this);
        
        return this;
    }

});

window.ActivityListItemView = Backbone.View.extend({
  
    tagName: 'li',

    events: {
        'click .activity-lst' : 'onActivityShow',
    },

    onActivityShow: function() {
        var type = this.model.get('type');
        var ids = this.model.get('ids');
        if(type == 'question')
        {
            $.mobile.changePage('#showQuestion', {transition: 'slide'});
            router.gotoQuestionView(ids.qid);
        }
        else if(type == 'answer')
        {
             $.mobile.changePage('#showAnswer', {transition: 'slide'});
             router.gotoAnswerView(ids.aid);
        }
        else 
        {
            $.mobile.changePage('#showAnswer', {transition: 'slide'});
            router.gotoAnswerView(ids.aid);
        }
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});