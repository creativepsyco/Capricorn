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
	        },
	        error: function() {
	            new Error({ message: "Error loading documents." });
	        }
	    });
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
       	var data = new AnswerList(this.model.get('answers'));
        $(this.el).append(new AnswerListView({model:data}).render().el);
        return this;
    }

});