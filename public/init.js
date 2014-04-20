'use strict';

angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, ['gambo']);

});

var app = angular.module('gambo', ['ngCookies', 'wu.masonry', 'ngResource', 'ui.bootstrap', 'ui.router', 'gambo.system', 'gambo.posts', 'gambo.articles', 'gambo.auth']);
