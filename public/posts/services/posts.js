'use strict';

angular.module('gambo.posts').factory('Posts', ['$http', 'PostsQueries', 'FQLResource', function($http, PostsQueries, FQLResource){

    return {
        MY : PostsQueries.MY,
        FRIENDS : PostsQueries.FRIENDS,
        POPULAR : PostsQueries.POPULAR,

        getPostsResource : function(query, limit, offset){
            return FQLResource({query:query, limit:limit, offset:offset, access_token:PostsQueries.ACCESS_TOKEN});
        },

        getPhotoSrc : function(postData){
            return angular.isArray(postData.attachment.media) && postData.attachment.media.length > 0
                    ? postData.attachment.media[0].src.replace(/_s.jpg$/, '_o.jpg') : '';
        }
    };
}]);
