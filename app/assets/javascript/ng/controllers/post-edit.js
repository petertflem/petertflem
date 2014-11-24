define([
    'app',
    'jquery'
], function (app, $) {
    app.controller('post-edit', ['$http', '$scope', '$stateParams', '$timeout', function ($http, $scope, $stateParams, $timeout) {
        if ($stateParams.id) {
           $http.get('/post/find-one?id=' + $stateParams.id).success(function (post) {
                $scope.post = post;
                watchPost($timeout, $http, $scope);
            });
        } else {
            watchPost($timeout, $http, $scope);
        }
    }]);
    
    function watchPost($timeout, $http, $scope) {
        var timeout
        
        $scope.$watchCollection('[post.title, post.body]', function (newValue, oldValue) {
            if (newValue === oldValue) return;
            timeout && $timeout.cancel(timeout);

            timeout = $timeout(function () {
                $http.post('/post/save', $scope.post)
                    .success(function (result) {
                        $scope.post._id = result.id;
                        
                        $('#save-status-feedback').removeClass('alert-success alert-danger');
                        $('#save-status-feedback').addClass('alert-success').text('Successfully saved!');
                    })
                    .error(function () {
                        $('#save-status-feedback').removeClass('alert-success alert-danger');
                        $('#save-status-feedback').addClass('alert-danger').text('An error occured!');
                    });
            }, 1000);
        }, true);
    }
});