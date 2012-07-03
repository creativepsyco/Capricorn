$(document).bind("mobileinit", function(){
  $.mobile.pushStateEnabled = true;
  $.mobile.touchOverflowEnabled = true;
});
var myScroll = [];
/*$(document).bind ('pageshow', function (e, data) {
   var id = $(this).attr('id');
   console.log (myScroll[id]);
   if ($.mobile.activePage.find('.ui-content').length > -10) {
        if (id in myScroll) {
            console.log('here!');
            myScroll[id].refresh();
        } else {
            console.log('there!');
            //console.log($.mobile.activePage.find('.ui-content')[0]);
            myScroll[id] = new iScroll($.mobile.activePage.find('.ui-content')[0], {
                hScroll        : false,
                vScroll        : true,
                hScrollbar     : false,
                vScrollbar     : true,
                fixedScrollbar : true,
                fadeScrollbar  : false,
                hideScrollbar  : false,
                bounce         : true,
                momentum       : true,
                lockDirection  : true
            });
        }
    }
   //if ($.mobile.activePage.attr('id') == 'page_spots') { console.log ('Bingo!'); }
});
*/
/*var myScroll = [];
$(document).delegate('[data-role="page"]', 'pageshow', function () {
  console.log();
  console.log($.mobile.activePage.find('.content'));
    var id = $(this).attr('id');
    if ($.mobile.activePage.find('.content').length > -10) {
        if (id in myScroll) {
            console.log('here!');
            myScroll[id].refresh();
        } else {
            console.log('there!');
            console.log($.mobile.activePage.find('.content')[0]);
            myScroll[id] = new iScroll($.mobile.activePage.find('.content')[0].attr('id'), {
                hScroll        : false,
                vScroll        : true,
                hScrollbar     : false,
                vScrollbar     : true,
                fixedScrollbar : true,
                fadeScrollbar  : false,
                hideScrollbar  : false,
                bounce         : true,
                momentum       : true,
                lockDirection  : true
            });
        }
    }
});*/




    $(function(){
      var menuStatus;
      
      // Show menu
      $("a.showMenu").click(function(){
        $('#menu').css('visibility','visible');
        if(menuStatus != true){       
        $(".ui-page-active").animate({
          marginLeft: "165px",
          }, 300, function(){menuStatus = true;});
          return false;
          } else {
          $(".ui-page-active").animate({
          marginLeft: "0px",
          }, 300, function(){menuStatus = false; $('#menu').css('visibility','hidden');});
          return false;
          }
      });
      
      $('div[data-role="page"]').live('pagebeforeshow',function(event, ui){
        menuStatus = false;
        $(".pages").css("margin-left","0");
      });
      
      // Menu behaviour
      $("#menu li a").click(function(){
        var p = $(this).parent();
        if($(p).hasClass('active')){
          $("#menu li").removeClass('active');
        } else {
          $("#menu li").removeClass('active');
          $(p).addClass('active');
        }
        setTimeout(function () {
          $(".ui-page-active").animate({
          marginLeft: "0px",
          }, 300, function(){menuStatus = false; $('#menu').css('visibility','hidden');});
        }, 500);
      });
    
      // Tabs 
      $('div[data-role="navbar"] a').live('click', function () {
        $(this).addClass('ui-btn-active');
        $('div.content_div').hide();
        $('div#' + $(this).attr('data-href')).show();
      });


}); 