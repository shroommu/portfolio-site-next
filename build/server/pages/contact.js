"use strict";(()=>{var e={};e.id=335,e.ids=[335,888],e.modules={4978:(e,t,a)=>{a.d(t,{Z:()=>o});var n=a(7518),r=a.n(n),i=a(9457),s=a(997);let l=r().section.withConfig({displayName:"Section__Container",componentId:"sc-ogfthf-0"})(["display:flex;padding:",";margin:",";@media ","{padding:5% 10%;}"],e=>e.padding,e=>e.margin,i.device.tablet);function o({testId:e,children:t,margin:a,padding:n}){return s.jsx(l,{"test-id":e,margin:a,padding:n,children:t})}o.defaultProps={padding:"64px 200px 0 350px",margin:"0 0 36px 0"}},4854:(e,t,a)=>{a.r(t),a.d(t,{config:()=>z,default:()=>D,getServerSideProps:()=>Z,getStaticPaths:()=>M,getStaticProps:()=>L,reportWebVitals:()=>H,routeModule:()=>V,unstable_getServerProps:()=>F,unstable_getServerSideProps:()=>U,unstable_getStaticParams:()=>R,unstable_getStaticPaths:()=>B,unstable_getStaticProps:()=>T});var n={};a.r(n),a.d(n,{default:()=>k});var r=a(7093),i=a(5244),s=a(1323),l=a(5879),o=a(9057),c=a(7518),d=a.n(c),p=a(6689),u=a(4978),m=a(997);!function(){var e=Error("Cannot find module '../assets'");throw e.code="MODULE_NOT_FOUND",e}();let g=d().div.withConfig({displayName:"Alert__Container",componentId:"sc-dh5qqn-0"})(["display:flex;justify-content:space-between;background-color:",";padding:8px;border-radius:4px;"],e=>e.color);function f({testId:e,children:t,color:a,onClose:n}){return m.jsx(g,{"test-id":e,color:a,children:t})}var h=a(9678);let x=d().input.withConfig({displayName:"Input__BaseInput",componentId:"sc-2imlfn-0"})(["padding:2px;"]);function b({value:e,onChange:t,className:a}){return m.jsx(x,{value:e,onChange:e=>{let{value:a}=e.target;t(a)},className:a})}let v=d().textarea.withConfig({displayName:"TextArea__BaseInput",componentId:"sc-1mm7l0s-0"})(["padding:2px;max-height:300px;min-height:100px;resize:vertical;"]);function j({value:e,onChange:t,className:a}){return m.jsx(v,{value:e,onChange:e=>{let{value:a}=e.target;t(a)},className:a})}let y=d().div.withConfig({displayName:"LabeledElement__Container",componentId:"sc-lux1aw-0"})(["display:flex;flex-direction:column;padding:12px;width:",";"],e=>e.width),P=d().label.withConfig({displayName:"LabeledElement__BaseLabel",componentId:"sc-lux1aw-1"})(["padding:0 0 8px 0;"]),w=d().div.withConfig({displayName:"LabeledElement__BaseError",componentId:"sc-lux1aw-2"})(["padding-top:4px;font-size:10px;color:red;"]);function S({children:e,childId:t,testId:a,label:n,required:r,error:i,className:s,width:l}){return(0,m.jsxs)(y,{className:s,width:l,children:[(0,m.jsxs)(P,{for:t,"test-id":a,children:[n,r&&"*"]}),e,m.jsx(w,{children:i})]})}var _=a(8881),C=a(5498);function O(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function N(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?O(Object(a),!0).forEach(function(t){var n;n=a[t],t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):O(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}let q=d()(C.Heading).withConfig({displayName:"contact__Heading",componentId:"sc-1rcyf0m-0"})(["text-align:center;"]),I=d().div.withConfig({displayName:"contact__Container",componentId:"sc-1rcyf0m-1"})(["flex:1;display:flex;flex-direction:column;align-items:center;"]),E=d()(S).withConfig({displayName:"contact__FlexLabeledElement",componentId:"sc-1rcyf0m-2"})(["flex:1;"]);function k(){let{0:e,1:t}=(0,p.useState)(""),{0:a,1:n}=(0,p.useState)({name:"",email:"",message:""}),{0:r,1:i}=(0,p.useState)(""),{0:s,1:l}=(0,p.useState)(""),{0:o,1:c}=(0,p.useState)(!1),d=(0,p.useCallback)(e=>{t(e),0===e.trim().length?n(e=>N(N({},e),{},{name:"Please enter a value"})):n(e=>N(N({},e),{},{name:""}))},[t,n]),g=(0,p.useCallback)(e=>{i(e),0===e.trim().length?n(e=>N(N({},e),{},{email:"Please enter a value"})):n(e=>N(N({},e),{},{email:""}))},[n,i]),x=(0,p.useCallback)(e=>{l(e),0===e.trim().length?n(e=>N(N({},e),{},{message:"Please enter a value"})):n(e=>N(N({},e),{},{message:""}))},[n,l]),v=(0,p.useCallback)(()=>{t(""),i(""),l(""),n({name:"",email:"",message:""})},[t,i,l,n]),y=(0,p.useCallback)(()=>{let t=r.match(/^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);if(t||n(e=>N(N({},e),{},{email:"Please enter a valid email address"})),""===a.name&&""===a.email&&""===a.message&&t){let t=new XMLHttpRequest;return t.open("POST","https://bvgqo6ynu7.execute-api.us-east-1.amazonaws.com/dev/static-site-mailer",!0),t.setRequestHeader("Accept","application/json; charset=utf-8"),t.setRequestHeader("Content-Type","application/json; charset=UTF-8"),t.send(JSON.stringify({name:e,email:r,message:s})),v(),c(!0),!1}},[e,r,s,n,a,v,c]);return m.jsx(u.Z,{testId:"contact-section",children:m.jsx(h.Z,{testId:"contact-card",children:(0,m.jsxs)(I,{children:[m.jsx(q,{children:"Contact Me!"}),m.jsx(S,{label:"Name",required:!0,error:a.name,width:"66%",children:m.jsx(b,{value:e,onChange:e=>d(e)})}),m.jsx(S,{label:"Email",required:!0,error:a.email,width:"66%",children:m.jsx(b,{value:r,onChange:e=>g(e)})}),m.jsx(E,{label:"Message",required:!0,error:a.message,width:"66%",children:m.jsx(j,{value:s,onChange:e=>x(e)})}),m.jsx(_.Z,{theme:_.n.tertiary,type:"submit",onClick:y,disabled:a.name||a.email||a.message,margin:"0 0 16px 0",children:"Submit"}),o&&m.jsx(f,{testId:"successful-message-alert",color:"green",onClose:()=>c(!1),children:"Your message has been sent!"})]})})})}let A=r.PagesRouteModule,D=(0,s.l)(n,"default"),L=(0,s.l)(n,"getStaticProps"),M=(0,s.l)(n,"getStaticPaths"),Z=(0,s.l)(n,"getServerSideProps"),z=(0,s.l)(n,"config"),H=(0,s.l)(n,"reportWebVitals"),T=(0,s.l)(n,"unstable_getStaticProps"),B=(0,s.l)(n,"unstable_getStaticPaths"),R=(0,s.l)(n,"unstable_getStaticParams"),F=(0,s.l)(n,"unstable_getServerProps"),U=(0,s.l)(n,"unstable_getServerSideProps"),V=new A({definition:{kind:i.x.PAGES,page:"/contact",pathname:"/contact",bundlePath:"",filename:""},components:{App:o.default,Document:l.default},userland:n})},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},6405:e=>{e.exports=require("react-dom")},997:e=>{e.exports=require("react/jsx-runtime")},7518:e=>{e.exports=require("styled-components")},1017:e=>{e.exports=require("path")}};var t=require("../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),n=t.X(0,[30,988,859,450,57,285],()=>a(4854));module.exports=n})();