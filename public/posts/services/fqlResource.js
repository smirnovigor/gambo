'use strict';

//resource to run fql queries
angular.module('gambo.posts').factory('FQLResource', ['$resource', function($resource){

    return function(config){

        var paramsUtils = {
            limit : function(limit, otherwise){
                return !isNaN(limit) ? ' LIMIT ' + limit : (otherwise ? ' LIMIT ' + otherwise : '');
            },
            offset : function(offset, otherwise){
                return !isNaN(offset) ? ' OFFSET ' + offset : (otherwise ? ' OFFSET ' + otherwise : '');
            }
        };

        var resource = $resource(
            'https://graph.facebook.com/fql?q=:query:limit:offset',
            {
                query : config.query,
                limit : paramsUtils.limit(config.limit),
                offset : paramsUtils.offset(config.offset),
                access_token : config.access_token
            }
        );

        resource.getPortion = function(limit, offset){
            return resource.get({
                query: config.query,
                limit: paramsUtils.limit(limit, config.limit),
                offset: paramsUtils.offset(offset, config.offset),
                access_token: config.access_token
            })
        };

        return resource;
    }
}]);