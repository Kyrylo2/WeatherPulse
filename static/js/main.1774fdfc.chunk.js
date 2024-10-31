(this["webpackJsonpweather-app"]=this["webpackJsonpweather-app"]||[]).push([[0],{105:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a(67),c=a.n(n),s=a(68),i=a.n(s),o=a(130),l=a(50),d=a(135),x=a(136),j=a(133),b=a(137),p=a(122),h=a(126),m=a(127),f=a(128),O=a(129),g=a(2);var u=function(e){let{data:t}=e;const a=Object(l.a)();return Object(g.jsx)(d.a,{children:Object(g.jsxs)(x.a,{children:[Object(g.jsxs)(j.a,{sx:{display:"flex",alignItems:"center",mb:2},children:[(e=>{switch(e){case"Clouds":default:return Object(g.jsx)(p.a,{sx:{fontSize:40,color:a.palette.primary.main}});case"Clear":return Object(g.jsx)(h.a,{sx:{fontSize:40,color:a.palette.primary.main}});case"Rain":return Object(g.jsx)(m.a,{sx:{fontSize:40,color:a.palette.primary.main}})}})(t.weather[0].main),Object(g.jsxs)(j.a,{sx:{ml:2},children:[Object(g.jsx)(b.a,{variant:"h6",component:"div",sx:{fontWeight:"bold"},children:t.name}),Object(g.jsx)(b.a,{variant:"body2",color:"text.secondary",children:t.weather[0].description})]})]}),Object(g.jsxs)(b.a,{variant:"h4",component:"div",sx:{mb:2,fontWeight:"medium",color:a.palette.primary.dark},children:[Math.round(t.main.temp),"\xb0C"]}),Object(g.jsxs)(j.a,{sx:{display:"flex",flexDirection:"column",gap:1},children:[Object(g.jsxs)(j.a,{sx:{display:"flex",alignItems:"center",gap:1},children:[Object(g.jsx)(f.a,{sx:{color:a.palette.primary.light}}),Object(g.jsxs)(b.a,{variant:"body2",color:"text.secondary",children:["\u0412\u043e\u043b\u043e\u0433\u0456\u0441\u0442\u044c: ",t.main.humidity,"%"]})]}),Object(g.jsxs)(j.a,{sx:{display:"flex",alignItems:"center",gap:1},children:[Object(g.jsx)(O.a,{sx:{color:a.palette.primary.light}}),Object(g.jsxs)(b.a,{variant:"body2",color:"text.secondary",children:["\u0412\u0456\u0442\u0435\u0440: ",t.wind.speed," \u043c/\u0441"]})]})]})]})})},y=a(138),v=a(139),S=a(131),w=a(134),k=a(70);var z=Object(k.a)({palette:{primary:{main:"#1976d2",light:"#42a5f5",dark:"#1565c0"},secondary:{main:"#9c27b0",light:"#ba68c8",dark:"#7b1fa2"},background:{default:"#f5f5f5",paper:"#ffffff"}},typography:{fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',h6:{fontWeight:500,fontSize:"1.25rem",letterSpacing:"0.0075em"},body1:{fontSize:"1rem",letterSpacing:"0.00938em"},body2:{fontSize:"0.875rem",letterSpacing:"0.01071em"}},components:{MuiCard:{styleOverrides:{root:{borderRadius:12,boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",transition:"transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out","&:hover":{transform:"translateY(-4px)",boxShadow:"0 6px 12px rgba(0, 0, 0, 0.15)"}}}},MuiAppBar:{styleOverrides:{root:{boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"}}}}});var I=function(){const[e,t]=Object(r.useState)([]);return Object(r.useEffect)((()=>{const e=()=>{i.a.get("http://localhost:8000/data").then((e=>{t(e.data)})).catch((e=>{console.error("Error fetching data:",e)}))};e();const a=setInterval(e,1e4);return()=>clearInterval(a)}),[]),Object(g.jsx)(o.a,{theme:z,children:Object(g.jsxs)(j.a,{sx:{minHeight:"100vh",backgroundColor:"background.default",pb:4},children:[Object(g.jsx)(y.a,{position:"static",elevation:0,children:Object(g.jsx)(v.a,{children:Object(g.jsx)(b.a,{variant:"h6",component:"div",sx:{fontWeight:"bold",letterSpacing:1},children:"\u041f\u043e\u0433\u043e\u0434\u0430 \u0423\u043a\u0440\u0430\u0457\u043d\u0438"})})}),Object(g.jsx)(S.a,{sx:{mt:4},children:Object(g.jsx)(w.a,{container:!0,spacing:3,children:e.map(((e,t)=>Object(g.jsx)(w.a,{item:!0,xs:12,sm:6,md:4,children:Object(g.jsx)(u,{data:e})},t)))})})]})})};c.a.render(Object(g.jsx)(o.a,{theme:z,children:Object(g.jsx)(I,{})}),document.getElementById("root"))}},[[105,1,2]]]);
//# sourceMappingURL=main.1774fdfc.chunk.js.map