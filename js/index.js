function getAllMessages() {
  toggleSpinner(true);
  // TODO: your solution goes here
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      toggleSpinner(false);
      showMessages(xhttp.responseText);
    }
  };

  xhttp.open('GET', apiEndpointBase, true);
  xhttp.send();
}

function addMessage() {
  window.location.href = '/add-message.html';
}

function editMessage(messageId) {
  window.location.href = '/edit-message.html?messageId=' + messageId;
}

function deleteMessage(messageId) {
  // TODO: your solution does here
}

function toggleSpinner(isVisible) {
  document.getElementById('loading').classList[isVisible ? 'add' : 'remove']('visible');
}

function showMessages(messages) {
  if (typeof messages === 'string') {
    messages = JSON.parse(messages);
  }

  // reverse sort so last updated is first!
  messages.sort(function(a, b) {
    if (a.updatedAt > b.updatedAt) {
      return -1;
    }
    
    if (a.updatedAt < b.updatedAt) {
      return 1;
    }

    return 0;
  });

  var messagesContainer = document.getElementById('messagesContainer');
  // clear the existing messages
  messagesContainer.innerHTML = '';

  messages.forEach(function(message) {
    var messageDiv = document.createElement("div");
    var messageTextDiv = document.createElement("div");
    var messageDateDiv = document.createElement("p");

    // message header
    var messageHtml = '<p>' + message.createdBy +
      (message.isImportant ? '&#160;<span class="label label-danger">IMPORTANT</span>' : '') + 
      '<button class="btn btn-danger pull-right" onclick="deleteMessage(' + message.id + ')"><i class="glyphicon glyphicon-trash"></i></button>' +
      '<button class="btn btn-primary pull-right" onclick="editMessage(' + message.id + ')"><i class="glyphicon glyphicon-pencil"></i></button>' +
    '</p>';

    // message text
    messageTextDiv.innerHTML = message.commentText;

    // message date
    if (message.createdAt === message.updatedAt) {
      messageDateDiv.innerHTML = 'Created ' + moment(message.createdAt).fromNow();
    } else {
      messageDateDiv.innerHTML = 'Last updated ' + moment(message.updatedAt).fromNow();
    }

    messageDateDiv.classList.add('date');

    // update message div
    messageDiv.classList.add('message');
    messageDiv.innerHTML = messageHtml;
    messageDiv.appendChild(messageTextDiv);
    messageDiv.appendChild(messageDateDiv);

    messagesContainer.appendChild(messageDiv);
  });
}

// This will make sure that all messages are loaded when page is loaded!
getAllMessages();