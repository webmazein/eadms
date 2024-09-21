import{A as y,l as D,k as E,B as w,r as n,D as g,j as r}from"./index-BvsAo6bk.js";import{u as C}from"./index-EfigbEwa.js";import{a as x}from"./axios-B4uVmeYG.js";import{w as N,b}from"./config-6WvNVX-n.js";import{C as S}from"./CRow-hJu6xMa9.js";import{C as T,a as v,b as j,c as l,d as R,e as u}from"./CTable-tp14BGus.js";const W=()=>{const{id:p}=y(),f=D(),i=E(e=>w(e,p)),m=n.useRef(i),c=n.useRef(5),{sendMessage:k,lastMessage:d,readyState:M}=C(`${N}`,{onOpen:()=>console.log("WebSocket connection established"),onClose:()=>console.log("WebSocket connection closed"),onError:e=>console.error("WebSocket error:",e),shouldReconnect:e=>!0});n.useEffect(()=>{async function e(){try{const t=await x.get(`${b}/zone/getZoneRecordsForToday/${p}`);if(t.data.status===200){const{data:s}=t.data,a=[];s.forEach(o=>{a.push({id:o.id,defect_name:o.defect_name,defect_name_hi:o.defect_name_hi,station_id:o.station_id,screen_no:o.screen_no,operator_name:o.operator_name,updated_at:o.updated_at,count:1,is_updated:!1})}),f(g(a))}else toast.error("Failed to fetch zone records")}catch(t){console.error("Error fetching zone records:",t),toast.error("Failed to fetch zone records")}}e()},[]),n.useEffect(()=>{if(d!==null)try{const e=JSON.parse(d.data),t=e==null?void 0:e.data;if(t!=null&&t.length){const s=[];t.forEach(a=>{s.push({id:a.id,defect_name:a.defect_name,defect_name_hi:a.defect_name_hi,station_id:a.station_id,screen_no:a.screen_no,operator_name:a.operator_name,updated_at:a.updated_at,count:1,is_updated:!1})}),f(g([...i,...s]))}}catch(e){console.error("Error parsing message:",e)}},[d]),n.useEffect(()=>{if(d!==null)try{const e=JSON.parse(d.data);e.timer&&(c.current=e.timer,sessionStorage.setItem("alert_timer",e.timer))}catch(e){console.error("Error parsing WebSocket message:",e)}},[d]),n.useEffect(()=>{(async()=>{try{const t=await x.get(`${b}/settings/alert_timer`);t.status===200?(c.current=t.data.alert_timer,sessionStorage.setItem("alert_timer",t.data.alert_timer)):toast.error("Failed to fetch alert timer value")}catch(t){console.error("Error fetching alert timer:",t),toast.error("Failed to fetch alert timer value")}})()},[]);const h=n.useMemo(()=>{const e=new Map;return i.forEach(s=>{const a=m.current.find(_=>_.id===s.id),o=a?a.count!==s.count:!0;e.set(s.id,{...s,is_updated:o})}),Array.from(e.values()).sort((s,a)=>{const o=new Date(s.updated_at);return new Date(a.updated_at)-o})},[i,m]);return n.useEffect(()=>{m.current=i},[i]),r.jsxs("div",{className:"con",children:[r.jsxs("div",{className:"heading-container",style:{position:"relative",backgroundColor:"#f0f0f0",padding:"50px",textAlign:"center",marginBottom:"20px",borderRadius:"8px"},children:[r.jsx("img",{src:"/Hero-Logo.png",alt:"Hero Logo",style:{position:"absolute",left:"20px",top:"50%",transform:"translateY(-50%)",width:"150px"}}),r.jsx("h1",{style:{margin:0},children:r.jsxs("b",{children:["Engine Assembly Line Defect Monitoring System - Zone ",p||"-"]})}),r.jsx("img",{src:"/tnd_logo.png",alt:"Right Logo",style:{position:"absolute",right:"20px",top:"50%",transform:"translateY(-50%)",width:"150px"}})]}),r.jsx(S,{className:"g-4",children:h.length>0&&r.jsxs(T,{hover:!0,responsive:!0,className:"custom-table",children:[r.jsx(v,{children:r.jsxs(j,{children:[r.jsx(l,{children:"Date Time"}),r.jsx(l,{children:"Defect Name/ Defect Name Hindi"}),r.jsx(l,{children:"Operator Name"}),r.jsx(l,{children:"Today's Count"})]})}),r.jsx(R,{children:h.map((e,t)=>r.jsxs(j,{backgroundColor:!0,children:[r.jsx(u,{className:e.is_updated?"updated":"",style:e.is_updated?{animationDuration:`${c.current}s`,animationFillMode:"forwards"}:{},children:"GG"},t)," ",r.jsxs(u,{className:e.is_updated?"updated":"",style:e.is_updated?{animationDuration:`${c.current}s`,animationFillMode:"forwards"}:{},children:[e.defect_name,"  ",e.defect_name_hi||"-"]},t),r.jsx(u,{className:e.is_updated?"updated":"",style:e.is_updated?{animationDuration:`${c.current}s`,animationFillMode:"forwards"}:{},children:e.operator_name},t),r.jsx(u,{className:e.is_updated?"updated":"",style:e.is_updated?{animationDuration:`${c.current}s`,animationFillMode:"forwards"}:{},children:e.count||1},t)]}))})]})})]})};export{W as default};
