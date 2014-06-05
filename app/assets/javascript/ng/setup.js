define(['../app'], function (app) {
    app.config(['$httpProvider', '$provide', function ($httpProvider, $provide) {
        
        // Set 
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        
        $httpProvider.interceptors.push(['$q', '$injector', function ($q, $injector) {
            return {
                
                // Success: just return the response
                response: function (response) {
                    return response || $q.when(response);
                },
                
                // Error: check for the 401 error status
                responseError: function (rejection) {
                    if (rejection.status === 401)
                        $injector.get('$state').transitionTo('users.login');
                    
                    if (rejection.status === 404)
                        return rejection || $q.when(rejection);
                        
                    return $q.reject(rejection);
                }
            }
        }]);
    }]);
});