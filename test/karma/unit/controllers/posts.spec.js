'use strict';

(function(){

    describe('GAMBO controllers', function(){
        describe('PostsController', function(){
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            //load module
            beforeEach(module('gambo'))

            // Initialize the controller and a mock scope
            var PostsController,
                scope,
                $httpBackend,
                access_token,
                respondObject = {
                    data : [
                        {
                            title: 'DidYouKnow?',
                            message: "Wild turkeys, with their distinctive feathers and gobbling call, were Benjamin Franklin's choice for the national bird of the United States.",
                            link: null,
                            image: 'https://fbcdn-photos-e-a.akamaihd.net/hphotos-ak-prn2/t1.0-0/1622106_10152324873326416_8738529665713847812_o.jpg',
                            likes_count: 209,
                            comments_count: 12
                            }
                        ]
                };

            beforeEach(inject(function($controller, $rootScope, _$httpBackend_, PostsQueries){
                scope = $rootScope.$new();

                $httpBackend = _$httpBackend_;

                PostsController = $controller('PostsController', {
                    $scope: scope
                });

                access_token = '&access_token=' + PostsQueries.ACCESS_TOKEN;
            }));

            it('on getMore(), should bring more post', function(){

                expect(scope.morePosts).toEqual(jasmine.any(Function));
            });

            it('after incrementMyPosts() myPosts should have at list one post fetched from FB', function(){

                $httpBackend.whenGET('https://graph.facebook.com/fql?q=SELECT%20type,attachment,permalink,post_id,message,message_tags,like_info.like_count,comment_info.comment_count,share_count,claim_count,(like_info.like_count%20*%20comment_info.comment_count%20*%20share_count)%20FROM%20stream%20WHERE%20filter_key%20=%20%22owner%22%20and%20type%20in%20(128,247,308)%20ORDER%20BY%20(like_info.like_count%20*%20comment_info.comment_count%20*%20share_count)%20DESC%20%20' +
                    'LIMIT%20' + scope.postsPerPage + '%20OFFSET%200' + access_token)
                    .respond(respondObject);

                expect(scope.myPosts).toEqual([]);

                scope.incrementMyPosts();
                $httpBackend.flush();

                expect(scope.myPosts).toEqualData(respondObject);
            });

            it('after incrementFriendPosts() myPosts should have at list one post fetched from FB', function(){

                $httpBackend.whenGET('https://graph.facebook.com/fql?q=SELECT%20type,attachment,permalink,post_id,message,message_tags,like_info.like_count,comment_info.comment_count,share_count,claim_count,(like_info.like_count%20*%20comment_info.comment_count%20*%20share_count)%20FROM%20stream%20WHERE%20source_id%20in%20(SELECT%20gid%20FROM%20group_member%20WHERE%20uid%20in%20(SELECT%20uid1%20from%20friend%20where%20uid2%20=%20me()))%20and%20type%20in%20(128,247,308)%20ORDER%20BY%20(like_info.like_count%20*%20comment_info.comment_count%20*%20share_count)%20DESC%20%20' +
                    'LIMIT%20' + scope.postsPerPage + '%20OFFSET%200' + access_token)
                    .respond(respondObject);

                expect(scope.friendPosts).toEqual([]);

                scope.incrementFriendPosts();
                $httpBackend.flush();

                expect(scope.friendPosts).toEqualData(respondObject);
            });

            it('after incrementPopularPosts() myPosts should have at list one post fetched from FB', function(){

                $httpBackend.whenGET('https://graph.facebook.com/fql?q=%20LIMIT%20' + scope.postsPerPage + '%20OFFSET%200' + access_token)
                    .respond(respondObject);

                expect(scope.popularPosts).toEqual([]);

                scope.incrementPopularPosts();
                $httpBackend.flush();

                expect(scope.popularPosts).toEqualData(respondObject);
            });
        })
    })
}());