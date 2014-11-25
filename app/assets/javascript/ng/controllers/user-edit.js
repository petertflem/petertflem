define([
    'app'
], function (app) {
    app.controller('user-edit', ['$http', '$stateParams', '$scope', function ($http, $stateParams, $scope) {
        if ($stateParams.id) {
            $http.get('/user/find-one?id=' + $stateParams.id).success(function (user) {
                $scope.user = user;
            });
        }
    }]);
});