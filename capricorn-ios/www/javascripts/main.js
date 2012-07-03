window.uid = 2;
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

window.router = {
  myScroll: [],
  gotoQuestionListView: function() {
    var homepage = new QuestionPage({
      el: '#homePage'
    });
    var questionList = new QuestionList();
    questionList.fetch({
      success: function() {
        var qv = new QuestionListView({
          model: questionList
        }).render();
        $('#question-lst').html(qv.el);
      },
      error: function() {
        new Error({
          message: "Error loading documents."
        });
      }
    });
  },

  gotoPostQuestionView: function() {
    console.log('[router] beginning display of postquestionView');
    if (router.postQuestionView) {
      router.postQuestionView.render();
    } else {
      router.postQuestionView = new PostQuestionView({
        el: '#postQuestion'
      }).render();
    }
  },

  gotoQuestionView: function(questionId) {
    var that = this;
    var question = new Question();
    question.id = questionId;
    question.viewer = 1;
    question.fetch({
      success: function() {
        if (router.questionView) {
          router.questionView.model = question;
          router.questionView.render();
        } else {
          router.questionView = new QuestionView({
            model: question,
            el: '#page2-content'
          }).render();
        }
        //$('#page2-content').html(router.questionView.el);
        setTimeout(that.loadScroller, 200);
      },
      error: function() {
        new Error({
          message: "Error loading documents."
        });
      }
    });
  },

  gotoEditQuestionView: function(questionModel) {
    if (router.postQuestionView) {
      router.postQuestionView.render({
        model: questionModel
      });
    } else {
      router.postQuestionView = new PostQuestionView({
        el: '#postQuestion',
        model: questionModel
      }).render();
    }
  },

  gotoAnswerView: function(answerId) {
    var that = this;
    var answer = new Answer();
    answer.id = answerId;
    answer.viewer = 1;
    answer.fetch({
      success: function() {
        if (router.answerView) {
          //reuse the views so as to prevent rebinding of events
          router.answerView.model = answer;
          router.answerView.render();
        } else {
          router.answerView = new AnswerView({
            model: answer,
            el: '#showAnswer'
          }).render();
        }
        setTimeout(that.loadScroller, 200);
      },
      error: function() {
        new Error({
          message: "Error loading documents."
        });
      }
    });
  },

  gotoEditAnswerView: function(answerModel) {
    console.log("[router] Beginning display of the edit answer view");
    if (router.postAnswerView) {
      router.postAnswerView.render({
        model: answerModel
      });
    } else {
      router.postAnswerView = new PostAnswerView({
        model: answerModel,
        el: '#postAnswer'
      }).render();
    }
  },

  gotoPostAnswerView: function(questionId) {
    data = router.questionView.model;
    if (router.postAnswerView) {
      router.postAnswerView.model = data;
      router.postAnswerView.render();
    } else {
      router.postAnswerView = new PostAnswerView({
        model: data,
        el: '#postAnswer'
      }).render();
    }
  },

  gotoActivityView: function(userId, isBackEnabled) {
    var that = this;
    var activity = new Activity();
    activity.uid = userId;
    activity.fetch({
      success: function() {
        var activityView = new ActivityView({
          model: activity,
          el: '#activityPage'
        }).render();
        setTimeout(that.loadScroller, 200);
      },
      error: function() {
        new Error({
          message: "Error loading documents."
        });
      }
    });
    this.renderBackButton($('#activityPage'),isBackEnabled);
  },

  gotoBadgeView: function(userId, isBackEnabled) {
    var that = this;
    var badge = new Badge();
    badge.uid = userId;
    badge.fetch({
      success: function() {
        var badgeView = new BadgeView({
          model: badge,
          el: '#badgePage'
        }).render();
        setTimeout(that.loadScroller, 200);
      },
      error: function() {
        new Error({
          message: "Error loading documents."
        });
      }
    });
    this.renderBackButton($('#badgePage'),isBackEnabled);
  },

  renderBackButton: function(el, isBackEnabled) {
    var back = el.find('.left-back');
    var menu = el.find('.left-menu');
    if(isBackEnabled){
      menu.css('display','none');
      back.css('display','block');
      el.css('margin-left','0');
    }
    else {
      el.find('.left-menu').css('display','block');
      el.find('.left-back').css('display','none');
    }
    back.removeClass('ui-btn-right');
    back.addClass('ui-btn-left');
    menu.addClass('ui-btn-left');
  },

  gotoSkillView: function(userId, isBackEnabled) {
    var that = this;
    var skill = new Skill();
    skill.uid = userId;
    skill.fetch({
      success: function() {
        var skillView = new SkillView({
          model: skill,
          el: '#skillsPage'
        }).render();
        setTimeout(that.loadScroller, 200);
      },
      error: function() {
        new Error({
          message: "Error loading documents."
        });
      }
    });
    this.renderBackButton($('#skillsPage'),isBackEnabled);
  },

  gotoAttachmentView: function(url) {
    var data = new AttachmentModel({
      imgurl: url
    });
    if (router.attachmentView) {
      router.attachmentView.model = data;
      router.attachmentView.render();
    } else {
      router.attachmentView = new ImageView({
        model: data,
        el: '#attachment-content'
      }).render();
    }
    $.mobile.changePage('#attachmentPage', {
      transition: 'slide'
    });
  },

  gotoSettingsPage: function() {
    if (router.settingsView) {
      //reuse the views so as to prevent rebinding of events
      router.settingsView.render();
    } else {
      router.settingsView = new SettingsView({
        el: '#settings-content'
      }).render();
    }
    setTimeout(this.loadScroller, 200);
  },

  loadScroller: function() {
    var id = $.mobile.activePage.attr('id');
    if ($.mobile.activePage.find('.ui-content').length > 0) {
      if (id in this.myScroll) {
        this.myScroll[id].refresh();
      } else {
        this.myScroll[id] = new iScroll($.mobile.activePage.find('[data-role="content"]')[0], {
          hScroll: false,
          vScroll: true,
          hScrollbar: false,
          vScrollbar: false,
          fixedScrollbar: true,
          fadeScrollbar: false,
          hideScrollbar: true,
          bounce: true,
          momentum: true,
          lockDirection: true,
          onBeforeScrollStart: function(e) {
            var target = e.target;
            while (target.nodeType != 1) target = target.parentNode;
            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') e.preventDefault();
          }
        });
      }
    }
  },

};

