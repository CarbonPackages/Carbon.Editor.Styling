import{a as X,b as pt}from"./chunk-JQETQMXE.js";import{a as mt}from"./chunk-EESAP4ZS.js";import{a as _,c as lt,d as et,e as V}from"./chunk-LCCCA64G.js";import{b as ot}from"./chunk-FC4SZN46.js";import{a as ct}from"./chunk-OKWCE4O7.js";import{a as Ct}from"./chunk-RFQFEKRW.js";import"./chunk-FMJLVUCX.js";import{b as nt,e as gt,f as S}from"./chunk-6B2QUEPG.js";var n=nt(gt(),1),q=nt(Ct(),1);var j=nt(gt(),1);function rt({selected:l=null,synced:o=!1,useSyncValue:y=!1,directions:u,style:C}){let a=!l||l==="all"?1:.2,i=l==="top"||l==="bottom"&&(o==="y"||o==="xy"),b=l==="right"||l==="left"&&(o==="x"||o==="xy"),g=l==="bottom"||l==="top"&&(o==="y"||o==="xy"),f=l==="left"||l==="right"&&(o==="x"||o==="xy"),k=i?1:a,R=b?1:a,P=g?1:a,h=f?1:a;return j.default.createElement("svg",{style:C,xmlns:"http://www.w3.org/2000/svg",width:14,height:14,viewBox:"0 0 12 12"},u.top&&j.default.createElement(X,{d:"M 3 0.75 C 3 0.336 3.336 0 3.75 0 L 8.25 0 C 8.664 0 9 0.336 9 0.75 L 9 0.75 C 9 1.164 8.664 1.5 8.25 1.5 L 3.75 1.5 C 3.336 1.5 3 1.164 3 0.75 Z",opacity:k}),u.right&&j.default.createElement(X,{d:"M 10.5 3.75 C 10.5 3.336 10.836 3 11.25 3 L 11.25 3 C 11.664 3 12 3.336 12 3.75 L 12 8.25 C 12 8.664 11.664 9 11.25 9 L 11.25 9 C 10.836 9 10.5 8.664 10.5 8.25 Z",opacity:R}),u.bottom&&j.default.createElement(X,{d:"M 3 11.25 C 3 10.836 3.336 10.5 3.75 10.5 L 8.25 10.5 C 8.664 10.5 9 10.836 9 11.25 L 9 11.25 C 9 11.664 8.664 12 8.25 12 L 3.75 12 C 3.336 12 3 11.664 3 11.25 Z",opacity:P}),u.left&&j.default.createElement(X,{d:"M 0 3.75 C 0 3.336 0.336 3 0.75 3 L 0.75 3 C 1.164 3 1.5 3.336 1.5 3.75 L 1.5 8.25 C 1.5 8.664 1.164 9 0.75 9 L 0.75 9 C 0.336 9 0 8.664 0 8.25 Z",opacity:h}))}function yt({value:l,min:o,max:y,allowEmpty:u,allowMultiple:C,allowSync:d}){if(typeof l=="number")return{main:lt(l,o,y)};if(_(l))return{main:u?null:o};let a=l.split(" ").map(R=>lt(R,o,y));if(!C||a.length==1)return{main:a[0]};let[i,b,g,f]=a;switch(a.length){case 2:return{top:i,right:b,bottom:i,left:b,synced:d&&"xy"};case 3:return{top:i,right:b,bottom:g,left:b,synced:d&&"x"}}let k=d?(f===b?"x":"")+(i===g?"y":""):null;return{top:i,right:b,bottom:g,left:f,synced:k||null}}function bt({allowMultiple:l,allowSync:o}){let y=typeof l=="string",u={top:y?l.includes("top"):l,right:y?l.includes("right"):l,bottom:y?l.includes("bottom"):l,left:y?l.includes("left"):l},C=u.top&&u.bottom,d=o&&u.left&&u.right,a=o&&C,i=C&&(u.left||u.right)?"segmentedGridAll":"segmentedGridTwoLinesTopBottom";return!u.top&&!u.bottom&&(i="segmentedGridOneLine"),!C&&i=="segmentedGridTwoLinesTopBottom"&&(i=u.top?"segmentedGridTwoLinesTop":"segmentedGridTwoLinesBottom"),(a&&i==="segmentedGridTwoLinesTopBottom"||d&&i==="segmentedGridOneLine")&&(i+="Sync"),{multipleDirections:u,allowSyncX:d,allowSyncY:a,segmentedGrid:i}}var z=l=>typeof l=="number"?l:null;var kt={disabled:!1,readonly:!1,allowEmpty:!1,allowMultiple:!1,allowSync:!0,convertPxToRem:!1,min:0,max:null,placeholder:""};function Tt({id:l,value:o,commit:y,highlight:u,options:C,i18nRegistry:d,config:a,onEnterKey:i}){let{disabled:b,readonly:g,allowEmpty:f,allowMultiple:k,allowSync:R,convertPxToRem:P,min:h,max:$,placeholder:ft}={...kt,...a,...C},v=yt({value:o,min:h,max:$,allowEmpty:f,allowMultiple:k,allowSync:R}),{multipleDirections:c,allowSyncX:Z,allowSyncY:K,segmentedGrid:W}=bt({allowMultiple:k,allowSync:R}),it=(0,n.useCallback)(t=>k&&typeof t=="string"&&o.includes(" ")?"multiple":"single",[k,o]),[m,T]=(0,n.useState)(null),[ht,J]=(0,n.useState)(!1),[xt,F]=(0,n.useState)(!1),[Q]=ot(xt,500),[s,tt]=(0,n.useState)(it(o)),[G,ut]=(0,n.useState)(z(v?.main)),[O,U]=(0,n.useState)(z(v?.top)),[M,Y]=(0,n.useState)(z(v?.right)),[N,D]=(0,n.useState)(z(v?.bottom)),[A,H]=(0,n.useState)(z(v?.left)),[B,St]=(0,n.useState)(v?.synced),[e]=ot(B,1e3),L=(0,n.useCallback)(t=>et(t,h,$),[o,h,$,et]),E=(0,n.useCallback)(t=>{t!==o&&y(t)},[o,y]),p=(0,n.useCallback)(t=>{let x=P?"rem":"px",w=P?16:1,I=L(t)/w;return I==0?"0":`${I}${x}`},[P,L]),dt=(0,n.useCallback)(()=>{if(s==="single"){if(!_(G)){E(p(G));return}f&&E("")}},[G,s,_,E,p,f]),st=(0,n.useCallback)(()=>{if(s!=="multiple")return;let t=c.left?A:0,x=c.right?M:0,w=c.top?O:0,I=c.bottom?N:0,at=t===x;if(at&&w===I){E(`${p(w)} ${p(t)}`);return}if(at){E(`${p(w)} ${p(t)} ${p(I)}`);return}E(`${p(w)} ${p(x)} ${p(I)} ${p(t)}`)},[s,E,p,O,M,N,A]);return(0,n.useEffect)(()=>{let t=it(o);s!==t&&tt(t),t==="multiple"&&!m&&T("all")},[o]),(0,n.useEffect)(()=>{if(s==="single"){dt();return}st()},[s]),(0,n.useEffect)(dt,[G]),(0,n.useEffect)(st,[O,M,N,A]),(0,n.useEffect)(()=>{(e=="y"||e=="xy")&&D(O),(e=="x"||e=="xy")&&Y(A)},[e]),(0,n.useEffect)(()=>{Q&&Q==m&&T("all"),F(!1)},[Q]),n.default.createElement(n.default.Fragment,null,n.default.createElement(mt,null,"VALUE: `",o,"`"),n.default.createElement("div",{...S(r.container,u&&r.highlight,b&&r.disabled)},s==="multiple"?n.default.createElement("div",{...S(r.segmentedGrid,r[W])},c.top&&n.default.createElement(V,{containerStyle:r.area("top"),id:l,value:O,unit:"px",readOnly:g,onEnterKey:i,type:"number",min:h,max:$,title:d.translate("Carbon.Editor.Styling:Main:top"),onChange:t=>{(e=="y"||e=="xy")&&D(t)},onChangeDebounced:t=>{t=L(t),U(t),(e=="y"||e=="xy")&&D(t)},setFocus:m=="top",fakeFocus:m=="bottom"&&(e=="y"||e=="xy"),onFocus:()=>T("top"),onBlur:()=>F("top")}),c.right&&n.default.createElement(V,{containerStyle:r.area("right"),value:M,unit:"px",readOnly:g,onEnterKey:i,type:"number",min:h,max:$,title:d.translate("Carbon.Editor.Styling:Main:right"),onChange:t=>{(e=="x"||e=="xy")&&H(t)},onChangeDebounced:t=>{t=L(t),Y(t),(e=="x"||e=="xy")&&H(t)},setFocus:m=="right",fakeFocus:m=="left"&&(e=="x"||e=="xy"),onFocus:()=>T("right"),onBlur:()=>F("right")}),c.bottom&&n.default.createElement(V,{containerStyle:r.area("bottom"),value:N,unit:"px",readOnly:g,onEnterKey:i,type:"number",min:h,max:$,title:d.translate("Carbon.Editor.Styling:Main:bottom"),onChange:t=>{(e=="y"||e=="xy")&&U(t)},onChangeDebounced:t=>{t=L(t),D(t),(e=="y"||e=="xy")&&U(t)},setFocus:m=="bottom",fakeFocus:m=="top"&&(e=="y"||e=="xy"),onFocus:()=>T("bottom"),onBlur:()=>F("bottom")}),c.left&&n.default.createElement(V,{containerStyle:r.area("left"),value:A,unit:"px",readOnly:g,onEnterKey:i,type:"number",min:h,max:$,title:d.translate("Carbon.Editor.Styling:Main:left"),onChange:t=>{(e=="x"||e=="xy")&&Y(t)},onChangeDebounced:t=>{t=L(t),H(t),(e=="x"||e=="xy")&&Y(t)},setFocus:m=="left",fakeFocus:m=="right"&&(e=="x"||e=="xy"),onFocus:()=>T("left"),onBlur:()=>F("left")}),(Z||K)&&n.default.createElement("button",{type:"button",...S(r.area("middle"),r.syncButton,W=="segmentedGridTwoLinesTopBottomSync"&&r.syncButtonRight),title:d.translate("Carbon.Editor.Styling:Main:snycValues"),onClick:()=>{let t=Z?["x"]:[];K&&t.push("y"),Z&&K&&t.push("xy"),t.push(null);let w=(t.indexOf(B)+1)%t.length;St(t[w])}},Z&&(B=="x"||B=="xy")&&n.default.createElement("span",{className:"editorstyling-1bkgwmd editorstyling-jm9jq1 editorstyling-h8yej3"}),K&&(B=="y"||B=="xy")&&n.default.createElement("span",{...S(W=="segmentedGridTwoLinesTopBottomSync"?r.syncLineYRight:r.syncLineY)}),n.default.createElement("span",{className:"editorstyling-978ut8 editorstyling-1cv66ky editorstyling-121bxxz"}),n.default.createElement(q.Icon,{icon:B?"lock":"lock-open"}))):n.default.createElement(V,{id:l,value:G,unit:"px",readOnly:g,placeholder:ft,onEnterKey:i,type:"number",min:h,max:$,setFocus:ht,allowEmpty:f,onChange:t=>{if(f&&_(t)){ut(null);return}ut(L(t))},onBlur:()=>J(!1),containerStyle:r.fullInput}),k&&n.default.createElement("div",{...S(r.container,s=="multiple"&&W!="segmentedGridOneLine"&&W!="segmentedGridOneLineSync"&&r.flexColumn)},n.default.createElement(q.Button,{onClick:()=>{if(s=="multiple"){T(null),tt("single"),setTimeout(()=>{J(!0)},0);return}J(!0)},title:d.translate("Carbon.Editor.Styling:Main:globalSpacing"),className:S(r.svgButton(s=="single"),r.centerContent,g&&r.readonly).className},n.default.createElement(pt,{selected:m,style:S(r.svgButton(s=="single")).style})),n.default.createElement(q.Button,{onClick:()=>{let t=[];if(c.top&&t.push("top"),c.right&&t.push("right"),c.bottom&&t.push("bottom"),c.left&&t.push("left"),s=="multiple"){let I=(t.indexOf(m)+1)%t.length;T(t[I]);return}let x=G;T(t[0]),O==null&&U(x),M==null&&Y(x),N==null&&D(x),A==null&&H(x),setTimeout(()=>{tt("multiple")},10)},title:d.translate("Carbon.Editor.Styling:Main:spacingPerSide"),className:S(r.svgButton(s=="multiple"),r.centerContent,g&&r.readonly).className},n.default.createElement(rt,{selected:m,synced:B,directions:c,style:S(r.svgButton(s=="multiple")).style})))))}var r={container:{display:"editorstyling-78zum5",gap:"editorstyling-1xye2hm",rowGap:null,columnGap:null,$$css:!0},flexColumn:{flexDirection:"editorstyling-dt5ytf",$$css:!0},highlight:{borderRadius:"editorstyling-1cum3z5",borderStartStartRadius:null,borderStartEndRadius:null,borderEndStartRadius:null,borderEndEndRadius:null,borderTopLeftRadius:null,borderTopRightRadius:null,borderBottomLeftRadius:null,borderBottomRightRadius:null,outline:"editorstyling-us49la",outlineColor:null,outlineStyle:null,outlineWidth:null,outlineOffset:"editorstyling-1hl8ikr",$$css:!0},segmentedGrid:{display:"editorstyling-rvj5dj",gap:"editorstyling-1xye2hm",rowGap:null,columnGap:null,width:"editorstyling-h8yej3",$$css:!0},segmentedGridAll:{gridTemplate:"editorstyling-ta5h8n",gridTemplateAreas:null,gridTemplateColumns:null,gridTemplateRows:null,$$css:!0},segmentedGridOneLineSync:{gridTemplate:"editorstyling-6xo9ff",gridTemplateAreas:null,gridTemplateColumns:null,gridTemplateRows:null,$$css:!0},segmentedGridOneLine:{gridTemplate:"editorstyling-64cf21",gridTemplateAreas:null,gridTemplateColumns:null,gridTemplateRows:null,$$css:!0},segmentedGridTwoLinesTop:{gridTemplate:"editorstyling-1hf54hz",gridTemplateAreas:null,gridTemplateColumns:null,gridTemplateRows:null,$$css:!0},segmentedGridTwoLinesBottom:{gridTemplate:"editorstyling-1303eka",gridTemplateAreas:null,gridTemplateColumns:null,gridTemplateRows:null,$$css:!0},segmentedGridTwoLinesTopBottom:{gridTemplate:"editorstyling-1bhg26w",gridTemplateAreas:null,gridTemplateColumns:null,gridTemplateRows:null,$$css:!0},segmentedGridTwoLinesTopBottomSync:{gridTemplate:"editorstyling-u5a8wy",gridTemplateAreas:null,gridTemplateColumns:null,gridTemplateRows:null,$$css:!0},area:l=>[{gridArea:l==null?null:"editorstyling-2pxa8s",gridRow:null,gridRowStart:null,gridRowEnd:null,gridColumn:null,gridColumnStart:null,gridColumnEnd:null,$$css:!0},{"--gridArea":l??void 0}],syncButton:{display:"editorstyling-rvj5dj",background:"editorstyling-978ut8",backgroundAttachment:null,backgroundClip:null,backgroundColor:null,backgroundImage:null,backgroundOrigin:null,backgroundPosition:null,backgroundPositionX:null,backgroundPositionY:null,backgroundRepeat:null,backgroundSize:null,color:"editorstyling-189eng2",cursor:"editorstyling-1ypdohk",border:"editorstyling-1wty727",borderWidth:null,borderInlineWidth:null,borderInlineStartWidth:null,borderLeftWidth:null,borderInlineEndWidth:null,borderRightWidth:null,borderBlockWidth:null,borderTopWidth:null,borderBottomWidth:null,borderStyle:null,borderInlineStyle:null,borderInlineStartStyle:null,borderLeftStyle:null,borderInlineEndStyle:null,borderRightStyle:null,borderBlockStyle:null,borderTopStyle:null,borderBottomStyle:null,borderColor:null,borderInlineColor:null,borderInlineStartColor:null,borderLeftColor:null,borderInlineEndColor:null,borderRightColor:null,borderBlockColor:null,borderTopColor:null,borderBottomColor:null,padding:"editorstyling-1717udv",paddingInline:null,paddingStart:null,paddingLeft:null,paddingEnd:null,paddingRight:null,paddingBlock:null,paddingTop:null,paddingBottom:null,borderRadius:"editorstyling-2u8bby",borderStartStartRadius:null,borderStartEndRadius:null,borderEndStartRadius:null,borderEndEndRadius:null,borderTopLeftRadius:null,borderTopRightRadius:null,borderBottomLeftRadius:null,borderBottomRightRadius:null,gridTemplate:"editorstyling-nxdyar",gridTemplateAreas:null,gridTemplateColumns:null,gridTemplateRows:null,placeItems:"editorstyling-1ku5rj1",alignItems:null,justifyItems:null,fill:"editorstyling-117rol3",":where(:hover,:focus)_color":"editorstyling-1sv5n3t",":where(:hover,:focus)_outline":"editorstyling-1curdr6",":where(:hover,:focus)_outlineColor":null,":where(:hover,:focus)_outlineOffset":null,":where(:hover,:focus)_outlineStyle":null,":where(:hover,:focus)_outlineWidth":null,":focus-visible_outline":"editorstyling-vvq1ej",":focus-visible_outlineColor":null,":focus-visible_outlineOffset":null,":focus-visible_outlineStyle":null,":focus-visible_outlineWidth":null,":where(*)>*_gridArea":"editorstyling-1ly45rb",":where(*)>*_gridRow":null,":where(*)>*_gridRowStart":null,":where(*)>*_gridRowEnd":null,":where(*)>*_gridColumn":null,":where(*)>*_gridColumnStart":null,":where(*)>*_gridColumnEnd":null,$$css:!0},syncButtonRight:{height:"editorstyling-mydgjh",alignSelf:"editorstyling-amitd3",$$css:!0},syncLineBackground:{background:"editorstyling-978ut8",backgroundAttachment:null,backgroundClip:null,backgroundColor:null,backgroundImage:null,backgroundOrigin:null,backgroundPosition:null,backgroundPositionX:null,backgroundPositionY:null,backgroundRepeat:null,backgroundSize:null,height:"editorstyling-1cv66ky",width:"editorstyling-121bxxz",$$css:!0},syncLineX:{background:"editorstyling-1bkgwmd",backgroundAttachment:null,backgroundClip:null,backgroundColor:null,backgroundImage:null,backgroundOrigin:null,backgroundPosition:null,backgroundPositionX:null,backgroundPositionY:null,backgroundRepeat:null,backgroundSize:null,height:"editorstyling-jm9jq1",width:"editorstyling-h8yej3",$$css:!0},syncLineYRight:{border:"editorstyling-18zzzau",borderWidth:null,borderInlineWidth:null,borderRightWidth:null,borderBlockWidth:null,borderTopWidth:null,borderBottomWidth:null,borderStyle:null,borderInlineStyle:null,borderRightStyle:null,borderBlockStyle:null,borderTopStyle:null,borderBottomStyle:null,borderColor:null,borderInlineColor:null,borderRightColor:null,borderBlockColor:null,borderTopColor:null,borderBottomColor:null,background:"editorstyling-1md70p1",backgroundAttachment:null,backgroundClip:null,backgroundColor:null,backgroundImage:null,backgroundOrigin:null,backgroundPosition:null,backgroundPositionX:null,backgroundPositionY:null,backgroundRepeat:null,backgroundSize:null,height:"editorstyling-5yr21d",width:"editorstyling-17tiq77",borderLeft:"editorstyling-wqakj",borderLeftWidth:null,borderInlineStartWidth:null,borderInlineEndWidth:null,borderLeftStyle:null,borderInlineStartStyle:null,borderInlineEndStyle:null,borderLeftColor:null,borderInlineStartColor:null,borderInlineEndColor:null,marginLeft:"editorstyling-5jszgg",marginInlineStart:null,marginInlineEnd:null,borderTopRightRadius:"editorstyling-ja2y4p",borderStartStartRadius:null,borderStartEndRadius:null,borderBottomRightRadius:"editorstyling-ra8837",borderEndStartRadius:null,borderEndEndRadius:null,$$css:!0},syncLineY:{background:"editorstyling-1bkgwmd",backgroundAttachment:null,backgroundClip:null,backgroundColor:null,backgroundImage:null,backgroundOrigin:null,backgroundPosition:null,backgroundPositionX:null,backgroundPositionY:null,backgroundRepeat:null,backgroundSize:null,height:"editorstyling-5yr21d",width:"editorstyling-1i1rx1s",$$css:!0},centerContent:{padding:"editorstyling-1717udv",paddingInline:null,paddingStart:null,paddingLeft:null,paddingEnd:null,paddingRight:null,paddingBlock:null,paddingTop:null,paddingBottom:null,display:"editorstyling-78zum5",alignItems:"editorstyling-6s0dn4",justifyContent:"editorstyling-l56j7k",$$css:!0},fullInput:{flex:"editorstyling-98rzlu",flexGrow:null,flexShrink:null,flexBasis:null,$$css:!0},disabled:{cursor:"editorstyling-1h6gzvc",opacity:"editorstyling-190dgpg",":where(*)>*_pointerEvents":"editorstyling-vszx66",$$css:!0},readonly:{pointerEvents:"editorstyling-47corl",$$css:!0},svgButton:l=>[{":where(*)>svg_opacity":(l?1:.2)==null?null:"editorstyling-108nfvm",":is(:hover,:focus)>svg_opacity":"editorstyling-1p3htkq",$$css:!0},{"--1ifsx55":(l?1:.2)??void 0}]},wt=ct(Tt,"Spacing");export{wt as default};
