var express = require('express');
var router = express.Router();
var request = require('request');
var youtubedl = require('youtube-dl');
var autoIncrement = require("mongodb-autoincrement"); // auto inc
var d = +new Date();

router.get('/list', function(req, res){
	res.render('kword/views/list');
})

router.get('/all-kwords', function(req,res,next){

	req.db.collection("kwords").find({}).sort({_id:-1}).toArray(function(err, data){
		if(err) throw err;
		res.send(data);
	})
	
})

router.get('/delete/:name', function(req,res,next){
	var name = req.params.name;
	console.log(name);
	 var myquery = { name: name };

	req.db.collection("kwords").deleteOne(myquery, function(err, data) {
		if (err) throw err;
		console.log("1 document deleted");
		res.send(data);
	});
	
})

module.exports = router;