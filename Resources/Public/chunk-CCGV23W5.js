import{a as S}from"./chunk-RFQFEKRW.js";import{b as f,e as b,f as i}from"./chunk-6B2QUEPG.js";var t=f(b(),1),r=f(S(),1);var y=(l,o)=>document.body.style.setProperty(l,o);function h({open:l,setOpen:o,children:w,title:$,width:d,readonly:v,padding:a,header:x,headerWidth:e,headerPadding:p=!0,automaticClose:N=!0,contentStyles:D={}}){let[n,u]=(0,t.useState)(!1);typeof e!="number"&&(e=d-40-16);let g=(0,t.useMemo)(()=>p?`calc(${e}px + var(--spacing-GoldenUnit) + var(--spacing-Full))`:`${e}px`,[e,p]),c=(0,t.useMemo)(()=>a?`calc(${d}px + var(--spacing-Full) * 2)`:`${d}px`,[d,a]),m=(0,t.useCallback)(()=>{y("--dropdown-header-width",g),y("--dropdown-content-width",c)},[g,c,y]);return(0,t.useEffect)(()=>{n&&m(),typeof o=="function"&&o(n)},[m,n]),(0,t.useEffect)(()=>{u(l)},[l]),t.default.createElement("div",{className:"editorstyling-jp7ctv",style:{"--dropdown-content-width":c,"--dropdown-header-width":g}},t.default.createElement(r.DropDown.Stateless,{title:n?null:$,className:i(s.dropdown,v&&s.disabled).className,isOpen:n,onToggle:()=>u(!n),onClose:C=>{(N||!C)&&u(!1)}},t.default.createElement(r.DropDown.Header,{className:i(s.header,p||s.headerNoPadding).className},x),t.default.createElement(r.DropDown.Contents,{className:i(s.content,a&&s.padding,D).className,scrollable:!0},w)))}var s={disabled:{cursor:"editorstyling-1h6gzvc",opacity:"editorstyling-190dgpg",":where(*)>*_pointerEvents":"editorstyling-vszx66",$$css:!0},dropdown:{width:"editorstyling-apn7li",alignSelf:"editorstyling-1y8v6su",$$css:!0},header:{position:"editorstyling-1n2onr6",display:"editorstyling-78zum5",alignItems:"editorstyling-6s0dn4",$$css:!0},headerNoPadding:{padding:"editorstyling-1732f5w",paddingInline:null,paddingStart:null,paddingLeft:null,paddingEnd:null,paddingRight:null,paddingBlock:null,paddingTop:null,paddingBottom:null,$$css:!0},padding:{padding:"editorstyling-zdscax",paddingInline:null,paddingStart:null,paddingLeft:null,paddingEnd:null,paddingRight:null,paddingBlock:null,paddingTop:null,paddingBottom:null,$$css:!0},content:{width:"editorstyling-9fp9d9",maxWidth:"editorstyling-gdlz2r",transform:"editorstyling-1dpvuo6",$$css:!0}};export{h as a};
