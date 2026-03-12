import React, { useState } from "react";
import { SYMPTOMS, phaseForDay } from "../data.js";

export default function CycleMap({ cycleLen, logs, today, cycleNum, phase: cur, lastPeriod }) {
  const [sel,setSel]=useState(null);
  const days=Array.from({length:cycleLen},(_,i)=>i+1);

  const cycleStart = lastPeriod ? new Date(lastPeriod) : null;
  const validStart = cycleStart && !isNaN(cycleStart.getTime()) ? cycleStart : null;
  const actualDate = (d) => {
    if(!validStart) return null;
    const dt = new Date(validStart);
    dt.setDate(dt.getDate() + d - 1);
    return dt;
  };
  const isActualToday = (d) => {
    const dt = actualDate(d);
    if(!dt) return false;
    const now = new Date();
    return dt.getDate()===now.getDate() && dt.getMonth()===now.getMonth() && dt.getFullYear()===now.getFullYear();
  };

  const curLog=(d)=>logs[`c${cycleNum}_d${d}`];
  const selEntry=sel?curLog(sel):null;
  const selPhase=sel?phaseForDay(sel):null;

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
      <div style={{marginBottom:24,paddingBottom:20,borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:8}}>Today</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,marginBottom:4}}>Day {today} — {cur.label}</div>
        <div style={{fontSize:13,color:cur.color}}>{cur.sub}</div>
      </div>

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
          <div style={{position:"absolute",left:`${((today-1)/28)*100}%`,top:-10,transform:"translateX(-50%)",fontSize:8,color:"white"}}>▼</div>
        </div>
      </div>

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
          const phase = cur;
          return (
            <button key={d} onClick={()=>setSel(isSel?null:d)} style={{aspectRatio:"1",background:isToday?phase.color:`rgba(${color==="#4caf82"?"76,175,130":color.replace("#","").match(/.{2}/g)?.map(h=>parseInt(h,16)).join(",")||"200,80,80"},${a})`,border:isToday?"2px solid white":isSel?`1.5px solid ${color}`:"1px solid rgba(255,255,255,.04)",borderRadius:4,cursor:"pointer",position:"relative",transition:"all .15s",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:0}}>
              {monthLabel&&<span style={{fontSize:6,color:isToday?"rgba(255,255,255,.8)":"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".5px",lineHeight:1.2}}>{monthLabel}</span>}
              <span style={{fontSize:isToday?10:9,fontFamily:"'DM Mono',monospace",color:isToday?"white":"rgba(255,255,255,.5)",fontWeight:isToday?700:400,lineHeight:1}}>{dayNum}</span>
              {isOvulation&&!hasLog&&!isToday&&<span style={{fontSize:6,lineHeight:1,color:"rgba(255,255,255,.3)"}}>✦</span>}
              {hasLog&&<div style={{position:"absolute",bottom:2,right:2,width:3,height:3,background:isToday?"white":color,borderRadius:"50%",opacity:.8}}/>}
            </button>
          );
        })}
      </div>

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
