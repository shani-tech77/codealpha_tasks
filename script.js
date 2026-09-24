const photos=[
 {src:"https://picsum.photos/id/1015/1400/1000",caption:"River bend, Norway",region:"Europe Coast",place:"Lofoten"},
 {src:"https://picsum.photos/id/1016/1000/1400",caption:"Canyon light, Arizona",region:"Americas Desert",place:"Grand Canyon"},
 {src:"https://picsum.photos/id/1018/1000/1400",caption:"Pine ridge, Slovenia",region:"Europe",place:"Julian Alps"},
 {src:"https://picsum.photos/id/1021/1000/1400",caption:"Lake at dusk, Chile",region:"Americas Coast",place:"Patagonia"},
 {src:"https://picsum.photos/id/1024/1000/1400",caption:"Old town rooftops, Portugal",region:"Europe Coast",place:"Lisbon"},
 {src:"https://picsum.photos/id/1035/1000/1400",caption:"Fog over the hills, Scotland",region:"Europe",place:"Isle of Skye"},
 {src:"https://picsum.photos/id/1039/1400/1000",caption:"Harbor morning, Croatia",region:"Europe Coast",place:"Hvar"},
 {src:"https://picsum.photos/id/1043/1000/1400",caption:"Market stall, Vietnam",region:"Asia",place:"Hanoi"},
 {src:"https://picsum.photos/id/1044/1000/1400",caption:"Terraced fields, Bali",region:"Asia",place:"Ubud"},
 {src:"https://picsum.photos/id/1050/1000/1400",caption:"Desert road, Namibia",region:"Desert",place:"Sossusvlei"},
 {src:"https://picsum.photos/id/1056/1000/1400",caption:"Snow line, Japan",region:"Asia",place:"Hokkaido"},
 {src:"https://picsum.photos/id/1074/1000/1400",caption:"Coastal cliffs, Ireland",region:"Europe Coast",place:"Moher"},
];
const gallery=document.getElementById('gallery');
const lightbox=document.getElementById('lightbox');
const lbImg=document.getElementById('lbImg');
const lbCaption=document.getElementById('lbCaption');
const lbCounter=document.getElementById('lbCounter');
let current=0;
let filtered=photos;

function render(list=photos){
  gallery.innerHTML='';
  filtered=list;
  list.forEach((p,i)=>{
    const realIndex=photos.indexOf(p);
    const card=document.createElement('div');
    card.className='card';
    card.innerHTML=`
      <img src="${p.src}" loading="lazy" alt="${p.caption}">
      <div class="meta">
        <div class="top"><span class="tag">${p.place}</span><button class="dl">⬇</button></div>
        <div class="bottom"><h3>${p.caption}</h3><p>${p.region}</p></div>
      </div>`;
    card.querySelector('.dl').addEventListener('click',e=>{e.stopPropagation();download(p.src,p.caption)});
    card.addEventListener('click',()=>open(realIndex));
    gallery.appendChild(card);
  });
}
function open(idx){current=idx;show(current);lightbox.classList.add('open');document.body.style.overflow='hidden'}
function close(){lightbox.classList.remove('open');document.body.style.overflow=''}
function show(idx){
  const p=photos[idx];
  lbImg.src=p.src;lbCaption.textContent=p.caption+' — '+p.place;
  lbCounter.textContent=(idx+1)+' / '+photos.length;
}
function next(){current=(current+1)%photos.length;show(current)}
function prev(){current=(current-1+photos.length)%photos.length;show(current)}
function download(url,name){
  const safe=name.replace(/[^a-z0-9]/gi,'-').toLowerCase()+'.jpg';
  fetch(url).then(r=>r.blob()).then(b=>{
    const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=safe;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u);
  }).catch(()=>window.open(url,'_blank'));
}
function downloadAll(){filtered.forEach((p,i)=>setTimeout(()=>download(p.src,p.caption),i*400))}

document.getElementById('lbClose').onclick=close;
document.getElementById('lbNext').onclick=next;
document.getElementById('lbPrev').onclick=prev;
document.getElementById('lbDownload').onclick=()=>download(photos[current].src,photos[current].caption);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)close()});
document.addEventListener('keydown',e=>{
  if(!lightbox.classList.contains('open'))return;
  if(e.key==='Escape')close();if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev();
});

// Filters
document.querySelectorAll('.chip').forEach(ch=>{
  ch.addEventListener('click',()=>{
    document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    ch.classList.add('active');
    const f=ch.dataset.filter;
    if(f==='all') render(photos);
    else render(photos.filter(p=>p.region.includes(f)));
  });
});
render(photos);
