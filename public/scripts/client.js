/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// DATA ---------------------------------------------------
const $form = $('.tweet-submission');
const $textArea = $('#tweet-text');
const $tweetsContainer = $('#tweets-container');

// FUNCTIONS ----------------------------------------------
const renderTweets = function (tweets) {
  let result = {};
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    result = createTweetElement(tweet);
    $('#tweets-container').prepend(result);
  }

  return result;
}

const createTweetElement = function (tweet) {
  let $tweet = $(`
<br>
<article class="tweet">
<header class="tweet-header">
<img class="tweet-avatar" src="${tweet.user.avatars}" />
<span class="tweet-username">${tweet.user.name}</span>
<span class="tweet-handle">${tweet.user.handle}</span>
</header>
<h3>
${tweet.content.text}
</h3>
<footer class="tweet-footer">
10 days ago
<img class="tweet-icons" src="/images/tweet-icons.jpg">
</footer>
</article> 
`);

  return $tweet;
}

const tweetSubmit = function () {
  $form.on('submit', function (event) {
    const text = $(this).serialize();
    event.preventDefault();

    if ($textArea.val() === '') {
      alert('No input in tweet!');
    } else if ($.trim($textArea.val()) === '') {
      alert('Input is blank');
    } else if ($textArea.val().length > 140) {
      alert('Too many characters!');
    } else {
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: text
      }).then(function (data) {
        $form.trigger('reset');
        loadTweets();
        console.log('Success: ', data);
      }).catch(function (data) {
        console.log('Error: ', data);
      });
    }
  });
}

const loadTweets = function () {
  $.ajax({
    type: "GET",
    url: '/tweets'
  }).then(function (data) {
    renderTweets(data);
  });
}

// When Document is Ready ----------------------------------
$(document).ready(() => {

  loadTweets();
  tweetSubmit();

});