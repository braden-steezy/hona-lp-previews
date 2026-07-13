/* HONA LP preview · shared interactions · build v1 */
(function(){
  "use strict";
  /* viewport guard (self-healing) */
  try{if(!document.querySelector('meta[name="viewport"]')){var m=document.createElement('meta');m.name='viewport';m.setAttribute('content','width=device-width, initial-scale=1, viewport-fit=cover');(document.head||document.documentElement).appendChild(m);}}catch(e){}

  function ready(fn){if(document.readyState!=='loading'){fn();}else{document.addEventListener('DOMContentLoaded',fn);}}
  ready(function(){
    /* scroll reveal with failsafe */
    var els=[].slice.call(document.querySelectorAll('.rv'));
    function revealAll(){els.forEach(function(el){el.classList.add('in');});}
    if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -8% 0px'});
      els.forEach(function(el){io.observe(el);});
      setTimeout(revealAll,1600); /* failsafe: never leave content hidden */
    }else{revealAll();}

    /* sticky mobile CTA: reveal after scrolling past hero */
    var sticky=document.querySelector('.sticky');
    var hero=document.querySelector('.hero');
    if(sticky&&hero){
      var onScroll=function(){
        var b=hero.getBoundingClientRect().bottom;
        sticky.style.transform=(b<0)?'none':'translateY(110%)';
      };
      sticky.style.transition='transform .25s ease';onScroll();
      window.addEventListener('scroll',onScroll,{passive:true});
    }
  });
})();
