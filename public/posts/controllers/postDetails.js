'use strict';

angular.module('gambo.posts').controller('PostDetailsController', ['$scope', 'Posts', '$stateParams', function ($scope, Posts, $stateParams) {
    $scope.postDetails = [];
    Posts.populate(Posts.getPostsResource(Posts.DETAILS).get({'id':$stateParams.postId}), $scope.postDetails);
}]);