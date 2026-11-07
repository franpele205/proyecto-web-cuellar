const puntos = [
  {
    titulo: "Presupuesto claro.",
    texto:
      "Antes de empezar te explicamos qué se hace, con qué materiales y cuánto cuesta cada parte.",
  },
  {
    titulo: "Un responsable por obra.",
    texto:
      "Una persona a cargo que conoce la obra y atiende tus consultas de principio a fin.",
  },
  {
    titulo: "Obra ordenada y señalizada.",
    texto:
      "Cuidamos a vecinos y conductores mientras trabajamos, y dejamos todo limpio al terminar.",
  },
];

export default function Approach() {
  return (
    <section id="nosotros" className="nosotros">
      <div className="wrap">
        <h2 className="titulo">Cómo trabajamos</h2>

        {/* Las tres promesas se encienden a medida que entran en pantalla */}
        <p className="promesas">
          {puntos.map((p) => (
            <span key={p.titulo}>{p.titulo}</span>
          ))}
        </p>

        <ul className="grilla nosotros-textos">
          {puntos.map((p) => (
            <li key={p.titulo} className="col-span-12 text-base leading-snug md:col-span-4 lg:text-lg">
              {p.texto}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
