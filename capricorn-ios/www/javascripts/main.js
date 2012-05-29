// The Template Loader. Used to asynchronously load templates located in separate .html files
window.templateLoader = {

    load: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get('javascripts/templates/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }   
};

window.test = {
  run: function() {
    var data = new Question({title:'Question',description:'description',tag1:'tag1',tag2:'tag2',tag3:'tag3',askedBy:'Amulya Khare',userPic:'css/images/amu.png',answers:[{rating:'+2',answeredBy:'James Panini',answer:'This works like a charm!',ratingImg:'css/images/answerRatingFlag_Green_40.png',commentsCount:'5'},{rating:'+12',answeredBy:'Raymond Tan',answer:'What a nice answer to our work.',ratingImg:'css/images/answerRatingFlag_Green_40.png',commentsCount:'10'}]});
    var qv = new QuestionView({model: data}).render();
    $('#page2-content').html(qv.el);
  },
  load: function() {
    var data = new QuestionList([{answersCount:'23',questionTitle:'What is the meaning of life?',tag1:'Life',tag2:'Random',tag3:'Awesome'},{answersCount:'2',questionTitle:'What are we living for when we breathe?',tag1:'Life',tag2:'Random',tag3:'Awesome'},{answersCount:'10',questionTitle:'What are we living for when we breathe?',tag1:'Life',tag2:'Random',tag3:'Awesome'}]);
    var qv = new QuestionListView({model: data}).render();
    $('#question-lst').html(qv.el);
  },
  loadPage3: function() {
    var data = new Answer({rating:'+2',answeredBy:'James Panini',answer:'This works like a charm!',ratingImg:'css/images/answerRatingFlag_Green_40.png',commentsCount:'5',comments:[{comment:'This is comment1',commentBy:'Amulya Khare'},{comment:'This is comment2',commentBy:'Rajul Gupta'}]});
    var qv = new AnswerView({model: data}).render();
    $('#page3-content').html(qv.el);
  },
};

$(document).ready(function(){
  templateLoader.load(["QuestionView","AnswerListItemView","QuestionListItemView","AnswerView","CommentListItemView"],
    function () {
      test.load();
    });
});
