(()=>{
  'use strict';
  const config=window.UNICON_CONTACT||{};
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.main-nav');
  menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة')});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
  document.getElementById('year').textContent=new Date().getFullYear();
  const isUrl=u=>{try{const parsed=new URL(u);return parsed.protocol==='https:'}catch{return false}};
  const phoneClean=v=>v.replace(/[\s\-()]/g,'');
  const contactData={
    email:()=>{const v=(config.email||'').trim();return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?{href:'mailto:'+v,label:v}:null},
    phone:()=>{const v=(config.phone||'').trim(),n=phoneClean(v);return /^\+?\d{7,15}$/.test(n)?{href:'tel:'+n,label:v}:null},
    whatsapp:()=>{const v=(config.whatsapp||'').trim(),n=phoneClean(v).replace(/^\+/,'');return /^\d{7,15}$/.test(n)?{href:'https://wa.me/'+n,label:v}:null},
    instagram:()=>{const v=(config.instagram||'').trim();return isUrl(v)&&/^https:\/\/(www\.)?instagram\.com\//.test(v)?{href:v,label:'افتح حساب إنستغرام'}:null},
    facebook:()=>{const v=(config.facebook||'').trim();return isUrl(v)&&/^https:\/\/(www\.)?(facebook\.com|fb\.com)\//.test(v)?{href:v,label:'افتح صفحة فيسبوك'}:null}
  };
  document.querySelectorAll('[data-channel]').forEach(el=>{
    const type=el.dataset.channel,info=contactData[type]?.();
    if(!info)return;
    el.href=info.href;el.classList.remove('not-configured');el.removeAttribute('aria-disabled');el.removeAttribute('tabindex');
    const label=el.querySelector('[data-contact-value]');if(label)label.textContent=info.label;
    if(['whatsapp','instagram','facebook'].includes(type)){el.target='_blank';el.rel='noopener noreferrer'}
  });
  const items=document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}}),{threshold:.08});items.forEach(el=>io.observe(el))}else items.forEach(el=>el.classList.add('visible'));
})();
