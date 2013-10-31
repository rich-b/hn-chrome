angular.module('myApp', [])
.provider('HackerNews', function () {
    this.$get = function ($q, $http) {
        return {
            getNewest: function (city) {
                var d = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://api.thriftdb.com/api.hnsearch.com/items/_search?sortby=create_ts%20desc&limit=100&filter[queries][]=url:*',
                    cache: true
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
.factory('UserService', function () {
    var defaults = {
        location: 'autoip'
    };

    var service = {
        user: {},
        save: function () {
            sessionStorage.presently =
              angular.toJson(service.user);
        },
        restore: function () {
            service.user =
              angular.fromJson(sessionStorage.presently) || defaults

            return service.user;
        }
    };
    service.restore();
    return service;
})
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'templates/home.html',
          controller: 'MainCtrl'
      })
      .when('/settings', {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl'
      })
      .otherwise({ redirectTo: '/' });
}])
.controller('MainCtrl',
  function ($scope, $timeout, HackerNews, UserService) {
      $scope.date = {};

      var updateTime = function () {
          $scope.date.tz = new Date(new Date()
              .toLocaleString("en-US", { timeZone: $scope.user.timezone }));
          $timeout(updateTime, 1000);
      };

      $scope.user = UserService.user;
      HackerNews.getNewest()
      .then(function (data) {
          $scope.articleList = data.results;
      });
      updateTime();
  })
