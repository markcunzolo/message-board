function addMessage() {
  var comment = {
  	comment: {
  		createdBy: document.getElementById('createdBy').value,
  		commentText: document.getElementById('commentText').value,
  		isImportant: document.getElementById('isImportant').checked
  	}
  };
  var xhttp = new XMLHttpRequest();
  xhttp.open('POST', apiEndpointBase, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(comment));
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      alert("Your message was submitted");
      window.location.href = './indexTable.html' + '?' + determineConditions();
    } else if (xhttp.readyState === 4 && xhttp.status > 200) {
      alert("Their was an error. Try again.");
    }
  };
  return false;
}


function determineConditions() {
  var queryString = window.location.search.substring(1);
  return queryString;
}