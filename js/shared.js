//query string for all comments
var apiEndpointBase = 'http://code-school-comments-api.herokuapp.com/comments';

//query string for all important comments
var apiImportantCommentsCall = 'http://code-school-comments-api.herokuapp.com/important-comments';

//query string for array of commentor names
var apiCommentorNameArray = 'http://code-school-comments-api.herokuapp.com/comments-created-by-names';

//query string for all comments by particular name
var apiCommentsByName = 'http://code-school-comments-api.herokuapp.com/comments-by-name';

//gets the query string and finds the number at the end
function getQueryStringValue (key) {  
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}