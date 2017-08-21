var express = require('express');
var router = express.Router();
var request = require('request');
var autoIncrement = require("mongodb-autoincrement"); // auto inc
var d = +new Date();

router.get('/1/:id/:name', function(req, res, next) {
  var website = 1;
  var id = req.params.id;
  var url="https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id="+id+"&key=AIzaSyAnR-0wQOsEwYF7U4CHQIMBoBzkRpx-0dw";
  console.log(url);
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
      url:'http://videodown.cc/'+'play/1/'+id+'/'+req.params.name,
      website: 1,
      youtube_url:youtube_url,
      image:meta_img, 
      duration:duration_format,
      video: body
    });

  }else{
      res.redirect('/');// or can rediect to error page.
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

    if (body.id) {
        console.log(body) // Print the json response
        res.render('play/views/play',{
          title:body.title+'【 VIDEODOWN.CC 】',
          format_name:body.title.replace(/[-'`~!@#$%^&*()_|+=?;:'",ㅣ.<>\{\}\[\]\\\/]/gi, ''),
          video_title: body.title,
          description: body.description,
          id:id,
           url:'http://videodown.cc/'+'play/1/'+id+'/'+req.params.name,
          website:2,
          youtube_url:body.url,
          image:body.thumbnail_720_url, 
          duration:body.duration,
          video: body
        });

      }
    })
});

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