window.ActivityView = Backbone.View.extend({

    events: {
        'click #all-btn' : 'onShowAllClick',
        'click #qn-btn' : 'onQuestionClick',
        'click #ans-btn' : 'onAnswerClick',
        'click #cmnt-btn' : 'onCommentClick',
    },

    resetBtnStates: function() {
        $('#all-btn div').css('font-weight','normal');
        $('#all-btn div').css('text-decoration','underline');
    },

    onShowAllClick: function() {
        this.resetBtnStates();
        $('#all-btn div').css('font-weight','bold');
        $('#all-btn div').css('text-decoration','none');
        $(this.el).find('#activity-lst').html(new ActivityListView({model:this.activityList}).render().el);
        setTimeout(this.refreshScroller(), 200);
    },

    onQuestionClick: function() {
        this.resetBtnStates();
        this.questionList = new ActivityList(this.activityList.getQuestions());
        $(this.el).find('#activity-lst').html(new ActivityListView({model:this.questionList}).render().el);
        setTimeout(this.refreshScroller(), 200);
    },

    onAnswerClick: function() {
        this.resetBtnStates();
        this.answeList = new ActivityList(this.activityList.getAnswers());
        $(this.el).find('#activity-lst').html(new ActivityListView({model:this.answeList}).render().el);
        setTimeout(this.refreshScroller(), 200);
    },

    onCommentClick: function() {
        this.resetBtnStates();
        this.commentList = new ActivityList(this.activityList.getComments());
        $(this.el).find('#activity-lst').html(new ActivityListView({model:this.commentList}).render().el);
        setTimeout(this.refreshScroller(), 200);
    },

    refreshScroller: function () {
        var id = $.mobile.activePage.attr('id');
        myScroll[id].refresh();
    },

    initialize:function () {
    },

    renderAll: function() {
        this.activityList = new ActivityList(this.model.get('activities'));
        $(this.el).find('#activity-lst').html(new ActivityListView({model:this.activityList}).render().el);
    },

    render:function () {
        $(this.el).find('#activity-content').html(this.template(this.model.get('user')));
        this.renderAll();
        return this;
    },
});

