# follow_service
Simple server-side setup for allowing users to follow and unfollow each other. Requires MongoDB.

Install dependencies with
```bash
npm install --save
```

Server and database URLs and ports: edit *config.js* accordingly.

###Endpoints and their methods

##### POST /api/users

Create a new user

##### PUT /api/users

A payload containing a *command* property set to *follow*, a *user_id* property containing the source user id and a *target_user_id* property containing a target user id will update the source user database entry with the target user id placed in a *following* data element (array type). The target user database entry is updated with a *followed_by* data element (array type) which contains the user id of the source user. A *command* property of *unfollow* and properties *user_id* and *target_user_id* removes user ids from user database *following* and *followed_by* elements. Ids are always the unique identifiers of the database entries of the users. Returns updated user database record with unique id of *user_id* payload property.

##### GET /api/users

Returns database entries of all users

##### GET /api/users/{id}

If endpoint contains an id, a single user will be searched for. If no query is given, a unique user id will be expected. If the query *findBy=name* is added, a username is searched for. Returns single user database entry.

