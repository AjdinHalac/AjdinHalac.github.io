"use strict";(self.webpackChunkajdinhalac_github_io=self.webpackChunkajdinhalac_github_io||[]).push([[54],{6868:function(e,n,t){t.d(n,{Z:function(){return u}});var r=t(5671),o=t(3144),a=t(6993),u=function(){function e(){(0,r.Z)(this,e)}return(0,o.Z)(e,null,[{key:"getUsers",value:function(e){return a.R.get("/management/users/?".concat(e))}},{key:"getUserById",value:function(e){return a.R.get("/management/users/".concat(e))}},{key:"updateUser",value:function(e,n){return a.R.put("/management/users/".concat(e),n.payload)}},{key:"removeUser",value:function(e){return a.R.delete("/management/users/".concat(e))}},{key:"getUserRoles",value:function(e){return a.R.get("/management/users/".concat(e,"/roles/"))}},{key:"addUserRole",value:function(e,n){return a.R.put("/management/users/".concat(e,"/roles/").concat(n))}},{key:"removeUserRole",value:function(e,n){return a.R.delete("/management/users/".concat(e,"/roles/").concat(n))}},{key:"getRoles",value:function(){return a.R.get("/management/roles/")}},{key:"getTosList",value:function(e){return a.R.get("/management/tos/?".concat(e))}},{key:"getTos",value:function(e){return a.R.get("/management/tos/".concat(e))}},{key:"createTos",value:function(e){return a.R.post("/management/tos/",e.payload)}},{key:"getUserMetrics",value:function(e){return a.R.get("/management/userMetrics/?".concat(e))}},{key:"getUserMetric",value:function(e){return a.R.get("/management/userMetrics/".concat(e))}},{key:"createArticle",value:function(e){return a.R.post("/management/articles/",e.payload)}},{key:"getArticles",value:function(e){return a.R.get("/management/articles/?".concat(e))}},{key:"getArticleById",value:function(e){return a.R.get("/management/articles/".concat(e))}},{key:"updateArticle",value:function(e,n){return a.R.put("/management/articles/".concat(e),n.payload)}},{key:"publishArticle",value:function(e){return a.R.patch("/management/articles/".concat(e))}},{key:"removeArticle",value:function(e){return a.R.delete("/management/articles/".concat(e))}},{key:"createTag",value:function(e){return a.R.post("/management/tags/",e.payload)}},{key:"getTags",value:function(e){return a.R.get("/management/tags/?".concat(e))}},{key:"getTagById",value:function(e){return a.R.get("/management/tags/".concat(e))}},{key:"updateTag",value:function(e,n){return a.R.put("/management/tags/".concat(e),n.payload)}},{key:"removeTag",value:function(e){return a.R.delete("/management/tags/".concat(e))}}]),e}()},3441:function(e,n,t){t.d(n,{Z:function(){return u}});var r=t(5671),o=t(3144),a=t(6993),u=function(){function e(){(0,r.Z)(this,e)}return(0,o.Z)(e,null,[{key:"getSignedUrlForUpload",value:function(e){return a.R.post("/account/upload",e.payload)}},{key:"forgotPassword",value:function(e){return a.R.post("/me/forgot-password",e.payload,{noAuthentication:!0})}},{key:"resetPassword",value:function(e){return a.R.post("/me/reset-password",e.payload,{noAuthentication:!0})}},{key:"acceptInvite",value:function(e){return a.R.post("/me/accept-invite",e.payload,{noAuthentication:!0})}},{key:"confirmEmail",value:function(e){return a.R.post("/me/confirm-email",e.payload,{noAuthentication:!0})}},{key:"login",value:function(e){return a.R.post("/me/login",e.payload,{noAuthentication:!0})}},{key:"register",value:function(e){return a.R.post("/me/register",e.payload,{noAuthentication:!0})}},{key:"refreshToken",value:function(e){return a.R.post("/me/refresh-token",e.payload,{noAuthentication:!0})}},{key:"logout",value:function(e){return a.R.post("/me/logout",e.payload)}},{key:"getArticles",value:function(e){return a.R.get("/articles/"+(e?"?".concat(e):""))}}]),e}()},6993:function(e,n,t){t.d(n,{R:function(){return p}});var r=t(1413),o=t(4165),a=t(5861),u=t(5671),i=t(3144),c=t(1243),s=t(7447),l="PRODUCTION"==={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_BUILD_TARGET?{API_BASE_URL:"http://backend.ajdinhalac.online",ADMIN_APP_URL:"https://ajdinhalac.github.com"}:{API_BASE_URL:"http://localhost:5000",ADMIN_APP_URL:"http://localhost:3003"},d=(0,r.Z)({DEFAULT_LANGUNAGE:"en"},l),f=t(3441),v=function(){function e(){(0,u.Z)(this,e),this.accessToken=void 0,this.init();var n=this;c.Z.interceptors.response.use((function(e){return e.data}),function(){var e=(0,a.Z)((0,o.Z)().mark((function e(t){var r,a,u,i,l,v,p;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u=t.config,401!==(null===t||void 0===t||null===(r=t.response)||void 0===r?void 0:r.status)||u._retry){e.next=13;break}return u._retry=!0,v=s._.getCookie(),e.next=6,f.Z.refreshToken({payload:{token:null===v||void 0===v?void 0:v.refreshToken}});case 6:return p=e.sent,c.Z.defaults.headers.common["Content-Type"]="application/json",c.Z.defaults.headers.common.Authorization="Bearer "+p.data.accessToken,u.headers["Content-Type"]="application/json",u.headers.Authorization="Bearer "+p.data.accessToken,n.setAuthToken(null===p||void 0===p||null===(i=p.data)||void 0===i?void 0:i.accessToken,null===p||void 0===p||null===(l=p.data)||void 0===l?void 0:l.refreshToken),e.abrupt("return",(0,c.Z)(u));case 13:if(401!==(null===t||void 0===t||null===(a=t.response)||void 0===a?void 0:a.status)){e.next=16;break}return s._.removeCookie(),e.abrupt("return",window.location.assign("".concat(d.ADMIN_APP_URL,"/auth")));case 16:return e.abrupt("return",Promise.reject(t));case 17:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}())}return(0,i.Z)(e,[{key:"init",value:function(){var e=s._.getCookie();this.setAuthToken(null===e||void 0===e?void 0:e.accessToken,null===e||void 0===e?void 0:e.refreshToken)}},{key:"setAuthToken",value:function(e,n){var t={accessToken:e,refreshToken:n};s._.setCookie(JSON.stringify(t),30),this.accessToken=e}},{key:"endpoint",get:function(){return this.basePath}},{key:"basePath",get:function(){return d.API_BASE_URL}},{key:"defaultHeaders",get:function(){var e=s._.getCookie(),n=null===e||void 0===e?void 0:e.accessToken;return{"Content-Type":"application/json",Authorization:"Bearer ".concat(n)}}},{key:"invoke",value:function(e,n,t,o){var a=this.defaultHeaders;return o&&o.headers&&(a=(0,r.Z)((0,r.Z)({},a),o.headers)),(0,c.Z)({method:e,url:"".concat(this.basePath).concat(n),headers:a,data:t})}},{key:"get",value:function(e,n){return this.invoke("GET",e,null,n)}},{key:"post",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=arguments.length>2?arguments[2]:void 0;return this.invoke("POST",e,n,t)}},{key:"put",value:function(e,n,t){return this.invoke("PUT",e,n,t)}},{key:"patch",value:function(e,n,t){return this.invoke("PATCH",e,n,t)}},{key:"head",value:function(e,n){return this.invoke("HEAD",e,null,n)}},{key:"delete",value:function(e,n){return this.invoke("DELETE",e,null,n)}}]),e}(),p=new v},1238:function(e,n,t){t.d(n,{$G:function(){return a},B2:function(){return o},nU:function(){return u}});var r=t(863);function o(e){return r.stringify(e)}var a=function(e,n,t){var r=e.length>n,o=-1===e.search(/\s/);return e=r?e.substr(0,n-1):e,o||(e=t&&r?e.substr(0,e.lastIndexOf(" ")):e),r?e+t:e},u=function(e){var n,t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o=null===e||void 0===e||null===(n=e.response)||void 0===n||null===(t=n.data)||void 0===t?void 0:t.error;if(void 0===o)return"Unexpected error occurred...";switch(o.code){case"0":return o.message;case"TOKEN.020":return"Token does not exist.";case"TOKEN.030":return"Token could not be verified.";case"TOKEN.040":return"Token could not be deleted.";default:return r}}},54:function(e,n,t){t.r(n);t(4165),t(5861);var r=t(9439),o=t(2791),a=(t(6868),t(1238),t(9048)),u=t(7689),i=t(184);n.default=function(){(0,a.p)(),(0,u.s0)();var e=(0,o.useState)({tag:""}),n=(0,r.Z)(e,2);n[0],n[1];return(0,i.jsx)(i.Fragment,{children:"Create tag"})}},7059:function(e){function n(e,n){return Object.prototype.hasOwnProperty.call(e,n)}e.exports=function(e,t,r,o){t=t||"&",r=r||"=";var a={};if("string"!==typeof e||0===e.length)return a;var u=/\+/g;e=e.split(t);var i=1e3;o&&"number"===typeof o.maxKeys&&(i=o.maxKeys);var c=e.length;i>0&&c>i&&(c=i);for(var s=0;s<c;++s){var l,d,f,v,p=e[s].replace(u,"%20"),g=p.indexOf(r);g>=0?(l=p.substr(0,g),d=p.substr(g+1)):(l=p,d=""),f=decodeURIComponent(l),v=decodeURIComponent(d),n(a,f)?Array.isArray(a[f])?a[f].push(v):a[f]=[a[f],v]:a[f]=v}return a}},4297:function(e){var n=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,r,o){return t=t||"&",r=r||"=",null===e&&(e=void 0),"object"===typeof e?Object.keys(e).map((function(o){var a=encodeURIComponent(n(o))+r;return Array.isArray(e[o])?e[o].map((function(e){return a+encodeURIComponent(n(e))})).join(t):a+encodeURIComponent(n(e[o]))})).filter(Boolean).join(t):o?encodeURIComponent(n(o))+r+encodeURIComponent(n(e)):""}},863:function(e,n,t){n.decode=n.parse=t(7059),n.encode=n.stringify=t(4297)},9048:function(e,n,t){t.d(n,{p:function(){return c}});var r=t(1413),o=t(3070),a=t(5150),u=t(2886),i=t(2791);function c(e){var n=(0,u.uP)().theme,t=(0,o.OX)();return(0,i.useMemo)((function(){return(0,a.Cj)(n.direction,(0,r.Z)((0,r.Z)({},t),e))}),[e,n.direction,t])}}}]);
//# sourceMappingURL=54.fbec3ca7.chunk.js.map