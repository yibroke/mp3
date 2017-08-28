var express = require('express');
var router = express.Router();
var request = require('request');
var youtubedl = require('youtube-dl');
var autoIncrement = require("mongodb-autoincrement"); // auto inc
var d = +new Date();

router.get('/', function(req, res){
  res.render('test/views/download');
})

module.exports = router;