/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready (() => {

    // Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }

 const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

const createTweetElement = function(tweet) {
  let $tweet = $(`
  <br>
  <article class="tweet">
  <header class="tweet-header">
  <img class="tweet-avatar" src="${tweetData.user.avatars}" />
  <span class="tweet-username">${tweetData.user.name}</span>
  <span class="tweet-handle hover-state">${tweetData.user.handle}</span>
  </header>
  <h3>
  Sample text boiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
  </h3>
  <footer class="tweet-footer">
  10 days ago
  <img class="tweet-icons" src="/images/tweet-icons.jpg">
  </footer>
  </article> 
  `);
  /* Your code for creating the tweet element */
  // ...
  return $tweet;
}

 const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});