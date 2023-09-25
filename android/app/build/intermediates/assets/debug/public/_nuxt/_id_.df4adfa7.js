import{_ as P}from"./Loading.5df64747.js";import{_ as Y}from"./Errors.vue.bc7a76da.js";import{_ as K}from"./Button.vue.17ced2eb.js";import{u as Q,_ as X}from"./Input.vue.916b0df8.js";import{c as Z,a as ee,_ as oe}from"./index.esm.3d2d93f0.js";import te from"./Icon.e1f6f755.js";import{u as se}from"./mainstore.7ca5d774.js";import{l as c,f as ae,C as ne,g as re,r as _,n as le,D as ue,o as l,c as v,m as o,q as L,F as C,a as s,t as ie,b as d,w as U,v as T,x as de,s as ce,d as I,y as me}from"./entry.ff4e4d2d.js";import{u as B}from"./fetch.85b6bac0.js";import"./useTailwindConfig.8c6cfb4f.js";import"./config.7144edff.js";import"./defu.5a7c1433.js";const pe=()=>{const h=se(),m=c(()=>h.getLoading),w=c(()=>h.getError);return{mainStore:h,compLoading:m,compError:w}},_e={key:0},ve={class:"my-12"},fe={class:"md:text-5xl text-primary-800 dark:text-white font-bold mb-8 flex justify-between items-center"},ge={class:"bg-white dark:bg-gray-700 rounded-lg"},he={class:"flex justify-between px-4 py-2"},we=s("div",null,null,-1),ye=["onClick"],Ve={class:"flex mb-4 pb-4 flex-wrap md:flex-nowrap"},qe={class:"px-2 w-full md:w-[50%] md:mr-2"},xe={class:"px-2 w-full md:w-[50%] md:ml-2"},He=ae({__name:"[id]",async setup(h){let m,w;const{compLoading:N,compError:S,mainStore:p}=pe(),D=ne().params.id,E=re(),f=_(""),y=_([]),$=_([]),q=_(0),F=()=>{q.value++,a.value.push({dt:"",dd:"",count:q.value,id:String(Date.now()+q.value+Math.random())})},j=t=>{x.value>1&&($.value.push(a.value[t]),a.value.splice(t,1))},x=c(()=>a.value.length),z=c(()=>n.value?n.value.title:""),A=c(()=>n.value?n.value.tags.map(t=>t.title):[]),a=c(()=>n.value?n.value.words:[]),H=c(()=>n.value?n.value.id:null),M=Z().shape({ctitle:ee().required("Enter a title").min(1).max(100)}),{handleSubmit:W,errors:be}=Q({validationSchema:M}),k=W(async()=>{await B(`/api/course/${E.value.id}`,{method:"PATCH",body:{course_title:f.value,course_tags:y.value,course_words:a.value,course_count:x.value,course_id:H.value,removed_words:$},onRequest({request:t,options:e}){p.setLoading(!0),n.value=null},onRequestError({request:t,options:e,error:r}){g.value="Request error! "+r.message},onResponse({request:t,response:e,options:r}){p.setLoading(!1),console.log(e._data.title)},onResponseError({request:t,response:e,options:r}){p.setLoading(!1),g.value="Response error! "+e.statusText}},"$Gfp5eNdSnE"),le("/user/courses/")},()=>{console.log("fail")});_(!1);const g=_(""),{data:n,pending:Se,error:Ee,refresh:$e}=([m,w]=ue(()=>B(`/api/course/${E.value.id}`,{query:{courseId:D},onRequest({request:t,options:e}){p.setLoading(!0)},onRequestError({request:t,options:e,error:r}){g.value=r.message},onResponse({request:t,response:e,options:r}){p.setLoading(!1),g.value="",f.value=e._data.title},onResponseError({request:t,response:e,options:r}){p.setLoading(!1),g.value=e.statusText}},"$hYnJmE7Ovv")),m=await m,w(),m);return(t,e)=>{const r=P,G=Y,R=K,b=X,J=oe,O=te;return l(),v("div",null,[o(N)?(l(),L(r,{key:0})):(l(),v(C,{key:1},[o(S).length?(l(),L(G,{key:0,errors:o(S)},null,8,["errors"])):(l(),v(C,{key:1},[o(n)?(l(),v("div",_e,[s("div",ve,[s("div",fe,[s("span",null,ie(o(z))+" [editing]",1),d(R,{size:"md",rounded:!0,onClick:o(k)},{default:U(()=>[I("Save")]),_:1},8,["onClick"])])]),s("form",{onSubmit:e[2]||(e[2]=(...u)=>o(k)&&o(k)(...u))},[d(b,{modelValue:o(f),"onUpdate:modelValue":e[0]||(e[0]=u=>T(f)?f.value=u:null),placeholder:"Course title",name:"ctitle"},null,8,["modelValue"]),d(J,{modelValue:o(y),"onUpdate:modelValue":e[1]||(e[1]=u=>T(y)?y.value=u:null),initialTags:o(A),options:["Hello","World"],showCount:!0},null,8,["modelValue","initialTags"]),(l(!0),v(C,null,de(o(a),(u,i)=>(l(),v("div",{class:"my-4",key:u.count},[s("div",ge,[s("div",he,[we,s("div",null,[s("div",{onClick:V=>j(i),class:me(["cursor-pointer",{"opacity-30":o(x)<2}])},[d(O,{name:"pajamas:remove",size:"20"})],10,ye)])]),s("div",Ve,[s("div",qe,[d(b,{modelValue:o(a)[i].dt,"onUpdate:modelValue":V=>o(a)[i].dt=V,placeholder:"Term",name:`newitems[${i}].dt`},null,8,["modelValue","onUpdate:modelValue","name"])]),s("div",xe,[d(b,{modelValue:o(a)[i].dd,"onUpdate:modelValue":V=>o(a)[i].dd=V,placeholder:"Value",name:`newitems[${i}].dd`},null,8,["modelValue","onUpdate:modelValue","name"])])])])]))),128)),s("div",{class:"my-8",onClick:F},[d(R,{liquid:!0,rounded:!0},{default:U(()=>[I("Add new word")]),_:1})])],32)])):ce("",!0)],64))],64))])}}});export{He as default};