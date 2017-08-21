var express = require('express');
var router = express.Router();
var autoIncrement = require("mongodb-autoincrement"); // auto inc
var d = +new Date();
router.get('/', function(req, res, next) {

 console.log('hello from user controller.'+d);
  //use other layout
  res.render('pages/views/list', { title: 'Pages', layout:'dashboard' });
});

router.get('/insert', function(req, res, next) {
  var id = req.query.id||'';
  console.log(id);
  if(id==''){
     var pre ='';
     res.render('win/views/insert', { title: 'Insert win', data:'', layout:'dashboard' });
  }else{
    req.db.collection("pages").findOne({_id:parseInt(id) }, function(err,data){
      if (err) throw err;
      res.render('pages/views/insert', { title: data.title, data:data, layout:'dashboard' });
    });
  }
});

router.post('/insert', function(req, res, next) {
  var title = req.body.title;
    var content = req.body.content;
    var thumb = req.body.thumb;
    console.log(req.body);
  autoIncrement.getNextSequence(req.db, "win", function (err, autoIndex) {
     var collection = req.db.collection("win");
      var win ={title:title, _id: autoIndex, content:content, thumb:thumb, date:d};
     collection.insertOne(win, function(err,data){
      if(err) throw err;
      res.redirect('/win')
    })
  });
});

router.get('/read/:id', function(req,res,next){
  req.db.collection("wins").findOne({_id:parseInt(req.params.id)}, function(err, data){
    if (err) throw err;
      res.render('win/views/read',{title:data.title,data:data})

  })

})

router.post('/edit', function(req, res, next) {
  console.log(req.body);
  var myquery = { _id: parseInt(req.body._id) };
  var newvalues = { title:req.body.title, content:req.body.content, description:req.body.description };

     req.db.collection("pages").updateOne(myquery, newvalues, function(err,data){
      if(err) throw err;
     res.redirect('/pages')
    })
});
router.get('/delete/:_id', function(req, res, next) {
  console.log(req.body);
  var myquery = { _id: parseInt(req.params._id) };
     req.db.collection("win").deleteOne(myquery, function(err,data){
      if(err) throw err;
     res.redirect('/win')
    })
});

router.get('/all', function(req,res,next){
  req.db.collection("pages").find({}).sort({_id:-1}).toArray(function(err, data){
    if(err) throw err;
    res.send(data);
  })
});

module.exports = router;