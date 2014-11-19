define([
    'app'
], function (app) {
    app.controller('post', ['$http', '$scope', '$stateParams', function ($http, $scope, $stateParams) {
        $http.get('/post/find-one?id=' + $stateParams.id).success(function (post) {
            $scope.post = post;
        });
    }]);
});