/* ── WAVE CANVAS ─────────────────────────── */
(function(){
  const canvas=document.getElementById('wave-canvas');
  const ctx=canvas.getContext('2d');
  let W,H,t=0;
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
  resize();window.addEventListener('resize',resize);
  function draw(){
    ctx.clearRect(0,0,W,H);
    // Draw 3 wave layers
    [[0.003,0.6,0.012,'rgba(0,229,192,.07)'],[0.002,0.5,0.018,'rgba(0,200,170,.05)'],[0.004,0.7,0.008,'rgba(255,210,63,.04)']].forEach(([spd,amp,freq,col],i)=>{
      ctx.beginPath();
      const base=H*(0.55+i*0.08);
      ctx.moveTo(0,base);
      for(let x=0;x<=W;x+=4){
        const y=base+Math.sin(x*freq+t*(spd*100)+i*2)*amp*H*0.1+Math.sin(x*freq*2.3+t*(spd*60))*amp*H*0.04;
        ctx.lineTo(x,y);
      }
      ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();
      ctx.fillStyle=col;ctx.fill();
    });
    t+=0.016;requestAnimationFrame(draw);
  }
  draw();
})();

/* ── CURSOR ──────────────────────────────── */
const cd=document.getElementById('cd'),cr=document.getElementById('cr');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cd.style.left=mx+'px';cd.style.top=my+'px'});
(function anim(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;cr.style.left=rx+'px';cr.style.top=ry+'px';requestAnimationFrame(anim)})();
document.querySelectorAll('a,button,.case-row,.eng,.pc,.proof-c,.ai-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('ch'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('ch'));
});

/* ── SCROLL ──────────────────────────────── */
const spb=document.getElementById('spb'),nav=document.getElementById('nav'),stk=document.getElementById('stk');
window.addEventListener('scroll',()=>{
  const y=scrollY,h=document.body.scrollHeight-innerHeight;
  spb.style.width=(y/h*100)+'%';
  nav.classList.toggle('solid',y>50);
  stk.classList.toggle('up',y>800);
  document.querySelectorAll('section[id]').forEach(s=>{
    const lnk=document.querySelector(`.nav-ul a[href="#${s.id}"]`);
    if(lnk)lnk.style.color=y>=s.offsetTop-140&&y<s.offsetTop+s.offsetHeight-140?'var(--teal)':'';
  });
});

/* ── URGENCY BANNER ─────────────────────── */
function closeUrgency(){
  document.getElementById('urgency').style.display='none';
  document.body.classList.add('no-banner');
  nav.style.top='0';
}

/* ── MOBILE NAV ──────────────────────────── */
function openMob(){document.getElementById('mob').classList.add('on')}
function closeMob(){document.getElementById('mob').classList.remove('on')}

/* ── CLOCK ───────────────────────────────── */
function upClk(){const t=new Date().toLocaleTimeString('en-KE',{timeZone:'Africa/Nairobi',hour:'2-digit',minute:'2-digit',hour12:false});document.getElementById('clk').textContent=t;}
upClk();setInterval(upClk,1000);

/* ── TEXT SCRAMBLE ───────────────────────── */
const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
const words=['revenue','growth','clients','results','the future','success'];
let wi=0,step=0,del=false,running=false;
const scEl=document.getElementById('scramble');
function scramble(){
  running=true;
  const w=words[wi];
  if(!del){
    scEl.textContent=w.split('').map((c,i)=>i<step?c:chars[Math.floor(Math.random()*chars.length)]).join('');
    if(step<w.length){step++;setTimeout(scramble,72);}
    else{del=true;setTimeout(scramble,2800);}
  } else {
    const rem=Math.max(0,step-1);
    scEl.textContent=w.slice(0,rem)+w.slice(rem).split('').map(c=>chars[Math.floor(Math.random()*chars.length)]).join('');
    step--;
    if(step<=0){del=false;wi=(wi+1)%words.length;setTimeout(scramble,250);}
    else{setTimeout(scramble,52);}
  }
}
setTimeout(scramble,2000);

