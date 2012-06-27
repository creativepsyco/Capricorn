window.CommentListView = Backbone.View.extend({

	tagName: 'ul',
    className: 'comment-list',

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.model.bind("add", this.add);
    },

    add: function (comment) {
        var self = this;
    	$(self.el).append(new CommentListItemView({model:comment}).render().el);
    },

    render:function () {
        var self = this;
        $(this.el).empty();
        _.each(this.model.models, function (comment) {
            self.add(comment);
        }, this);
        
        return this;
    }

});

window.CommentListItemView = Backbone.View.extend({
  
    tagName: 'li',

    initialize:function() {
    },

    initSwipeButton: function() {
        if(this.swipeButton == null && this.model.get('uid') == window.uid) {
            $(this.el).attr('data-swipeurl','swiped.html?1');
            this.swipeButton = $(this.el).swipeDelete({
                    btnTheme: 'c',
                    btnLabel: 'Delete',
                    btnClass: 'aSwipeButton',
                    click: function(e){
                        e.preventDefault();
                        $(this).parents('li').slideUp();
                }
            });
        }
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        this.initSwipeButton();
        return this;
    }

});