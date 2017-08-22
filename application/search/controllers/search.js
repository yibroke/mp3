var express = require('express');
var router = express.Router();
var autoIncrement = require("mongodb-autoincrement"); // auto inc
var fs = require('fs');
var cmd=require('node-cmd');
var youtubedl = require('youtube-dl');
router.get('/', function(req, res, next) {

 console.log('hello from user controller.'+d);
  //use other layout
  res.render('pages/views/list', { title: 'Pages', layout:'dashboard' });
});

// new code
router.get('/make_url', function(req,res,next){
  var key = req.query.search_text.trim();
  var rep = key.replace(/ /g,'_');
  res.redirect('/keyword/'+rep+'.html');
  //res.send('here is your keyword: -'+rep+'-');
});
router.get('/keyword/:key', function(req, res, next){
  var q = req.params.key;
  var key = q.replace(/_/g,' ');
  // insert keyword to db.
  // if exist then remove then isnert new one.
  // check exist.
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

// Client DL
router.get('/client_dl/:id', function(req,res,next){
  var id = req.params.id;
  var url = 'http://www.youtube.com/watch?v='+id;
  var options = [];
  youtubedl.getInfo(url, options,{maxBuffer: 1000*1024}, function(err, info) {
    if (err) {
     // throw err;
     res.send('false');
   }else{
    var arr1 = info.formats;
    var i =0; var l = arr1.length;
    var response = [];
    for(i;i<l;i++)
    {
      var k =arr1[i];

      if(k.format_id ==18 || k.format_id==22)
      {
       var obj ={
         ext:k.ext,
         format_id: k.format_id,
         height: k.height,
         url: k.url
       }
       console.log(obj);

       response.push(obj);
     }
   }
   if(response.length==2){
    res.send(response);
  }else{

    var myCmd ='youtube-dl -o "public/downloads/mp4/'+id+'.%(ext)s" -f "(mp4)[height<=480]" ' + url;
    cmd.get(
      myCmd,
      function(err, data, stderr){
        if(err){
          var arr ={
            status:false,
            data:'Oops Your url is not work!'+err
          };
        } else{

          var arr = {
            status: true,
            data: 'Successful',
            id: id,
            format:'mp4',
            location:'mp4',
            link: '/downloads/mp4/' + id + '.mp4',
            download: '/downloads/mp4/' + id + '.mp4',
            cmd: myCmd,
          }; 
        }
        console.log('the current working dir is : ',data);
        res.send(arr);
      }
      );
  }
}
});
})



module.exports = router;