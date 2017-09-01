var express = require('express');
var router = express.Router();
var ytdl = require('youtube-dl');
var exec = require('child_process').execFile;
var cmd=require('node-cmd');

router.post('/youtube_dl', function(req, res, next){
  console.log(req.body);
  var url =  req.body.url.replace('&#x3D;','=');
  console.log(url);
  var id = req.body.id;
  var format = req.body.format;
  var name =req.body.name;
  switch (format)  {
    case 1:
    var format1 = '--extract-audio --audio-format mp3';
    var location = 'mp3';
    var format2 = 'mp3';
    break;
    case 11:
    var format1 = '-f mp3';
    var location = 'mp3';
    var format2 = 'mp3';
    break;
    case 2:
    var format1 = "-f '(mp4)[height<=720]'";
    var location = 'mp4';
    var format2 = 'mp4';
    break;
    case 22:
    var format1 = "-f '(mp4)[height<=480]'";
    var location = 'mp4m';
    var format2 = 'mp4';
    break;

  }
  //var cmd = 'youtube-dl "https://www.youtube.com/watch?v=ahXOaHv9XYo"';
  var video ="https://www.youtube.com/watch?v="+id;
  var myCmd ='youtube-dl -o "public/downloads/' + location + '/'+id+'.%(ext)s" ' + format1 + ' ' + url;
  cmd.get(
    myCmd,
    function(err, data, stderr){
      if(err){
        var arr ={
          status:false,
          data:'Oops Your url is not work!'+err,
          download: 'downloads/' + location + '/' + id + '.' + format2,
        };
      } else{
        var arr = {
          status: true,
          data: 'Successful',
          id: id,
          format:format,
          location:location,
          link: '/downloads/' + location + '/' + id + '.' + format2,
          download: '/downloads/' + location + '/' + id + '.' + format2,
          cmd: myCmd,
        }; 
      }
      console.log('the current working dir is : ',data);
      res.send(arr);
    }
    );
});

module.exports = router;