"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#camino", label: "El camino" },
  { href: "#obras", label: "Obras" },
  { href: "#nosotros", label: "Cómo trabajamos" },
];

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="4" fill="#1d2125" />
      <path d="M16 4v6M16 13v6M16 22v6" stroke="#f5b400" strokeWidth="3" fill="none" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Cerrar el menú con Escape y devolver el foco al botón que lo abrió
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav">
      <div className="wrap">
        <a
          href="#inicio"
          className="flex items-center gap-2.5"
          aria-label={`${site.nombre}, ir al inicio`}
        >
          <LogoMark />
          <span className="text-xl font-medium tracking-tight">{site.marca}</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="link-draw whitespace-nowrap text-[15px] font-medium">
              {l.label}
            </a>
          ))}
          <a href="#contacto" className="btn btn-primary">
            Pedir presupuesto
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a href="#contacto" className="btn btn-primary nav-pedir">
            Pedir presupuesto
          </a>
          <button
            ref={menuButton}
            type="button"
            className="btn btn-secondary !w-11 !min-h-11 !p-0"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              {open ? (
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Menú móvil" className="menu-movil lg:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.href} className="border-b border-[var(--line)]">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-3xl font-medium tracking-tight"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-6 w-full"
          >
            Pedir presupuesto
          </a>
        </nav>
      )}

      {/* Línea de pintura: avanza a medida que bajás por la página */}
      <span aria-hidden="true" className="scroll-progress" />
    </header>
  );
}
