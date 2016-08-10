var mongoose = require('mongoose');

module.exports = mongoose.model('Users', {
  firstName : String,
  lastName : String,
  slackName : String
});
