import{a as z}from"./chunk-Z4CIOFZC.js";import{b as f,e as b,f as i}from"./chunk-XTEK7IIS.js";var t=f(b(),1),d=f(z(),1);var e={disabled:{cursor:"editorstyling-1h6gzvc",opacity:"editorstyling-190dgpg",":where(*)>*_pointerEvents":"editorstyling-vszx66",$$css:!0},dropdown:{width:"editorstyling-apn7li",alignSelf:"editorstyling-1y8v6su",$$css:!0},header:{position:"editorstyling-1n2onr6",display:"editorstyling-78zum5",alignItems:"editorstyling-6s0dn4",$$css:!0},headerNoPadding:{padding:"editorstyling-1732f5w",$$css:!0},padding:{padding:"editorstyling-zdscax",$$css:!0},content:{width:"editorstyling-9fp9d9",maxWidth:"editorstyling-gdlz2r",transform:"editorstyling-1dpvuo6",$$css:!0}},g=(r,n)=>document.body.style.setProperty(r,n);function P({open:r,setOpen:n,children:w,title:$,width:l,readonly:x,padding:a,header:v,headerWidth:o,headerPadding:p=!0,automaticClose:N=!0,contentStyles:D={}}){let[s,c]=(0,t.useState)(!1);typeof o!="number"&&(o=l-40-16);let u=(0,t.useMemo)(()=>p?`calc(${o}px + var(--spacing-GoldenUnit) + var(--spacing-Full))`:`${o}px`,[o,p]),y=(0,t.useMemo)(()=>a?`calc(${l}px + var(--spacing-Full) * 2)`:`${l}px`,[l,a]),m=(0,t.useCallback)(()=>{g("--dropdown-header-width",u),g("--dropdown-content-width",y)},[u,y,g]);return(0,t.useEffect)(()=>{s&&m(),typeof n=="function"&&n(s)},[m,s]),(0,t.useEffect)(()=>{c(r)},[r]),t.default.createElement("div",{className:"editorstyling-jp7ctv",style:{"--dropdown-content-width":y,"--dropdown-header-width":u}},t.default.createElement(d.DropDown.Stateless,{title:s?null:$,className:i(e.dropdown,x&&e.disabled).className,isOpen:s,onToggle:()=>c(!s),onClose:C=>{(N||!C)&&c(!1)}},t.default.createElement(d.DropDown.Header,{className:i(e.header,p||e.headerNoPadding).className},v),t.default.createElement(d.DropDown.Contents,{className:i(e.content,a&&e.padding,D).className,scrollable:!0},w)))}export{P as a};
