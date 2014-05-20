require.config({
    
    paths: {
        'angular': 'bower_components/angular/angular',
        'ui.router': 'bower_components/angular-ui-router/release/angular-ui-router'
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