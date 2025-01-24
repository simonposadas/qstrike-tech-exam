(function(){"use strict";var e={282:function(e,t,o){var l=o(5130),n=o(657),s=o(6768);function a(e,t,o,l,n,a){const r=(0,s.g2)("MainPage");return(0,s.uX)(),(0,s.Wv)(r,{msg:"Welcome to Your To-do List"})}o(8992),o(4520);var r=o(4232),i=o(144),u=o.p+"img/drag.afa2a4b7.png";o(4114),o(2577);const c=(0,n.nY)("todo",{state:()=>({todos:JSON.parse(localStorage.getItem("todos"))||[]}),getters:{completedTodos:e=>e.todos.filter((e=>e.completed)),todoCount:e=>e.todos.length},actions:{addTodo(e){const t={id:Date.now(),text:e,completed:!1};this.todos.push(t),this.saveToLocalStorage()},editTodo(e,t){const o=this.todos.find((t=>t.id===e));o&&(o.text=t,this.saveToLocalStorage())},toggleTodo(e){const t=this.todos.find((t=>t.id===e));t&&(t.completed=!t.completed,this.saveToLocalStorage())},deleteTodo(e){this.todos=this.todos.filter((t=>t.id!==e)),this.saveToLocalStorage()},saveToLocalStorage(){localStorage.setItem("todos",JSON.stringify(this.todos))},updateTodoOrder(e){this.todos=e,this.saveToLocalStorage()}}});var d=o(1527),p=o.n(d);const f={class:"p-6"},v={class:"flex justify-center items-center gap-2 mb-4"},g={class:""},b={class:"ml-2"},h={class:"space-y-4 mt-2"},k={class:"flex items-center gap-2 flex-grow"},m=["checked","onChange"],x={class:"flex gap-2 ml-auto"},y=["onClick"],w=["onClick"],L={class:"ml-2"},C={class:"space-y-4 mt-2"},T={class:"flex items-center justify-between"},_={class:"flex items-center gap-2"},O=["onChange"],j={class:"text-lg text-left line-through text-gray-500 flex-grow break-words whitespace-pre-line ml-2"},S={class:"flex gap-2"},E=["onClick"],W={class:"mt-6 text-center"},D={class:"font-bold"},P={class:"font-bold"},R={class:"font-bold"},K={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"},X={class:"bg-white p-6 rounded shadow-lg w-96 text-center"};var M={__name:"MainPage",setup(e){const t=c(),o=(0,i.KR)(""),n=(0,i.KR)(!1),a=(0,i.KR)(""),d=(0,i.KR)(null),M=(0,i.KR)(!1),A=(0,i.KR)(!0),I=(0,s.EW)((()=>t.todos.filter((e=>e.completed)))),J=(0,s.EW)((()=>t.todos.filter((e=>!e.completed)))),q=()=>{console.log("updatehere",J.value),t.updateTodoOrder([...J.value])},F=()=>{o.value.trim()&&(t.addTodo(o.value),o.value="")},G=e=>{n.value=!0,a.value=e.text,d.value=e.id},N=()=>{null!==d.value&&a.value.trim()&&(t.editTodo(d.value,a.value),Q())},Q=()=>{n.value=!1,a.value="",d.value=null},U=e=>{t.toggleTodo(e)},V=e=>{t.deleteTodo(e)},Y=()=>{M.value=!M.value},z=()=>{A.value=!A.value};return(e,c)=>((0,s.uX)(),(0,s.CE)("div",f,[c[7]||(c[7]=(0,s.Lk)("h1",{class:"text-3xl font-bold mb-6 text-center"},"To-Do List",-1)),(0,s.Lk)("div",v,[(0,s.bo)((0,s.Lk)("textarea",{"onUpdate:modelValue":c[0]||(c[0]=e=>o.value=e),placeholder:"Add a new to-do",class:"border rounded px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"},null,512),[[l.Jo,o.value]]),(0,s.Lk)("button",{onClick:F,class:"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"}," Add ")]),(0,s.Lk)("div",g,[(0,s.Lk)("button",{onClick:z,class:"w-full text-left bg-yellow-200 px-4 py-2 rounded mt-4 flex justify-between items-center"},[(0,s.eW)(" In Progress Tasks ("+(0,r.v_)(J.value.length)+") ",1),(0,s.Lk)("span",b,(0,r.v_)(A.value?"▲":"▼"),1)]),(0,s.bo)((0,s.Lk)("div",h,[(0,s.bF)((0,i.R1)(p()),{list:J.value,group:{name:"todos",pull:"clone",put:!0},"item-key":"id",class:"space-y-4 flex flex-col justify-center w-full",handle:".drag-icon",onEnd:q},{item:(0,s.k6)((({element:e})=>[((0,s.uX)(),(0,s.CE)("li",{key:e.id,class:(0,r.C4)(["flex items-center w-[40%] p-4 border rounded shadow-sm bg-white mx-2",{"bg-gray-100":e.completed}])},[c[2]||(c[2]=(0,s.Lk)("img",{alt:"drag logo",src:u,class:"drag-icon h-5 w-5 object-contain mr-4 cursor-move"},null,-1)),(0,s.Lk)("div",k,[(0,s.Lk)("input",{type:"checkbox",checked:e.completed,onChange:t=>U(e.id),class:"h-5 w-5 text-blue-600 border-2 flex-shrink-0"},null,40,m),(0,s.Lk)("span",{class:(0,r.C4)([{"line-through text-gray-500":e.completed},"text-lg flex-grow text-left break-words whitespace-pre-line ml-2"])},(0,r.v_)(e.text),3)]),(0,s.Lk)("div",x,[e.completed?(0,s.Q3)("",!0):((0,s.uX)(),(0,s.CE)("button",{key:0,onClick:t=>G(e),class:"bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"}," Edit ",8,y)),(0,s.Lk)("button",{onClick:t=>V(e.id),class:"bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"}," Delete ",8,w)])],2))])),_:1},8,["list"])],512),[[l.aG,A.value]])]),(0,s.Lk)("div",null,[(0,s.Lk)("button",{onClick:Y,class:"w-full text-left bg-green-400 px-4 py-2 rounded mt-4 flex justify-between items-center"},[(0,s.eW)(" Completed Tasks ("+(0,r.v_)(I.value.length)+") ",1),(0,s.Lk)("span",L,(0,r.v_)(M.value?"▲":"▼"),1)]),(0,s.bo)((0,s.Lk)("div",C,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(I.value,(e=>((0,s.uX)(),(0,s.CE)("div",{key:e.id,class:"p-4 border rounded shadow-sm bg-gray-100 w-lg"},[(0,s.Lk)("div",T,[(0,s.Lk)("div",_,[(0,s.Lk)("input",{type:"checkbox",checked:"",onChange:t=>U(e.id),class:"h-5 w-5 text-blue-600 border-2 flex-shrink-0"},null,40,O),(0,s.Lk)("span",j,(0,r.v_)(e.text),1)]),(0,s.Lk)("div",S,[(0,s.Lk)("button",{onClick:t=>V(e.id),class:"bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"}," Delete ",8,E)])])])))),128))],512),[[l.aG,M.value]])]),(0,s.Lk)("div",W,[(0,s.Lk)("p",null,[c[3]||(c[3]=(0,s.eW)(" Active To-Dos: ")),(0,s.Lk)("span",D,(0,r.v_)(J.value.length),1)]),(0,s.Lk)("p",null,[c[4]||(c[4]=(0,s.eW)(" Total To-Dos: ")),(0,s.Lk)("span",P,(0,r.v_)((0,i.R1)(t).todoCount),1)]),(0,s.Lk)("p",null,[c[5]||(c[5]=(0,s.eW)(" Completed To-Dos: ")),(0,s.Lk)("span",R,(0,r.v_)(I.value.length),1)])]),n.value?((0,s.uX)(),(0,s.CE)("div",K,[(0,s.Lk)("div",X,[c[6]||(c[6]=(0,s.Lk)("h3",{class:"text-2xl font-semibold mb-4"},"Edit To-Do",-1)),(0,s.bo)((0,s.Lk)("textarea",{"onUpdate:modelValue":c[1]||(c[1]=e=>a.value=e),class:"border rounded px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none",rows:"4","max-rows":"10",style:{"max-height":"10em","overflow-y":"auto"},placeholder:"Edit your to-do here"},null,512),[[l.Jo,a.value]]),(0,s.Lk)("div",{class:"flex justify-between"},[(0,s.Lk)("button",{onClick:N,class:"bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"}," Save "),(0,s.Lk)("button",{onClick:Q,class:"bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"}," Cancel ")])])])):(0,s.Q3)("",!0)]))}};const A=M;var I=A,J={name:"App",components:{MainPage:I}},q=o(1241);const F=(0,q.A)(J,[["render",a]]);var G=F;const N=(0,l.Ef)(G);N.use((0,n.Ey)()),N.mount("#app")}},t={};function o(l){var n=t[l];if(void 0!==n)return n.exports;var s=t[l]={exports:{}};return e[l].call(s.exports,s,s.exports,o),s.exports}o.m=e,function(){var e=[];o.O=function(t,l,n,s){if(!l){var a=1/0;for(c=0;c<e.length;c++){l=e[c][0],n=e[c][1],s=e[c][2];for(var r=!0,i=0;i<l.length;i++)(!1&s||a>=s)&&Object.keys(o.O).every((function(e){return o.O[e](l[i])}))?l.splice(i--,1):(r=!1,s<a&&(a=s));if(r){e.splice(c--,1);var u=n();void 0!==u&&(t=u)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[l,n,s]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var l in t)o.o(t,l)&&!o.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.p="/qstrike-tech-exam/"}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,l){var n,s,a=l[0],r=l[1],i=l[2],u=0;if(a.some((function(t){return 0!==e[t]}))){for(n in r)o.o(r,n)&&(o.m[n]=r[n]);if(i)var c=i(o)}for(t&&t(l);u<a.length;u++)s=a[u],o.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return o.O(c)},l=self["webpackChunkqstrike_tech_exam"]=self["webpackChunkqstrike_tech_exam"]||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))}();var l=o.O(void 0,[504],(function(){return o(282)}));l=o.O(l)})();
//# sourceMappingURL=app.04ec1c51.js.map