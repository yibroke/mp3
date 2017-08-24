angular.module('myApp').factory('youtubefact',function($http){
  var factory={};


  factory.search=function(youtube){
    return  $http.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: "AIzaSyAnR-0wQOsEwYF7U4CHQIMBoBzkRpx-0dw",
        type: 'video',
        maxResults: '12',
        part: 'id,snippet',
        fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
        q: youtube
      }});

  };
    //youtube video detail
    factory.videoDetail=function(videoId) {
     return $http.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        key: "AIzaSyAnR-0wQOsEwYF7U4CHQIMBoBzkRpx-0dw",
        type: 'video',
        id:videoId,
        part:'snippet,contentDetails'       
      }});

   };


   factory.convert=function(youtube){

     return $http.post(base_url+'home/converter',youtube);
        //return $http.post(base_url+'home/go',youtube);
      };
      factory.get_download_format=function(format)
      {
       return $http.get(base_url+'download/fet_all_format/'+format)
       .then(function (response) {
        return response.data;
      });
     };
     factory.download=function(path)
     {
       return $http.post(base_url+'download/get_file',path);
     //console.log(path);
     // return path;
   };
   factory.clientDl=function(id)
   {
     return $http.get('/search/client_dl/'+id);
   };
   factory.urlDl=function(data)
   {
     return $http.post('/search/url_dl/',data);
   };



   return factory;
 });
