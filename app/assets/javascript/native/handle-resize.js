/*
 * Takes case of resizeing the margin-bottom for the sticky footer
 * Based on http://blog.mojotech.com/responsive-dynamic-height-sticky-footers/
 */
define([
  'jquery'
], function ($) {
  var timeoutRef;
  
  bumpIt();

  $(window).resize(function() {
    clearTimeout(timeoutRef);
    timeoutRef = setTimeout(bumpIt, 250);
  });
  
  function bumpIt() {
    $('body').css('margin-bottom', $('.footer-wrapper').height());
  }
});