/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// DATA ---------------------------------------------------
const $form = $('.tweet-submission');
const $textArea = $('#tweet-text');
const $tweetsContainer = $('#tweets-container');
const $writeTweet = $('#newTweetIcon');

// FUNCTIONS ----------------------------------------------
const renderTweets = function(tweets) {
  let result = {};
  $tweetsContainer.empty();
  for (const tweet of tweets) {
    result = createTweetElement(tweet);
    $tweetsContainer.prepend(result);
  }

  return result;
};

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const safeHTML = `${escape(tweet.content.text)}`;
  const tweetPostDate = `${getDate(tweet.created_at)}`;
  let $tweet = $(`
  <br>
  <article class="tweet">
  <header class="tweet-header">
  <img class="tweet-avatar" src="${tweet.user.avatars}" />
  <span class="tweet-username">${tweet.user.name}</span>
  <span class="tweet-handle">${tweet.user.handle}</span>
  </header>
  <h3>
  ${safeHTML}
  </h3>
  <footer class="tweet-footer">
  ${tweetPostDate}
  <img class="tweet-icons" src="/images/tweet-icons.png">
  </footer>
  </article> 
  `);

  return $tweet;
};

const tweetSubmit = function() {
  $form.on('submit', function(event) {
    const text = $(this).serialize();
    const $alertPrompt = $('#alert-prompt');
    event.preventDefault();

    if ($textArea.val() === '') {
      $alertPrompt.text('⛔️ Your tweet is empty. ⛔️');
      $alertPrompt.slideDown('fast');
    } else if ($.trim($textArea.val()) === '') {
      $alertPrompt.text('⛔️ You cannot tweet a blank tweet. ⛔️');
      $alertPrompt.slideDown('fast');
    } else if ($textArea.val().length > 140) {
      $alertPrompt.text('⛔️ Your tweet has too many characters. ⛔️');
      $alertPrompt.slideDown('fast');
    } else {
      $.ajax({
        type: "POST",
        url: '/tweets',
        data: text
      }).then(function(data) {
        $alertPrompt.slideUp('fast');
        $form.trigger('reset');
        loadTweets();
      }).catch(function(data) {
        console.log('Error: ', data);
      });
    }
  });
};

const loadTweets = function() {
  $.ajax({
    type: "GET",
    url: '/tweets'
  }).then(function(data) {
    renderTweets(data);
  });
};

const getDate = milliseconds => {
  const datePosted = new Date(milliseconds);
  const dateNow = new Date().getTime();
  const time = Math.abs(dateNow - datePosted);
  let sum;
  if (time < 1000 * 60) {
    sum = Math.floor(time / (1000));
    unit = 'Second ago';
    if (sum > 1 && unit === 'Second ago') {
      unit = 'Seconds ago';
    }
  } else if (time < 1000 * 60 * 60) {
    sum = Math.floor(time / (1000 * 60));
    unit = 'Minute ago';
    if (sum > 1 && unit === 'Minute ago') {
      unit = 'Minutes ago';
    }
  } else if (time <= 1000 * 60 * 60 * 24) {
    sum = Math.floor(time / (1000 * 60 * 60));
    unit = 'Hour ago';
    if (sum > 1 && unit === 'Hour ago') {
      unit = 'Hours ago';
    }
  } else {
    sum = Math.floor(time / (1000 * 60 * 60 * 24));
    unit = 'Day ago';
    if (sum > 1 && unit === 'Day ago') {
      unit = 'Days ago';
    }
  }
  return `${sum} ${unit}`;
};

const writeTweet = function() {
  $writeTweet.on('click', function() {
    $textArea.focus();
  })
}

// When Document is Ready ----------------------------------
$(document).ready(() => {

  writeTweet();
  loadTweets();
  tweetSubmit();

});