import{R as l,b as c,P as a,r as f,_ as F,c as T}from"./index-D5mK4_IJ.js";import{C as I}from"./CFormFeedback-CLOsMfCj.js";var h=function(e){var n=e.describedby,t=e.feedback,r=e.feedbackInvalid,i=e.feedbackValid,o=e.invalid,d=e.tooltipFeedback,s=e.valid;return l.createElement(l.Fragment,null,t&&(s||o)&&l.createElement(I,c({},o&&{id:n},{invalid:o,tooltip:d,valid:s}),t),r&&l.createElement(I,{id:n,invalid:!0,tooltip:d},r),i&&l.createElement(I,{valid:!0,tooltip:d},i))};h.propTypes={describedby:a.string,feedback:a.oneOfType([a.node,a.string]),feedbackValid:a.oneOfType([a.node,a.string]),feedbackInvalid:a.oneOfType([a.node,a.string]),invalid:a.bool,tooltipFeedback:a.bool,valid:a.bool};h.displayName="CFormControlValidation";var N=f.forwardRef(function(e,n){var t=e.children,r=e.className,i=e.customClassName,o=F(e,["children","className","customClassName"]);return l.createElement("label",c({className:i??T("form-label",r)},o,{ref:n}),t)});N.propTypes={children:a.node,className:a.string,customClassName:a.string};N.displayName="CFormLabel";var O=f.forwardRef(function(e,n){var t=e.children,r=e.className,i=F(e,["children","className"]);return l.createElement("div",c({className:T("form-floating",r)},i,{ref:n}),t)});O.propTypes={children:a.node,className:a.string};O.displayName="CFormFloating";var C=f.forwardRef(function(e,n){var t=e.children,r=e.as,i=r===void 0?"div":r,o=e.className,d=F(e,["children","as","className"]);return l.createElement(i,c({className:T("form-text",o)},d,{ref:n}),t)});C.propTypes={as:a.elementType,children:a.node,className:a.string};C.displayName="CFormText";var E=function(e){var n=e.children,t=e.describedby,r=e.feedback,i=e.feedbackInvalid,o=e.feedbackValid,d=e.floatingClassName,s=e.floatingLabel,p=e.id,x=e.invalid,b=e.label,m=e.text,v=e.tooltipFeedback,u=e.valid,y=function(){return l.createElement(h,{describedby:t,feedback:r,feedbackInvalid:i,feedbackValid:o,floatingLabel:s,invalid:x,tooltipFeedback:v,valid:u})};return s?l.createElement(O,{className:d},n,l.createElement(N,{htmlFor:p},b||s),m&&l.createElement(C,{id:t},m),l.createElement(y,null)):l.createElement(l.Fragment,null,b&&l.createElement(N,{htmlFor:p},b),n,m&&l.createElement(C,{id:t},m),l.createElement(y,null))};E.propTypes=c({children:a.node,floatingClassName:a.string,floatingLabel:a.oneOfType([a.node,a.string]),label:a.oneOfType([a.node,a.string]),text:a.oneOfType([a.node,a.string])},h.propTypes);E.displayName="CFormControlWrapper";var S=f.forwardRef(function(e,n){var t,r=e.children,i=e.className,o=e.delay,d=o===void 0?!1:o,s=e.feedback,p=e.feedbackInvalid,x=e.feedbackValid,b=e.floatingClassName,m=e.floatingLabel,v=e.id,u=e.invalid,y=e.label,g=e.onChange,j=e.plainText,L=e.size,q=e.text,A=e.tooltipFeedback,R=e.type,w=R===void 0?"text":R,z=e.valid,P=F(e,["children","className","delay","feedback","feedbackInvalid","feedbackValid","floatingClassName","floatingLabel","id","invalid","label","onChange","plainText","size","text","tooltipFeedback","type","valid"]),W=f.useState(),V=W[0],B=W[1];return f.useEffect(function(){var k=setTimeout(function(){return V&&g&&g(V)},typeof d=="number"?d:500);return function(){return clearTimeout(k)}},[V]),l.createElement(E,{describedby:P["aria-describedby"],feedback:s,feedbackInvalid:p,feedbackValid:x,floatingClassName:b,floatingLabel:m,id:v,invalid:u,label:y,text:q,tooltipFeedback:A,valid:z},l.createElement("input",c({className:T(j?"form-control-plaintext":"form-control",(t={},t["form-control-".concat(L)]=L,t["form-control-color"]=w==="color",t["is-invalid"]=u,t["is-valid"]=z,t),i),id:v,type:w,onChange:function(k){return d?B(k):g&&g(k)}},P,{ref:n}),r))});S.propTypes=c({className:a.string,id:a.string,delay:a.oneOfType([a.bool,a.number]),plainText:a.bool,size:a.oneOf(["sm","lg"]),type:a.oneOfType([a.oneOf(["color","file","text"]),a.string])},E.propTypes);S.displayName="CFormInput";export{S as C,E as a,N as b};
