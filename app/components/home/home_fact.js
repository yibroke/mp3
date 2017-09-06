angular.module('myApp').factory('homefact',function($http,$q){
    var deferred = $q.defer();
    var factory={};
    //array format
      var arrvideo=[{id:2,name:"mp4 Best"},{id:22,name:"mp4 Medium"}];
      var arrmp3=[{id:1,name:"mp3"},{id:1,name:"mp3 best"}];
    
    factory.getFormat=function(value){
        if(value==='mp3') {
            return arrmp3;
        }else {
             return arrvideo;
        }
       
    };
    factory.getFormat2=function(value){
       return arrvideo;
       
    };
    //get youtube id from url. not work if id content equal sign. (=)
    factory.get_youtube_id_from_url=function(url)
    {
         return $http.post('/home/service_youtube_id_from_url',url);
    };
    //get dailymotion id from url
     factory.get_daily_id_from_url=function(url)
    {
         return $http.post('/home/service_dailymotion_id_from_url',url);
    };
    factory.check_client_download=function(youtube)
    {
         return $http.post(base_url+'home/check_youtube_download',youtube);
       //  return $http.post(base_url+'home/youtube_download',youtube);
    };

    
    //convert in back end. youtube(id,format)
    factory.convert=function(youtube){

         // return $http.post('/home/youtube_dl',youtube, {timeout: 29000});
          return $http.post('/home/youtube_dl',youtube);
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
    //for domain. use in factory.domain
    function extractHostname(url) {
            var hostname;
            //find & remove protocol (http, ftp, etc.) and get hostname

            if (url.indexOf("://") > -1) {
                hostname = url.split('/')[2];
            }
            else {
                hostname = url.split('/')[0];
            }
            //find & remove port number
            hostname = hostname.split(':')[0];
            //find & remove "?"
            hostname = hostname.split('?')[0];

            return hostname;
        }
//Get domain from url
    factory.domain=function(url) {

         var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

        //extracting the root domain here
        if (arrLen > 2) {
            domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        }
        return domain;
    };// end domain
    factory.getInfo=function(url) {
       var aaa={myurl:url};
          return $http.post('/home/getinfo',aaa);
    };// end getInfo
    
    //Get file name
    factory.fileName=function(url) {
         var aaa={myurl:url};
          return $http.post('/home/get_file_name',aaa);
    };
    factory.auto_download_after_success=function(id){
        var param={download:id};
        return $http.post(base_url+'download/get_file',param);
    };
    
  return factory;
});
