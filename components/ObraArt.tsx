import type { CSSProperties } from "react";

// Planos vistos desde arriba, uno por obra. Se dibujan cada vez que se elige la obra.
// Sirven hasta que haya fotos reales de cada trabajo.
const PINTURA = "#f5b400";
const LINEA = "#f3f2ee";
const CALZADA = "#3b4148";

const orden = (i: number) => ({ "--i": i }) as CSSProperties;

// Línea que se dibuja de punta a punta
function Traza({ d, i = 0, color = LINEA, ancho = 2 }: { d: string; i?: number; color?: string; ancho?: number }) {
  return (
    <path
      d={d}
      pathLength={1}
      className="dibuja"
      style={orden(i)}
      fill="none"
      stroke={color}
      strokeWidth={ancho}
    />
  );
}

function Avenida() {
  return (
    <>
      <rect y="50" width="640" height="460" fill={CALZADA} />
      <Traza d="M0 50H640M0 510H640" />
      <Traza d="M0 274H640M0 286H640" i={2} />
      {/* El tramo ya repavimentado avanza de izquierda a derecha */}
      <rect x="0" y="52" width="430" height="220" fill="#23272c" className="barre" style={orden(3)} />
      <rect x="0" y="288" width="430" height="220" fill="#23272c" className="barre" style={orden(4)} />
      <g className="barre" style={orden(5)}>
        <path d="M0 162H430M0 398H430" stroke={PINTURA} strokeWidth="5" strokeDasharray="40 30" />
      </g>
      <Traza d="M430 38V522" i={6} color={PINTURA} ancho={3} />
    </>
  );
}

function Loteo() {
  const lotes = [
    [40, 60], [190, 60], [340, 60], [490, 60],
    [40, 380], [190, 380], [340, 380], [490, 380],
  ];
  return (
    <>
      {lotes.map(([x, y], i) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="120" height="120" fill="none" stroke={LINEA} strokeOpacity="0.5" strokeWidth="1.5" className="aparece" style={orden(i)} />
      ))}
      <rect y="220" width="640" height="120" fill={CALZADA} className="barre" style={orden(6)} />
      <Traza d="M0 220H640M0 340H640" i={7} color={PINTURA} ancho={3} />
    </>
  );
}

function Bacheo() {
  const baches = [
    [80, 190, 92, 44], [260, 300, 120, 52], [430, 196, 80, 40], [150, 332, 64, 36], [520, 322, 72, 44],
  ];
  return (
    <>
      <rect y="150" width="640" height="260" fill={CALZADA} />
      <Traza d="M0 150H640M0 410H640" />
      <g className="barre" style={orden(1)}>
        <path d="M0 280H640" stroke={PINTURA} strokeWidth="5" strokeDasharray="40 30" />
      </g>
      {baches.map(([x, y, w, h], i) => (
        <rect key={x} x={x} y={y} width={w} height={h} fill="#20242a" stroke={PINTURA} strokeWidth="2" className="aparece" style={orden(i + 3)} />
      ))}
    </>
  );
}

function Playa() {
  return (
    <>
      <rect x="40" y="40" width="560" height="480" fill="#bdbab2" className="aparece" />
      {[120, 200, 280, 360, 440].map((y, i) => (
        <Traza key={y} d={`M40 ${y}H600`} i={i + 1} color="#6a7077" />
      ))}
      {[180, 320, 460].map((x, i) => (
        <Traza key={x} d={`M${x} 40V520`} i={i + 2} color="#6a7077" />
      ))}
      <Traza d="M40 40H600V520H40Z" i={5} color={PINTURA} ancho={5} />
    </>
  );
}

function Rural() {
  return (
    <>
      <rect width="640" height="560" fill="#5a4129" className="aparece" />
      {[80, 170, 260, 350, 440, 530].map((y, i) => (
        <Traza
          key={y}
          d={`M-10 ${y}C120 ${y - 50} 240 ${y + 50} 360 ${y - 20}S560 ${y - 40} 650 ${y}`}
          i={i}
          color="#a07c58"
        />
      ))}
      <Traza d="M90 560C120 420 300 420 330 290S520 140 560 0" i={5} color="#d6c7ae" ancho={34} />
      <Traza d="M90 560C120 420 300 420 330 290S520 140 560 0" i={8} color={PINTURA} ancho={3} />
    </>
  );
}

function Residencial() {
  const flechas = [90, 250, 410, 570];
  return (
    <>
      <rect y="170" width="640" height="220" fill={CALZADA} />
      <Traza d="M0 170H640M0 390H640" ancho={8} />
      <g className="barre" style={orden(2)}>
        <path d="M0 280H640" stroke={PINTURA} strokeWidth="5" strokeDasharray="40 30" />
      </g>
      {/* Hacia dónde escurre el agua */}
      {flechas.map((x, i) => (
        <g key={x} className="aparece" style={orden(i + 4)} fill="none" stroke={LINEA} strokeWidth="2">
          <path d={`M${x} 240V192M${x - 8} 200l8-10 8 10`} />
          <path d={`M${x} 320V368M${x - 8} 360l8 10 8-10`} />
        </g>
      ))}
      {[150, 490].map((x, i) => (
        <rect key={x} x={x - 22} y="400" width="44" height="26" fill="none" stroke={PINTURA} strokeWidth="3" className="aparece" style={orden(i + 7)} />
      ))}
    </>
  );
}

const planos: Record<string, () => React.JSX.Element> = {
  "repavimentacion-avenida": Avenida,
  "apertura-calle-loteo": Loteo,
  "bacheo-calles-centricas": Bacheo,
  "playa-maniobras-hormigon": Playa,
  "camino-rural-estabilizado": Rural,
  "calle-residencial-nueva": Residencial,
};

export default function ObraArt({ slug }: { slug: string }) {
  const Plano = planos[slug] ?? Avenida;
  return (
    <svg viewBox="0 0 640 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <Plano />
    </svg>
  );
}
