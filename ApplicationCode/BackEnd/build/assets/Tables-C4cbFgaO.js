import{r,_ as j,R as d,b as N,c as w,P as o,o as ie,j as s,L as de}from"./index-BvsAo6bk.js";import{B as re,Q as me}from"./ReactToastify-CzdmNUfT.js";import{A as ue}from"./ApiService-BUAZmpvY.js";import{C as fe}from"./CRow-hJu6xMa9.js";import{C as pe}from"./CCol-a21KGpRd.js";import{C as he,a as Ce}from"./CCardBody-BgCREiRt.js";import{C as ve}from"./CCardHeader-BdmWY7vn.js";import{a as V}from"./index.es-CaM2XmDR.js";import{C as be,a as ye,b as te,c as T,d as xe,e as A}from"./CTable-tp14BGus.js";import{u as ge,T as Ne,C as ne,a as je,b as we}from"./DefaultLayout-PYAQd14h.js";var K=r.forwardRef(function(e,t){var n=e.children,a=e.className,c=j(e,["children","className"]);return d.createElement("div",N({className:w("modal-content",a)},c,{ref:t}),n)});K.propTypes={children:o.node,className:o.string};K.displayName="CModalContent";var Q=r.forwardRef(function(e,t){var n,a=e.children,c=e.alignment,m=e.className,u=e.fullscreen,v=e.scrollable,b=e.size,i=j(e,["children","alignment","className","fullscreen","scrollable","size"]);return d.createElement("div",N({className:w("modal-dialog",(n={"modal-dialog-centered":c==="center"},n[typeof u=="boolean"?"modal-fullscreen":"modal-fullscreen-".concat(u,"-down")]=u,n["modal-dialog-scrollable"]=v,n["modal-".concat(b)]=b,n),m)},i,{ref:t}),a)});Q.propTypes={alignment:o.oneOf(["top","center"]),children:o.node,className:o.string,fullscreen:o.oneOfType([o.bool,o.oneOf(["sm","md","lg","xl","xxl"])]),scrollable:o.bool,size:o.oneOf(["sm","lg","xl"])};Q.displayName="CModalDialog";var ae=r.createContext({}),$=r.forwardRef(function(e,t){var n=e.children,a=e.alignment,c=e.backdrop,m=c===void 0?!0:c,u=e.className,v=e.duration,b=v===void 0?150:v,i=e.focus,H=i===void 0?!0:i,y=e.fullscreen,k=e.keyboard,O=k===void 0?!0:k,R=e.onClose,E=e.onClosePrevented,x=e.onShow,B=e.portal,P=B===void 0?!0:B,I=e.scrollable,S=e.size,D=e.transition,L=D===void 0?!0:D,z=e.unmountOnClose,l=z===void 0?!0:z,f=e.visible,M=j(e,["children","alignment","backdrop","className","duration","focus","fullscreen","keyboard","onClose","onClosePrevented","onShow","portal","scrollable","size","transition","unmountOnClose","visible"]),h=r.useRef(null),C=r.useRef(null),U=r.useRef(null),F=ge(t,C),Y=r.useState(f),g=Y[0],q=Y[1],Z=r.useState(!1),_=Z[0],ee=Z[1],ce={visible:g,setVisible:q};r.useEffect(function(){q(f)},[f]),r.useEffect(function(){var p;return g?(h.current=document.activeElement,document.addEventListener("mouseup",oe),document.addEventListener("keydown",le)):(p=h.current)===null||p===void 0||p.focus(),function(){document.removeEventListener("mouseup",oe),document.removeEventListener("keydown",le)}},[g]);var se=function(){return m==="static"?ee(!0):(q(!1),R&&R())};r.useLayoutEffect(function(){E&&E(),setTimeout(function(){return ee(!1)},b)},[_]),r.useLayoutEffect(function(){return g?(document.body.classList.add("modal-open"),m&&(document.body.style.overflow="hidden",document.body.style.paddingRight="0px"),setTimeout(function(){var p;H&&((p=C.current)===null||p===void 0||p.focus())},L?b:0)):(document.body.classList.remove("modal-open"),m&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))),function(){document.body.classList.remove("modal-open"),m&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))}},[g]);var oe=function(p){C.current&&C.current==p.target&&se()},le=function(p){p.key==="Escape"&&O&&se()};return d.createElement(d.Fragment,null,d.createElement(Ne,{in:g,mountOnEnter:!0,nodeRef:C,onEnter:x,onExit:R,unmountOnExit:l,timeout:L?b:0},function(p){return d.createElement(ne,{portal:P},d.createElement(ae.Provider,{value:ce},d.createElement("div",N({className:w("modal",{"modal-static":_,fade:L,show:p==="entered"},u),tabIndex:-1},g?{"aria-modal":!0,role:"dialog"}:{"aria-hidden":"true"},{style:N({},p!=="exited"&&{display:"block"})},M,{ref:F}),d.createElement(Q,{alignment:a,fullscreen:y,scrollable:I,size:S},d.createElement(K,{ref:U},n)))))}),m&&d.createElement(ne,{portal:P},d.createElement(je,{visible:g})))});$.propTypes={alignment:o.oneOf(["top","center"]),backdrop:o.oneOfType([o.bool,o.oneOf(["static"])]),children:o.node,className:o.string,duration:o.number,focus:o.bool,fullscreen:o.oneOfType([o.bool,o.oneOf(["sm","md","lg","xl","xxl"])]),keyboard:o.bool,onClose:o.func,onClosePrevented:o.func,onShow:o.func,portal:o.bool,scrollable:o.bool,size:o.oneOf(["sm","lg","xl"]),transition:o.bool,unmountOnClose:o.bool,visible:o.bool};$.displayName="CModal";var G=r.forwardRef(function(e,t){var n=e.children,a=e.className,c=j(e,["children","className"]);return d.createElement("div",N({className:w("modal-body",a)},c,{ref:t}),n)});G.propTypes={children:o.node,className:o.string};G.displayName="CModalBody";var J=r.forwardRef(function(e,t){var n=e.children,a=e.className,c=j(e,["children","className"]);return d.createElement("div",N({className:w("modal-footer",a)},c,{ref:t}),n)});J.propTypes={children:o.node,className:o.string};J.displayName="CModalFooter";var W=r.forwardRef(function(e,t){var n=e.children,a=e.className,c=e.closeButton,m=c===void 0?!0:c,u=j(e,["children","className","closeButton"]),v=r.useContext(ae).setVisible;return d.createElement("div",N({className:w("modal-header",a)},u,{ref:t}),n,m&&d.createElement(we,{onClick:function(){return v(!1)}}))});W.propTypes={children:o.node,className:o.string,closeButton:o.bool};W.displayName="CModalHeader";var X=r.forwardRef(function(e,t){var n=e.children,a=e.as,c=a===void 0?"h5":a,m=e.className,u=j(e,["children","as","className"]);return d.createElement(c,N({className:w("modal-title",m)},u,{ref:t}),n)});X.propTypes={as:o.elementType,children:o.node,className:o.string};X.displayName="CModalTitle";const Ee=()=>{const e=ie(),[t,n]=r.useState([]),[a,c]=r.useState([]),[m,u]=r.useState(!1),[v,b]=r.useState(null),[i,H]=r.useState(null),[y,k]=r.useState("asc"),[O,R]=r.useState(1),[E]=r.useState(15),[x,B]=r.useState("");r.useEffect(()=>{P()},[]),r.useEffect(()=>{(t==null?void 0:t.length)>0&&I()},[t,i,y,O,x]);const P=async()=>{try{const l=await ue.request("get","/users",null,{},e);n(l.data)}catch(l){console.error("Error fetching data:",l),re.error("Failed to fetch user")}},I=()=>{console.log(t,"users");let l=[...t];x.trim()!==""&&(l=l.filter(h=>h.name.toLowerCase().includes(x.toLowerCase())||h.email.toLowerCase().includes(x.toLowerCase())||h.role.toLowerCase().includes(x.toLowerCase()))),i&&l.sort((h,C)=>{const U=typeof h[i]=="string"?h[i].toLowerCase():h[i],F=typeof C[i]=="string"?C[i].toLowerCase():C[i];return y==="asc"?U>F?1:-1:U<F?1:-1});const f=(O-1)*E,M=f+E;l=l.slice(f,M),c(l)},S=l=>{l===i?k(y==="asc"?"desc":"asc"):(H(l),k("asc"))},D=l=>R(l),L=l=>{const f=t.filter(M=>M.id!==l);n(f),re.success("User deleted successfully"),u(!1)},z=l=>{u(!m),b(l)};return s.jsxs(fe,{children:[s.jsx(pe,{xs:12,children:s.jsxs(he,{className:"mb-4",children:[s.jsxs(ve,{className:"d-flex justify-content-between align-items-center",children:[s.jsx("strong",{children:"Users"}),s.jsx(de,{to:"/addNewUser",children:s.jsx(V,{color:"primary",children:"Add New +"})})]}),s.jsxs(Ce,{children:[s.jsx("div",{className:"d-flex justify-content-between mb-3",children:s.jsx("input",{type:"text",placeholder:"Search...",value:x,onChange:l=>B(l.target.value)})}),s.jsxs(be,{children:[s.jsx(ye,{children:s.jsxs(te,{children:[s.jsx(T,{scope:"col",children:"#"}),s.jsxs(T,{scope:"col",onClick:()=>S("name"),children:["Name ",i==="name"&&s.jsx("span",{children:y==="asc"?"▲":"▼"})]}),s.jsxs(T,{scope:"col",onClick:()=>S("email"),children:["Email ",i==="email"&&s.jsx("span",{children:y==="asc"?"▲":"▼"})]}),s.jsxs(T,{scope:"col",onClick:()=>S("role"),children:["Role ",i==="role"&&s.jsx("span",{children:y==="asc"?"▲":"▼"})]}),s.jsx(T,{scope:"col",children:"Action"})]})}),s.jsx(xe,{children:a.length>0&&a.map((l,f)=>s.jsxs(te,{children:[s.jsx(T,{scope:"row",children:f+1}),s.jsx(A,{children:l.name}),s.jsx(A,{children:l.email}),s.jsx(A,{children:l.role}),s.jsx(A,{children:s.jsx(V,{color:"danger",size:"sm",onClick:()=>z(l.id),children:"Delete"})})]},l.id))})]}),s.jsx("nav",{children:s.jsx("ul",{className:"pagination",children:Array.from({length:Math.ceil((t==null?void 0:t.length)/E)}).map((l,f)=>s.jsx("li",{className:"page-item",children:s.jsx("button",{onClick:()=>D(f+1),className:"page-link",children:f+1})},f))})})]})]})}),s.jsxs($,{visible:m,onClose:()=>u(!1),children:[s.jsx(W,{closeButton:!0,children:s.jsx(X,{children:"Confirm Delete"})}),s.jsx(G,{children:"Are you sure you want to delete this user?"}),s.jsxs(J,{children:[s.jsx(V,{color:"secondary",onClick:()=>u(!1),children:"Cancel"}),s.jsx(V,{color:"danger",onClick:()=>L(v),children:"Delete"})]})]}),s.jsx(me,{})]})},ze=Ee;export{$ as C,ze as T,W as a,X as b,G as c,J as d};
