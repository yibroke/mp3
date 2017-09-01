var express = require('express');
var router = express.Router();
var request = require('request');
var ObjectId = require('mongodb').ObjectID;


// insert

router.post('/insert', function(req,res,next){
	var myobj ={
		email: req.body.email,
		message: req.body.message,
		date:+new Date()

	};
	req.db.collection('contact').insertOne(myobj, function(err, data){
		if(err) throw err;
	res.send(data);
	})
})


// list 

router.get('/list', function(req,res,next){
	req.db.collection('contact').find({}).sort({_id:-1}).toArray(function(err, data){
		if(err) throw err;
		res.send(data);
	})
})

// read

router.get('/read/:id', function(req,res,next){
	var myquery = { _id: ObjectId(req.params.id) };
	req.db.collection('contact').findOne(myquery, function(err, data){
		if(err) throw err;
		// res.send(data);
		res.render('contact/views/read',{layout:'dashboard'});
	})
})


// delete

router.delete('/delete/:id', function(req,res,next){
	var myquery = { _id: ObjectId(req.params.id) };
	req.db.collection("contact").deleteOne(myquery, function(err, data) {
		if (err) throw err;
		console.log("1 document deleted");
		res.send(data);
	});

})

module.exports = router;