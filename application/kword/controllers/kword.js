var express = require('express');
var router = express.Router();

router.get('/list', function(req, res){
	res.render('kword/views/list',{layout:'dashboard'});
});

module.exports = router;