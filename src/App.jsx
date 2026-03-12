import React, { useState, useEffect } from "react";
import { signInWithRedirect, signInWithPopup, getRedirectResult, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { auth, db, googleProvider } from "./firebase.js";
import { phaseForDay } from "./data.js";
import Film from "./components/Film.jsx";
import LogScreen from "./components/LogScreen.jsx";
import CycleMap from "./components/CycleMap.jsx";
import HormoneGraph from "./components/HormoneGraph.jsx";
import PartnerTemplates from "./components/PartnerTemplates.jsx";

export default function App() {
  const [screen,setScreen]=useState("home");
  const [lastPeriod,setLastPeriod]=useState("");
  const [cycleLen,setCycleLen]=useState(28);
  const [phase,setPhase]=useState(null);
  const [day,setDay]=useState(null);
  const [tab,setTab]=useState("today");
  const [showChart,setShowChart]=useState(false);
  const [showJunk,setShowJunk]=useState(false);
  const [showLog,setShowLog]=useState(false);
  const [copied,setCopied]=useState(false);
  const [partnerPhone,setPartnerPhone]=useState("");
  const [partnerName,setPartnerName]=useState("");
  const [editingPartner,setEditingPartner]=useState(false);
  const [smsSent,setSmsSent]=useState(false);
  const [user,setUser]=useState(null);
  const [authLoading,setAuthLoading]=useState(true);
  const [logs,setLogs]=useState({});
  const [lastNotifiedPhase,setLastNotifiedPhase]=useState("");

  // ── AUTH ──
  useEffect(()=>{
    // Handle redirect result first, then listen for state changes
    getRedirectResult(auth).catch(e=>console.error("Redirect error:",e)).finally(()=>{
      const unsub=onAuthStateChanged(auth, async(u)=>{
        setUser(u);
        if(u){
          try{
            const profileRef=doc(db,"users",u.uid,"profile","main");
            const profileDoc=await getDoc(profileRef);
            if(profileDoc.exists()){
              const d=profileDoc.data();
              if(d.lastPeriod) setLastPeriod(d.lastPeriod);
              if(d.cycleLen) setCycleLen(d.cycleLen);
              if(d.partnerPhone) setPartnerPhone(d.partnerPhone);
              if(d.partnerName) setPartnerName(d.partnerName);
              if(d.lastNotifiedPhase) setLastNotifiedPhase(d.lastNotifiedPhase);
            }
            const logsSnap=await getDocs(collection(db,"users",u.uid,"logs"));
            const logsData={};
            logsSnap.forEach(d=>{logsData[d.id]=d.data();});
            setLogs(logsData);
          }catch(e){console.error("Firestore load error:",e);}
        } else {
          setLastPeriod(""); setCycleLen(28); setPartnerPhone(""); setPartnerName("");
          setLogs({}); setPhase(null); setDay(null); setScreen("home");
          setLastNotifiedPhase("");
        }
        setAuthLoading(false);
      });
      return unsub;
    });
  },[]);

  const signInWithGoogle=()=>isMobile ? signInWithPopup(auth, googleProvider).catch(e=>console.error("Popup error:",e)) : signInWithRedirect(auth, googleProvider);
  const handleSignOut=()=>firebaseSignOut(auth);

  // ── FIRESTORE HELPERS ──
  const saveProfile=(fields)=>{
    if(!user) return;
    setDoc(doc(db,"users",user.uid,"profile","main"),fields,{merge:true}).catch(e=>console.error("Save error:",e));
  };

  const savePartner=(phone,name)=>{
    setPartnerPhone(phone); setPartnerName(name);
    saveProfile({partnerPhone:phone,partnerName:name});
  };

  const sendSMS=()=>{
    if(!partnerPhone||!phase)return;
    const digits=partnerPhone.replace(/\D/g,"");
    const msg=encodeURIComponent(phase.partner+"\n\n— sent via Devils in Me 😈");
    const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent);
    window.open(isIOS?`sms:${digits}&body=${msg}`:`sms:${digits}?body=${msg}`,"_blank");
    setSmsSent(true); setTimeout(()=>setSmsSent(false),3000);
  };

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
    saveProfile({lastPeriod:lp,cycleLen:cl});
    const diff=Math.floor((Date.now()-new Date(lp))/86400000)+1;
    const cn=Math.ceil(diff/cl);
    const d=((diff-1)%cl)+1;
    setCycleNum(cn);setDay(d);setPhase(phaseForDay(d));setScreen("dash");
  };

  // Auto-enter dashboard after auth loads
  useEffect(()=>{
    if(authLoading) return;
    if(lastPeriod) go(lastPeriod, cycleLen);
  },[authLoading]);

  // Phase change detection
  const [showPartnerPrompt,setShowPartnerPrompt]=useState(false);
  useEffect(()=>{
    if(!phase||!partnerPhone)return;
    if(lastNotifiedPhase!==phase.key){
      setShowPartnerPrompt(true);
    }
  },[phase?.key]);

  const dismissPrompt=(notify)=>{
    setLastNotifiedPhase(phase.key);
    saveProfile({lastNotifiedPhase:phase.key});
    setShowPartnerPrompt(false);
    if(notify) setTab("partner");
  };

  const logKey=(cn,d)=>`c${cn}_d${d}`;
  const saveLog=(key,entry)=>{
    setLogs(p=>({...p,[key]:entry}));
    if(user) setDoc(doc(db,"users",user.uid,"logs",key),entry).catch(e=>console.error("Log save error:",e));
  };
  const copy=()=>{navigator.clipboard.writeText(phase.partner).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2500);};
  const todayLogged=day?!!logs[logKey(cycleNum,day)]:false;

  const pmsStartDay = Math.round(cycleLen * 25/28);
  const daysUntilPMS = day ? pmsStartDay - day : null;
  const showPMSWarning = daysUntilPMS !== null && daysUntilPMS > 0 && daysUntilPMS <= 3;
  const BASE={minHeight:"100vh",background:"#0d0b14",fontFamily:"'DM Sans',sans-serif",maxWidth:430,margin:"0 auto",color:"white",position:"relative"};

  // ── LOADING ──
  if(authLoading) return (
    <div style={{...BASE,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
      <div style={{fontSize:56,animation:"floatDevil 4s ease-in-out infinite"}}>😈</div>
    </div>
  );

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

        {!user ? (
          <>
            <div style={{height:1,background:"rgba(255,255,255,.07)",marginBottom:36}}/>
            <button onClick={signInWithGoogle} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,background:"white",border:"none",borderRadius:8,padding:"16px 32px",color:"#0d0b14",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .2s",letterSpacing:".3px",width:"100%"}}>
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Sign in with Google
            </button>
          </>
        ) : (
          <>
            <div style={{height:1,background:"rgba(255,255,255,.07)",marginBottom:36}}/>

            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:28}}>
              {user.photoURL && <img src={user.photoURL} style={{width:28,height:28,borderRadius:"50%"}} referrerPolicy="no-referrer"/>}
              <span style={{fontSize:13,color:"rgba(255,255,255,.5)"}}>{user.displayName || user.email}</span>
              <button onClick={handleSignOut} style={{marginLeft:"auto",background:"none",border:"1px solid rgba(255,255,255,.12)",borderRadius:6,padding:"6px 14px",color:"rgba(255,255,255,.35)",fontSize:11,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Sign out</button>
            </div>

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

            <button onClick={()=>go()} disabled={!lastPeriod} style={{background:lastPeriod?"white":"rgba(255,255,255,.08)",border:"none",borderRadius:8,padding:"16px 32px",color:lastPeriod?"#0d0b14":"rgba(255,255,255,.2)",fontSize:15,fontWeight:600,cursor:lastPeriod?"pointer":"not-allowed",fontFamily:"'DM Sans',sans-serif",transition:"all .2s",letterSpacing:".3px"}}>
              Reveal my devils
            </button>
          </>
        )}
      </div>

      <div style={{fontSize:11,color:"rgba(255,255,255,.2)",paddingTop:24}}>Synced securely with your Google account.</div>
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
        <div style={{position:"fixed",inset:0,background:"rgba(13,11,20,.96)",zIndex:100,display:"flex",flexDirection:"column",padding:"56px 24px 48px",overflowY:"auto"}}>
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

      <div style={{height:3,background:phase.color,width:"100%"}}/>

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

      <div style={{padding:"52px 24px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:"rgba(255,255,255,.3)",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",padding:0,letterSpacing:".3px"}}>← back</button>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"rgba(255,255,255,.35)"}}>Day {day} / {cycleLen}</div>
        </div>

        <div style={{marginBottom:24}}>
          <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:phase.color,marginBottom:8}}>{phase.label} · {phase.sub}</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:38,fontWeight:700,lineHeight:1.1,marginBottom:12}}>{phase.feel}</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.4)"}}>{phase.days} · {phase.mood}</div>
        </div>

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

        <div style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,.07)",marginBottom:0}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",borderBottom:tab===t.id?`2px solid ${phase.color}`:"2px solid transparent",padding:"10px 0",marginRight:24,color:tab===t.id?"white":"rgba(255,255,255,.3)",fontSize:13,fontWeight:tab===t.id?600:400,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .15s",marginBottom:-1}}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"28px 24px 100px",animation:"fadeIn .25s ease"}} key={tab}>

        {tab==="today"&&<>
          <HormoneGraph day={day} cycleLen={cycleLen} phase={phase}/>

          <div style={{height:1,background:"rgba(255,255,255,.06)",margin:"28px 0"}}/>

          <div style={{marginBottom:28}}>
            <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:16}}>How you feel</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,lineHeight:1.2,marginBottom:10}}>{phase.feel}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.4)"}}>{phase.mood}</div>
          </div>

          <div style={{height:1,background:"rgba(255,255,255,.06)",marginBottom:28}}/>

          {phase.decisionBlock?(
            <div style={{background:"rgba(201,79,79,.08)",border:"1px solid rgba(201,79,79,.2)",borderRadius:10,padding:"18px 20px"}}>
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
          ):(
            <div style={{background:`${phase.color}0a`,border:`1px solid ${phase.color}22`,borderRadius:10,padding:"18px 20px"}}>
              <div style={{fontSize:12,letterSpacing:"1.5px",textTransform:"uppercase",color:phase.color,fontWeight:600,marginBottom:14}}>This phase is good for</div>
              {phase.survival.slice(0,3).map(([title,desc],i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"9px 0",borderTop:i===0?"none":`1px solid ${phase.color}15`}}>
                  <div style={{width:4,height:4,borderRadius:"50%",background:phase.color,flexShrink:0,marginTop:6}}/>
                  <div>
                    <div style={{fontSize:14,color:"white",fontWeight:500,marginBottom:2}}>{title}</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,.4)",lineHeight:1.5}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>}

        {tab==="map"&&<CycleMap cycleLen={cycleLen} logs={logs} today={day} cycleNum={cycleNum} phase={phase} lastPeriod={lastPeriod}/>}

        {tab==="partner"&&<>
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

          {editingPartner&&(
            <div>
              <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:24}}>
                {partnerPhone?"Edit partner":"Add partner"}
              </div>
              <div style={{marginBottom:24}}>
                <div style={{fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:10}}>Name (optional)</div>
                <input type="text" value={partnerName} onChange={e=>setPartnerName(e.target.value)} placeholder="e.g. David" style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid rgba(255,255,255,.15)",padding:"10px 0",color:"white",fontSize:16,fontFamily:"'DM Sans',sans-serif",outline:"none"}}/>
              </div>
              <div style={{marginBottom:36}}>
                <div style={{fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:10}}>Phone number</div>
                <input type="tel" value={partnerPhone} onChange={e=>setPartnerPhone(e.target.value)} placeholder="010-0000-0000" style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid rgba(255,255,255,.15)",padding:"10px 0",color:"white",fontSize:18,fontFamily:"'DM Mono',monospace",outline:"none",letterSpacing:"1px"}}/>
                <div style={{fontSize:11,color:"rgba(255,255,255,.2)",marginTop:8}}>Synced to your account.</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>{savePartner(partnerPhone,partnerName);setEditingPartner(false);}} disabled={!partnerPhone} style={{flex:1,background:partnerPhone?"white":"rgba(255,255,255,.08)",border:"none",borderRadius:8,padding:"14px",color:partnerPhone?"#0d0b14":"rgba(255,255,255,.2)",fontSize:14,fontWeight:600,cursor:partnerPhone?"pointer":"not-allowed",fontFamily:"'DM Sans',sans-serif"}}>
                  Save
                </button>
                <button onClick={()=>setEditingPartner(false)} style={{background:"none",border:"1px solid rgba(255,255,255,.12)",borderRadius:8,padding:"14px 20px",color:"rgba(255,255,255,.4)",fontSize:14,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {partnerPhone&&!editingPartner&&(
            <PartnerTemplates phase={phase} partnerPhone={partnerPhone} partnerName={partnerName} onEdit={()=>setEditingPartner(true)}/>
          )}
        </>}

      </div>
    </div>
  );
}
