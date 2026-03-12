import React, { useState } from "react";
import { SYMPTOMS, phaseForDay } from "../data.js";

const PHASE_LEGEND = [
  { label: "Period", color: "#e05252" },
  { label: "Follicular", color: "#4caf82" },
  { label: "Ovulation", color: "#e09b3d" },
  { label: "Luteal", color: "#8b6fd4" },
  { label: "PMS", color: "#c94f4f" },
];

// Convert hex to rgb string
const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  return [parseInt(h.substring(0,2),16), parseInt(h.substring(2,4),16), parseInt(h.substring(4,6),16)].join(",");
};

export default function CycleMap({ cycleLen, logs, today, cycleNum, phase: cur, lastPeriod }) {
  const [sel, setSel] = useState(null);
  const [viewDate, setViewDate] = useState(() => new Date());

  const cycleStart = lastPeriod ? new Date(lastPeriod + "T00:00:00") : null;

  // Get cycle day for any calendar date (can be negative or > cycleLen for other cycles)
  const getCycleDay = (date) => {
    if (!cycleStart) return null;
    const diff = Math.floor((date.getTime() - cycleStart.getTime()) / 86400000) + 1;
    if (diff < 1) return null; // before cycle started
    return ((diff - 1) % cycleLen) + 1;
  };

  // Get cycle number for a date
  const getCycleNum = (date) => {
    if (!cycleStart) return null;
    const diff = Math.floor((date.getTime() - cycleStart.getTime()) / 86400000) + 1;
    if (diff < 1) return null;
    return Math.ceil(diff / cycleLen);
  };

  const isSameDay = (a, b) => a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  const nowDate = new Date();

  // Is this date in the future?
  const isFuture = (date) => {
    const d = new Date(date); d.setHours(0,0,0,0);
    const n = new Date(); n.setHours(0,0,0,0);
    return d > n;
  };

  // Build calendar grid for viewDate's month
  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const monthName = new Date(viewYear, viewMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startDay = firstOfMonth.getDay(); // 0=Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  // Fill grid: previous month padding + current month + next month padding
  const cells = [];
  // Previous month filler
  for (let i = 0; i < startDay; i++) {
    const d = new Date(viewYear, viewMonth, -startDay + i + 1);
    cells.push({ date: d, inMonth: false });
  }
  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ date: new Date(viewYear, viewMonth, i), inMonth: true });
  }
  // Next month filler to complete last row
  while (cells.length % 7 !== 0) {
    const extra = cells.length - startDay - daysInMonth + 1;
    cells.push({ date: new Date(viewYear, viewMonth + 1, extra), inMonth: false });
  }

  const prevMonth = () => setViewDate(new Date(viewYear, viewMonth - 1, 1));
  const nextMonth = () => setViewDate(new Date(viewYear, viewMonth + 1, 1));

  // Selected day info
  const selCycleDay = sel ? getCycleDay(sel) : null;
  const selCycleNum = sel ? getCycleNum(sel) : null;
  const selPhase = selCycleDay ? phaseForDay(selCycleDay) : null;
  const selLogKey = selCycleDay && selCycleNum ? `c${selCycleNum}_d${selCycleDay}` : null;
  const selEntry = selLogKey ? logs[selLogKey] : null;

  return (
    <div>
      {/* Phase legend */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {PHASE_LEGEND.map(p => (
          <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>{p.label}</span>
          </div>
        ))}
      </div>

      {/* Month header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <button onClick={prevMonth} style={{ background: "none", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, width: 32, height: 32, color: "rgba(255,255,255,.5)", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 700, color: "white" }}>{monthName}</div>
        <button onClick={nextMonth} style={{ background: "none", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, width: 32, height: 32, color: "rgba(255,255,255,.5)", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
      </div>

      {/* Weekday headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} style={{ textAlign: "center", fontSize: 10, color: "rgba(255,255,255,.25)", fontFamily: "'DM Mono',monospace", padding: "6px 0" }}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 20 }}>
        {cells.map((cell, i) => {
          const cd = getCycleDay(cell.date);
          const cn = getCycleNum(cell.date);
          const phase = cd ? phaseForDay(cd) : null;
          const isToday = isSameDay(cell.date, nowDate);
          const isSel = sel && isSameDay(cell.date, sel);
          const logKey = cd && cn ? `c${cn}_d${cd}` : null;
          const hasLog = logKey ? !!logs[logKey] : false;
          const future = isFuture(cell.date);
          const beforeCycle = !cd;

          let bg = "rgba(255,255,255,.03)";
          if (phase && cell.inMonth) {
            const rgb = hexToRgb(phase.color);
            bg = future || beforeCycle ? `rgba(${rgb},.12)` : `rgba(${rgb},.35)`;
          }

          return (
            <button
              key={i}
              onClick={() => cell.inMonth && cd ? setSel(isSel ? null : new Date(cell.date)) : null}
              style={{
                aspectRatio: "1",
                background: bg,
                border: isToday ? "2px solid white" : isSel && phase ? `1.5px solid ${phase.color}` : "1px solid rgba(255,255,255,.04)",
                borderRadius: 6,
                cursor: cell.inMonth && cd ? "pointer" : "default",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all .15s",
                opacity: cell.inMonth ? 1 : 0.25,
              }}
            >
              <span style={{
                fontSize: isToday ? 12 : 11,
                fontFamily: "'DM Mono',monospace",
                color: isToday ? "white" : cell.inMonth ? "rgba(255,255,255,.6)" : "rgba(255,255,255,.3)",
                fontWeight: isToday ? 700 : 400,
              }}>
                {cell.date.getDate()}
              </span>
              {hasLog && (
                <div style={{ position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, background: isToday ? "white" : phase?.color || "white", borderRadius: "50%", opacity: .9 }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom sheet for selected day */}
      {sel && selPhase && (
        <div style={{
          background: "rgba(255,255,255,.04)",
          border: `1px solid ${selPhase.color}33`,
          borderRadius: 12,
          padding: "20px",
          animation: "fadeIn .2s ease",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", marginBottom: 4 }}>
                {sel.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: "white" }}>{selPhase.label}</div>
              <div style={{ fontSize: 12, color: selPhase.color, marginTop: 2 }}>{selPhase.sub} · Day {selCycleDay}</div>
            </div>
            <button onClick={() => setSel(null)} style={{ background: "none", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, width: 28, height: 28, color: "rgba(255,255,255,.4)", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>

          {selEntry ? (
            <>
              <div style={{ height: 1, background: "rgba(255,255,255,.06)", marginBottom: 12 }} />
              <div style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: 10 }}>Logged symptoms</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: selEntry.note ? 12 : 0 }}>
                {selEntry.symptoms.map(id => {
                  const s = SYMPTOMS.find(x => x.id === id);
                  const lv = selEntry.intensity?.[id];
                  return s ? (
                    <div key={id} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: "4px 10px", fontSize: 11, color: "rgba(255,255,255,.8)" }}>
                      {s.label}{lv ? <span style={{ color: "rgba(255,255,255,.3)", marginLeft: 4 }}>· {["", "Mild", "Medium", "Severe"][lv]}</span> : null}
                    </div>
                  ) : null;
                })}
              </div>
              {selEntry.note && <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", fontStyle: "italic", lineHeight: 1.6 }}>"{selEntry.note}"</p>}
            </>
          ) : (
            <>
              <div style={{ height: 1, background: "rgba(255,255,255,.06)", marginBottom: 12 }} />
              <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)", fontStyle: "italic" }}>
                {isSameDay(sel, nowDate) ? "No log yet — tap 'Log today' to add one." : "No log for this day."}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
