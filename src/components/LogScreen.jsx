import React, { useState } from "react";
import { SYMPTOMS } from "../data.js";

export default function LogScreen({ day, cycleNum, cycleLen, logs, onSave, onClose, phase }) {
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
