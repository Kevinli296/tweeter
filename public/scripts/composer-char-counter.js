// Short-hand: $(() => {});

$(document).ready(() => {
  // console.log(jQuery);

  // assign jquery variable for the textbox
  const $tweetText = $('#tweet-text');
  
  // registering focus for when entering textbox
  // *remember using FAT ARROW will not work when referencing "this"
  // $tweetText.focus (function() {
  //   console.log('Clicked into textbox')
  //   // console.log(this);
  // });

  // registering blur for when leaving textbox
  // $tweetText.blur (function() {
  //   console.log('Clicked out of textbox');
  //   // console.log(this);
  // });

  // registering keypress event handler within textbox 
  // for when there is input
  // $tweetText.keypress (() => {
  //   console.log('Key was pressed');
  // });

  // registering keyup handler when key is released
  // $tweetText.keyup (() => {
  // console.log('Key was released');
  // });

  // registering keydown handler when key is pressed down
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



  // registering input handler for when there is an input
  // $tweetValue.input();

  $tweetText.change (() => {
    console.log('Change');
  });


});


