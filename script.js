const sidebar = document.getElementById("sidebar");
document.getElementById("navToggle")?.addEventListener("click",()=>sidebar.classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(a=>a.addEventListener("click",()=>sidebar.classList.remove("open")));

// Projects data - auto inject
const projects = [
 {title:"Sri Lanka Tourism Website",desc:"Imagery-first destination discovery site, fully responsive.",cat:"web",tags:["HTML","CSS"],link:"#"},
 {title:"Malcolm Lismore Photography",desc:"Full-stack photographer's site with wildlife, landscape, weddings.",cat:"web",tags:["PHP","MySQL"],link:"#"},
 {title:"LensArt Photography",desc:"Dark-themed portfolio with dynamic category filter.",cat:"web",tags:["HTML","PHP"],link:"#"},
 {title:"TravelBuddies.com - Courier",desc:"Courier tracking platform with role-based login (Figma).",cat:"design",tags:["Figma","UX"],link:"#"},
 {title:"EVC / EPN Mobile App",desc:"Mobile concept with eVideo discovery on dark canvas.",cat:"design",img:"images/images (3).jpg",tags:["Figma","Mobile"],link:"#"},
 {title:"Enterprise Network - Alliance Health",desc:"Two-site LAN/WAN design with VLANs, wireless, server room.",cat:"network",tags:["Packet Tracer"],link:"#"},
 {title:"Multi-Department VLAN",desc:"7-VLAN segmented office with OSPF routing.",cat:"network",tags:["OSPF","VLAN"],link:"#"},
 {title:"Production Management System",desc:"ER → UML → Use-case & flowcharts.",cat:"design",tags:["draw.io","UML"],link:"#"},
 {title:"IoT Smart Greenhouse",desc:"ESP32 + DHT22 automation via MQTT, Wokwi simulated.",cat:"network",tags:["ESP32","MQTT"],link:"#"},
];

const grid = document.getElementById("projectGrid");
function render(list){
 grid.innerHTML="";
 list.forEach(p=>{
   const imgId = Math.floor(Math.random()*30)+100;
   grid.innerHTML+=`
   <article class="project-card" data-cat="${p.cat}">
     <div class="p-img"><img src="https://picsum.photos/id/${imgId}/600/400" loading="lazy"></div>
     <div class="p-info">
       <h3>${p.title}</h3>
       <p>${p.desc}</p>
       <div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>
       <div class="p-foot"><a href="${p.link}" target="_blank">View →</a><span style="font-size:10px;opacity:.4;text-transform:uppercase">${p.cat}</span></div>
     </div>
   </article>`;
 });
}
render(projects);

// filter
document.querySelectorAll(".chip").forEach(ch=>{
 ch.addEventListener("click",()=>{
   document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));
   ch.classList.add("active");
   const f=ch.dataset.filter;
   if(f==="all") render(projects);
   else render(projects.filter(p=>p.cat===f));
 });
});

// scroll spy + reveal
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");
const obs = new IntersectionObserver((entries)=>{
 entries.forEach(e=>{
   if(e.isIntersecting){
     const id=e.target.id;
     navLinks.forEach(l=>l.classList.toggle("active",l.dataset.section===id));
   }
 });
},{rootMargin:"-40% 0px -55% 0px"});
sections.forEach(s=>obs.observe(s));

const reveal = new IntersectionObserver((entries)=>{
 entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in-view"); reveal.unobserve(e.target);} });
},{threshold:0.12});
sections.forEach(s=>reveal.observe(s));