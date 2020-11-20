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

/**
 * @function renderTweets renders tweets for the user to see.
 * @param tweets refers to the database of tweets we're using.
 * @return rendered tweets including both preexisting tweets and user tweets.
 */
const renderTweets = function(tweets) {
  let result = {};
  // Clears the tweet container to prevent duplication of tweets being rendered.
  $tweetsContainer.empty();
  for (const tweet of tweets) {
    result = createTweetElement(tweet);
    // Using prepend to render tweets in descending order.
    $tweetsContainer.prepend(result);
  }
  return result;
};

/**
 * @function escape creates a safe text DOM node in place of a string. This is to prevent cross-site scripting.
 * @param str a string we're passing in to use as text.
 * @return a user created Tweet, consisting of the user's avatar, name, handle, message and post date.
 */
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/**
 * @function getDate retrieves the time of a tweets creation.
 * @param milliseconds the milliseconds since the tweets creation.
 * @return a number followed by the corresponding unit of time for a tweet's creation date (ex. 5 Hours ago.)
 */
const getDate = (milliseconds) => {
  const datePosted = new Date(milliseconds);
  const dateNow = new Date().getTime();
  const time = Math.abs(dateNow - datePosted);
  let sum = 0;
  let unit = '';
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

/**
 * @function createTweetElement creates the HTML template of a tweet.
 * @param tweet refers to the database of tweets we're using.
 * @safeHTML uses the escape function to create a safe text DOM node in place of a users tweet.
 * @tweetPostDate uses the getDate function to retrieve a tweets date of creation.
 * @return a user created Tweet, consisting of the user's avatar, name, handle, message and post date.
 */
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
  <h3>${safeHTML}</h3>
  <footer class="tweet-footer">
  ${tweetPostDate}
    <div class="tweet-icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-heart"></i>
      <i class="fas fa-retweet"></i>
    </div>
    </footer>
  </article> 
  `);
  return $tweet;
};

/**
 * @function tweetSubmit handles a users tweet submission. once the submit button is clicked, an AJAX POST request is made.
 * @event.preventDefault() is fired to prevent the page from reloading and redirecting.
 * Several conditions are in place to prompt the user with errors should the tweet be invalid.
 * If the AJAX POST request is successful, the users new tweet will be loaded overtop of the pre-existing tweets.
 * The form will also be reset, ready for a new tweet from the user.
 */
const tweetSubmit = function() {
  $form.on('submit', function(event) {
    const text = $(this).serialize();
    const $alertPrompt = $('#alert-prompt');
    event.preventDefault();
    if ($textArea.val() === '') {
      $alertPrompt.text('⛔️ Your tweet is empty. ⛔️');
      $alertPrompt.slideDown('fast').css({"display": "flex"});
    } else if ($.trim($textArea.val()) === '') {
      $alertPrompt.text('⛔️ You cannot tweet a blank tweet. ⛔️');
      $alertPrompt.slideDown('fast').css({"display": "flex"});
    } else if ($textArea.val().length > 140) {
      $alertPrompt.text('⛔️ Your tweet has too many characters. ⛔️');
      $alertPrompt.slideDown('fast').css({"display": "flex"});
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

/**
 * @function loadTweets makes an AJAX GET request to retreive the data of tweets.
 * Once the GET request is successful, tweets are then rendered onto the page.
 */
const loadTweets = function() {
  $.ajax({
    type: "GET",
    url: '/tweets'
  }).then(function(data) {
    renderTweets(data);
  });
};

/**
 * @function writeTweet focuses the textbox area, bringing the user to the textbox
 * whenever 'Write a new tweet' is clicked.
 */
const writeTweet = function() {
  $writeTweet.on('click', function() {
    $textArea.focus();
  });
};

$(document).ready(() => {
  writeTweet();
  loadTweets();
  tweetSubmit();
});