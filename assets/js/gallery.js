(()=>{
const galleries=document.querySelectorAll('.shots');
if(!galleries.length)return;
const overlay=document.createElement('div');
overlay.className='portfolio-lightbox';
overlay.innerHTML='<button class=lb-close aria-label=Close>Close</button><button class=lb-prev aria-label=Previous>&#10094;</button><div class=lb-content><img class=lb-image alt=Screenshot><p class=lb-caption></p><div class=lb-controls><button class=lb-minus aria-label=Zoom-out>-</button><span class=lb-level>100%</span><button class=lb-plus aria-label=Zoom-in>+</button></div></div><button class=lb-next aria-label=Next>&#10095;</button>';
document.body.appendChild(overlay);
let images=[],index=0,zoom=1;
const viewer=overlay.querySelector('.lb-image');
const caption=overlay.querySelector('.lb-caption');
function applyZoom(){viewer.style.transform='scale('+zoom+')';overlay.querySelector('.lb-level').textContent=Math.round(zoom*100)+'%';}
function update(){const img=images[index];viewer.src=img.src;viewer.alt=img.alt;caption.textContent=img.closest('figure')?.querySelector('figcaption')?.textContent||img.alt;zoom=1;applyZoom();}
function close(){overlay.classList.remove('active');document.body.style.overflow='';}
galleries.forEach(g=>{const group=[...g.querySelectorAll('img')];group.forEach((img,i)=>{img.style.cursor='zoom-in';img.addEventListener('click',()=>{images=group;index=i;update();overlay.classList.add('active');document.body.style.overflow='hidden';});});});
overlay.querySelector('.lb-close').onclick=close;
overlay.querySelector('.lb-prev').onclick=()=>{index=(index-1+images.length)%images.length;update();};
overlay.querySelector('.lb-next').onclick=()=>{index=(index+1)%images.length;update();};
overlay.querySelector('.lb-plus').onclick=()=>{zoom=Math.min(3,zoom+.25);applyZoom();};
overlay.querySelector('.lb-minus').onclick=()=>{zoom=Math.max(1,zoom-.25);applyZoom();};
document.addEventListener('keydown',e=>{if(!overlay.classList.contains('active'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')overlay.querySelector('.lb-prev').click();if(e.key==='ArrowRight')overlay.querySelector('.lb-next').click();});
})();
