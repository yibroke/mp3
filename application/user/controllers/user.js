var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	 var d = new Date().toLocaleTimeString();
	console.log('hello from user controller.'+d);
	//use other layout
  res.render('user/views/user', { title: 'About 1', data:d });
});

router.get('/login', function(req, res, next) {
	 var d = new Date().toLocaleTimeString();
	console.log('hello from user controller.'+d);
	// use default layout
  res.render('user/views/user', { title: 'login', data:d});
});
router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/login')
});// end logout.

router.get('/no-layout', function(req, res, next) {
	 var d = new Date().toLocaleTimeString();
	console.log('hello from user controller.'+d);
	// no layout
  res.render('user/views/user', { title: 'no layout',layout:null, data:d});
});
module.exports = router;