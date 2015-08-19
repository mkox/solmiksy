/**
 * @license AngularJS v1.4.3
 * (c) 2010-2015 Google, Inc. http://angularjs.org
 * License: MIT
 */

(function(e,t,n){function s(){function e(e,n){return t.extend(Object.create(e),n)}function r(e,t){var n=t.caseInsensitiveMatch,r={originalPath:e,regexp:e},i=r.keys=[];return e=e.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(e,t,n,r){var s=r==="?"?r:null,o=r==="*"?r:null;return i.push({name:n,optional:!!s}),t=t||"",""+(s?"":t)+"(?:"+(s?t:"")+(o&&"(.+?)"||"([^/]+)")+(s||"")+")"+(s||"")}).replace(/([\/$\*])/g,"\\$1"),r.regexp=new RegExp("^"+e+"$",n?"i":""),r}var n={};this.when=function(e,i){var s=t.copy(i);t.isUndefined(s.reloadOnSearch)&&(s.reloadOnSearch=!0),t.isUndefined(s.caseInsensitiveMatch)&&(s.caseInsensitiveMatch=this.caseInsensitiveMatch),n[e]=t.extend(s,e&&r(e,s));if(e){var o=e[e.length-1]=="/"?e.substr(0,e.length-1):e+"/";n[o]=t.extend({redirectTo:e},r(o,s))}return this},this.caseInsensitiveMatch=!1,this.otherwise=function(e){return typeof e=="string"&&(e={redirectTo:e}),this.when(null,e),this},this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(r,s,o,u,a,f,l){function v(e,t){var n=t.keys,r={};if(!t.regexp)return null;var i=t.regexp.exec(e);if(!i)return null;for(var s=1,o=i.length;s<o;++s){var u=n[s-1],a=i[s];u&&a&&(r[u.name]=a)}return r}function m(e){var n=d.current;h=y(),p=h&&n&&h.$$route===n.$$route&&t.equals(h.pathParams,n.pathParams)&&!h.reloadOnSearch&&!c,!p&&(n||h)&&r.$broadcast("$routeChangeStart",h,n).defaultPrevented&&e&&e.preventDefault()}function g(){var e=d.current,n=h;if(p)e.params=n.params,t.copy(e.params,o),r.$broadcast("$routeUpdate",e);else if(n||e)c=!1,d.current=n,n&&n.redirectTo&&(t.isString(n.redirectTo)?s.path(b(n.redirectTo,n.params)).search(n.params).replace():s.url(n.redirectTo(n.pathParams,s.path(),s.search())).replace()),u.when(n).then(function(){if(n){var e=t.extend({},n.resolve),r,i;return t.forEach(e,function(n,r){e[r]=t.isString(n)?a.get(n):a.invoke(n,null,null,r)}),t.isDefined(r=n.template)?t.isFunction(r)&&(r=r(n.params)):t.isDefined(i=n.templateUrl)&&(t.isFunction(i)&&(i=i(n.params)),t.isDefined(i)&&(n.loadedTemplateUrl=l.valueOf(i),r=f(i))),t.isDefined(r)&&(e.$template=r),u.all(e)}}).then(function(i){n==d.current&&(n&&(n.locals=i,t.copy(n.params,o)),r.$broadcast("$routeChangeSuccess",n,e))},function(t){n==d.current&&r.$broadcast("$routeChangeError",n,e,t)})}function y(){var r,i;return t.forEach(n,function(n,o){!i&&(r=v(s.path(),n))&&(i=e(n,{params:t.extend({},s.search(),r),pathParams:r}),i.$$route=n)}),i||n[null]&&e(n[null],{params:{},pathParams:{}})}function b(e,n){var r=[];return t.forEach((e||"").split(":"),function(e,t){if(t===0)r.push(e);else{var i=e.match(/(\w+)(?:[?*])?(.*)/),s=i[1];r.push(n[s]),r.push(i[2]||""),delete n[s]}}),r.join("")}var c=!1,h,p,d={routes:n,reload:function(){c=!0,r.$evalAsync(function(){m(),g()})},updateParams:function(e){if(!this.current||!this.current.$$route)throw i("norout","Tried updating route when with no current route");e=t.extend({},this.current.params,e),s.path(b(this.current.$$route.originalPath,e)),s.search(e)}};return r.$on("$locationChangeStart",m),r.$on("$locationChangeSuccess",g),d}]}function o(){this.$get=function(){return{}}}function u(e,n,r){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(i,s,o,u,a){function d(){c&&(r.cancel(c),c=null),f&&(f.$destroy(),f=null),l&&(c=r.leave(l),c.then(function(){c=null}),l=null)}function v(){var o=e.current&&e.current.locals,u=o&&o.$template;if(t.isDefined(u)){var c=i.$new(),v=e.current,m=a(c,function(e){r.enter(e,null,l||s).then(function(){t.isDefined(h)&&(!h||i.$eval(h))&&n()}),d()});l=m,f=v.scope=c,f.$emit("$viewContentLoaded"),f.$eval(p)}else d()}var f,l,c,h=o.autoscroll,p=o.onload||"";i.$on("$routeChangeSuccess",v),v()}}}function a(e,t,n){return{restrict:"ECA",priority:-400,link:function(r,i){var s=n.current,o=s.locals;i.html(o.$template);var u=e(i.contents());if(s.controller){o.$scope=r;var a=t(s.controller,o);s.controllerAs&&(r[s.controllerAs]=a),i.data("$ngControllerController",a),i.children().data("$ngControllerController",a)}u(r)}}}var r=t.module("ngRoute",["ng"]).provider("$route",s),i=t.$$minErr("ngRoute");r.provider("$routeParams",o),r.directive("ngView",u),r.directive("ngView",a),u.$inject=["$route","$anchorScroll","$animate"],a.$inject=["$compile","$controller","$route"]})(window,window.angular);