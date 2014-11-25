define([
  'app'
], function (app) {
  app.controller('home', ['$http', '$scope', function ($http, $scope) {
    $http.get('/posts.json?limit=3').success(function (data) {
      $scope.posts = data;
    });
  }]);
});