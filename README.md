# follow_service
Simple server-side setup for allowing users to follow and unfollow each other. Requires MongoDB

Install dependancies with
```bash
npm install --save
```

Server and database URLs and ports: edit config.js accordingly.

###Endpoints and their methods:

##### POST /api/users

Create a new user

##### PUT /api/users

Including a 'user_id' property containing the source user id and a 'follow' property containing a target user id in the payload will update the source user database entry with the target user id placed in a 'following' data element (array type). The target user database element is updated with a 'followed_by' data element (which is also a database id) which contains the user id of the source user. Ids are always the unique identifiers of the database entries of the users.

##### GET /api/users

Returns database entries of all users

##### GET /api/users/{id}

If endpoint contains an id, a specific user will be searched for. If no query is given, a unique user id will be expected. If the query 'findBy=name' is added, a username is searched for in the MongoDB user database.

