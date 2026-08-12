const header=document.querySelector('[data-header]');const menu=document.querySelector('[data-menu-toggle]');const nav=document.querySelector('[data-nav]');
const updateHeaderState=()=>header?.classList.toggle('scrolled',window.scrollY>30);
updateHeaderState();
requestAnimationFrame(updateHeaderState);
addEventListener('scroll',updateHeaderState,{passive:true});
addEventListener('pageshow',updateHeaderState);
document.querySelectorAll('.nav a').forEach(link=>{const label=link.textContent.trim().toLowerCase();if(label==='services'){link.textContent='Cleaning Services';link.setAttribute('href','cleaning-services.html')}if(label==='industries'){link.textContent='Gardening Services';link.setAttribute('href','gardening-services.html')}if(label==='gardening services'){link.setAttribute('href','gardening-services.html')}});
let menuScrollY=0;
const placeNav=()=>{
  if(!nav||!header)return;
  if(window.matchMedia('(max-width:760px)').matches){
    if(nav.parentElement!==document.body)document.body.appendChild(nav);
  }else{
    const cta=header.querySelector('.header-cta');
    if(nav.parentElement!==header){
      if(cta)header.insertBefore(nav,cta);
      else header.appendChild(nav);
    }
  }
};
placeNav();
addEventListener('resize',placeNav);
const setMenuOpen=open=>{
  if(!nav||!menu)return;
  placeNav();
  nav.classList.toggle('open',open);
  menu.classList.toggle('active',open);
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  if(open){
    menuScrollY=window.scrollY||document.documentElement.scrollTop||0;
    document.body.classList.add('menu-open');
    document.body.style.top=`-${menuScrollY}px`;
  }else{
    document.body.classList.remove('menu-open');
    document.body.style.top='';
    window.scrollTo(0,menuScrollY);
  }
};
menu?.addEventListener('click',()=>setMenuOpen(!nav.classList.contains('open')));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenuOpen(false)));
addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open'))setMenuOpen(false)});
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal,.service-card,.process-step,.detail-card,.review-card').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=`${Math.min(i%4,3)*90}ms`;io.observe(el)});
const glow=document.querySelector('.cursor-glow');addEventListener('pointermove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}},{passive:true});
document.querySelector('[data-quote-form]')?.addEventListener('submit',e=>{e.preventDefault();const toast=document.querySelector('.toast');toast?.classList.add('show');setTimeout(()=>toast?.classList.remove('show'),4200);e.currentTarget.reset()});
let adminData=null;try{adminData=JSON.parse(localStorage.getItem('cfsWebsiteData')||'null')}catch{}
const adminCarousel=document.querySelector('[data-hero-carousel]');
if(adminCarousel&&adminData?.slides?.length){adminCarousel.innerHTML='';adminData.slides.forEach((s,i)=>{const slide=document.createElement('div');slide.className=`hero-slide${i===0?' active':''}`;slide.dataset.kicker=s.kicker;slide.dataset.title=`${s.title1}|${s.title2}`;slide.dataset.copy=s.copy;slide.dataset.link=s.link;slide.dataset.cta=s.cta;slide.style.setProperty('--slide-image',`url("${String(s.image).replace(/["\\]/g,'')}")`);adminCarousel.appendChild(slide)});const first=adminData.slides[0],heroContent=document.querySelector('.hero-content');if(heroContent){heroContent.querySelector('[data-hero-kicker]').textContent=first.kicker;heroContent.querySelector('[data-hero-title]').innerHTML=`${first.title1}<br><em>${first.title2}</em>`;heroContent.querySelector('[data-hero-copy]').textContent=first.copy;heroContent.querySelector('[data-hero-link]').href=first.link;heroContent.querySelector('[data-hero-cta]').textContent=first.cta;heroContent.querySelector('[data-hero-total]').textContent=String(adminData.slides.length).padStart(2,'0')}}
const publicReviews=document.querySelector('.premium-reviews-grid');
if(publicReviews&&Array.isArray(adminData?.reviews)){publicReviews.innerHTML='';adminData.reviews.forEach(r=>{const card=document.createElement('article');card.className='premium-review-card reveal';const top=document.createElement('div');top.className='review-card-top';const tag=document.createElement('span');tag.className='industry-tag';tag.textContent=r.category;const stars=document.createElement('span');stars.className='stars';stars.textContent='★'.repeat(Math.max(1,Math.min(5,Number(r.rating)||5)));top.append(tag,stars);const quote=document.createElement('blockquote');quote.textContent=`“${r.quote}”`;const person=document.createElement('div');person.className='review-person';const avatar=document.createElement('span');avatar.textContent=String(r.name).trim().split(/\s+/).slice(0,2).map(x=>x[0]?.toUpperCase()||'').join('');const info=document.createElement('div');const name=document.createElement('b');name.textContent=String(r.name).toUpperCase();const role=document.createElement('small');role.textContent=r.role;info.append(name,role);person.append(avatar,info);const c1=document.createElement('i'),c2=document.createElement('i');c1.className='corner corner-one';c2.className='corner corner-two';card.append(top,quote,person,c1,c2);publicReviews.append(card);io.observe(card)})}
const heroCarousel=document.querySelector('[data-hero-carousel]');
if(heroCarousel){const slides=[...heroCarousel.querySelectorAll('.hero-slide')],dotsWrap=document.querySelector('[data-hero-dots]'),content=document.querySelector('.hero-content'),kicker=document.querySelector('[data-hero-kicker]'),title=document.querySelector('[data-hero-title]'),copy=document.querySelector('[data-hero-copy]'),link=document.querySelector('[data-hero-link]'),cta=document.querySelector('[data-hero-cta]'),number=document.querySelector('[data-hero-number]');let current=0,timer,swapTimer;slides.forEach((_,i)=>{const dot=document.createElement('i');dot.classList.toggle('active',i===0);dot.setAttribute('role','button');dot.setAttribute('aria-label',`Show service ${i+1}`);dotsWrap?.appendChild(dot)});const dots=[...(dotsWrap?.children||[])];const updateContent=slide=>{if(kicker)kicker.textContent=slide.dataset.kicker||'';const parts=(slide.dataset.title||'').split('|');if(title)title.innerHTML=`${parts[0]||''}${parts[1]?`<br><em>${parts[1]}</em>`:''}`;if(copy)copy.textContent=slide.dataset.copy||'';if(link)link.href=slide.dataset.link||'cleaning-services.html';if(cta)cta.textContent=slide.dataset.cta||'Explore services';if(number)number.textContent=String(current+1).padStart(2,'0')};const show=i=>{current=(i+slides.length)%slides.length;slides.forEach((slide,n)=>slide.classList.toggle('active',n===current));dots.forEach((dot,n)=>dot.classList.toggle('active',n===current));content?.classList.add('changing');clearTimeout(swapTimer);swapTimer=setTimeout(()=>{updateContent(slides[current]);content?.classList.remove('changing')},280)};const play=()=>{clearInterval(timer);timer=setInterval(()=>show(current+1),6500)};document.querySelector('[data-hero-prev]')?.addEventListener('click',()=>{show(current-1);play()});document.querySelector('[data-hero-next]')?.addEventListener('click',()=>{show(current+1);play()});dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);play()}));play()}
const signature=document.querySelector('[data-signature]');
let signatureDrawn=false;
if(signature){const ctx=signature.getContext('2d');ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=2.4;ctx.strokeStyle='#153b31';let drawing=false;const point=e=>{const rect=signature.getBoundingClientRect();return{x:(e.clientX-rect.left)*(signature.width/rect.width),y:(e.clientY-rect.top)*(signature.height/rect.height)}};signature.addEventListener('pointerdown',e=>{drawing=true;signature.setPointerCapture(e.pointerId);const p=point(e);ctx.beginPath();ctx.moveTo(p.x,p.y)});signature.addEventListener('pointermove',e=>{if(!drawing)return;const p=point(e);ctx.lineTo(p.x,p.y);ctx.stroke();signatureDrawn=true});const stop=()=>drawing=false;signature.addEventListener('pointerup',stop);signature.addEventListener('pointercancel',stop);document.querySelector('[data-signature-clear]')?.addEventListener('click',()=>{ctx.clearRect(0,0,signature.width,signature.height);signatureDrawn=false})}
document.querySelector('[data-registration-form]')?.addEventListener('submit',e=>{e.preventDefault();if(!signatureDrawn){signature?.focus();alert('Please draw your signature before submitting.');return}const toast=document.querySelector('.registration-toast');toast?.classList.add('show');setTimeout(()=>toast?.classList.remove('show'),4500)});
const footer=document.querySelector('.footer');
const fullFooterHTML=`<div class="footer-image-band"><div class="container footer-invite"><div><span class="kicker">Let's create something exceptional</span><h2>Ready for a space that<br><em>reflects your standards?</em></h2></div><a class="button footer-quote-button" href="contact.html">Request a proposal <span>↗</span></a></div></div><div class="footer-main"><div class="container footer-top"><div class="footer-brand"><a class="brand brand-light" href="index.html"><img class="brand-logo" src="assets/crishfacility-logo.jpg" alt="Crish Facility Services logo"><span class="brand-wordmark"><b>CRISH FACILITY</b><small>SERVICES</small></span></a><p>Premium commercial cleaning and considered facility care, delivered with precision and genuine attention.</p><div class="footer-social"><a href="#" aria-label="Instagram">IG</a><a href="#" aria-label="LinkedIn">IN</a><a href="https://wa.me/94766280198" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a></div></div><div><b>Explore</b><a href="cleaning-services.html">Cleaning Services</a><a href="gardening-services.html">Gardening Services</a><a href="reviews.html">Client reviews</a><a href="about.html">About us</a><a href="registration.html">Contractor / Employee Registration</a></div><div><b>Contact</b><a class="footer-contact-link" href="tel:+61435744000">0435 744 000</a><a href="mailto:info@crishfacilityservices.com.au">info@crishfacilityservices.com.au</a><span>17 Coronation St, Sunshine North, VIC 3020</span><a class="footer-whatsapp-link" href="https://wa.me/94766280198" target="_blank" rel="noopener">Chat on WhatsApp ↗</a></div><div><b>Availability</b><span>Monday–Friday · 8am–6pm</span><span>After-hours service available</span><span>Response within one business day</span></div></div><div class="container footer-bottom"><span>© 2026 Crish Facility Services</span><span><a href="admin.html" class="admin-login-link">Admin Login</a> · Privacy · Terms</span><span>Designed for exceptional first impressions.</span></div></div>`;
if(footer&&!footer.querySelector('.footer-main'))footer.innerHTML=fullFooterHTML;
if(footer){const explore=footer.querySelector('.footer-top>div:nth-child(2)');if(explore&&!explore.querySelector('a[href="registration.html"]'))explore.insertAdjacentHTML('beforeend','<a href="registration.html">Contractor / Employee Registration</a>')}
if(footer&&adminData?.contact){const c=adminData.contact,contact=footer.querySelector('.footer-top>div:nth-child(3)'),phone=contact?.querySelector('.footer-contact-link'),email=contact?.querySelector('a[href^="mailto:"]'),address=contact?.querySelector('span'),wa=contact?.querySelector('.footer-whatsapp-link');if(phone){phone.textContent=c.phone;phone.href=`tel:${c.phoneLink}`}if(email){email.textContent=c.email;email.href=`mailto:${c.email}`}if(address)address.textContent=c.address;if(wa)wa.href=`https://wa.me/${c.whatsapp}`}
if(!document.querySelector('link[data-whatsapp-icons]')){const iconStyles=document.createElement('link');iconStyles.rel='stylesheet';iconStyles.href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';iconStyles.setAttribute('data-whatsapp-icons','');document.head.appendChild(iconStyles)}
if(!document.querySelector('.whatsapp-float')){const chat=document.createElement('a');chat.className='whatsapp-float';chat.href=`https://wa.me/${adminData?.contact?.whatsapp||'94766280198'}`;chat.target='_blank';chat.rel='noopener';chat.setAttribute('aria-label','Chat with us on WhatsApp');chat.innerHTML='<span class="whatsapp-tooltip"><b>WhatsApp us</b> We usually reply quickly</span><span class="whatsapp-icon"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></span><em></em>';document.body.appendChild(chat)}





