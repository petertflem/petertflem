define([
    'angular',
    
    /* This are modules we need initialized */
    'app', 
    'ng/setup',
    'ng/states',
    'ng/controllers/blog',
    'ng/controllers/logout'
], function (ng) {
    ng.bootstrap(document, ['petertflem']);
});