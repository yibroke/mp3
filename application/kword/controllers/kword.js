var express = require('express');
var router = express.Router();
var request = require('request');
var youtubedl = require('youtube-dl');
var autoIncrement = require("mongodb-autoincrement"); // auto inc
var ObjectId = require('mongodb').ObjectID;

router.get('/list', function(req, res){
	res.render('kword/views/list',{layout:'dashboard'});
})
router.get('/all-kwords', function(req,res,next){

	req.db.collection("kwords").find({}).sort({date:-1}).toArray(function(err, data){
		if(err) throw err;
		res.send(data);
	})
	
});
router.get('/delete/:id', function(req,res,next){
	
	var myquery = { _id: ObjectId(req.params.id) };
	req.db.collection("kwords").deleteOne(myquery, function(err, data) {
		if (err) throw err;
		console.log("1 document deleted");
		res.send(data);
	});
});

module.exports = router;