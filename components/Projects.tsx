"use client";

import { useState } from "react";
import { proyectos } from "@/data/proyectos";
import ObraArt from "./ObraArt";

export default function Projects() {
  const [elegida, setElegida] = useState(proyectos[0].slug);
  const obra = proyectos.find((p) => p.slug === elegida) ?? proyectos[0];

  return (
    <section id="obras">
      <div className="wrap">
        <div className="grilla items-end">
          <h2 className="titulo col-span-12 lg:col-span-7">Obras que podés pedirnos</h2>
          <p className="bajada col-span-12 lg:col-span-5">
            Seis trabajos habituales. Elegí uno para ver cómo se plantea en el plano.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-2">
          <ul className="order-2 border-t border-[var(--line)] lg:order-1">
            {proyectos.map((p) => (
              <li key={p.slug}>
                <button
                  type="button"
                  className="obra-fila"
                  aria-pressed={p.slug === elegida}
                  onClick={() => setElegida(p.slug)}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setElegida(p.slug);
                  }}
                >
                  <span className="obra-fila-texto">
                    <span className="obra-titulo">{p.titulo}</span>
                    <span className="obra-texto">{p.descripcion}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="order-1 lg:order-2">
            {/* La clave hace que el plano se vuelva a dibujar al cambiar de obra */}
            <div key={obra.slug} className="plano plano-caja h-full max-lg:h-[30svh]">
              <ObraArt slug={obra.slug} />
            </div>
            <p className="mt-3 min-h-[3em] leading-snug lg:hidden" aria-live="polite">
              {obra.descripcion}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
