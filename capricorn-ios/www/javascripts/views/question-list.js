$(document).ready(function(){
    $(".like-btn").click(function()
    {
        if($(this).attr('src') == 'css/images/likeButton-Green-24X24.png')
        {
            $(this).attr('src','css/images/likeButton-Grey-24X24.png');
        }
        else
        {
            $(this).attr('src','css/images/likeButton-Green-24X24.png');
        }
    });
    $(".dislike-btn").click(function()
       {
       if($(this).attr('src') == 'css/images/dislikeButton-Red-24X24.png')
       {
            $(this).attr('src','css/images/dislikeButton-Grey-24X24.png');
       }
       else
       {
            $(this).attr('src','css/images/dislikeButton-Red-24X24.png');
       }
    });
    $(".comment-btn").mousedown(function()
      {
            $(this).attr('src','css/images/comment-Grey-24X24.png');
      });
    $(".comment-btn").mouseup(function()
      {
    
      $(this).attr('src','css/images/comment-Blue-24X24.png');
      
      });
});