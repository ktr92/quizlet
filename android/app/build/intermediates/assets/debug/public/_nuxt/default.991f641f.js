import{_ as N}from"./Loading.5df64747.js";import{_ as B}from"./nuxt-link.9fc598ad.js";import L from"./Icon.e1f6f755.js";import{_ as T}from"./Iconbutton.vue.e4a6a3d2.js";import{_ as H}from"./Button.vue.17ced2eb.js";import{u as I}from"./useTailwindConfig.8c6cfb4f.js";import{f as C,r as y,i as V,g as U,l as M,o as a,c,a as e,m as o,b as t,w as s,d as i,s as v,q as h,y as w,t as O,a2 as j,n as A,k as E,_ as q,X as D}from"./entry.ff4e4d2d.js";import{u as z}from"./mainstore.7ca5d774.js";import{_ as F}from"./page.27ace5d0.js";import"./config.7144edff.js";import"./defu.5a7c1433.js";const P={class:"bg-white border-gray-200 px-4 lg:px-6 py-2 dark:bg-gray-800 relative"},X={class:"max-w-[1200px] mx-auto py-2"},G={class:""},J={class:"flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"},K={class:"hidden md:block"},Q={key:0},R={class:"-mx-4 flex items-center"},W={class:"px-4"},Y={class:"px-4"},Z={class:"px-4"},ee=E('<span class="sr-only">Open main menu</span><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg><svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>',3),te=[ee],se={class:"flex items-center lg:order-2"},oe={key:1,class:"flex items-center"},ae={class:"flex items-center"},ne=["src"],re={class:"ml-2 text-sm leading-4 hidden sm:block"},ie=["onClick"],ce={class:"-mx-4 pt-4"},le={class:"px-4 mb-4"},de={class:"px-4 mb-4"},_e={class:"px-4 mb-2"},ue=C({__name:"Header",setup(k){const{defaultTransition:l}=I(),r=y(!1),u=y(null),m=V(),d=U(),p=z(),g=()=>{p.changeMode()},x=M(()=>p.getMode),f=async()=>{await m.auth.signOut(),A("/login")},_=()=>{r.value=!r.value};return(ve,we)=>{const n=B,b=L,S=T,$=H;return a(),c("div",P,[e("div",X,[e("nav",G,[e("div",J,[e("div",K,[o(d)?(a(),c("div",Q,[e("ul",R,[e("li",W,[t(n,{to:"/user/add/",class:"text-white focus:ring-4 !outline-none focus:!outline-none font-medium px-[15px] py-1 md:py-[10px] text-md text-center cursor-pointer whitespace-nowrap bg-primary-600 text-white dark:bg-primary-500 hover:bg-primary-300 rounded"},{default:s(()=>[i(" Create course ")]),_:1})]),e("li",Y,[t(n,{class:"text-primary-900 dark:text-white",to:"/user/courses/"},{default:s(()=>[i("Courses")]),_:1})]),e("li",Z,[t(n,{class:"text-primary-900 dark:text-white",to:"/user/tags/"},{default:s(()=>[i("Tags")]),_:1})])])])):v("",!0)]),e("button",{"data-collapse-toggle":"mobile-menu-2",type:"button",class:"inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600","aria-controls":"mobile-menu-2","aria-expanded":"false",onClick:_,ref_key:"dropdown",ref:u},te,512),e("div",se,[t(S,{class:"mr-4 coursor-pointer",onSomeEvent:g,classes:"w-9 h-9 bg-slate-100 hover:bg-primary-500 text-white dark:bg-gray-800 coloredsvg",type:"round"},{default:s(()=>[o(x)?(a(),h(b,{key:0,name:"ic:outline-light-mode",size:"22"})):(a(),h(b,{key:1,name:"ic:outline-dark-mode",size:"22"}))]),_:1}),o(d)?(a(),c("div",oe,[t(n,{to:"/user",class:"text-primary-200 dark:text-white mr-4"},{default:s(()=>[e("div",ae,[e("img",{src:o(d).user_metadata.picture,alt:"user.user_metadata.name",class:"w-8 h-8 rounded-full"},null,8,ne),e("span",re,O(o(d).user_metadata.name),1)])]),_:1}),e("button",{onClick:j(f,["prevent"]),class:w(["text-white bg-[#423ed8] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 whitespace-nowrap",o(l)])}," Sign Out ",10,ie)])):(a(),h(n,{key:0,class:w([o(l),"text-white bg-[#423ed8] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"]),to:"/login"},{default:s(()=>[i("Log in")]),_:1},8,["class"]))]),o(r)?(a(),c("div",{key:0,class:"absolute top-[100%] left-0 justify-between items-center w-full lg:flex lg:w-auto lg:order-1 bg-white dark:bg-primary-800 pb-4 px-4 z-50",id:"mobile-menu-2",onClick:_},[e("ul",ce,[e("li",le,[t($,{class:"rounded"},{default:s(()=>[t(n,{to:"/user/add/"},{default:s(()=>[i("Create course")]),_:1})]),_:1})]),e("li",de,[t(n,{class:"text-primary-900 dark:text-white",to:"/user/courses/"},{default:s(()=>[i("Courses")]),_:1})]),e("li",_e,[t(n,{class:"text-primary-900 dark:text-white",to:"/user/tags/"},{default:s(()=>[i("Tags")]),_:1})])])])):v("",!0)])])])])}}}),me={};function pe(k,l){return a(),c("div")}const ge=q(me,[["render",pe]]),xe={key:0},fe={class:"min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden"},he={class:"max-w-[1200px] w-full px-2 mx-auto my-2 md:my-4"},ye=e("div",{id:"modals",class:"relative z-20"},null,-1),He=C({__name:"default",setup(k){const l=D(),r=y(!1);l.hook("page:start",()=>{r.value=!0}),l.hook("page:finish",()=>{r.value=!1});const u=z(),m=M(()=>u.getMode);return(d,p)=>{const g=N,x=ue,f=F,_=ge;return a(),c("div",{class:w({dark:o(m)})},[o(r)?(a(),c("div",xe,[t(g,{type:"full"})])):v("",!0),e("div",fe,[e("div",null,[t(x),e("div",he,[t(f)])]),t(_)]),ye],2)}}});export{He as default};
