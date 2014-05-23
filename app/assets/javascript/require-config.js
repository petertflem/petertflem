require.config({
    
    paths: {
        'angular': 'vendor/angular',
        'ui.router': 'vendor/angular-ui-router'
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