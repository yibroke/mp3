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


/**
    @name: angular-dailymotion-api-factory 
    @version: 0.5.1 (26-01-2016) 
    @author: Jonathan Hornung <jonathan.hornung@gmail.com> 
    @url: https://github.com/JohnnyTheTank/angular-dailymotion-api-factory#readme 
    @license: MIT
*/
// Add views_total there. Use Ctr+F to find.
"use strict";

angular.module('myApp').factory('dailymotionFactory', ['$http', 'dailymotionSearchDataService', function ($http, dailymotionSearchDataService) {

        var dailymotionFactory = {};

        dailymotionFactory.getVideosFromUserById = function (_params) {

            if(!_params.id) {
                return false;
            }

            var searchData = dailymotionSearchDataService.getNew("videosFromUserById", _params);
            //https://developer.dailymotion.com/tools/apiexplorer#/reverse/user/videos/list
            return $http({
                    method: 'GET',
                    url: searchData.url,
                    params: searchData.object,
                }
            );
        };

        dailymotionFactory.getVideosFromChannelById = function (_params) {

            if(!_params.id) {
                return false;
            }

            var searchData = dailymotionSearchDataService.getNew("videosFromChannelById", _params);
            //https://developer.dailymotion.com/tools/apiexplorer#/channel/videos/list
                return $http({
                        method: 'GET',
                        url: searchData.url,
                        params: searchData.object,
                    }
                );
        };

        dailymotionFactory.getVideosFromPlaylistById = function (_params) {

            if(!_params.id) {
                return false;
            }

            var searchData = dailymotionSearchDataService.getNew("videosFromPlaylistById", _params);
            //https://developer.dailymotion.com/tools/apiexplorer#/playlist/videos/list
            return $http({
                    method: 'GET',
                    url: searchData.url,
                    params: searchData.object,
                }
            );
        };

        dailymotionFactory.getVideosByParams = function (_params) {
            //https://developer.dailymotion.com/tools/apiexplorer#/video/list
            var searchData = dailymotionSearchDataService.getNew("videosByParams", _params);

            return $http({
                    method: 'GET',
                    url: searchData.url,
                    params: searchData.object,
                }
            );
        };

        return dailymotionFactory;
    }])
    .service('dailymotionSearchDataService', function () {
        this.getApiBaseUrl = function (_params) {
            return "https://api.dailymotion.com/";
        };

        this.fillDataInObjectByList = function (_object, _params, _list) {

            angular.forEach(_list, function (value, key) {
                if (typeof _params[value] !== "undefined") {
                    _object.object[value] = _params[value];
                }
            });

            return _object;
        };

        this.getNew = function (_type, _params) {

            var dailymotionSearchData = {
                object: {},
                url: "",
            };

            switch (_type) {

                case "videosFromUserById":
                    dailymotionSearchData.object.fields = 'bookmarks_total,comments_total,created_time,description,duration,embed_html,id,item_type,media_type,owner.id,owner.screenname,owner.url,thumbnail_240_url,thumbnail_720_url,thumbnail_url,title,updated_time,url,';

                    dailymotionSearchData = this.fillDataInObjectByList(dailymotionSearchData, _params, [
                        'fields', 'channel', 'created_after', 'created_before', 'genre', 'nogenre', 'page', 'limit', 'search', 'tags'
                    ]);

                    dailymotionSearchData.url = this.getApiBaseUrl() + "user/" + _params.id + "/videos";
                    break;

                case "videosFromChannelById":
                    dailymotionSearchData.object.fields = 'bookmarks_total,comments_total,created_time,description,duration,embed_html,id,item_type,media_type,owner.id,owner.screenname,owner.url,thumbnail_240_url,thumbnail_720_url,thumbnail_url,title,updated_time,url,';

                    dailymotionSearchData = this.fillDataInObjectByList(dailymotionSearchData, _params, [
                        'fields', 'channel', 'created_after', 'created_before', 'search', 'sort', 'tags', 'page', 'limit',
                    ]);

                    dailymotionSearchData.url = this.getApiBaseUrl() + "channel/" + _params.id + "/videos";
                    break;

                case "videosFromPlaylistById":
                    dailymotionSearchData.object.fields = 'bookmarks_total,comments_total,created_time,description,duration,embed_html,id,item_type,media_type,owner.id,owner.screenname,owner.url,thumbnail_240_url,thumbnail_720_url,thumbnail_url,title,updated_time,url,';

                    dailymotionSearchData = this.fillDataInObjectByList(dailymotionSearchData, _params, [
                        'fields', 'search', 'sort', 'tags', 'page', 'limit',
                    ]);

                    dailymotionSearchData.url = this.getApiBaseUrl() + "playlist/" + _params.id + "/videos";
                    break;

                case "videosByParams":
                    dailymotionSearchData.object.fields = 'bookmarks_total,views_total,comments_total,created_time,description,duration,embed_html,id,item_type,media_type,owner.id,owner.screenname,owner.url,thumbnail_240_url,thumbnail_720_url,thumbnail_url,title,updated_time,url,';

                    dailymotionSearchData = this.fillDataInObjectByList(dailymotionSearchData, _params, [
                        'fields', 'channel', 'country', 'created_after', 'created_before', 'detected_language', 'exclude_ids', 'featured', 'genre', 'has_game', 'hd', 'ids', 'in_history', 'languages', 'list', 'live', 'live_offair', 'live_onair', 'live_upcoming', 'longer_than', 'no_live', 'no_premium', 'nogenre', 'owners', 'partner', 'poster', 'premium', 'private', 'search', 'shorter_than', 'sort', 'svod', 'tags', 'tvod', 'ugc', 'verified', 'page', 'limit'
                    ]);

                    dailymotionSearchData.url = this.getApiBaseUrl() + "videos";
                    break;
            }

            return dailymotionSearchData;
        };
    });
/**
 * Checklist-model
 * AngularJS directive for list of checkboxes
 * https://github.com/vitalets/checklist-model
 * License: MIT http://opensource.org/licenses/MIT
 */

 /* commonjs package manager support (eg componentjs) */
 if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
   module.exports = 'checklist-model';
 }

