# Code School Message Board Lab
Using your wits and knowledge of `XMLHttpRequest`, add code to make this a functioning message board!

## Requirements
A user should be able to
* View all messages,
* Create a message,
* Edit a message, and 
* Delete a message

### Viewing messages
Some handsome devil already wrote all of the code you need to display the messages, you just have to write the code to retrieve them. (Hey, that sounds a lot like the Movie Search Lab!)

### Creating messages
Comments should have 3 fields: 
* `createdBy` (string): the name of the person writing the comment
* `commentText` (string): the text of the comment (which can also include HTML)
* `isImportant` (boolean): because some people think their messages are more important than others. Jerks!

Remember that the API is expecting you to send it data in the following format:
``` json
{
  "comment": {
    "createdBy": "",
    "commentText": "",
    "isImportant": false
  }
}
```

### Editing messages
You cannot update the `createdBy` field of a comment once it's been created. Remember that when you create your form!

Remember that the API is expecting you to send it data in the following format:
``` json
{
  "comment": {
    "commentText": "",
    "isImportant": false
  }
}
```

### Deleting messages
Sometimes users click on things that they didn't mean to. Don't automatically delete the comment when they click the delete button. Make sure you make the user _confirm_ (*cough* HINT *cough*) that they want to delete the comment before you delete it!
