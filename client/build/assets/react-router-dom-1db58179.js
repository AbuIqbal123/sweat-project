import{r as c,R as E}from"./react-30d6747a.js";import{R as O,N as _,u as x,a as P,b as B,c as F}from"./react-router-5f5873ff.js";import{c as j,s as K,b as g}from"./@remix-run-3bbc17b4.js";/**
 * React Router DOM v6.17.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},b.apply(this,arguments)}function N(e,t){if(e==null)return{};var a={},n=Object.keys(e),s,i;for(i=0;i<n.length;i++)s=n[i],!(t.indexOf(s)>=0)&&(a[s]=e[s]);return a}function I(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function A(e,t){return e.button===0&&(!t||t==="_self")&&!I(e)}const W=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","unstable_viewTransition"],z="startTransition",y=E[z];function D(e){let{basename:t,children:a,future:n,window:s}=e,i=c.useRef();i.current==null&&(i.current=j({window:s,v5Compat:!0}));let o=i.current,[u,l]=c.useState({action:o.action,location:o.location}),{v7_startTransition:r}=n||{},f=c.useCallback(d=>{r&&y?y(()=>l(d)):l(d)},[l,r]);return c.useLayoutEffect(()=>o.listen(f),[o,f]),c.createElement(O,{basename:t,children:a,location:u.location,navigationType:u.action,navigator:o})}const V=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",G=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,J=c.forwardRef(function(t,a){let{onClick:n,relative:s,reloadDocument:i,replace:o,state:u,target:l,to:r,preventScrollReset:f,unstable_viewTransition:d}=t,m=N(t,W),{basename:L}=c.useContext(_),v,w=!1;if(typeof r=="string"&&G.test(r)&&(v=r,V))try{let p=new URL(window.location.href),h=r.startsWith("//")?new URL(p.protocol+r):new URL(r),R=K(h.pathname,L);h.origin===p.origin&&R!=null?r=R+h.search+h.hash:w=!0}catch{}let U=x(r,{relative:s}),C=H(r,{replace:o,state:u,target:l,preventScrollReset:f,relative:s,unstable_viewTransition:d});function k(p){n&&n(p),p.defaultPrevented||C(p)}return c.createElement("a",b({},m,{href:v||U,onClick:w||i?n:k,ref:a,target:l}))});var S;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(S||(S={}));var T;(function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(T||(T={}));function H(e,t){let{target:a,replace:n,state:s,preventScrollReset:i,relative:o,unstable_viewTransition:u}=t===void 0?{}:t,l=P(),r=B(),f=F(e,{relative:o});return c.useCallback(d=>{if(A(d,a)){d.preventDefault();let m=n!==void 0?n:g(r)===g(f);l(e,{replace:m,state:s,preventScrollReset:i,relative:o,unstable_viewTransition:u})}},[r,l,f,n,s,a,e,i,o,u])}export{D as B,J as L};
