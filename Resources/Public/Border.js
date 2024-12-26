import{a as U}from"./chunk-D6U3ZOA4.js";import{a as or}from"./chunk-6KYEVQ6F.js";import{a as F,b as tr,e as nr}from"./chunk-GNP7PPYP.js";import"./chunk-A6XDEK34.js";import{a as er}from"./chunk-J4O3TCVP.js";import{a as kr}from"./chunk-Z4CIOFZC.js";import"./chunk-VODNI7P4.js";import{b as O,e as V,f as M}from"./chunk-XTEK7IIS.js";var s=O(V(),1);var A=O(kr(),1);function lr({options:r,config:e,defaultOptions:t}){let{defaultColor:o,allowCurrentColor:n}={...t,...e,...r};return o==="currentColor"&&!n?"#000000":o}function ar({value:r,allowEmpty:e,defaultColor:t,borderStyles:o,minBorderWidth:n,maxBorderWidth:l}){let[i,u,c]=typeof r=="string"?r.split(" "):[],{value:d}=tr(i,n,l,!1,e);return{width:d,style:u||o[0],color:c||t}}function ir(r){return r?(r=r.replace("#",""),r.length==3&&(r+=r),parseInt(r,16)>16777215/2):!1}var ur=O(V(),1);var Nr={preview:(r,e,t)=>[{borderTopColor:r==null?null:"editorstyling-5es6uu",borderTopWidth:e==null?null:"editorstyling-1pntfgx",borderTopStyle:t==null?null:"editorstyling-qf06dz",width:"editorstyling-1849jeq",$$css:!0},{"--borderTopColor":r??void 0,"--borderTopWidth":(o=>typeof o=="number"?o+"px":o??void 0)(e),"--borderTopStyle":t??void 0}]};function T({color:r="currentColor",width:e=4,style:t="solid"}){return ur.default.createElement("div",{"aria-hidden":"true",...M(Nr.preview(r,e,t))})}var a=O(V(),1);function I(){return(I=Object.assign||function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(r[o]=t[o])}return r}).apply(this,arguments)}function j(r,e){if(r==null)return{};var t,o,n={},l=Object.keys(r);for(o=0;o<l.length;o++)e.indexOf(t=l[o])>=0||(n[t]=r[t]);return n}function q(r){var e=(0,a.useRef)(r),t=(0,a.useRef)(function(o){e.current&&e.current(o)});return e.current=r,t.current}var z=function(r,e,t){return e===void 0&&(e=0),t===void 0&&(t=1),r>t?t:r<e?e:r},P=function(r){return"touches"in r},X=function(r){return r&&r.ownerDocument.defaultView||self},sr=function(r,e,t){var o=r.getBoundingClientRect(),n=P(e)?function(l,i){for(var u=0;u<l.length;u++)if(l[u].identifier===i)return l[u];return l[0]}(e.touches,t):e;return{left:z((n.pageX-(o.left+X(r).pageXOffset))/o.width),top:z((n.pageY-(o.top+X(r).pageYOffset))/o.height)}},dr=function(r){!P(r)&&r.preventDefault()},gr=a.default.memo(function(r){var e=r.onMove,t=r.onKey,o=j(r,["onMove","onKey"]),n=(0,a.useRef)(null),l=q(e),i=q(t),u=(0,a.useRef)(null),c=(0,a.useRef)(!1),d=(0,a.useMemo)(function(){var E=function(v){dr(v),(P(v)?v.touches.length>0:v.buttons>0)&&n.current?l(sr(n.current,v,u.current)):b(!1)},H=function(){return b(!1)};function b(v){var f=c.current,m=X(n.current),_=v?m.addEventListener:m.removeEventListener;_(f?"touchmove":"mousemove",E),_(f?"touchend":"mouseup",H)}return[function(v){var f=v.nativeEvent,m=n.current;if(m&&(dr(f),!function(N,W){return W&&!P(N)}(f,c.current)&&m)){if(P(f)){c.current=!0;var _=f.changedTouches||[];_.length&&(u.current=_[0].identifier)}m.focus(),l(sr(m,f,u.current)),b(!0)}},function(v){var f=v.which||v.keyCode;f<37||f>40||(v.preventDefault(),i({left:f===39?.05:f===37?-.05:0,top:f===40?.05:f===38?-.05:0}))},b]},[i,l]),h=d[0],y=d[1],C=d[2];return(0,a.useEffect)(function(){return C},[C]),a.default.createElement("div",I({},o,{onTouchStart:h,onMouseDown:h,className:"react-colorful__interactive",ref:n,onKeyDown:y,tabIndex:0,role:"slider"}))}),J=function(r){return r.filter(Boolean).join(" ")},hr=function(r){var e=r.color,t=r.left,o=r.top,n=o===void 0?.5:o,l=J(["react-colorful__pointer",r.className]);return a.default.createElement("div",{className:l,style:{top:100*n+"%",left:100*t+"%"}},a.default.createElement("div",{className:"react-colorful__pointer-fill",style:{backgroundColor:e}}))},p=function(r,e,t){return e===void 0&&(e=0),t===void 0&&(t=Math.pow(10,e)),Math.round(t*r)/t},re={grad:.9,turn:360,rad:360/(2*Math.PI)},Sr=function(r){return qr(Y(r))},Y=function(r){return r[0]==="#"&&(r=r.substring(1)),r.length<6?{r:parseInt(r[0]+r[0],16),g:parseInt(r[1]+r[1],16),b:parseInt(r[2]+r[2],16),a:r.length===4?p(parseInt(r[3]+r[3],16)/255,2):1}:{r:parseInt(r.substring(0,2),16),g:parseInt(r.substring(2,4),16),b:parseInt(r.substring(4,6),16),a:r.length===8?p(parseInt(r.substring(6,8),16)/255,2):1}};var Mr=function(r){return Pr(Br(r))},Ir=function(r){var e=r.s,t=r.v,o=r.a,n=(200-e)*t/100;return{h:p(r.h),s:p(n>0&&n<200?e*t/100/(n<=100?n:200-n)*100:0),l:p(n/2),a:p(o,2)}},G=function(r){var e=Ir(r);return"hsl("+e.h+", "+e.s+"%, "+e.l+"%)"};var Br=function(r){var e=r.h,t=r.s,o=r.v,n=r.a;e=e/360*6,t/=100,o/=100;var l=Math.floor(e),i=o*(1-t),u=o*(1-(e-l)*t),c=o*(1-(1-e+l)*t),d=l%6;return{r:p(255*[o,u,i,i,c,o][d]),g:p(255*[c,o,o,u,i,i][d]),b:p(255*[i,i,c,o,o,u][d]),a:p(n,2)}};var L=function(r){var e=r.toString(16);return e.length<2?"0"+e:e},Pr=function(r){var e=r.r,t=r.g,o=r.b,n=r.a,l=n<1?L(p(255*n)):"";return"#"+L(e)+L(t)+L(o)+l},qr=function(r){var e=r.r,t=r.g,o=r.b,n=r.a,l=Math.max(e,t,o),i=l-Math.min(e,t,o),u=i?l===e?(t-o)/i:l===t?2+(o-e)/i:4+(e-t)/i:0;return{h:p(60*(u<0?u+6:u)),s:p(l?i/l*100:0),v:p(l/255*100),a:n}};var zr=a.default.memo(function(r){var e=r.hue,t=r.onChange,o=J(["react-colorful__hue",r.className]);return a.default.createElement("div",{className:o},a.default.createElement(gr,{onMove:function(n){t({h:360*n.left})},onKey:function(n){t({h:z(e+360*n.left,0,360)})},"aria-label":"Hue","aria-valuenow":p(e),"aria-valuemax":"360","aria-valuemin":"0"},a.default.createElement(hr,{className:"react-colorful__hue-pointer",left:e/360,color:G({h:e,s:100,v:100,a:1})})))}),Wr=a.default.memo(function(r){var e=r.hsva,t=r.onChange,o={backgroundColor:G({h:e.h,s:100,v:100,a:1})};return a.default.createElement("div",{className:"react-colorful__saturation",style:o},a.default.createElement(gr,{onMove:function(n){t({s:100*n.left,v:100-100*n.top})},onKey:function(n){t({s:z(e.s+100*n.left,0,100),v:z(e.v-100*n.top,0,100)})},"aria-label":"Color","aria-valuetext":"Saturation "+p(e.s)+"%, Brightness "+p(e.v)+"%"},a.default.createElement(hr,{className:"react-colorful__saturation-pointer",top:1-e.v/100,left:e.s/100,color:G(e)})))}),vr=function(r,e){if(r===e)return!0;for(var t in r)if(r[t]!==e[t])return!1;return!0};var $r=function(r,e){return r.toLowerCase()===e.toLowerCase()||vr(Y(r),Y(e))};function Dr(r,e,t){var o=q(t),n=(0,a.useState)(function(){return r.toHsva(e)}),l=n[0],i=n[1],u=(0,a.useRef)({color:e,hsva:l});(0,a.useEffect)(function(){if(!r.equal(e,u.current.color)){var d=r.toHsva(e);u.current={hsva:d,color:e},i(d)}},[e,r]),(0,a.useEffect)(function(){var d;vr(l,u.current.hsva)||r.equal(d=r.fromHsva(l),u.current.color)||(u.current={hsva:l,color:d},o(d))},[l,r,o]);var c=(0,a.useCallback)(function(d){i(function(h){return Object.assign({},h,d)})},[]);return[l,c]}var Or,Tr=typeof window<"u"?a.useLayoutEffect:a.useEffect,Lr=function(){return Or||(typeof __webpack_nonce__<"u"?__webpack_nonce__:void 0)};var cr=new Map,jr=function(r){Tr(function(){var e=r.current?r.current.ownerDocument:document;if(e!==void 0&&!cr.has(e)){var t=e.createElement("style");t.innerHTML=`.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}`,cr.set(e,t);var o=Lr();o&&t.setAttribute("nonce",o),e.head.appendChild(t)}},[])},Ar=function(r){var e=r.className,t=r.colorModel,o=r.color,n=o===void 0?t.defaultColor:o,l=r.onChange,i=j(r,["className","colorModel","color","onChange"]),u=(0,a.useRef)(null);jr(u);var c=Dr(t,n,l),d=c[0],h=c[1],y=J(["react-colorful",e]);return a.default.createElement("div",I({},i,{ref:u,className:y}),a.default.createElement(Wr,{hsva:d,onChange:h}),a.default.createElement(zr,{hue:d.h,onChange:h,className:"react-colorful__last-control"}))},Kr={defaultColor:"000",toHsva:Sr,fromHsva:function(r){return Mr({h:r.h,s:r.s,v:r.v,a:1})},equal:$r},pr=function(r){return a.default.createElement(Ar,I({},r,{colorModel:Kr}))};var Rr=/^#?([0-9A-F]{3,8})$/i,Vr=function(r){var e=r.color,t=e===void 0?"":e,o=r.onChange,n=r.onBlur,l=r.escape,i=r.validate,u=r.format,c=r.process,d=j(r,["color","onChange","onBlur","escape","validate","format","process"]),h=(0,a.useState)(function(){return l(t)}),y=h[0],C=h[1],E=q(o),H=q(n),b=(0,a.useCallback)(function(f){var m=l(f.target.value);C(m),i(m)&&E(c?c(m):m)},[l,c,i,E]),v=(0,a.useCallback)(function(f){i(f.target.value)||C(l(t)),H(f)},[t,l,i,H]);return(0,a.useEffect)(function(){C(l(t))},[t,l]),a.default.createElement("input",I({},d,{value:u?u(y):y,spellCheck:"false",onChange:b,onBlur:v}))},fr=function(r){return"#"+r},mr=function(r){var e=r.prefixed,t=r.alpha,o=j(r,["prefixed","alpha"]),n=(0,a.useCallback)(function(i){return i.replace(/([^0-9A-F]+)/gi,"").substring(0,t?8:6)},[t]),l=(0,a.useCallback)(function(i){return function(u,c){var d=Rr.exec(u),h=d?d[1].length:0;return h===3||h===6||!!c&&h===4||!!c&&h===8}(i,t)},[t]);return a.default.createElement(Vr,I({},o,{escape:n,format:e?fr:void 0,process:fr,validate:l}))};var br={disabled:!1,readonly:!1,allowEmpty:!0,allowWidth:!0,allowStyle:!0,allowCurrentColor:!0,defaultColor:"currentColor",allowColorPicker:!0,allowColorInput:!0,convertPxToRem:!1,presetColors:[],minBorderWidth:0,maxBorderWidth:100,placeholder:""},Fr={solid:!0,dashed:!0,dotted:!0,double:!0,groove:!1,ridge:!1,inset:!1,outset:!1},k={container:{display:"editorstyling-78zum5",gap:"editorstyling-1xye2hm",$$css:!0},highlight:{borderRadius:"editorstyling-1cum3z5",outline:"editorstyling-us49la",outlineOffset:"editorstyling-1hl8ikr",$$css:!0},fullInput:{flex:"editorstyling-98rzlu",flexGrow:null,flexShrink:null,flexBasis:null,$$css:!0},disabled:{cursor:"editorstyling-1h6gzvc",opacity:"editorstyling-190dgpg",":where(*)>*_pointerEvents":"editorstyling-vszx66",$$css:!0},dropdownColor:r=>[{backgroundColor:(r!=="currentColor"?r:"transparent")==null?null:"editorstyling-r5ldyu",position:"editorstyling-10l6tqk",inset:"editorstyling-10a8y8t",insetInline:null,insetInlineStart:null,insetInlineEnd:null,left:null,right:null,insetBlock:null,top:null,bottom:null,":is(*)~svg_transition":"editorstyling-149ef6p",":is(*)~svg_transitionBehavior":null,":is(*)~svg_transitionDelay":null,":is(*)~svg_transitionDuration":null,":is(*)~svg_transitionProperty":null,":is(*)~svg_transitionTimingFunction":null,$$css:!0},{"--backgroundColor":(r!=="currentColor"?r:"transparent")??void 0}],dropdownColorDark:{":is(*)~svg_color":"editorstyling-166kiew",$$css:!0},presetButton:r=>[{width:"editorstyling-1849jeq",height:"editorstyling-1gnnpzl",padding:"editorstyling-1732f5w",paddingInline:null,paddingStart:null,paddingLeft:null,paddingEnd:null,paddingRight:null,paddingBlock:null,paddingTop:null,paddingBottom:null,backgroundColor:r==null?null:"editorstyling-r5ldyu",border:"editorstyling-1wty727",borderWidth:null,borderInlineWidth:null,borderInlineStartWidth:null,borderLeftWidth:null,borderInlineEndWidth:null,borderRightWidth:null,borderBlockWidth:null,borderTopWidth:null,borderBottomWidth:null,borderStyle:null,borderInlineStyle:null,borderInlineStartStyle:null,borderLeftStyle:null,borderInlineEndStyle:null,borderRightStyle:null,borderBlockStyle:null,borderTopStyle:null,borderBottomStyle:null,borderColor:null,borderInlineColor:null,borderInlineStartColor:null,borderLeftColor:null,borderInlineEndColor:null,borderRightColor:null,borderBlockColor:null,borderTopColor:null,borderBottomColor:null,outline:"editorstyling-8wvn0y",outlineColor:null,outlineOffset:null,outlineStyle:null,outlineWidth:null,borderRadius:"editorstyling-1cum3z5",borderStartStartRadius:null,borderStartEndRadius:null,borderEndStartRadius:null,borderEndEndRadius:null,borderTopLeftRadius:null,borderTopRightRadius:null,borderBottomLeftRadius:null,borderBottomRightRadius:null,cursor:"editorstyling-1ypdohk",$$css:!0},{"--backgroundColor":r??void 0}]};function Ur({id:r,value:e,commit:t,highlight:o,options:n,i18nRegistry:l,config:i,onEnterKey:u}){let{disabled:c,readonly:d,allowEmpty:h,convertPxToRem:y,minBorderWidth:C,maxBorderWidth:E,placeholder:H,allowWidth:b,allowStyle:v,allowCurrentColor:f,allowColorPicker:m,allowColorInput:_,presetColors:N}={...br,...i,...n},W=lr({options:n,config:i,defaultOptions:br}),K=Object.entries({...Fr,...i?.borderStyles,...n?.borderStyles}).map(([g,rr])=>rr?g:!1).filter(Boolean),$=ar({value:e,allowEmpty:h,defaultColor:W,borderStyles:K,minBorderWidth:C,maxBorderWidth:E}),R=(0,s.useCallback)(g=>{g!==e&&t(g)},[e,t]),[x,yr]=(0,s.useState)($.width),[B,Cr]=(0,s.useState)($.style),[w,D]=(0,s.useState)($.color),[xr,Q]=(0,s.useState)(!1),[Z,_r]=(0,s.useState)(!1),[S,wr]=(0,s.useState)(f?$.color==="currentColor":!1);return(0,s.useEffect)(()=>{wr(w==="currentColor")},[w]),(0,s.useEffect)(()=>{_r(Array.isArray(N)&&!!N.length)},[N]),(0,s.useEffect)(()=>{let g=!F(x);if(h&&!g&&R(""),(g?typeof x=="string"?parseInt(x):x:C)===0){R("0");return}let Er=`${y?x/16:x}${y?"rem":"px"} ${B||"solid"} ${w||W}`;R(Er)},[x,B,w,y]),s.default.createElement(s.default.Fragment,null,s.default.createElement(or,null,"VALUE: `",e,"`"),s.default.createElement("div",{...M(k.container,o&&k.highlight,c&&k.disabled)},b&&s.default.createElement(nr,{id:r,allowEmpty:h,value:x,onChange:g=>yr(F(g)?"":parseInt(g)),unit:"px",readOnly:d,onEnterKey:u,placeholder:H,type:"number",min:C,max:E,containerStyle:k.fullInput}),v&&K.length>1&&(!b||b&&!!x)&&s.default.createElement(U,{title:l.translate(`borderStyle.${B}`,B,[],"Carbon.Editor.Styling","Main"),headerWidth:30,width:220,header:s.default.createElement(T,{style:B}),readonly:d},K.map(g=>s.default.createElement(A.Button,{key:g,className:"editorstyling-78zum5 editorstyling-6s0dn4 editorstyling-lqzeqv editorstyling-1iv4zvh editorstyling-dpxx8g",onClick:()=>{Cr(g)}},s.default.createElement(T,{style:g}),l.translate(`borderStyle.${g}`,g,[],"Carbon.Editor.Styling","Main")))),(m||_||Z)&&(!b||b&&!!x)&&s.default.createElement(U,{headerPadding:!1,title:S?l.translate("Carbon.Editor.Styling:Main:textColor"):w,automaticClose:!1,header:s.default.createElement("div",{...M(k.dropdownColor(w),ir(w)&&k.dropdownColorDark)}),width:200,padding:!0,headerWidth:40,readonly:d,open:xr,setOpen:Q},(m||_)&&f&&s.default.createElement("label",{className:"editorstyling-78zum5 editorstyling-1xye2hm editorstyling-1ypdohk"},s.default.createElement(A.CheckBox,{onChange:()=>{S||Q(!1),D(S?"#000000":"currentColor")},isChecked:S}),s.default.createElement("span",null,l.translate("Carbon.Editor.Styling:Main:useTextColor"))),!S&&m&&s.default.createElement(pr,{color:w,onChange:D,className:"editorstyling-p3vwao editorstyling-17io97 editorstyling-tkkc6t"}),!S&&_&&s.default.createElement(mr,{prefixed:!0,color:w,onChange:D,className:"editorstyling-cfiqih editorstyling-1i66d86 editorstyling-12t7z44 editorstyling-189eng2 editorstyling-1wty727 editorstyling-k07rqz editorstyling-1ed109x editorstyling-hkptzh editorstyling-jyslct editorstyling-l25owk editorstyling-dpxx8g editorstyling-1uvtmcs editorstyling-1awz5i3 editorstyling-11vc74w"}),Z&&s.default.createElement("div",{className:"editorstyling-78zum5 editorstyling-1iv4zvh editorstyling-1a02dak editorstyling-p3vwao"},N.map(g=>s.default.createElement("button",{type:"button",title:g,onClick:()=>D(g),...M(k.presetButton(g))}))))))}var Xr=er(Ur,"Border");export{Xr as default};
