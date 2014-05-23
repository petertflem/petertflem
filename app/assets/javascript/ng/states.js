define(['../app'], function (app) {
    
    app.config(['$locationProvider', '$stateProvider', function ($locationProvider, $stateProvider) {
        $locationProvider.html5Mode(true);
        
        $stateProvider
            .state('blog', {
                url: '/blog',
                templateUrl: '/blog'
            })
        
            .state('post', {
                url: '/blog/post',
                template: '<ui-view></ui-view>',
                abstract: true
            })
            .state('post.edit', {
                url: '/edit',
                templateUrl: '/blog/post/edit'
            })
        
            .state('admin', {
                url: '/admin',
                templateUrl: '/admin'
            })
        
            .state('projects', {
                url: '/projects',
                templateUrl: '/projects'
            })
        
            .state('users', {
                url: '/users',
                template: '<ui-view></ui-view>',
                abstract: true
            })
            .state('users.login', {
                url: '/login',
                templateUrl: '/users/login'
            })
            .state('users.logout', {
                url: '/logout',
                templateUrl: '/users/logout'
            });
    }]);
    
});