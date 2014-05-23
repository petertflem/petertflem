define(['../app'], function (app) {
    app.config(['$httpProvider', '$provide', function ($httpProvider, $provide) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        
        $provide.factory('authorizationService', ['$q', '$injector', function ($q, $injector) {
            return {
                
                // Success: just return the response
                response: function (response) {
                    return response || $q.when(response);
                },
                
                // Error: check for the 401 error status
                responseError: function (rejection) {
                    if (rejection.status === 401)
                        $injector.get('$state').transitionTo('users.login');
                    
                    return $q.reject(rejection);
                }
            }
        }]);
        $httpProvider.interceptors.push('authorizationService');
    }]);
});