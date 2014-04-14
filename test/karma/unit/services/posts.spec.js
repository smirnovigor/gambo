'use strict';

(function(){

    describe('GAMBO services', function(){
        describe('Posts', function(){

            //load module
            beforeEach(module('gambo'))

            // Initialize the service and a mock scope
            var Posts,
                $httpBackend;

            beforeEach(function(){

                inject(function($injector){
                    $httpBackend = $injector.get('$httpBackend');
                    Posts = $injector.get('Posts');
                })
            });

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('should have specific constance', function(){
                expect(Posts.MY).toBeDefined();
                expect(Posts.FRIENDS).toBeDefined();
                expect(Posts.POPULAR).toBeDefined();
            });

            it('should have specific methods', function(){
                expect(Posts.getPosts).toEqual(jasmine.any(Function));
            });

            it('should call GET', function(){

                $httpBackend.expectGET('https://graph.facebook.com/fql').respond({});

                Posts.getPosts(Posts.MY);

                $httpBackend.flush();
            });

            it('should get data on GET', function(){

                $httpBackend.whenGET('https://graph.facebook.com/fql').respond({
                    data : [
                            {title: 'DidYouKnow?', comments_count: 2},
                            {title: 'HowAreYou?', comments_count: 1},
                            {title: 'Bro?', comments_count: 22},
                            {title: 'WasUp?', comments_count: 12}
                    ]});

                var posts = Posts.getPosts(Posts.MY);

                expect(posts).toBeUndefined();

                $httpBackend.flush();

                expect(posts).toBeDefined();
                expect(posts.data).toBeDefined();
                expect(posts.data.length).toEqual(4);
                expect(posts).toEqual({
                    data : [
                        {title: 'DidYouKnow?', comments_count: 2},
                        {title: 'HowAreYou?', comments_count: 1},
                        {title: 'Bro?', comments_count: 22},
                        {title: 'WasUp?', comments_count: 12}
                    ]
                });
            });
        })
    })
}());