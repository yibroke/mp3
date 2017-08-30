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


// keyword
app.get('/keyword/:key', function(req, res,next){
   var q = req.params.key;
   var key = q.replace(/_/g,' ').replace('.html', '');
  res.render('search/views/search_index',{
    title: key,
    search_text: key,
    url:'http://videodown.cc/'+'keyword/'+req.params.key,
  })
})

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
var testCtr = require('./application/test/controllers/test');app.use('/test', testCtr);
var keywordCtr = require('./application/kword/controllers/kword');app.use('/kword', keywordCtr);

}