angular.module('checklist-model', [])
.directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
  // contains
  function contains(arr, item, comparator) {
    if (angular.isArray(arr)) {
      for (var i = arr.length; i--;) {
        if (comparator(arr[i], item)) {
          return true;
        }
      }
    }
    return false;
  }

  // add
  function add(arr, item, comparator) {
    arr = angular.isArray(arr) ? arr : [];
      if(!contains(arr, item, comparator)) {
          arr.push(item);
      }
    return arr;
  }

  // remove
  function remove(arr, item, comparator) {
    if (angular.isArray(arr)) {
      for (var i = arr.length; i--;) {
        if (comparator(arr[i], item)) {
          arr.splice(i, 1);
          break;
        }
      }
    }
    return arr;
  }

  // http://stackoverflow.com/a/19228302/1458162
  function postLinkFn(scope, elem, attrs) {
     // exclude recursion, but still keep the model
    var checklistModel = attrs.checklistModel;
    attrs.$set("checklistModel", null);
    // compile with `ng-model` pointing to `checked`
    $compile(elem)(scope);
    attrs.$set("checklistModel", checklistModel);

    // getter for original model
    var checklistModelGetter = $parse(checklistModel);
    var checklistChange = $parse(attrs.checklistChange);
    var checklistBeforeChange = $parse(attrs.checklistBeforeChange);
    var ngModelGetter = $parse(attrs.ngModel);



    var comparator = function (a, b) {
      if(!isNaN(a) && !isNaN(b)) {
        return String(a) === String(b);
      } else {
        return angular.equals(a,b);
      }
    };

    if (attrs.hasOwnProperty('checklistComparator')){
      if (attrs.checklistComparator[0] == '.') {
        var comparatorExpression = attrs.checklistComparator.substring(1);
        comparator = function (a, b) {
          return a[comparatorExpression] === b[comparatorExpression];
        };

      } else {
        comparator = $parse(attrs.checklistComparator)(scope.$parent);
      }
    }

    // watch UI checked change
    var unbindModel = scope.$watch(attrs.ngModel, function(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }

      if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
        ngModelGetter.assign(scope, contains(checklistModelGetter(scope.$parent), getChecklistValue(), comparator));
        return;
      }

      setValueInChecklistModel(getChecklistValue(), newValue);

      if (checklistChange) {
        checklistChange(scope);
      }
    });

    // watches for value change of checklistValue
    var unbindCheckListValue = scope.$watch(getChecklistValue, function(newValue, oldValue) {
      if( newValue != oldValue && angular.isDefined(oldValue) && scope[attrs.ngModel] === true ) {
        var current = checklistModelGetter(scope.$parent);
        checklistModelGetter.assign(scope.$parent, remove(current, oldValue, comparator));
        checklistModelGetter.assign(scope.$parent, add(current, newValue, comparator));
      }
    }, true);

    var unbindDestroy = scope.$on('$destroy', destroy);

    function destroy() {
      unbindModel();
      unbindCheckListValue();
      unbindDestroy();
    }

    function getChecklistValue() {
      return attrs.checklistValue ? $parse(attrs.checklistValue)(scope.$parent) : attrs.value;
    }

    function setValueInChecklistModel(value, checked) {
      var current = checklistModelGetter(scope.$parent);
      if (angular.isFunction(checklistModelGetter.assign)) {
        if (checked === true) {
          checklistModelGetter.assign(scope.$parent, add(current, value, comparator));
        } else {
          checklistModelGetter.assign(scope.$parent, remove(current, value, comparator));
        }
      }

    }

    // declare one function to be used for both $watch functions
    function setChecked(newArr, oldArr) {
      if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
        setValueInChecklistModel(getChecklistValue(), ngModelGetter(scope));
        return;
      }
      ngModelGetter.assign(scope, contains(newArr, getChecklistValue(), comparator));
    }

    // watch original model change
    // use the faster $watchCollection method if it's available
    if (angular.isFunction(scope.$parent.$watchCollection)) {
        scope.$parent.$watchCollection(checklistModel, setChecked);
    } else {
        scope.$parent.$watch(checklistModel, setChecked, true);
    }
  }

  return {
    restrict: 'A',
    priority: 1000,
    terminal: true,
    scope: true,
    compile: function(tElement, tAttrs) {

      if (!tAttrs.checklistValue && !tAttrs.value) {
        throw 'You should provide `value` or `checklist-value`.';
      }

      // by default ngModel is 'checked', so we set it if not specified
      if (!tAttrs.ngModel) {
        // local scope var storing individual checkbox model
        tAttrs.$set("ngModel", "checked");
      }

      return postLinkFn;
    }
  };
}]);

angular.module('myApp').directive('duration',function($http){
    return {
        restrict: 'E',
        template:"[{value | secondsToDateTime | date:'HH:mm:ss' }]",
        scope:{
          value:'@value' 
        },
        link:function($scope){
            console.log($scope.value);
        }
    };
    
    
});
/*
 * angular-loading-bar
 *
 * intercepts XHR requests and creates a loading bar.
 * Based on the excellent nprogress work by rstacruz (more info in readme)
 *
 * (c) 2013 Wes Cruver
 * License: MIT
 */


