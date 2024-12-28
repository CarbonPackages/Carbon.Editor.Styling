import{a as G}from"./chunk-VFSN64I5.js";import{a as U}from"./chunk-D6U3ZOA4.js";import{a as V}from"./chunk-6KYEVQ6F.js";import{b as T,d as x,e as j}from"./chunk-WSLQOXBM.js";import"./chunk-A6XDEK34.js";import{a as D}from"./chunk-J4O3TCVP.js";import{a as W}from"./chunk-Z4CIOFZC.js";import"./chunk-VODNI7P4.js";import{b as O,e as Q,f as L}from"./chunk-XTEK7IIS.js";var t=O(Q(),1),a=O(W(),1);function K({value:e,min:r,max:c,allowPercentage:b,allowContain:S,allowAuto:o,allowCover:C}){if(o&&e==="auto")return{mode:"auto"};if(S&&e==="contain")return{mode:"contain"};if(C&&e==="cover")return{mode:"cover"};let{value:h,unit:v}=T(e,r,c,b,!1);return{mode:v,size:h}}var u={container:{display:"editorstyling-78zum5",gap:"editorstyling-1xye2hm",$$css:!0},inputContainer:{flex:"editorstyling-98rzlu",flexGrow:null,flexShrink:null,flexBasis:null,$$css:!0},highlight:{borderRadius:"editorstyling-1cum3z5",outline:"editorstyling-us49la",outlineOffset:"editorstyling-1hl8ikr",$$css:!0},disabled:{cursor:"editorstyling-1h6gzvc",opacity:"editorstyling-190dgpg",":where(*)>*_pointerEvents":"editorstyling-vszx66",$$css:!0}},X={disabled:!1,readonly:!1,placeholder:"",min:1,max:null,allowPixel:!0,allowPercentage:!0,allowContain:!0,allowAuto:!0,allowCover:!0};function Y({id:e,value:r,commit:c,options:b,highlight:S,i18nRegistry:o,onEnterKey:C,config:h}){let{disabled:v,readonly:I,placeholder:Z,min:g,max:m,allowPixel:p,allowPercentage:d,allowContain:w,allowAuto:k,allowCover:E}={...X,...h,...b},[i,l]=(0,t.useState)(null),[_,M]=(0,t.useState)(null),[s,y]=(0,t.useState)(null),[F,N]=(0,t.useState)(null),[H,$]=(0,t.useState)(null),[B,f]=(0,t.useState)(null),q=[p||d,w,k,E].filter(Boolean).length,z=(0,t.useCallback)(n=>{n!==r&&c(n)},[r,c]);return(0,t.useEffect)(()=>{let n=K({value:r,min:g,max:m,allowPercentage:d,allowContain:w,allowAuto:k,allowCover:E});M(n.mode==="px"?"px":"%"),l(n.mode);let A=n.mode=="%"?1:g,P=n.mode=="%"?100:m,J=x(n.size||100,A,P);y(J),N(A),$(P),f(n.mode==="px"||n.mode==="%")},[]),(0,t.useEffect)(()=>{if(i==="%"){M(i),N(1),$(100);let n=x(s,1,100);y(n),z(`${n}${i}`),f(!0);return}if(i==="px"){M(i),N(g),$(m);let n=x(s,g,m);y(n),z(`${n}${i}`),f(!0);return}z(i),f(!1)},[i]),(0,t.useEffect)(()=>{(i==="%"||i==="px")&&z(`${s}${i}`)},[s]),q?t.default.createElement(t.default.Fragment,null,t.default.createElement(V,null,'VALUE: "',r,'" SIZE "',s,'"'),t.default.createElement("div",{...L(u.container,S&&u.highlight,v&&u.disabled)},(d||p)&&B&&t.default.createElement(j,{id:e,value:s,unit:_,unitSwitch:d&&p?l:null,onChange:y,readOnly:I,onEnterKey:C,placeholder:Z,type:"number",min:F,max:H,containerStyle:u.inputContainer}),!B&&t.default.createElement(G,{id:e,style:u.inputContainer},i),q>1&&t.default.createElement(U,{title:o.translate(`Carbon.Editor.Styling:Main:backgroundSize.${B?"length":i}.description`),readonly:I,width:165,header:o.translate(`Carbon.Editor.Styling:Main:backgroundSize.${i}`)},p&&t.default.createElement(a.Button,{title:o.translate("Carbon.Editor.Styling:Main:backgroundSize.length.description"),className:"editorstyling-78zum5 editorstyling-6s0dn4 editorstyling-lqzeqv editorstyling-1iv4zvh editorstyling-dpxx8g editorstyling-1nd6s1w",onClick:()=>{l("px")}},o.translate("Carbon.Editor.Styling:Main:backgroundSize.px")),d&&t.default.createElement(a.Button,{title:o.translate("Carbon.Editor.Styling:Main:backgroundSize.length.description"),className:"editorstyling-78zum5 editorstyling-6s0dn4 editorstyling-lqzeqv editorstyling-1iv4zvh editorstyling-dpxx8g editorstyling-1nd6s1w",onClick:()=>l("%")},o.translate("Carbon.Editor.Styling:Main:backgroundSize.%")),E&&t.default.createElement(a.Button,{title:o.translate("Carbon.Editor.Styling:Main:backgroundSize.cover.description"),className:"editorstyling-78zum5 editorstyling-6s0dn4 editorstyling-lqzeqv editorstyling-1iv4zvh editorstyling-dpxx8g editorstyling-1nd6s1w",onClick:()=>l("cover")},o.translate("Carbon.Editor.Styling:Main:backgroundSize.cover")),w&&t.default.createElement(a.Button,{title:o.translate("Carbon.Editor.Styling:Main:backgroundSize.contain.description"),className:"editorstyling-78zum5 editorstyling-6s0dn4 editorstyling-lqzeqv editorstyling-1iv4zvh editorstyling-dpxx8g editorstyling-1nd6s1w",onClick:()=>l("contain")},o.translate("Carbon.Editor.Styling:Main:backgroundSize.contain")),k&&t.default.createElement(a.Button,{title:o.translate("Carbon.Editor.Styling:Main:backgroundSize.auto.description"),className:"editorstyling-78zum5 editorstyling-6s0dn4 editorstyling-lqzeqv editorstyling-1iv4zvh editorstyling-dpxx8g editorstyling-1nd6s1w",onClick:()=>l("auto")},o.translate("Carbon.Editor.Styling:Main:backgroundSize.auto"))))):(console.error("Invalid configuration. At least one type (allowPixel, allowPercentage, allowContain, allowAuto, allowCover) must be true."),null)}var R=D(Y,"BackgroundSize");export{R as default};
