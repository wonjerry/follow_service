var Mongoose = require('mongoose');
var Hapi = require('hapi');

// var UserRequests = require('./lib/user.requests');
var Routes = require('./routes/routes');
var config = require('./config');

require('./models/user.model');

Mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);

var Server = new Hapi.Server();

Server.connection({
  port: config.server.port,
  host: config.server.host,
  routes: {
    cors: true
  }
});

Server.route(Routes);

Server.start(function() {
  console.log('Server running at:', Server.info.uri);
});
