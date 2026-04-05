"use client";

export function JettCursorBtn() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("jett-cursor-toggle"))}
      className="text-[10px] uppercase tracking-widest font-[family-name:var(--font-orbitron)] font-bold text-fd-muted-foreground/50 hover:text-[#ff6900] transition-all duration-200 hover:drop-shadow-[0_0_6px_rgba(255,105,0,0.4)] cursor-pointer"
      title="Toggle JETT Cursor — AGT simplex indicator"
    >
      JETT
    </button>
  );
}
