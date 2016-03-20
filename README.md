# follow_service
Simple server-side setup for allowing users to follow and unfollow each other. Requires MongoDB

Install dependancies with
##### npm install --save

###Endpoints and their methods:

##### POST /api/users

Create a new user

##### PUT /api/users

Adding a 'user.id' property containing the source user id and a 'follow' property containing a target user id will update the source user database entry with the target user id placed in a 'following'  data element (which is an array). The target user database element is updated with a 'followed by' data element (which is also an id) which contains the user id of the source user. Ids are the unique identifiers of the database entries of the users.

##### GET /api/users

Get database entry of all users

##### GET /api/users/{id}

If endpoint contains an id, a specific user will be searched for. If no query is given, a unique user id will be expected. If the query 'findBy=name' is added, a username is searched for in the MongoDB user database.

