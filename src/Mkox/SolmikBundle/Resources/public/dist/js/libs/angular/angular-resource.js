/**
 * @license AngularJS v1.4.3
 * (c) 2010-2015 Google, Inc. http://angularjs.org
 * License: MIT
 */

(function(e,t,n){function s(e){return e!=null&&e!==""&&e!=="hasOwnProperty"&&i.test("."+e)}function o(e,t){if(!s(t))throw r("badmember",'Dotted member path "@{0}" is invalid.',t);var i=t.split(".");for(var o=0,u=i.length;o<u&&e!==n;o++){var a=i[o];e=e!==null?e[a]:n}return e}function u(e,n){n=n||{},t.forEach(n,function(e,t){delete n[t]});for(var r in e)e.hasOwnProperty(r)&&(r.charAt(0)!=="$"||r.charAt(1)!=="$")&&(n[r]=e[r]);return n}var r=t.$$minErr("$resource"),i=/^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;t.module("ngResource",["ng"]).provider("$resource",function(){var e=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}},this.$get=["$http","$q",function(i,s){function p(e){return d(e,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function d(e,t){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,t?"%20":"+")}function v(t,n){this.template=t,this.defaults=l({},e.defaults,n),this.urlParams={}}function m(p,d,g,y){function w(e,t){var n={};return t=l({},d,t),f(t,function(t,r){h(t)&&(t=t()),n[r]=t&&t.charAt&&t.charAt(0)=="@"?o(e,t.substr(1)):t}),n}function E(e){return e.resource}function S(e){u(e||{},this)}var b=new v(p,y);return g=l({},e.defaults.actions,g),S.prototype.toJSON=function(){var e=l({},this);return delete e.$promise,delete e.$resolved,e},f(g,function(e,o){var p=/^(POST|PUT|PATCH)$/i.test(e.method);S[o]=function(d,v,m,g){var y={},x,T,N;switch(arguments.length){case 4:N=g,T=m;case 3:case 2:if(!h(v)){y=d,x=v,T=m;break}if(h(d)){T=d,N=v;break}T=v,N=m;case 1:h(d)?T=d:p?x=d:y=d;break;case 0:break;default:throw r("badargs","Expected up to 4 arguments [params, data, success, error], got {0} arguments",arguments.length)}var C=this instanceof S,k=C?x:e.isArray?[]:new S(x),L={},A=e.interceptor&&e.interceptor.response||E,O=e.interceptor&&e.interceptor.responseError||n;f(e,function(e,t){t!="params"&&t!="isArray"&&t!="interceptor"&&(L[t]=c(e))}),p&&(L.data=x),b.setUrlParams(L,l({},w(x,e.params||{}),y),e.url);var M=i(L).then(function(n){var i=n.data,s=k.$promise;if(i){if(t.isArray(i)!==!!e.isArray)throw r("badcfg","Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2} (Request: {3} {4})",o,e.isArray?"array":"object",t.isArray(i)?"array":"object",L.method,L.url);e.isArray?(k.length=0,f(i,function(e){typeof e=="object"?k.push(new S(e)):k.push(e)})):(u(i,k),k.$promise=s)}return k.$resolved=!0,n.resource=k,n},function(e){return k.$resolved=!0,(N||a)(e),s.reject(e)});return M=M.then(function(e){var t=A(e);return(T||a)(t,e.headers),t},O),C?M:(k.$promise=M,k.$resolved=!1,k)},S.prototype["$"+o]=function(e,t,n){h(e)&&(n=t,t=e,e={});var r=S[o].call(this,e,this,t,n);return r.$promise||r}}),S.bind=function(e){return m(p,l({},d,e),g)},S}var a=t.noop,f=t.forEach,l=t.extend,c=t.copy,h=t.isFunction;return v.prototype={setUrlParams:function(e,n,i){var s=this,o=i||s.template,u,a,l=s.urlParams={};f(o.split(/\W/),function(e){if(e==="hasOwnProperty")throw r("badname","hasOwnProperty is not a valid parameter name.");!(new RegExp("^\\d+$")).test(e)&&e&&(new RegExp("(^|[^\\\\]):"+e+"(\\W|$)")).test(o)&&(l[e]=!0)}),o=o.replace(/\\:/g,":"),n=n||{},f(s.urlParams,function(e,r){u=n.hasOwnProperty(r)?n[r]:s.defaults[r],t.isDefined(u)&&u!==null?(a=p(u),o=o.replace(new RegExp(":"+r+"(\\W|$)","g"),function(e,t){return a+t})):o=o.replace(new RegExp("(/?):"+r+"(\\W|$)","g"),function(e,t,n){return n.charAt(0)=="/"?n:t+n})}),s.defaults.stripTrailingSlashes&&(o=o.replace(/\/+$/,"")||"/"),o=o.replace(/\/\.(?=\w+($|\?))/,"."),e.url=o.replace(/\/\\\./,"/."),f(n,function(t,n){s.urlParams[n]||(e.params=e.params||{},e.params[n]=t)})}},m}]})})(window,window.angular);