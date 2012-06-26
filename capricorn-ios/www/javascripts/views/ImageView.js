window.ImageView = Backbone.View.extend({

    initialize:function () {

    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        $(this.el).find('#attachment-img').css('width',$(window).width()-30);
        return this;
    }

});