/**
 * syncHeight - jQuery plugin to automagically Sync the heights of columns
 * Made to seemlessly work with the CCS-Framework YAML (yaml.de)
 * @requires jQuery v1.0.3 or newer
 *
 * http://blog.ginader.de/dev/syncheight/
 *
 * Copyright (c) 2007-2013
 * Dirk Ginader (ginader.de)
 * Dirk Jesse (yaml.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 1.5
 *
 * Changelog
 * * v1.5 fixes issue with box-sizing: border-box
 * * v1.4: new Method unSyncHeight() that removes previously added syncs i.e. for responsive layouts
 * * v1.3: compatibility fix for jQuery 1.9.x (removed $.browser)
 *
 * Usage sync:
  $(window).load(function(){
    $('p').syncHeight();
  });
 * Usage unsync:
  $(window).resize(function(){
    if($(window).width() < 500){
      $('p').unSyncHeight();
    }
  });
 */

(function(e){var t=function(){var e=0,t=[["min-height","0px"],["height","1%"]],n=/(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||[],r=n[1]||"",i=n[2]||"0";return r==="msie"&&i<7&&(e=1),{name:t[e][0],autoheightVal:t[e][1]}};e.getSyncedHeight=function(n){var r=0,i=t();return e(n).each(function(){e(this).css(i.name,i.autoheightVal);var t=parseInt(e(this).css("height"),10);t>r&&(r=t)}),r},e.fn.syncHeight=function(n){var r={updateOnResize:!1,height:!1},i=e.extend(r,n),s=this,o=0,u=t().name;return typeof i.height=="number"?o=i.height:o=e.getSyncedHeight(this),e(this).each(function(){e(this).css(u,o+"px")}),i.updateOnResize===!0&&e(window).resize(function(){e(s).syncHeight()}),this},e.fn.unSyncHeight=function(){var n=t().name;e(this).each(function(){e(this).css(n,"")})}})(jQuery);