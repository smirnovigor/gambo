'use strict';

angular.module('gambo.posts').controller('PostsController', ['$scope', 'Posts', 'PostsQueries', 'Facebook', function ($scope, Posts, PostsQueries, Facebook) {

    $scope.postsPerPage = 30;

    $scope.myPosts = [];
    $scope.friendPosts = [];
    $scope.popularPosts = [];

    var MyPosts = null;
    var FriendPosts = null;
    var PopularPosts = null;
    var CommentsForPost = null;

    var token = null;

    $scope.init = function () {
        Facebook.getLoginStatus(function(response) {
            console.log('response:', response);

            if(response.status == 'connected')
                $scope.$apply(function() {
                    token = response.authResponse.accessToken;
                    console.log(token);

                    MyPosts = Posts.getPostsResource(Posts.MY, $scope.postsPerPage, 0, token);
                    FriendPosts = Posts.getPostsResource(Posts.FRIENDS, $scope.postsPerPage, 0, token);
                    PopularPosts = Posts.getPostsResource(Posts.POPULAR, $scope.postsPerPage, 0, token);

                    $scope.morePosts();
                });
            else
                $scope.$apply(function() {
                    console.log('not connected');
                });
        });

    };

    $scope.selectPost = function(somePost) {
          $scope.selectedPost = somePost;
        console.log(somePost);
          CommentsForPost  = Posts.getPostCommentsResource(somePost.post_id, 10, 0, token);
          var promise = CommentsForPost.getPortion(10, 0).$promise;
          promise
            .then(function (result) {

                  $scope.selectedPost.comments = result;
                  console.log($scope.selectedPost.comments);
                  //$scope.$apply();
            })
            .catch(function (error) {
                console.error('ERROR',error);
            });
    };
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