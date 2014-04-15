'use strict';

angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, ['gambo']);

});

var app = angular.module('gambo', ['ngCookies', 'facebook', 'ngResource', 'ui.bootstrap', 'ui.router', 'gambo.system', 'gambo.posts', 'gambo.articles', 'gambo.auth']);


app.config(['FacebookProvider', function(FacebookProvider) {
    // Here you could set your appId through the setAppId method and then initialize
    // or use the shortcut in the initialize method directly.
    FacebookProvider.init('641796912562834');
}])