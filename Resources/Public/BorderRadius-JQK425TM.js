import{a as Ut}from"./chunk-DKR3S3OU.js";import{a as tt,b as st,d as $,e as j,f as nt,g as wt,h as _t}from"./chunk-RPILUSZG.js";import{a as Rt}from"./chunk-Z4CIOFZC.js";import{a as At}from"./chunk-VODNI7P4.js";import{b as Zt}from"./chunk-A6XDEK34.js";import{b as z,e as Q,f as L}from"./chunk-XTEK7IIS.js";var t=z(Q(),1),f=z(Rt(),1);var F=z(Q(),1);var Gt=n=>F.default.createElement("span",{className:"xeuugli xlyipyv xb3r6kr x1hld986"},n);function at({id:n,onClick:o,disabled:l,highlight:u,children:d,readonly:e}){return F.default.createElement(F.default.Fragment,null,o&&typeof o=="function"&&!e&&!l?F.default.createElement("button",{type:"button",onClick:o,id:n,className:"x1ghz6dp x1i66d86 x12t7z44 x189eng2 x1wty727 xk07rqz x1cum3z5 xs5loj3 x78zum5 x6s0dn4 xlqzeqv xh8yej3 xdpxx8g xuxw1ft xb3r6kr x1ed109x xip2jzm"},Gt(d)):F.default.createElement("div",{id:n,className:"x1ghz6dp x1i66d86 x12t7z44 x189eng2 x1wty727 xk07rqz x1cum3z5 xs5loj3 x78zum5 x6s0dn4 xlqzeqv xh8yej3 xdpxx8g xuxw1ft xb3r6kr xt0e3qv"},Gt(d)))}var c=z(Q(),1),ot=z(Rt(),1),Wt=z(At(),1);var Ht={dialog:{position:"xixxii4",inset:"x10a8y8t",background:"x978ut8",border:"xa26pp2",padding:"x1717udv",color:"x189eng2",boxShadow:"xe8odd5",animation:"x1ww42s3",":where([open])_::backdrop_animation":"x18ef84f",$$css:!0},title:n=>[{padding:"x1i724xb",paddingInline:null,paddingStart:null,paddingLeft:null,paddingEnd:null,paddingBlock:null,paddingTop:null,paddingBottom:null,paddingRight:(n?"calc(var(--spacing-Full) + var(--spacing-GoldenUnit)":null)==null?null:"x1hb41fa",paddingInlineStart:null,paddingInlineEnd:null,margin:"x1ghz6dp",marginInline:null,marginInlineStart:null,marginLeft:null,marginInlineEnd:null,marginRight:null,marginBlock:null,marginTop:null,marginBottom:null,fontSize:"xwsyq91",lineHeight:"x1u7k74",borderBottom:"xcns5ij",borderBottomWidth:null,borderBottomStyle:null,borderBottomColor:null,$$css:!0},{"--paddingRight":(o=>typeof o=="number"?o+"px":o??void 0)(n?"calc(var(--spacing-Full) + var(--spacing-GoldenUnit)":null)}]},vt=n=>n&&typeof n=="function";function Mn({open:n,setOpen:o,children:l,i18nRegistry:u,onApply:d,onCancel:e,showCloseButton:M,onCloseButton:p,style:w,title:m,applyLabel:N="Neos.Neos:Main:applyChanges",cancelLabel:k="Neos.Neos:Main:cancel",closeLabel:I="Neos.Neos:Main:close"}){let h=(0,c.useRef)(),v=(0,c.useCallback)(()=>{o(!1)},[o]);(0,c.useEffect)(()=>(h.current?.addEventListener("close",v),()=>{h.current?.removeEventListener("close",v)}),[h,v]),(0,c.useEffect)(()=>{h.current&&(n?h.current.showModal():h.current.close())},[n]);let B=vt(d),U=vt(e),et=vt(p);return c.default.createElement("dialog",{ref:h,...L(Ht.dialog,w)},m&&c.default.createElement("h2",{...L(Ht.title(et))},m),l,(B||U)&&c.default.createElement("div",{className:"x78zum5 x7v6yn8 x15zctf7"},B&&c.default.createElement(ot.Button,{style:"success",hoverStyle:"success",onClick:d},u.translate(N)),U&&c.default.createElement(ot.Button,{onClick:e,hoverStyle:"warn"},u.translate(k))),M&&c.default.createElement(ot.IconButton,{icon:"times",style:"clean",title:u.translate(I),onClick:()=>{o(!1),et&&p()},iconProps:{size:"lg"},className:"xj8z8mm x13vifvy x3m8u43"}))}var Sn=(0,Wt.neos)(n=>({i18nRegistry:n.get("i18n")})),Kt=Sn(Mn);var Ct=z(Q(),1);function ut({style:n={},className:o}){return Ct.default.createElement("svg",{style:n,className:o,width:12,height:12,viewBox:"0 0 10 10"},Ct.default.createElement("circle",{stroke:"currentColor",strokeWidth:"1.5",cx:"5",cy:"5",r:"4.25",fill:"none"}))}var x=z(Q(),1);function V({selected:n=null,organic:o=!1,style:l={},className:u}){if(o)return x.default.createElement("svg",{style:l,className:u,xmlns:"http://www.w3.org/2000/svg",width:12,height:12,viewBox:"0 0 10 10"},x.default.createElement("path",{fill:"none",stroke:"currentColor","stroke-width":"1.5",d:"M3 .75c.77459204 0 3.17405897.18543111 4.85534979.90104403.4551161.19371245.85720294.42242467 1.12680357.71643066C9.14201923 2.54181228 9.25 2.7409741 9.25 2.97943128c0 .92400893-1.08920903 2.87728657-2.57136342 4.36379611C5.63032329 8.39462103 4.35060267 9.25 3 9.25c-.2129752 0-.39077651-.11403477-.55225147-.2685897-.29323317-.28066663-.53099861-.697952-.73657258-1.1719939C1.03370869 6.24721534.75 4.07399609.75 3.08217029c0-.61510406.29042874-1.1569223.68649464-1.56383648C1.88315236 1.05944209 2.47513268.75 3 .75Z"}));let e=(0,x.useMemo)(()=>!n||n==="all"?1:.2,[n]),M=(0,x.useMemo)(()=>n==="topLeft"?1:e,[n,e]),p=(0,x.useMemo)(()=>n==="topRight"?1:e,[n,e]),w=(0,x.useMemo)(()=>n==="bottomRight"?1:e,[n,e]),m=(0,x.useMemo)(()=>n==="bottomLeft"?1:e,[n,e]);return x.default.createElement("svg",{style:l,className:u,xmlns:"http://www.w3.org/2000/svg",width:12,height:12,viewBox:"0 0 10 10"},x.default.createElement(nt,{d:"M 2.5 0 C 1.119 0 0 1.119 0 2.5 L 0 4 L 1.5 4 L 1.5 2.5 C 1.5 1.948 1.948 1.5 2.5 1.5 L 4 1.5 L 4 0 Z",opacity:M}),x.default.createElement(nt,{d:"M 10 2.5 C 10 1.119 8.881 0 7.5 0 L 6 0 L 6 1.5 L 7.5 1.5 C 8.052 1.5 8.5 1.948 8.5 2.5 L 8.5 4 L 10 4 Z",opacity:p}),x.default.createElement(nt,{d:"M 7.5 10 C 8.881 10 10 8.881 10 7.5 L 10 6 L 8.5 6 L 8.5 7.5 C 8.5 8.052 8.052 8.5 7.5 8.5 L 6 8.5 L 6 10 Z",opacity:w}),x.default.createElement(nt,{d:"M 0 7.5 C 0 8.881 1.119 10 2.5 10 L 4 10 L 4 8.5 L 2.5 8.5 C 1.948 8.5 1.5 8.052 1.5 7.5 L 1.5 6 L 0 6 Z",opacity:m}))}function Lt({value:n,allowFullRounded:o,fullRoundedValue:l,allowOrganic:u,allowMultiple:d}){if(o&&n&&(n===`${l}px`||n===l))return"rounded";if(typeof n=="string"){if(u&&n.includes("/"))return"organic";if(d&&n.includes(" ")&&n.trim().split(" ").length===4)return"multiple"}return"single"}function Xt(n){return typeof n=="number"?n:typeof n!="string"?null:(0,eval)(n.replaceAll(":","/"))}function A(n,o,l,u=!1){if(tt(n))return u?"":"0";let d=(!o||o==="px")&&l?16:1;o=!o||o==="px"?l?"rem":"px":o;let e=n/d;return e===0?"0":`${e}${o}`}function a(n,o,l,u=null){u===null&&(u=l==="unit"?"px":null);let d=n[o];if(!d)return u;if(!l)return d;let e=d[l];return typeof e<"u"?e:u}function Yt(n){let{value:o,convertPxToRem:l,min:u,max:d,allowPercentage:e,allowEmpty:M}=n,p=Lt(n);if(p==="rounded")return{mode:p};if(p==="organic")return{mode:p,organic:o};if(p==="single"){let m="";return typeof o=="number"?m=st(l?o*16:o,u,d):m=st(o,u,d,e,M),{mode:p,main:m}}let w=o.split(" ").map(m=>st(m,u,d,e));return{mode:p,topLeft:w[0],topRight:w[1],bottomRight:w[2],bottomLeft:w[3]}}var Jt=z(At(),1);var Nn=(0,t.lazy)(()=>import("./OrganicEditor-2D6GT6RE.js")),g={container:{display:"x78zum5",gap:"x1xye2hm",$$css:!0},highlight:{borderRadius:"x1cum3z5",outline:"xus49la",outlineOffset:"x1hl8ikr",$$css:!0},centerContent:{padding:"x1717udv",display:"x78zum5",alignItems:"x6s0dn4",justifyContent:"xl56j7k",$$css:!0},fullInput:{flex:"x98rzlu",flexGrow:null,flexShrink:null,flexBasis:null,$$css:!0},disabled:{cursor:"x1h6gzvc",opacity:"x190dgpg",":where(*)>*_pointerEvents":"xvszx66",$$css:!0},preview:(n,o)=>[{transition:"x1vfmi3i",transitionBehavior:null,transitionDelay:null,transitionDuration:null,transitionProperty:null,transitionTimingFunction:null,background:"x1u657s8",backgroundAttachment:null,backgroundClip:null,backgroundColor:null,backgroundImage:null,backgroundOrigin:null,backgroundPosition:null,backgroundPositionX:null,backgroundPositionY:null,backgroundRepeat:null,backgroundSize:null,height:"xwzfr38",borderRadius:(o?"50%":n)==null?null:"x1kptayx",borderStartStartRadius:null,borderStartEndRadius:null,borderEndStartRadius:null,borderEndEndRadius:null,borderTopLeftRadius:null,borderTopRightRadius:null,borderBottomLeftRadius:null,borderBottomRightRadius:null,$$css:!0},{"--borderRadius":(l=>typeof l=="number"?l+"px":l??void 0)(o?"50%":n)}],previewBig:(n,o)=>[{margin:"xqjkn27",marginInline:null,marginInlineStart:null,marginLeft:null,marginInlineEnd:null,marginRight:null,marginBlock:null,marginTop:null,marginBottom:null,display:"x1lliihq",aspectRatio:(o||null)==null?null:"x1f7gzso",width:(o&&o<3.4?null:n?80:"100%")==null?null:"x1bl4301",height:(!o||o<3.4?80:null)==null?null:"x1f5funs",$$css:!0},{"--aspectRatio":(o||null)??void 0,"--width":(l=>typeof l=="number"?l+"px":l??void 0)(o&&o<3.4?null:n?80:"100%"),"--height":(l=>typeof l=="number"?l+"px":l??void 0)(!o||o<3.4?80:null)}],previewSmall:{aspectRatio:"x1plog1",transform:"x1a33avv",margin:"x1teoei8",marginInline:null,marginInlineStart:null,marginLeft:null,marginInlineEnd:null,marginRight:null,marginBlock:null,marginTop:null,marginBottom:null,$$css:!0},bigPreviewContainer:n=>[{display:"xrvj5dj",gridTemplateRows:(n?"1fr":"0fr")==null?null:"x1lq8ota",transition:"xyi89lb",transitionBehavior:null,transitionDelay:null,transitionDuration:null,transitionProperty:null,transitionTimingFunction:null,$$css:!0},{"--gridTemplateRows":(n?"1fr":"0fr")??void 0}],previewButton:{transition:"x1xad6n5",$$css:!0},previewButtonInvisible:{transition:"x1fma8x5",opacity:"xg01cxk",pointerEvents:"x47corl",marginLeft:"xd2cifw",$$css:!0},dropdown:{width:"x1u9j7jb",alignSelf:"x1y8v6su",$$css:!0}},kn={disabled:!1,readonly:!1,allowEmpty:!1,allowMultiple:!1,allowOrganic:!1,allowFullRounded:!1,allowPercentage:!1,convertPxToRem:!1,preview:!0,previewAspectRatio:null,min:0,max:24,placeholder:"",fullRoundedValue:9999};function In({id:n,value:o,commit:l,highlight:u,options:d,i18nRegistry:e,config:M,onEnterKey:p}){let{disabled:w,readonly:m,allowEmpty:N,allowMultiple:k,allowOrganic:I,allowFullRounded:h,allowPercentage:v,convertPxToRem:B,preview:U,previewAspectRatio:et,min:b,max:y,placeholder:Qt,fullRoundedValue:R}={...kn,...M,...d},tn=Xt(et),s=Yt({value:o,allowPercentage:v,allowEmpty:N,convertPxToRem:B,min:b,max:y,allowFullRounded:h,fullRoundedValue:R,allowOrganic:I,allowMultiple:k}),[i,E]=(0,t.useState)(s.mode),[Bt,Z]=(0,t.useState)(!1),[zt,Mt]=(0,t.useState)(!1),[dt,St]=(0,t.useState)(!1),[Nt,nn]=(0,t.useState)(!0),[C,S]=(0,t.useState)(null),[on,lt]=(0,t.useState)(!1),[en,_]=(0,t.useState)(!1),[mt]=Zt(en,500),[T,G]=(0,t.useState)(a(s,"main","value","")),[H,ln]=(0,t.useState)(a(s,"main","unit")),[pt,rn]=(0,t.useState)(a(s,"main","min",b)),[kt,sn]=(0,t.useState)(a(s,"main","max",y)),[it,an]=(0,t.useState)(a(s,"organic")),[un,dn]=(0,t.useState)(a(s,"organic")),[q,ct]=(0,t.useState)(a(s,"topLeft","value")),[W,mn]=(0,t.useState)(a(s,"topLeft","unit")),[It,pn]=(0,t.useState)(a(s,"topLeft","min",b)),[Et,cn]=(0,t.useState)(a(s,"topLeft","max",y)),[D,xt]=(0,t.useState)(a(s,"topRight","value")),[K,xn]=(0,t.useState)(a(s,"topRight","unit")),[$t,gn]=(0,t.useState)(a(s,"topRight","min",b)),[Tt,fn]=(0,t.useState)(a(s,"topRight","max",y)),[O,gt]=(0,t.useState)(a(s,"bottomRight","value")),[X,hn]=(0,t.useState)(a(s,"bottomRight","unit")),[qt,bn]=(0,t.useState)(a(s,"bottomRight","min",b)),[Dt,yn]=(0,t.useState)(a(s,"bottomRight","max",y)),[P,ft]=(0,t.useState)(a(s,"bottomLeft","value")),[Y,wn]=(0,t.useState)(a(s,"bottomLeft","unit")),[Ot,vn]=(0,t.useState)(a(s,"bottomLeft","min",b)),[Pt,Cn]=(0,t.useState)(a(s,"bottomLeft","max",y)),Ln=(0,t.useCallback)(()=>Lt({value:o,allowFullRounded:h,fullRoundedValue:R,allowOrganic:I,allowMultiple:k}),[o,h,R,I,k]),rt=(0,t.useCallback)(r=>{r!==o&&l(r)},[o,l]);(0,t.useEffect)(()=>{let r=Ln(o);i!==r&&E(r),r==="multiple"&&!C&&S("all"),nn(o!=="")},[o]),(0,t.useEffect)(()=>{},[C]);let J=(r,ht,bt,yt,Bn)=>{let jt=ht==="%",Ft=jt?0:b,Vt=jt?100:y;bt(Ft),yt(Vt),tt(r)||Bn($(r,Ft,Vt))};return(0,t.useEffect)(()=>{J(T,H,rn,sn,G)},[H,b,y]),(0,t.useEffect)(()=>{J(q,W,pn,cn,ct)},[W,b,y]),(0,t.useEffect)(()=>{J(D,K,gn,fn,xt)},[K,b,y]),(0,t.useEffect)(()=>{J(O,X,bn,yn,gt)},[X,b,y]),(0,t.useEffect)(()=>{J(P,Y,vn,Cn,ft)},[Y,b,y]),(0,t.useEffect)(()=>{i==="rounded"&&rt(`${R}px`)},[i,R]),(0,t.useEffect)(()=>{i==="single"&&rt(A(T,H,B,N))},[T,H,i]),(0,t.useEffect)(()=>{it&&i==="organic"&&rt(it)},[it,i]),(0,t.useEffect)(()=>{if(i!=="multiple"||q===null||D===null||O===null||P===null)return;let r=A(q,W,B),ht=A(D,K,B),bt=A(O,X,B),yt=A(P,Y,B);rt(`${r} ${ht} ${bt} ${yt}`)},[q,D,O,P,W,K,X,Y,i]),(0,t.useEffect)(()=>{mt&&mt===C&&S("all"),_(!1)},[mt]),t.default.createElement(t.default.Fragment,null,t.default.createElement(_t,null,"VALUE: ",o),t.default.createElement("div",{...L(g.container,u&&g.highlight,w&&g.disabled)},i==="multiple"&&t.default.createElement("div",{className:"xrvj5dj xnby9oq x1xye2hm xh8yej3"},t.default.createElement(j,{id:n,value:q,unit:W,unitSwitch:v?mn:null,readOnly:m,onEnterKey:p,type:"number",min:It,max:Et,onChange:r=>{ct($(r,It,Et))},setFocus:C==="topLeft",onFocus:()=>S("topLeft"),onBlur:()=>_("topLeft"),title:e.translate("Carbon.Editor.Styling:Main:topLeft")}),t.default.createElement(j,{value:D,unit:K,unitSwitch:v?xn:null,readOnly:m,onEnterKey:p,type:"number",min:$t,max:Tt,onChange:r=>{xt($(r,$t,Tt))},setFocus:C==="topRight",onFocus:()=>S("topRight"),onBlur:()=>_("topRight"),title:e.translate("Carbon.Editor.Styling:Main:topRight")}),t.default.createElement(j,{value:P,unit:Y,unitSwitch:v?wn:null,readOnly:m,onEnterKey:p,type:"number",min:Ot,max:Pt,onChange:r=>{ft($(r,Ot,Pt))},setFocus:C==="bottomLeft",onFocus:()=>S("bottomLeft"),onBlur:()=>_("bottomLeft"),title:e.translate("Carbon.Editor.Styling:Main:bottomLeft")}),t.default.createElement(j,{value:O,unit:X,unitSwitch:v?hn:null,readOnly:m,onEnterKey:p,type:"number",min:qt,max:Dt,onChange:r=>{gt($(r,qt,Dt))},setFocus:C==="bottomRight",onFocus:()=>S("bottomRight"),onBlur:()=>_("bottomRight"),title:e.translate("Carbon.Editor.Styling:Main:bottomRight")})),i==="single"&&t.default.createElement(j,{id:n,allowEmpty:N,value:T,unit:H,unitSwitch:v?ln:null,readOnly:m,placeholder:Qt,onEnterKey:p,type:"number",min:pt,max:kt,setFocus:on,onChange:r=>{if(N&&tt(r)){G("");return}G($(r,pt,kt))},onBlur:()=>lt(!1),containerStyle:g.fullInput}),i==="rounded"&&t.default.createElement(at,{id:n,readonly:m,onClick:()=>{E("single"),setTimeout(()=>{lt(!0)},0)}},e.translate("Carbon.Editor.Styling:Main:borderRadius.rounded")),i==="organic"&&t.default.createElement(at,{readonly:m,onClick:()=>{Z(!0)}},e.translate("Carbon.Editor.Styling:Main:borderRadius.organic")),I&&t.default.createElement(Kt,{open:Bt,setOpen:Z,title:e.translate("Carbon.Editor.Styling:Main:borderRadius.organic"),onApply:()=>{Z(!1),i!=="organic"&&E("organic"),setTimeout(()=>{an(un)},10)},onCancel:()=>Z(!1)},Bt&&t.default.createElement(t.Suspense,{fallback:t.default.createElement(Ut,{isLoading:!0})},t.default.createElement(Nn,{onChange:dn,value:it}))),(k||h)&&t.default.createElement(f.DropDown.Stateless,{title:e.translate(`Carbon.Editor.Styling:Main:borderRadius.${i}`),className:L(g.dropdown,m&&g.disabled).className,isOpen:zt,onToggle:()=>Mt(!zt),onClose:()=>Mt(!1)},t.default.createElement(f.DropDown.Header,{className:"x1n2onr6"},i==="multiple"&&t.default.createElement(V,{selected:C}),i==="single"&&t.default.createElement(wt,null),i==="rounded"&&t.default.createElement(ut,null),i==="organic"&&t.default.createElement(V,{organic:!0})),t.default.createElement(f.DropDown.Contents,{className:"x3m8u43 xvcle9j x1cxt36h x11tiu5i"},t.default.createElement(f.Button,{className:"x78zum5 x6s0dn4 xlqzeqv x1iv4zvh xdpxx8g",onClick:()=>{if(i==="single"){lt(!0);return}i==="multiple"&&S(null),T===null&&G(pt),E("single"),setTimeout(()=>{lt(!0)},0)}},t.default.createElement(wt,{className:"x6taa2c x1o1nzlu"})," ",e.translate("Carbon.Editor.Styling:Main:borderRadius.single")),h&&t.default.createElement(f.Button,{className:"x78zum5 x6s0dn4 xlqzeqv x1iv4zvh xdpxx8g",onClick:()=>{i!=="rounded"&&E("rounded")}},t.default.createElement(ut,{className:"x6taa2c x1o1nzlu"}),e.translate("Carbon.Editor.Styling:Main:borderRadius.rounded")),k&&t.default.createElement(f.Button,{className:"x78zum5 x6s0dn4 xlqzeqv x1iv4zvh xdpxx8g",onClick:()=>{if(i==="multiple")return;let r=T||b;S("topLeft"),q===null&&ct(r),D===null&&xt(r),O===null&&gt(r),P===null&&ft(r),setTimeout(()=>E("multiple"),0)}},t.default.createElement(V,{className:"x6taa2c x1o1nzlu",selected:C}),e.translate("Carbon.Editor.Styling:Main:borderRadius.multiple")),I&&t.default.createElement(f.Button,{className:"x78zum5 x6s0dn4 xlqzeqv x1iv4zvh xdpxx8g",onClick:()=>{Z(!0)}},t.default.createElement(V,{className:"x6taa2c x1o1nzlu",organic:!0}),e.translate("Carbon.Editor.Styling:Main:borderRadius.organic")),N&&!!o&&t.default.createElement(f.Button,{className:"x78zum5 x6s0dn4 xlqzeqv x1iv4zvh xdpxx8g",onClick:()=>{G(""),E("single")}},t.default.createElement(f.Icon,{className:"x6taa2c x1o1nzlu",icon:"times"}),e.translate("Carbon.Editor.Styling:Main:borderRadius.empty")))),U&&t.default.createElement(f.Button,{style:"clean",hoverStyle:"clean",title:e.translate(`Carbon.Editor.Styling:Main:${dt?"hide":"show"}BigPreview`),className:L(g.centerContent,g.previewButton,!Nt&&g.previewButtonInvisible).className,onClick:()=>St(!dt)},t.default.createElement("span",{...L(g.preview(o,i==="rounded"),g.previewSmall)}))),U&&t.default.createElement("div",{...L(g.bigPreviewContainer(Nt?dt:!1))},t.default.createElement(f.Button,{style:"clean",hoverStyle:"clean",title:e.translate("Carbon.Editor.Styling:Main:hideBigPreview"),className:"x1717udv x78zum5 x6s0dn4 xl56j7k xh8yej3 xt7dq6l xb3r6kr x1lrzu1o xzd0ubt",onClick:()=>St(!1)},t.default.createElement("span",{...L(g.preview(o,i==="rounded"),g.previewBig(i==="rounded"||i==="organic",tn))}))))}var En=(0,Jt.neos)(n=>({i18nRegistry:n.get("i18n"),config:n.get("frontendConfiguration").get("Carbon.Editor.Styling.BorderRadius")})),Jn=En(In);export{Jn as default};
