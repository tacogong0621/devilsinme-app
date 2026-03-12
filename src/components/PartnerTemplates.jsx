import React, { useState } from "react";
import { PARTNER_TEMPLATES } from "../data.js";

export default function PartnerTemplates({ phase, partnerPhone, partnerName, onEdit }) {
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
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div>
          <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:5}}>Alerting</div>
          <div style={{fontSize:18,fontWeight:600}}>{partnerName||"Your partner"}</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"rgba(255,255,255,.3)",marginTop:2}}>{partnerPhone}</div>
        </div>
        <button onClick={onEdit} style={{background:"none",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,padding:"7px 14px",color:"rgba(255,255,255,.35)",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>edit</button>
      </div>

      <div style={{height:1,background:"rgba(255,255,255,.06)",marginBottom:20}}/>

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

      <div style={{fontSize:11,color:"rgba(255,255,255,.25)",fontStyle:"italic",marginBottom:16,paddingLeft:2}}>
        {templates.tone}
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:2}}>
        {templates.messages.map((msg, i) => {
          const isSelected = selectedMsg === msg;
          const isSent = sent === msg;
          return (
            <div key={i}>
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

      <div style={{marginTop:24,display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:6,height:6,borderRadius:"50%",background:phase.color}}/>
        <span style={{fontSize:11,color:"rgba(255,255,255,.25)"}}>You're currently in {phase.label} phase</span>
      </div>
    </div>
  );
}
