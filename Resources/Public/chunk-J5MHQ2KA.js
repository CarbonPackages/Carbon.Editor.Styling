import{a as H}from"./chunk-J2LUJMPL.js";import{a as J}from"./chunk-LBE3ZVKK.js";import{b as I,e as M,f as A}from"./chunk-2Q53SARM.js";function E(n){return n==null||n==null||typeof n=="string"&&!n.trim().length||typeof n=="number"&&isNaN(n)}function ut(n,r,o,u=!1,b=!1){let h="px";if(typeof n=="string"){let c=n.match(/^(-?\d*\.?\d+)(.*)$/),x=[h];if(u&&x.push("%"),c){let y=parseFloat(c[1]),a=c[2];return u&&a=="%"?(r=0,o=100):(a=="rem"||a=="em")&&(y=y*16),x.includes(a)||(a=h),{value:B(y,r,o),unit:a,min:r,max:o}}}let e=E(n);return e&&(n=0),{value:b&&e?null:B(n,r,o),unit:h,min:r,max:o}}function gt(n,r,o){let{value:u}=ut(n,r,o);return u}function B(n,r,o){return typeof n=="string"&&(n=parseFloat(n)),(!n||typeof n!="number")&&(n=0),n=Math.round(n),typeof r=="number"&&(n=Math.max(r,n)),typeof o=="number"&&(n=Math.min(o,n)),n}var i=I(M(),1);var Q=I(M(),1);var v=I(H(),1);function st({units:n=["px","%"],unit:r="px",onActive:o,onClick:u=()=>{},i18nRegistry:b}){let e=(n.indexOf(r)+1)%n.length,c=n[e],x=b.translate("changeToUnit",null,[c],"Carbon.Editor.Styling","Main");return Q.default.createElement("button",{type:"button",title:x,onMouseDown:o?()=>o(!0):null,onBlur:o?()=>o(!1):null,onClick:()=>u(c),className:"x1ghz6dp x1t8ecn8 x1i66d86 x1md70p1 x1heor9g x1wty727 x1qlqyl8 x1ypdohk x1sv5n3t x1curdr6 x1yasepr xkwbyna x1p9coah"},r)}var dt=(0,v.neos)(n=>({i18nRegistry:n.get("i18n")})),w=dt(st);var V=I(H(),1);var d={basicLook:{margin:"x1ghz6dp",marginInline:null,marginInlineStart:null,marginLeft:null,marginInlineEnd:null,marginRight:null,marginBlock:null,marginTop:null,marginBottom:null,height:"x1i66d86",background:"x12t7z44",backgroundAttachment:null,backgroundClip:null,backgroundColor:null,backgroundImage:null,backgroundOrigin:null,backgroundPosition:null,backgroundPositionX:null,backgroundPositionY:null,backgroundRepeat:null,backgroundSize:null,color:"x189eng2",border:"x1wty727",borderWidth:null,borderInlineWidth:null,borderInlineStartWidth:null,borderLeftWidth:null,borderInlineEndWidth:null,borderRightWidth:null,borderBlockWidth:null,borderTopWidth:null,borderBottomWidth:null,borderStyle:null,borderInlineStyle:null,borderInlineStartStyle:null,borderLeftStyle:null,borderInlineEndStyle:null,borderRightStyle:null,borderBlockStyle:null,borderTopStyle:null,borderBottomStyle:null,borderColor:null,borderInlineColor:null,borderInlineStartColor:null,borderLeftColor:null,borderInlineEndColor:null,borderRightColor:null,borderBlockColor:null,borderTopColor:null,borderBottomColor:null,fontSize:"xk07rqz",cursor:"x1ed109x",$$css:!0},inputLook:n=>[{borderRadius:"x1cum3z5",borderStartStartRadius:null,borderStartEndRadius:null,borderEndStartRadius:null,borderEndEndRadius:null,borderTopLeftRadius:null,borderTopRightRadius:null,borderBottomLeftRadius:null,borderBottomRightRadius:null,paddingBlock:"xt970qd",paddingTop:null,paddingBottom:null,paddingLeft:"xanjte",paddingRight:(n?0:"var(--fontSize-Base)")==null?null:"x1hb41fa",paddingInlineStart:null,paddingInlineEnd:null,$$css:!0},{"--paddingRight":(r=>typeof r=="number"?r+"px":r??void 0)(n?0:"var(--fontSize-Base)")}],input:{appearance:"xjyslct",width:"xh8yej3",textAlign:"xdpxx8g",$$css:!0},flex:{display:"x78zum5",alignItems:"x6s0dn4",justifyContent:"x1qughib",$$css:!0},focus:{outline:"x1a2a7pz",outlineColor:null,outlineOffset:null,outlineStyle:null,outlineWidth:null,color:"x1cosvjk",background:"xkcvqor",backgroundAttachment:null,backgroundClip:null,backgroundColor:null,backgroundImage:null,backgroundOrigin:null,backgroundPosition:null,backgroundPositionX:null,backgroundPositionY:null,backgroundRepeat:null,backgroundSize:null,$$css:!0},highlight:{borderRadius:"x1cum3z5",borderStartStartRadius:null,borderStartEndRadius:null,borderEndStartRadius:null,borderEndEndRadius:null,borderTopLeftRadius:null,borderTopRightRadius:null,borderBottomLeftRadius:null,borderBottomRightRadius:null,outline:"xus49la",outlineColor:null,outlineStyle:null,outlineWidth:null,outlineOffset:"x1hl8ikr",$$css:!0},disabled:{cursor:"x1h6gzvc",opacity:"x190dgpg",":where(*)>*_pointerEvents":"xvszx66",$$css:!0}};function ct({debounce:n=500,i18nRegistry:r,value:o,onChange:u,onChangeDebounced:b,placeholder:h,unit:e,unitSwitch:c,containerStyle:x,inputStyle:y,onFocus:a,onBlur:F,onEnterKey:N,onKeyPress:O,onKeyDown:U,type:q="text",disabled:C,min:tt,max:nt,title:rt,highlight:ot,allowFloat:lt=!1,setFocus:L=!1,allowEmpty:P=!1,neos:pt,...m}){let k=q=="number",g=(0,i.useRef)(null),[f,S]=(0,i.useState)(o),[j,D]=(0,i.useState)(!1),[K,X]=(0,i.useState)(!!m.fakeFocus);(0,i.useEffect)(()=>{X(!!m.fakeFocus)},[m.fakeFocus]),(0,i.useEffect)(()=>{Y(f)},[m.max,m.min]);function Y(t,l=!1){if(!(!b&&!u)){if(typeof t=="string")for(;t.startsWith(" ");)t=t.substring(1);if(E(t)){if(P){Z("");return}t=W(0),S(t)}else typeof t=="number"&&(t=W(t));if(k&&typeof t=="string"){if(t=t.replace(",",".").replace(/[a-zA-Z\s]/g,""),G(t)){let p=t.match(/\+([\+]+)$/)?.[0].length||0,$=p?0:t.match(/-([-]+)$/)?.[0].length||0;if(p||$){let z=p?"+":"-",R=p||$,s=10**(R-2);t=`${t.slice(0,-R)}${z}${s}`}for(;t.includes("++")||t.includes("--");)t=t.replaceAll("++","+").replaceAll("--","-");for(;it(t);)t=t.substring(1);if(t.length||(t=""),et(t))return;if(t)try{t=(0,eval)(t.replaceAll(":","/"))}catch{}}else t=parseFloat(t);lt||(t=Math.round(t)),t=`${W(t)}`,f!==t&&S(t)}Z(t,l)}}function Z(t,l=!1){t===o&&!l||(b?b(t):u(t))}let _=J(Y,n);(0,i.useEffect)(()=>{S(o)},[o]),(0,i.useEffect)(()=>{b&&u&&f!=o&&u(f)},[f]),(0,i.useEffect)(()=>{g&&g.current&&(m.autoFocus||L)&&g.current.focus()},[]),(0,i.useEffect)(()=>{g&&g.current&&L&&g.current.focus()},[L]);function G(t){return t.includes("+")||t.includes("-")||t.includes("*")||t.includes("/")||t.includes(":")}function it(t){return t.startsWith("*")||t.startsWith("/")||t.startsWith(":")}function et(t){return t.endsWith("+")||t.endsWith("-")||t.endsWith("*")||t.endsWith("/")||t.endsWith(":")}function W(t){return B(t,tt,nt)}return i.default.createElement("div",{...A(e&&[d.flex,d.inputLook(c),d.basicLook],e&&(j||K)&&d.focus,ot&&d.highlight,C&&d.disabled,x),onClick:()=>{e&&!C&&g?.current?.focus()},title:rt},i.default.createElement("input",{...m,...A(d.input,d.basicLook,k&&d.numberInput,!e&&d.inputLook(!1),(j||K)&&d.focus,y),onFocus:t=>{D(!0),a&&a(t)},onBlur:t=>{D(!1),F&&F(t)},value:f===null?"":f,role:"textbox","aria-multiline":"false","aria-disabled":C?"true":"false",type:k?"text":q,inputmode:k?"numeric":null,placeholder:h?r.translate(unescape(h)):null,disabled:C,onChange:t=>{let l=t.target.value;S(l),_(l)},onKeyDown:t=>{typeof U=="function"&&U(t);let l=t.key;if(k&&(l=="ArrowDown"||l=="ArrowUp")){let{metaKey:p,shiftKey:$,altKey:z}=t,R=l=="ArrowDown"?-1:1,s=parseFloat(f)||0;z?s=(s*10+R)/10:s=s+R*($?10:p?100:1),s=`${W(s)}`,f!==s&&(S(s),_(s)),t.preventDefault()}},onKeyPress:t=>{let l=t.key;if(l=="Enter"&&typeof N=="function"){N();return}if(typeof O=="function"&&O(t),k){let p=t.target.value;(p.includes(".")||p.includes(","))&&(l=="."||l==",")&&t.preventDefault(),isNaN(l)&&!G(l)&&l!="."&&l!=","&&l!=" "&&t.preventDefault()}},ref:g}),!(P&&E(f))&&i.default.createElement(i.default.Fragment,null,c&&e?i.default.createElement(w,{unit:e,onActive:X,onClick:c}):e))}var ft=(0,V.neos)(n=>({i18nRegistry:n.get("i18n")})),Ct=ft(ct);var T=I(M(),1);function at({style:n={},className:r}){return T.default.createElement("svg",{style:n,className:r,width:12,height:12,viewBox:"0 0 10 10",fill:"none"},T.default.createElement("path",{fill:"currentColor","fill-rule":"evenodd","clip-rule":"evenodd",d:"M2.5 1.5a1 1 0 00-1 1v5c0 .6.4 1 1 1h5c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1h-5zm0-1.5A2.5 2.5 0 000 2.5v5C0 8.9 1.1 10 2.5 10h5C8.9 10 10 8.9 10 7.5v-5C10 1.1 8.9 0 7.5 0h-5z"}))}export{E as a,ut as b,gt as c,B as d,Ct as e,at as f};
