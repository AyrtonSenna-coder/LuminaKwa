/* CURSOR */
const cd=document.getElementById('cd'),cr=document.getElementById('cr');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cd.style.left=mx+'px';cd.style.top=my+'px'});
(function animR(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;cr.style.left=rx+'px';cr.style.top=ry+'px';requestAnimationFrame(animR)})();
document.querySelectorAll('a,button,.case-row,.eng-card,.pc,.proof-c').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('ch'));el.addEventListener('mouseleave',()=>document.body.classList.remove('ch'))});
document.addEventListener('mousedown',()=>document.body.classList.add('cc'));
document.addEventListener('mouseup',()=>document.body.classList.remove('cc'));

/* SCROLL */
const spb=document.getElementById('spb'),nav=document.getElementById('nav'),stk=document.getElementById('stk');
window.addEventListener('scroll',()=>{
  const y=scrollY,h=document.body.scrollHeight-innerHeight;
  spb.style.width=(y/h*100)+'%';
  nav.classList.toggle('solid',y>50);
  stk.classList.toggle('up',y>700);
  document.querySelectorAll('section[id]').forEach(s=>{const lnk=document.querySelector(`.nav-ul a[href="#${s.id}"]`);if(lnk)lnk.style.color=y>=s.offsetTop-140&&y<s.offsetTop+s.offsetHeight-140?'var(--cyan)':''});
});

/* MOBILE NAV */
function openMob(){document.getElementById('mob').classList.add('on')}
function closeMob(){document.getElementById('mob').classList.remove('on')}

/* NAIROBI CLOCK */
function upClk(){const t=new Date().toLocaleTimeString('en-KE',{timeZone:'Africa/Nairobi',hour:'2-digit',minute:'2-digit',hour12:false});document.getElementById('clk').textContent=t;}
upClk();setInterval(upClk,1000);

/* TEXT SCRAMBLE */
const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const words=['revenue.','growth.','clients.','results.','the future.'];
let wi=0,step=0,del=false;
const scEl=document.getElementById('scramble');
function scramble(){
  const w=words[wi];
  if(!del){scEl.textContent=w.split('').map((c,i)=>i<step?c:chars[Math.floor(Math.random()*chars.length)]).join('');if(step<w.length){step++;setTimeout(scramble,75);}else{del=true;setTimeout(scramble,2600);}}
  else{scEl.textContent=w.slice(0,Math.max(0,step-1));step--;if(step<=0){del=false;wi=(wi+1)%words.length;setTimeout(scramble,300);}else{setTimeout(scramble,55);}}
}
setTimeout(scramble,1800);

/* COUNTERS */
const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=parseInt(e.target.dataset.count),s=e.target.dataset.sfx||'';let n=0;const si=setInterval(()=>{n=Math.min(n+t/35,t);e.target.textContent=Math.floor(n)+s;if(n>=t)clearInterval(si);},35);co.unobserve(e.target);}}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));

/* REVEAL */
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vi');ro.unobserve(e.target);}}),{threshold:.08});
document.querySelectorAll('.rv').forEach(el=>ro.observe(el));

