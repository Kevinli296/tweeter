$(document).ready(() => {

  const $tweetText = $('#tweet-text');
  
  $tweetText.on('input', function() {
    const value = 140 - $(this).val().length;
    const counter = $(this).parent().find('#counterNumber');
    counter.text(value);
    if (value < 0) {
      counter.addClass('red-color');
    } else {
      counter.removeClass('red-color');
    }
    
  });
});




