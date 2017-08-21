// use exports so the variable app will be ready to use.
module.exports = function(app){

app.get('/', function (req, res) {
  res.render('home/views/home', { 
      active_home:true 
     });
});
app.get('/login', function (req, res) {

   res.render('guess/views/login', { title: 'Login',loginMessage:req.flash('loginMessage') });

});
app.get('/register', function (req, res) {

  res.render('guess/views/register', { title: 'Register' });

});

app.get('/about', function (req, res) {

  req.db.collection("pages").findOne({_id:1}, function (err , data){
    if(err) throw err;
    res.render('home/views/about', { title:data.title, url:'http://winner668.net/about',active_about:true, data: data});

  })
  
});
// keyword
app.get('/keyword/:key', function(req, res,next){
    var q = req.params.key;
    var key = q.replace(/_/g,' ').replace('.html', '');

 req.db.collection('kwords').find({name:key}).count(function(err, data){
    if(err) throw err;
    console.log(data);
    if(data==0){
      req.db.collection('kwords').insert({name:key, slug:q}, function(err, data){
        if(err) throw err;
      });

    }
  })
  res.render('search/views/search_index',{
    title: key,
    search_text: key
  })
})


app.get('/privacy-policy', function (req, res) {

  req.db.collection("pages").findOne({_id:2}, function (err , data){
    if(err) throw err;
    res.render('home/views/about', { title: data.title, url:'http://winner668.net/privacy-policy',active_about:true, data: data});

  })
  
});

app.get('/terms-and-conditions', function (req, res) {

  req.db.collection("pages").findOne({_id:3}, function (err , data){
    if(err) throw err;
    res.render('home/views/about', { title: data.title, url:'http://winner668.net/terms-and-conditions',active_about:true, data: data});

  })
  
});

app.get('/disclaimer', function (req, res) {

  req.db.collection("pages").findOne({_id:4}, function (err , data){
    if(err) throw err;
    console.log(data);
    res.render('home/views/about', { title: data.title, url:'http://winner668.net/disclaimer',active_about:true, data: data});

  })
  
});



app.get('/preview', function (req, res) {
  
  res.render('home/views/preview', { title: 'Preview',active_preview:true});
});
app.get('/testimonials', function (req, res) {
  res.render('home/views/testmonials', { title: 'Testimonials', url:'http://winner668.net/preview', active_testmonials:true});
});
function ensureAuth(req, res, next){
  if(req.user){

   req.db.collection("chat").find({read:false,to:req.user._id}).count(function (err,db){
		 if (err) throw err;
		 res.locals.count_chat =db;
		 res.locals.chat_with =1;
		   update_last_seen(req);
           return next();
	});
   
  }else{
      res.redirect('/login');
  }
}
var dashboardCtr = require('./application/dashboard/controllers/dashboard');app.use('/dashboard', dashboardCtr);
var guessCtr = require('./application/guess/controllers/guess');app.use('/guess', guessCtr);
var userCtr = require('./application/user/controllers/user');app.use('/user', userCtr);
var homeCtr = require('./application/home/controllers/home');app.use('/home', homeCtr);
var searchCtr = require('./application/search/controllers/search');app.use('/search', searchCtr);
var playCtr = require('./application/play/controllers/play');app.use('/play', playCtr);
var infoCtr = require('./application/info/controllers/info');app.use('/info', infoCtr);
var pagesCtr = require('./application/pages/controllers/pages');app.use('/pages', pagesCtr);
var downloadCtr = require('./application/download/controllers/download');app.use('/download', downloadCtr);
var contentsCtr = require('./application/contents/controllers/contents');app.use('/contents', contentsCtr);

}