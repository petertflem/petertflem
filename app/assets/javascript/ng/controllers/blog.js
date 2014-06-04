define([
    'app'
], function (app) {
    app.controller('blog', ['$http', '$scope', function ($http, $scope) {
        $http.get('/posts').success(function (data) {
            $scope.posts = data;
        });
    }]);
});