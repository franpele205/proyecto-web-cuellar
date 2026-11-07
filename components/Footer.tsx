import { site } from "@/lib/site";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#camino", label: "El camino" },
  { href: "#obras", label: "Obras" },
  { href: "#nosotros", label: "Cómo trabajamos" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="closing">
      <div className="wrap">
        <div className="grilla items-end">
          <p className="col-span-12 max-w-md text-xl leading-snug md:col-span-6">
            {site.nombre}. Caminos, calles y rutas, por etapa o la obra completa.
          </p>
          <nav aria-label="Pie de página" className="col-span-12 md:col-span-6">
            <ul className="flex flex-wrap gap-x-6 gap-y-1 md:justify-end">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-draw inline-block py-2 font-medium">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <span className="marca-gigante mt-10 md:mt-16" aria-hidden="true">
          {site.marca}
        </span>

        <p className="mt-8 text-sm text-paper/70">
          © {site.nombre}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
