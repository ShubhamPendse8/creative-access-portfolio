gsap.registerPlugin(ScrollTrigger);
const card=document.querySelector("#idCard");
const opening=document.querySelector("#opening");
const meter=document.querySelector(".scroll-meter span");
const pointer=document.querySelector(".pointer");
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if(!reduced){
  // One master scroll timeline: fall -> settle -> flip -> exit.
  // Keeping the entire intro in one timeline prevents the card from getting
  // caught between competing ScrollTriggers on desktop.
  gsap.set(card,{y:"-105vh",rotationZ:-10,rotationX:16,rotationY:-7,scale:.88});
  gsap.set(".drop-shadow",{y:275,scale:.35,opacity:0});
  gsap.set(".stage-side",{opacity:0,y:35});

  const intro=gsap.timeline({
    scrollTrigger:{
      trigger:opening,
      start:"top top",
      end:"+=135%",
      scrub:1,
      pin:true,
      anticipatePin:1,
      invalidateOnRefresh:true
    }
  });

  intro
    .to(card,{y:0,rotationZ:0,rotationX:0,rotationY:0,scale:1,duration:.22,ease:"power2.out"})
    .to(".drop-shadow",{y:205,scale:1,opacity:.75,duration:.18,ease:"power2.out"},"<")
    .to(".stage-left",{opacity:1,y:0,duration:.12,ease:"power2.out"},"-.04")
    .to(".stage-right",{opacity:1,y:0,duration:.12,ease:"power2.out"},"<")
    .to(".opening-caption",{opacity:1,duration:.08},"<")
    .to(card,{rotationY:180,duration:.28,ease:"power2.inOut"})
    .to(card,{y:"-25vh",scale:.72,rotationZ:2,duration:.22,ease:"power2.inOut"})
    .to(".stage-side",{opacity:0,y:-35,duration:.12},"<")
    .to(".opening-caption",{opacity:0,y:-40,duration:.12},"<");

  ScrollTrigger.create({
    trigger:opening,start:"top top",end:"+=135%",scrub:1,
    onUpdate:self=>{
      gsap.set(meter,{scaleY:self.progress});
      gsap.set(".opening-ui.top",{y:-self.progress*30});
      gsap.set(".opening-ui.bottom",{y:self.progress*30});
    }
  });

  card.addEventListener("click",()=>{
    const st=ScrollTrigger.getById("intro");
    if(st) window.scrollTo({top:opening.offsetTop+window.innerHeight*.75,behavior:"smooth"});
  });
}
document.querySelectorAll(".work-card").forEach((el,i)=>{
  gsap.from(el.querySelector(".work-visual"),{scrollTrigger:{trigger:el,start:"top 85%",end:"top 35%",scrub:1},y:100,rotateZ:i%2?-2:2,scale:.88});
  gsap.from(el.querySelector(".work-copy"),{scrollTrigger:{trigger:el,start:"top 75%",end:"top 35%",scrub:1},x:i%2?80:-80,opacity:0});
});
document.querySelectorAll(".skill-list>div").forEach((el)=>{
  gsap.from(el,{scrollTrigger:{trigger:el,start:"top 88%",end:"top 65%",scrub:1},x:-60,opacity:0});
});
gsap.from(".about-photo",{scrollTrigger:{trigger:".about",start:"top 80%",end:"top 20%",scrub:1},scale:.82,rotation:-2});
gsap.from(".about-copy",{scrollTrigger:{trigger:".about",start:"top 80%",end:"top 30%",scrub:1},x:80,opacity:0});

document.addEventListener("pointermove",e=>{
  if(!pointer)return;
  gsap.to(pointer,{x:e.clientX,y:e.clientY,duration:.25,ease:"power2.out"});
  if(!reduced && card){
    const r=card.getBoundingClientRect();
    if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom){
      const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      gsap.to(card,{rotationX:y*-4,rotationY:x*5,duration:.45,ease:"power2.out",overwrite:true});
    }
  }
});
document.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  document.documentElement.style.scrollBehavior="smooth";
  setTimeout(()=>document.documentElement.style.scrollBehavior="auto",800);
}));
