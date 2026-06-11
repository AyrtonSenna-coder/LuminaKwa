/* ── CURSOR ─────────────────────────────── */
const dot=document.getElementById('cursor-dot'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing)}
animRing();
document.querySelectorAll('a,button,.case-card,.engine-card,.metric-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
});
document.addEventListener('mousedown',()=>document.body.classList.add('cursor-click'));
document.addEventListener('mouseup',()=>document.body.classList.remove('cursor-click'));

/* ── SCROLL ──────────────────────────────── */
const pb=document.getElementById('sprg'),nav=document.getElementById('nav'),stk=document.getElementById('stk');
window.addEventListener('scroll',()=>{
  const y=scrollY,h=document.body.scrollHeight-innerHeight;
  pb.style.width=(y/h*100)+'%';
  nav.classList.toggle('scrolled',y>60);
  stk.classList.toggle('up',y>800);
  document.querySelectorAll('section[id]').forEach(s=>{
    const lnk=document.querySelector(`.nav-ul a[href="#${s.id}"]`);
    if(lnk) lnk.style.color=y>=s.offsetTop-140&&y<s.offsetTop+s.offsetHeight-140?'var(--volt)':'';
  });
});

/* ── MOBILE NAV ──────────────────────────── */
function openMob(){document.getElementById('mob').classList.add('on')}
function closeMob(){document.getElementById('mob').classList.remove('on')}

/* ── LIVE NAIROBI CLOCK ─────────────────── */
function updateClock(){
  const t=new Date().toLocaleTimeString('en-KE',{timeZone:'Africa/Nairobi',hour:'2-digit',minute:'2-digit',hour12:false});
  document.getElementById('nairobi-clock').textContent=t;
}
updateClock(); setInterval(updateClock,1000);

/* ── TEXT SCRAMBLE ──────────────────────── */
const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const final='revenue.';
const el=document.getElementById('scramble-target');
let step=0,timer;
function scramble(){
  el.textContent=final.split('').map((c,i)=>i<step?c:chars[Math.floor(Math.random()*chars.length)]).join('');
  if(step<final.length){step++;timer=setTimeout(scramble,80);}
}
setTimeout(()=>scramble(),2000);

/* ── COUNTER ANIMATIONS ─────────────────── */
const co=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    const t=parseInt(e.target.dataset.count),sfx=e.target.dataset.sfx||'';
    let n=0;const si=setInterval(()=>{n=Math.min(n+t/35,t);e.target.textContent=Math.floor(n)+sfx;if(n>=t)clearInterval(si);},35);
    co.unobserve(e.target);
  }
}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));

/* ── REVEAL ──────────────────────────────── */
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vi');ro.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.rv').forEach(el=>ro.observe(el));

/* ── UTM ─────────────────────────────────── */
(function(){
  const p=new URLSearchParams(location.search),src=p.get('utm_source')||'';
  if(!src)return;
  const s=src.toLowerCase();
  const eyebrow=document.querySelector('.hero-eyebrow');
  if(!eyebrow)return;
  if(s.includes('instagram')||s.includes('ig')){
    const badge=document.createElement('span');
    badge.style.cssText='background:rgba(203,255,77,.1);border:1px solid rgba(203,255,77,.2);border-radius:4px;padding:.2rem .6rem;color:var(--volt);font-size:.62rem';
    badge.textContent='IG2025 = 15% off';
    eyebrow.appendChild(badge);
  }
})();