(function() {

'use strict';

// Alias the loading bar for various backwards compatibilities since the project has matured:
angular.module('angular-loading-bar', ['cfp.loadingBarInterceptor']);
angular.module('chieffancypants.loadingBar', ['cfp.loadingBarInterceptor']);


/**
 * loadingBarInterceptor service
 *
 * Registers itself as an Angular interceptor and listens for XHR requests.
 */
angular.module('cfp.loadingBarInterceptor', ['cfp.loadingBar'])
  .config(['$httpProvider', function ($httpProvider) {

    var interceptor = ['$q', '$cacheFactory', '$timeout', '$rootScope', '$log', 'cfpLoadingBar', function ($q, $cacheFactory, $timeout, $rootScope, $log, cfpLoadingBar) {

      /**
       * The total number of requests made
       */
      var reqsTotal = 0;

      /**
       * The number of requests completed (either successfully or not)
       */
      var reqsCompleted = 0;

      /**
       * The amount of time spent fetching before showing the loading bar
       */
      var latencyThreshold = cfpLoadingBar.latencyThreshold;

      /**
       * $timeout handle for latencyThreshold
       */
      var startTimeout;


      /**
       * calls cfpLoadingBar.complete() which removes the
       * loading bar from the DOM.
       */
      function setComplete() {
        $timeout.cancel(startTimeout);
        cfpLoadingBar.complete();
        reqsCompleted = 0;
        reqsTotal = 0;
      }

      /**
       * Determine if the response has already been cached
       * @param  {Object}  config the config option from the request
       * @return {Boolean} retrns true if cached, otherwise false
       */
      function isCached(config) {
        var cache;
        var defaultCache = $cacheFactory.get('$http');
        var defaults = $httpProvider.defaults;

        // Choose the proper cache source. Borrowed from angular: $http service
        if ((config.cache || defaults.cache) && config.cache !== false &&
          (config.method === 'GET' || config.method === 'JSONP')) {
            cache = angular.isObject(config.cache) ? config.cache
              : angular.isObject(defaults.cache) ? defaults.cache
              : defaultCache;
        }

        var cached = cache !== undefined ?
          cache.get(config.url) !== undefined : false;

        if (config.cached !== undefined && cached !== config.cached) {
          return config.cached;
        }
        config.cached = cached;
        return cached;
      }


      return {
        'request': function(config) {
          // Check to make sure this request hasn't already been cached and that
          // the requester didn't explicitly ask us to ignore this request:
          if (!config.ignoreLoadingBar && !isCached(config)) {
            $rootScope.$broadcast('cfpLoadingBar:loading', {url: config.url});
            if (reqsTotal === 0) {
              startTimeout = $timeout(function() {
                cfpLoadingBar.start();
              }, latencyThreshold);
            }
            reqsTotal++;
            cfpLoadingBar.set(reqsCompleted / reqsTotal);
          }
          return config;
        },

        'response': function(response) {
          if (!response || !response.config) {
            $log.error('Broken interceptor detected: Config object not supplied in response:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
            return response;
          }

          if (!response.config.ignoreLoadingBar && !isCached(response.config)) {
            reqsCompleted++;
            if (reqsCompleted >= reqsTotal) {
              $rootScope.$broadcast('cfpLoadingBar:loaded', {url: response.config.url, result: response});
              setComplete();
            } else {
              cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
          }
          return response;
        },

        'responseError': function(rejection) {
          if (!rejection || !rejection.config) {
            $log.error('Broken interceptor detected: Config object not supplied in rejection:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
            return $q.reject(rejection);
          }

          if (!rejection.config.ignoreLoadingBar && !isCached(rejection.config)) {
            reqsCompleted++;
            if (reqsCompleted >= reqsTotal) {
              $rootScope.$broadcast('cfpLoadingBar:loaded', {url: rejection.config.url, result: rejection});
              setComplete();
            } else {
              cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
          }
          return $q.reject(rejection);
        }
      };
    }];

    $httpProvider.interceptors.push(interceptor);
  }]);


/**
 * Loading Bar
 *
 * This service handles adding and removing the actual element in the DOM.
 * Generally, best practices for DOM manipulation is to take place in a
 * directive, but because the element itself is injected in the DOM only upon
 * XHR requests, and it's likely needed on every view, the best option is to
 * use a service.
 */
angular.module('cfp.loadingBar', [])
  .provider('cfpLoadingBar', function() {

    this.autoIncrement = true;
    this.includeSpinner = true;
    this.includeBar = true;
    this.latencyThreshold = 100;
    this.startSize = 0.02;
    this.parentSelector = 'body';
    this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>';
    this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';

    this.$get = ['$injector', '$document', '$timeout', '$rootScope', function ($injector, $document, $timeout, $rootScope) {
      var $animate;
      var $parentSelector = this.parentSelector,
        loadingBarContainer = angular.element(this.loadingBarTemplate),
        loadingBar = loadingBarContainer.find('div').eq(0),
        spinner = angular.element(this.spinnerTemplate);

      var incTimeout,
        completeTimeout,
        started = false,
        status = 0;

      var autoIncrement = this.autoIncrement;
      var includeSpinner = this.includeSpinner;
      var includeBar = this.includeBar;
      var startSize = this.startSize;

      /**
       * Inserts the loading bar element into the dom, and sets it to 2%
       */
      function _start() {
        if (!$animate) {
          $animate = $injector.get('$animate');
        }

        $timeout.cancel(completeTimeout);

        // do not continually broadcast the started event:
        if (started) {
          return;
        }

        var document = $document[0];
        var parent = document.querySelector ?
          document.querySelector($parentSelector)
          : $document.find($parentSelector)[0]
        ;

        if (! parent) {
          parent = document.getElementsByTagName('body')[0];
        }

        var $parent = angular.element(parent);
        var $after = parent.lastChild && angular.element(parent.lastChild);

        $rootScope.$broadcast('cfpLoadingBar:started');
        started = true;

        if (includeBar) {
          $animate.enter(loadingBarContainer, $parent, $after);
        }

        if (includeSpinner) {
          $animate.enter(spinner, $parent, loadingBarContainer);
        }

        _set(startSize);
      }

      /**
       * Set the loading bar's width to a certain percent.
       *
       * @param n any value between 0 and 1
       */
      function _set(n) {
        if (!started) {
          return;
        }
        var pct = (n * 100) + '%';
        loadingBar.css('width', pct);
        status = n;

        // increment loadingbar to give the illusion that there is always
        // progress but make sure to cancel the previous timeouts so we don't
        // have multiple incs running at the same time.
        if (autoIncrement) {
          $timeout.cancel(incTimeout);
          incTimeout = $timeout(function() {
            _inc();
          }, 250);
        }
      }

      /**
       * Increments the loading bar by a random amount
       * but slows down as it progresses
       */
      function _inc() {
        if (_status() >= 1) {
          return;
        }

        var rnd = 0;

        // TODO: do this mathmatically instead of through conditions

        var stat = _status();
        if (stat >= 0 && stat < 0.25) {
          // Start out between 3 - 6% increments
          rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
        } else if (stat >= 0.25 && stat < 0.65) {
          // increment between 0 - 3%
          rnd = (Math.random() * 3) / 100;
        } else if (stat >= 0.65 && stat < 0.9) {
          // increment between 0 - 2%
          rnd = (Math.random() * 2) / 100;
        } else if (stat >= 0.9 && stat < 0.99) {
          // finally, increment it .5 %
          rnd = 0.005;
        } else {
          // after 99%, don't increment:
          rnd = 0;
        }

        var pct = _status() + rnd;
        _set(pct);
      }

      function _status() {
        return status;
      }

      function _completeAnimation() {
        status = 0;
        started = false;
      }

      function _complete() {
        if (!$animate) {
          $animate = $injector.get('$animate');
        }

        _set(1);
        $timeout.cancel(completeTimeout);

        // Attempt to aggregate any start/complete calls within 500ms:
        completeTimeout = $timeout(function() {
          var promise = $animate.leave(loadingBarContainer, _completeAnimation);
          if (promise && promise.then) {
            promise.then(_completeAnimation);
          }
          $animate.leave(spinner);
          $rootScope.$broadcast('cfpLoadingBar:completed');
        }, 500);
      }

      return {
        start            : _start,
        set              : _set,
        status           : _status,
        inc              : _inc,
        complete         : _complete,
        autoIncrement    : this.autoIncrement,
        includeSpinner   : this.includeSpinner,
        latencyThreshold : this.latencyThreshold,
        parentSelector   : this.parentSelector,
        startSize        : this.startSize
      };


    }];     //
  });       // wtf javascript. srsly
})();       //

/*
 AngularJS v1.2.0-rc.3
 (c) 2010-2012 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(m,f,n){'use strict';f.module("ngAnimate",["ng"]).config(["$provide","$animateProvider",function(A,s){var v=f.noop,w=f.forEach,B=s.$$selectors,k="$$ngAnimateState",x="ng-animate",u={running:!0};A.decorator("$animate",["$delegate","$injector","$sniffer","$rootElement","$timeout","$rootScope",function(q,m,y,n,p,g){function G(a){if(a){var c=[],b={};a=a.substr(1).split(".");(y.transitions||y.animations)&&a.push("");for(var e=0;e<a.length;e++){var d=a[e],l=B[d];l&&!b[d]&&(c.push(m.get(l)),b[d]=
!0)}return c}}function d(a,c,b,e,d,f){function g(){if(!g.hasBeenRun){g.hasBeenRun=!0;var a=b.data(k);a&&(r?l(b):(a.flagTimer=p(function(){l(b)},0,!1),b.data(k,a)));(f||v)()}}var q=(" "+((b.attr("class")||"")+" "+c)).replace(/\s+/g,"."),h=[];w(G(q),function(c,b){h.push({start:c[a]})});e||(e=d?d.parent():b.parent());d={running:!0};if((e.inheritedData(k)||d).running||0==h.length)g();else{e=b.data(k)||{};var r="addClass"==a||"removeClass"==a;if(e.running){if(r&&e.structural){f&&f();return}p.cancel(e.flagTimer);
t(e.animations);(e.done||v)()}b.data(k,{running:!0,structural:!r,animations:h,done:g});b.addClass(x);w(h,function(a,e){var d=function(){a:{h[e].done=!0;(h[e].endFn||v)();for(var a=0;a<h.length;a++)if(!h[a].done)break a;g()}};a.start?a.endFn=r?a.start(b,c,d):a.start(b,d):d()})}}function z(a){f.forEach(a[0].querySelectorAll("."+x),function(a){a=f.element(a);var b=a.data(k);b&&(t(b.animations),l(a))})}function t(a){w(a,function(a){(a.endFn||v)(!0)})}function l(a){a.removeClass(x);a.removeData(k)}n.data(k,
u);return{enter:function(a,c,b,e){this.enabled(!1,a);q.enter(a,c,b);g.$$postDigest(function(){d("enter","ng-enter",a,c,b,function(){e&&p(e,0,!1)})})},leave:function(a,c){z(a);this.enabled(!1,a);g.$$postDigest(function(){d("leave","ng-leave",a,null,null,function(){q.leave(a,c)})})},move:function(a,c,b,e){z(a);this.enabled(!1,a);q.move(a,c,b);g.$$postDigest(function(){d("move","ng-move",a,null,null,function(){e&&p(e,0,!1)})})},addClass:function(a,c,b){d("addClass",c,a,null,null,function(){q.addClass(a,
c,b)})},removeClass:function(a,c,b){d("removeClass",c,a,null,null,function(){q.removeClass(a,c,b)})},enabled:function(a,c){switch(arguments.length){case 2:if(a)l(c);else{var b=c.data(k)||{};b.structural=!0;b.running=!0;c.data(k,b)}break;case 1:u.running=!a;break;default:a=!u.running}return!!a}}}]);s.register("",["$window","$sniffer","$timeout",function(k,v,y){function w(a){C.push(a);y.cancel(D);D=y(function(){f.forEach(C,function(a){a()});C=[];D=null;r={}},10,!1)}function p(a,b,d){var f=r[b];if(!f){var h=
0,E=0,p=0,m=0;t(a,function(a){if(a.nodeType==B&&(a=k.getComputedStyle(a)||{},h=Math.max(g(a[l+e]),h),!d)){E=Math.max(g(a[l+s]),E);m=Math.max(g(a[c+s]),m);var b=g(a[c+e]);0<b&&(b*=parseInt(a[c+A])||1);p=Math.max(b,p)}});f={transitionDelay:E,animationDelay:m,transitionDuration:h,animationDuration:p};r[b]=f}return f}function g(a){var b=0;a=f.isString(a)?a.split(/\s*,\s*/):[];t(a,function(a){b=Math.max(parseFloat(a)||0,b)});return b}function x(a){var b=a.parent(),c=b.data(h);c||(b.data(h,++F),c=F);return c+
"-"+a[0].className}function d(c,d,e){function f(a){a.stopPropagation();a=a.originalEvent||a;var b=a.$manualTimeStamp||a.timeStamp||Date.now();Math.max(b-r,0)>=m&&a.elapsedTime>=k&&e()}var h=x(c);if(!(0<p(c,h,!0).transitionDuration)){c.addClass(d);var g=p(c,h+" "+d),k=Math.max(g.transitionDuration,g.animationDuration);if(0<k){var m=1E3*Math.max(g.transitionDelay,g.animationDelay),r=Date.now(),q=c[0];0<g.transitionDuration&&(q.style[l+u]="none");var n="";t(d.split(" "),function(a,b){n+=(0<b?" ":"")+
a+"-active"});var s=b+" "+a;w(function(){0<g.transitionDuration&&(q.style[l+u]="");c.addClass(n)});c.on(s,f);return function(a){c.off(s,f);c.removeClass(d);c.removeClass(n);a&&e()}}c.removeClass(d)}e()}function z(a,b){var c="";a=f.isArray(a)?a:a.split(/\s+/);t(a,function(a,d){a&&0<a.length&&(c+=(0<d?" ":"")+a+b)});return c}var t=f.forEach,l,a,c,b;m.ontransitionend===n&&m.onwebkittransitionend!==n?(l="WebkitTransition",a="webkitTransitionEnd transitionend"):(l="transition",a="transitionend");m.onanimationend===
n&&m.onwebkitanimationend!==n?(c="WebkitAnimation",b="webkitAnimationEnd animationend"):(c="animation",b="animationend");var e="Duration",u="Property",s="Delay",A="IterationCount",B=1,h="$ngAnimateKey",r={},F=0,C=[],D;return{enter:function(a,b){return d(a,"ng-enter",b)},leave:function(a,b){return d(a,"ng-leave",b)},move:function(a,b){return d(a,"ng-move",b)},addClass:function(a,b,c){return d(a,z(b,"-add"),c)},removeClass:function(a,b,c){return d(a,z(b,"-remove"),c)}}}])}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map
'use strict';

