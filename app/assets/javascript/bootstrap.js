define([
    'angular',
    
    /* This are modules we need initialized */
    'ng/setup',
    'ng/states',
    'ng/controllers/blog',
    'ng/controllers/logout',
    'ng/controllers/posts',
    'ng/controllers/post',
    'ng/controllers/post-edit',
    'ng/controllers/users',
    'ng/controllers/user-edit'
], function (ng) {
    ng.bootstrap(document, ['petertflem']);
});