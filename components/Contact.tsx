"use client";

import { useEffect, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const obras = [
  "Pavimento asfáltico",
  "Pavimento de hormigón",
  "Movimiento de suelos",
  "Bacheo y mantenimiento",
  "Drenaje y cordón cuneta",
  "Señalización vial",
  "Otra obra",
];

export default function Contact() {
  const [enviado, setEnviado] = useState(false);
  const [tipo, setTipo] = useState("");

  // Si llega desde un servicio de la lista, ese servicio queda elegido.
  useEffect(() => {
    const onServicio = (e: Event) => setTipo((e as CustomEvent<string>).detail);
    window.addEventListener("cuellar:servicio", onServicio);
    return () => window.removeEventListener("cuellar:servicio", onServicio);
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: conectar el envío real (Server Action de Next.js + Resend, o Formspree).
    // Por ahora solo muestra la confirmación para poder ver el flujo completo.
    setEnviado(true);
  }

  return (
    <section id="contacto" className="contacto">
      <div className="wrap grilla">
        <div className="contacto-izq col-span-12 lg:col-span-6">
          <h2 className="titulo">Contanos qué obra necesitás</h2>
          <p className="bajada mt-6">
            Escribinos qué querés hacer y dónde. Te respondemos para coordinar una
            visita o pasarte un presupuesto.
          </p>

          {(site.email || site.whatsapp || site.zona) && (
            <ul className="mt-8 space-y-2 text-lg">
              {site.whatsapp && (
                <li>
                  <a className="link-draw font-medium" href={`https://wa.me/${site.whatsapp}`}>
                    Escribir por WhatsApp
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  <a className="link-draw font-medium" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </li>
              )}
              {site.zona && <li className="text-muted">{site.zona}</li>}
            </ul>
          )}

          {/* Lo que hace falta para responder bien, dicho en grande */}
          <p className="contacto-datos">
            <span>Qué obra.</span>
            <span>Dónde.</span>
            <span>Para cuándo.</span>
          </p>
        </div>

        <div className="col-span-12 mt-6 lg:col-span-6 lg:mt-0">
          {enviado ? (
            <div role="status" className="detalle-in">
              <h3 className="text-3xl font-medium leading-tight">Recibimos tu consulta</h3>
              <p className="bajada mt-3">
                Te vamos a responder para coordinar los próximos pasos.
              </p>
              <button
                type="button"
                className="btn btn-secondary mt-6"
                onClick={() => setEnviado(false)}
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="contacto-form grid gap-6 sm:grid-cols-2">
              <label className="campo">
                <span>Nombre</span>
                <input name="nombre" type="text" required autoComplete="name" />
                <span className="campo-linea" aria-hidden="true" />
              </label>
              <label className="campo">
                <span>Teléfono o email</span>
                <input name="contacto" type="text" required autoComplete="email" />
                <span className="campo-linea" aria-hidden="true" />
              </label>
              <label className="campo sm:col-span-2">
                <span>Tipo de obra</span>
                <select
                  name="tipo"
                  required
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="" disabled>
                    Elegí una opción
                  </option>
                  {obras.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <span className="campo-linea" aria-hidden="true" />
              </label>
              <label className="campo campo-crece sm:col-span-2">
                <span>Contanos de la obra</span>
                <textarea
                  name="mensaje"
                  rows={5}
                  required
                  placeholder="Qué hay que hacer, dónde y para cuándo."
                />
                <span className="campo-linea" aria-hidden="true" />
              </label>
              <div className="sm:col-span-2">
                <button type="submit" className="btn btn-primary w-full sm:w-auto">
                  Pedir presupuesto
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
