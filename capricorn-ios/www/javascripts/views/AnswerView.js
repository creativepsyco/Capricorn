window.AnswerView = Backbone.View.extend({

    initialize:function () {
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        var data = new CommentList(this.model.get('comments'));
        $(this.el).append(new CommentListView({model:data}).render().el);
        return this;
    }

});