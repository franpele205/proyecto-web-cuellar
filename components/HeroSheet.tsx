"use client";

import type { PointerEvent, ReactNode } from "react";

// Hoja de plano del inicio. Un foco de luz suave sigue al puntero.
// Es decorativo: el contenido (las etapas) llega como children desde el servidor.
export default function HeroSheet({ children }: { children: ReactNode }) {
  function onPointerMove(e: PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <aside
      aria-label="Etapas de una obra"
      onPointerMove={onPointerMove}
      className="sheet relative border border-paper/20 bg-asphalt-soft/70 p-6 backdrop-blur-sm md:p-8"
    >
      {children}
    </aside>
  );
}
