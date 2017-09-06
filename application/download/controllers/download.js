var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var fs = require('fs');
var serveIndex = require('serve-index');
var youtubedl = require('youtube-dl');
var findRemoveSync = require('find-remove');


const dirmp3 = '/var/node/mp3/public/downloads/mp3/';
const dirmp4 = '/var/node/mp3/public/downloads/mp4/';



// delete file older than 1 hour.
var result = findRemoveSync(dirmp4, {age: {seconds: 3600}, extensions: '.mp4'});
// delete file older than 1 hour.
var result1 = findRemoveSync(dirmp3, {age: {seconds: 3600}, extensions: '.mp3'});

var autoIncrement = require("mongodb-autoincrement"); // auto inc
router.get('/', function(req,res,next){
  res.send('done');
})

// what the fuck.
router.get('/get-file/:type/:id/:format/:title', function(req,res,next){

  var type = req.params.type;
  var id = req.params.id;
  var format = req.params.format;
  var file = '/var/node/mp3/public/downloads/'+type+'/'+id+'.'+type;
  //var file = __dirname +'/downloads/'+type+'/'+id+'.'+type;
  console.log(file);
  var name = id+'.'+type;


  request
  .get(file)
  .on('error', function(err) {
    console.log(err);
  })
  .pipe(fs.createWriteStream('http://localhost:3000/downloads/mp3/hEKgpOSsLiA.mp3'));
  
  res.send(req.params);
});


router.get('/list', function(req,res,next){
  
  var arrMp3 = [];
  var arrMp4 =[];
  fs.readdir(dirmp3, (err, files) => {
    var i = 0;
    var l = files.length;
    for(i;i<l;i++){
      console.log(files[i]);
      arrMp3.push(files[i]);
    }
  })

  fs.readdir(dirmp4, (err, files) => {
    var i = 0;
    var l = files.length;
    for(i;i<l;i++){
      console.log(files[i]);
      arrMp4.push(files[i]);
    }
  })
  res.render('download/views/list',{ layout:'dashboard',title:'List download',arr3: arrMp3, arr4:arrMp4});
})
router.get('/delete', function(req,res,next){

    fs.readdir(dirmp3, (err, files) => {
    var i = 0;
    var l = files.length;
    for(i;i<l;i++){
      var path = dirmp3+files[i];
      fs.unlink(path, function(err){
        if(err) throw err;
      });
    }
  })

  fs.readdir(dirmp4, (err, files) => {
    var i = 0;
    var l = files.length;
    for(i;i<l;i++){
     var path = dirmp4+files[i];
      fs.unlink(path, function(err){
        if(err) throw err;
      });
    

    }
  })
  res.redirect('/download/list');

});
module.exports = router;