import React from "react";

export default function Bar({ label, value, color }) {
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
