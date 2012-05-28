window.QuestionView = Backbone.View.extend({

    initialize:function () {
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        var data = new AnswerList(this.model.get('answers'));
        $(this.el).append(new AnswerListView({model:data}).render().el);
        return this;
    }

});