"use client";

import { useEffect, useState, type CSSProperties } from "react";

const palabras = ["caminos", "calles", "rutas"];

const hechos = [
  { dato: "Servicios", valor: "6, del suelo a la pintura" },
  { dato: "Contratación", valor: "Por etapa o la obra completa" },
  { dato: "Para", valor: "Empresas, municipios y vecinos" },
  { dato: "Primer paso", valor: "Visita o presupuesto" },
];

const curvas = [
  "M-40 640C200 560 360 700 620 620S1000 520 1480 600",
  "M-40 580C220 500 380 640 640 560S1010 460 1480 540",
  "M-40 520C240 440 400 580 660 500S1020 400 1480 480",
  "M-40 460C260 380 420 520 680 440S1030 340 1480 420",
  "M-40 400C280 320 440 460 700 380S1040 280 1480 360",
  "M-40 340C300 260 460 400 720 320S1050 220 1480 300",
];

// Fondo: grilla de plano y curvas de nivel que se dibujan al cargar.
function PlanoDeFondo() {
  return (
    <svg aria-hidden="true" className="hero-plano" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="plano-grilla" width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M72 0H0V72" fill="none" stroke="#f3f2ee" strokeOpacity="0.07" />
        </pattern>
      </defs>
      <rect width="1440" height="900" fill="url(#plano-grilla)" />
      <g fill="none" stroke="#f3f2ee" strokeOpacity="0.16" strokeWidth="1.5">
        {curvas.map((d, i) => (
          <path key={d} d={d} pathLength={1} className="dibuja" style={{ "--i": i } as CSSProperties} />
        ))}
      </g>
    </svg>
  );
}

export default function Hero() {
  const [indice, setIndice] = useState(0);
  const [pausada, setPausada] = useState(false);

  useEffect(() => {
    if (pausada || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndice((i) => (i + 1) % palabras.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [pausada]);

  return (
    <section id="inicio" className="hero" style={{ "--h": 1 } as CSSProperties}>
      <PlanoDeFondo />
      <div className="wrap">
        <h1 className="hero-h1">
          <span className="sr-only-text">Constructora de caminos, calles y rutas</span>
          <span aria-hidden="true">
            <span className="hero-linea">
              <span>Constructora de</span>
            </span>
            <span className="hero-linea">
              <span style={{ "--n": 1 } as CSSProperties}>
                <span className="palabra">
                  {palabras.map((p, i) => (
                    <span
                      key={p}
                      data-estado={
                        i === indice
                          ? "activa"
                          : i === (indice + palabras.length - 1) % palabras.length
                            ? "salida"
                            : "espera"
                      }
                    >
                      {p}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          </span>
        </h1>

        <div className="grilla hero-pie hero-entra">
          <div className="col-span-6">
            <p className="bajada">
              Hacemos movimiento de suelos, pavimento y mantenimiento, desde el
              estudio de la obra hasta la señalización final.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#contacto" className="btn btn-primary">
                Pedir presupuesto
              </a>
              <a href="#servicios" className="btn btn-secondary">
                Ver servicios
              </a>
            </div>
          </div>
          <dl className="hechos col-span-5 col-start-8">
            {hechos.map((h) => (
              <div key={h.dato}>
                <dt>{h.dato}</dt>
                <dd>{h.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="ruta" data-pausada={pausada}>
        <div className="ruta-linea" aria-hidden="true" />
        <button
          type="button"
          className="ruta-pausa"
          aria-pressed={pausada}
          aria-label={pausada ? "Reanudar la animación" : "Pausar la animación"}
          onClick={() => setPausada((v) => !v)}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="currentColor">
            {pausada ? <path d="M2.5 1l8 5-8 5z" /> : <path d="M2 1h3v10H2zM7 1h3v10H7z" />}
          </svg>
        </button>
      </div>
    </section>
  );
}
