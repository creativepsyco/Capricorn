
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
    var data = new Question({title:'Question',description:'description',tag1:'tag1',tag2:'tag2',tag3:'tag3',askedBy:'Amulya Khare',userPic:'css/images/amu.png',answers:[{rating:'2',answeredBy:'James Panini',answer:'This works like a charm!',ratingImg:'css/images/answerRatingFlag_Green_40.png',commentsCount:'5'}]});
    var qv = new QuestionView({model: data}).render();
    $('#page2-content').html(qv.el);
  }
};

$(function(){
templateLoader.load(["QuestionView","AnswerListItemView"],
    function () {
    });
});