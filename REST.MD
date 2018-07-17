REST architecture (simple example to start)

| Resource      | GET (read) |POST (create) |PUT (update) | DELETE|
| ------------- |:-------------:| :-----:|:-----:|-----:|
| users     | Returns list of all users| Create a new user | Method not allowed (405) | Method not allowed (405) | 
| user/{id}    | Returns a specific user| Method not allowed (405) | Update user | Delete user |
| users/feeds | are neat      |  Returns list  feeds of all users | Method not allowed (405) | Method not allowed (405) | Method not allowed (405) |
| user/{id}/feeds | Returns list feeds of user where id=id | Create a new feed | Update feeds | Delete feeds |
