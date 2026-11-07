"use client";

import type { CSSProperties } from "react";

// Cada servicio se llena con el color de su material al apuntarlo.
const servicios = [
  {
    titulo: "Pavimento asfáltico",
    texto: "Carpetas nuevas y repavimentación de calles, accesos y rutas.",
    fill: "#2a2f35",
    fg: "#f3f2ee",
  },
  {
    titulo: "Pavimento de hormigón",
    texto: "Calzadas rígidas para tránsito pesado, playas y accesos industriales.",
    fill: "#bdbab2",
    fg: "#1d2125",
  },
  {
    titulo: "Movimiento de suelos",
    texto: "Desmonte, relleno, nivelación y compactación para dejar la base lista.",
    fill: "#7b5b3d",
    fg: "#ffffff",
  },
  {
    titulo: "Bacheo y mantenimiento",
    texto: "Reparación de baches y sellado de fisuras antes de que el daño crezca.",
    fill: "#4a5058",
    fg: "#ffffff",
  },
  {
    titulo: "Drenaje y cordón cuneta",
    texto: "Cunetas, alcantarillas y desagües para que el agua no destruya el camino.",
    fill: "#6a7077",
    fg: "#ffffff",
  },
  {
    titulo: "Señalización vial",
    texto: "Demarcación y cartelería para que la obra termine lista para circular.",
    fill: "#f5b400",
    fg: "#1d2125",
  },
];

export default function Services() {
  return (
    <section id="servicios">
      <div className="wrap">
        <div className="grilla items-end">
          <h2 className="titulo col-span-12 lg:col-span-7">Seis servicios de obra vial</h2>
          <p className="bajada col-span-12 lg:col-span-5">
            Trabajamos toda la obra, desde el suelo hasta la pintura final. Elegí
            un servicio y contanos qué necesitás.
          </p>
        </div>

        <ul className="mt-8 border-t border-[var(--line)] lg:mt-10">
          {servicios.map((s) => (
            <li key={s.titulo}>
              <a
                href="#contacto"
                className="servicio"
                style={{ "--fill": s.fill, "--fg": s.fg } as CSSProperties}
                // Deja elegido este servicio en el formulario de consulta
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("cuellar:servicio", { detail: s.titulo }))
                }
              >
                <span className="servicio-nombre">{s.titulo}</span>
                <span className="servicio-texto">{s.texto}</span>
                <svg
                  className="servicio-flecha"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
