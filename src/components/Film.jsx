import React, { useState, useEffect } from "react";
import Bar from "./Bar.jsx";

const FD=[5500,6000,7000,7000,6000], FT=FD.reduce((a,b)=>a+b,0);

export default function Film({ phase, onClose }) {
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
    <div style={{position:"fixed",inset:0,zIndex:200,background:"#08060e",display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto",fontFamily:"'DM Sans',sans-serif",color:"white",padding:"56px 24px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <div style={{fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:4}}>Inside your hormones</div>
          <div style={{fontSize:16,fontWeight:500}}>Scene {scene+1} — {filmLabels[scene]}</div>
        </div>
        <button onClick={onClose} style={{background:"none",border:"1px solid rgba(255,255,255,.12)",borderRadius:8,padding:"6px 14px",color:"rgba(255,255,255,.4)",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>close</button>
      </div>

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

      <div style={{display:"flex",gap:6,padding:"24px 0",justifyContent:"center"}}>
        {[0,1,2,3,4].map(i=><div key={i} style={{width:i===scene?20:4,height:4,borderRadius:2,background:i===scene?phase.color:"rgba(255,255,255,.15)",transition:"all .3s"}}/>)}
      </div>
    </div>
  );
}
