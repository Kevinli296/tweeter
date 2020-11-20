const $tweetText = $('#tweet-text');

/**
 * @function charCounter() keeps track of the total characters in the text area.
 * Once exceeded the character limit, the counter turns red.
 */
const charCounter = function() {
  // Creating an event handler on any 'input' into the text area.
  $tweetText.on('input', function() {
    const value = 140 - $(this).val().length;
    const counter = $(this).parent().find('#counterNumber');
    counter.val(value);
    if (value < 0) {
      counter.addClass('red-color');
    } else {
      counter.removeClass('red-color');
    }
  });
};

$(document).ready(() => {
  charCounter();
});