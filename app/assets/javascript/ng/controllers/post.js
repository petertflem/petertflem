define([
    'app'
], function (app) {
    app.controller('post', ['$http', '$scope', '$stateParams', function ($http, $scope, $stateParams) {
        $http.get('/post/find-one?slug=' + $stateParams.slug).success(function (post) {
            $scope.post = post;
        });
    }]);
});