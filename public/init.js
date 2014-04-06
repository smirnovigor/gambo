'use strict';

angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, ['gambo']);

});

angular.module('gambo', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'gambo.system', 'gambo.articles','gambo.auth']);