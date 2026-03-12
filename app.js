
// ── PHASE DATA ───────────────────────────────
const PHASES = {
  menstrual: {
    key: "menstrual", days: "Days 1–5",
    color: "#e05252", dim: "rgba(224,82,82,0.08)",
    label: "Menstrual", sub: "The reset",
    weather: "Thunderstorm", mood: "Drained · Sensitive · Emotional",
    feel: "Everything hurts and everyone is annoying.",
    hormones: { estrogen: 10, progesterone: 5, serotonin: 20 },
    decisionBlock: true,
    junk: "You're losing blood. The burger, the fries, the chocolate — that's iron and magnesium. Consider it medical.",
    partner: "Heads up — she's on Day 1.\n\nDo: bring food, be warm, ask before touching.\nDon't: say 'you're so sensitive.' Exist quietly.",
    survival: [
      ["Iron & protein", "Non-negotiable replenishment."],
      ["Hot bath", "The most effective cramp relief there is."],
      ["Light walking only", "You've earned the couch."],
      ["No caffeine", "Makes cramping significantly worse."],
      ["Dark chocolate", "Magnesium. Genuinely medicinal."],
      ["Extra sleep", "Your body is shedding a lining. Rest."],
    ],
    why: [
      ["Estrogen", "Crashed", "Mood regulation offline. This is the hard reboot."],
      ["Progesterone", "At zero", "Your body wrapped up this cycle. It's being dramatic."],
      ["Serotonin", "Low", "Drops with estrogen. The happiness signal is weak."],
      ["Prostaglandins", "Spiking", "These cause the contractions. The villain of Day 1."],
    ],
    anim: { estrogen:10, serotonin:10, progesterone:5, devil:95, angel:25, chaos:95, finale:"You're not broken.\nYour body is resetting.\nThis passes." },
  },
  follicular: {
    key: "follicular", days: "Days 6–13",
    color: "#4caf82", dim: "rgba(76,175,130,0.08)",
    label: "Follicular", sub: "The rising",
    weather: "Clearing", mood: "Energized · Creative · Clear",
    feel: "Wait — I actually feel like a person again.",
    hormones: { estrogen: 75, progesterone: 15, serotonin: 80 },
    decisionBlock: false, junk: null,
    partner: "Green light.\n\nShe's in her best phase of the month — high energy, clear head, good mood. Plan something. Have the real conversation. Don't waste the window.",
    survival: [
      ["Intense workouts", "Energy is building — use it."],
      ["New foods, new places", "Digestion is smooth, appetite is good."],
      ["Make the big decision", "Brain is at its absolute clearest."],
      ["Say yes to plans", "Social energy is high. Extraversion peaks here."],
      ["Start the project", "Creative ideas flow most easily now."],
      ["Have the hard talk", "Emotional regulation is at its best."],
    ],
    why: [
      ["Estrogen", "Rising", "Mood, confidence, skin — all climbing."],
      ["Serotonin", "Increasing", "Happiness signal back online."],
      ["Dopamine", "Active", "Motivation, focus, pleasure — all switched on."],
      ["Testosterone", "Slight boost", "Drive and confidence quietly building."],
    ],
    anim: { estrogen:75, serotonin:80, progesterone:15, devil:15, angel:90, chaos:10, finale:"Your hormones are rising.\nThis is your window.\nUse it." },
  },
  ovulation: {
    key: "ovulation", days: "Days 14–16",
    color: "#e09b3d", dim: "rgba(224,155,61,0.08)",
    label: "Ovulation", sub: "The peak",
    weather: "Peak sunshine", mood: "Confident · Magnetic · Unstoppable",
    feel: "I am that girl. Everything is possible.",
    hormones: { estrogen: 100, progesterone: 30, serotonin: 95 },
    decisionBlock: false, junk: null,
    partner: "She's ovulating.\n\nPeak energy, peak confidence, peak magnetism. Great time for a date, a trip, anything fun. She's radiant and you'll notice.",
    survival: [
      ["Present and pitch", "Persuasion and charisma are at their peak."],
      ["High-intensity training", "Body is at absolute peak performance."],
      ["Negotiate", "You're naturally convincing right now. Use it."],
      ["Take photos", "Skin, eyes, energy — genuinely at their best."],
      ["Lean into romance", "Magnetic pull is real. Work with it."],
      ["Eat zinc", "Oysters, pumpkin seeds — support ovulation."],
    ],
    why: [
      ["LH", "Surging", "Triggers ovulation. Also the 'I can do anything' feeling."],
      ["Estrogen", "Peak", "Beauty, confidence, social energy — all maxed."],
      ["Testosterone", "Peak", "Drive, assertiveness, that magnetic quality."],
      ["Serotonin", "Maximum", "Life genuinely feels good right now."],
    ],
    anim: { estrogen:100, serotonin:95, progesterone:30, devil:5, angel:100, chaos:5, finale:"Everything is firing.\nYou are at peak biology.\nThis is your moment." },
  },
  luteal_early: {
    key: "luteal_early", days: "Days 17–24",
    color: "#8b6fd4", dim: "rgba(139,111,212,0.08)",
    label: "Early Luteal", sub: "The shift",
    weather: "Cloudy", mood: "Slower · Introverted · Craving comfort",
    feel: "Something is shifting. I'm tired and want snacks.",
    hormones: { estrogen: 60, progesterone: 80, serotonin: 50 },
    decisionBlock: false,
    junk: "The sugar craving is a real blood sugar issue — hormones are shifting how your body regulates glucose. The macaron is fine.",
    partner: "Heads up — luteal phase has started.\n\nKeep the compliments coming. Reduce criticism. Bring food home without being asked. You've been warned.",
    survival: [
      ["Yoga and stretching", "Lowers cortisol before things escalate."],
      ["Magnesium and nuts", "Supports the shift, reduces bloating."],
      ["Gentler exercise", "Pilates and swimming over HIIT."],
      ["Write it down", "Get the emotions out of your head."],
      ["Chamomile at night", "Reduces anxiety, improves sleep."],
      ["Less scrolling", "Sensitivity is up. Social media will not help."],
    ],
    why: [
      ["Progesterone", "Rising", "Sedating — calming, but also draining."],
      ["Estrogen", "Falling", "Serotonin drops with it."],
      ["Serotonin", "Declining", "That 'blah for no reason' feeling starts here."],
      ["Cortisol", "More reactive", "Small things feel bigger than they are."],
    ],
    anim: { estrogen:60, serotonin:50, progesterone:80, devil:50, angel:50, chaos:50, finale:"The shift has begun.\nBe extra gentle\nwith yourself." },
  },
  luteal_late: {
    key: "luteal_late", days: "Days 25–28",
    color: "#c94f4f", dim: "rgba(201,79,79,0.08)",
    label: "Late Luteal", sub: "The storm",
    weather: "Severe storm", mood: "Explosive · Maximum sensitivity",
    feel: "Bloated, exhausted, can't sleep. And his breathing is too loud.",
    hormones: { estrogen: 15, progesterone: 10, serotonin: 10 },
    decisionBlock: true,
    junk: "Ramen, fried chicken, ice cream — this is emergency serotonin support. Diet resumes next week. Non-negotiable.",
    partner: "Emergency.\n\nPeak PMS. Do all the chores. Buy food without being asked. Ask 'what do you need?' and mean it.\n\nNever say: 'why are you so sensitive' or 'is it that time of month.'\n\nSurvive this. You'll both be fine in a few days.",
    survival: [
      ["Sauna or hot bath tonight", "The most effective thing you can do right now."],
      ["Walk alone for 30 minutes", "Endorphins are the only real antidote."],
      ["Protein and complex carbs", "Stable blood sugar stabilizes mood."],
      ["Off social media", "Sensitivity plus comparison equals disaster."],
      ["Epsom salt bath", "Reduces bloating and calms the nervous system."],
      ["In bed by 10pm", "Sleep loss makes PMS catastrophically worse."],
    ],
    why: [
      ["Estrogen", "Crashed", "Takes serotonin and dopamine with it."],
      ["Progesterone", "Crashed", "GABA disrupted — anxiety, insomnia, irritability."],
      ["Serotonin", "Rock bottom", "The biochemical reason your partner annoys you."],
      ["Cortisol", "Elevated", "Everything feels like a threat. System on high alert."],
    ],
    anim: { estrogen:15, serotonin:10, progesterone:10, devil:100, angel:5, chaos:100, finale:"You're not broken.\nYour hormones crashed.\nThis is temporary." },
  },
};

