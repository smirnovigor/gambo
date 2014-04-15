'use strict';

angular.module('gambo.posts').factory('Posts', ['$http', 'PostsQueries', 'FQLResource', function($http, PostsQueries, FQLResource){

    return {
        MY : PostsQueries.MY,
        FRIENDS : PostsQueries.FRIENDS,
        POPULAR : PostsQueries.POPULAR,

        getPostsResource : function(query, limit, offset, access_token){
            return FQLResource({query:query, limit:limit, offset:offset, access_token:access_token});
        },

        getPhotoSrc : function(postData){
            if (postData == null) {
                return '';
            }
            return angular.isArray(postData.attachment.media) && postData.attachment.media.length > 0
                    ? postData.attachment.media[0].src.replace(/_s.jpg$/, '_o.jpg') : '';
        },

        getPostCommentsResource : function(post_id, limit, offset, access_token) {
            var query = "SELECT text, post_id, post_id_cursor FROM comment WHERE post_id='"+post_id+"'";
            return FQLResource({query:query, limit:limit, offset:offset, access_token:access_token});
        }
    };
}]);
