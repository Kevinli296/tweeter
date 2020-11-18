// Short-hand: $(() => {});

$(document).ready(() => {
  // console.log(jQuery);

  // assign jquery variable for the textbox
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

  // $tweetText.on('input', function () {
  //   const value = 140 - $(this).val().length;
  //   const counter = $(this).parent().find('#counterNumber');
  //   counter.text(value);
  //   if (value < 0) {
  //     counter.addClass('red-color');
  //   } else {
  //     counter.removeClass('red-color');
  //   }

  // });
});