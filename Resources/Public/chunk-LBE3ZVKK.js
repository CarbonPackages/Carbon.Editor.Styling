import{b as W,e as q}from"./chunk-2Q53SARM.js";var r=W(q());function O(i,n,c){var b=this,a=(0,r.useRef)(null),l=(0,r.useRef)(0),e=(0,r.useRef)(null),o=(0,r.useRef)([]),f=(0,r.useRef)(),s=(0,r.useRef)(),D=(0,r.useRef)(i),m=(0,r.useRef)(!0);D.current=i;var h=typeof window<"u",d=!n&&n!==0&&h;if(typeof i!="function")throw new TypeError("Expected a function");n=+n||0;var F=!!(c=c||{}).leading,T=!("trailing"in c)||!!c.trailing,v="maxWait"in c,k="debounceOnServer"in c&&!!c.debounceOnServer,x=v?Math.max(+c.maxWait||0,n):null;(0,r.useEffect)(function(){return m.current=!0,function(){m.current=!1}},[]);var M=(0,r.useMemo)(function(){var y=function(t){var u=o.current,w=f.current;return o.current=f.current=null,l.current=t,s.current=D.current.apply(w,u)},g=function(t,u){d&&cancelAnimationFrame(e.current),e.current=d?requestAnimationFrame(t):setTimeout(t,u)},C=function(t){if(!m.current)return!1;var u=t-a.current;return!a.current||u>=n||u<0||v&&t-l.current>=x},E=function(t){return e.current=null,T&&o.current?y(t):(o.current=f.current=null,s.current)},A=function t(){var u=Date.now();if(C(u))return E(u);if(m.current){var w=n-(u-a.current),S=v?Math.min(w,x-(u-l.current)):w;g(t,S)}},p=function(){if(h||k){var t=Date.now(),u=C(t);if(o.current=[].slice.call(arguments),f.current=b,a.current=t,u){if(!e.current&&m.current)return l.current=a.current,g(A,n),F?y(a.current):s.current;if(v)return g(A,n),y(a.current)}return e.current||g(A,n),s.current}};return p.cancel=function(){e.current&&(d?cancelAnimationFrame(e.current):clearTimeout(e.current)),l.current=0,o.current=a.current=f.current=e.current=null},p.isPending=function(){return!!e.current},p.flush=function(){return e.current?E(Date.now()):s.current},p},[F,v,n,x,T,d,h,k]);return M}function P(i,n){return i===n}function R(i,n,c){var b=c&&c.equalityFn||P,a=(0,r.useRef)(i),l=(0,r.useState)({})[1],e=O((0,r.useCallback)(function(f){a.current=f,l({})},[l]),n,c),o=(0,r.useRef)(i);return b(o.current,i)||(e(i),o.current=i),[a.current,e]}export{O as a,R as b};
