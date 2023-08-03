/*! For license information please see 633.801a6b8c.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkajdinhalac_github_io=self.webpackChunkajdinhalac_github_io||[]).push([[633],{9633:function(e,t,n){n.r(t),n.d(t,{default:function(){return P}});var r=n(2791),o=n(7447),i=n(184),a=function(){return(0,i.jsx)(i.Fragment,{})},s=r.memo(a),c=function(){return(0,i.jsx)(i.Fragment,{})},u=n(6582),l=n(8410),f=n(7689),d=r.lazy((function(){return Promise.all([n.e(384),n.e(823)]).then(n.bind(n,7823))})),p=r.lazy((function(){return Promise.all([n.e(384),n.e(506)]).then(n.bind(n,9506))})),h=r.lazy((function(){return Promise.all([n.e(384),n.e(327)]).then(n.bind(n,2327))})),m=r.lazy((function(){return Promise.all([n.e(384),n.e(719)]).then(n.bind(n,5719))})),y=r.lazy((function(){return Promise.all([n.e(384),n.e(959)]).then(n.bind(n,959))})),v=r.lazy((function(){return Promise.all([n.e(384),n.e(661)]).then(n.bind(n,5661))})),x=r.lazy((function(){return Promise.all([n.e(384),n.e(830)]).then(n.bind(n,830))})),g=r.lazy((function(){return Promise.all([n.e(384),n.e(569)]).then(n.bind(n,5569))})),b=r.lazy((function(){return Promise.all([n.e(384),n.e(446)]).then(n.bind(n,2446))})),w=r.lazy((function(){return Promise.all([n.e(384),n.e(54)]).then(n.bind(n,54))})),j=r.lazy((function(){return Promise.all([n.e(384),n.e(717)]).then(n.bind(n,1717))})),k=r.lazy((function(){return Promise.all([n.e(384),n.e(374)]).then(n.bind(n,1701))})),S=r.lazy((function(){return Promise.all([n.e(384),n.e(131)]).then(n.bind(n,1131))})),C=r.lazy((function(){return Promise.all([n.e(770),n.e(965)]).then(n.bind(n,3648))})),O=function(){return(0,i.jsx)(u.k,{as:"main",role:"main",direction:"column",flex:"1",py:"16",minHeight:"94vh",children:(0,i.jsx)(l.W,{flex:"1",children:(0,i.jsxs)(f.Z5,{children:[(0,i.jsx)(f.AW,{path:"/dashboard",element:(0,i.jsx)(d,{})}),(0,i.jsx)(f.AW,{path:"/users",element:(0,i.jsx)(p,{})}),(0,i.jsx)(f.AW,{path:"/users/:id",element:(0,i.jsx)(h,{})}),(0,i.jsx)(f.AW,{path:"/users/:id/roles",element:(0,i.jsx)(m,{})}),(0,i.jsx)(f.AW,{path:"/articles",element:(0,i.jsx)(y,{})}),(0,i.jsx)(f.AW,{path:"/articles/:id",element:(0,i.jsx)(v,{})}),(0,i.jsx)(f.AW,{path:"/create-article",element:(0,i.jsx)(x,{})}),(0,i.jsx)(f.AW,{path:"/tags",element:(0,i.jsx)(g,{})}),(0,i.jsx)(f.AW,{path:"/tags/:id",element:(0,i.jsx)(b,{})}),(0,i.jsx)(f.AW,{path:"/create-tag",element:(0,i.jsx)(w,{})}),(0,i.jsx)(f.AW,{path:"/tos",element:(0,i.jsx)(j,{})}),(0,i.jsx)(f.AW,{path:"/tos/:id",element:(0,i.jsx)(k,{})}),(0,i.jsx)(f.AW,{path:"/create-tos",element:(0,i.jsx)(S,{})}),(0,i.jsx)(f.AW,{path:"*",element:(0,i.jsx)(C,{})})]})})})},A=r.memo(O),P=function(){return(0,r.useLayoutEffect)((function(){if(!o._.isAdmin())return window.location.replace("/unauthorized")}),[]),(0,i.jsxs)(u.k,{direction:"column",flex:"1",children:[(0,i.jsx)(s,{}),(0,i.jsx)(c,{}),(0,i.jsx)(A,{})]})}},7447:function(e,t,n){n.d(t,{_:function(){return u}});var r=n(5671),o=n(3144),i=n(456),a=n(7808),s="localhost"===window.location.hostname?"localhost-frontend":"frontend",c="ajdinhalac.github.io",u=new(function(){function e(){(0,r.Z)(this,e)}return(0,o.Z)(e,[{key:"setCookie",value:function(e,t){var n=new Date;n.setTime(n.getTime()+24*t*60*60*1e3),"localhost"===window.location.hostname?a.ZP.save("".concat(s),"".concat(e),{path:"/",expires:n}):a.ZP.save("".concat(s),"".concat(e),{path:"/",expires:n,domain:"".concat(c),secure:!0})}},{key:"getCookie",value:function(){return a.ZP.load("".concat(s))||null}},{key:"removeCookie",value:function(){"localhost"===window.location.hostname?a.ZP.remove("".concat(s),{path:"/"}):a.ZP.remove("".concat(s),{path:"/",domain:"".concat(c)})}},{key:"getRoles",value:function(){if(this.isAuthenticated()){var e=(0,i.Z)(this.getCookie().accessToken);return(null===e||void 0===e?void 0:e.scope)||""}return""}},{key:"isAdmin",value:function(){return this.getRoles().indexOf("Admin")>-1}},{key:"isAuthenticated",value:function(){var e;return!(null===(e=this.getCookie())||void 0===e||!e.accessToken)}}]),e}())},456:function(e,t,n){function r(e){this.message=e}r.prototype=new Error,r.prototype.name="InvalidCharacterError";var o="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new r("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,i=0,a=0,s="";o=t.charAt(a++);~o&&(n=i%4?64*n+o:o,i++%4)?s+=String.fromCharCode(255&n>>(-2*i&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return s};function i(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(o(e).replace(/(.)/g,(function(e,t){var n=t.charCodeAt(0).toString(16).toUpperCase();return n.length<2&&(n="0"+n),"%"+n})))}(t)}catch(e){return o(t)}}function a(e){this.message=e}a.prototype=new Error,a.prototype.name="InvalidTokenError",t.Z=function(e,t){if("string"!=typeof e)throw new a("Invalid token specified");var n=!0===(t=t||{}).header?0:1;try{return JSON.parse(i(e.split(".")[n]))}catch(e){throw new a("Invalid token specified: "+e.message)}}},1725:function(e){var t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(o){return!1}}()?Object.assign:function(e,o){for(var i,a,s=function(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),c=1;c<arguments.length;c++){for(var u in i=Object(arguments[c]))n.call(i,u)&&(s[u]=i[u]);if(t){a=t(i);for(var l=0;l<a.length;l++)r.call(i,a[l])&&(s[a[l]]=i[a[l]])}}return s}},7808:function(e,t,n){var r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};var o=a(n(8562)),i=a(n(1725));function a(e){return e&&e.__esModule?e:{default:e}}var s="undefined"===typeof document||"undefined"!==typeof process&&{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&!1,c={},u=void 0;function l(){return u&&!u.headersSent}function f(e,t){var n=s?c:o.default.parse(document.cookie),r=n&&n[e];if("undefined"===typeof t&&(t=!r||"{"!==r[0]&&"["!==r[0]),!t)try{r=JSON.parse(r)}catch(i){}return r}function d(e){var t=s?c:o.default.parse(document.cookie);if("undefined"===typeof e&&(e=!t||"{"!==t[0]&&"["!==t[0]),!e)try{t=JSON.parse(t)}catch(n){}return t}function p(e){var t=s?c:o.default.parse(document.cookie);return t?e?Object.keys(t).reduce((function(n,r){if(!e.test(r))return n;var o={};return o[r]=t[r],(0,i.default)({},n,o)}),{}):t:{}}function h(e,t,n){c[e]=t,"object"===("undefined"===typeof t?"undefined":r(t))&&(c[e]=JSON.stringify(t)),s||(document.cookie=o.default.serialize(e,c[e],n)),l()&&u.cookie&&u.cookie(e,t,n)}function m(e,t){delete c[e],t="undefined"===typeof t?{}:"string"===typeof t?{path:t}:(0,i.default)({},t),"undefined"!==typeof document&&(t.expires=new Date(1970,1,1,0,0,1),t.maxAge=0,document.cookie=o.default.serialize(e,"",t)),l()&&u.clearCookie&&u.clearCookie(e,t)}function y(e){c=e?o.default.parse(e):{}}function v(e,t){return e.cookie?c=e.cookie:e.cookies?c=e.cookies:e.headers&&e.headers.cookie?y(e.headers.cookie):c={},u=t,function(){u=null,c={}}}t.ZP={setRawCookie:y,load:f,loadAll:d,select:p,save:h,remove:m,plugToRequest:v}},8562:function(e,t){t.parse=function(e,t){if("string"!==typeof e)throw new TypeError("argument str must be a string");for(var r={},i=t||{},s=e.split(o),c=i.decode||n,u=0;u<s.length;u++){var l=s[u],f=l.indexOf("=");if(!(f<0)){var d=l.substr(0,f).trim(),p=l.substr(++f,l.length).trim();'"'==p[0]&&(p=p.slice(1,-1)),void 0==r[d]&&(r[d]=a(p,c))}}return r},t.serialize=function(e,t,n){var o=n||{},a=o.encode||r;if("function"!==typeof a)throw new TypeError("option encode is invalid");if(!i.test(e))throw new TypeError("argument name is invalid");var s=a(t);if(s&&!i.test(s))throw new TypeError("argument val is invalid");var c=e+"="+s;if(null!=o.maxAge){var u=o.maxAge-0;if(isNaN(u))throw new Error("maxAge should be a Number");c+="; Max-Age="+Math.floor(u)}if(o.domain){if(!i.test(o.domain))throw new TypeError("option domain is invalid");c+="; Domain="+o.domain}if(o.path){if(!i.test(o.path))throw new TypeError("option path is invalid");c+="; Path="+o.path}if(o.expires){if("function"!==typeof o.expires.toUTCString)throw new TypeError("option expires is invalid");c+="; Expires="+o.expires.toUTCString()}o.httpOnly&&(c+="; HttpOnly");o.secure&&(c+="; Secure");if(o.sameSite){switch("string"===typeof o.sameSite?o.sameSite.toLowerCase():o.sameSite){case!0:c+="; SameSite=Strict";break;case"lax":c+="; SameSite=Lax";break;case"strict":c+="; SameSite=Strict";break;default:throw new TypeError("option sameSite is invalid")}}return c};var n=decodeURIComponent,r=encodeURIComponent,o=/; */,i=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function a(e,t){try{return t(e)}catch(n){return e}}},8410:function(e,t,n){n.d(t,{W:function(){return d}});var r=n(1413),o=n(5987),i=n(5597),a=n(2996),s=n(6833),c=n(5113),u=n(6992),l=n(184),f=["className","centerContent"],d=(0,i.G)((function(e,t){var n=(0,a.Lr)(e),i=n.className,d=n.centerContent,p=(0,o.Z)(n,f),h=(0,s.mq)("Container",e);return(0,l.jsx)(c.m.div,(0,r.Z)((0,r.Z)({ref:t,className:(0,u.cx)("chakra-container",i)},p),{},{__css:(0,r.Z)((0,r.Z)({},h),d&&{display:"flex",flexDirection:"column",alignItems:"center"})}))}));d.displayName="Container"},6582:function(e,t,n){n.d(t,{k:function(){return u}});var r=n(1413),o=n(5987),i=n(5597),a=n(5113),s=n(184),c=["direction","align","justify","wrap","basis","grow","shrink"],u=(0,i.G)((function(e,t){var n=e.direction,i=e.align,u=e.justify,l=e.wrap,f=e.basis,d=e.grow,p=e.shrink,h=(0,o.Z)(e,c),m={display:"flex",flexDirection:n,alignItems:i,justifyContent:u,flexWrap:l,flexBasis:f,flexGrow:d,flexShrink:p};return(0,s.jsx)(a.m.div,(0,r.Z)({ref:t,__css:m},h))}));u.displayName="Flex"}}]);
//# sourceMappingURL=633.801a6b8c.chunk.js.map