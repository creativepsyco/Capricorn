window.PostAnswerView = Backbone.View.extend({

	events: {
		'click #post-ans-btn' : 'onSubmit'
	},

    initialize: function () {
    },

    onSubmit: function () {
    	
    	if($('#answer-area').attr('value').trim() != '')
    	{
    		var answer = new AnswerModel({uid:"1",content:$('#answer-area').attr('value'),qid:this.model.get('id')});
    		answer.save();
    		router.questionView.refresh();
    		history.back();
    	}
    	return false;
    },

    render: function () {
        $('#postAnswer-content').html(this.template(this.model.toJSON()));
        return this;
    }

});