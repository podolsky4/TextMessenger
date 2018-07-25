REST architecture (simple example to start)

| Resource      | GET (read) |POST (create) |PUT (update) | DELETE|
| ------------- |:-------------:| :-----:|:-----:|-----:|
| api/users/ | |create new User| | |
| api/users/{id} | return User where user_id={id} | | return status of update User where user_id={id} | return id User was delete where user_id={id}|
| | | | | |
| | | | | |
| api/dialogs| | create new Dialog | update Dialog | |
| api/dialogs/user/{id} | get Dialogs by User where user_id={id }| create dialog with user in the list users | | |
| | | | | |
| | | | | |
| api/messages |  |  | update message  | delete message  |
| api/messages/dialog/{id} | Get List\<Message> where dialog_id={id} | create me message and insert to the dialog where dialog_id={id} | | |
| | | | | |
| | | | | |
| api/posts/ | | | update post  | delete post |
| api/posts/user/{id} | return list<Post> allow user where id={id}| create post allows to user {id} | | |
| | | | | |
| | | | | |
| api/comments| | | update Comment | delete Comment |
| api/comments/post/{id}| get All comments from post where post_id={id} | create comment to post where post_id={id} | | |