/* ── COUNTER ANIMATIONS ─────────────────── */
const cobs=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    const tgt=parseInt(e.target.dataset.count),sfx=e.target.dataset.sfx||'';
    let n=0;const si=setInterval(()=>{
      n=Math.min(n+(tgt/45),tgt);
      e.target.textContent=Math.floor(n)+sfx;
      if(n>=tgt)clearInterval(si);
    },30);
    cobs.unobserve(e.target);
  }
}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>cobs.observe(el));

/* ── REVEAL ANIMATIONS ───────────────────── */
const robs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vi');robs.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.rv').forEach(el=>robs.observe(el));

/* ── CASE STUDY MODAL ───────────────────── */
const csD={
  greenify:{title:'Greenify Nairobi — Case File 01',img:'project images/greenify.png',stats:[{n:'80+',l:'Weekly Orders'},{n:'+40%',l:'Conversion Rate'},{n:'2.1×',l:'Revenue Lift'}],engine:'Revenue Engine',challenge:'A Nairobi plant shop with beautiful products and zero online presence. All sales were in-person at their market stall. No M-Pesa checkout, no way to reach customers across Kenya.',solution:'Full e-commerce platform with M-Pesa Daraja API v2, automated order emails, customer loyalty system, Instagram feed integration, and shipping tracking.',result:'Within 6 weeks: 80+ weekly orders, customer base expanded from Nairobi-only to 8 counties across Kenya. Revenue doubled in 3 months.'},
  autosphere:{title:'Autosphere Kenya — Case File 02',img:'project images/autosphere.png',stats:[{n:'3×',l:'Test Drive Bookings'},{n:'60%',l:'Faster Close'},{n:'45+',l:'Monthly Leads'}],engine:'Revenue + Operations Engine',challenge:'A Nairobi dealership losing customers to larger showrooms. Low foot traffic and no way for buyers to explore inventory remotely or book test drives online.',solution:'AR virtual showroom with colour customization, real-time inventory sync, online test-drive booking, and CRM-integrated lead pipeline with WhatsApp notifications.',result:'Test drive bookings tripled in month one. Sales cycle shortened by 60%. The AR showroom became their primary marketing talking point.'},
  fountain:{title:'Fountain Gate Church — Case File 03',img:"project images/fountain gate church.png",stats:[{n:'500+',l:'Active Members'},{n:'+150%',l:'Online Giving'},{n:'2K+',l:'Monthly Streams'}],engine:'Community Engine',challenge:'A fast-growing Mombasa church with no digital infrastructure. Losing track of members, no online giving system, unable to reach people outside Sunday service.',solution:'Full community platform: M-Pesa + bank giving portal, sermon library with streaming, event management, member directory, and weekly newsletter automation.',result:'Congregation grew from 200 to 500+ active members in 8 months. Online giving increased 150%, funding two new outreach programs.'}
};
function openCS(k){
  const d=csD[k];if(!d)return;
  document.getElementById('cs-t').textContent=d.title;
  document.getElementById('cs-b').innerHTML=`
    <img src="${d.img}" style="width:100%;border-radius:12px;height:220px;object-fit:cover;margin-bottom:1.5rem;filter:brightness(.85) saturate(1.1)"/>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-bottom:1.75rem">
      ${d.stats.map(s=>`<div style="background:rgba(6,21,37,.8);border:1px solid rgba(0,229,192,.15);border-radius:10px;padding:1rem;text-align:center"><div style="font-size:1.7rem;font-weight:800;color:var(--teal);letter-spacing:-.02em">${s.n}</div><div style="font-family:var(--mn);font-size:.62rem;color:var(--fog2);text-transform:uppercase;letter-spacing:.06em;margin-top:.25rem">${s.l}</div></div>`).join('')}
    </div>
    <div style="background:rgba(0,229,192,.05);border:1px solid rgba(0,229,192,.14);border-radius:8px;padding:.75rem 1rem;margin-bottom:1.5rem;font-family:var(--mn);font-size:.65rem;color:var(--teal);letter-spacing:.1em;text-transform:uppercase">Engine Used: ${d.engine}</div>
    <h4 style="font-size:.85rem;font-weight:700;color:var(--teal);letter-spacing:.06em;text-transform:uppercase;margin-bottom:.5rem">The Challenge</h4>
    <p style="font-size:.875rem;color:var(--fog);line-height:1.78;margin-bottom:1.25rem">${d.challenge}</p>
    <h4 style="font-size:.85rem;font-weight:700;color:var(--teal);letter-spacing:.06em;text-transform:uppercase;margin-bottom:.5rem">Our Solution</h4>
    <p style="font-size:.875rem;color:var(--fog);line-height:1.78;margin-bottom:1.25rem">${d.solution}</p>
    <h4 style="font-size:.85rem;font-weight:700;color:var(--teal);letter-spacing:.06em;text-transform:uppercase;margin-bottom:.5rem">The Result</h4>
    <p style="font-size:.875rem;color:var(--fog);line-height:1.78;margin-bottom:1.5rem">${d.result}</p>
    <button onclick="closeCS();preF('Similar to ${d.title}')" style="width:100%;padding:.9rem;border-radius:8px;background:linear-gradient(135deg,var(--teal),var(--teal2));color:#000;font-weight:700;font-size:.875rem;border:none;cursor:none;letter-spacing:.01em">Build Something Like This →</button>
  `;
  document.getElementById('csOv').classList.add('on');
}
function closeCS(){document.getElementById('csOv').classList.remove('on')}
document.getElementById('csOv').addEventListener('click',e=>{if(e.target===document.getElementById('csOv'))closeCS()});

