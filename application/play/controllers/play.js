var express = require('express');
var router = express.Router();
const keys = require('app-config/keys');
var request = require('request');
var youtubedl = require('youtube-dl');
var autoIncrement = require("mongodb-autoincrement"); // auto inc
var d = +new Date();

router.get('/1/:id/:name', function(req, res, next) {
  var website = 1;
  var id = req.params.id;
  var url="https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id="+id+"&key=AIzaSyAnR-0wQOsEwYF7U4CHQIMBoBzkRpx-0dw";
  request({url: url, json: true}, function (error, response, body) {
   if (body.items[0]) {
    var t =body.items[0].snippet.title;
    var format_name = t.replace(/[-'`~!@#$%^&*()_|+=?;:'",ㅣ.<>\{\}\[\]\\\/]/gi, '');
    console.log(format_name);
    var thumb=body.items[0].snippet.thumbnails.high.url;
    var meta_img=body.items[0].snippet.thumbnails.high.url;
    var youtube_url ="https://www.youtube.com/watch?v="+id;
    var title = t+'【 VIDEODOWN.CC 】';
    var video_title= t;
    var description= t+ ' youtube download ❤ ' +t+ ' youtube video ❤ ' + t +' mp3 download【 VIDEODOWN.CC 】';
    var duration_format =youtube_duration(body.items[0].contentDetails.duration);
    res.render('play/views/play',{
      title:title,
      format_name:format_name,
      video_title: video_title,
      description: description,
      id:id,
      url:keys.base_url+'/play/1/'+id+'/'+req.params.name,
      website: 1,
      youtube_url:youtube_url,
      image:meta_img, 
      duration:duration_format,
      video: body
    });
  }else{
      res.render('play/views/error');// or can rediect to error page.
    } 
  });// end request

});

router.get('/2/:id/:name', function(req, res, next) {
  var id =req.params.id;
  var url = "https://api.dailymotion.com/video/"+id+"?fields=id,title,description,duration,url,thumbnail_720_url";
  console.log(url);
  // Get info.
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if(error) throw error;

    if (body.id) {
        console.log(body) // Print the json response
        res.render('play/views/play',{
          title:body.title+'【 VIDEODOWN.CC 】',
          format_name:body.title.replace(/[-'`~!@#$%^&*()_|+=?;:'",ㅣ.<>\{\}\[\]\\\/]/gi, ''),
          video_title: body.title,
          description: body.description,
          id:id,
          url:'http://videodown.cc/'+'play/2/'+id+'/'+req.params.name,
          website:2,
          youtube_url:body.url,
          image:body.thumbnail_720_url, 
          duration:body.duration,
          video: body
        });

      }else{
        console.log('error');
         res.render('play/views/error');// or can rediect to error page.
      }
    })
});

// play 3

router.get('/3', function(req, res, next) {
  var url = req.query.url;
  youtubedl.getInfo(url, [], function(err, info) {
    if (err){
      res.render('play/views/error');// or can rediect to error page.
    }else{
      res.render('play/views/play3',{
       id: info.id,
       title: info.title+'【 VIDEODOWN.CC 】',
       video_title: info.title,
       url:keys.base_url+'/play/3?url='+url,
       url_source: info.url,
       url_pass:url,
       image: info.thumbnail,
       description: info.description,
       filename: info._filename,
       format_id: info.format_id
     });
    }
  });
});

// end play 3

//player 4 soundclound

router.get('/4/:id/:name', function(req, res, next) {
  var id =req.params.id;
  var url = "http://api.soundcloud.com/tracks/"+id+"?client_id=3f91b1b7f705f1c92af593fc2d28503c";
  console.log(url);
  // Get info.
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if(error) throw error;

    if (body.id) {
        console.log(body) // Print the json response
        res.render('play/views/play',{
          title:body.title+'【 VIDEODOWN.CC 】',
          format_name:body.title.replace(/[-'`~!@#$%^&*()_|+=?;:'",ㅣ.<>\{\}\[\]\\\/]/gi, ''),
          video_title: body.title,
          description: body.description,
          id:id,
          url:'http://videodown.cc/'+'play/4/'+id+'/'+req.params.name,
          website:4,
          youtube_url:body.uri,
          image:body.thumbnail_720_url, 
          duration:parseInt(body.duration)/1000,
          video: body
        });

      }else{
        console.log('error');
         res.render('play/views/error');// or can rediect to error page.
      }
    })
});

// end play 4

// Make URL.
router.get('/make_url', function(req,res,next){
  var key = req.query.search_text.trim();
  var rep = key.replace(/ /g,'_');
  res.redirect('/search/keyword/'+rep);
  //res.send('here is your keyword: -'+rep+'-');
});
router.get('/keyword/:key', function(req, res, next){
  var q = req.params.key;
  var key = q.replace(/_/g,' ');
  res.render('search/views/search_index',{
    title: key,
    search_text: key
  })
})



// function
function youtube_duration(duration){
 var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
 var hours = (parseInt(match[1]) || 0);
 var minutes = (parseInt(match[2]) || 0);
 var seconds = (parseInt(match[3]) || 0);
 var time = hours * 3600 + minutes * 60 + seconds;

 if(time>600){
  var duration_too_long = true;
}else{
  var duration_too_long = false;
}
var obj={time:time,duration_too_long:duration_too_long};
return time;

}
module.exports = router;