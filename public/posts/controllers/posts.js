'use strict';

angular.module('gambo.posts').controller('PostsController', ['$scope', 'Posts', function ($scope, Posts) {

    $scope.postsPerPage = 30;

    $scope.myPosts = [];
    $scope.friendPosts = [];
    $scope.popularPosts = [];

    var MyPosts = Posts.getPostsResource(Posts.MY, $scope.postsPerPage, 0);
    var FriendPosts = Posts.getPostsResource(Posts.FRIENDS, $scope.postsPerPage, 0);
    var PopularPosts = Posts.getPostsResource(Posts.POPULAR, $scope.postsPerPage, 0);

    $scope.morePosts = function () {

        $scope.incrementMyPosts();
        $scope.incrementFriendPosts();
     //   $scope.incrementPopularPosts();
    };

    $scope.incrementMyPosts = function(limit){
        Posts.populate(MyPosts.getPortion(limit, $scope.myPosts.length).$promise, $scope.myPosts);
    };

    $scope.incrementFriendPosts = function(limit){
        Posts.populate(FriendPosts.getPortion(limit, $scope.friendPosts.length).$promise, $scope.friendPosts);
    };

    $scope.incrementPopularPosts = function(limit){
        Posts.populate(PopularPosts.getPortion(limit, $scope.popularPosts.length).$promise, $scope.popularPosts);
    };

    $scope.getPhotoSrc = Posts.getPhotoSrc;

    $scope.morePosts();
}]);