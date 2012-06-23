window.QuestionView = Backbone.View.extend({

    initialize:function () {
        this.model.bind("change:title", function(){
                var name = this.get("title"); // 'Stewie Griffin'
                alert("Changed my name to " + name );
            });
    },

    refresh: function() {
    	var that = this;
    	this.model.fetch({
			success: function() {
				that.render();
                setTimeout(that.refreshScroller(), 200);
	        },
	        error: function() {
	            new Error({ message: "Error loading documents." });
	        }
	    });
    },

    refreshScroller: function () {
        var id = $.mobile.activePage.attr('id');
        myScroll[id].refresh();
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
       	var data = new AnswerList(this.model.get('answers'));
        $(this.el).append(new AnswerListView({model:data}).render().el);
        return this;
    }

});