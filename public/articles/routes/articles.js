'use strict';

//Setting up route
angular.module('gambo.articles').config(['$stateProvider', 'Auth',
    function($stateProvider, Auth) {

        // states for my app
        $stateProvider
            .state('all articles', {
                url: '/articles',
                templateUrl: 'public/articles/views/list.html',
                resolve: {
                    loggedin: Auth.checkLoggedin
                }
            })
            .state('create article', {
                url: '/articles/create',
                templateUrl: 'public/articles/views/create.html',
                resolve: {
                    loggedin: Auth.checkLoggedin
                }
            })
            .state('edit article', {
                url: '/articles/:articleId/edit',
                templateUrl: 'public/articles/views/edit.html',
                resolve: {
                    loggedin: Auth.checkLoggedin
                }
            })
            .state('article by id', {
                url: '/articles/:articleId',
                templateUrl: 'public/articles/views/view.html',
                resolve: {
                    loggedin: Auth.checkLoggedin
                }
            })
    }
])