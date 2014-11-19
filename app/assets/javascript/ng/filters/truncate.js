define([
    'angular'
], function (ng) {
    ng.module('truncate', []).filter('truncate', function () {
        return function (text, length, end) {
            
            length = length || 10;
            end = end || '...';
            
            if (text == null || text.length == 0)
                return null;
            
            if (text.length <= length || text.length - end.length <= length) {
                return text;
            } else {
                return String(text).substring(0, length - end.length) + end;
            }
            
        };
    });
});