window.test = {
  run: function() {
    var data = new Question({
      title: 'Question',
      description: 'description',
      tag1: 'tag1',
      tag2: 'tag2',
      tag3: 'tag3',
      askedBy: 'Amulya Khare',
      userPic: 'css/images/amu.png',
      answers: [{
        rating: '+2',
        answeredBy: 'James Panini',
        answer: 'This works like a charm!',
        ratingImg: 'css/images/answerRatingFlag_Green_40.png',
        commentsCount: '5'
      }, {
        rating: '+12',
        answeredBy: 'Raymond Tan',
        answer: 'What a nice answer to our work.',
        ratingImg: 'css/images/answerRatingFlag_Green_40.png',
        commentsCount: '10'
      }, {
        rating: '+2',
        answeredBy: 'James Panini',
        answer: 'This works like a charm!',
        ratingImg: 'css/images/answerRatingFlag_Green_40.png',
        commentsCount: '5'
      }, {
        rating: '+2',
        answeredBy: 'James Panini',
        answer: 'This works like a charm!',
        ratingImg: 'css/images/answerRatingFlag_Green_40.png',
        commentsCount: '5'
      }, {
        rating: '+2',
        answeredBy: 'James Panini',
        answer: 'This works like a charm!',
        ratingImg: 'css/images/answerRatingFlag_Green_40.png',
        commentsCount: '5'
      }]
    });
    var qv = new QuestionView({
      model: data
    }).render();
    $('#page2-content').html(qv.el);
  },
  load: function() {
    var data = new QuestionList([{
      id: '1',
      answersCount: '23',
      questionTitle: 'What is the meaning of life?',
      tag1: 'Life',
      tag2: 'Random',
      tag3: 'Awesome'
    }, {
      id: '2',
      answersCount: '2',
      questionTitle: 'What are we living for when we breathe?',
      tag1: 'Life',
      tag2: 'Random',
      tag3: 'Awesome'
    }, {
      id: '3',
      answersCount: '10',
      questionTitle: 'What are we living for when we breathe?',
      tag1: 'Life',
      tag2: 'Random',
      tag3: 'Awesome'
    }]);
    var qv = new QuestionListView({
      model: data
    }).render();
    $('#question-lst').html(qv.el);
  },
  loadPage3: function() {
    var data = new Answer({
      rating: '+2',
      answeredBy: 'James Panini',
      answer: 'This works like a charm!',
      ratingImg: 'css/images/answerRatingFlag_Green_40.png',
      commentsCount: '5',
      comments: [{
        comment: 'This is comment1',
        commentBy: 'Amulya Khare'
      }, {
        comment: 'This is comment2',
        commentBy: 'Rajul Gupta'
      }]
    });
    var qv = new AnswerView({
      model: data
    }).render();
    $('#page3-content').html(qv.el);
  },
};

$(document).ready(function() {
  templateLoader.load(["QuestionView", "AnswerView", "SkillView", "AnswerListItemView", "ImageView", "BadgeView", "BadgeListItemView", "QuestionListItemView", "AnswerView", "CommentListItemView", "PostAnswerView", "ActivityView", "ActivityListItemView", "SettingsView", "SkillListItemView"], function() {
    router.gotoQuestionListView();
  });
  $("#form1").submit(function() {
    $('#homePage').focus();
    //var searchurl = 'http://fuckme.herokuapp.com/question/search/'+$('#search-basic').attr('value');
    var keyword = $('#search-basic').attr('value');
    console.log(keyword);
    var questionList = new QuestionSearchList();
    questionList.term = escape(keyword);
    questionList.fetch({
      success: function() {
        console.log(questionList);
        var qv = new QuestionListView({
          model: questionList
        }).render();
        $('#question-lst').html(qv.el);
      },
      error: function() {
        new Error({
          message: "Error loading documents."
        });
      }
    });
    return false;
  });
  return false;
});
/*$("#comment-form").submit(function(){
      $('#answerView').focus();
      $('#comment-box').attr('value');
      var comment = new Comment({aid:router.answerView.model.get('id'),comment:$('#comment-box').attr('value'),uid:'1'});
      console.log(comment);
      comment.save();
      return false;
    });*/
/*$("#question-form").submit(function(){
      $('#postQuestion').focus();
      return false;
    });*/


$(window).bind('orientationchange', function() {
  if ($.mobile.activePage[0].id in myScroll) {
    myScroll[$.mobile.activePage[0].id].refresh();
  }
});