var catalyst = angular.module('ngtimeago', []);


catalyst.filter('timeago', function() {
        return function(input, p_allowFuture) {
		
            var substitute = function (stringOrFunction, number, strings) {
                    var string = angular.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;
                    var value = (strings.numbers && strings.numbers[number]) || number;
                    return string.replace(/%d/i, value);
                },
                nowTime = (new Date()).getTime(),
                date = (new Date(input)).getTime(),
                //refreshMillis= 6e4, //A minute
                allowFuture = p_allowFuture || false,
                strings= {
                    prefixAgo: '',
                    prefixFromNow: '',
                    suffixAgo: "ago",
                    suffixFromNow: "from now",
                    seconds: "less than a minute",
                    minute: "about a minute",
                    minutes: "%d minutes",
                    hour: "about an hour",
                    hours: "about %d hours",
                    day: "a day",
                    days: "%d days",
                    month: "about a month",
                    months: "%d months",
                    year: "about a year",
                    years: "%d years"
                },
                dateDifference = nowTime - date,
                words,
                seconds = Math.abs(dateDifference) / 1000,
                minutes = seconds / 60,
                hours = minutes / 60,
                days = hours / 24,
                years = days / 365,
                separator = strings.wordSeparator === undefined ?  " " : strings.wordSeparator,
            
               
                prefix = strings.prefixAgo,
                suffix = strings.suffixAgo;
                
            if (allowFuture) {
                if (dateDifference < 0) {
                    prefix = strings.prefixFromNow;
                    suffix = strings.suffixFromNow;
                }
            }

            words = seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||
            seconds < 90 && substitute(strings.minute, 1, strings) ||
            minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||
            minutes < 90 && substitute(strings.hour, 1, strings) ||
            hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||
            hours < 42 && substitute(strings.day, 1, strings) ||
            days < 30 && substitute(strings.days, Math.round(days), strings) ||
            days < 45 && substitute(strings.month, 1, strings) ||
            days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||
            years < 1.5 && substitute(strings.year, 1, strings) ||
            substitute(strings.years, Math.round(years), strings);
			console.log(prefix+words+suffix+separator);
			prefix.replace(/ /g, '')
			words.replace(/ /g, '')
			suffix.replace(/ /g, '')
			return (prefix+' '+words+' '+suffix+' '+separator);
            
        };
    });

    
