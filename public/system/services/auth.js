'use strict';

angular.module('gambo.system').constant('Auth', {

//================================================
// Check if the user is connected
//================================================
            checkLoggedin : function ($q, $timeout, $http, $location) {
                // Initialize a new promise
                var deferred = $q.defer();

                // Make an AJAX call to check if the user is logged in
                $http.get('/loggedin').success(function (user) {
                    // Authenticated
                    if (user !== '0')
                        $timeout(deferred.resolve, 0);

                    // Not Authenticated
                    else {
                        $timeout(function () {
                            deferred.reject();
                        }, 0);
                        $location.url('/login');
                    }
                });

                return deferred.promise;
            },

//================================================
// Check if the user is not conntect
//================================================
            checkLoggedOut : function ($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function (user) {
                // Authenticated
                if (user !== '0') {
                    $timeout(function () {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');

                }

                // Not Authenticated
                else {
                    $timeout(deferred.resolve, 0);

                }
            });

            return deferred.promise;
        }
//================================================
    }
);