/* CASE STUDIES */
const csD={
  greenify:{title:'Greenify Nairobi — Case File 01',img:'https://ayrtonsenna-coder.github.io/StackTechsolutions/images/Greenify-mockup.png',stats:[{n:'80+',l:'Weekly Orders'},{n:'+40%',l:'Conversion Rate'},{n:'2.1×',l:'Revenue Lift'}],engine:'Revenue Engine',challenge:'A Nairobi plant shop with beautiful products and zero online presence. All sales were in-person at their market stall.',solution:'Full e-commerce platform with M-Pesa Daraja API v2, automated order emails, customer loyalty points, and Instagram feed integration.',result:'Within 6 weeks: 80+ weekly orders, customer base expanded from Nairobi-only to 8 counties. Revenue doubled in 3 months.'},
  autosphere:{title:'Autosphere Kenya — Case File 02',img:'https://ayrtonsenna-coder.github.io/StackTechsolutions/images/autosphere.png',stats:[{n:'3×',l:'Test Drive Bookings'},{n:'60%',l:'Faster Close'},{n:'45+',l:'Monthly Leads'}],engine:'Revenue + Operations Engine',challenge:'A Nairobi dealership losing customers to larger showrooms with no way for buyers to explore inventory remotely.',solution:'AR virtual showroom with colour customization, real-time inventory sync, online test-drive booking, and CRM-integrated lead pipeline.',result:'Test drive bookings tripled in month one. Sales cycle shortened by 60%. The AR feature became their primary marketing advantage.'},
  fountain:{title:'Fountain Gate Church — Case File 03',img:'https://ayrtonsenna-coder.github.io/StackTechsolutions/images/FGC-mockup.png',stats:[{n:'500+',l:'Active Members'},{n:'+150%',l:'Online Giving'},{n:'2K+',l:'Monthly Streams'}],engine:'Community Engine',challenge:'A fast-growing Mombasa church with no digital infrastructure, losing track of members and unable to reach people outside Sunday service.',solution:'Full community platform: M-Pesa + bank giving portal, sermon library with streaming, event management, member directory, weekly newsletter automation.',result:'Congregation grew from 200 to 500+ active members in 8 months. Online giving increased 150%, funding two new outreach programs.'}
};
function openCS(k){
  const d=csD[k];if(!d)return;
  document.getElementById('cs-ttl').textContent=d.title;
  document.getElementById('cs-body').innerHTML=`
    <img src="${d.img}" style="width:100%;border-radius:10px;height:220px;object-fit:cover;margin-bottom:1.5rem"/>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-bottom:1.75rem">
      ${d.stats.map(s=>`<div style="background:var(--lift);border:1px solid var(--border);border-radius:8px;padding:1rem;text-align:center"><div style="font-family:var(--dsp);font-size:1.6rem;font-weight:700;color:var(--cyan)">${s.n}</div><div style="font-family:var(--mn);font-size:.62rem;color:var(--fog);text-transform:uppercase;letter-spacing:.06em">${s.l}</div></div>`).join('')}
    </div>
    <div style="background:rgba(0,212,255,.05);border:1px solid rgba(0,212,255,.12);border-radius:8px;padding:.75rem 1rem;margin-bottom:1.5rem;font-family:var(--mn);font-size:.65rem;color:var(--cyan);letter-spacing:.08em;text-transform:uppercase">Engine Used: ${d.engine}</div>
    <h4 style="font-family:var(--dsp);font-weight:700;color:var(--cyan);font-size:.85rem;letter-spacing:.04em;text-transform:uppercase;margin-bottom:.5rem">The Challenge</h4>
    <p style="font-size:.875rem;color:var(--fog);line-height:1.75;margin-bottom:1.25rem">${d.challenge}</p>
    <h4 style="font-family:var(--dsp);font-weight:700;color:var(--cyan);font-size:.85rem;letter-spacing:.04em;text-transform:uppercase;margin-bottom:.5rem">Our Solution</h4>
    <p style="font-size:.875rem;color:var(--fog);line-height:1.75;margin-bottom:1.25rem">${d.solution}</p>
    <h4 style="font-family:var(--dsp);font-weight:700;color:var(--cyan);font-size:.85rem;letter-spacing:.04em;text-transform:uppercase;margin-bottom:.5rem">The Result</h4>
    <p style="font-size:.875rem;color:var(--fog);line-height:1.75;margin-bottom:1.5rem">${d.result}</p>
    <button onclick="closeCS();preF('Similar to ${d.title}')" style="width:100%;padding:.9rem;border-radius:8px;background:linear-gradient(135deg,var(--cyan),var(--cyan2));color:#000;font-family:var(--dsp);font-weight:700;font-size:.875rem;border:none;cursor:none">Build Something Like This →</button>
  `;
  const m=document.getElementById('csOv');m.style.pointerEvents='all';m.style.opacity='1';
}
function closeCS(){const m=document.getElementById('csOv');m.style.opacity='0';m.style.pointerEvents='none';}
document.getElementById('csOv').addEventListener('click',e=>{if(e.target===document.getElementById('csOv'))closeCS()});

