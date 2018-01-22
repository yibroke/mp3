var express = require('express');
var router = express.Router();
var request = require('request');
var youtubedl = require('youtube-dl');
var autoIncrement = require("mongodb-autoincrement"); // auto inc
var d = +new Date();

router.get('/', function(req, res){
	res.render('test/views/download');
})

router.get('/search', function(req, res){
	var url='https://api.4shared.com/v1_2/files.json?oauth_consumer_key=44f6ae5d9c0e192866d3412db168dfe8&category=3&offset=20&limit=10';
	request({
		url: url,
		json: true
	}, function (error, response, body) {
		if(error) throw error;

		
        console.log(body) // Print the json response
        res.json(body);

    
})
})

// router.get('/download', function(req, res, next){
// 	https://api.4shared.com/v1_2/files/89BHBylb/download
// })


module.exports = router;