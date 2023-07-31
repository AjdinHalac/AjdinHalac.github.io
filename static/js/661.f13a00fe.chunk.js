"use strict";(self.webpackChunkajdinhalac_github_io=self.webpackChunkajdinhalac_github_io||[]).push([[661],{6868:function(e,t,n){n.d(t,{Z:function(){return u}});var r=n(5671),o=n(3144),a=n(6993),u=function(){function e(){(0,r.Z)(this,e)}return(0,o.Z)(e,null,[{key:"getUsers",value:function(e){return a.R.get("/management/users/?".concat(e))}},{key:"getUserById",value:function(e){return a.R.get("/management/users/".concat(e))}},{key:"updateUser",value:function(e,t){return a.R.put("/management/users/".concat(e),t.payload)}},{key:"removeUser",value:function(e){return a.R.delete("/management/users/".concat(e))}},{key:"getUserRoles",value:function(e){return a.R.get("/management/users/".concat(e,"/roles/"))}},{key:"addUserRole",value:function(e,t){return a.R.put("/management/users/".concat(e,"/roles/").concat(t))}},{key:"removeUserRole",value:function(e,t){return a.R.delete("/management/users/".concat(e,"/roles/").concat(t))}},{key:"getRoles",value:function(){return a.R.get("/management/roles/")}},{key:"getTosList",value:function(e){return a.R.get("/management/tos/?".concat(e))}},{key:"getTos",value:function(e){return a.R.get("/management/tos/".concat(e))}},{key:"createTos",value:function(e){return a.R.post("/management/tos/",e.payload)}},{key:"getUserMetrics",value:function(e){return a.R.get("/management/userMetrics/?".concat(e))}},{key:"getUserMetric",value:function(e){return a.R.get("/management/userMetrics/".concat(e))}},{key:"createArticle",value:function(e){return a.R.post("/management/articles/",e.payload)}},{key:"getArticles",value:function(e){return a.R.get("/management/articles/?".concat(e))}},{key:"getArticleById",value:function(e){return a.R.get("/management/articles/".concat(e))}},{key:"updateArticle",value:function(e,t){return a.R.put("/management/articles/".concat(e),t.payload)}},{key:"publishArticle",value:function(e){return a.R.patch("/management/articles/".concat(e))}},{key:"removeArticle",value:function(e){return a.R.delete("/management/articles/".concat(e))}},{key:"createTag",value:function(e){return a.R.post("/management/tags/",e.payload)}},{key:"getTags",value:function(e){return a.R.get("/management/tags/?".concat(e))}},{key:"getTagById",value:function(e){return a.R.get("/management/tags/".concat(e))}},{key:"updateTag",value:function(e,t){return a.R.put("/management/tags/".concat(e),t.payload)}},{key:"removeTag",value:function(e){return a.R.delete("/management/tags/".concat(e))}}]),e}()},3441:function(e,t,n){n.d(t,{Z:function(){return u}});var r=n(5671),o=n(3144),a=n(6993),u=function(){function e(){(0,r.Z)(this,e)}return(0,o.Z)(e,null,[{key:"getSignedUrlForUpload",value:function(e){return a.R.post("/account/upload",e.payload)}},{key:"forgotPassword",value:function(e){return a.R.post("/me/forgot-password",e.payload,{noAuthentication:!0})}},{key:"resetPassword",value:function(e){return a.R.post("/me/reset-password",e.payload,{noAuthentication:!0})}},{key:"acceptInvite",value:function(e){return a.R.post("/me/accept-invite",e.payload,{noAuthentication:!0})}},{key:"confirmEmail",value:function(e){return a.R.post("/me/confirm-email",e.payload,{noAuthentication:!0})}},{key:"login",value:function(e){return a.R.post("/me/login",e.payload,{noAuthentication:!0})}},{key:"register",value:function(e){return a.R.post("/me/register",e.payload,{noAuthentication:!0})}},{key:"refreshToken",value:function(e){return a.R.post("/me/refresh-token",e.payload,{noAuthentication:!0})}},{key:"logout",value:function(e){return a.R.post("/me/logout",e.payload)}},{key:"getArticles",value:function(e){return a.R.get("/articles/"+(e?"?".concat(e):""))}}]),e}()},6993:function(e,t,n){n.d(t,{R:function(){return p}});var r=n(1413),o=n(4165),a=n(5861),u=n(5671),i=n(3144),c=n(1243),s=n(7447),l="PRODUCTION"==={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_BUILD_TARGET?{API_BASE_URL:"http://backend.ajdinhalac.online",ADMIN_APP_URL:"https://ajdinhalac.github.com"}:{API_BASE_URL:"http://localhost:5000",ADMIN_APP_URL:"http://localhost:3003"},d=(0,r.Z)({DEFAULT_LANGUNAGE:"en"},l),f=n(3441),v=function(){function e(){(0,u.Z)(this,e),this.accessToken=void 0,this.init();var t=this;c.Z.interceptors.response.use((function(e){return e.data}),function(){var e=(0,a.Z)((0,o.Z)().mark((function e(n){var r,a,u,i,l,v,p;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u=n.config,401!==(null===n||void 0===n||null===(r=n.response)||void 0===r?void 0:r.status)||u._retry){e.next=13;break}return u._retry=!0,v=s._.getCookie(),e.next=6,f.Z.refreshToken({payload:{token:null===v||void 0===v?void 0:v.refreshToken}});case 6:return p=e.sent,c.Z.defaults.headers.common["Content-Type"]="application/json",c.Z.defaults.headers.common.Authorization="Bearer "+p.data.accessToken,u.headers["Content-Type"]="application/json",u.headers.Authorization="Bearer "+p.data.accessToken,t.setAuthToken(null===p||void 0===p||null===(i=p.data)||void 0===i?void 0:i.accessToken,null===p||void 0===p||null===(l=p.data)||void 0===l?void 0:l.refreshToken),e.abrupt("return",(0,c.Z)(u));case 13:if(401!==(null===n||void 0===n||null===(a=n.response)||void 0===a?void 0:a.status)){e.next=16;break}return s._.removeCookie(),e.abrupt("return",window.location.assign("".concat(d.ADMIN_APP_URL,"/auth")));case 16:return e.abrupt("return",Promise.reject(n));case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}return(0,i.Z)(e,[{key:"init",value:function(){var e=s._.getCookie();this.setAuthToken(null===e||void 0===e?void 0:e.accessToken,null===e||void 0===e?void 0:e.refreshToken)}},{key:"setAuthToken",value:function(e,t){var n={accessToken:e,refreshToken:t};s._.setCookie(JSON.stringify(n),30),this.accessToken=e}},{key:"endpoint",get:function(){return this.basePath}},{key:"basePath",get:function(){return d.API_BASE_URL}},{key:"defaultHeaders",get:function(){var e=s._.getCookie(),t=null===e||void 0===e?void 0:e.accessToken;return{"Content-Type":"application/json",Authorization:"Bearer ".concat(t)}}},{key:"invoke",value:function(e,t,n,o){var a=this.defaultHeaders;return o&&o.headers&&(a=(0,r.Z)((0,r.Z)({},a),o.headers)),(0,c.Z)({method:e,url:"".concat(this.basePath).concat(t),headers:a,data:n})}},{key:"get",value:function(e,t){return this.invoke("GET",e,null,t)}},{key:"post",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2?arguments[2]:void 0;return this.invoke("POST",e,t,n)}},{key:"put",value:function(e,t,n){return this.invoke("PUT",e,t,n)}},{key:"patch",value:function(e,t,n){return this.invoke("PATCH",e,t,n)}},{key:"head",value:function(e,t){return this.invoke("HEAD",e,null,t)}},{key:"delete",value:function(e,t){return this.invoke("DELETE",e,null,t)}}]),e}(),p=new v},1238:function(e,t,n){n.d(t,{$G:function(){return a},B2:function(){return o},nU:function(){return u}});var r=n(863);function o(e){return r.stringify(e)}var a=function(e,t,n){var r=e.length>t,o=-1===e.search(/\s/);return e=r?e.substr(0,t-1):e,o||(e=n&&r?e.substr(0,e.lastIndexOf(" ")):e),r?e+n:e},u=function(e){var t,n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o=null===e||void 0===e||null===(t=e.response)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.error;if(void 0===o)return"Unexpected error occurred...";switch(o.code){case"0":return o.message;case"TOKEN.020":return"Token does not exist.";case"TOKEN.030":return"Token could not be verified.";case"TOKEN.040":return"Token could not be deleted.";default:return r}}},5661:function(e,t,n){n.r(t);n(1413);var r=n(4165),o=n(5861),a=n(9439),u=n(2791),i=n(7689),c=(n(3441),n(1243),n(1238)),s=n(6868),l=n(9048),d=n(184);t.default=function(e){var t=e.match,n=(0,l.p)(),f=((0,i.s0)(),(0,u.useState)({content:"",image:"",title:""})),v=(0,a.Z)(f,2),p=(v[0],v[1]),g=(0,u.useState)([]),m=(0,a.Z)(g,2),k=(m[0],m[1]),h=(0,u.useState)(!1),y=(0,a.Z)(h,2),R=(y[0],y[1],(0,u.useState)([])),T=(0,a.Z)(R,2),A=(T[0],T[1]),_=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),U=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(){var o,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.Z.getArticleById(t.params.id);case 3:return o=e.sent,p(o.data),A(o.data.tags),e.next=8,s.Z.getTags("perPage=1000");case 8:a=e.sent,k(a.data.results),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),n({title:(0,c.nU)(e.t0),position:"top-right",duration:5e3,isClosable:!0,status:"error"});case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}}();return(0,u.useEffect)((function(){U(),_()}),[]),(0,d.jsx)(d.Fragment,{children:"Article"})}},7059:function(e){function t(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=function(e,n,r,o){n=n||"&",r=r||"=";var a={};if("string"!==typeof e||0===e.length)return a;var u=/\+/g;e=e.split(n);var i=1e3;o&&"number"===typeof o.maxKeys&&(i=o.maxKeys);var c=e.length;i>0&&c>i&&(c=i);for(var s=0;s<c;++s){var l,d,f,v,p=e[s].replace(u,"%20"),g=p.indexOf(r);g>=0?(l=p.substr(0,g),d=p.substr(g+1)):(l=p,d=""),f=decodeURIComponent(l),v=decodeURIComponent(d),t(a,f)?Array.isArray(a[f])?a[f].push(v):a[f]=[a[f],v]:a[f]=v}return a}},4297:function(e){var t=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,n,r,o){return n=n||"&",r=r||"=",null===e&&(e=void 0),"object"===typeof e?Object.keys(e).map((function(o){var a=encodeURIComponent(t(o))+r;return Array.isArray(e[o])?e[o].map((function(e){return a+encodeURIComponent(t(e))})).join(n):a+encodeURIComponent(t(e[o]))})).filter(Boolean).join(n):o?encodeURIComponent(t(o))+r+encodeURIComponent(t(e)):""}},863:function(e,t,n){t.decode=t.parse=n(7059),t.encode=t.stringify=n(4297)},9048:function(e,t,n){n.d(t,{p:function(){return c}});var r=n(1413),o=n(3070),a=n(5150),u=n(2886),i=n(2791);function c(e){var t=(0,u.uP)().theme,n=(0,o.OX)();return(0,i.useMemo)((function(){return(0,a.Cj)(t.direction,(0,r.Z)((0,r.Z)({},n),e))}),[e,t.direction,n])}}}]);
//# sourceMappingURL=661.f13a00fe.chunk.js.map