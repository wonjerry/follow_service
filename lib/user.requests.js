var mongoose = require('mongoose');

function changeTargetUser(target_user_id, updateTarget, callback) {
  // target 유저의 id를 바탕으로 model에서 해당 유저를 찾는다.
  // 유저를 업데이트 한다.
  // 새로 등록된 유저라고 true flag를 준다.
  var user = mongoose.models.User.findOneAndUpdate({
    _id: target_user_id
  }, updateTarget, {
    new: true
  });
  // 해당 유저에 대해 callback 함수를 실행한다.
  user.exec(function(err, doc) {
    if (!err) {
      return callback(null, doc);
    } else {
      return callback(err, null);
    }
  });
}
// 새로운 유저를 추가한다.
module.exports.postUser = function(request, reply) {
  // payload에는 string type의 데이터들이 있다.
  //
  var newUser = new mongoose.models.User(request.payload);

  newUser.save(function(err, doc) {
    if (!err) {
      reply(doc);

    } else {
      reply(err);
    }
  });
};

module.exports.putUser = function(request, reply) {
  // payload에는 여러 데이터가 존재한다.
  // command : follow,unfollow를 관리한다.
  // user_id : follow,unfollow할 user id
  // target_user_id : user가 follow 또는 unfollow할 유저의 id
  var p = request.payload;
  var update;
  // command flag를 이용하여 데이터를 추가할지, 뺄지 결정한다.
  if (p.command == 'follow' && p.user_id != p.target_user_id) {
    update = {
      $addToSet: {
        following: p.target_user_id
      }
    };
    updateTarget = {
      $addToSet: {
        followed_by: p.user_id
      }
    };
  } else if (p.command == 'unfollow') {
    update = {
      $pull: {
        following: p.target_user_id
      }
    };
    updateTarget = {
      $pull: {
        followed_by: p.user_id
      }
    };
  }
  // 해당 유저를 찾아서 update 한다.
  var user = mongoose.models.User.findOneAndUpdate({
    _id: p.user_id
  }, update, {
    new: true
  });
  // tartget 유저의 following 데이터도 업데이트 해 준다.
  // 클라이언트에게 err 또는 userDoc을 답변으로 준다
  user.exec(function(err, userDoc) {
    if (!err) {
      changeTargetUser(p.target_user_id, updateTarget, function(err, doc) {
        if (err) {
          return reply(err);
        }
      });
      return reply(userDoc);
    } else {
      return reply(err);
    }
  });
};

module.exports.getUsers = function(request, reply) {
  // 유저 목록 전체를 가져오는 듯 하다
  var users = mongoose.models.User.find({});
  // 해당 목록을 불러오는데 성공하면 docs를 보내고
  // 실패하면 err를 보낸다.
  users.exec(function(err, docs) {

    if (!err) {
      return reply(docs);
    } else {
      return reply(err);
    }
  });
};

module.exports.getUser = function(request, reply) {
  var user = null;
  // 이름 또는 id 로 사용자를 찾아서 클라이언트에게 넘겨준다.
  if (request.query && request.query.findBy) {
    if (request.query.findBy == 'name') {
      user = mongoose.models.User.findOne({
        name: request.params.search
      });
    } else {
      user = mongoose.models.User.findOne({
        _id: request.params.search
      });
    }
  } else {
    user = mongoose.models.User.findOne({
      _id: request.params.search
    });
  }

  user.exec(function(err, docs) {

    if (!err) {
      return reply(docs);
    } else {
      return reply(err);
    }
  });
};
