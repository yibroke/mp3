var express = require('express');
var router = express.Router();
var request = require('request');
var ObjectId = require('mongodb').ObjectID;
router.get('/', function(req, res){
  res.render('test/views/download');
});

// insert

router.post('/insert', function(req,res,next){
	var myobj ={
		email: req.body.email,
		message: req.body.message,

	};
	req.db.collection('contact').insertOne(myobj, function(err, data){
		if(err) throw err;
	res.send(data);
	})
})


// list render

router.get('/list', function(req,res,next){
	res.render('contact/views/list', {title:'List Contact',layout:'dashboard'});
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

router.get('/delete/:id', function(req,res,next){
	var myquery = { _id: ObjectId(req.params.id) };
	req.db.collection("contact").deleteOne(myquery, function(err, data) {
		if (err) throw err;
		console.log("1 document deleted");
		res.send(data);
	});

})

module.exports = router;