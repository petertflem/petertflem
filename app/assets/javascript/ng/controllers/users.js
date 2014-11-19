define([
    'app'
], function (app) {
    app.controller('users', ['$http', '$scope', function ($http, $scope) {
        $http.get('/users.json').success(function (data) {
            $scope.users = data;
        });
    }]);
});