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

 const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

 const renderTweets = function(tweets) {
   let result = {};
  for (const tweet of tweets) {
    result = createTweetElement(tweet);
    $('#tweets-container').append(result);
  }

  return result;
}

const createTweetElement = function(tweet) {
  let $tweet = $(`
  <br>
  <article class="tweet">
  <header class="tweet-header">
  <img class="tweet-avatar" src="${tweet.user.avatars}" />
  <span class="tweet-username">${tweet.user.name}</span>
  <span class="tweet-handle hover-state">${tweet.user.handle}</span>
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

renderTweets(data);

});