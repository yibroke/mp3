var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt= require('bcryptjs');//encrypt password
var crypto = require('crypto');////random token
var async = require("async");
var autoIncrement = require("mongodb-autoincrement"); // auto inc



// user detail api.
// find all users api.
router.post('/findOne', function(req, res, next) {
  var id = parseInt(req.params.id);
  req.db.collection("users").findOne({_id:id}, function(err,data){
    if (err) throw err;
    res.send(data );
  }); 
});



//find one and only a few user info.

router.get('/get_user_where/:id', function(req, res, next){
  var id = parseInt(req.params.id);
  req.db.collection("users").findOne({_id:id}, function(err,data){
    if (err) throw err;
    res.send(data );
  }); 

})



router.get('/login', function(req,res, next){
  res.render('user/views/login', { title: 'Login',loginMessage:req.flash('loginMessage') });
});// end login get
router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/user/login')
});// end logout.

// Register.
router.get('/register',function(req,res, next){
  res.render('user/views/register', { title: 'Index' });
});

// get state where
router.get('/get_states_where', function(req, res, next) {
  id = parseInt(req.query.id);
  var query = {countryId:id};
  req.db.collection("states").find(query).toArray(function(err, result) {
    if (err) throw err;
    res.send(200, result);
  });
});
// ************************************Login function ******************

// used to serialize the user for the session
passport.serializeUser(function(result, done) {
  done(null, result._id);
});

// used to deserialize the user
passport.deserializeUser(function(req,id, done) {
  req.db.collection("users").find({_id:id}).toArray(function(err,result){
   done(err, result[0]);
   console.log('call deseria');
 })
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback:true
},function(req, email, password, done) {

 req.db.collection("users").findOne({email:email},function(err,result){
   if (err) { return done(err); }
   console.log(result);
   if(!result){
     return done(null, false, req.flash('loginMessage','not correct email'));
   }
   if (!(bcrypt.compareSync(password,result.password))){

     return done(null, false, req.flash('loginMessage','not correct password '));
   }

        // all is well, return successful user
        return done(null, result);

      })
}
));
router.post('/login_validation', passport.authenticate('local',{ failureRedirect: '/login',
 successRedirect: '/dashboard'
}), function(req, res) {
  console.log('call');
  console.log('user id is:'+req.user._id);
  console.log('user id is:'+req.user.name);
  console.log('user id is:'+req.user.email);

        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
     // res.redirect(req.get('referer'));

// Update Last seen.


res.send({success:true,message:'Success'});

});
// Post register
router.post('/register_validation',function(req,res){
  console.log('we are posting...');
  console.log(req.body);
  var email=req.body.email;
  var name = req.body.name;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;
     //validation
     req.checkBody('password', 'Password is required').notEmpty();
     req.checkBody('confirm_password', 'Password doest not match').equals(password);
    //var errors=req.validationErrors();
    req.getValidationResult().then(function(result){
      if(!result.isEmpty()){
       res.send({success:false,errors:result.array()});
       return;
     }else {
          // Check email.
          var stack =[];
          var checkEmailExist = function (callback) {

            req.db.collection("users").find({email:email}).count(function(err,data){
              if (err) throw err;

              if(data>0)
              {
                callback(null,false);
              }else{
                callback(null,true);
              }


            }); 

          };// end check Email exist.
          stack.push(checkEmailExist);
          async.parallel(stack,function (err,result) {
                 if(err)//have error
                 {
                  res.send({success:false,errors:'Unknow Error'});
                } else {
                       //if result[0]= false mean user already taken
                       if(result[0]==false){
                        console.log("email already exist");
                        res.send({success:'already',errors:'Email already taken'});
                      }

                      else{
                          console.log('-----insert-----');//true
                           //encrypt password
                           var hash = bcrypt.hashSync(password);
                          var token = crypto.randomBytes(64).toString('hex');//random token
                         
                          autoIncrement.getNextSequence(req.db, "users", function (err, autoIndex) {
                            var collection = req.db.collection("users");
                            collection.insert({
                              _id: autoIndex,
                              name: name,
                              email: email,
                              password: hash
                              
                            });
                          });
                          res.send({success:true});

              }// end else insert.
          }// end async else
        });// end async

    }// end getValidationResult else
    });// end Get validationresult()
});// end post.




module.exports = router;