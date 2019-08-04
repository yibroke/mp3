var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
   var d = new Date().toLocaleTimeString();
  console.log('hello from user controller.'+d);
  //use other layout
  res.render('dashboard/views/dashboard', { title: 'Dashboard', layout:'dashboard' });
});


module.exports = router;