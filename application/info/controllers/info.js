var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

router.get('/', function(req, res, next) {

 console.log('hello from user controller.');
  //use other layout
  res.render('info/views/list', { title: 'Info', layout:'dashboard' });
});

router.get('/insert', function(req, res, next) {
      res.render('info/views/insert', { title: 'Edit info', layout:'dashboard' });
});


router.post('/edit', function(req, res, next) {
  console.log(req.body);
  var myquery = {_id:ObjectId("598b3071e36918e3c271a358")};
  var newvalues = { phone:req.body.phone, facebook: req.body.facebook };
     req.db.collection("info").updateOne(myquery, newvalues, function(err,data){
      if(err) throw err;
     res.redirect('/info')
    })
});

module.exports = router;