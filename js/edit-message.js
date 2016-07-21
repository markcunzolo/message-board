function getMessage() {
  // TODO: your solution goes here
}

function editMessage() {
  // TODO: your solution goes here
  window.location.href = '/index.html';
}

var messageId = getQueryStringValue('messageId');

if (messageId) {
  messageId = parseInt(messageId, 10);
} else {
  var result = confirm("Sorry pal, you can't edit a message unless it's got an id!");

  // result true means they clicked OK
  if (result === true) {
    window.location.href = '/';
  } else {
    window.location.href = '/';
  }

  // PSST! Hey you! Yeah, you intrepid student!
  // We're sending them back to the index no matter what they choose.
  // In that case, I didn't have to use an if/else block.
  // But, you might want to use a confirm box somewhere else in your code
  // and I thought this might be handy. HINT HINT!
}

getMessage();