angular.module('myApp').controller('contactCtr', function($scope, contactFact){

// if not defind here it will coz underfined error.
$scope.cont ={ email:'', message:''};
	$scope.contact = function(cont){
		console.log(cont);
		if(cont.message==''|| cont.message==null)
		{
			angular.element(contact_message).tooltip({ placement: 'bottom', trigger:'manual'});
			angular.element(contact_message).tooltip('show');
			angular.element(contact_message).focus();
        //alert(1);
    }else{
    	contactFact.insert(cont).then(function(res){
    		console.log(res);
    		$scope.cont ={
    			email:'',
    			message:''
    		}
			// hide modal.
			angular.element('#modalContact').modal('hide');
		})
    }
}
})
angular.module('myApp').factory('contactFact', function($http){
	var factory ={};
	factory.insert = function(data){
		return $http.post('/api/contact/insert', data);
	}
	factory.list = function(sort,query){
		return $http.get('/api/contact/list?sort='+sort+'&query='+query);
	}
	factory.delete = function(id){
		return $http.delete('/api/contact/delete/'+id);
	}
	factory.deleteArray = function(data){
		console.log(data);
		var d={0:'fdfds',1:'fdsf'};
		return $http.post('/api/contact/delete_array/', data);
	}
	factory.changeStatus = function(data){
		
		return $http.post('/api/contact/change_status', data);
	}
	return factory;
})
angular.module('myApp').controller('contactList', function($scope, contactFact){
	console.log(1);


// sort

$scope.$watch("pickSort", function(newValue,oldValue){
	 if(newValue!=''|| newValue!=null){
	 	console.log(newValue);
	 	list(newValue.id,$scope.pickQuery.id);

	 }
})
// query
$scope.$watch("pickQuery", function(newValue,oldValue){
	 if(newValue!=''|| newValue!=null){
	 	console.log(newValue);
	 	list($scope.pickSort.id,newValue.id);

	 }
})


// $scope.listPerPage =[2,4,6,8,9];
$scope.listPerPage =[5,10,20,30,50,100];
$scope.listSort =[
{id:'new', value:'New First'},
{id:'old' , value:'Old First'}
];
$scope.listQuery =[
{id:'all', value:'All'},
{id:'pending', value:'Pending'},
{id:'solve' , value:'Solve'},
{id:'reference', value:'Reference'}
];
//pre select query
$scope.pickQuery ={id:'all',value:'All'};
// pre select sort
 $scope.pickSort= {id: 'new', value: 'New First'} //This sets the default value of the select in the ui
//need this. for count list ids.(delete or change status)
$scope.contact = {
	ids: []
};
// change status

$scope.status ='Pending';
$scope.changeStatus= function(data){
 console.log(data);
 console.log($scope.contact.ids);
// convert array to obj
	var obj = $scope.contact.ids.reduce(function(acc, cur, i) {
			acc[i] = cur;
			return acc;
		}, {});
	obj.status = data;

		console.log(obj);
	// push status to obj
 contactFact.changeStatus(obj).then(function(res){
 	console.log(res.data);
 	list($scope.pickSort.id,$scope.pickQuery.id);
			$scope.contact = {
				ids: []
			};
 })

}
// end change status

$scope.deleteArray = function(data){
	console.log(data);
		// convert array data to object.
		var obj = data.reduce(function(acc, cur, i) {
			acc[i] = cur;
			return acc;
		}, {});
		console.log(obj);
		//delete array.
		contactFact.deleteArray(obj).then(function(res){
			console.log(res);
			list($scope.pickSort.id,$scope.pickQuery.id);
			$scope.contact = {
				ids: []
			};

		})
	}


	list('new','all');
	function list(sort,query){
		contactFact.list(sort,query).then(function(res){
			$scope.list = res.data;
			console.log(res);
		});
	}
	// delete
	$scope.delete = function(id){
		contactFact.delete(id).then(function(res){
			console.log(1);
			list('new');
		})
	}
})
angular.module('myApp').controller('homectr',function($scope,homefact,$http,$window,youtubefact){
//home search copy from searchCtr
$scope.ysearch = function(search_text){
  if(search_text==''|| search_text==null)
  {
    angular.element(youtube1).tooltip({ placement: 'bottom', trigger:'manual'});
    angular.element(youtube1).tooltip('show');
    angular.element(youtube1).focus();
        //alert(1);
        
      }else{
        var key = search_text.trim();
        var rep = key.replace(/ /g,'_');
        angular.element(youtube).tooltip('hide');
        youtubefact.make_url(key).then(function(res){
          console.log(res);
          window.location = '/keyword/'+rep+'.html';
        });
      }
    }
    // end 

    $scope.$watch("search_text", function (newValue, oldValue) {
      if(newValue!=''|| newValue!=null){
       angular.element(youtube1).tooltip('hide');
     }
   });
// end home search






$scope.youtube={
             url:'',//leave it empty
             domain:'',
             format:2//default should be 1.
           };


           $scope.$watch("youtube.url",function(newValue){
             angular.element(my_url).tooltip('hide');
             $scope.youtube.domain=homefact.domain(newValue);

           });

         //********************************************'
        

// CHECK URL REDIRECT. IMPORTANT.
$scope.check_url_redirect=function(youtube) {

 if((youtube.domain==='youtube.com')||(youtube.domain==='youtu.be'))
 {
  homefact.get_youtube_id_from_url(youtube).then(function(response){
    if(response.data!=='0')
    {
                           $window.location.href="play/1/"+response.data+'/youtube';//should be the video title

                         }else {
                          $scope.msg=true;
                          $scope.message = 'Wrong youtube url';
                        }

                      });
}else if(youtube.domain==='dailymotion.com')
{

 homefact.get_daily_id_from_url(youtube).then(function(response){
                   $window.location.href="play/2/"+response.data+'/dailymotion';//should be the video title.
                 });

}else if(youtube.domain==='soundcloud.com') {


                $window.location.href="play/3?url="+youtube.url;//should be the video title.

              // check_url(youtube);

            }else{

             $scope.checkurl_msg =true;
             angular.element(my_url).focus();
             angular.element(my_url).tooltip({ placement: 'bottom', trigger:'manual'});
             angular.element(my_url).tooltip('show');

                  //angular.element(my_url).tooltip({ placement: 'bottom', delay: {show: 10, hide: 100}});

                }


//  End check
};



});
angular.module('myApp').factory('homefact',function($http){
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
    //convert in back end. youtube(id,format)
    factory.convert=function(youtube){

         // return $http.post('/home/youtube_dl',youtube, {timeout: 29000});
          return $http.post('/home/youtube_dl',youtube);
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
    

    
    
  return factory;
});

angular.module('myApp').controller('kwordsCtr',function($scope,kwordsFact){  
  
    kwordsFact.kwords().then(function(response){
      
        $scope.kwords=response.data;
     });
     $scope.delete=function(name)
     {
        console.log(name);
         kwordsFact.delete(name).then(function(res){
            console.log(res.data); 
            if(res.data.n===1)
            {
               kwordsFact.kwords().then(function(response){
      
                    $scope.kwords=response.data;
                });  
            }else {
                alert('error');
            }
         });
     };
  
   
  });


angular.module('myApp').factory('kwordsFact',function($http){
    var factory={};
    factory.kwords=function(){
        return $http.get('/api/kwords/list');

    };
    factory.delete=function(id){
      return $http.delete('/api/kwords/delete/'+id);  
    };
    
  return factory;
});
angular.module('myApp').controller('playctr',function($scope,homefact,$http,$window,ngProgressFactory, $timeout,$q){


        // Array format 
        $scope.arrformatv=homefact.getFormat('video');
        $scope.arrformatmp3=homefact.getFormat('mp3');
        //check url after click convert button.
        $scope.theButtonMp3=false;
        $scope.theButtonMp4=false;
        $scope.contained_progressbar = ngProgressFactory.createInstance();
        $scope.contained_progressbar.setParent(document.getElementById('demo_contained'));
        $scope.contained_progressbar.setAbsolute();
       // $scope.contained_progressbar.set(40);
       function start(){
        $scope.loading =true;
        $scope.contained_progressbar.setHeight('3px');
        $scope.contained_progressbar.setColor('green');
        $scope.contained_progressbar.start();
       // event.defaultPrevented;
       var id = setInterval(frame, 300);
       function frame() {
        if ($scope.contained_progressbar.status() >= 100 ) {
          clearInterval(id);
        } else {
          $scope.status = $scope.contained_progressbar.status().toFixed(0) + '%';
        }
      }
    }
    function finish() {
      $timeout(callAtTimeout, 10);
      $scope.contained_progressbar.complete();
        // event.defaultPrevented;
        $scope.status = 100 + '%';
      }
      function callAtTimeout() {
        $scope.loading =false;
      }
        $scope.resCancel = function() {
        console.log('Cancel request');
      }
// get video infomation. IMPORTANT USE IN SHORT_VIDEO PARTIALS.
$scope.check_url=function(data) {
  console.log(data);
          // $scope.buttonContainer =true;
          if(data==1){
            // disable button mp3
            $scope.theButtonMp3=true;
          }else{
           $scope.theButtonMp4=true;
         }
         start();
         // $scope.msg=true;
            //hide donwload button, resulet before if any.
            $scope.down=false;
            var youtube = {
              id:myinit.youtube_id,
              url: myinit.url,
              website: myinit.website,
              name: myinit.name,
              format:data
            };
            console.log(youtube);
           // un comment this 
           convert_youtube(youtube);
         };
       // FUNCTION CONVER YOUTUBE
       function convert_youtube(youtube)
       {
        
         homefact.convert(youtube).then(
           function (response) {
            console.log(response.data);
            console.log(response.status);

            finish();
             //$scope.loading = false;
             console.log(response.data.status);
             if(response.data.status===true)
             {
                // console.log(response.data.download);  
                $scope.buttonContainer =false;          
                $scope.down=true;
                $scope.msg=false;
              }
              $scope.result = response.data;
              $scope.message = response.data.data;
              console.log($scope.message);
            },function(rejected){
              console.log('time out');
              $scope.loading = false;
              console.log(rejected);
              finish();
              $scope.msg=true;
              console.log($scope.message);
            }    
        );// end then
       }
     });
angular.module('myApp').controller('searchCtr',function($scope,youtubefact){  


    $scope.ysearch = function(search_text){
        if(search_text==''|| search_text==null)
        {
          angular.element(youtube).tooltip({ placement: 'bottom', trigger:'manual'});
          angular.element(youtube).tooltip('show');
          angular.element(youtube).focus();
        //alert(1);
        
    }else{
     console.log(search_text);

      var key = search_text.trim();
      var rep = key.replace(/ /g,'_');
     angular.element(youtube).tooltip('hide');
       youtubefact.make_url(key).then(function(res){
        console.log(res);
          window.location = '/keyword/'+rep+'.html';
       });
     }
 }

 $scope.$watch("search_text", function (newValue, oldValue) {
  if(newValue!=''|| newValue!=null){
     angular.element(youtube).tooltip('hide');
 }
});

 $scope.myglyphicon = "glyphicon-search";

 $scope.searchbox_hide = function() {
    $scope.logo= !$scope.logo;
    if($scope.logo==true){
    	
    	// dipaly delete search bar.
      $scope.myglyphicon = "glyphicon-remove";

  }else{


   $scope.myglyphicon = "glyphicon-search";
}
}


});
// if you want show -hide the logo just make ng-hide"logo" in the logo div
angular.module('myApp').controller('userctrl',function($scope,userFact,$window,homefact){  
 
    $scope.msg='';
    //****************LOGIN ***********************
         
         
    //*********************************************************
     $scope.login = {
         email: "",
         password:""
         };
         $scope.login_submit=function(login){
             console.log('fire login');
             console.log(login);
             userFact.login(login).then(function(response){
                console.log(response.data);
                if(response.data.success===true)
                {
                     $window.location.reload();
                     $scope.msg='Success...';
                }else{
                    $scope.myMessage=response.data.data;
                }
                
             });
         };
         //
           $scope.youtube={
             url:'',
             format:1
         };
           $scope.arrformat=homefact.getFormat();
             callDownload($scope.youtube.format);
    function callDownload(newValue) {
        homefact.get_download_format($scope.youtube.format).then(function (response) {
            // no need to call user.data, service handles this
            $scope.download = response;
            //console.log($scope.download);      
        });
    }
    //watch scople format
    $scope.$watch("youtube.format", function (newValue, oldValue) {
         callDownload(newValue);
    });
  });
angular.module('myApp').factory('userFact',function($http){
    var factory={};
    factory.login=function(login){
      //console.log(login);  
//      return login;
        return $http.post(base_url+'user/login_validation',login);
    };
    factory.kwords=function(){
        return $http.get(base_url+'kwords/all-kwords');
    };
    
  return factory;
});
angular.module('myApp').directive('clientDl',function($http, youtubefact, ngProgressFactory,$timeout,$interval){
  return {
    restrict: 'E',
    templateUrl:"/template/client_dl.handlebars",
    scope:{
      id:'@id',
      title:'@title'
    },
    link:function($scope){
      $scope.contained_progressbar = ngProgressFactory.createInstance();
      // $scope.contained_progressbar.set(10);
      $scope.contained_progressbar.setParent(document.getElementById('demo_contained1'));
      $scope.contained_progressbar.setAbsolute();
      $scope.start =function() {
        $scope.loading =true;
        $scope.contained_progressbar.setHeight('3px');
        $scope.contained_progressbar.setColor('green');
        $scope.contained_progressbar.start();
       // event.defaultPrevented;
        var id = setInterval(frame, 100);
        function frame() {
          if ($scope.contained_progressbar.status() >= 100 ) {
            clearInterval(id);
          } else {
            $scope.status = $scope.contained_progressbar.status().toFixed(0) + '%';
          }
        }
     }
     $scope.finish = function() {
      $timeout(callAtTimeout, 10);
      $scope.contained_progressbar.complete();
      $scope.status = 100 + '%';
    }
    function callAtTimeout() {
      $scope.loading =false;
    }
    youtubefact.clientDl($scope.id).then(function(res){
      //console.log(res.data);
     if(res.data == 'false'){
       $scope.notwork=true;
     }else if(res.data.data =='Successful'){
       $scope.convert=true;
       $scope.result =res.data;
     }else{
       var arr = res.data;
       var l = arr.length;
       $scope.formats = res.data
       if(l==2){
         $scope.formats = arr[1];
       }else{
        $scope.notwork=true;
       }
     }
   });  
  }
};


});
angular.module('myApp').directive('urlDl',function($http, youtubefact, ngProgressFactory,$timeout,$interval){
  return {
    restrict: 'E',
    templateUrl:"/template/url_dl.handlebars",
    scope:{
      id:'@id',
      url:'@url',
      title:'@title'
    },
    link:function($scope){


      var data ={
        id: $scope.id,
        url:$scope.url
      };
      $scope.contained_progressbar = ngProgressFactory.createInstance();
      // $scope.contained_progressbar.set(10);
      $scope.contained_progressbar.setParent(document.getElementById('demo_contained1'));
      $scope.contained_progressbar.setAbsolute();
      $scope.start =function() {
        $scope.loading =true;
        $scope.contained_progressbar.setHeight('3px');
        $scope.contained_progressbar.setColor('green');
        $scope.contained_progressbar.start();
       // event.defaultPrevented;
        var id = setInterval(frame, 100);
        function frame() {
          if ($scope.contained_progressbar.status() >= 100 ) {
            clearInterval(id);
          } else {
            $scope.status = $scope.contained_progressbar.status().toFixed(0) + '%';
          }
        }
     }
     $scope.finish = function() {
      $timeout(callAtTimeout, 10);
      $scope.contained_progressbar.complete();
      $scope.status = 100 + '%';
    }
    function callAtTimeout() {
      $scope.loading =false;
    }
    youtubefact.urlDl(data).then(function(res){
      //console.log(res.data);
     if(res.data == 'false'){
       $scope.notwork=true;
     }else if(res.data.data =='Successful'){
       $scope.convert=true;
       $scope.result =res.data;
     }else{
       var arr = res.data;
       var l = arr.length;
       $scope.formats = res.data
       if(l==2){
         $scope.formats = arr[1];
       }else{
        $scope.notwork=true;
       }
     }
   });  
  }
};


});
angular.module('myApp').directive('youtubeDuration',function($http){
    return {
        restrict: 'E',
        template:"<p><i class='fa fa-clock-o' aria-hidden='true'></i>{{duration}} <i class='fa fa-calendar' aria-hidden='true'></i>{{date}} <i class='fa fa-eye' aria-hidden='true'></i>{{view | number}}</p> ",
        scope:{
          vid:'@vid',  
          website:'@wsite',  
          du:'@d',  
          pu:'@p',
          v:'@v'  
        },
        link:function($scope){
            console.log($scope.website);
            if($scope.website==='1')
            {
                     $http.get('https://www.googleapis.com/youtube/v3/videos', {
                        params: {
                            key: "AIzaSyAnR-0wQOsEwYF7U4CHQIMBoBzkRpx-0dw",
                            type: 'video',
                            id: $scope.vid,
                            part: 'snippet,contentDetails,statistics'       
                        }}).then(function(response){
                            var d = response.data.items[0].snippet.publishedAt; 
                            var t = response.data.items[0].contentDetails.duration;
                            var t = t.replace('PT',"").replace("H",":").replace('M',":").replace("S","");
                            $scope.duration=t; 
                            var date = new Date(d);
                            var myDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                            $scope.date=myDate; 
                            $scope.view=response.data.items[0].statistics.viewCount;
                        });
            }else if($scope.website==='2') {
                
                //convert second to h:m:s
                var date = new Date(null);
                date.setSeconds($scope.du); // specify value for SECONDS here
                $scope.duration=date.toISOString().substr(11, 8);
                unix_timestamp= parseInt($scope.pu);
                var a = new Date(unix_timestamp * 1000);
                var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                var time = date + ' ' + month + ' ' + year ;
                 $scope.date=$scope.pu;
                 $scope.view =$scope.v;
                
                
                
                
            }else{
                 var date = new Date(null);
                date.setSeconds($scope.du); // specify value for SECONDS here
                $scope.duration=date.toISOString().substr(11, 8);
                unix_timestamp= parseInt($scope.pu);
                var a = new Date(unix_timestamp * 1000);
                var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                var time = date + ' ' + month + ' ' + year ;
                 $scope.date=time;
                 $scope.view =$scope.v;

            }
            
       
            
        }
    };
    
    
});


angular.module('myApp').controller('youtubectr',function($scope,$http,$location,youtubefact,homefact,$window,dailymotionFactory){
//SOUDNCLOUND
 SC.initialize({
  client_id: '3f91b1b7f705f1c92af593fc2d28503c'
});
 // END SOUNDCLOUD.

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

   }else if(newValue==4){
     $scope.getSoundCloudData();
   }else{

    $scope.dailymotion();
  }

}
});

