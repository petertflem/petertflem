define(['../app'], function (app) {
    
    app.config(['$locationProvider', '$stateProvider', function ($locationProvider, $stateProvider) {
        $locationProvider.html5Mode(true);
        
        $stateProvider
            .state('blog', {
                url: '/',
                templateUrl: '/'
            })
        
            .state('admin', {
                url: '/admin',
                templateUrl: '/admin'
            })
        
            .state('projects', {
                url: '/projects',
                templateUrl: '/projects'
            })
        
            .state('login', {
                url: '/login',
                templateUrl: '/login'
            })
        /*
            .state('logout', {
                url: '/logout',
                templateUrl: '/logout'
            })*/;
    }]);
    
});