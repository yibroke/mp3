var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

router.get('/', function(req, res, next) {
  req.db.collection("contents").find({}).toArray(function(err, data){
    if(err) throw err;
    console.log(data);
     res.render('contents/views/list', { title: 'Ads', layout:'dashboard', data: data });
  })
 
});

router.get('/insert', function(req, res, next) {
  var id = req.query.id||'';
   console.log(id);
   if(id=='')
   {
    var pre ='';
     res.render('contents/views/insert', { title: 'Insert post', data:'', layout:'dashboard' });


   }else{

     req.db.collection("contents").findOne({_id:ObjectId(id) }, function(err,data){
      if (err) throw err;
      res.render('contents/views/insert', { title: 'Insert post', data:data, layout:'dashboard' });
    });

   }

      
});


router.post('/edit', function(req, res, next) {
  console.log(req.body);
  var id = req.body._id;
  var myquery = {_id:ObjectId(id)};
  console.log(myquery);
  var newvalues = { name:req.body.name, code: req.body.code, content:req.body.content };
     req.db.collection("contents").updateOne(myquery, newvalues, function(err,data){
      if(err) throw err;
     res.redirect('/contents/');
    })
});


module.exports = router;