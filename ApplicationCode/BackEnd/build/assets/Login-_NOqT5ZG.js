import{r as t,_ as b,R as S,b as k,c as w,P as u,q as I,m as E,v as P,j as e,w as L}from"./index-D5mK4_IJ.js";import{b as R,c as x,a as G}from"./index.es-BSy7osIh.js";import{C as B,a as D,b as T,c as _}from"./config-JwZ8C9zi.js";import{C as h,a as g}from"./CRow-DEPKtvaT.js";import{C as F}from"./CForm-BSXfomq1.js";import{C,a as j}from"./CInputGroupText-DwhVkywh.js";import{c as U,a as q}from"./cil-user-Dlmw-Gem.js";import{C as f}from"./CFormInput-9CW0Vo_b.js";import"./CFormFeedback-CLOsMfCj.js";var m=t.forwardRef(function(s,o){var c=s.children,n=s.className,l=b(s,["children","className"]);return S.createElement("div",k({className:w("card-group",n)},l,{ref:o}),c)});m.propTypes={children:u.node,className:u.string};m.displayName="CCardGroup";const Q=({onLogin:s})=>{const[o,c]=t.useState(""),[n,l]=t.useState(""),[d,i]=t.useState(""),N=I(),p=E();t.useEffect(()=>{localStorage.removeItem("token"),p(P())},[]);const y=async r=>{r.preventDefault();try{const a=await T.post(`${_}/users/login`,{username:o,password:n});if(a.data.token){i(""),s(),console.log(a,"LOGIN RESP");const v={username:a.data.username,email:a.data.email,role:a.data.role};p(L({user:v,token:a.data.token})),localStorage.setItem("token",a.data.token),localStorage.setItem("username",a.data.username),localStorage.setItem("role",a.data.role),N(a.data.role==="admin"?"/dashboard":"/raiseDefects")}else i("Invalid credentials. Please try again.")}catch(a){i("Error logging in. Please try again."),console.error("Login error",a)}};return e.jsx("div",{className:"bg-body-tertiary min-vh-100 d-flex flex-row align-items-center",children:e.jsx(R,{children:e.jsx(h,{className:"justify-content-center",children:e.jsx(g,{md:6,children:e.jsx(m,{children:e.jsx(B,{className:"p-4",children:e.jsxs(D,{className:"text-center",children:[e.jsx("h1",{children:"Welcome Back!"}),e.jsx("p",{className:"text-body-secondary",children:"Please sign in to your account"}),d&&e.jsx("p",{className:"text-danger",children:d}),e.jsxs(F,{onSubmit:y,children:[e.jsxs(C,{className:"mb-3",children:[e.jsx(j,{children:e.jsx(x,{icon:U})}),e.jsx(f,{placeholder:"Email",autoComplete:"username",value:o,onChange:r=>c(r.target.value)})]}),e.jsxs(C,{className:"mb-4",children:[e.jsx(j,{children:e.jsx(x,{icon:q})}),e.jsx(f,{type:"password",placeholder:"Password",autoComplete:"current-password",value:n,onChange:r=>l(r.target.value)})]}),e.jsx(h,{children:e.jsx(g,{xs:12,children:e.jsx(G,{type:"submit",color:"primary",className:"px-4",children:"Login"})})})]})]})})})})})})})};export{Q as default};
