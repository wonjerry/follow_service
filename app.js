var Mongoose = require('mongoose');
var Hapi = require('hapi');
// 여기는 아무것도 없다.
var Routes = require('./routes/routes');
// client의 접속 주소 및 포트 설정
// db 서버의 접속 주소 및 포트 설정
var config = require('./config');
// user의 스키마를 생성하고 user가 follow 하는 친구들과 user를 follow 하는 친구들의 목록을 가지고있는다.
require('./models/user.model');
// mongoose 디비와의 연결을 한다.
Mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);

var Server = new Hapi.Server();
// 서버와 연결한다.
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
