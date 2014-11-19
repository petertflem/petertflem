define([
    '../app'
], function (app) {
    
    app.config(['$locationProvider', '$stateProvider', function ($locationProvider, $stateProvider) {
        $locationProvider.html5Mode(true);
        
        $stateProvider
            .state('blog', {
                url: '/blog',
                templateUrl: '/blog',
                controller: 'blog'
            })
        
            .state('view-post', {
                url: '/blog/:title',
                templateUrl: '/post',
                controller: function ($stateParams) {
                    console.log($stateParams);
                }
            })
        
            .state('post', {
                url: '/post',
                template: '<ui-view></ui-view>',
                abstract: true
            })
            .state('post.new', {
                url: '/edit',
                templateUrl: '/post/edit',
                controller: 'post-edit'
            })
            .state('post.edit', {
                url: '/edit/:id',
                templateUrl: '/post/edit',
                controller: 'post-edit'
            })
        
            .state('admin', {
                url: '/admin',
                templateUrl: '/admin'
            })
        
            .state('posts', {
                url: '/admin/posts',
                templateUrl: '/admin/posts',
                controller: 'posts'
            })
            .state('posts.id', {
                url: '/:id',
                templateUrl: '/post',
                controller: 'post'
            })
        
            .state('projects', {
                url: '/projects',
                templateUrl: '/projects'
            })
        
            .state('users', {
                url: '/users',
                templateUrl: '/users',
                controller: 'users'
            })
        
            .state('user-new', {
                url: '/user/edit',
                templateUrl: '/user/edit'
            })
            .state('user-edit', {
                url: '/user/edit/:id',
                templateUrl: '/user/edit',
                controller: 'user-edit'
            })
            .state('user-login', {
                url: '/user/login',
                templateUrl: '/user/login'
            })
            .state('user-logout', {
                url: '/user/logout',
                templateUrl: '/user/logout',
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