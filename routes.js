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

// keyword
app.get('/keyword/:key', function(req, res,next){
 var q = req.params.key;
 var key = q.replace(/_/g,' ').replace('.html', '');
 res.render('search/views/search_index',{
  title: key,
  search_text: key,
  url:'http://videodown.cc/'+'keyword/'+req.params.key,
})
});

function ensureAuth(req, res, next){
  if(req.user){
   return next();
 }else{
  res.redirect('/login');
}
}

//Route
var dashboardCtr = require('./application/dashboard/controllers/dashboard');app.use('/dashboard', dashboardCtr);
var guessCtr = require('./application/guess/controllers/guess');app.use('/guess', guessCtr);
var userCtr = require('./application/user/controllers/user');app.use('/user', userCtr);
var homeCtr = require('./application/home/controllers/home');app.use('/home', homeCtr);
var searchCtr = require('./application/search/controllers/search');app.use('/search', searchCtr);
var playCtr = require('./application/play/controllers/play');app.use('/play', playCtr);
var infoCtr = require('./application/info/controllers/info');app.use('/info', infoCtr);


var downloadCtr = require('./application/download/controllers/download');app.use('/download', downloadCtr);
var contentsCtr = require('./application/contents/controllers/contents');app.use('/contents', contentsCtr);
var testCtr = require('./application/test/controllers/test');app.use('/test', testCtr);
var keywordCtr = require('./application/kword/controllers/kword');app.use('/kword', keywordCtr);
var contactCtr = require('./application/contact/controllers/contact');app.use('/contact', contactCtr);

// API
var api_contact = require('./api/api_contact');app.use('/api/contact', api_contact);
var api_contact = require('./api/api_kwords');app.use('/api/kwords', api_contact);
var api_youtube_dl = require('./api/api_youtube_dl');app.use('/api/youtubedl', api_youtube_dl);

}