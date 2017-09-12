angular.module('myApp').controller('youtubectr',function($scope,$http,$location,youtubefact,homefact,$window,dailymotionFactory){

  $scope.mobile_filter =false;


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
    $scope.mobile_filter =false;
  }

});
// order for dailymotion.
$scope.$watch("order1", function (newValue, oldValue) {
 if (newValue !== oldValue) {
  $scope.order1 =newValue;
  $scope.dailymotion();
  $scope.mobile_filter =false;
}
});
// change search website.
$scope.$watch("website", function (newValue, oldValue) {
  if (newValue !== oldValue) {
    $scope.mobile_filter =false;
    if(newValue==1)
    {
     $scope.getYoutubeData();
   }else{
    $scope.dailymotion();
  }

}
});

//Daily motion search funciton Important
$scope.dailymotion= function(){
  $scope.website=2;
  console.log(keyword+'<=========');
  
  if(isNaN($scope.nextPage))
  {
   console.log('it is not a number');
   $scope.nextPage=1;
   
 }
 console.log('call daily');
// https://github.com/JohnnyTheTank/angular-dailymotion-api-factory
dailymotionFactory.getVideosByParams({
    search:keyword, // (optional)
    limit:"50", // (optional) valid values: 1-100 | default: 10
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
          public:x[i].created_time,
          views:x[i].views_total
        };
        $scope.videos[i]=video;
      }
    //  console.log(response);
      // console.log(response.data.page);
      $scope.nextPageToken = response.data.page+1;
      $scope.prevPageToken =response.data.page-1;
      //console.log(!isNaN(response.data.page+1));
    }).catch(function () {
        //on error
        console.log('error');
      });
  };
// End dailymotion factory.


$scope.nextPage = "";
 // Get youtube data Important
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
    // console.log(response.data);
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
            views:'0',// default value coz youtube dont give views.
            public:'0'
            
          };
          $scope.videos[i]=video;
        }
         //console.log($scope.videos);
         $scope.nextPageToken = response.data.nextPageToken;
         $scope.prevPageToken = response.data.prevPageToken;
       });
};// end get youtube data
 //Function next page. Important But not in use.
 // we now just pagination in 50 result.
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
