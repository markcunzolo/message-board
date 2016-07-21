function getAllComments() {
  toggleSpinner(true);
  // TODO: your solution goes here
}

function addComment() {
  window.location.href = '/add-comment.html';
}

function editComment(commentId) {
  window.location.href = '/edit-comment.html?commentId=' + commentId;
}

function deleteComment(commentId) {
  // TODO: your solution does here
}

function toggleSpinner(isVisible) {
  document.getElementById('loading').classList[isVisible ? 'add' : 'remove']('visible');
}

function showComments(comments) {
  if (typeof comments === 'string') {
    comments = JSON.parse(comments);
  }

  // reverse sort so last updated is first!
  comments.sort(function(a, b) {
    if (a.updatedAt > b.updatedAt) {
      return -1;
    }
    
    if (a.updatedAt < b.updatedAt) {
      return 1;
    }

    return 0;
  });

  var commentsContainer = document.getElementById('commentsContainer');
  // clear the existing comments
  commentsContainer.innerHTML = '';

  comments.forEach(function(comment) {
    var commentDiv = document.createElement("div");
    var commentTextDiv = document.createElement("div");
    var commentDateDiv = document.createElement("p");

    // comment header
    var commentHtml = '<p>' + comment.createdBy +
      (comment.isImportant ? '&#160;<span class="label label-danger">IMPORTANT</span>' : '') + 
      '<button class="btn btn-danger pull-right" onclick="deleteComment(' + comment.id + ')"><i class="glyphicon glyphicon-trash"></i></button>' +
      '<button class="btn btn-primary pull-right" onclick="editComment(' + comment.id + ')"><i class="glyphicon glyphicon-pencil"></i></button>' +
    '</p>';

    // comment text
    commentTextDiv.innerHTML = comment.commentText;

    // comment date
    if (comment.createdAt === comment.updatedAt) {
      commentDateDiv.innerHTML = 'Created ' + moment(comment.createdAt).fromNow();
    } else {
      commentDateDiv.innerHTML = 'Last updated ' + moment(comment.updatedAt).fromNow();
    }

    commentDateDiv.classList.add('date');

    // update comment div
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = commentHtml;
    commentDiv.appendChild(commentTextDiv);
    commentDiv.appendChild(commentDateDiv);

    commentsContainer.appendChild(commentDiv);
  });
}

// This will make sure that all comments are loaded when page is loaded!
getAllComments();