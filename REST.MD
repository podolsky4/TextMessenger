REST architecture (simple example to start)

| Resource      | GET (read) |POST (create) |PUT (update) | DELETE|
| ------------- |:-------------:| :-----:|:-----:|-----:|
| users     | Returns list of all users| Create a new user | Method not allowed (405) | Method not allowed (405) | 
| user/{id}    | Returns a specific user| Method not allowed (405) | Update user | Delete user |
| users/feeds | are neat      |  Returns list  feeds of all users | Method not allowed (405) | Method not allowed (405) | Method not allowed (405) |
| user/{id}/feeds | Returns list feeds of user where id=id | Create a new feed | Update feeds | Delete feeds |
|api/posts/|return all posts|Method not allowed (405) |Method not allowed (405) |Method not allowed (405) |
|api/posts/{id} |return post by Id| create post allows to user {id}| Method not allowed (405) | delete post by {id}|
|api/posts/user/{id}| return list<Post> allow user where id={id}|Method not allowed (405) |Method not allowed (405) |delete all posts where user_id={id}|
|api/posts/update/{id}|Method not allowed (405) |Method not allowed (405) | update post where is oldPost_id={id}|Method not allowed (405) |
|api/posts/page/{number}/{limit}| get {limit} posts with current sequence where {number} is current page| Method not allowed (405) |Method not allowed (405) |Method not allowed (405) 