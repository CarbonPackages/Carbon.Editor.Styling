import{a as Vt}from"./chunk-DKR3S3OU.js";import{a as Ut}from"./chunk-W3GK2V5S.js";import{a as nt,b as wt}from"./chunk-4YKH6IHW.js";import{a as Rt,b as tt,c as st,e as $,f as O}from"./chunk-OQ365MG2.js";import{a as Dt}from"./chunk-Z4CIOFZC.js";import{a as At}from"./chunk-VODNI7P4.js";import{b as _t}from"./chunk-A6XDEK34.js";import{b as M,e as Q,f as w}from"./chunk-XTEK7IIS.js";var t=M(Q(),1),L=M(Dt(),1);var A=M(Q(),1);var Zt={look:{margin:"x1ghz6dp",height:"x1i66d86",background:"x12t7z44",color:"x189eng2",border:"x1wty727",fontSize:"xk07rqz",borderRadius:"x1cum3z5",padding:"xs5loj3",display:"x78zum5",alignItems:"x6s0dn4",justifyContent:"xlqzeqv",width:"xh8yej3",textAlign:"xdpxx8g",whiteSpace:"xuxw1ft",overflow:"xb3r6kr",$$css:!0},button:n=>[{cursor:n==null?null:"x1jn3k19",":focus_outline":"xip2jzm",":focus_outlineColor":null,":focus_outlineOffset":null,":focus_outlineStyle":null,":focus_outlineWidth":null,$$css:!0},{"--cursor":n??void 0}]},Wt=n=>A.default.createElement("span",{className:"xeuugli xlyipyv xb3r6kr x1hld986"},n);function at({id:n,onClick:o,disabled:l,highlight:u,title:m,children:e,readonly:B,cursor:d="text"}){return A.default.createElement(A.default.Fragment,null,o&&typeof o=="function"&&!B&&!l?A.default.createElement("button",{type:"button",onClick:o,id:n,title:m,...w(Zt.look,Zt.button(d))},Wt(e)):A.default.createElement("div",{id:n,className:"x1ghz6dp x1i66d86 x12t7z44 x189eng2 x1wty727 xk07rqz x1cum3z5 xs5loj3 x78zum5 x6s0dn4 xlqzeqv xh8yej3 xdpxx8g xuxw1ft xb3r6kr xt0e3qv"},Wt(e)))}var c=M(Q(),1),ot=M(Dt(),1),Kt=M(At(),1);var Ht={dialog:{position:"xixxii4",inset:"x10a8y8t",background:"x978ut8",border:"xa26pp2",padding:"x1717udv",color:"x189eng2",boxShadow:"xe8odd5",animation:"x1ww42s3",":where([open])_::backdrop_animation":"x18ef84f",$$css:!0},title:n=>[{padding:"x1i724xb",paddingInline:null,paddingStart:null,paddingLeft:null,paddingEnd:null,paddingBlock:null,paddingTop:null,paddingBottom:null,paddingRight:(n?"calc(var(--spacing-Full) + var(--spacing-GoldenUnit)":null)==null?null:"x1hb41fa",paddingInlineStart:null,paddingInlineEnd:null,margin:"x1ghz6dp",marginInline:null,marginInlineStart:null,marginLeft:null,marginInlineEnd:null,marginRight:null,marginBlock:null,marginTop:null,marginBottom:null,fontSize:"xwsyq91",lineHeight:"x1u7k74",borderBottom:"xcns5ij",borderBottomWidth:null,borderBottomStyle:null,borderBottomColor:null,$$css:!0},{"--paddingRight":(o=>typeof o=="number"?o+"px":o??void 0)(n?"calc(var(--spacing-Full) + var(--spacing-GoldenUnit)":null)}]},vt=n=>n&&typeof n=="function";function Mn({open:n,setOpen:o,children:l,i18nRegistry:u,onApply:m,onCancel:e,showCloseButton:B,onCloseButton:d,style:y,title:p,applyLabel:k="Neos.Neos:Main:applyChanges",cancelLabel:I="Neos.Neos:Main:cancel",closeLabel:N="Neos.Neos:Main:close"}){let x=(0,c.useRef)(),v=(0,c.useCallback)(()=>{o(!1)},[o]);(0,c.useEffect)(()=>(x.current?.addEventListener("close",v),()=>{x.current?.removeEventListener("close",v)}),[x,v]),(0,c.useEffect)(()=>{x.current&&(n?x.current.showModal():x.current.close())},[n]);let z=vt(m),U=vt(e),et=vt(d);return c.default.createElement("dialog",{ref:x,...w(Ht.dialog,y)},p&&c.default.createElement("h2",{...w(Ht.title(et))},p),l,(z||U)&&c.default.createElement("div",{className:"x78zum5 x7v6yn8 x15zctf7"},z&&c.default.createElement(ot.Button,{style:"success",hoverStyle:"success",onClick:m},u.translate(k)),U&&c.default.createElement(ot.Button,{onClick:e,hoverStyle:"warn"},u.translate(I))),B&&c.default.createElement(ot.IconButton,{icon:"times",style:"clean",title:u.translate(N),onClick:()=>{o(!1),et&&d()},iconProps:{size:"lg"},className:"xj8z8mm x13vifvy x3m8u43"}))}var Sn=(0,Kt.neos)(n=>({i18nRegistry:n.get("i18n")})),Xt=Sn(Mn);var Ct=M(Q(),1);function ut({style:n={},className:o}){return Ct.default.createElement("svg",{style:n,className:o,width:12,height:12,viewBox:"0 0 10 10"},Ct.default.createElement("circle",{stroke:"currentColor",strokeWidth:"1.5",cx:"5",cy:"5",r:"4.25",fill:"none"}))}var g=M(Q(),1);function V({selected:n=null,organic:o=!1,style:l={},className:u}){if(o)return g.default.createElement("svg",{style:l,className:u,xmlns:"http://www.w3.org/2000/svg",width:12,height:12,viewBox:"0 0 10 10"},g.default.createElement("path",{fill:"none",stroke:"currentColor","stroke-width":"1.5",d:"M3 .75c.77459204 0 3.17405897.18543111 4.85534979.90104403.4551161.19371245.85720294.42242467 1.12680357.71643066C9.14201923 2.54181228 9.25 2.7409741 9.25 2.97943128c0 .92400893-1.08920903 2.87728657-2.57136342 4.36379611C5.63032329 8.39462103 4.35060267 9.25 3 9.25c-.2129752 0-.39077651-.11403477-.55225147-.2685897-.29323317-.28066663-.53099861-.697952-.73657258-1.1719939C1.03370869 6.24721534.75 4.07399609.75 3.08217029c0-.61510406.29042874-1.1569223.68649464-1.56383648C1.88315236 1.05944209 2.47513268.75 3 .75Z"}));let e=(0,g.useMemo)(()=>!n||n==="all"?1:.2,[n]),B=(0,g.useMemo)(()=>n==="topLeft"?1:e,[n,e]),d=(0,g.useMemo)(()=>n==="topRight"?1:e,[n,e]),y=(0,g.useMemo)(()=>n==="bottomRight"?1:e,[n,e]),p=(0,g.useMemo)(()=>n==="bottomLeft"?1:e,[n,e]);return g.default.createElement("svg",{style:l,className:u,xmlns:"http://www.w3.org/2000/svg",width:12,height:12,viewBox:"0 0 10 10"},g.default.createElement(nt,{d:"M 2.5 0 C 1.119 0 0 1.119 0 2.5 L 0 4 L 1.5 4 L 1.5 2.5 C 1.5 1.948 1.948 1.5 2.5 1.5 L 4 1.5 L 4 0 Z",opacity:B}),g.default.createElement(nt,{d:"M 10 2.5 C 10 1.119 8.881 0 7.5 0 L 6 0 L 6 1.5 L 7.5 1.5 C 8.052 1.5 8.5 1.948 8.5 2.5 L 8.5 4 L 10 4 Z",opacity:d}),g.default.createElement(nt,{d:"M 7.5 10 C 8.881 10 10 8.881 10 7.5 L 10 6 L 8.5 6 L 8.5 7.5 C 8.5 8.052 8.052 8.5 7.5 8.5 L 6 8.5 L 6 10 Z",opacity:y}),g.default.createElement(nt,{d:"M 0 7.5 C 0 8.881 1.119 10 2.5 10 L 4 10 L 4 8.5 L 2.5 8.5 C 1.948 8.5 1.5 8.052 1.5 7.5 L 1.5 6 L 0 6 Z",opacity:p}))}function Lt({value:n,allowFullRounded:o,fullRoundedValue:l,allowOrganic:u,allowMultiple:m}){if(o&&n&&(n===`${l}px`||n===l))return"rounded";if(typeof n=="string"){if(u&&n.includes("/"))return"organic";if(m&&n.includes(" ")&&n.trim().split(" ").length===4)return"multiple"}return"single"}function Yt(n){return typeof n=="number"?n:typeof n!="string"?null:(0,eval)(n.replaceAll(":","/"))}function D(n,o,l,u=!1){if(tt(n))return u?"":"0";let m=(!o||o==="px")&&l?16:1;o=!o||o==="px"?l?"rem":"px":o;let e=n/m;return e===0?"0":`${e}${o}`}function a(n,o,l,u=null){u===null&&(u=l==="unit"?"px":null);let m=n[o];if(!m)return u;if(!l)return m;let e=m[l];return typeof e<"u"?e:u}function Jt(n){let{value:o,convertPxToRem:l,min:u,max:m,allowPercentage:e,allowEmpty:B}=n,d=Lt(n);if(d==="rounded")return{mode:d};if(d==="organic")return{mode:d,organic:o};if(d==="single"){let p="";return typeof o=="number"?p=st(l?o*16:o,u,m):p=st(o,u,m,e,B),{mode:d,main:p}}let y=o.split(" ").map(p=>st(p,u,m,e));return{mode:d,topLeft:y[0],topRight:y[1],bottomRight:y[2],bottomLeft:y[3]}}var Qt=M(At(),1);var kn=(0,t.lazy)(()=>import("./OrganicEditor-KPFWP7YT.js")),b={container:{display:"x78zum5",gap:"x1xye2hm",$$css:!0},highlight:{borderRadius:"x1cum3z5",outline:"xus49la",outlineOffset:"x1hl8ikr",$$css:!0},centerContent:{padding:"x1717udv",display:"x78zum5",alignItems:"x6s0dn4",justifyContent:"xl56j7k",$$css:!0},fullInput:{flex:"x98rzlu",flexGrow:null,flexShrink:null,flexBasis:null,$$css:!0},disabled:{cursor:"x1h6gzvc",opacity:"x190dgpg",":where(*)>*_pointerEvents":"xvszx66",$$css:!0},preview:(n,o)=>[{transition:"x1vfmi3i",transitionBehavior:null,transitionDelay:null,transitionDuration:null,transitionProperty:null,transitionTimingFunction:null,background:"x1u657s8",backgroundAttachment:null,backgroundClip:null,backgroundColor:null,backgroundImage:null,backgroundOrigin:null,backgroundPosition:null,backgroundPositionX:null,backgroundPositionY:null,backgroundRepeat:null,backgroundSize:null,height:"xwzfr38",borderRadius:(o?"50%":n)==null?null:"x1kptayx",borderStartStartRadius:null,borderStartEndRadius:null,borderEndStartRadius:null,borderEndEndRadius:null,borderTopLeftRadius:null,borderTopRightRadius:null,borderBottomLeftRadius:null,borderBottomRightRadius:null,$$css:!0},{"--borderRadius":(l=>typeof l=="number"?l+"px":l??void 0)(o?"50%":n)}],previewBig:(n,o)=>[{margin:"xqjkn27",marginInline:null,marginInlineStart:null,marginLeft:null,marginInlineEnd:null,marginRight:null,marginBlock:null,marginTop:null,marginBottom:null,display:"x1lliihq",aspectRatio:(o||null)==null?null:"x1f7gzso",width:(o&&o<3.4?null:n?80:"100%")==null?null:"x1bl4301",height:(!o||o<3.4?80:null)==null?null:"x1f5funs",$$css:!0},{"--aspectRatio":(o||null)??void 0,"--width":(l=>typeof l=="number"?l+"px":l??void 0)(o&&o<3.4?null:n?80:"100%"),"--height":(l=>typeof l=="number"?l+"px":l??void 0)(!o||o<3.4?80:null)}],previewSmall:{aspectRatio:"x1plog1",transform:"x1a33avv",margin:"x1teoei8",marginInline:null,marginInlineStart:null,marginLeft:null,marginInlineEnd:null,marginRight:null,marginBlock:null,marginTop:null,marginBottom:null,$$css:!0},bigPreviewContainer:n=>[{display:"xrvj5dj",gridTemplateRows:(n?"1fr":"0fr")==null?null:"x1lq8ota",transition:"xyi89lb",transitionBehavior:null,transitionDelay:null,transitionDuration:null,transitionProperty:null,transitionTimingFunction:null,$$css:!0},{"--gridTemplateRows":(n?"1fr":"0fr")??void 0}],previewButton:{transition:"x1xad6n5",$$css:!0},previewButtonInvisible:{transition:"x1fma8x5",opacity:"xg01cxk",pointerEvents:"x47corl",marginLeft:"xd2cifw",$$css:!0}},In={disabled:!1,readonly:!1,allowEmpty:!1,allowMultiple:!1,allowOrganic:!1,allowFullRounded:!1,allowPercentage:!1,convertPxToRem:!1,preview:!0,previewAspectRatio:null,min:0,max:24,placeholder:"",fullRoundedValue:9999};function Nn({id:n,value:o,commit:l,highlight:u,options:m,i18nRegistry:e,config:B,onEnterKey:d}){let{disabled:y,readonly:p,allowEmpty:k,allowMultiple:I,allowOrganic:N,allowFullRounded:x,allowPercentage:v,convertPxToRem:z,preview:U,previewAspectRatio:et,min:f,max:h,placeholder:tn,fullRoundedValue:R}={...In,...B,...m},nn=Yt(et),s=Jt({value:o,allowPercentage:v,allowEmpty:k,convertPxToRem:z,min:f,max:h,allowFullRounded:x,fullRoundedValue:R,allowOrganic:N,allowMultiple:I}),[i,E]=(0,t.useState)(s.mode),[Bt,_]=(0,t.useState)(!1),[dt,zt]=(0,t.useState)(!1),[Mt,on]=(0,t.useState)(!0),[C,S]=(0,t.useState)(null),[en,lt]=(0,t.useState)(!1),[ln,Z]=(0,t.useState)(!1),[mt]=_t(ln,500),[T,W]=(0,t.useState)(a(s,"main","value","")),[G,rn]=(0,t.useState)(a(s,"main","unit")),[pt,sn]=(0,t.useState)(a(s,"main","min",f)),[St,an]=(0,t.useState)(a(s,"main","max",h)),[it,un]=(0,t.useState)(a(s,"organic")),[dn,mn]=(0,t.useState)(a(s,"organic")),[q,ct]=(0,t.useState)(a(s,"topLeft","value")),[H,pn]=(0,t.useState)(a(s,"topLeft","unit")),[kt,cn]=(0,t.useState)(a(s,"topLeft","min",f)),[It,gn]=(0,t.useState)(a(s,"topLeft","max",h)),[P,gt]=(0,t.useState)(a(s,"topRight","value")),[K,xn]=(0,t.useState)(a(s,"topRight","unit")),[Nt,fn]=(0,t.useState)(a(s,"topRight","min",f)),[Et,hn]=(0,t.useState)(a(s,"topRight","max",h)),[F,xt]=(0,t.useState)(a(s,"bottomRight","value")),[X,bn]=(0,t.useState)(a(s,"bottomRight","unit")),[$t,yn]=(0,t.useState)(a(s,"bottomRight","min",f)),[Tt,wn]=(0,t.useState)(a(s,"bottomRight","max",h)),[j,ft]=(0,t.useState)(a(s,"bottomLeft","value")),[Y,vn]=(0,t.useState)(a(s,"bottomLeft","unit")),[qt,Cn]=(0,t.useState)(a(s,"bottomLeft","min",f)),[Pt,Ln]=(0,t.useState)(a(s,"bottomLeft","max",h)),Bn=(0,t.useCallback)(()=>Lt({value:o,allowFullRounded:x,fullRoundedValue:R,allowOrganic:N,allowMultiple:I}),[o,x,R,N,I]),rt=(0,t.useCallback)(r=>{r!==o&&l(r)},[o,l]);(0,t.useEffect)(()=>{let r=Bn(o);i!==r&&E(r),r==="multiple"&&!C&&S("all"),on(o!=="")},[o]),(0,t.useEffect)(()=>{},[C]);let J=(r,ht,bt,yt,zn)=>{let Ft=ht==="%",jt=Ft?0:f,Ot=Ft?100:h;bt(jt),yt(Ot),tt(r)||zn($(r,jt,Ot))};return(0,t.useEffect)(()=>{J(T,G,sn,an,W)},[G,f,h]),(0,t.useEffect)(()=>{J(q,H,cn,gn,ct)},[H,f,h]),(0,t.useEffect)(()=>{J(P,K,fn,hn,gt)},[K,f,h]),(0,t.useEffect)(()=>{J(F,X,yn,wn,xt)},[X,f,h]),(0,t.useEffect)(()=>{J(j,Y,Cn,Ln,ft)},[Y,f,h]),(0,t.useEffect)(()=>{i==="rounded"&&rt(`${R}px`)},[i,R]),(0,t.useEffect)(()=>{i==="single"&&rt(D(T,G,z,k))},[T,G,i]),(0,t.useEffect)(()=>{it&&i==="organic"&&rt(it)},[it,i]),(0,t.useEffect)(()=>{if(i!=="multiple"||q===null||P===null||F===null||j===null)return;let r=D(q,H,z),ht=D(P,K,z),bt=D(F,X,z),yt=D(j,Y,z);rt(`${r} ${ht} ${bt} ${yt}`)},[q,P,F,j,H,K,X,Y,i]),(0,t.useEffect)(()=>{mt&&mt===C&&S("all"),Z(!1)},[mt]),t.default.createElement(t.default.Fragment,null,t.default.createElement(Rt,null,'VALUE: "',o,'"'),t.default.createElement("div",{...w(b.container,u&&b.highlight,y&&b.disabled)},i==="multiple"&&t.default.createElement("div",{className:"xrvj5dj xnby9oq x1xye2hm xh8yej3"},t.default.createElement(O,{id:n,value:q,unit:H,unitSwitch:v?pn:null,readOnly:p,onEnterKey:d,type:"number",min:kt,max:It,onChange:r=>{ct($(r,kt,It))},setFocus:C==="topLeft",onFocus:()=>S("topLeft"),onBlur:()=>Z("topLeft"),title:e.translate("Carbon.Editor.Styling:Main:topLeft")}),t.default.createElement(O,{value:P,unit:K,unitSwitch:v?xn:null,readOnly:p,onEnterKey:d,type:"number",min:Nt,max:Et,onChange:r=>{gt($(r,Nt,Et))},setFocus:C==="topRight",onFocus:()=>S("topRight"),onBlur:()=>Z("topRight"),title:e.translate("Carbon.Editor.Styling:Main:topRight")}),t.default.createElement(O,{value:j,unit:Y,unitSwitch:v?vn:null,readOnly:p,onEnterKey:d,type:"number",min:qt,max:Pt,onChange:r=>{ft($(r,qt,Pt))},setFocus:C==="bottomLeft",onFocus:()=>S("bottomLeft"),onBlur:()=>Z("bottomLeft"),title:e.translate("Carbon.Editor.Styling:Main:bottomLeft")}),t.default.createElement(O,{value:F,unit:X,unitSwitch:v?bn:null,readOnly:p,onEnterKey:d,type:"number",min:$t,max:Tt,onChange:r=>{xt($(r,$t,Tt))},setFocus:C==="bottomRight",onFocus:()=>S("bottomRight"),onBlur:()=>Z("bottomRight"),title:e.translate("Carbon.Editor.Styling:Main:bottomRight")})),i==="single"&&t.default.createElement(O,{id:n,allowEmpty:k,value:T,unit:G,unitSwitch:v?rn:null,readOnly:p,placeholder:tn,onEnterKey:d,type:"number",min:pt,max:St,setFocus:en,onChange:r=>{if(k&&tt(r)){W("");return}W($(r,pt,St))},onBlur:()=>lt(!1),containerStyle:b.fullInput}),i==="rounded"&&t.default.createElement(at,{id:n,readonly:p,onClick:()=>{E("single"),setTimeout(()=>{lt(!0)},0)}},e.translate("Carbon.Editor.Styling:Main:borderRadius.rounded")),i==="organic"&&t.default.createElement(at,{readonly:p,cursor:"pointer",title:e.translate("Carbon.Editor.Styling:Main:openEditor"),onClick:()=>{_(!0)}},e.translate("Carbon.Editor.Styling:Main:borderRadius.organic")),N&&t.default.createElement(Xt,{open:Bt,setOpen:_,title:e.translate("Carbon.Editor.Styling:Main:borderRadius.organic"),onApply:()=>{_(!1),i!=="organic"&&E("organic"),setTimeout(()=>{un(dn)},10)},onCancel:()=>_(!1)},Bt&&t.default.createElement(t.Suspense,{fallback:t.default.createElement(Vt,{isLoading:!0})},t.default.createElement(kn,{onChange:mn,value:it}))),(I||x)&&t.default.createElement(Ut,{title:e.translate(`Carbon.Editor.Styling:Main:borderRadius.${i}`),readonly:p,headerWidth:12,width:220,header:t.default.createElement(t.default.Fragment,null,i==="multiple"&&t.default.createElement(V,{selected:C}),i==="single"&&t.default.createElement(wt,null),i==="rounded"&&t.default.createElement(ut,null),i==="organic"&&t.default.createElement(V,{organic:!0}))},t.default.createElement(L.Button,{className:"x78zum5 x6s0dn4 xlqzeqv x1iv4zvh xdpxx8g x1nd6s1w",onClick:()=>{if(i==="single"){lt(!0);return}i==="multiple"&&S(null),T===null&&W(pt),E("single"),setTimeout(()=>{lt(!0)},0)}},t.default.createElement(wt,{className:"x6taa2c x1o1nzlu"})," ",e.translate("Carbon.Editor.Styling:Main:borderRadius.single")),x&&t.default.createElement(L.Button,{className:"x78zum5 x6s0dn4 xlqzeqv x1iv4zvh xdpxx8g x1nd6s1w",onClick:()=>{i!=="rounded"&&E("rounded")}},t.default.createElement(ut,{className:"x6taa2c x1o1nzlu"}),e.translate("Carbon.Editor.Styling:Main:borderRadius.rounded")),I&&t.default.createElement(L.Button,{className:"x78zum5 x6s0dn4 xlqzeqv x1iv4zvh xdpxx8g x1nd6s1w",onClick:()=>{if(i==="multiple")return;let r=T||f;S("topLeft"),q===null&&ct(r),P===null&&gt(r),F===null&&xt(r),j===null&&ft(r),setTimeout(()=>E("multiple"),0)}},t.default.createElement(V,{className:"x6taa2c x1o1nzlu",selected:C}),e.translate("Carbon.Editor.Styling:Main:borderRadius.multiple")),N&&t.default.createElement(L.Button,{className:"x78zum5 x6s0dn4 xlqzeqv x1iv4zvh xdpxx8g x1nd6s1w",onClick:()=>{_(!0)}},t.default.createElement(V,{className:"x6taa2c x1o1nzlu",organic:!0}),e.translate("Carbon.Editor.Styling:Main:borderRadius.organic")),k&&!!o&&t.default.createElement(L.Button,{className:"x78zum5 x6s0dn4 xlqzeqv x1iv4zvh xdpxx8g x1nd6s1w",onClick:()=>{W(""),E("single")}},t.default.createElement(L.Icon,{className:"x6taa2c x1o1nzlu",icon:"times"}),e.translate("Carbon.Editor.Styling:Main:borderRadius.empty"))),U&&t.default.createElement(L.Button,{style:"clean",hoverStyle:"clean",title:e.translate(`Carbon.Editor.Styling:Main:${dt?"hide":"show"}BigPreview`),className:w(b.centerContent,b.previewButton,!Mt&&b.previewButtonInvisible).className,onClick:()=>zt(!dt)},t.default.createElement("span",{...w(b.preview(o,i==="rounded"),b.previewSmall)}))),U&&t.default.createElement("div",{...w(b.bigPreviewContainer(Mt?dt:!1))},t.default.createElement(L.Button,{style:"clean",hoverStyle:"clean",title:e.translate("Carbon.Editor.Styling:Main:hideBigPreview"),className:"x1717udv x78zum5 x6s0dn4 xl56j7k xh8yej3 xt7dq6l xb3r6kr x1lrzu1o xzd0ubt",onClick:()=>zt(!1)},t.default.createElement("span",{...w(b.preview(o,i==="rounded"),b.previewBig(i==="rounded"||i==="organic",nn))}))))}var En=(0,Qt.neos)(n=>({i18nRegistry:n.get("i18n"),config:n.get("frontendConfiguration").get("Carbon.Editor.Styling.BorderRadius")})),Qn=En(Nn);export{Qn as default};