const PARTNER_TEMPLATES = {
  menstrual: {
    tone: "Low energy / reset mode",
    messages: [
      "Day 1. System reboot in progress. Please provide food and minimal conversation.",
      "Energy level: 12%. If it's not urgent, it can wait until next week.",
      "I'm currently powered by painkillers and snacks. Please be gentle.",
      "If I fall asleep randomly, it's not personal. It's biology.",
      "Hard conversations not available today. Please try again in 5 days.",
    ]
  },
  luteal_late: {
    tone: "Threat detection system: activated",
    messages: [
      "Current status: everything is slightly annoying. Proceed carefully.",
      "Serotonin levels are low. Please avoid sarcasm.",
      "If I say something dramatic, please remember I also cried at a commercial earlier.",
      "Warning: small issues may feel like national emergencies today.",
      "If I seem angry — I am. Sad — I am. Fine — I'm not. Good luck out there.",
      "I'm sad but there's nothing to fix. Just sit near me and don't offer solutions.",
      "I don't need advice. I need proximity and maybe a warm drink.",
    ]
  },
  follicular: {
    tone: "Energy returning / brain clear",
    messages: [
      "Update: mood stabilizing. I'm open to plans and ideas again.",
      "This is the phase where I forgive many things.",
      "Good news: I'm in my best phase. Bad news: you have 7 days to fix everything you've been avoiding.",
      "Green light. Whatever you've been wanting to ask — now is literally the best time.",
    ]
  },
  ovulation: {
    tone: "Confidence + social energy",
    messages: [
      "Reminder: this is the charming version of me.",
      "I feel incredible and I want to do something. Anywhere. Tonight. Suggest something good.",
      "If you want to impress me, today is a strong opportunity.",
      "Mood: confident, social, optimistic. Use this wisely.",
    ]
  },
  luteal_early: {
    tone: "Shifting — handle with care",
    messages: [
      "Energy is dipping. Low-effort plans preferred this week.",
      "I may need more reassurance than usual. That's all.",
      "Best approach this week: less talk, more snacks.",
      "Things that were fine last week may not be fine this week. Adjust accordingly.",
      "Verbal communication is temporarily offline. Nods and snacks accepted.",
      "Can we go outside and not talk? Just walk next to each other.",
    ]
  },
};

const SYMPTOMS = [
  { id:"brain_fog",  label:"Brain fog" },
  { id:"temp",       label:"Temp dysregulation" },
  { id:"irritable",  label:"Irritable" },
  { id:"sad",        label:"Low mood" },
  { id:"bloat",      label:"Bloating" },
  { id:"craving",    label:"Cravings" },
  { id:"insomnia",   label:"Can't sleep" },
  { id:"headache",   label:"Headache" },
  { id:"low_energy", label:"Low energy" },
  { id:"anxious",    label:"Anxious" },
  { id:"slow",       label:"Moving slow" },
  { id:"good",       label:"Feeling good" },
];

function phaseForDay(d) {
  if (d<=5) return PHASES.menstrual;
  if (d<=13) return PHASES.follicular;
  if (d<=16) return PHASES.ovulation;
  if (d<=24) return PHASES.luteal_early;
  return PHASES.luteal_late;
}

// ── TINY BAR ─────────────────────────────────
function Bar({ label, value, color }) {
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontSize:12, color:"rgba(255,255,255,.4)", letterSpacing:".5px" }}>{label}</span>
        <span style={{ fontSize:12, color, fontFamily:"'DM Mono',monospace" }}>{value}%</span>
      </div>
      <div style={{ height:2, background:"rgba(255,255,255,.07)", borderRadius:1 }}>
        <div style={{ height:"100%", width:`${value}%`, background:color, borderRadius:1, transition:"width 1s ease" }}/>
      </div>
    </div>
  );
}