/* ── AI TOOLS ────────────────────────────── */
async function callAI(p){
  const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:p}]})});
  const d=await r.json();if(d.error)throw new Error(d.error.message);return d.content[0].text;
}
function aiUI(btn,load,err,res,on){
  document.getElementById(btn).disabled=on;
  document.getElementById(load).classList.toggle('on',on);
  document.getElementById(err).classList.remove('on');
  if(!on)document.getElementById(res).classList.remove('on');
}
async function runAudit(){
  const url=document.getElementById('a_url').value.trim(),type=document.getElementById('a_type').value,goal=document.getElementById('a_goal').value.trim();
  if(!url||!type){alert('Please enter your website and select your business type.');return;}
  aiUI('a_btn','a_load','a_err','a_res',true);
  try{
    const t=await callAI(`You are a senior web consultant specializing in Kenyan businesses.\n\nWebsite: ${url}\nBusiness Type: ${type}\nGoal: ${goal||'generate leads'}\n\nProvide a structured audit:\n1. CONVERSION SCORE: /100 (be realistic and honest)\n2. TOP 5 ISSUES holding this site back (be specific and direct)\n3. TOP 5 REVENUE-FOCUSED RECOMMENDATIONS with expected impact\n4. QUICK WINS: 3 things fixable this week\n5. KENYA-SPECIFIC INSIGHTS: M-Pesa, mobile usage, local SEO tips\n\nBe professional, direct, and Kenya-market specific.`);
    document.getElementById('a_out').textContent=t;document.getElementById('a_res').classList.add('on');
  }catch(e){document.getElementById('a_err').textContent='AI temporarily unavailable. Please try again or WhatsApp us for a manual audit.';document.getElementById('a_err').classList.add('on');}
  document.getElementById('a_btn').disabled=false;document.getElementById('a_load').classList.remove('on');
  document.getElementById('a_btn').textContent='🔍 Run Again';
}
async function runHeadlines(){
  const biz=document.getElementById('h_biz').value.trim(),cust=document.getElementById('h_cust').value.trim(),usp=document.getElementById('h_usp').value.trim();
  if(!biz){alert('Please describe your business.');return;}
  aiUI('h_btn','h_load','h_err','h_res',true);
  try{
    const t=await callAI(`You are a world-class copywriter for Kenyan businesses.\n\nBusiness: ${biz}\nTarget Customer: ${cust||'Kenyan consumers'}\nUnique Edge: ${usp||'quality and reliability'}\n\nGenerate 5 powerful website hero headlines. For each:\n- The headline (specific, benefit-focused, outcome-driven)\n- Why it works (psychology/specificity)\n- Conversion impact: Low/Medium/High/Very High\n\nAvoid generic phrases. Focus on customer transformation. Kenya-market aware.`);
    document.getElementById('h_out').textContent=t;document.getElementById('h_res').classList.add('on');
  }catch(e){document.getElementById('h_err').textContent='AI temporarily unavailable. Try again shortly.';document.getElementById('h_err').classList.add('on');}
  document.getElementById('h_btn').disabled=false;document.getElementById('h_load').classList.remove('on');
  document.getElementById('h_btn').textContent='✍️ Generate Again';
}
async function runSEO(){
  const niche=document.getElementById('s_niche').value.trim(),loc=document.getElementById('s_loc').value.trim(),cust=document.getElementById('s_cust').value.trim();
  if(!niche){alert('Please enter your business niche.');return;}
  aiUI('s_btn','s_load','s_err','s_res',true);
  try{
    const t=await callAI(`You are a Kenya-specialist SEO expert.\n\nNiche: ${niche}\nLocation: ${loc||'Kenya'}\nCustomer: ${cust||'Kenyan consumers'}\n\nProvide:\n1. TOP 10 KEYWORDS (with search intent: Info/Commercial/Transactional)\n2. DIFFICULTY RATING for each (Easy/Medium/Hard)\n3. CONTENT IDEAS: 5 blog post titles that would rank\n4. LOCAL SEO TIPS: 3 actions to rank in ${loc||'Kenya'}\n5. QUICK WIN: Single most impactful SEO action this week\n\nBe specific to the Kenyan market.`);
    document.getElementById('s_out').textContent=t;document.getElementById('s_res').classList.add('on');
  }catch(e){document.getElementById('s_err').textContent='AI temporarily unavailable. Try again shortly.';document.getElementById('s_err').classList.add('on');}
  document.getElementById('s_btn').disabled=false;document.getElementById('s_load').classList.remove('on');
  document.getElementById('s_btn').textContent='📊 Get New Keywords';
}

