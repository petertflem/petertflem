require.config({
    
    paths: {
        'angular': 'vendor/angular/angular',
        'ui.router': 'vendor/angular-ui-router/angular-ui-router',
        'showdown': 'vendor/showdown',
        'jquery': 'vendor/jquery/jquery'
    },
    
    shim: {
        'angular': {
            exports: 'angular'
        },
        'ui.router': {
            deps: ['angular']
        }
    },
    
    deps: [
        'bootstrap'
    ]
    
});