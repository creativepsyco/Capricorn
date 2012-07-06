window.uid = -1;
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
    var that = this;
    $.mobile.showPageLoadingMsg();
    var homepage = new QuestionPage({
      el: '#homePage'
    });
    var questionList = new QuestionList();
    questionList.fetch({
      success: function() {
        router.questionList = new QuestionListView({
          model: questionList
        }).render();
        $('#question-lst').html(router.questionList.el);
        $.mobile.hidePageLoadingMsg();
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
      router.postQuestionView.model = null;
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
    question.viewer = window.uid;
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
      router.postQuestionView.model = questionModel;
      router.postQuestionView.render();
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
    answer.viewer = window.uid;
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
      router.postAnswerView.model = answerModel;
      router.postAnswerView.render();
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
    this.renderBackButton($('#activityPage'), isBackEnabled);
    if(userId == -1 || userId == '-1')
    {
      $('#activity-content').empty();
      $('#activity-lst').empty();
      $(document).find('.login-msg').css('visibility','visible');
      return;
    }
    $(document).find('.login-msg').css('visibility','hidden');
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
  },

  gotoBadgeView: function(userId, isBackEnabled) {
    this.renderBackButton($('#badgePage'), isBackEnabled);
    if(userId == -1 || userId == '-1')
    {
      $('#badge-content').empty();
      $('#badge-lst').empty();
      $(document).find('.login-msg').css('visibility','visible');
      return;
    }
    $(document).find('.login-msg').css('visibility','hidden');
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
  },

  renderBackButton: function(el, isBackEnabled) {
    var back = el.find('.left-back');
    var menu = el.find('.left-menu');
    if (isBackEnabled) {
      menu.css('display', 'none');
      back.css('display', 'block');
      el.css('margin-left', '0');
    } else {
      menu.css('display', 'block');
      back.css('display', 'none');
    }
    back.removeClass('ui-btn-right');
    back.addClass('ui-btn-left');
    menu.addClass('ui-btn-left');
  },

  gotoSkillView: function(userId, isBackEnabled) {
    this.renderBackButton($('#skillsPage'), isBackEnabled);
    if(userId == -1 || userId == '-1')
    {
      $('#skills-content').empty();
      $('#skills-lst').empty();
      $(document).find('.login-msg').css('visibility','visible');
      return;
    }
    $(document).find('.login-msg').css('visibility','hidden');
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

  postLoginInit: function() {
    console.log('there');
    var userModel = new UserSaveModel({name: IVLE.getCachedUserName(), nusid: IVLE.getCachedUserId(), pictureUrl: 'css/images/defaultProfile.png'});
    
    userModel.save(null, {
      success: function(model, resp) {
        window.uid = resp;
        $(document).find('.login-msg').css('visibility','hidden');
      },
      error: function() {
        alert('Error in Login');
      }
    });
  },

  toTitleCase: function(str)
  {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  },

  gotoLoginView: function() {
    // Empty callback for the login 
    var callback_function = function() {
        if (IVLE.isLoggedIn()) {
          //make a call for user save
          console.log('nusid' + IVLE.getCachedUserId());
          
          var userModel = new UserSaveModel({
            name: router.toTitleCase(IVLE.getCachedUserName()),
            nusid: IVLE.getCachedUserId(),
            pictureUrl: 'css/images/defaultProfile.png'
          });

          // trigger saving
          userModel.save(null, {
            success: function(model, resp) {
              window.uid = resp;
            },
            error: function() {
              alert('Error in Login');
            }
          });
        } else {
        }
      };
    IVLE.login_with_callback(callback_function);
  },

  updateProfilePic: function(img_url) {
    var userModel = new UserProfilePicEditModel({ uid: String(window.uid), pictureUrl: img_url });
    userModel.save();
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
  templateLoader.load(["QuestionView", "QuestionView", "AnswerView", "SkillView", "AnswerListItemView", "ImageView", "BadgeView", "BadgeListItemView", "QuestionListItemView", "AnswerView", "CommentListItemView", "PostAnswerView", "ActivityView", "ActivityListItemView", "SettingsView", "SkillListItemView"], function() {
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

$("#homePage").live('pagebeforeshow', function(event, data) {
  router.gotoQuestionListView();
});

var BlackBerryBrowser = {

    init: function() {
      this.browser = blackberry.polarmobile.childbrowser;
    },

    loadURL: function(url) {
      this.browser.loadURL(url);
    },

    locationChanged: function(url, onchange) {
      // Poll every 100ms until some_condition is true
      $.doTimeout( 1000, function(){
        var loc = BlackBerryBrowser.browser.getLocation();
        if ( loc != url ) {
          url = loc;
          BlackBerryBrowser.onLocationChanged(loc, onchange);
        }
        return true;
      });
    },

    onLocationChanged: function(loc, onchange) {
      onchange(loc);
    },

    fblocationChanged: function(url, onchange) {
      // Poll every 100ms until some_condition is true
      $.doTimeout( 1000, function(){
        var loc = BlackBerryBrowser.browser.getLocation();
        BlackBerryBrowser.onLocationChanged(loc, onchange);
        return true;
      });
    },

    onLocationChanged: function(loc, onchange) {
      onchange(loc);
    },

    close: function() {
      this.browser.close();
    },

    IVLELoginCallback: function(loc) {
      var token_loc = IVLE.search(loc);
      if (token_loc && token_loc.length > 0 && token_loc != 'undefined') 
      {
        IVLE.Token = token_loc;
        OfflineStorageAPI.setValue("USER_TOKEN", IVLE.Token);
        BlackBerryBrowser.close();
        IVLE.getInitialUserObject();
      }
    },

    FacebookLoginCallback: function(loc) {
      if (loc.indexOf("error_reason=user_denied") > -1 || loc == "" || loc == null || loc == "undefined" || loc.indexOf("_path=permissions.request") > -1) 
      {
        return;
      }
      else
      {
        var fbCode = loc.match(/access_token=(.*)$/)[1];
        var last_index = fbCode.lastIndexOf('&expires_in=');

        var token_code = fbCode.substr(0, last_index);
        OfflineStorageAPI.setValue("USER-FB-TOKEN", token_code);
        Facebook.getInitialGraphObject();
        BlackBerryBrowser.close();

        $.ajax({
          url: 'https://graph.facebook.com/oauth/access_token?client_id=' + my_client_id + '&client_secret=' + my_secret + '&code=' + fbCode + '&redirect_uri=http://www.facebook.com/connect/login_success.html',
          data: {},
          dataType: 'text',
          type: 'POST',
          success: function(data, status) 
          {
            facebook_token = data.split("=")[1];
          },
          error: function(error) {
          }
        });
      }
    },

    FacbookLoginInit: function(callback) {
      var authorize_url = "https://graph.facebook.com/oauth/authorize?";
      authorize_url += "client_id=" + my_client_id;
      authorize_url += "&redirect_uri=" + my_redirect_uri;
      authorize_url += "&display=page";
      authorize_url += "&response_type=token";
      authorize_url += "&scope=publish_stream,offline_access";
      this.loadURL(authorize_url);
      Facebook.callback_func = callback;
      this.fblocationChanged(authorize_url, this.FacebookLoginCallback);
    },

    IVLELoginInit: function(callback_func) {
      this.loadURL(LoginURL);
      IVLE.callback_func = callback_func;
      this.locationChanged(LoginURL, this.IVLELoginCallback);
    },
};
