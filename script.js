const gate=document.getElementById('gate'),site=document.getElementById('site'),card=document.getElementById('accessCard'),enter=document.getElementById('enter');
let opened=false;
function openAccess(){if(opened)return;opened=true;card.classList.add('unlock');setTimeout(()=>{document.body.classList.add('revealed');site.setAttribute('aria-hidden','false');window.scrollTo(0,0)},480)}
card.addEventListener('click',openAccess);enter.addEventListener('click',openAccess);
card.addEventListener('pointermove',e=>{if(opened||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${y*-7}deg) rotateY(${x*9}deg)`});
card.addEventListener('pointerleave',()=>{if(!opened)card.style.transform=''});
document.addEventListener('pointermove',e=>{const g=document.querySelector('.cursor-glow');if(g)g.style.left=e.clientX+'px',g.style.top=e.clientY+'px'});
const obs=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting)en.target.classList.add('in-view')}),{threshold:.12});document.querySelectorAll('.section,.project').forEach(x=>obs.observe(x));