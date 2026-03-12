import React, { useState, useEffect } from "react";

const E_CURVE = [10,12,18,26,36,48,58,68,76,82,88,92,96,100,95,80,70,65,62,60,58,55,50,44,36,24,16,10];
const P_CURVE = [5,5,5,5,5,6,7,8,10,12,14,16,18,22,28,36,50,62,72,80,82,80,75,68,55,38,20,8];

export default function HormoneGraph({ day, cycleLen, phase }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  const W = 340, H = 160;
  const PAD = { t: 24, b: 28, l: 4, r: 4 };
  const iW = W - PAD.l - PAD.r;
  const iH = H - PAD.t - PAD.b;
  const len = Math.min(cycleLen, 28);

  const xOf = i => PAD.l + (i / (len - 1)) * iW;
  const yOf = v => PAD.t + iH - (v / 100) * iH;

  const makePath = curve => curve.slice(0, len).map((v, i) =>
    `${i === 0 ? "M" : "L"}${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`
  ).join(" ");

  const idx = Math.min(day - 1, len - 1);
  const markerX = xOf(idx);

  const slope = (curve, i) => {
    const prev = curve[Math.max(0, i - 1)];
    const next = curve[Math.min(len - 1, i + 1)];
    return (next - prev) / 2;
  };
  const eSlope = slope(E_CURVE, idx);
  const pSlope = slope(P_CURVE, idx);

  const dangerStart = 21, dangerEnd = 25;
  const dzX1 = xOf(dangerStart), dzX2 = xOf(Math.min(dangerEnd, len - 1));

  const arrowDir = (s) => s > 2 ? "↑" : s < -2 ? "↓" : "→";
  const slopeColor = (s) => s > 2 ? "#4caf82" : s < -3 ? "#e05252" : s < -1 ? "#e09b3d" : "rgba(255,255,255,.5)";
  const slopeLabel = (s) => s > 3 ? "Rising fast" : s > 1 ? "Rising" : s < -3 ? "Dropping fast" : s < -1 ? "Falling" : "Stable";

  const makeFill = (curve) => {
    const pts = curve.slice(0, len).map((v, i) => `${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`).join(" L");
    const base = yOf(0);
    return `M${xOf(0).toFixed(1)},${base} L${pts} L${xOf(len-1).toFixed(1)},${base} Z`;
  };

  const eY = yOf(E_CURVE[idx]);
  const pY = yOf(P_CURVE[idx]);

  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom: 12 }}>
        <div style={{ fontSize:10, letterSpacing:"2px", textTransform:"uppercase", color:"rgba(255,255,255,.3)" }}>
          Hormone curve — Day {day}
        </div>
        <div style={{ display:"flex", gap:16 }}>
          {[["E","#e07fa0"],["P","#8b6fd4"]].map(([l,c])=>(
            <div key={l} style={{ display:"flex", alignItems:"center", gap:5 }}>
              <div style={{ width:12, height:2, background:c, borderRadius:1 }}/>
              <span style={{ fontSize:10, color:"rgba(255,255,255,.35)" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position:"relative", overflow:"hidden" }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display:"block", overflow:"visible" }}>
          {dangerEnd <= len && (
            <rect x={dzX1} y={PAD.t} width={dzX2 - dzX1} height={iH} fill="rgba(224,82,82,.07)"/>
          )}
          {[[5,13],[13,16],[16,24],[24,len]].map(([a,b],i)=>(
            <line key={i} x1={xOf(Math.min(a,len-1))} y1={PAD.t} x2={xOf(Math.min(a,len-1))} y2={PAD.t+iH}
              stroke="rgba(255,255,255,.04)" strokeWidth="1"/>
          ))}
          <line x1={PAD.l} y1={PAD.t+iH} x2={PAD.l+iW} y2={PAD.t+iH} stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
          <path d={makeFill(E_CURVE)} fill="rgba(224,127,160,.06)"/>
          <path d={makeFill(P_CURVE)} fill="rgba(139,111,212,.06)"/>
          <path d={makePath(E_CURVE)} fill="none" stroke="#e07fa0" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
          <path d={makePath(P_CURVE)} fill="none" stroke="#8b6fd4" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
          <line x1={markerX} y1={PAD.t} x2={markerX} y2={PAD.t + iH} stroke="rgba(255,255,255,.18)" strokeWidth="1" strokeDasharray="2,3"/>
          <circle cx={markerX} cy={eY} r="5" fill="#0d0b14" stroke="#e07fa0" strokeWidth="2"/>
          <circle cx={markerX} cy={eY} r="2.5" fill="#e07fa0"/>
          <circle cx={markerX} cy={pY} r="5" fill="#0d0b14" stroke="#8b6fd4" strokeWidth="2"/>
          <circle cx={markerX} cy={pY} r="2.5" fill="#8b6fd4"/>
          <g style={{ transition: mounted ? "transform .6s cubic-bezier(.34,1.56,.64,1)" : "none" }}>
            <text x={markerX} y={PAD.t - 8} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,.5)" fontFamily="DM Mono,monospace" letterSpacing="1">NOW</text>
            <line x1={markerX} y1={PAD.t - 2} x2={markerX} y2={Math.min(eY, pY) - 8} stroke="rgba(255,255,255,.25)" strokeWidth="1"/>
            <polygon points={`${markerX},${Math.min(eY,pY)-5} ${markerX-3},${Math.min(eY,pY)-11} ${markerX+3},${Math.min(eY,pY)-11}`} fill="rgba(255,255,255,.25)"/>
          </g>
          {[1,7,14,21,28].filter(d=>d<=len).map(d=>(
            <text key={d} x={xOf(d-1)} y={H-4} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,.2)" fontFamily="DM Mono,monospace">{d}</text>
          ))}
        </svg>

        {dangerEnd <= len && (
          <div style={{position:"absolute",left:`${(dzX1/W)*100}%`,top:4,width:`${((dzX2-dzX1)/W)*100}%`,textAlign:"center",fontSize:8,color:"rgba(224,82,82,.6)",letterSpacing:"1px",textTransform:"uppercase",fontFamily:"DM Mono,monospace",pointerEvents:"none"}}>drop zone</div>
        )}
      </div>

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