/* AI TOOLS */
async function callAI(p){
  const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:p}]})});
  const d=await r.json();if(d.error)throw new Error(d.error.message);return d.content[0].text;
}
function aiToggle(btn,load,err,res,on){
  document.getElementById(btn).disabled=on;
  document.getElementById(load).classList.toggle('on',on);
  document.getElementById(err).classList.remove('on');
  if(!on)document.getElementById(res).classList.remove('on');
}
async function runAudit(){
  const url=document.getElementById('a_url').value.trim(),type=document.getElementById('a_type').value,goal=document.getElementById('a_goal').value.trim();
  if(!url||!type){alert('Please enter your website and select your business type.');return;}
  aiToggle('a_btn','a_load','a_err','a_res',true);
  try{const t=await callAI(`You are a senior web consultant specializing in Kenyan businesses.\n\nWebsite: ${url}\nBusiness Type: ${type}\nGoal: ${goal||'generate leads'}\n\nProvide:\n1. CONVERSION SCORE: /100\n2. TOP 5 ISSUES (specific, direct)\n3. TOP 5 REVENUE-FOCUSED RECOMMENDATIONS\n4. QUICK WINS: 3 things fixable this week\n5. KENYA-SPECIFIC INSIGHTS\n\nBe direct and Kenya-market aware.`);document.getElementById('a_out').textContent=t;document.getElementById('a_res').classList.add('on');}
  catch(e){document.getElementById('a_err').textContent='AI temporarily unavailable. WhatsApp us for a manual audit.';document.getElementById('a_err').classList.add('on');}
  document.getElementById('a_btn').disabled=false;document.getElementById('a_load').classList.remove('on');
}
async function runHeadlines(){
  const biz=document.getElementById('h_biz').value.trim(),cust=document.getElementById('h_cust').value.trim(),usp=document.getElementById('h_usp').value.trim();
  if(!biz){alert('Please describe your business.');return;}
  aiToggle('h_btn','h_load','h_err','h_res',true);
  try{const t=await callAI(`You are a world-class copywriter for Kenyan businesses.\n\nBusiness: ${biz}\nCustomer: ${cust||'Kenyan consumers'}\nEdge: ${usp||'quality'}\n\nGenerate 5 compelling website hero headlines. For each:\n- The headline (specific, benefit-focused)\n- Why it works\n- Conversion impact: Low/Medium/High/Very High\n\nFocus on customer transformation, Kenya context.`);document.getElementById('h_out').textContent=t;document.getElementById('h_res').classList.add('on');}
  catch(e){document.getElementById('h_err').textContent='AI temporarily unavailable. Try again shortly.';document.getElementById('h_err').classList.add('on');}
  document.getElementById('h_btn').disabled=false;document.getElementById('h_load').classList.remove('on');
}
async function runSEO(){
  const niche=document.getElementById('s_niche').value.trim(),loc=document.getElementById('s_loc').value.trim(),cust=document.getElementById('s_cust').value.trim();
  if(!niche){alert('Please enter your business niche.');return;}
  aiToggle('s_btn','s_load','s_err','s_res',true);
  try{const t=await callAI(`You are a Kenya-specialist SEO expert.\n\nNiche: ${niche}\nLocation: ${loc||'Kenya'}\nCustomer: ${cust||'Kenyan consumers'}\n\nProvide:\n1. TOP 10 KEYWORDS (with search intent)\n2. DIFFICULTY RATING for each\n3. 5 blog post titles that would rank\n4. LOCAL SEO TIPS: 3 actions for ${loc||'Kenya'}\n5. QUICK WIN: Most impactful SEO action this week`);document.getElementById('s_out').textContent=t;document.getElementById('s_res').classList.add('on');}
  catch(e){document.getElementById('s_err').textContent='AI temporarily unavailable. Try again shortly.';document.getElementById('s_err').classList.add('on');}
  document.getElementById('s_btn').disabled=false;document.getElementById('s_load').classList.remove('on');
}

/* FORM */
function psel(b,g){document.querySelectorAll(`[onclick*="'${g}'"]`).forEach(x=>x.classList.remove('on'));b.classList.add('on')}
function preF(pkg){document.getElementById('f_ds').value=`Interested in: ${pkg}\n\nPlease send a detailed proposal.`;document.getElementById('contact').scrollIntoView({behavior:'smooth'})}
async function doSubmit(){
  const nm=document.getElementById('f_nm').value.trim(),ph=document.getElementById('f_ph').value.trim();
  if(!nm||!ph){alert('Please enter your name and WhatsApp number.');return;}
  const em=document.getElementById('f_em').value.trim(),bd=document.getElementById('f_bd').value,ds=document.getElementById('f_ds').value.trim();
  const wa=`Hi LuminaKwa Digital! New brief:\n👤 ${nm}\n📧 ${em||'N/A'}\n📱 ${ph}\n💰 ${bd||'N/A'}\n\n📝 ${ds}`;
  window.open('https://wa.me/254795451238?text='+encodeURIComponent(wa),'_blank');
  document.getElementById('cf-form').style.display='none';
  document.getElementById('cf-suc').classList.add('on');
}