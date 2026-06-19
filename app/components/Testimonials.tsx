'use client';

import * as React from 'react';
import {CardTransformed,CardsContainer,ContainerScroll,ReviewStars} from '@/components/blocks/animated-cards-stack';
import {Avatar,AvatarFallback} from '@/components/ui/avatar';

const testimonials=[
{id:'t1',name:'Healthcare Website Owner',profession:'Healthcare WordPress build',rating:5,description:'Fast, responsive and clear communication. The final WordPress site made our services easier to understand and helped us present a more trustworthy healthcare brand.'},
{id:'t2',name:'Travel Business Client',profession:'Travel / booking website',rating:5,description:'Adeel understood the booking flow properly and converted the idea into a clean, mobile-friendly experience. The package sections and CTAs became much easier for customers.'},
{id:'t3',name:'Corporate Services Founder',profession:'Corporate Elementor website',rating:5,description:'The website structure became much more professional. Services, trust sections and inquiry flow were handled with strong attention to detail.'},
{id:'t4',name:'Local Service Brand',profession:'Local business website',rating:5,description:'The build felt clean, practical and conversion-focused. Mobile spacing, contact buttons and service sections were improved in a way that helps visitors take action.'},
{id:'t5',name:'Agency Collaboration',profession:'WordPress fixes and support',rating:5,description:'Reliable WordPress support, clean Elementor work and solid troubleshooting. Adeel is easy to work with when a site needs practical fixes and launch support.'}
];

function initials(name:string){return name.split(' ').map(n=>n[0]).join('').slice(0,2)}
function usePreferredVariant(){const[variant,setVariant]=React.useState<'dark'|'light'>('light');React.useEffect(()=>{const m=window.matchMedia('(prefers-color-scheme: dark)');const sync=()=>setVariant(m.matches?'dark':'light');sync();m.addEventListener('change',sync);return()=>m.removeEventListener('change',sync)},[]);return variant}

export default function Testimonials(){
  const variant=usePreferredVariant();
  return <section className="px-8 py-12" style={{background:'radial-gradient(circle at 15% 10%,#f6c94533,transparent 28%),radial-gradient(circle at 82% 8%,#9b6cff33,transparent 26%)'}}><div><span className="eyebrow" style={{display:'table',margin:'0 auto'}}>Client Feedback</span><h2 className="title" style={{textAlign:'center',margin:'18px auto 0'}}>Testimonials that show the value behind the build</h2><p className="lead" style={{fontSize:14}}>Draft review cards for the portfolio. Replace the names with verified client names whenever you want to publish real testimonials.</p></div><ContainerScroll className="container h-[300vh]"><div className="sticky left-0 top-0 h-svh w-full py-12"><CardsContainer className="mx-auto size-full h-[450px] w-[350px] max-w-[90vw]">{testimonials.map((testimonial,index)=><CardTransformed arrayLength={testimonials.length} key={testimonial.id} variant={variant} index={index+1} role="article" aria-labelledby={`card-${testimonial.id}-title`} aria-describedby={`card-${testimonial.id}-content`}><div className="flex flex-col items-center space-y-4 text-center"><ReviewStars className="text-primary" rating={testimonial.rating}/><div id={`card-${testimonial.id}-content`} className="mx-auto w-4/5 text-lg leading-relaxed"><blockquote cite="#">{testimonial.description}</blockquote></div></div><div className="flex items-center gap-4"><Avatar className="!size-12 border border-stone-300"><AvatarFallback>{initials(testimonial.name)}</AvatarFallback></Avatar><div><span id={`card-${testimonial.id}-title`} className="block text-lg font-semibold tracking-tight md:text-xl">{testimonial.name}</span><span className="block text-sm text-muted-foreground">{testimonial.profession}</span></div></div></CardTransformed>)}</CardsContainer></div></ContainerScroll></section>
}
