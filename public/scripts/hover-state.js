$(document).ready(() => {

  const $existingTweet = $('.tweet');

  $existingTweet.on('mouseenter', function () {
    const handle = $(this).parent().find('.tweet-handle');
    handle.removeClass('hover-state');
    $existingTweet.addClass('box-shadow');
  });

  $existingTweet.on('mouseleave', function() {
    const handle = $(this).parent().find('.tweet-handle');
    handle.addClass('hover-state');
    $existingTweet.removeClass('box-shadow')
  });

});