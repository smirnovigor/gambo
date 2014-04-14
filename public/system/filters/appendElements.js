'use strict';

//Append array to array
angular.module('gambo.system').filter('appendElements', function() {
    return function (first, second, third) {
        var result = [];

        angular.forEach(arguments, function(arg){
            if (typeof arg !== 'undefined') {
                if (!angular.isArray(arg)) {
                    arg = [arg];
                }

                Array.prototype.push.apply(result, arg);
            }
        });

        return result;
    }
})

// Trucate text
// params: the text, the desired length and the suffix to add (default: ...)
    .filter('truncate', function () {
        return function (text, length, end) {
            if (text == null || text.length == 0) 	return null;
            if (isNaN(length)) 						length = 10;
            if (end === undefined)                 end = "...";

            if (text.length <= length || text.length - end.length <= length)  return text;
            return String(text).substring(0, length-end.length) + end;
        };
    });