/* ── FORM ────────────────────────────────── */
function psel(b,g){document.querySelectorAll(`[onclick*="'${g}'"]`).forEach(x=>x.classList.remove('on'));b.classList.add('on')}
function preF(pkg){document.getElementById('f_ds').value=`Interested in: ${pkg}\n\nPlease send me a detailed proposal.`;document.getElementById('contact').scrollIntoView({behavior:'smooth'})}
async function doSubmit(){
  const nm=document.getElementById('f_nm').value.trim(),ph=document.getElementById('f_ph').value.trim();
  if(!nm||!ph){alert('Please enter your name and WhatsApp number.');return;}
  const em=document.getElementById('f_em').value.trim(),bd=document.getElementById('f_bd').value,ds=document.getElementById('f_ds').value.trim();
  const wa=`Hi LuminaKwa Digital! New project brief:\n👤 ${nm}\n📧 ${em||'N/A'}\n📱 ${ph}\n💰 ${bd||'Not specified'}\n\n📝 Goal: ${ds||'Not specified'}`;
  window.open('https://wa.me/254795451238?text='+encodeURIComponent(wa),'_blank');
  document.getElementById('fc').style.display='none';
  document.getElementById('fs').classList.add('on');
}

/* ── UTM DETECTION ───────────────────────── */
(function(){
  const p=new URLSearchParams(location.search),src=p.get('utm_source')||'';
  if(!src)return;
  const s=src.toLowerCase(),urg=document.getElementById('urgency');
  if(!urg)return;
  if(s.includes('instagram')||s.includes('ig')){
    urg.querySelector('span').innerHTML='👋 Welcome from <b style="color:var(--gold)">Instagram!</b> Mention <b style="color:var(--teal)">"LUMINA2025"</b> for a free growth audit + <b style="color:var(--gold)">15% off</b> your first project.';
  }
})();