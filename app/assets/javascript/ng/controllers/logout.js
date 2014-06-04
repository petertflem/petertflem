define([
    'app'
], function (app) {
    app.controller('logout', ['$window', function ($window) {
        $window.location.reload();
    }]);
});