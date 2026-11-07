"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

// El corte de un camino, de arriba hacia abajo. El scroll lo construye al revés:
// primero el suelo, al final la carpeta y la pintura, como en una obra real.
// La textura de cada material está en public/texturas: grano fino arriba, grueso abajo.
const capas = [
  {
    id: "carpeta",
    nombre: "Carpeta asfáltica",
    material: "Agregados y asfalto",
    color: "#3b4148",
    textura: "url(/texturas/carpeta.svg)",
    peso: 1,
    paraQue: "Soporta el tránsito, da una superficie lisa y evita que el agua entre a las capas de abajo.",
    hacemos: "Colocamos y compactamos la mezcla con el equipo y los tiempos que pide cada espesor.",
  },
  {
    id: "base",
    nombre: "Base",
    material: "Material granular o estabilizado",
    color: "var(--gravel)",
    textura: "url(/texturas/base.svg)",
    peso: 1.2,
    paraQue: "Reparte el peso de los vehículos para que no llegue concentrado al suelo.",
    hacemos: "Verificamos la compactación antes de pasar a la capa siguiente.",
  },
  {
    id: "subbase",
    nombre: "Subbase",
    material: "Material granular grueso",
    color: "var(--subbase)",
    textura: "url(/texturas/subbase.svg)",
    peso: 1.35,
    paraQue: "Sirve de transición con el suelo y ayuda a que el agua drene.",
    hacemos: "Nivelamos con las pendientes que el agua necesita para salir.",
  },
  {
    id: "subrasante",
    nombre: "Subrasante",
    material: "Suelo natural compactado",
    color: "var(--earth)",
    textura: "url(/texturas/subrasante.svg)",
    peso: 1.5,
    paraQue: "Es el cimiento de todo el camino: si falla, falla todo lo que está arriba.",
    hacemos: "Estudiamos el suelo antes de proyectar y lo mejoramos si hace falta.",
  },
];

const INICIO = 0.03; // tramo de scroll antes de la primera capa
const TRAMO = 0.21; // tramo de scroll de cada capa
const PINTURA = INICIO + TRAMO * capas.length; // después de las capas, la pintura

const limitar = (v: number) => Math.min(1, Math.max(0, v));
// Orden de obra: la última capa de la lista (el suelo) es la primera que se tiende.
const pasoDeCapa = (i: number) => capas.length - 1 - i;

export default function RoadLayers() {
  const seccion = useRef<HTMLElement>(null);
  const pintura = useRef<HTMLDivElement>(null);
  const rellenos = useRef<(HTMLSpanElement | null)[]>([]);
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);
  const [activa, setActiva] = useState(capas.length - 1);
  const [ligadaAlScroll, setLigadaAlScroll] = useState(false);

  useEffect(() => {
    const el = seccion.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cuadro = 0;
    const actualizar = () => {
      cuadro = 0;
      const r = el.getBoundingClientRect();
      const p = limitar(-r.top / Math.max(1, r.height - window.innerHeight));
      capas.forEach((_, i) => {
        const avance = limitar((p - INICIO - pasoDeCapa(i) * TRAMO) / TRAMO);
        rellenos.current[i]?.style.setProperty("--l", avance.toFixed(3));
      });
      pintura.current?.style.setProperty("--l", limitar((p - PINTURA) / 0.1).toFixed(3));
      const paso = Math.min(capas.length - 1, Math.max(0, Math.floor((p - INICIO) / TRAMO)));
      setActiva(pasoDeCapa(paso));
    };
    const pedir = () => {
      if (!cuadro) cuadro = requestAnimationFrame(actualizar);
    };

    // Se activa recién en el navegador: sin JavaScript el corte se ve completo.
    setLigadaAlScroll(true);
    actualizar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
    };
  }, []);

  // Elegir una capa lleva el scroll al punto de la obra donde esa capa ya está tendida.
  function elegir(i: number) {
    setActiva(i);
    const el = seccion.current;
    if (!el || !ligadaAlScroll) return;
    const r = el.getBoundingClientRect();
    const recorrido = r.height - window.innerHeight;
    const destino = INICIO + TRAMO * (pasoDeCapa(i) + 0.98);
    window.scrollTo({ top: window.scrollY + r.top + recorrido * destino });
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    let next = activa;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      next = (activa + 1) % capas.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      next = (activa - 1 + capas.length) % capas.length;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = capas.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    elegir(next);
    pestanas.current[next]?.focus({ preventScroll: true });
  }

  const capa = capas[activa];

  return (
    <section ref={seccion} id="camino" className="camino" style={{ "--h": 2 } as CSSProperties}>
      <div className="camino-escena">
        <div className="wrap">
          <div className="grilla items-end">
            <h2 className="titulo col-span-12 lg:col-span-8">
              Lo importante de un camino está debajo
            </h2>
            <p className="col-span-12 text-[rgb(243_242_238/0.75)] lg:col-span-4 lg:text-right">
              Capa {pasoDeCapa(activa) + 1} de {capas.length}: {capa.nombre.toLowerCase()}
            </p>
          </div>

          <div
            id="panel-capa"
            role="tabpanel"
            aria-labelledby={`tab-${capa.id}`}
            className="camino-detalle"
          >
            <dl key={capa.id} className="detalle-in grilla">
              <div className="col-span-12 sm:col-span-6 lg:col-span-5">
                <dt>Para qué sirve</dt>
                <dd>{capa.paraQue}</dd>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-5 lg:col-start-8">
                <dt>Qué hacemos</dt>
                <dd>{capa.hacemos}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div
          className="corte"
          role="tablist"
          aria-label="Capas del camino"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
        >
          <div ref={pintura} className="corte-pintura" aria-hidden="true" />
          {capas.map((c, i) => (
            <button
              key={c.id}
              ref={(el) => {
                pestanas.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={i === activa}
              aria-controls="panel-capa"
              tabIndex={i === activa ? 0 : -1}
              onClick={() => elegir(i)}
              className="capa"
              style={{ "--peso": c.peso } as CSSProperties}
            >
              <span
                ref={(el) => {
                  rellenos.current[i] = el;
                }}
                className="capa-relleno"
                aria-hidden="true"
                style={{
                  backgroundColor: c.color,
                  backgroundImage: c.textura,
                }}
              />
              <span className="capa-marca" aria-hidden="true" />
              <span className="wrap capa-fila">
                <span className="capa-nombre">{c.nombre}</span>
                <span className="capa-material">{c.material}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
