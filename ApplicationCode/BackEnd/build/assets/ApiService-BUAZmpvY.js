import{a as c}from"./axios-B4uVmeYG.js";import{B as t}from"./ReactToastify-CzdmNUfT.js";import{b as d}from"./config-6WvNVX-n.js";const m=c.create({baseURL:d}),f={request:async(o,a,s=null,n={},i)=>{try{const r=localStorage.getItem("token"),e=await m({method:o,url:a,data:s,headers:{Authorization:`Bearer ${r}`,...n}});if(e.data.status===403){t.error("Forbidden: Redirecting to home"),i("/");return}return e.data}catch(r){throw console.error("Error in API request:",r),t.error("API request failed"),r}}};export{f as A};
