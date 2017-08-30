angular.module('myApp').controller('youtubectr',function($scope,$http,$location,youtubefact,homefact,$window,dailymotionFactory){

  $scope.arrformat=homefact.getFormat();
$scope.search_spin = [];// set it at an array first.
$scope.down = [];// set it at an array first.
$scope.msg = [];// set it at an array first.
$scope.message = [];// set it at an array first.
$scope.website =1;
$scope.order ='relevance';
$scope.order1 ='relevance';

// order for youtube
$scope.$watch("order", function (newValue, oldValue) {
  // this if to prevent the watch function fire after page load.
 if (newValue !== oldValue) {
    // do whatever you were going to do
    $scope.order =newValue;
    $scope.getYoutubeData();
  }

});
// order for dailymotion.
$scope.$watch("order1", function (newValue, oldValue) {
 if (newValue !== oldValue) {
  $scope.order1 =newValue;
  $scope.dailymotion();
}
});
// change search website.
$scope.$watch("website", function (newValue, oldValue) {
        if (newValue !== oldValue) {
          if(newValue==1)
          {
           $scope.getYoutubeData();
         }else{
          $scope.dailymotion();
        }

      }
  });




//Search keyword.
 //var keyword=location.search.split('search_text=')[1]? location.search.split('search_text=')[1]:'music';
// all parameters: https://developer.dailymotion.com/tools/apiexplorer#/video/list

$scope.search_convert = function (id,format,$index) {
  console.log('click');
  console.log('the index is:'+$index);
        // make up youtube.
        var youtube={
          url:'https://www.youtube.com/watch?v='+id,
          format:format
        };
        // start spin.
        $scope.search_spin[$index]=true;
        $scope.msg[$index]=true;
        // Call Convert function. We need a file name first.
        //get file name
        $scope.message[$index]='Get file name...';
        homefact.fileName(youtube.url).then(function(response){
          console.log(response);
          youtube.name=response.data.data;
          convert_youtube(youtube,$index);
        });
      };
    //Convert youtube. From search or home.
    function convert_youtube(youtube,$index)
    {
         //convert youtube
         $scope.message[$index]='Converting...';
         homefact.convert(youtube).then(function (response) {
          console.log(response.data);
          $scope.loading = false;
          $scope.search_spin[$index]=false;
          console.log(response.data.status);
          if(response.data.status===true)
          {
            console.log(response.data.download);  
            $scope.down[$index]=true;
            $scope.message[$index]=response.data.data;
                   //auto download.
                   $window.open(base_url+'download/get-file/'+response.data.location+'/'+response.data.id+'/'+response.data.format, '_blank');
                   
                 }
                 
                 $scope.result = response.data;
            //var json=response.data;

          });
        // end convert youtube.
        
      }
    //download
    $scope.autoDownload=function(path){
      console.log('fire download...');
      console.log(path);
      homefact.auto_download_after_success(path);
    };
    
    $scope.search_text='';

//Daily moting search funciton
$scope.dailymotion= function(){
  $scope.website=2;
  console.log(keyword+'<=========');
  
  if(isNaN($scope.nextPage))
  {
   console.log('it is not a number');
   $scope.nextPage=1;
   
 }
 console.log('call daily');
 dailymotionFactory.getVideosByParams({
    search:keyword, // (optional)
    //tags:keyword, // (optinal)d
    limit:"100", // (optional) valid values: 1-100 | default: 10
    sort:$scope.order1, 
    page: $scope.nextPage ? $scope.nextPage : 1
  }).then(function(response){
        //on success
        $scope.videos=[];
        var i;
        var x=response.data.list;
        var len=x.length;
        for(i=0;i<len;i++)
        {
         var video={
          title:x[i].title,
          thumbnail:x[i].thumbnail_240_url,
          id:x[i].id,
          duration:x[i].duration,
          public:x[i].created_time
        };
        $scope.videos[i]=video;
      }
      
      console.log(response);
      console.log(response.data.page);
      
      
      
      $scope.nextPageToken = response.data.page+1;
      $scope.prevPageToken =response.data.page-1;
      console.log(!isNaN(response.data.page+1));
    }).catch(function () {
        //on error
        console.log('error');
      });
  };

  function videoDetail(id)
  {

//    var id='SjK2XlNE39Q';
youtubefact.videoDetail(id).then(function(response){
 console.log(response.data.items[0].snippet.publishedAt); 
 var publish=response.data.items[0].snippet.publishedAt;
 return publish;
});
}


$scope.nextPage = "";
 // Get youtube data
 $scope.getYoutubeData = function(){
   $scope.website=1; 

   if(!isNaN($scope.nextPage))
   {
     console.log('it is a number');
     $scope.nextPage='';
     
   }
   console.log(keyword);
   $http.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      key: "AIzaSyAnR-0wQOsEwYF7U4CHQIMBoBzkRpx-0dw",
      type: 'video',
      maxResults: '50',
      order:$scope.order,
      pageToken: $scope.nextPage ? $scope.nextPage : '',
      part: 'id,snippet',
      q: keyword,
              //  q: '아바타',
              fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails,items/snippet/channelTitle,nextPageToken,prevPageToken'
              
            }})
   .then(function (response) {

    $scope.videos=[];
    $scope.t=[];
    console.log(response.data);
    var i;
    var x=response.data.items;
    var len=x.length;
    for(i=0;i<len;i++)
    {
      var video={
        title:x[i].snippet.title,
          //  duration:detail[0],
          thumbnail:x[i].snippet.thumbnails.default.url,
            id:x[i].id.videoId,///id 
            upload:x[i].id.videoId,
            duration:'0',
            public:'0'
            
          };
          $scope.videos[i]=video;
        }
         //console.log($scope.videos);
         $scope.nextPageToken = response.data.nextPageToken;
         $scope.prevPageToken = response.data.prevPageToken;
       });
};// end get youtube data
        // check length data.
        $scope.checkDataLength = function(data){
          return (data.length >=1);
    };// end check length data
 //Function next page.
 $scope.callNextPageFn = function(website,nextPage){
   $scope.nextPage = nextPage;
   if(website===1)
   {
     $scope.getYoutubeData();

   }else {
    $scope.dailymotion();
  }      
//         $scope.getYoutubeData();

console.log('fire next page:'+nextPage);
            //reset all download button.
    };// end next page
    


  });
