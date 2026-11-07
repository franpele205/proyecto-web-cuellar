// Obras de EJEMPLO para ver cómo queda la web.
// Reemplazalas por las obras reales del emprendimiento (título, tipo y descripción).
// Cuando tengas fotos, se suman acá con un campo `imagen` y se muestran en la tarjeta.

export type TipoObra = "pavimento" | "suelos" | "mantenimiento" | "hormigon";

export const tipos: { id: TipoObra; label: string }[] = [
  { id: "pavimento", label: "Pavimento asfáltico" },
  { id: "hormigon", label: "Hormigón" },
  { id: "suelos", label: "Movimiento de suelos" },
  { id: "mantenimiento", label: "Mantenimiento" },
];

export type Proyecto = {
  slug: string;
  titulo: string;
  tipo: TipoObra;
  descripcion: string;
};

export const proyectos: Proyecto[] = [
  {
    slug: "repavimentacion-avenida",
    titulo: "Repavimentación de avenida",
    tipo: "pavimento",
    descripcion:
      "Fresado de la carpeta vieja y nueva capa asfáltica en toda la calzada.",
  },
  {
    slug: "apertura-calle-loteo",
    titulo: "Apertura de calle en loteo",
    tipo: "suelos",
    descripcion:
      "Nivelación, compactación y base granular para una calle nueva.",
  },
  {
    slug: "bacheo-calles-centricas",
    titulo: "Bacheo de calles céntricas",
    tipo: "mantenimiento",
    descripcion:
      "Reparación de baches y sellado de fisuras con la calle en uso.",
  },
  {
    slug: "playa-maniobras-hormigon",
    titulo: "Playa de maniobras de hormigón",
    tipo: "hormigon",
    descripcion:
      "Losas de hormigón pensadas para camiones y maquinaria pesada.",
  },
  {
    slug: "camino-rural-estabilizado",
    titulo: "Camino rural estabilizado",
    tipo: "suelos",
    descripcion:
      "Mejora del suelo y base estabilizada para poder usar el camino todo el año.",
  },
  {
    slug: "calle-residencial-nueva",
    titulo: "Calle residencial con desagües",
    tipo: "pavimento",
    descripcion:
      "Pavimento nuevo con cordón cuneta y desagües para que el agua escurra bien.",
  },
];
