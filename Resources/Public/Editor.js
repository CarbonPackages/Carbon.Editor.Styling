import{a as n}from"./chunk-T35LKHOJ.js";import"./chunk-J2LUJMPL.js";import{b as l,c as o,d as p,e as d}from"./chunk-2Q53SARM.js";p();var a=o("manifest");var t=l(d(),1);var f={BorderRadius:()=>import("./BorderRadius-7FHFG7VD.js"),TextAreaWithCounter:()=>import("./TextAreaWithCounter.js"),Spacing:()=>import("./Spacing-6QO6IDIL.js")};function m(e){let r=(0,t.lazy)(f[e]);return s=>t.default.createElement(t.Suspense,{fallback:t.default.createElement(n,{isLoading:!0})},t.default.createElement(r,{...s}))}var c=Object.keys(f),g=c.map(e=>m(e));a("Carbon.Editor.Styling:Editors",{},e=>{let r=e.get("inspector").get("editors");c.forEach((s,u)=>{r.set(`Carbon.Editor.Styling/${s}`,{component:g[u]})})});
