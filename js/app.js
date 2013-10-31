$('.navbar a').on('click', function () {
    console.log('test');
    $(".navbar-toggle").click();
});

angular.module('myApp', [])
.provider('HackerNews', function () {
    this.$get = function ($q, $http) {
        var baseUri = 'http://api.thriftdb.com/api.hnsearch.com/items/_search?limit=100&filter[queries][]=url:*';
        return {
            getNewest: function () {
                var d = $q.defer();

                $http({
                    method: 'GET',
                    url: baseUri + '&sortby=create_ts%20desc'
                }).success(function (data) {
                    d.resolve(data);
                }).error(function (err) {
                    d.reject(err);
                });
                return d.promise;
            },
            getFrontPage: function () {
                var d = $q.defer();

                $http({
                    method: 'GET',
                    url: baseUri + '&sortby=create_ts%20desc'
                }).success(function (data) {
                    d.resolve(data);
                }).error(function (err) {
                    d.reject(err);
                });
                return d.promise;
            },
            getBest: function () {
                var d = $q.defer();

                $http({
                    method: 'GET',
                    url: baseUri + '&sortby=create_ts%20desc'
                }).success(function (data) {
                    d.resolve(data);
                }).error(function (err) {
                    d.reject(err);
                });
                return d.promise;
            }
        };
    };
})
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'templates/home.html',
          controller: 'MainCtrl'
      })
      .when('/front-page', {
          templateUrl: 'templates/front-page.html',
          controller: 'FrontPageCtrl'
      })
      .when('/best', {
          templateUrl: 'templates/best.html',
          controller: 'BestCtrl'
      })
      .when('/about', {
          templateUrl: 'templates/about.html'
      })
      .otherwise({ redirectTo: '/' });
}])
.controller('MainCtrl',
  function ($scope, $timeout, HackerNews) {
      function getData() {
          HackerNews.getNewest().then(populateItems);
      }
      getData();

      function populateItems(data) {
          $scope.articleList = data.results;
      }

      $scope.refresh = function () {
          getData();
      };
  })
.controller('FrontPageCtrl',
  function ($scope, $timeout, HackerNews) {
      function getData() {
          HackerNews.getFrontPage().then(populateItems);
      }
      getData();

      function populateItems(data) {
          $scope.articleList = data.results;
      }

      $scope.refresh = function () {
          getData();
      };
  })
.controller('BestCtrl',
  function ($scope, $timeout, HackerNews) {
      function getData() {
          HackerNews.getBest().then(populateItems);
      }
      getData();

      function populateItems(data) {
          $scope.articleList = data.results;
      }

      $scope.refresh = function () {
          getData();
      };
  })