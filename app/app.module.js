var app= angular.module('myApp',['ngSanitize','ngProgress','angularUtils.directives.dirPagination','ngtimeago','checklist-model']);
//customer filter..
app.filter('slugify', function() {
        return function(input) {
            string = input || '';// if dont have then = empty.
            return string.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g,'').replace(/ /g, '_').toLowerCase();
       }
  });


app.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);

  // change express {{}} => [{}]
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[{');
  $interpolateProvider.endSymbol('}]');
});

