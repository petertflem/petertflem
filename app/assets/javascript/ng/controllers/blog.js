define([
    'app'
], function (app) {
    app.controller('blog', ['$http', '$scope', function ($http, $scope) {
        $http.get('/posts.json').success(function (data) {
            $scope.posts = data;
        });
    }]);
});