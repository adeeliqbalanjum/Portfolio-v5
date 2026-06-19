'use client';
import * as React from 'react';

type Review={n:string;s:string;r:string};

const reviews:Review[]=[
{n:'Healthcare Website Owner',s:'Healthcare WordPress build',r:'Fast, responsive and clear communication. The final WordPress site made our services easier to understand and helped us present a more trustworthy healthcare brand.'},
{n:'Travel Business Client',s:'Travel / booking website',r:'Adeel understood the booking flow properly and converted the idea into a clean, mobile-friendly experience. The package sections and CTAs became much easier for customers.'},
{n:'Corporate Services Founder',s:'Corporate Elementor website',r:'The website structure became much more professional. Services, trust sections and inquiry flow were handled with strong attention to detail.'},
{n:'Local Service Brand',s:'Local business website',r:'The build felt clean, practical and conversion-focused. Mobile spacing, contact buttons and service sections were improved in a way that helps visitors take action.'},
{n:'Agency Collaboration',s:'WordPress fixes and support',r:'Reliable WordPress support, clean Elementor work and solid troubleshooting. Adeel is easy to work with when a site needs practical fixes and launch support.'}
];

const clamp=(v:number,min=0,max=1)=>Math.min(max,Math.max(min,v));
const mapRange=(v:number,inMin:number,inMax:number,outMin:number,outMax:number)=>outMin+(outMax-outMin)*clamp((v-inMin)/(inMax-inMin));

function useSectionProgress(ref:React.RefObject<HTMLElement>){
  const [progress,setProgress]=React.useState(0);
  React.useEffect(()=>{
    const update=()=>{
      const el=ref.current;if(!el)return;
      const rect=el.getBoundingClientRect();
      const vh=window.innerHeight||1;
      const total=Math.max(rect.height-vh,1);
      setProgress(clamp((vh*0.55-rect.top)/total));
    };
    update();
    window.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',update);
    return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
  },[ref]);
  return progress;
}

function Stars(){return <div style={{display:'flex',gap:4,color:'#F6C945',fontSize:20,marginBottom:22}} aria-label="5 out of 5 stars">{Array.from({length:5}).map((_,i)=><span key={i}>★</span>)}</div>}

function ReviewCard({t,i,total,progress}:{t:Review;i:number;total:number;progress:number}){
  const start=i/(total+1);
  const end=(i+1)/(total+1);
  const y=mapRange(progress,start,end,0,-180);
  const rotate=mapRange(progress,start-.22,end*.9,-i+90,0);
  const dx=mapRange(progress,start-.22,end*.9,4,0);
  const dy=mapRange(progress,start-.22,end*.9,4,12);
  const blur=mapRange(progress,start-.22,end*.9,2,24);
  const alpha=mapRange(progress,start-.22,end*.9,.15,.2);
  return <article style={{position:'absolute',left:0,right:0,top:i*12,minHeight:320,border:'1px solid var(--line)',borderRadius:34,background:'color-mix(in srgb,var(--surface) 82%,transparent)',backdropFilter:'blur(18px)',boxShadow:'0 28px 90px #0000001f',padding:34,display:'flex',flexDirection:'column',justifyContent:'space-between',willChange:'transform',backfaceVisibility:'hidden',zIndex:(i+1)*10,filter:`drop-shadow(${dx}px ${dy}px ${blur}px rgba(0,0,0,${alpha}))`,transform:`translateZ(${i*10}px) translateY(${y}%) rotate(${rotate}deg)`}}><div><Stars/><p style={{fontSize:'clamp(1.35rem,2.7vw,2.4rem)',lineHeight:1.08,letterSpacing:'-.045em',fontWeight:900,margin:0}}>“{t.r}”</p></div><div style={{display:'flex',alignItems:'end',justifyContent:'space-between',borderTop:'1px solid var(--line)',paddingTop:22,marginTop:34}}><div><b style={{display:'block',fontSize:18}}>{t.n}</b><span style={{display:'block',color:'var(--muted)',marginTop:5}}>{t.s}</span></div><small style={{fontWeight:950,fontSize:42,letterSpacing:'-.08em',color:'color-mix(in srgb,var(--text) 24%,transparent)'}}>0{i+1}</small></div></article>
}

export default function Testimonials(){
  const sectionRef=React.useRef<HTMLElement>(null);
  const progress=useSectionProgress(sectionRef);
  return <section ref={sectionRef} className="section" style={{minHeight:'210vh',background:'radial-gradient(circle at 15% 10%,#f6c94533,transparent 28%),radial-gradient(circle at 82% 8%,#9b6cff33,transparent 26%)'}}><div className="wrap" style={{position:'sticky',top:110,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,430px),1fr))',gap:56,alignItems:'start'}}><div><span className="eyebrow">Client Feedback</span><h2 className="title">Testimonials that show the value behind the build</h2><p className="muted">Draft review cards for the portfolio. Replace the names with verified client names whenever you want to publish real testimonials.</p><div className="chips"><span className="chip">5.0 quality mindset</span><span className="chip">Responsive support</span><span className="chip">Client-ready delivery</span></div></div><div style={{position:'relative',height:560,perspective:1000}}>{reviews.map((t,i)=><ReviewCard key={t.n} t={t} i={i} total={reviews.length} progress={progress}/>)}</div></div></section>
}
