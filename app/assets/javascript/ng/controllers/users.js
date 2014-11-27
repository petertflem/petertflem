define([
  'app'
], function (app) {
  app.controller('users', ['$http', '$scope', function ($http, $scope) {
    $http.get('/users.json').success(function (data) {
      $scope.users = data;
    });
    
    $scope.deleteUser = function (userId, index) {
      $http.post('/user/delete', { userId: userId })
        .success(function (reply) {
          $scope.users.splice(index, 1);
        })
        .error(function (reply) {
          console.log(reply);
        });
    };
  }]);
});