/* ── CASE STUDY MODAL ───────────────────── */
const csData={
  greenify:{
    title:'Greenify Nairobi — Case File 01',
    img:'https://ayrtonsenna-coder.github.io/StackTechsolutions/images/Greenify-mockup.png',
    stats:[{n:'80+',l:'Weekly Orders'},{n:'+40%',l:'Conversion Rate'},{n:'2.1×',l:'Revenue Lift'}],
    engine:'Revenue Engine',
    challenge:'A Nairobi plant shop with beautiful products and zero online presence. All sales were in-person at their market stall. No M-Pesa online checkout, no way to reach customers across Kenya.',
    solution:'Built a full e-commerce platform with 3D product visualization, M-Pesa Daraja API v2 integration, automated order emails, customer loyalty points, and Instagram feed integration.',
    result:'Within 6 weeks: 80+ weekly orders, customer base expanded from Nairobi-only to 8 counties. Revenue doubled in 3 months.'
  },
  autosphere:{
    title:'Autosphere Kenya — Case File 02',
    img:'https://ayrtonsenna-coder.github.io/StackTechsolutions/images/autosphere.png',
    stats:[{n:'3×',l:'Test Drive Bookings'},{n:'60%',l:'Faster Close'},{n:'45+',l:'Monthly Leads'}],
    engine:'Revenue + Operations Engine',
    challenge:'A Nairobi dealership losing customers to larger showrooms with no way for buyers to explore inventory remotely or book test drives online.',
    solution:'Built AR virtual showroom with colour customization, real-time inventory sync, online test-drive booking, and CRM-integrated lead pipeline with WhatsApp notifications.',
    result:'Test drive bookings tripled in month one. Sales cycle shortened by 60%. The AR feature became their primary marketing talking point.'
  },
  fountain:{
    title:'Fountain Gate Church — Case File 03',
    img:'https://ayrtonsenna-coder.github.io/StackTechsolutions/images/FGC-mockup.png',
    stats:[{n:'500+',l:'Active Members'},{n:'+150%',l:'Online Giving'},{n:'2K+',l:'Monthly Streams'}],
    engine:'Community Engine',
    challenge:'A fast-growing Mombasa church with no digital infrastructure. Losing track of members, unable to reach people outside Sunday service, giving was 100% cash-based.',
    solution:'Full community platform: M-Pesa + bank giving portal, sermon library with streaming, event management, member directory with cell group management, weekly newsletter automation.',
    result:'Congregation grew from 200 to 500+ active members in 8 months. Online giving increased 150%, funding two new outreach programs.'
  }
};
function openCS(k){
  const d=csData[k];if(!d)return;
  document.getElementById('cs-ttl').textContent=d.title;
  document.getElementById('cs-body').innerHTML=`
    <img src="${d.img}" style="width:100%;border-radius:10px;overflow:hidden;height:220px;object-fit:cover;margin-bottom:1.5rem"/>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-bottom:1.75rem">
      ${d.stats.map(s=>`<div style="background:var(--lift);border:1px solid var(--border);border-radius:8px;padding:1rem;text-align:center"><div style="font-family:var(--dsp);font-size:1.7rem;font-weight:700;color:var(--volt)">${s.n}</div><div style="font-family:var(--mn);font-size:.62rem;color:var(--fog);text-transform:uppercase;letter-spacing:.06em">${s.l}</div></div>`).join('')}
    </div>
    <div style="background:rgba(203,255,77,.05);border:1px solid rgba(203,255,77,.12);border-radius:8px;padding:.75rem 1rem;margin-bottom:1.5rem;font-family:var(--mn);font-size:.65rem;color:var(--volt);letter-spacing:.08em;text-transform:uppercase">Engine Used: ${d.engine}</div>
    <h4 style="font-family:var(--dsp);font-weight:700;color:var(--volt);font-size:.85rem;letter-spacing:.04em;text-transform:uppercase;margin-bottom:.5rem">The Challenge</h4>
    <p style="font-size:.875rem;color:var(--fog);line-height:1.75;margin-bottom:1.25rem">${d.challenge}</p>
    <h4 style="font-family:var(--dsp);font-weight:700;color:var(--volt);font-size:.85rem;letter-spacing:.04em;text-transform:uppercase;margin-bottom:.5rem">Our Solution</h4>
    <p style="font-size:.875rem;color:var(--fog);line-height:1.75;margin-bottom:1.25rem">${d.solution}</p>
    <h4 style="font-family:var(--dsp);font-weight:700;color:var(--volt);font-size:.85rem;letter-spacing:.04em;text-transform:uppercase;margin-bottom:.5rem">The Result</h4>
    <p style="font-size:.875rem;color:var(--fog);line-height:1.75;margin-bottom:1.5rem">${d.result}</p>
    <button onclick="closeCS();preloadForm('Similar to ${d.title}')" style="width:100%;padding:.9rem;border-radius:8px;background:var(--volt);color:#000;font-family:var(--dsp);font-weight:700;font-size:.875rem;border:none;cursor:none">Build Something Like This →</button>
  `;
  const m=document.getElementById('csModal');
  m.style.pointerEvents='all';m.style.opacity='1';
  document.getElementById('csBox').style.transform='translateY(0)';
}
function closeCS(){
  const m=document.getElementById('csModal');
  m.style.opacity='0';m.style.pointerEvents='none';
  document.getElementById('csBox').style.transform='translateY(16px)';
}
document.getElementById('csModal').addEventListener('click',e=>{if(e.target===document.getElementById('csModal'))closeCS()});