// ── FILM ─────────────────────────────────────
const FD=[5500,6000,7000,7000,6000], FT=FD.reduce((a,b)=>a+b,0);
function Film({ phase, onClose }) {
  const a = phase.anim;
  const [scene,setScene]=useState(0);
  const [pct,setPct]=useState(0);
  const [vis,setVis]=useState([]);
  useEffect(()=>{
    const t0=Date.now();
    const iv=setInterval(()=>{
      const n=Date.now()-t0;
      setPct(Math.min(100,n/FT*100));
      let acc=0;
      for(let i=0;i<FD.length;i++){acc+=FD[i];if(n<acc){setScene(i);break;}if(i===FD.length-1)setScene(FD.length-1);}
    },50);
    const s3=FD.slice(0,3).reduce((x,y)=>x+y,0);
    [0,1,2,3].forEach(i=>setTimeout(()=>setVis(p=>[...p,i]),s3+i*600));
    const end=setTimeout(onClose,FT+600);
    return()=>{clearInterval(iv);clearTimeout(end);};
  },[]);

  const filmLabels=["Brain signal","Hormone levels","The balance","Your symptoms","The truth"];
  const symptoms = ["Brain fog","Low serotonin","Mood drop","Cortisol spike"];

  return (
    <div style={{position:"fixed",inset:0,zIndex:200,background:"#08060e",display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto",fontFamily:"'DM Sans',sans-serif",color:"white",padding:"24px 24px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:4}}>Inside your hormones</div>
          <div style={{fontSize:16,fontWeight:500}}>Scene {scene+1} — {filmLabels[scene]}</div>
        </div>
        <button onClick={onClose} style={{background:"none",border:"1px solid rgba(255,255,255,.12)",borderRadius:8,padding:"6px 14px",color:"rgba(255,255,255,.4)",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>close</button>
      </div>

      {/* Progress */}
      <div style={{height:1,background:"rgba(255,255,255,.07)",marginBottom:40}}>
        <div style={{height:"100%",width:`${pct}%`,background:phase.color,transition:"width .05s"}}/>
      </div>

      <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
        {scene===0&&(
          <div style={{animation:"fadeIn .5s ease"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:48,fontWeight:700,lineHeight:1.1,marginBottom:32,color:"white"}}>
              {a.estrogen<30?"Estrogen\nhas crashed.":"Estrogen\nis healthy."}
            </div>
            <div style={{marginBottom:16}}>
              <div style={{height:1,background:"rgba(255,255,255,.07)",marginBottom:12}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:13,color:"rgba(255,255,255,.4)"}}>Current level</span>
                <span style={{fontSize:24,fontFamily:"'DM Mono',monospace",color:a.estrogen<30?phase.color:"#4caf82"}}>{a.estrogen}%</span>
              </div>
              <div style={{height:1,background:"rgba(255,255,255,.07)",marginTop:12}}/>
            </div>
            <p style={{fontSize:14,color:"rgba(255,255,255,.5)",lineHeight:1.8}}>
              {a.estrogen<30
                ?"Estrogen regulates your mood, focus, and emotional stability. When it crashes, everything crashes with it."
                :"Estrogen is supporting your mood, focus, and emotional clarity right now. This is why you feel capable."}
            </p>
          </div>
        )}
        {scene===1&&(
          <div style={{animation:"fadeIn .5s ease"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,fontWeight:700,lineHeight:1.2,marginBottom:40}}>
              {a.serotonin<30?"Three systems\nhave gone offline.":"Three systems\nare running well."}
            </div>
            {[["Estrogen",a.estrogen,"#e07fa0"],["Serotonin",a.serotonin,"rgba(255,255,255,.7)"],["Progesterone",a.progesterone,"#8b6fd4"]].map(([l,v,c])=>(
              <Bar key={l} label={l} value={v} color={c}/>
            ))}
          </div>
        )}
        {scene===2&&(
          <div style={{animation:"fadeIn .5s ease"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,fontWeight:700,lineHeight:1.2,marginBottom:40}}>
              {a.devil>70?"The devil\nis winning.":a.devil>40?"It's\nclose.":"The angel\nhas it."}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(255,255,255,.06)"}}>
              <div style={{background:"#08060e",padding:24}}>
                <div style={{fontSize:11,letterSpacing:"1.5px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:12}}>Angel</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:42,color:"rgba(255,255,255,.8)",marginBottom:8}}>{a.angel}%</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.3)"}}>calm · clear · stable</div>
              </div>
              <div style={{background:"#08060e",padding:24}}>
                <div style={{fontSize:11,letterSpacing:"1.5px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:12}}>Devil</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:42,color:phase.color,marginBottom:8}}>{a.devil}%</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.3)"}}>reactive · irritable · stressed</div>
              </div>
            </div>
          </div>
        )}
        {scene===3&&(
          <div style={{animation:"fadeIn .5s ease"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,fontWeight:700,lineHeight:1.2,marginBottom:40}}>
              What's\nreaching you.
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(255,255,255,.06)"}}>
              {symptoms.map((s,i)=>(
                <div key={i} style={{background:"#08060e",padding:18,opacity:vis.includes(i)?1:0,transform:vis.includes(i)?"none":"translateY(8px)",transition:"all .4s ease"}}>
                  <div style={{width:4,height:4,background:phase.color,borderRadius:"50%",marginBottom:10}}/>
                  <div style={{fontSize:13,color:"rgba(255,255,255,.7)"}}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {scene===4&&(
          <div style={{animation:"fadeIn .8s ease"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:48,fontWeight:700,lineHeight:1.15,marginBottom:40,whiteSpace:"pre-line"}}>
              {a.finale}
            </div>
            <div style={{height:1,background:"rgba(255,255,255,.07)",marginBottom:24}}/>
            <p style={{fontSize:14,color:"rgba(255,255,255,.4)",lineHeight:1.8,marginBottom:32}}>
              This isn't a personal failing. It's predictable biology. Knowing the pattern is the first step to working with it.
            </p>
            <button onClick={onClose} style={{background:"none",border:`1px solid ${phase.color}`,borderRadius:10,padding:"14px 32px",color:"white",fontSize:14,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
              Got it
            </button>
          </div>
        )}
      </div>

      {/* Scene dots */}
      <div style={{display:"flex",gap:6,padding:"24px 0",justifyContent:"center"}}>
        {[0,1,2,3,4].map(i=><div key={i} style={{width:i===scene?20:4,height:4,borderRadius:2,background:i===scene?phase.color:"rgba(255,255,255,.15)",transition:"all .3s"}}/>)}
      </div>
    </div>
  );
}

// ── LOG SCREEN ───────────────────────────────
function LogScreen({ day, cycleNum, cycleLen, logs, onSave, onClose, phase }) {
  const key=`c${cycleNum}_d${day}`;
  const ex=logs[key]||{};
  const [sel,setSel]=useState(ex.symptoms||[]);
  const [intensity,setIntensity]=useState(ex.intensity||{});
  const [note,setNote]=useState(ex.note||"");
  const [saved,setSaved]=useState(false);
  const toggle=id=>setSel(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const save=()=>{onSave(key,{symptoms:sel,intensity,note,day,ts:Date.now()});setSaved(true);setTimeout(onClose,900);};
  return (
    <div style={{position:"fixed",inset:0,zIndex:150,background:"#08060e",display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto",fontFamily:"'DM Sans',sans-serif",color:"white",overflowY:"auto"}}>
      <div style={{padding:"24px 24px 0",display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32}}>
        <div>
          <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:6}}>Daily log · Day {day}</div>
          <div style={{fontSize:20,fontWeight:600}}>How are you today?</div>
        </div>
        <button onClick={onClose} style={{background:"none",border:"1px solid rgba(255,255,255,.12)",borderRadius:8,padding:"6px 14px",color:"rgba(255,255,255,.4)",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>close</button>
      </div>

      <div style={{padding:"0 24px"}}>
        <div style={{height:1,background:"rgba(255,255,255,.06)",marginBottom:28}}/>

        {/* Symptoms — clean list, no icons */}
        <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:16}}>Select all that apply</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:2,background:"rgba(255,255,255,.04)",borderRadius:2,marginBottom:28,overflow:"hidden"}}>
          {SYMPTOMS.map(s=>{
            const on=sel.includes(s.id);
            return (
              <button key={s.id} onClick={()=>toggle(s.id)} style={{background:on?`${phase.color}18`:"transparent",border:"none",padding:"14px 16px",cursor:"pointer",textAlign:"left",transition:"background .15s"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:on?phase.color:"rgba(255,255,255,.15)",transition:"background .15s",flexShrink:0}}/>
                  <span style={{fontSize:13,color:on?"white":"rgba(255,255,255,.5)",fontFamily:"'DM Sans',sans-serif",fontWeight:on?500:400}}>{s.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Intensity */}
        {sel.length>0&&(
          <div style={{marginBottom:28}}>
            <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:16}}>Intensity</div>
            {sel.map(id=>{
              const s=SYMPTOMS.find(x=>x.id===id);
              return (
                <div key={id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,paddingBottom:12,borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                  <span style={{fontSize:13,color:"rgba(255,255,255,.7)"}}>{s.label}</span>
                  <div style={{display:"flex",gap:4}}>
                    {[["Mild","#ffeaa7"],["Medium","#fdcb6e"],["Severe",phase.color]].map(([l,c],vi)=>(
                      <button key={l} onClick={()=>setIntensity(p=>({...p,[id]:vi+1}))} style={{background:intensity[id]===vi+1?c:"rgba(255,255,255,.06)",border:"none",borderRadius:6,padding:"5px 10px",fontSize:11,color:intensity[id]===vi+1?"#111":"rgba(255,255,255,.4)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:intensity[id]===vi+1?600:400,transition:"all .15s"}}>{l}</button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Note */}
        <div style={{marginBottom:28}}>
          <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:12}}>Note (optional)</div>
          <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Anything notable about today..." style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"14px 16px",color:"white",fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",resize:"none",minHeight:80,lineHeight:1.7,colorScheme:"dark"}}/>
        </div>

        <button onClick={save} disabled={sel.length===0} style={{width:"100%",padding:16,background:saved?phase.color:sel.length>0?phase.color:"rgba(255,255,255,.06)",border:"none",borderRadius:8,color:sel.length>0?"white":"rgba(255,255,255,.2)",fontSize:15,fontWeight:600,cursor:sel.length>0?"pointer":"not-allowed",fontFamily:"'DM Sans',sans-serif",transition:"all .2s",opacity:sel.length===0?.5:1,marginBottom:40}}>
          {saved?"Saved.":"Save to map"}
        </button>
      </div>
    </div>
  );
}

// ── MAP ──────────────────────────────────────
function Map({ cycleLen, logs, today, cycleNum, phase: cur, lastPeriod }) {
  const [sel,setSel]=useState(null);
  const days=Array.from({length:cycleLen},(_,i)=>i+1);

  // Calculate actual calendar date for a cycle day
  const cycleStart = lastPeriod ? new Date(lastPeriod) : null;
  const validStart = cycleStart && !isNaN(cycleStart.getTime()) ? cycleStart : null;
  const actualDate = (d) => {
    if(!validStart) return null;
    const dt = new Date(validStart);
    dt.setDate(dt.getDate() + d - 1);
    return dt;
  };
  const fmt = (d) => {
    const dt = actualDate(d);
    if(!dt) return d;
    return dt.toLocaleDateString("en-US",{month:"short",day:"numeric"});
  };
  const isActualToday = (d) => {
    const dt = actualDate(d);
    if(!dt) return false;
    const now = new Date();
    return dt.getDate()===now.getDate() && dt.getMonth()===now.getMonth() && dt.getFullYear()===now.getFullYear();
  };

  // Current cycle logs only (for grid display)
  const curLog=(d)=>logs[`c${cycleNum}_d${d}`];
  const selEntry=sel?curLog(sel):null;
  const selPhase=sel?phaseForDay(sel):null;

  // All entries across all cycles (for prediction)
  const allEntries=Object.entries(logs).map(([k,v])=>{
    const m=k.match(/^c(\d+)_d(\d+)$/);
    if(!m)return null;
    return {...v,cycleNum:parseInt(m[1]),day:parseInt(m[2])};
  }).filter(Boolean);

  const getAlpha=(d)=>{
    const ph=phaseForDay(d);
    const e=curLog(d);
    if(e?.symptoms?.includes("good")) return {color:"#4caf82",a:.5};
    const devilBase=ph.anim?.devil||50;
    const boost=e?e.symptoms.filter(s=>s!=="good").length*8:0;
    return {color:ph.color,a:Math.min(.85,(devilBase+boost)/100*.7+.1)};
  };

  return (
    <div>
      {/* Today summary */}
      <div style={{marginBottom:24,paddingBottom:20,borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:8}}>Today</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,marginBottom:4}}>Day {today} — {cur.label}</div>
        <div style={{fontSize:13,color:cur.color}}>{cur.sub}</div>
      </div>

      {/* Phase bar */}
      <div style={{marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:4}}>
          {[
            {label:"Menstrual", start:1, end:5, color:"#e05252"},
            {label:"Follicular", start:6, end:13, color:"#4caf82"},
            {label:"Ovulation", start:14, end:16, color:"#e09b3d"},
            {label:"Luteal", start:17, end:24, color:"#8b6fd4"},
            {label:"PMS", start:25, end:28, color:"#c94f4f"},
          ].map((ph,i)=>{
            const width=((ph.end-ph.start+1)/28)*100;
            const isActive=today>=ph.start&&today<=ph.end;
            return (
              <div key={i} style={{width:`${width}%`,height:4,background:isActive?ph.color:`${ph.color}33`,borderRadius:i===0?"2px 0 0 2px":i===4?"0 2px 2px 0":0,transition:"all .3s"}}/>
            );
          })}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:0,position:"relative",height:16}}>
          {[
            {label:"Menstrual", start:1, end:5},
            {label:"Follicular", start:6, end:13},
            {label:"Ovulation", start:14, end:16},
            {label:"Luteal", start:17, end:24},
            {label:"PMS", start:25, end:28},
          ].map((ph,i)=>{
            const left=((ph.start-1)/28)*100;
            const width=((ph.end-ph.start+1)/28)*100;
            const isActive=today>=ph.start&&today<=ph.end;
            return (
              <div key={i} style={{position:"absolute",left:`${left}%`,width:`${width}%`,textAlign:"center"}}>
                <div style={{fontSize:8,color:isActive?"rgba(255,255,255,.6)":"rgba(255,255,255,.2)",letterSpacing:".5px",textTransform:"uppercase",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{ph.label}</div>
              </div>
            );
          })}
          {/* Arrow pointing to today */}
          <div style={{position:"absolute",left:`${((today-1)/28)*100}%`,top:-10,transform:"translateX(-50%)",fontSize:8,color:"white"}}>▼</div>
        </div>
      </div>

      {/* Grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:2}}>
        {["M","T","W","T","F","S","S"].map((d,i)=>(
          <div key={i} style={{textAlign:"center",fontSize:10,color:"rgba(255,255,255,.2)",fontFamily:"'DM Mono',monospace",padding:"4px 0"}}>{d}</div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:24}}>
        {days.map(d=>{
          const {color,a}=getAlpha(d);
          const isToday=isActualToday(d);
          const isSel=sel===d;
          const hasLog=!!curLog(d);
          const isOvulation=d>=14&&d<=16;
          const dt=actualDate(d);
          const dayNum=dt?dt.getDate():d;
          const monthLabel=dt&&dt.getDate()===1?dt.toLocaleDateString("en-US",{month:"short"}):null;
          return (
            <button key={d} onClick={()=>setSel(isSel?null:d)} style={{aspectRatio:"1",background:isToday?phase.color:  `rgba(${color==="rgba(76,175,130,0.08)"?"76,175,130":color.replace("#","").match(/.{2}/g)?.map(h=>parseInt(h,16)).join(",")||"200,80,80"},${a})`,border:isToday?"2px solid white":isSel?`1.5px solid ${color}`:"1px solid rgba(255,255,255,.04)",borderRadius:4,cursor:"pointer",position:"relative",transition:"all .15s",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:0}}>
              {monthLabel&&<span style={{fontSize:6,color:isToday?"rgba(255,255,255,.8)":"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".5px",lineHeight:1.2}}>{monthLabel}</span>}
              <span style={{fontSize:isToday?10:9,fontFamily:"'DM Mono',monospace",color:isToday?"white":"rgba(255,255,255,.5)",fontWeight:isToday?700:400,lineHeight:1}}>{dayNum}</span>
              {isOvulation&&!hasLog&&!isToday&&<span style={{fontSize:6,lineHeight:1,color:"rgba(255,255,255,.3)"}}>✦</span>}
              {hasLog&&<div style={{position:"absolute",bottom:2,right:2,width:3,height:3,background:isToday?"white":color,borderRadius:"50%",opacity:.8}}/>}
            </button>
          );
        })}
      </div>

      {/* Selected day */}
      {sel&&(
        <div style={{borderTop:`2px solid ${selPhase.color}`,paddingTop:24,marginBottom:24,animation:"fadeIn .2s ease"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div>
              <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:6}}>Day {sel}</div>
              <div style={{fontSize:20,fontWeight:600,color:"white"}}>{selPhase.label}</div>
              <div style={{fontSize:13,color:selPhase.color,marginTop:2}}>{selPhase.sub}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:10,letterSpacing:"1px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:4}}>Devil intensity</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:28,color:selPhase.color}}>{Math.min(100,(selPhase.anim?.devil||50)+(selEntry?selEntry.symptoms.filter(s=>s!=="good").length*8:0))}%</div>
            </div>
          </div>
          {selEntry?(
            <>
              <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:12}}>Your log</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:selEntry.note?16:0}}>
                {selEntry.symptoms.map(id=>{
                  const s=SYMPTOMS.find(x=>x.id===id);
                  const lv=selEntry.intensity?.[id];
                  return s?(
                    <div key={id} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.08)",borderRadius:20,padding:"5px 12px",fontSize:12,color:"rgba(255,255,255,.8)"}}>
                      {s.label}{lv?<span style={{color:"rgba(255,255,255,.3)",marginLeft:4}}>· {["","Mild","Medium","Severe"][lv]}</span>:null}
                    </div>
                  ):null;
                })}
              </div>
              {selEntry.note&&<p style={{fontSize:13,color:"rgba(255,255,255,.4)",fontStyle:"italic",lineHeight:1.7}}>"{selEntry.note}"</p>}
            </>
          ):(
            <p style={{fontSize:13,color:"rgba(255,255,255,.35)",fontStyle:"italic"}}>
              {sel===today?"Log today to see your data here.":"No log for this day."}
            </p>
          )}
        </div>
      )}

      {/* Phase legend */}
      <div style={{height:1,background:"rgba(255,255,255,.06)",marginBottom:20}}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(255,255,255,.04)"}}>
        {[["Menstrual","Days 1–5","#e05252"],["Follicular","Days 6–13","#4caf82"],["Ovulation","Days 14–16","#e09b3d"],["Luteal","Days 17–24","#8b6fd4"],["PMS Peak","Days 25–28","#c94f4f"]].map(([l,d,c])=>(
          <div key={l} style={{background:"#0d0b14",padding:14}}>
            <div style={{width:16,height:3,background:c,borderRadius:1,marginBottom:8}}/>
            <div style={{fontSize:12,color:"white",fontWeight:500,marginBottom:2}}>{l}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.3)"}}>{d}</div>
          </div>
        ))}
        <div style={{background:"#0d0b14",padding:14}}>
          <div style={{width:16,height:3,background:"#4caf82",borderRadius:1,marginBottom:8}}/>
          <div style={{fontSize:12,color:"white",fontWeight:500,marginBottom:2}}>Feeling good</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,.3)"}}>Your logged green days</div>
        </div>
      </div>

      {/* Patterns & Prediction */}
      {allEntries.length>=4&&(()=>{
        const cycles=[...new Set(allEntries.map(e=>e.cycleNum))];
        const counts={};
        allEntries.forEach(e=>e.symptoms.forEach(s=>{counts[s]=(counts[s]||0)+1;}));
        const top=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,4);

        return (
          <div style={{marginTop:24}}>
            <div style={{height:1,background:"rgba(255,255,255,.06)",marginBottom:20}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:20}}>
              <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)"}}>
                {cycles.length>=2?"Your patterns":"This cycle"}
              </div>
              <div style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:"rgba(255,255,255,.2)"}}>
                {cycles.length} cycle{cycles.length>1?"s":""}
              </div>
            </div>
            {top.map(([id,count])=>{
              const s=SYMPTOMS.find(x=>x.id===id);
              const matching=allEntries.filter(e=>e.symptoms.includes(id));
              const avgDay=Math.round(matching.reduce((a,e)=>a+e.day,0)/matching.length);
              const avgPhase=phaseForDay(avgDay);
              // Predict next occurrence
              const daysUntil=avgDay>today?avgDay-today:cycleLen-today+avgDay;
              return s?(
                <div key={id} style={{paddingBottom:18,marginBottom:18,borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                    <div style={{fontSize:14,color:"white",fontWeight:500}}>{s.label}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"rgba(255,255,255,.25)"}}>{count}×</div>
                  </div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.35)",marginBottom:cycles.length>=2?8:0}}>
                    Usually peaks around Day {avgDay} · {avgPhase.label}
                  </div>
                  {cycles.length>=2&&(
                    <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:20,padding:"4px 10px"}}>
                      <div style={{width:5,height:5,borderRadius:"50%",background:avgPhase.color}}/>
                      <span style={{fontSize:11,color:avgPhase.color}}>
                        {daysUntil<=3?`In ${daysUntil} day${daysUntil===1?"":"s"}`:`Day ${avgDay} next cycle`}
                      </span>
                    </div>
                  )}
                </div>
              ):null;
            })}
            {cycles.length<2&&(
              <div style={{fontSize:12,color:"rgba(255,255,255,.2)",fontStyle:"italic",marginTop:8}}>
                Log for 2+ cycles to unlock predictions.
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}

// ── HORMONE GRAPH ────────────────────────────
const E_CURVE = [10,12,18,26,36,48,58,68,76,82,88,92,96,100,95,80,70,65,62,60,58,55,50,44,36,24,16,10];
const P_CURVE = [5,5,5,5,5,6,7,8,10,12,14,16,18,22,28,36,50,62,72,80,82,80,75,68,55,38,20,8];

function HormoneGraph({ day, cycleLen, phase }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  const W = 340, H = 160;
  const PAD = { t: 24, b: 28, l: 4, r: 4 };
  const iW = W - PAD.l - PAD.r;
  const iH = H - PAD.t - PAD.b;
  const len = Math.min(cycleLen, 28);

  // x/y helpers
  const xOf = i => PAD.l + (i / (len - 1)) * iW;
  const yOf = v => PAD.t + iH - (v / 100) * iH;

  // Build smooth SVG path
  const makePath = curve => curve.slice(0, len).map((v, i) =>
    `${i === 0 ? "M" : "L"}${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`
  ).join(" ");

  // Current day index (0-based)
  const idx = Math.min(day - 1, len - 1);
  const markerX = mounted ? xOf(idx) : xOf(idx);

  // Slope at current day for each curve — (change over ±1 day window)
  const slope = (curve, i) => {
    const prev = curve[Math.max(0, i - 1)];
    const next = curve[Math.min(len - 1, i + 1)];
    return (next - prev) / 2; // per day
  };
  const eSlope = slope(E_CURVE, idx);
  const pSlope = slope(P_CURVE, idx);

  // Highlight the "danger zone" — where estrogen drops fastest (Day 22-26 ish)
  // Find steepest drop region
  const dangerStart = 21, dangerEnd = 25;
  const dzX1 = xOf(dangerStart), dzX2 = xOf(Math.min(dangerEnd, len - 1));

  // Arrow direction string
  const arrowDir = (s) => s > 2 ? "↑" : s < -2 ? "↓" : "→";
  const slopeColor = (s) => s > 2 ? "#4caf82" : s < -3 ? "#e05252" : s < -1 ? "#e09b3d" : "rgba(255,255,255,.5)";
  const slopeLabel = (s) => s > 3 ? "Rising fast" : s > 1 ? "Rising" : s < -3 ? "Dropping fast" : s < -1 ? "Falling" : "Stable";

  // Fill area under curves
  const makeFill = (curve, color) => {
    const pts = curve.slice(0, len).map((v, i) => `${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`).join(" L");
    const base = yOf(0);
    return `M${xOf(0).toFixed(1)},${base} L${pts} L${xOf(len-1).toFixed(1)},${base} Z`;
  };

  const eY = yOf(E_CURVE[idx]);
  const pY = yOf(P_CURVE[idx]);

  return (
    <div style={{ marginBottom: 8 }}>
      {/* Header row */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom: 12 }}>
        <div style={{ fontSize:10, letterSpacing:"2px", textTransform:"uppercase", color:"rgba(255,255,255,.3)" }}>
          Hormone curve — Day {day}
        </div>
        <div style={{ display:"flex", gap:16 }}>
          {[["E","#e07fa0", eSlope],["P","#8b6fd4", pSlope]].map(([l,c,s])=>(
            <div key={l} style={{ display:"flex", alignItems:"center", gap:5 }}>
              <div style={{ width:12, height:2, background:c, borderRadius:1 }}/>
              <span style={{ fontSize:10, color:"rgba(255,255,255,.35)" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG graph */}
      <div style={{ position:"relative", overflow:"hidden" }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display:"block", overflow:"visible" }}>
          {/* Danger zone background — the drop zone */}
          {dangerEnd <= len && (
            <rect
              x={dzX1} y={PAD.t} width={dzX2 - dzX1} height={iH}
              fill="rgba(224,82,82,.07)"
            />
          )}

          {/* Phase zone separators */}
          {[[5,13],[13,16],[16,24],[24,len]].map(([a,b],i)=>(
            <line key={i} x1={xOf(Math.min(a,len-1))} y1={PAD.t} x2={xOf(Math.min(a,len-1))} y2={PAD.t+iH}
              stroke="rgba(255,255,255,.04)" strokeWidth="1"/>
          ))}

          {/* Axis */}
          <line x1={PAD.l} y1={PAD.t+iH} x2={PAD.l+iW} y2={PAD.t+iH} stroke="rgba(255,255,255,.06)" strokeWidth="1"/>

          {/* Fill areas (very faint) */}
          <path d={makeFill(E_CURVE, "#e07fa0")} fill="rgba(224,127,160,.06)"/>
          <path d={makeFill(P_CURVE, "#8b6fd4")} fill="rgba(139,111,212,.06)"/>

          {/* Curves */}
          <path d={makePath(E_CURVE)} fill="none" stroke="#e07fa0" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
          <path d={makePath(P_CURVE)} fill="none" stroke="#8b6fd4" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>

          {/* Vertical "now" line */}
          <line
            x1={markerX} y1={PAD.t}
            x2={markerX} y2={PAD.t + iH}
            stroke="rgba(255,255,255,.18)" strokeWidth="1" strokeDasharray="2,3"
          />

          {/* Estrogen dot */}
          <circle cx={markerX} cy={eY} r="5" fill="#0d0b14" stroke="#e07fa0" strokeWidth="2"/>
          <circle cx={markerX} cy={eY} r="2.5" fill="#e07fa0"/>

          {/* Progesterone dot */}
          <circle cx={markerX} cy={pY} r="5" fill="#0d0b14" stroke="#8b6fd4" strokeWidth="2"/>
          <circle cx={markerX} cy={pY} r="2.5" fill="#8b6fd4"/>

          {/* Animated arrow + "NOW" above the line — anchored above the higher dot */}
          <g style={{ transition: mounted ? "transform .6s cubic-bezier(.34,1.56,.64,1)" : "none" }}>
            {/* "NOW" label */}
            <text x={markerX} y={PAD.t - 8} textAnchor="middle"
              fontSize="8" fill="rgba(255,255,255,.5)" fontFamily="DM Mono,monospace" letterSpacing="1">NOW</text>
            {/* Downward arrow line */}
            <line
              x1={markerX} y1={PAD.t - 2}
              x2={markerX} y2={Math.min(eY, pY) - 8}
              stroke="rgba(255,255,255,.25)" strokeWidth="1"
            />
            {/* Arrowhead */}
            <polygon
              points={`${markerX},${Math.min(eY,pY)-5} ${markerX-3},${Math.min(eY,pY)-11} ${markerX+3},${Math.min(eY,pY)-11}`}
              fill="rgba(255,255,255,.25)"
            />
          </g>

          {/* Day labels on axis */}
          {[1,7,14,21,28].filter(d=>d<=len).map(d=>(
            <text key={d} x={xOf(d-1)} y={H-4} textAnchor="middle"
              fontSize="8" fill="rgba(255,255,255,.2)" fontFamily="DM Mono,monospace">{d}</text>
          ))}
        </svg>

        {/* Danger zone label */}
        {dangerEnd <= len && (
          <div style={{
            position:"absolute",
            left: `${(dzX1 / W) * 100}%`,
            top: 4,
            width: `${((dzX2 - dzX1) / W) * 100}%`,
            textAlign:"center",
            fontSize:8,
            color:"rgba(224,82,82,.6)",
            letterSpacing:"1px",
            textTransform:"uppercase",
            fontFamily:"DM Mono,monospace",
            pointerEvents:"none",
          }}>drop zone</div>
        )}
      </div>

      {/* Current status row — slope insight */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, marginTop:12 }}>
        {[["Estrogen", eSlope, "#e07fa0", E_CURVE[idx]], ["Progesterone", pSlope, "#8b6fd4", P_CURVE[idx]]].map(([label, s, c, val])=>(
          <div key={label} style={{ background:"rgba(255,255,255,.03)", borderRadius:6, padding:"12px 14px", borderLeft:`2px solid ${slopeColor(s)}` }}>
            <div style={{ fontSize:10, color:"rgba(255,255,255,.35)", marginBottom:6 }}>{label}</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:4 }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:18, color:c }}>{val}</span>
              <span style={{ fontSize:11, color:"rgba(255,255,255,.3)" }}>%</span>
            </div>
            <div style={{ fontSize:11, color:slopeColor(s), display:"flex", alignItems:"center", gap:4 }}>
              <span style={{ fontSize:13 }}>{arrowDir(s)}</span>
              <span>{slopeLabel(s)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* The key insight — contextual based on slope */}
      {(eSlope < -3 || pSlope < -3) && (
        <div style={{ marginTop:12, padding:"12px 16px", background:"rgba(224,82,82,.06)", borderRadius:6, borderLeft:"2px solid rgba(224,82,82,.4)" }}>
          <div style={{ fontSize:12, color:"rgba(255,255,255,.5)", lineHeight:1.7 }}>
            <strong style={{ color:"rgba(224,82,82,.9)" }}>The drop is the problem — not the bottom.</strong>{" "}
            Your brain reacts to the speed of the change. Once levels stabilize, even at low values, symptoms tend to ease.
          </div>
        </div>
      )}
      {eSlope >= -1 && E_CURVE[idx] < 25 && (
        <div style={{ marginTop:12, padding:"12px 16px", background:"rgba(76,175,130,.06)", borderRadius:6, borderLeft:"2px solid rgba(76,175,130,.4)" }}>
          <div style={{ fontSize:12, color:"rgba(255,255,255,.5)", lineHeight:1.7 }}>
            <strong style={{ color:"rgba(76,175,130,.9)" }}>You've hit the floor — and adapted.</strong>{" "}
            Estrogen is low but stable now. Your brain has adjusted to the new baseline. Relief is coming.
          </div>
        </div>
      )}
      {eSlope > 2 && (
        <div style={{ marginTop:12, padding:"12px 16px", background:"rgba(76,175,130,.06)", borderRadius:6, borderLeft:"2px solid rgba(76,175,130,.4)" }}>
          <div style={{ fontSize:12, color:"rgba(255,255,255,.5)", lineHeight:1.7 }}>
            <strong style={{ color:"rgba(76,175,130,.9)" }}>Rising.</strong>{" "}
            Estrogen is climbing. Brain chemistry is improving in real time — you'll feel it within a day or two.
          </div>
        </div>
      )}
    </div>
  );
}

// ── PARTNER TEMPLATES ────────────────────────
function PartnerTemplates({ phase, partnerPhone, partnerName, onEdit }) {
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [activePhaseKey, setActivePhaseKey] = useState(phase.key);
  const [sent, setSent] = useState(null);

  const phaseOrder = [
    { key:"menstrual",    label:"Menstrual",    color:"#e05252", days:"Day 1–5"  },
    { key:"follicular",   label:"Follicular",   color:"#4caf82", days:"Day 6–13" },
    { key:"ovulation",    label:"Ovulation",    color:"#e09b3d", days:"Day 14–16"},
    { key:"luteal_early", label:"Early Luteal", color:"#8b6fd4", days:"Day 17–24"},
    { key:"luteal_late",  label:"PMS",          color:"#c94f4f", days:"Day 25–28"},
  ];

  const activePhase = phaseOrder.find(p => p.key === activePhaseKey);
  const templates = PARTNER_TEMPLATES[activePhaseKey] || { tone:"", messages:[] };

  const send = (msg) => {
    const digits = partnerPhone.replace(/\D/g,"");
    const body = encodeURIComponent(msg + "\n\n— via Devils in Me 😈");
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    window.open(isIOS ? `sms:${digits}&body=${body}` : `sms:${digits}?body=${body}`, "_blank");
    setSent(msg);
    setTimeout(() => setSent(null), 3000);
  };

  return (
    <div>
      {/* Partner header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div>
          <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:5}}>Alerting</div>
          <div style={{fontSize:18,fontWeight:600}}>{partnerName||"Your partner"}</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"rgba(255,255,255,.3)",marginTop:2}}>{partnerPhone}</div>
        </div>
        <button onClick={onEdit} style={{background:"none",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,padding:"7px 14px",color:"rgba(255,255,255,.35)",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>edit</button>
      </div>

      <div style={{height:1,background:"rgba(255,255,255,.06)",marginBottom:20}}/>

      {/* Phase tabs — horizontal scroll */}
      <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:12}}>Phase</div>
      <div style={{display:"flex",gap:6,marginBottom:24,overflowX:"auto",paddingBottom:4}}>
        {phaseOrder.map(p=>(
          <button key={p.key} onClick={()=>{setActivePhaseKey(p.key);setSelectedMsg(null);}} style={{
            flexShrink:0,
            background: activePhaseKey===p.key ? `${p.color}22` : "rgba(255,255,255,.04)",
            border: `1px solid ${activePhaseKey===p.key ? p.color+"66" : "rgba(255,255,255,.07)"}`,
            borderRadius:20,padding:"6px 14px",cursor:"pointer",
            fontFamily:"'DM Sans',sans-serif",
            fontSize:12,
            color: activePhaseKey===p.key ? "white" : "rgba(255,255,255,.4)",
            fontWeight: activePhaseKey===p.key ? 600 : 400,
            transition:"all .15s",
            position:"relative",
          }}>
            {p.label}
            {p.key===phase.key&&(
              <span style={{position:"absolute",top:-3,right:-3,width:6,height:6,background:p.color,borderRadius:"50%"}}/>
            )}
          </button>
        ))}
      </div>

      {/* Tone label */}
      <div style={{fontSize:11,color:"rgba(255,255,255,.25)",fontStyle:"italic",marginBottom:16,paddingLeft:2}}>
        {templates.tone}
      </div>

      {/* Message list */}
      <div style={{display:"flex",flexDirection:"column",gap:2}}>
        {templates.messages.map((msg, i) => {
          const isSelected = selectedMsg === msg;
          const isSent = sent === msg;
          return (
            <div key={i}>
              {/* Message row */}
              <button
                onClick={() => setSelectedMsg(isSelected ? null : msg)}
                style={{
                  width:"100%", textAlign:"left",
                  background: isSelected ? `${activePhase.color}12` : "rgba(255,255,255,.02)",
                  border: `1px solid ${isSelected ? activePhase.color+"44" : "rgba(255,255,255,.06)"}`,
                  borderRadius: isSelected ? "8px 8px 0 0" : 8,
                  padding:"16px 18px",
                  cursor:"pointer",
                  transition:"all .15s",
                }}
              >
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
                  <p style={{
                    fontSize:14,
                    color: isSelected ? "white" : "rgba(255,255,255,.6)",
                    lineHeight:1.7,
                    fontFamily:"'DM Sans',sans-serif",
                    margin:0,
                    fontWeight: isSelected ? 500 : 400,
                  }}>"{msg}"</p>
                  <span style={{fontSize:12,color:isSelected?activePhase.color:"rgba(255,255,255,.2)",flexShrink:0,marginTop:2}}>
                    {isSelected?"▲":"▼"}
                  </span>
                </div>
              </button>

              {/* Expanded send button */}
              {isSelected&&(
                <div style={{
                  background:`${activePhase.color}0a`,
                  border:`1px solid ${activePhase.color}33`,
                  borderTop:"none",
                  borderRadius:"0 0 8px 8px",
                  padding:"12px 18px",
                }}>
                  <button
                    onClick={()=>send(msg)}
                    style={{
                      width:"100%",padding:"13px",
                      background: isSent ? "#4caf82" : activePhase.color,
                      border:"none",borderRadius:6,
                      color:"white",fontSize:14,fontWeight:600,
                      cursor:"pointer",fontFamily:"'DM Sans',sans-serif",
                      transition:"all .25s",letterSpacing:".3px",
                    }}>
                    {isSent ? "Opening messages…" : `Send to ${partnerName||"partner"}`}
                  </button>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.2)",textAlign:"center",marginTop:8}}>
                    Opens your messages app pre-filled. You send it.
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Current phase badge */}
      <div style={{marginTop:24,display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:6,height:6,borderRadius:"50%",background:phase.color}}/>
        <span style={{fontSize:11,color:"rgba(255,255,255,.25)"}}>You're currently in {phase.label} phase</span>
      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────
function DevilsInMe() {
  const [screen,setScreen]=useState("home");
  const [lastPeriod,setLastPeriod]=useState(()=>localStorage.getItem("dim_last_period")||"");
  const [cycleLen,setCycleLen]=useState(()=>parseInt(localStorage.getItem("dim_cycle_len")||"28"));
  const [phase,setPhase]=useState(null);
  const [day,setDay]=useState(null);
  const [tab,setTab]=useState("today");
  const [showChart,setShowChart]=useState(false);
  const [showJunk,setShowJunk]=useState(false);
  const [showLog,setShowLog]=useState(false);
  const [copied,setCopied]=useState(false);
  const [partnerPhone,setPartnerPhone]=useState(()=>localStorage.getItem("dim_partner_phone")||"");
  const [partnerName,setPartnerName]=useState(()=>localStorage.getItem("dim_partner_name")||"");
  const [editingPartner,setEditingPartner]=useState(false);
  const [smsSent,setSmsSent]=useState(false);

  const savePartner=(phone,name)=>{
    setPartnerPhone(phone); setPartnerName(name);
    try{localStorage.setItem("dim_partner_phone",phone);localStorage.setItem("dim_partner_name",name);}catch{}
  };

  const sendSMS=()=>{
    if(!partnerPhone||!phase)return;
    const digits=partnerPhone.replace(/\D/g,"");
    const msg=encodeURIComponent(phase.partner+"\n\n— sent via Devils in Me 😈");
    const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent);
    window.open(isIOS?`sms:${digits}&body=${msg}`:`sms:${digits}?body=${msg}`,"_blank");
    setSmsSent(true); setTimeout(()=>setSmsSent(false),3000);
  };
  const [logs,setLogs]=useState(()=>{try{return JSON.parse(localStorage.getItem("dim_logs")||"{}");}catch{return{};}});
  useEffect(()=>{try{localStorage.setItem("dim_logs",JSON.stringify(logs));}catch{}},[logs]);

  useEffect(()=>{
    const s=document.createElement("style");
    s.textContent=`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}
      @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
      @keyframes floatDevil{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-10px) rotate(3deg)}}
      @keyframes shimmer{0%{opacity:.7}50%{opacity:1}100%{opacity:.7}}
      input,textarea{color-scheme:dark;}
      input[type=range]{-webkit-appearance:none;height:2px;border-radius:2px;outline:none;background:rgba(255,255,255,.12);}
      input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:white;cursor:pointer;}
      ::-webkit-scrollbar{width:2px;}
      ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:1px;}
      ::placeholder{color:rgba(255,255,255,.18)!important;}
      button:active{opacity:.8;}
    `;
    document.head.appendChild(s);
    return()=>document.head.removeChild(s);
  },[]);

  const [cycleNum,setCycleNum]=useState(1);

  const go=(lp=lastPeriod,cl=cycleLen)=>{
    if(!lp)return;
    try{localStorage.setItem("dim_last_period",lp);localStorage.setItem("dim_cycle_len",String(cl));}catch{}
    const diff=Math.floor((Date.now()-new Date(lp))/86400000)+1;
    const cn=Math.ceil(diff/cl);
    const d=((diff-1)%cl)+1;
    setCycleNum(cn);setDay(d);setPhase(phaseForDay(d));setScreen("dash");
  };

  // Auto-enter dashboard if saved data exists
  useEffect(()=>{
    const saved=localStorage.getItem("dim_last_period");
    if(saved) go(saved, parseInt(localStorage.getItem("dim_cycle_len")||"28"));
  },[]);

  // Phase change detection — prompt to notify partner
  const [showPartnerPrompt,setShowPartnerPrompt]=useState(false);
  useEffect(()=>{
    if(!phase||!partnerPhone)return;
    const lastNotified=localStorage.getItem("dim_last_notified_phase");
    if(lastNotified!==phase.key){
      setShowPartnerPrompt(true);
    }
  },[phase?.key]);

  const dismissPrompt=(notify)=>{
    localStorage.setItem("dim_last_notified_phase",phase.key);
    setShowPartnerPrompt(false);
    if(notify) setTab("partner");
  };

  const logKey=(cn,d)=>`c${cn}_d${d}`;
  const saveLog=(key,entry)=>setLogs(p=>({...p,[key]:entry}));
  const copy=()=>{navigator.clipboard.writeText(phase.partner).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2500);};
  const todayLogged=day?!!logs[logKey(cycleNum,day)]:false;

  // PMS warning — show 3 days before Day 25
  const pmsStartDay = Math.round(cycleLen * 25/28);
  const daysUntilPMS = day ? pmsStartDay - day : null;
  const showPMSWarning = daysUntilPMS !== null && daysUntilPMS > 0 && daysUntilPMS <= 3;
  const BASE={minHeight:"100vh",background:"#0d0b14",fontFamily:"'DM Sans',sans-serif",maxWidth:430,margin:"0 auto",color:"white",position:"relative"};

  // ── HOME ──
  if(screen==="home") return (
    <div style={{...BASE,display:"flex",flexDirection:"column",padding:"48px 32px",minHeight:"100vh"}}>
      <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <div style={{fontSize:56,lineHeight:1,marginBottom:16,animation:"floatDevil 4s ease-in-out infinite"}}>😈</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:72,fontWeight:700,lineHeight:.95,marginBottom:6,letterSpacing:"-2px"}}>Devils</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:72,fontWeight:700,fontStyle:"italic",lineHeight:.95,color:"rgba(255,255,255,.25)",marginBottom:48,letterSpacing:"-2px"}}>in Me</div>

        <div style={{fontSize:19,color:"rgba(255,255,255,.55)",lineHeight:1.6,marginBottom:48,maxWidth:300}}>
          Understand your hormones before they run your life.
        </div>

        <div style={{height:1,background:"rgba(255,255,255,.07)",marginBottom:36}}/>

        <div style={{marginBottom:28}}>
          <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:12}}>Last period start</div>
          <input type="date" value={lastPeriod} onChange={e=>setLastPeriod(e.target.value)} style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid rgba(255,255,255,.15)",padding:"10px 0",color:"white",fontSize:16,fontFamily:"'DM Mono',monospace",outline:"none"}}/>
        </div>

        <div style={{marginBottom:40}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
            <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)"}}>Cycle length</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:14,color:"rgba(255,255,255,.6)"}}>{cycleLen} days</div>
          </div>
          <input type="range" min="21" max="35" value={cycleLen} onChange={e=>setCycleLen(Number(e.target.value))} style={{width:"100%",accentColor:"white"}}/>
        </div>

        <button onClick={go} disabled={!lastPeriod} style={{background:lastPeriod?"white":"rgba(255,255,255,.08)",border:"none",borderRadius:8,padding:"16px 32px",color:lastPeriod?"#0d0b14":"rgba(255,255,255,.2)",fontSize:15,fontWeight:600,cursor:lastPeriod?"pointer":"not-allowed",fontFamily:"'DM Sans',sans-serif",transition:"all .2s",letterSpacing:".3px"}}>
          Reveal my devils
        </button>
      </div>

      <div style={{fontSize:11,color:"rgba(255,255,255,.2)",paddingTop:24}}>All data stays on your device.</div>
    </div>
  );

  if(!phase)return null;

  const TABS=[
    {id:"today",   label:"Today"},
    {id:"map",     label:"My Map"},
    {id:"partner", label:"Partner"},
  ];

  // ── DASH ──
  return (
    <div style={BASE}>
      {showChart&&(
        <div style={{position:"fixed",inset:0,background:"rgba(13,11,20,.96)",zIndex:100,display:"flex",flexDirection:"column",padding:"32px 24px 48px",overflowY:"auto"}}>
          <button onClick={()=>setShowChart(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,.35)",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",textAlign:"left",padding:0,marginBottom:36}}>← close</button>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:700,lineHeight:1.2,marginBottom:8}}>
            You are here.
          </div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.35)",marginBottom:32}}>
            {phase.label} · Day {day}
          </div>
          <HormoneGraph day={day} cycleLen={cycleLen} phase={phase}/>
          <div style={{marginTop:32,fontSize:13,color:"rgba(255,255,255,.4)",lineHeight:1.8}}>
            {phase.why[0]?.[2]}
          </div>
        </div>
      )}
      {showLog&&<LogScreen day={day} cycleNum={cycleNum} cycleLen={cycleLen} logs={logs} onSave={saveLog} onClose={()=>setShowLog(false)} phase={phase}/>}

      {/* Thin color bar at top */}
      <div style={{height:3,background:phase.color,width:"100%"}}/>

      {/* PMS warning banner */}
      {showPMSWarning&&(
        <div style={{background:"rgba(201,79,79,.12)",borderBottom:"1px solid rgba(201,79,79,.2)",padding:"14px 24px"}}>
          <div style={{fontSize:11,letterSpacing:"2px",textTransform:"uppercase",color:"#c94f4f",marginBottom:6}}>
            ⚠ Devils arriving in {daysUntilPMS} day{daysUntilPMS>1?"s":""}.
          </div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.45)",lineHeight:1.7}}>
            Avoid: difficult conversations · major decisions · sugar crashes
          </div>
        </div>
      )}

      {/* Partner phase-change prompt */}
      {showPartnerPrompt&&!showPMSWarning&&(
        <div style={{background:`${phase.color}12`,borderBottom:`1px solid ${phase.color}30`,padding:"16px 24px"}}>
          <div style={{fontSize:13,color:"rgba(255,255,255,.7)",marginBottom:12,lineHeight:1.5}}>
            You've entered <span style={{color:phase.color,fontWeight:600}}>{phase.label}</span>. Let your partner know?
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>dismissPrompt(true)} style={{background:phase.color,border:"none",borderRadius:6,padding:"9px 18px",color:"white",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
              Send a message
            </button>
            <button onClick={()=>dismissPrompt(false)} style={{background:"none",border:"1px solid rgba(255,255,255,.12)",borderRadius:6,padding:"9px 14px",color:"rgba(255,255,255,.4)",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
              Not now
            </button>
          </div>
        </div>
      )}

      <div style={{padding:"20px 24px 0"}}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:"rgba(255,255,255,.3)",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",padding:0,letterSpacing:".3px"}}>← back</button>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"rgba(255,255,255,.35)"}}>Day {day} / {cycleLen}</div>
        </div>

        {/* Phase title */}
        <div style={{marginBottom:24}}>
          <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:phase.color,marginBottom:8}}>{phase.label} · {phase.sub}</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:38,fontWeight:700,lineHeight:1.1,marginBottom:12}}>{phase.feel}</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.4)"}}>{phase.days} · {phase.mood}</div>
        </div>

        {/* Two action buttons — minimal */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:2,marginBottom:28}}>
          <button onClick={()=>setShowLog(true)} style={{background:todayLogged?`${phase.color}18`:"rgba(255,255,255,.04)",border:`1px solid ${todayLogged?phase.color+"44":"rgba(255,255,255,.07)"}`,borderRadius:8,padding:"14px 16px",cursor:"pointer",textAlign:"left"}}>
            <div style={{fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"rgba(255,255,255,.35)",marginBottom:6}}>{todayLogged?"Logged today":"Log today"}</div>
            <div style={{fontSize:13,color:todayLogged?phase.color:"rgba(255,255,255,.6)",fontWeight:500}}>{todayLogged?"View or edit →":"Build your map →"}</div>
          </button>
          <button onClick={()=>setShowChart(true)} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:8,padding:"14px 16px",cursor:"pointer",textAlign:"left"}}>
            <div style={{fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"rgba(255,255,255,.35)",marginBottom:6}}>Why this?</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.6)",fontWeight:500}}>See the curve →</div>
          </button>
        </div>

        {/* Tab nav */}
        <div style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,.07)",marginBottom:0}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",borderBottom:tab===t.id?`2px solid ${phase.color}`:"2px solid transparent",padding:"10px 0",marginRight:24,color:tab===t.id?"white":"rgba(255,255,255,.3)",fontSize:13,fontWeight:tab===t.id?600:400,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .15s",marginBottom:-1}}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{padding:"28px 24px 100px",animation:"fadeIn .25s ease"}} key={tab}>

        {/* TODAY */}
        {tab==="today"&&<>
          {/* Hormone levels */}
          <div style={{marginBottom:36}}>
            <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:20}}>Hormone levels</div>
            <Bar label="Estrogen" value={phase.hormones.estrogen} color="#e07fa0"/>
            <Bar label="Progesterone" value={phase.hormones.progesterone} color="#8b6fd4"/>
            <Bar label="Serotonin" value={phase.hormones.serotonin} color="rgba(255,255,255,.6)"/>
          </div>

          <div style={{height:1,background:"rgba(255,255,255,.06)",marginBottom:28}}/>

          {/* Decision block */}
          {phase.decisionBlock&&(
            <div style={{marginBottom:28,background:"rgba(201,79,79,.08)",border:"1px solid rgba(201,79,79,.2)",borderRadius:10,padding:"18px 20px"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                <span style={{fontSize:14}}>🚫</span>
                <div style={{fontSize:12,letterSpacing:"1.5px",textTransform:"uppercase",color:"#c94f4f",fontWeight:600}}>Decision Blocker Active</div>
              </div>
              <div style={{fontSize:11,letterSpacing:"1.5px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:10}}>Avoid today:</div>
              {["Big relationship talks","Quitting jobs","Important emails","Sending that text"].map((item,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderTop:i===0?"none":"1px solid rgba(255,255,255,.05)"}}>
                  <div style={{width:3,height:3,borderRadius:"50%",background:"rgba(201,79,79,.6)",flexShrink:0}}/>
                  <span style={{fontSize:13,color:"rgba(255,255,255,.5)"}}>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* One-liner why */}
          <div style={{height:1,background:"rgba(255,255,255,.06)",marginBottom:28}}/>
          <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:16}}>What's happening</div>
          {phase.why.slice(0,2).map(([h,s,r],i)=>(
            <div key={i} style={{paddingBottom:20,marginBottom:20,borderBottom:"1px solid rgba(255,255,255,.05)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
                <div style={{fontSize:14,fontWeight:600,color:"white"}}>{h}</div>
                <div style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:phase.color}}>{s}</div>
              </div>
              <p style={{fontSize:13,color:"rgba(255,255,255,.4)",lineHeight:1.7}}>{r}</p>
            </div>
          ))}

        </>}

        {/* MAP */}
        {tab==="map"&&<Map cycleLen={cycleLen} logs={logs} today={day} cycleNum={cycleNum} phase={phase} lastPeriod={lastPeriod}/>}

        {/* PARTNER */}
        {tab==="partner"&&<>
          {/* If no partner saved yet */}
          {!partnerPhone&&!editingPartner&&(
            <div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,lineHeight:1.2,marginBottom:12}}>
                Partner Alert.
              </div>
              <p style={{fontSize:13,color:"rgba(255,255,255,.4)",lineHeight:1.8,marginBottom:32}}>
                Save your partner's number. One tap sends them the right message for your current phase — automatically written, phase-appropriate, and just the right amount of alarming.
              </p>
              <button onClick={()=>setEditingPartner(true)} style={{background:"white",border:"none",borderRadius:8,padding:"15px 28px",color:"#0d0b14",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                Add partner
              </button>
            </div>
          )}

          {/* Edit / save form */}
          {editingPartner&&(
            <div>
              <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:24}}>
                {partnerPhone?"Edit partner":"Add partner"}
              </div>
              <div style={{marginBottom:24}}>
                <div style={{fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:10}}>Name (optional)</div>
                <input
                  type="text"
                  value={partnerName}
                  onChange={e=>setPartnerName(e.target.value)}
                  placeholder="e.g. David"
                  style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid rgba(255,255,255,.15)",padding:"10px 0",color:"white",fontSize:16,fontFamily:"'DM Sans',sans-serif",outline:"none"}}
                />
              </div>
              <div style={{marginBottom:36}}>
                <div style={{fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:10}}>Phone number</div>
                <input
                  type="tel"
                  value={partnerPhone}
                  onChange={e=>setPartnerPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid rgba(255,255,255,.15)",padding:"10px 0",color:"white",fontSize:18,fontFamily:"'DM Mono',monospace",outline:"none",letterSpacing:"1px"}}
                />
                <div style={{fontSize:11,color:"rgba(255,255,255,.2)",marginTop:8}}>Stays on your device only.</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button
                  onClick={()=>{savePartner(partnerPhone,partnerName);setEditingPartner(false);}}
                  disabled={!partnerPhone}
                  style={{flex:1,background:partnerPhone?"white":"rgba(255,255,255,.08)",border:"none",borderRadius:8,padding:"14px",color:partnerPhone?"#0d0b14":"rgba(255,255,255,.2)",fontSize:14,fontWeight:600,cursor:partnerPhone?"pointer":"not-allowed",fontFamily:"'DM Sans',sans-serif"}}>
                  Save
                </button>
                <button onClick={()=>setEditingPartner(false)} style={{background:"none",border:"1px solid rgba(255,255,255,.12)",borderRadius:8,padding:"14px 20px",color:"rgba(255,255,255,.4)",fontSize:14,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Partner saved — template selector */}
          {partnerPhone&&!editingPartner&&(
            <PartnerTemplates
              phase={phase}
              partnerPhone={partnerPhone}
              partnerName={partnerName}
              onEdit={()=>setEditingPartner(true)}
            />
          )}
        </>}

      </div>


    </div>
  );
}
