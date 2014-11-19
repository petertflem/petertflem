define([
    'angular',
    'ui.router',
    'ng/filters/truncate',
    'ng/filters/markdown'
], function (ng) {
    return ng.module('petertflem', ['ui.router', 'truncate', 'markdown']);
});