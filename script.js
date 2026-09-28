gsap.registerPlugin(ScrollTrigger);
const card=document.querySelector("#idCard");
const opening=document.querySelector("#opening");
const meter=document.querySelector(".scroll-meter span");
const pointer=document.querySelector(".pointer");
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if(!reduced){
  gsap.set(card,{y:"-115vh",rotationZ:-11,rotationX:18,rotationY:-8,scale:.9});
  gsap.set(".drop-shadow",{y:280,scale:.45,opacity:0});
  gsap.timeline({defaults:{ease:"power3.out"}})
    .to(card,{y:0,rotationZ:0,rotationX:0,rotationY:0,scale:1,duration:1.35,ease:"back.out(1.35)"})
    .to(".drop-shadow",{y:205,scale:1,opacity:.7,duration:.75},"-=.85");
  
  const flip=gsap.timeline({paused:true});
  flip.to(card,{rotationY:180,duration:1,ease:"power2.inOut"})
      .to(card,{y:"-18vh",scale:.72,duration:.7,ease:"power2.inOut"},"-=.2");

  ScrollTrigger.create({
    trigger:opening,start:"top top",end:"+=105%",scrub:1,
    pin:false,onUpdate:self=>{
      const p=self.progress;
      flip.progress(Math.min(1,Math.max(0,(p-.18)/.62)));
      gsap.to(meter,{scaleY:p,duration:.15,overwrite:true});
      gsap.set(".opening-caption",{y:-p*90,opacity:1-p*.7});
      gsap.set(".opening-ui.top",{y:-p*35});
      gsap.set(".opening-ui.bottom",{y:p*35});
    }
  });
  ScrollTrigger.create({
    trigger:opening,start:"top top",end:"+=115%",pin:true,scrub:true,
    onUpdate:self=>{gsap.set(card,{z:1});}
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
