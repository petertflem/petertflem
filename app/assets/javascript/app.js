define([
  'angular',  
  'ui.router',
  'ng/filters/truncate',
  'ng/filters/markdown',
  'ng/filters/cut',
  'native/main'
], function (ng) {
  return ng.module('petertflem', ['ui.router', 'truncate', 'markdown']);
});