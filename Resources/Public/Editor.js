import{a as n}from"./chunk-S44K5ZWB.js";import"./chunk-FMJLVUCX.js";import{b as p,c as o,d as l,e as d}from"./chunk-6B2QUEPG.js";l();var a=o("manifest");var t=p(d(),1);var f={BackgroundSize:()=>import("./BackgroundSize.js"),Border:()=>import("./Border.js"),BorderRadius:()=>import("./BorderRadius.js"),Spacing:()=>import("./Spacing.js"),TextAreaWithCounter:()=>import("./TextAreaWithCounter.js"),TextInput:()=>import("./TextInput-76WOVQNV.js")};function m(e){let r=(0,t.lazy)(f[e]);return s=>t.default.createElement(t.Suspense,{fallback:t.default.createElement(n,{isLoading:!0})},t.default.createElement(r,{...s}))}var c=Object.keys(f),g=c.map(e=>m(e));a("Carbon.Editor.Styling:Editors",{},e=>{let r=e.get("inspector").get("editors");c.forEach((s,u)=>{r.set(`Carbon.Editor.Styling/${s}`,{component:g[u]})})});
