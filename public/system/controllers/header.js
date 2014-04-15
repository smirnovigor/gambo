'use strict';

angular.module('gambo.system').controller('HeaderController', ['$scope', '$rootScope', 'Global', 'Menus',
    function($scope, $rootScope, Global, Menus) {
        $scope.global = Global;
        $scope.menus = {};

        // Default hard coded menu items for main menu
        var defaultMainMenu = [{
            'roles': ['authenticated'],
            'title': 'Posts',
            'link': 'posts'
        }, {
            'roles': ['authenticated'],
            'title': 'Pages',
            'link': 'pages'
        }, {
            'roles': ['authenticated'],
            'title': 'Sites',
            'link': 'sites'
        }];

        //$scope.menus['main'] = defaultMenu;
        // Query menus added by modules. Only returns menus that user is allowed to see.
        function queryMenu(name, defaultMenu) {

            Menus.query({
                name: name,
                defaultMenu: defaultMenu
            }, function(menu) {
                console.log(menu)
                $scope.menus[name] = menu;

                if (Global.authenticated) {
                    $scope.menus['main'] = defaultMenu;
                } else {
                    $scope.menus['main'] = [];
                }
            });
        };

        // Query server for menus and check permissions
        queryMenu('main', defaultMainMenu);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function() {
            console.log('loggedin');
            //queryMenu('main', defaultMainMenu);
            $scope.menus['main'] = defaultMenu;
            $scope.global = {
                authenticated: !! $rootScope.user,
                user: $rootScope.user
            };
        });

    }
]);