
(function(){
 const routes={
  "home":"index.html","home 1":"index.html",
  "home 1 automation projects":"index.html",
  "home 1 - automation projects":"index.html",
  "home 1: automation projects":"index.html",
  "home 1 automation projects 2":"home-1-variant-2.html",
  "home 2":"home-2.html","home 2 turnkey robotics":"home-2.html",
  "home 2 - turnkey robotics":"home-2-variant-2.html",
  "home 2: turnkey robotics":"home-2-variant-2.html",
  "home 2 turnkey robotics 2":"home-2-variant-2.html",
  "services":"services.html","services & capabilities":"services.html",
  "case studies":"case-studies.html","case study":"case-studies.html",
  "case study detail":"case-study-hyperweld.html",
  "hyperweld":"case-study-hyperweld.html","hyperweld 7":"case-study-hyperweld.html",
  "tech specs":"tech-specs.html","tech specs & lab":"tech-specs.html",
  "tech specs lab":"tech-specs.html",
  "technical specifications":"tech-specs.html",
  "industries":"industries.html","industries served":"industries.html",
  "contact":"contact.html","contact & rfq":"contact.html",
  "request rfq":"contact.html","request quote":"contact.html",
  "submit rfq":"contact.html",
  "get in touch":"contact.html","request feasibility audit":"contact.html"
 };
 const norm=s=>(s||"").replace(/\s+/g," ").trim().toLowerCase();
 function toast(msg){
  const t=document.getElementById("nexus-toast");if(!t)return;
  t.textContent=msg;t.classList.add("show");clearTimeout(window.__nt);
  window.__nt=setTimeout(()=>t.classList.remove("show"),1500);
 }

 function links(){
  // data-path → file mapping (primary routing for navbar links)
  const pathRoutes={
   "home-automation-projects":"index.html",
   "home-turnkey-robotics":"home-2.html",
   "services":"services.html",
   "case-studies":"case-studies.html",
   "case-study-detail":"case-study-hyperweld.html",
   "industries-served":"industries.html",
   "tech-specs-and-lab":"tech-specs.html",
   "contact-and-rfq":"contact.html"
  };
  document.querySelectorAll('a[href="#"]').forEach(a=>{
   let target=null;
   // 1) Check data-path attribute first
   const dp=a.getAttribute("data-path");
   if(dp){
    // normalize: "contact-&amp;-rfq" → "contact-and-rfq", etc.
    const cleanDp=dp.replace(/&amp;/g,"&").replace(/&/g,"and").replace(/---/g,"-").replace(/--/g,"-");
    target=pathRoutes[cleanDp]||pathRoutes[dp];
   }
   // 2) Fall back to text-content matching
   if(!target){
    const txt=norm(a.textContent);
    const sorted = Object.entries(routes).sort((a,b)=>b[0].length - a[0].length);
    for(const[k,v] of sorted)if(txt===k||txt.includes(k)){target=v;break}
    if(!target&&/rfq|request quote|request audit|feasibility/.test(txt))target="contact.html";
    if(!target&&/case study|hyperweld|blueprint/.test(txt))target="case-studies.html";
    if(!target&&/technical|specification|tech specs/.test(txt))target="tech-specs.html";
    if(!target&&/industry|industries/.test(txt))target="industries.html";
   }
   if(target)a.href=target;
  });
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(a=>a.addEventListener("click",e=>{
   const el=document.querySelector(a.getAttribute("href"));
   if(el){e.preventDefault();el.scrollIntoView({behavior:"smooth"})}
  }));
 }
 function forms(){
  document.querySelectorAll("form").forEach(f=>f.addEventListener("submit",e=>{
   e.preventDefault();
   const bad=[...f.querySelectorAll("[required]")].find(x=>!x.value.trim());
   if(bad){bad.focus();toast("Please complete the required fields");return}
   f.reset();toast("Your request was submitted successfully");
  }));
 }

 // ── Theme System ───────────────────────────────────────────────
 // Apply saved theme IMMEDIATELY (before first paint) to avoid flash
 (function(){
  var saved=localStorage.getItem("nexus-theme");
  if(saved==="light"){
   document.documentElement.classList.remove("dark");
  }else{
   document.documentElement.classList.add("dark");
  }
 })();

 // Global toggle — called by the navbar button's onclick="toggleTheme()"
 window.toggleTheme=function(){
  var html=document.documentElement;
  var isDark=html.classList.contains("dark");
  var icon=document.getElementById("theme-icon");
  if(isDark){
   html.classList.remove("dark");
   localStorage.setItem("nexus-theme","light");
   if(icon)icon.textContent="light_mode";
  }else{
   html.classList.add("dark");
   localStorage.setItem("nexus-theme","dark");
   if(icon)icon.textContent="dark_mode";
  }
 };

 // ── RTL System ─────────────────────────────────────────────────
 // Apply saved direction immediately
 (function(){
  var saved=localStorage.getItem("nexus-dir");
  if(saved==="rtl"){
   document.documentElement.dir="rtl";
  }else{
   document.documentElement.dir="ltr";
  }
 })();

 // Global RTL toggle — called by the navbar button's onclick="toggleRTL()"
 window.toggleRTL=function(){
  var html=document.documentElement;
  var isRTL=html.dir==="rtl";
  if(isRTL){
   html.dir="ltr";
   localStorage.setItem("nexus-dir","ltr");
  }else{
   html.dir="rtl";
   localStorage.setItem("nexus-dir","rtl");
  }
 };

 // Sync icons to current state once DOM is ready
 document.addEventListener("DOMContentLoaded",function(){
  var themeIcon=document.getElementById("theme-icon");
  if(themeIcon){
   var saved=localStorage.getItem("nexus-theme");
   themeIcon.textContent=(saved==="light")?"light_mode":"dark_mode";
  }
  links();forms();
 });


})();

