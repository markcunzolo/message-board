function getAllMessages() { //gets all comments from api and passes response to showMessages fxn
  toggleSpinner(true);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      toggleSpinner(false);
      showMessages(xhttp.responseText); //passes response into showMessages fxn
    }
  };
  xhttp.open('GET', apiEndpointBase, true);
  xhttp.send();
}



/*------------------------------ Important only functions ---------------------------------*/

function importantMessages() { //if the box is checked, get important comments from important api and pass to showMessages fxn
  var importantOnly = document.getElementById("importantOnly").checked;
  var commentorName = document.getElementById('commentorName').value;
  if (importantOnly && commentorName !== "general"){ //if checked after name selected
    getImportantByName(commentorName);
  }
  else if (importantOnly) { //if checked only
      toggleSpinner(true);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4) {
          toggleSpinner(false);
          showMessages(xhttp.responseText);
        }
      };
      xhttp.open('GET', apiImportantCommentsCall, true);
      xhttp.send();
  }
  else if (!importantOnly && commentorName !== "general") { //if unchecked after name selected
    messagesByName(commentorName);
  }
  else {
    getAllMessages(); //if unchecked just get all messages
  }
}



function getImportantByName(selectValue) { 
  toggleSpinner(true);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      toggleSpinner(false);
      showMessages(xhttp.responseText);
    }
  };
  xhttp.open('GET', apiImportantCommentsCall + '/' + selectValue, true);
  xhttp.send();
}


/*------------------------------ Select element functions ---------------------------------*/

function updateSelectDropdown() { //get commentor names from api, parse the string, and pass it into the createSelectOptions fxn
  var xhttp = new XMLHttpRequest(); //executed immediately when page loads
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      createSelectOptions(JSON.parse(xhttp.responseText));
      determineConditions();
    }
  };
  xhttp.open('GET', apiCommentorNameArray, true);
  xhttp.send();
}

function createSelectOptions (names) { //creates a new option element for every array index in the response and appends it to select
  var commentorName = document.getElementById('commentorName');
  names.forEach(function(name) {
    var newOpt = document.createElement('option');
    newOpt.value = name;
    newOpt.id = name; //added id to help automatic name selection
    newOpt.innerHTML = name;
    commentorName.appendChild(newOpt);
  });
}

function determineNameSelected() { //when a name is selected, the value of the select is determined and messagesByName fxn runs
  var commentorName = document.getElementById('commentorName').value;
  var importantOnly = document.getElementById("importantOnly").checked;
  if (!importantOnly && commentorName !== "general") {
    messagesByName(commentorName);
  }
  else if (importantOnly && commentorName !== "general") {
    getImportantByName(commentorName);
  }
  else if (importantOnly && commentorName === "general") {
    importantMessages();
  }
  else {
    getAllMessages();   
  }
}

function messagesByName (selectValue) { //get all comments from the api for the name passed in
  toggleSpinner(true);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      toggleSpinner(false);
      showMessages(xhttp.responseText);
    }
  };
  xhttp.open('GET', apiCommentsByName + '/' + selectValue, true);
  xhttp.send();
}




function addMessage() {
  window.location.href = './add-message.html';
}




function editMessage(messageId) {
  var importantOnly = document.getElementById("importantOnly").checked;
  var commentorName = document.getElementById('commentorName').value;
  var conditions = '&name=' + commentorName + '&isImportant=' + importantOnly;  
  window.location.href = './edit-message.html?messageId=' + messageId + conditions;
}




function deleteMessage(messageId) {
  var result = confirm("Are you sure you want to delete this message?");
  if (result === false) {
    return;
  } 
  var xhttp = new XMLHttpRequest();
  xhttp.open('DELETE', apiEndpointBase + '/' + messageId, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      alert("Your message was successfully deleted.");
      window.location.href = './index.html';
    }
    else if (xhttp.readyState == 4 && xhttp.status > 200) {
      alert("Your message was not successfully deleted.");
      return;
    }
  };
}




function toggleSpinner(isVisible) {
  document.getElementById('loading').classList[isVisible ? 'add' : 'remove']('visible');
}




function pageRefresh() {
  window.location.href = './index.html';
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



function determineConditions () {
  var queryString = window.location.search.substring(1);
  var vars = queryString.split('&');
  var nameCondition = vars[0].split('=')[1];
  var singleNameArray = nameCondition.split('%20');
  var importantCondition = vars[1].split('=')[1];
  if (singleNameArray[1] === undefined) {
    if (importantCondition === 'true') {
      document.getElementById('importantOnly').checked = true;
      document.getElementById(nameCondition).selected = true;
      importantMessages();
    }
    else {
      document.getElementById('importantOnly').checked = false;
      document.getElementById(nameCondition).selected = true;
      importantMessages();      
    }
  }
  else {
    var nameWithSpace = singleNameArray[0] + ' ' + singleNameArray[1];
    if (importantCondition === 'true') {
      document.getElementById('importantOnly').checked = true;
      document.getElementById(nameWithSpace).selected = true;
      importantMessages();
    }
    else {
      document.getElementById('importantOnly').checked = false;
      document.getElementById(nameWithSpace).selected = true;
      importantMessages();      
    }
  }





  if (importantCondition === 'true') {
    document.getElementById('importantOnly').checked = true;
    //document.getElementById(nameCondition).selected = true;
    importantMessages();
  }
  

  var nameWithSpace = singleNameArray[0] + ' ' + singleNameArray[1];
}



// This will make sure that all messages are loaded when page is loaded!
getAllMessages();
updateSelectDropdown();
















