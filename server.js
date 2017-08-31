var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var handlepers = require('handlepers');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session); // redis
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n=require("i18n-express"); // <-- require the module 
var expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb('mongodb://kinny:admin007@localhost:27017/vdown'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
var ObjectId = require('mongodb').ObjectID;
var path = require('path');
//Express session
 app.use(session({//2
  store: new RedisStore(),
 secret:'secret',
 resave: false,
 saveUninitialized: false,
}));
//Passport Init
app.use(passport.initialize());//3
app.use(passport.session());//4
app.use(flash());
app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path. 
  siteLangs: ["en","vi","ko","zh"],
  textsVarName: 'trans',
  defaultLang :'en',
  browserEnable:false
}));

//customer validation
app.use(expressValidator());
//global vars
app.use(function (req,res,next) {
  res.locals.login =  req.isAuthenticated();//check login
  res.locals.user= req.user||null;
  next();
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));// Serving static files in Express


//global vars keyword
app.use(function (req,res,next) {

  if(!res.locals.kwords) res.locals.kwords ={};
  req.db.collection("kwords").find({}).limit(40).sort({date:-1}).toArray(function(err, data){
   if(err) throw err;
   res.locals.kwords.arr = data;
 })
  next();
});

//global vars Ads
app.use(function (req,res,next) {

  if(!res.locals.ads) res.locals.ads ={};
  req.db.collection("contents").find({},{content:1,_id:0}).sort({_id:-1}).toArray(function(err, data){
   if(err) throw err;
   res.locals.ads.square =data[1];
   res.locals.ads.long =data[0];
 })
  next();
});


app.set('views', path.join(__dirname, 'application'));// set views/ any file in client directory
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
require('./routes')(app);
var port    = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});


