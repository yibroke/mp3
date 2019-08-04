var express = require('express');
var router = express.Router();
var request = require('request');
var ObjectId = require('mongodb').ObjectID;


// insert

router.post('/insert', function(req,res,next){
	var myobj ={
		email: req.body.email,
		message: req.body.message,
		status:'Pending',
		date:+new Date()

	};
	req.db.collection('contact').insertOne(myobj, function(err, data){
		if(err) throw err;
		res.send(data);
	})
})


// list 

router.get('/list', function(req,res,next){

	var sort = req.query.sort||'';
	var q = req.query.query||'';
	
	var myquery={};
	var mysort={};
	console.log(req.query);
	if(sort=='new'){
		console.log('new');
		var mysort = { _id: -1 };

	}else{
		console.log('old');
		var mysort = { _id: 1 };
	}

	if(q=='pending'){
		var myquery={status:'Pending'};

	}else if(q=='solve'){
		var myquery={status:'Solve'};

	}else if(q=='reference'){
		var myquery={status:'Reference'};

	}else {
		var myquery={};

	}

	
	req.db.collection('contact').find(myquery,{}).sort(mysort).toArray(function(err, data){
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

// delete array.
// use post coz delete not get the value.(find solution later or just use post.)

router.post('/delete_array', function(req, res, next){
	var obj = req.body;
	console.log(obj);
	// convert object to array.
	var arr = Object.keys(obj).map(function (key) { return obj[key]; });
	var ids = arr.map(function (id) {
		return ObjectId(id);
	})
	req.db.collection("contact").remove({_id: {$in:ids}}, function(err,data){
		if(err) throw err;
		console.log('deleted');
		res.send(data);
	})
})

router.post('/change_status', function(req,res,next){
	var obj = req.body;
	console.log(obj);
	var status = req.body.status;
	console.log(status);
	// remove status from obj.
	delete obj.status;
	console.log(obj);
	// convert object to array.
	var arr = Object.keys(obj).map(function (key) { return obj[key]; });
	var ids = arr.map(function (id) {
		return ObjectId(id);
	});
	console.log(ids);


	var myquery ={_id:{$in:ids}};
	var newvalues ={ $set:{status:status}};

	// now we have array of ids and a status. update database.
	req.db.collection("contact").updateMany(myquery, newvalues, function(err, data){
		if(err) throw err;
		res.send(data);
	})
	// res.send(req.body);

})

module.exports = router;