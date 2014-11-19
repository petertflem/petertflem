define([
    'app'
], function (app) {
    app.controller('posts', ['$http', '$scope', function ($http, $scope) {
        $http.get('/posts.json').success(function (data) {
            $scope.posts = data;
        });
    }]);
});