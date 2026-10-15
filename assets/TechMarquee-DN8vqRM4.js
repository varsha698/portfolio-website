import{j as e,P as s}from"./index-8sGVTIlT.js";import{T as i}from"./techIcons-DJvSgIQS.js";const n=["python","typescript","javascript","ruby","rails","react","nextjs","nodejs","tailwind","fastapi","flask","postgresql","mongodb","supabase","stripe","docker","aws","terraform","cloudflare","github","pytorch","angular","flutter","swift"],a=({hidden:t=!1})=>e.jsx("div",{className:"flex items-center gap-10 shrink-0 px-5","aria-hidden":t||void 0,children:n.map(r=>e.jsx("div",{className:"w-10 h-10 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity",children:e.jsx(i,{name:r,className:"w-9 h-9"})},r))});a.propTypes={hidden:s.bool};const c=()=>e.jsxs("div",{className:"relative overflow-hidden py-4 border-y border-amber-900/40 bg-black/40",children:[e.jsx("div",{className:"pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10"}),e.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10"}),e.jsxs("div",{className:"flex marquee-track",children:[e.jsx(a,{}),e.jsx(a,{hidden:!0})]}),e.jsx("style",{children:`
      @keyframes marqueeSlide {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      .marquee-track {
        animation: marqueeSlide 35s linear infinite;
        will-change: transform;
      }
      .marquee-track:hover {
        animation-play-state: paused;
      }
      @media (prefers-reduced-motion: reduce) {
        .marquee-track { animation: none; flex-wrap: wrap; justify-content: center; }
        .marquee-track > :last-child { display: none; }
      }
    `})]});export{c as default};
