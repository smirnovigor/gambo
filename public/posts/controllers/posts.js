'use strict';

angular.module('gambo.posts').controller('PostsController', ['$scope', 'Posts', function ($scope, Posts) {

    $scope.postsPerPage = 30;

    $scope.myPosts = [];
    $scope.friendPosts = [];
    $scope.popularPosts = [];

    var MyPosts = Posts.getPostsResource(Posts.MY, $scope.postsPerPage);
    var FriendPosts = Posts.getPostsResource(Posts.FRIENDS, $scope.postsPerPage);
    var PopularPosts = Posts.getPostsResource(Posts.POPULAR, $scope.postsPerPage);

    $scope.morePosts = function () {
        $scope.incrementMyPosts();
        $scope.incrementFriendPosts();
     //   $scope.incrementPopularPosts();
    };

    $scope.incrementMyPosts = function(limit){
        //populate(MyPosts.getPortion(limit, $scope.myPosts.length).$promise, $scope.myPosts);
        $scope.myPosts = MyPosts.getPortion(limit, $scope.myPosts.length);
    };

    $scope.incrementFriendPosts = function(limit){
//        populate(FriendPosts.getPortion(limit, $scope.friendPosts.length).$promise, $scope.friendPosts);
          $scope.friendPosts = FriendPosts.getPortion(limit, $scope.friendPosts.length);
    };

    $scope.incrementPopularPosts = function(limit){
        populate(PopularPosts.getPortion(limit, $scope.popularPosts.length).$promise, $scope.popularPosts);
    };

    $scope.getPhotoSrc = Posts.getPhotoSrc;

    function populate(promise, array){
        promise
            .then(function (result) {
                array.push.apply(array, result.data);
            })
            .catch(function (error) {
                console.error('ERROR',error);
            });
    }
}]);