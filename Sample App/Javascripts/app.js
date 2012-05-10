(function($) {

    window.MainView = Backbone.View.extend({
        tag: 'div',
        el: '#page1',

        initialize: function() {
            _.bindAll(this, 'render');
        },

        render: function() {
            this.template = _.template($('#page1_template').html());
            $(this.el).append(this.template());
        }
    });
})(jQuery);

