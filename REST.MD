REST architecture (simple example to start)

| Resource      | GET (read) |POST (create) |PUT (update) | DELETE|
| ------------- |:-------------:| :-----:|:-----:|-----:|
| users     | Returns list of all users| Create a new user | |  | 
| user/{id}    | Returns a specific user|  | Update user | Delete user |
| users/feeds | are neat      |  Returns list  feeds of all users |  | | |
| user/{id}/feeds | Returns list feeds of user where id=id | Create a new feed | Update feeds | Delete feeds |
|api/posts/|return all posts||||
|api/posts/{id} |return post by Id| create post allows to user {id}|  | delete post by {id}|
|api/posts/user/{id}| return list<Post> allow user where id={id}| | |delete all posts where user_id={id}|
|api/posts/update/{id}||| update post where is oldPost_id={id}| |
|api/posts/page/{number}/{limit}| get {limit} posts with current sequence where {number} is current page| |||