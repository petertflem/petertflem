define(['../app'], function (app) {
    
    app.config(['$locationProvider', '$stateProvider', function ($locationProvider, $stateProvider) {
        $locationProvider.html5Mode(true);
        
        $stateProvider
            .state('blog', {
                url: '/blog',
                templateUrl: '/blog',
                controller: 'blog'
            })
        
            .state('post', {
                url: '/post',
                template: '<ui-view></ui-view>',
                abstract: true
            })
            .state('post.edit', {
                url: '/edit',
                templateUrl: '/post/edit'
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
                templateUrl: '/users/logout',
                controller: 'logout'
            })
        
            // If this state triggers, it is a 404
            .state('otherwise', {
                url: '*path',
                templateUrl: function (stateParams) {
                    return stateParams.path;
                }
            });
    }]);
    
});