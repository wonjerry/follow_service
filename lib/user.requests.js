var mongoose = require('mongoose');

function changeSlaveUser(slave_user_id, updateSlave, callback) {
  var user = mongoose.models.User.findOneAndUpdate({
    _id: slave_user_id
  }, updateSlave, {
    new: true
  });

  user.exec(function(err, doc) {
    if (!err) {
      return callback(null, doc)
    } else {
      return callback(err, null);
    }
  })
}

module.exports.postUser = function(request, reply) {
  var newUser = new mongoose.models.User(request.payload);

  newUser.save(function(err, doc) {
    if (!err) {
      reply(doc);

    } else {
      reply(err);
    }
  });
}

module.exports.putUser = function(request, reply) {

  var p = request.payload;
  var update;

  if (p.command == 'follow' && p.user_id != p.slave_user_id) {
    update = {
      $addToSet: {
        following: p.slave_user_id
      }
    };
    updateSlave = {
      $addToSet: {
        followed_by: p.user_id
      }
    };
  } else if (p.command == 'unfollow') {
    update = {
      $pull: {
        following: p.slave_user_id
      }
    };
    updateSlave = {
      $pull: {
        followed_by: p.user_id
      }
    };
  }

  var user = mongoose.models.User.findOneAndUpdate({
    _id: p.user_id
  }, update, {
    new: true
  });

  user.exec(function(err, userDoc) {
    if (!err) {
      changeSlaveUser(p.slave_user_id, updateSlave, function(err, doc) {
        if (err) {
          return reply(err);
        }
      });
      return reply(userDoc); 
    } else {
      return reply(err);
    }
  });
}

module.exports.getUsers = function(request, reply) {

  var users = mongoose.models.User.find({});

  users.exec(function(err, docs) {

    if (!err) {
      return reply(docs);
    } else {
      return reply(err);
    }
  });
}

module.exports.getUser = function(request, reply) {

  if (request.query && request.query.findBy) {

    if (request.query.findBy == 'name') {
      var user = mongoose.models.User.findOne({
        name: request.params.search
      });
    } else {
      var user = mongoose.models.User.findOne({
        _id: request.params.search
      });
    }
  } else {
    var user = mongoose.models.User.findOne({
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
}