/* ── AI TOOLS ────────────────────────────── */
async function callAI(prompt){
  const r=await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:prompt}]})
  });
  const d=await r.json();
  if(d.error)throw new Error(d.error.message);
  return d.content[0].text;
}
function aiToggle(btn,load,err,res,running){
  document.getElementById(btn).disabled=running;
  document.getElementById(load).classList.toggle('on',running);
  document.getElementById(err).classList.remove('on');
  if(!running)document.getElementById(res).classList.remove('on');
}
async function runAudit(){
  const url=document.getElementById('a_url').value.trim(),type=document.getElementById('a_type').value,goal=document.getElementById('a_goal').value.trim();
  if(!url||!type){alert('Please enter your website and select your business type.');return;}
  aiToggle('a_btn','a_load','a_err','a_res',true);
  try{
    const text=await callAI(`You are a senior web consultant specializing in Kenyan businesses. Audit this website/business for conversion optimization.\n\nWebsite: ${url}\nBusiness Type: ${type}\nGoal: ${goal||'generate leads and grow the business'}\n\nProvide:\n1. CONVERSION SCORE: /100 (be realistic)\n2. TOP 5 ISSUES holding this site back (be specific and direct)\n3. TOP 5 REVENUE-FOCUSED RECOMMENDATIONS with expected impact\n4. QUICK WINS: 3 things fixable this week\n5. KENYA-SPECIFIC INSIGHTS: M-Pesa, mobile usage, local SEO tips\n\nBe direct, professional, and Kenya-market aware.`);
    document.getElementById('a_out').textContent=text;
    document.getElementById('a_res').classList.add('on');
  }catch(e){document.getElementById('a_err').textContent='AI temporarily unavailable. WhatsApp us for a manual audit.';document.getElementById('a_err').classList.add('on');}
  document.getElementById('a_btn').disabled=false;document.getElementById('a_load').classList.remove('on');
}
async function runHeadlines(){
  const biz=document.getElementById('h_biz').value.trim(),cust=document.getElementById('h_cust').value.trim(),usp=document.getElementById('h_usp').value.trim();
  if(!biz){alert('Please describe your business.');return;}
  aiToggle('h_btn','h_load','h_err','h_res',true);
  try{
    const text=await callAI(`You are a world-class copywriter specializing in conversion-focused headlines for Kenyan businesses.\n\nBusiness: ${biz}\nTarget Customer: ${cust||'Kenyan consumers'}\nUnique Edge: ${usp||'quality and reliability'}\n\nGenerate 5 compelling website hero headlines. For each:\n- Write the headline (specific, benefit-focused, outcome-driven)\n- Explain WHY it works (psychology, specificity, urgency)\n- Rate conversion impact: Low/Medium/High/Very High\n\nAvoid generic "We are the best." Focus on customer transformation and Kenyan market context.`);
    document.getElementById('h_out').textContent=text;
    document.getElementById('h_res').classList.add('on');
  }catch(e){document.getElementById('h_err').textContent='AI temporarily unavailable. Try again shortly.';document.getElementById('h_err').classList.add('on');}
  document.getElementById('h_btn').disabled=false;document.getElementById('h_load').classList.remove('on');
}
async function runSEO(){
  const niche=document.getElementById('s_niche').value.trim(),loc=document.getElementById('s_loc').value.trim(),cust=document.getElementById('s_cust').value.trim();
  if(!niche){alert('Please enter your business niche.');return;}
  aiToggle('s_btn','s_load','s_err','s_res',true);
  try{
    const text=await callAI(`You are a Kenya-specialist SEO expert.\n\nNiche: ${niche}\nLocation: ${loc||'Kenya'}\nCustomer: ${cust||'Kenyan consumers'}\n\nProvide:\n1. TOP 10 KEYWORDS (include search intent: Info/Commercial/Transactional)\n2. DIFFICULTY RATING for each (Easy/Medium/Hard)\n3. CONTENT IDEAS: 5 blog titles that would rank for these keywords\n4. LOCAL SEO TIPS: 3 actions to rank in ${loc||'Kenya'} Google searches\n5. QUICK WIN: Single most impactful SEO action this week\n\nBe specific to the Kenyan market.`);
    document.getElementById('s_out').textContent=text;
    document.getElementById('s_res').classList.add('on');
  }catch(e){document.getElementById('s_err').textContent='AI temporarily unavailable. Try again shortly.';document.getElementById('s_err').classList.add('on');}
  document.getElementById('s_btn').disabled=false;document.getElementById('s_load').classList.remove('on');
}

/* ── FORM ────────────────────────────────── */
function psel(b,g){document.querySelectorAll(`[onclick*="'${g}'"]`).forEach(x=>x.classList.remove('on'));b.classList.add('on')}
function preloadForm(pkg){document.getElementById('f_ds').value=`Interested in: ${pkg}\n\nPlease send a detailed proposal.`;document.getElementById('contact').scrollIntoView({behavior:'smooth'})}
async function doSubmit(){
  const nm=document.getElementById('f_nm').value.trim(),em=document.getElementById('f_em').value.trim(),ph=document.getElementById('f_ph').value.trim();
  if(!nm||!ph){alert('Please enter your name and WhatsApp number.');return;}
  const btn=event.target;btn.textContent='Sending…';btn.disabled=true;
  const bd=document.getElementById('f_bd').value,ds=document.getElementById('f_ds').value.trim();
  const wa=`Hi StackTech! New brief:\n👤 ${nm}\n📧 ${em||'Not provided'}\n📱 ${ph}\n💰 ${bd||'Not specified'}\n\n📝 ${ds}`;
  window.open('https://wa.me/254795451238?text='+encodeURIComponent(wa),'_blank');
  document.getElementById('cf-form').style.display='none';
  document.getElementById('cf-suc').classList.add('on');
  btn.disabled=false;
}