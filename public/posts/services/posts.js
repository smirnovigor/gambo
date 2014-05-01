'use strict';

angular.module('gambo.posts').factory('Posts', ['$http', 'PostsQueries', 'FQLResource', function($http, PostsQueries, FQLResource){

    return {

        MY : PostsQueries.MY,
        FRIENDS : PostsQueries.FRIENDS,
        POPULAR : PostsQueries.POPULAR,
        DETAILS : PostsQueries.DETAILS,

        getPostsResource : function(query, limit, offset){
            return FQLResource({query:query, limit:limit, offset:offset, access_token:PostsQueries.ACCESS_TOKEN});
        },

        getPhotoSrc : function(postData){
            if (postData == null) {
                return '';
            }
            return angular.isArray(postData.attachment.media) && postData.attachment.media.length > 0
                    ? postData.attachment.media[0].src.replace(/_s.jpg$/, '_o.jpg') : '';
        },

        getPostDetails : function(post_id, limit, offset) {
            var query = "SELECT text, post_id, post_id_cursor FROM comment WHERE post_id='"+post_id+"'";
            "SELECT attachment,fromid,likes, text, text_tags, parent_id_cursor, comment_count FROM comment WHERE post_id = '168747891415_10152373025031416' ORDER BY (likes + comment_count) desc"
            return FQLResource({query:query, limit:limit, offset:offset, access_token:PostsQueries.ACCESS_TOKEN});
        },

        populate : function(promise, array){
            promise
                .then(function (result) {
                    array.push.apply(array, result.data);
                })
                .catch(function (error) {
                    console.error('ERROR',error, error.stack);
                });
        }
    };
}]);
