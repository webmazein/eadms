import{y as S,r as ne,e as be,z as Oe}from"./index-Dwn7C7aW.js";var fe={},U={},N={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.isEventSourceSupported=e.isReactNative=e.ReadyState=e.DEFAULT_HEARTBEAT=e.UNPARSABLE_JSON_OBJECT=e.DEFAULT_RECONNECT_INTERVAL_MS=e.DEFAULT_RECONNECT_LIMIT=e.SOCKET_IO_PING_CODE=e.SOCKET_IO_PATH=e.SOCKET_IO_PING_INTERVAL=e.DEFAULT_EVENT_SOURCE_OPTIONS=e.EMPTY_EVENT_HANDLERS=e.DEFAULT_OPTIONS=void 0;var r=1,t=1e3*r;e.DEFAULT_OPTIONS={},e.EMPTY_EVENT_HANDLERS={},e.DEFAULT_EVENT_SOURCE_OPTIONS={withCredentials:!1,events:e.EMPTY_EVENT_HANDLERS},e.SOCKET_IO_PING_INTERVAL=25*t,e.SOCKET_IO_PATH="/socket.io/?EIO=3&transport=websocket",e.SOCKET_IO_PING_CODE="2",e.DEFAULT_RECONNECT_LIMIT=20,e.DEFAULT_RECONNECT_INTERVAL_MS=5e3,e.UNPARSABLE_JSON_OBJECT={},e.DEFAULT_HEARTBEAT={message:"ping",timeout:6e4,interval:25e3},function(a){a[a.UNINSTANTIATED=-1]="UNINSTANTIATED",a[a.CONNECTING=0]="CONNECTING",a[a.OPEN=1]="OPEN",a[a.CLOSING=2]="CLOSING",a[a.CLOSED=3]="CLOSED"}(e.ReadyState||(e.ReadyState={}));var n=function(){try{return"EventSource"in globalThis}catch{return!1}};e.isReactNative=typeof navigator<"u"&&navigator.product==="ReactNative",e.isEventSourceSupported=!e.isReactNative&&n()})(N);var B={},K={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.resetWebSockets=e.sharedWebSockets=void 0,e.sharedWebSockets={};var r=function(t){if(t&&e.sharedWebSockets.hasOwnProperty(t))delete e.sharedWebSockets[t];else for(var n in e.sharedWebSockets)e.sharedWebSockets.hasOwnProperty(n)&&delete e.sharedWebSockets[n]};e.resetWebSockets=r})(K);var Q={},w={};Object.defineProperty(w,"__esModule",{value:!0});w.setUpSocketIOPing=w.appendQueryParams=w.parseSocketIOUrl=void 0;var F=N,he=function(e){if(e){var r=/^https|wss/.test(e),t=e.replace(/^(https?|wss?)(:\/\/)?/,""),n=t.replace(/\/$/,""),a=r?"wss":"ws";return"".concat(a,"://").concat(n).concat(F.SOCKET_IO_PATH)}else if(e===""){var r=/^https/.test(window.location.protocol),a=r?"wss":"ws",u=window.location.port?":".concat(window.location.port):"";return"".concat(a,"://").concat(window.location.hostname).concat(u).concat(F.SOCKET_IO_PATH)}return e};w.parseSocketIOUrl=he;var ye=function(e,r){r===void 0&&(r={});var t=/\?([\w]+=[\w]+)/,n=t.test(e),a="".concat(Object.entries(r).reduce(function(u,i){var s=i[0],o=i[1];return u+"".concat(s,"=").concat(o,"&")},"").slice(0,-1));return"".concat(e).concat(n?"&":"?").concat(a)};w.appendQueryParams=ye;var ge=function(e,r){r===void 0&&(r=F.SOCKET_IO_PING_INTERVAL);var t=function(){return e(F.SOCKET_IO_PING_CODE)};return window.setInterval(t,r)};w.setUpSocketIOPing=ge;var j={};Object.defineProperty(j,"__esModule",{value:!0});j.heartbeat=void 0;var x=N;function Te(e,r){var t=r||{},n=t.interval,a=n===void 0?x.DEFAULT_HEARTBEAT.interval:n,u=t.timeout,i=u===void 0?x.DEFAULT_HEARTBEAT.timeout:u,s=t.message,o=s===void 0?x.DEFAULT_HEARTBEAT.message:s,c=!1,l=setInterval(function(){try{typeof o=="function"?e.send(o()):e.send(o)}catch{}},a),d=setInterval(function(){c?c=!1:e.close()},i);return e.addEventListener("close",function(){clearInterval(l),clearInterval(d)}),function(){c=!0}}j.heartbeat=Te;var P={},Y={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.resetSubscribers=e.removeSubscriber=e.addSubscriber=e.hasSubscribers=e.getSubscribers=void 0;var r={},t=[],n=function(o){return(0,e.hasSubscribers)(o)?Array.from(r[o]):t};e.getSubscribers=n;var a=function(o){var c;return((c=r[o])===null||c===void 0?void 0:c.size)>0};e.hasSubscribers=a;var u=function(o,c){r[o]=r[o]||new Set,r[o].add(c)};e.addSubscriber=u;var i=function(o,c){r[o].delete(c)};e.removeSubscriber=i;var s=function(o){if(o&&r.hasOwnProperty(o))delete r[o];else for(var c in r)r.hasOwnProperty(c)&&delete r[c]};e.resetSubscribers=s})(Y);Object.defineProperty(P,"__esModule",{value:!0});P.resetGlobalState=P.assertIsWebSocket=void 0;var Ne=K,Ce=Y;function me(e,r){if(!r&&!(e instanceof WebSocket))throw new Error("")}P.assertIsWebSocket=me;function we(e){(0,Ce.resetSubscribers)(e),(0,Ne.resetWebSockets)(e)}P.resetGlobalState=we;var G=S&&S.__assign||function(){return G=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++){r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},G.apply(this,arguments)};Object.defineProperty(Q,"__esModule",{value:!0});Q.attachListeners=void 0;var Ie=w,ke=j,m=N,Pe=P,Me=function(e,r,t){var n;if(r.current.heartbeat&&e instanceof WebSocket){var a=typeof r.current.heartbeat=="boolean"?void 0:r.current.heartbeat;n=(0,ke.heartbeat)(e,a)}e.onmessage=function(u){var i;n==null||n(),r.current.onMessage&&r.current.onMessage(u),!(typeof r.current.filter=="function"&&r.current.filter(u)!==!0)&&(r.current.heartbeat&&typeof r.current.heartbeat!="boolean"&&((i=r.current.heartbeat)===null||i===void 0?void 0:i.returnMessage)===u.data||t(u))}},Ae=function(e,r,t,n){e.onopen=function(a){r.current.onOpen&&r.current.onOpen(a),n.current=0,t(m.ReadyState.OPEN)}},Le=function(e,r,t,n,a){if(m.isEventSourceSupported&&e instanceof EventSource)return function(){};(0,Pe.assertIsWebSocket)(e,r.current.skipAssert);var u;return e.onclose=function(i){var s;if(r.current.onClose&&r.current.onClose(i),t(m.ReadyState.CLOSED),r.current.shouldReconnect&&r.current.shouldReconnect(i)){var o=(s=r.current.reconnectAttempts)!==null&&s!==void 0?s:m.DEFAULT_RECONNECT_LIMIT;if(a.current<o){var c=typeof r.current.reconnectInterval=="function"?r.current.reconnectInterval(a.current):r.current.reconnectInterval;u=window.setTimeout(function(){a.current++,n()},c??m.DEFAULT_RECONNECT_INTERVAL_MS)}else r.current.onReconnectStop&&r.current.onReconnectStop(o),console.warn("Max reconnect attempts of ".concat(o," exceeded"))}},function(){return u&&window.clearTimeout(u)}},We=function(e,r,t,n,a){var u;return e.onerror=function(i){var s;if(r.current.onError&&r.current.onError(i),m.isEventSourceSupported&&e instanceof EventSource&&(r.current.onClose&&r.current.onClose(G(G({},i),{code:1006,reason:"An error occurred with the EventSource: ".concat(i),wasClean:!1})),t(m.ReadyState.CLOSED),e.close()),r.current.retryOnError)if(a.current<((s=r.current.reconnectAttempts)!==null&&s!==void 0?s:m.DEFAULT_RECONNECT_LIMIT)){var o=typeof r.current.reconnectInterval=="function"?r.current.reconnectInterval(a.current):r.current.reconnectInterval;u=window.setTimeout(function(){a.current++,n()},o??m.DEFAULT_RECONNECT_INTERVAL_MS)}else r.current.onReconnectStop&&r.current.onReconnectStop(r.current.reconnectAttempts),console.warn("Max reconnect attempts of ".concat(r.current.reconnectAttempts," exceeded"))},function(){return u&&window.clearTimeout(u)}},Ue=function(e,r,t,n,a,u){var i=r.setLastMessage,s=r.setReadyState,o,c,l;return t.current.fromSocketIO&&(o=(0,Ie.setUpSocketIOPing)(u)),Me(e,t,i),Ae(e,t,s,a),c=Le(e,t,s,n,a),l=We(e,t,s,n,a),function(){s(m.ReadyState.CLOSING),c(),l(),e.close(),o&&clearInterval(o)}};Q.attachListeners=Ue;var q={},H=S&&S.__assign||function(){return H=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++){r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},H.apply(this,arguments)};Object.defineProperty(q,"__esModule",{value:!0});q.attachSharedListeners=void 0;var pe=K,M=N,R=Y,De=w,Re=j,je=function(e,r,t){var n;t&&e instanceof WebSocket&&(n=(0,Re.heartbeat)(e,typeof t=="boolean"?void 0:t)),e.onmessage=function(a){n==null||n(),(0,R.getSubscribers)(r).forEach(function(u){u.optionsRef.current.onMessage&&u.optionsRef.current.onMessage(a),!(typeof u.optionsRef.current.filter=="function"&&u.optionsRef.current.filter(a)!==!0)&&(t&&typeof t!="boolean"&&(t==null?void 0:t.returnMessage)===a.data||u.setLastMessage(a))})}},$e=function(e,r){e.onopen=function(t){(0,R.getSubscribers)(r).forEach(function(n){n.reconnectCount.current=0,n.optionsRef.current.onOpen&&n.optionsRef.current.onOpen(t),n.setReadyState(M.ReadyState.OPEN)})}},Fe=function(e,r){e instanceof WebSocket&&(e.onclose=function(t){(0,R.getSubscribers)(r).forEach(function(n){n.optionsRef.current.onClose&&n.optionsRef.current.onClose(t),n.setReadyState(M.ReadyState.CLOSED)}),delete pe.sharedWebSockets[r],(0,R.getSubscribers)(r).forEach(function(n){var a;if(n.optionsRef.current.shouldReconnect&&n.optionsRef.current.shouldReconnect(t)){var u=(a=n.optionsRef.current.reconnectAttempts)!==null&&a!==void 0?a:M.DEFAULT_RECONNECT_LIMIT;if(n.reconnectCount.current<u){var i=typeof n.optionsRef.current.reconnectInterval=="function"?n.optionsRef.current.reconnectInterval(n.reconnectCount.current):n.optionsRef.current.reconnectInterval;setTimeout(function(){n.reconnectCount.current++,n.reconnect.current()},i??M.DEFAULT_RECONNECT_INTERVAL_MS)}else n.optionsRef.current.onReconnectStop&&n.optionsRef.current.onReconnectStop(n.optionsRef.current.reconnectAttempts),console.warn("Max reconnect attempts of ".concat(u," exceeded"))}})})},Ge=function(e,r){e.onerror=function(t){(0,R.getSubscribers)(r).forEach(function(n){n.optionsRef.current.onError&&n.optionsRef.current.onError(t),M.isEventSourceSupported&&e instanceof EventSource&&(n.optionsRef.current.onClose&&n.optionsRef.current.onClose(H(H({},t),{code:1006,reason:"An error occurred with the EventSource: ".concat(t),wasClean:!1})),n.setReadyState(M.ReadyState.CLOSED))}),M.isEventSourceSupported&&e instanceof EventSource&&e.close()}},He=function(e,r,t,n){var a;return t.current.fromSocketIO&&(a=(0,De.setUpSocketIOPing)(n)),je(e,r,t.current.heartbeat),Fe(e,r),$e(e,r),Ge(e,r),function(){a&&clearInterval(a)}};q.attachSharedListeners=He;Object.defineProperty(B,"__esModule",{value:!0});B.createOrJoinSocket=void 0;var I=K,D=N,Je=Q,Ve=q,te=Y,Be=function(e,r,t,n,a){return function(){if((0,te.removeSubscriber)(e,r),!(0,te.hasSubscribers)(e)){try{var u=I.sharedWebSockets[e];u instanceof WebSocket&&(u.onclose=function(i){t.current.onClose&&t.current.onClose(i),n(D.ReadyState.CLOSED)}),u.close()}catch{}a&&a(),delete I.sharedWebSockets[e]}}},Ke=function(e,r,t,n,a,u,i,s){if(!D.isEventSourceSupported&&n.current.eventSourceOptions)throw D.isReactNative?new Error("EventSource is not supported in ReactNative"):new Error("EventSource is not supported");if(n.current.share){var o=null;I.sharedWebSockets[r]===void 0?(I.sharedWebSockets[r]=n.current.eventSourceOptions?new EventSource(r,n.current.eventSourceOptions):new WebSocket(r,n.current.protocols),e.current=I.sharedWebSockets[r],t(D.ReadyState.CONNECTING),o=(0,Ve.attachSharedListeners)(I.sharedWebSockets[r],r,n,s)):(e.current=I.sharedWebSockets[r],t(I.sharedWebSockets[r].readyState));var c={setLastMessage:a,setReadyState:t,optionsRef:n,reconnectCount:i,reconnect:u};return(0,te.addSubscriber)(r,c),Be(r,c,n,t,o)}else{if(e.current=n.current.eventSourceOptions?new EventSource(r,n.current.eventSourceOptions):new WebSocket(r,n.current.protocols),t(D.ReadyState.CONNECTING),!e.current)throw new Error("WebSocket failed to be created");return(0,Je.attachListeners)(e.current,{setLastMessage:a,setReadyState:t},n,u.current,i,s)}};B.createOrJoinSocket=Ke;var ve={};(function(e){var r=S&&S.__awaiter||function(s,o,c,l){function d(f){return f instanceof c?f:new c(function(E){E(f)})}return new(c||(c=Promise))(function(f,E){function y(_){try{v(l.next(_))}catch(g){E(g)}}function b(_){try{v(l.throw(_))}catch(g){E(g)}}function v(_){_.done?f(_.value):d(_.value).then(y,b)}v((l=l.apply(s,o||[])).next())})},t=S&&S.__generator||function(s,o){var c={label:0,sent:function(){if(f[0]&1)throw f[1];return f[1]},trys:[],ops:[]},l,d,f,E;return E={next:y(0),throw:y(1),return:y(2)},typeof Symbol=="function"&&(E[Symbol.iterator]=function(){return this}),E;function y(v){return function(_){return b([v,_])}}function b(v){if(l)throw new TypeError("Generator is already executing.");for(;c;)try{if(l=1,d&&(f=v[0]&2?d.return:v[0]?d.throw||((f=d.return)&&f.call(d),0):d.next)&&!(f=f.call(d,v[1])).done)return f;switch(d=0,f&&(v=[v[0]&2,f.value]),v[0]){case 0:case 1:f=v;break;case 4:return c.label++,{value:v[1],done:!1};case 5:c.label++,d=v[1],v=[0];continue;case 7:v=c.ops.pop(),c.trys.pop();continue;default:if(f=c.trys,!(f=f.length>0&&f[f.length-1])&&(v[0]===6||v[0]===2)){c=0;continue}if(v[0]===3&&(!f||v[1]>f[0]&&v[1]<f[3])){c.label=v[1];break}if(v[0]===6&&c.label<f[1]){c.label=f[1],f=v;break}if(f&&c.label<f[2]){c.label=f[2],c.ops.push(v);break}f[2]&&c.ops.pop(),c.trys.pop();continue}v=o.call(s,c)}catch(_){v=[6,_],d=0}finally{l=f=0}if(v[0]&5)throw v[1];return{value:v[0]?v[1]:void 0,done:!0}}};Object.defineProperty(e,"__esModule",{value:!0}),e.getUrl=void 0;var n=w,a=N,u=function(s){return new Promise(function(o){return window.setTimeout(o,s)})},i=function(s,o,c){return c===void 0&&(c=0),r(void 0,void 0,void 0,function(){var l,d,f,E,y,b,v,_;return t(this,function(g){switch(g.label){case 0:if(typeof s!="function")return[3,10];g.label=1;case 1:return g.trys.push([1,3,,9]),[4,s()];case 2:return l=g.sent(),[3,9];case 3:return g.sent(),o.current.retryOnError?(d=(b=o.current.reconnectAttempts)!==null&&b!==void 0?b:a.DEFAULT_RECONNECT_LIMIT,c<d?(f=typeof o.current.reconnectInterval=="function"?o.current.reconnectInterval(c):o.current.reconnectInterval,[4,u(f??a.DEFAULT_RECONNECT_INTERVAL_MS)]):[3,5]):[3,7];case 4:return g.sent(),[2,(0,e.getUrl)(s,o,c+1)];case 5:return(_=(v=o.current).onReconnectStop)===null||_===void 0||_.call(v,c),[2,null];case 6:return[3,8];case 7:return[2,null];case 8:return[3,9];case 9:return[3,11];case 10:l=s,g.label=11;case 11:return E=o.current.fromSocketIO?(0,n.parseSocketIOUrl)(l):l,y=o.current.queryParams?(0,n.appendQueryParams)(E,o.current.queryParams):E,[2,y]}})})};e.getUrl=i})(ve);var de={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.websocketWrapper=void 0;var r=function(t,n){return new Proxy(t,{get:function(a,u){var i=a[u];return u==="reconnect"?n:typeof i=="function"?(console.error("Calling methods directly on the websocket is not supported at this moment. You must use the methods returned by useWebSocket."),function(){}):i},set:function(a,u,i){return/^on/.test(u)?(console.warn("The websocket's event handlers should be defined through the options object passed into useWebSocket."),!1):(a[u]=i,!0)}})};e.websocketWrapper=r,e.default=e.websocketWrapper})(de);var k=S&&S.__assign||function(){return k=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++){r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},k.apply(this,arguments)},Qe=S&&S.__awaiter||function(e,r,t,n){function a(u){return u instanceof t?u:new t(function(i){i(u)})}return new(t||(t=Promise))(function(u,i){function s(l){try{c(n.next(l))}catch(d){i(d)}}function o(l){try{c(n.throw(l))}catch(d){i(d)}}function c(l){l.done?u(l.value):a(l.value).then(s,o)}c((n=n.apply(e,r||[])).next())})},Ye=S&&S.__generator||function(e,r){var t={label:0,sent:function(){if(u[0]&1)throw u[1];return u[1]},trys:[],ops:[]},n,a,u,i;return i={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function s(c){return function(l){return o([c,l])}}function o(c){if(n)throw new TypeError("Generator is already executing.");for(;t;)try{if(n=1,a&&(u=c[0]&2?a.return:c[0]?a.throw||((u=a.return)&&u.call(a),0):a.next)&&!(u=u.call(a,c[1])).done)return u;switch(a=0,u&&(c=[c[0]&2,u.value]),c[0]){case 0:case 1:u=c;break;case 4:return t.label++,{value:c[1],done:!1};case 5:t.label++,a=c[1],c=[0];continue;case 7:c=t.ops.pop(),t.trys.pop();continue;default:if(u=t.trys,!(u=u.length>0&&u[u.length-1])&&(c[0]===6||c[0]===2)){t=0;continue}if(c[0]===3&&(!u||c[1]>u[0]&&c[1]<u[3])){t.label=c[1];break}if(c[0]===6&&t.label<u[1]){t.label=u[1],u=c;break}if(u&&t.label<u[2]){t.label=u[2],t.ops.push(c);break}u[2]&&t.ops.pop(),t.trys.pop();continue}c=r.call(e,t)}catch(l){c=[6,l],a=0}finally{n=u=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}},qe=S&&S.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(U,"__esModule",{value:!0});U.useWebSocket=void 0;var h=ne,ee=be,C=N,ze=B,Xe=ve,Ze=qe(de),oe=P,xe=function(e,r,t){r===void 0&&(r=C.DEFAULT_OPTIONS),t===void 0&&(t=!0);var n=(0,h.useState)(null),a=n[0],u=n[1],i=(0,h.useState)({}),s=i[0],o=i[1],c=(0,h.useMemo)(function(){if(a)try{return JSON.parse(a.data)}catch{return C.UNPARSABLE_JSON_OBJECT}return null},[a]),l=(0,h.useRef)(null),d=(0,h.useRef)(null),f=(0,h.useRef)(function(){}),E=(0,h.useRef)(0),y=(0,h.useRef)([]),b=(0,h.useRef)(null),v=(0,h.useRef)(r);v.current=r;var _=l.current&&s[l.current]!==void 0?s[l.current]:e!==null&&t===!0?C.ReadyState.CONNECTING:C.ReadyState.UNINSTANTIATED,g=r.queryParams?JSON.stringify(r.queryParams):null,A=(0,h.useCallback)(function(O,T){var L;if(T===void 0&&(T=!0),C.isEventSourceSupported&&d.current instanceof EventSource){console.warn("Unable to send a message from an eventSource");return}((L=d.current)===null||L===void 0?void 0:L.readyState)===C.ReadyState.OPEN?((0,oe.assertIsWebSocket)(d.current,v.current.skipAssert),d.current.send(O)):T&&y.current.push(O)},[]),Se=(0,h.useCallback)(function(O,T){T===void 0&&(T=!0),A(JSON.stringify(O),T)},[A]),_e=(0,h.useCallback)(function(){return v.current.share!==!0||C.isEventSourceSupported&&d.current instanceof EventSource?d.current:(b.current===null&&d.current&&((0,oe.assertIsWebSocket)(d.current,v.current.skipAssert),b.current=(0,Ze.default)(d.current,f)),b.current)},[]);return(0,h.useEffect)(function(){if(e!==null&&t===!0){var O,T=!1,L=!0,ae=function(){return Qe(void 0,void 0,void 0,function(){var $,W,ce;return Ye(this,function(ue){switch(ue.label){case 0:return $=l,[4,(0,Xe.getUrl)(e,v)];case 1:return $.current=ue.sent(),l.current===null?(console.error("Failed to get a valid URL. WebSocket connection aborted."),l.current="ABORTED",(0,ee.flushSync)(function(){return o(function(p){return k(k({},p),{ABORTED:C.ReadyState.CLOSED})})}),[2]):(W=function(p){T||(0,ee.flushSync)(function(){return u(p)})},ce=function(p){T||(0,ee.flushSync)(function(){return o(function(Ee){var Z;return k(k({},Ee),l.current&&(Z={},Z[l.current]=p,Z))})})},L&&(O=(0,ze.createOrJoinSocket)(d,l.current,ce,v,W,f,E,A)),[2])}})})};return f.current=function(){T||(b.current&&(b.current=null),O==null||O(),ae())},ae(),function(){T=!0,L=!1,b.current&&(b.current=null),O==null||O(),u(null)}}else(e===null||t===!1)&&(E.current=0,o(function($){var W;return k(k({},$),l.current&&(W={},W[l.current]=C.ReadyState.CLOSED,W))}))},[e,t,g,A]),(0,h.useEffect)(function(){_===C.ReadyState.OPEN&&y.current.splice(0).forEach(function(O){A(O)})},[_]),{sendMessage:A,sendJsonMessage:Se,lastMessage:a,lastJsonMessage:c,readyState:_,getWebSocket:_e}};U.useWebSocket=xe;var z={},J=S&&S.__assign||function(){return J=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++){r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},J.apply(this,arguments)};Object.defineProperty(z,"__esModule",{value:!0});z.useSocketIO=void 0;var ie=ne,er=U,rr=N,re={type:"empty",payload:null},tr=function(e){if(!e||!e.data)return re;var r=e.data.match(/\[.*]/);if(!r)return re;var t=JSON.parse(r);return!Array.isArray(t)||!t[1]?re:{type:t[0],payload:t[1]}},nr=function(e,r,t){r===void 0&&(r=rr.DEFAULT_OPTIONS),t===void 0&&(t=!0);var n=(0,ie.useMemo)(function(){return J(J({},r),{fromSocketIO:!0})},[]),a=(0,er.useWebSocket)(e,n,t),u=a.sendMessage,i=a.sendJsonMessage,s=a.lastMessage,o=a.readyState,c=a.getWebSocket,l=(0,ie.useMemo)(function(){return tr(s)},[s]);return{sendMessage:u,sendJsonMessage:i,lastMessage:l,lastJsonMessage:l,readyState:o,getWebSocket:c}};z.useSocketIO=nr;var X={},V=S&&S.__assign||function(){return V=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++){r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},V.apply(this,arguments)},ar=S&&S.__rest||function(e,r){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)r.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(t[n[a]]=e[n[a]]);return t};Object.defineProperty(X,"__esModule",{value:!0});X.useEventSource=void 0;var se=ne,cr=U,le=N,ur=function(e,r,t){r===void 0&&(r=le.DEFAULT_EVENT_SOURCE_OPTIONS);var n=r.withCredentials,a=r.events,u=ar(r,["withCredentials","events"]);t===void 0&&(t=!0);var i=V(V({},u),{eventSourceOptions:{withCredentials:n}}),s=(0,se.useRef)(le.EMPTY_EVENT_HANDLERS);a&&(s.current=a);var o=(0,cr.useWebSocket)(e,i,t),c=o.lastMessage,l=o.readyState,d=o.getWebSocket;return(0,se.useEffect)(function(){c!=null&&c.type&&Object.entries(s.current).forEach(function(f){var E=f[0],y=f[1];E===c.type&&y(c)})},[c]),{lastEvent:c,readyState:l,getEventSource:d}};X.useEventSource=ur;(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.resetGlobalState=e.useEventSource=e.ReadyState=e.useSocketIO=e.default=void 0;var r=U;Object.defineProperty(e,"default",{enumerable:!0,get:function(){return r.useWebSocket}});var t=z;Object.defineProperty(e,"useSocketIO",{enumerable:!0,get:function(){return t.useSocketIO}});var n=N;Object.defineProperty(e,"ReadyState",{enumerable:!0,get:function(){return n.ReadyState}});var a=X;Object.defineProperty(e,"useEventSource",{enumerable:!0,get:function(){return a.useEventSource}});var u=P;Object.defineProperty(e,"resetGlobalState",{enumerable:!0,get:function(){return u.resetGlobalState}})})(fe);const ir=Oe(fe);export{ir as u};
