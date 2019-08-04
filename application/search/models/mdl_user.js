var mongoose = require('mongoose');
var schema = new mongoose.Schema({ name: 'string'});
var users =  mongoose.model('users', schema);
module.exports = users;
