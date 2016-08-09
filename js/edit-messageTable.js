function getMessage() {
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', apiEndpointBase + "/" + messageId, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      var comment = JSON.parse(xhttp.responseText);
      document.getElementById('commentText').value = comment.commentText;
      document.getElementById('isImportant').checked = comment.isImportant;
    } else if (xhttp.readyState === 4 && xhttp.status > 200) {
      alert("Their was an error. Try again.");
    }
  };
  return false;
}



function editMessage() {
  var result = confirm("Are you sure you want to change this message?");
  if (result === false) {
    window.location.href = './edit-messageTable.html?messageId=' + messageId;
  } 
  var comment = {
    comment: {
      commentText: document.getElementById('commentText').value,
      isImportant: document.getElementById('isImportant').checked
    }
  };
  var xhttp = new XMLHttpRequest();
  xhttp.open('PUT', apiEndpointBase + '/' + messageId, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(comment));
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      alert("Your message was successfully updated.");
      window.location.href = './indexTable.html' + '?' + determineConditions();
    }
    else if (xhttp.readyState == 4 && xhttp.status > 200) {
      alert("Your message was not successfully updated.");
      window.location.href = './indexTable.html';
    }
  };
  return false;
}

function determineConditions () {
  var queryString = window.location.search.substring(1);
  var vars = queryString.split('&');
  var conditionsString = vars[1] + '&' + vars[2];
  return conditionsString;
}



var messageId = getQueryStringValue('messageId');

if (messageId) {
  messageId = parseInt(messageId, 10);
} else {
  var result = confirm("Sorry pal, you can't edit a message unless it's got an id!");

  // result true means they clicked OK
  if (result === true) {
    window.location.href = './indexTable.html';
  } else {
    window.location.href = './indexTable.html';
  }
}



getMessage();