// Soundclound search function
$scope.getSoundCloudData = function(){

  $scope.website=4;
  console.log(keyword+'<=========');
  if(isNaN($scope.nextPage))
  {
   console.log('it is not a number');
   $scope.nextPage=1;
 }

 var page_size = 50;
 SC.get('/tracks', {
   q: keyword, license: '', limit: page_size
 }).then(function(response) {
   $scope.videos=[];
     console.log(response);
    var i;
    var x=response;
    var len=x.length;
    for(i=0;i<len;i++)
    {
      var video={
        title:x[i].title,
        thumbnail:x[i].artwork_url || 'http://a1.sndcdn.com/images/default_avatar_large.png?1515765262',
        id:x[i].id,
        upload:x[i].created_at,
        duration:'0',
        views:'0',
        public:'0'
      };
      $scope.videos[i]=video;
    }
    console.log($scope.videos);
     $scope.$apply();

  });
}

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
        // console.log($scope.videos);
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

   }else if(website===4){
     $scope.getYoutubeData();
   }else{
    $scope.dailymotion();
  }      
//         $scope.getYoutubeData();

console.log('fire next page:'+nextPage);
            //reset all download button.
    };// end next page
    


  });

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
   
  factory.make_url=function(data)
   {
     return $http.get('/search/make_url/'+data);
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
