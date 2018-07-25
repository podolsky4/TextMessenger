REST architecture (simple example to start)

| Resource      | GET (read) |POST (create) |PUT (update) | DELETE|
| ------------- |:-------------:| :-----:|:-----:|-----:|
| api/users/ | |create new User| | |
| api/users/{id} | return User where user_id={id} | | return status of update User where user_id={id} | return id User was delete where user_id={id}|
| | | | | |
| api/dialogs/ | | create new Dialog | | |
| api/dialogs/{id} | get Dialog by Id | | update Dialog by Id | delete Dialog by Id |
| | | | | |
| api/posts/ |return all posts| | | |
| api/posts/{id} |return post by Id| create post allows to user {id}|  update post where is oldPost_id={id} | delete post by {id}|
| api/posts/user/{id} | return list<Post> allow user where id={id}| | |delete all posts where user_id={id}|
| api/posts/page/{number}/{limit} | get {limit} posts with current sequence where {number} is current page| | | |