window.QuestionView = Backbone.View.extend({

    events: {
        'click #qn-attachment-btn': 'onAttachmentClick',
    },

    initialize: function() {},

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
                new Error({
                    message: "Error loading documents."
                });
            }
        });
    },

    refreshScroller: function() {
        var id = $.mobile.activePage.attr('id');
        myScroll[id].refresh();
    },

    initSwipeButton: function() {
        var this_ = this;
        if (this.model.get('uid') == window.uid) {
            $(this.el).find('.question-view-hdr').attr('data-swipeurl', 'swiped.html?1');
            this.swipeBtn = $(this.el).find('.question-view-hdr').swipeDelete({
                btnTheme: 'c',
                btnLabel: 'Delete',
                btnClass: 'aSwipeButton',
                click: function(e) {
                    e.preventDefault();
                    this_.deleteQuestion();
                }
            });
        }
    },

    deleteQuestion: function() {
        //var questionDelete = new QuestionDelete();
        var questionDelete = new ModelDelete();
        questionDelete.id = this.model.get('id');
        questionDelete.type = 'question';
        questionDelete.uid = this.model.get('uid');
        questionDelete.fetch({
            success: function() {
                alert("Successfully Deleted the question");
                history.back();
            },
            error: function() {
                alert("Could not delete the question. Try Again");
            }
        })
    },

    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        this.initSwipeButton();
        var data = new AnswerList(this.model.get('answers'));
        $(this.el).append(new AnswerListView({
            model: data
        }).render().el);
        return this;
    }

});