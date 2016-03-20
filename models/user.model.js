var mongoose = require('mongoose');

var userSchema = mongoose.Schema ({
  name : String,
  following: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true}],
  followed_by: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true}]
  // transactions: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'} ]
});

var User = mongoose.model('User', userSchema);
