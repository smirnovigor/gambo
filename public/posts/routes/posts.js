'use strict';

angular.module('gambo.posts').config(['$stateProvider', 'Auth', function($stateProvider, Auth){

    $stateProvider
        .state('posts', {
            url: '/posts',
            templateUrl: 'public/posts/views/list.html',
            resolve: {
                loggedin: Auth.checkLoggedin
            },
            controller: 'PostsController'
        })
        .state('posts.details', {
            url: '/:postId',
            templateUrl: 'public/posts/views/details.html',
            resolve: {
                loggedin: Auth.checkLoggedin
            },
            controller: 'PostDetailsController'
        })
}]);