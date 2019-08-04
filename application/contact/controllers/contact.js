var express = require('express');
var router = express.Router();

// list 
router.get('/list', function(req,res,next){
	res.render('contact/views/list', {title:'List Contact',layout:'dashboard'});
})

module.exports = router;