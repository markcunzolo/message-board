function getComment() {
  // TODO: your solution goes here
}

function editComment() {
  // TODO: your solution goes here
  window.location.href = '/index.html';
}

var commentId = getQueryStringValue('commentId');

if (commentId) {
  commentId = parseInt(commentId, 10);
} else {
  var result = confirm("Sorry pal, you can't edit a comment unless it's got an id!");

  // result true means they clicked OK
  if (result === true) {
    window.location.href = '/';
  } else {
    window.location.href = '/';
  }

  // PSST! Hey you!
  // We're sending them back to the index no matter what they choose.
  // In that case, I didn't have to use an if/else block.
  // But, you might want to use a confirm box somewhere else in your code
  // and I thought this might be handy. HINT HINT!
}

getComment();