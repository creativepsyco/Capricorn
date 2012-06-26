window.QuestionView = Backbone.View.extend({

    events: {
        'click #qn-attachment-btn' : 'onAttachmentClick',
    },

    initialize:function () {
    },

    onAttachmentClick: function() {
        console.log('[attachment click]' + $('#qn-attachment-img').attr('attachmentPic'));
        router.gotoAttachmentView($('#qn-attachment-img').attr('attachmentPic'));
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