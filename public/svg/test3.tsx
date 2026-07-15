import * as React from "react"
type BlueprintProps = {
  zoom?: number;
  /** Grid cell size in canvas units (canvas is 2611×1206). Smaller = denser
   *  squares. The original hand-drawn grid used 117.07. */
  gridStep?: number;
} & React.SVGProps<SVGSVGElement>;

const CANVAS_W = 2611;
const CANVAS_H = 1206;

/* Grid lines and "+" intersection marks are generated so the cell size stays
   adjustable via gridStep instead of living in a frozen path string. */
const gridPath = (step: number) => {
  const parts: string[] = [];
  for (let x = step; x < CANVAS_W; x += step) parts.push(`M${+x.toFixed(2)} 0v${CANVAS_H}`);
  for (let y = step; y < CANVAS_H; y += step) parts.push(`M0 ${+y.toFixed(2)}h${CANVAS_W}`);
  return `M0 0v${CANVAS_H}M0 0h${CANVAS_W}` + parts.join("");
};

const crossesPath = (step: number) => {
  const parts: string[] = [];
  for (let i = 2; i * step < CANVAS_W; i += 4) {
    for (let j = 2; j * step < CANVAS_H; j += 4) {
      const cx = +(i * step).toFixed(2);
      const cy = +(j * step).toFixed(2);
      parts.push(`M${cx - 11} ${cy}h22M${cx} ${cy - 11}v22`);
    }
  }
  return parts.join("");
};

/** `zoom` crops a centered window of the 2611×1206 canvas: 1 = full drawing,
 *  1.4 = grid squares ~40% larger. Clamped ≥1 so blank canvas never shows. */
const Bluprint3 = ({ zoom = 1, gridStep = 88, ...props }: BlueprintProps) => {
  const z = Math.max(1, zoom);
  const w = CANVAS_W / z;
  const h = CANVAS_H / z;
  /* Snap decorative dots onto the current grid's intersections. */
  const snap = (v: number) => Math.round(v / gridStep) * gridStep;
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`${(2611 - w) / 2} ${(1206 - h) / 2} ${w} ${h}`}
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    {...props}
  >
    <defs>
      <linearGradient id="a" x1="0%" x2="100%" y1="0%" y2="0%">
        <stop offset="0%" stopColor="#fff" stopOpacity={0.08} />
        <stop offset="55%" stopColor="#fff" stopOpacity={0.35} />
        <stop offset="100%" stopColor="#fff" />
      </linearGradient>
    </defs>
    <path
      stroke="url(#a)"
      d={gridPath(gridStep)}
      opacity={0.15}
      style={{
        mixBlendMode: "soft-light",
      }}
    />
    <path
      stroke="url(#a)"
      strokeWidth={1.6}
      d={crossesPath(gridStep)}
      opacity={0.8}
      style={{
        mixBlendMode: "soft-light",
      }}
    />
    <g
      style={{
        mixBlendMode: "soft-light",
      }}
    >
      <g opacity={0.35}>
        <path
          stroke="url(#a)"
          strokeWidth={1.6}
          d="M120 131v18m300-18v18m-300-9h300"
        />
        <text
          x={270}
          y={124}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={22}
          textAnchor="middle"
        >
          {"6'-3\""}
        </text>
      </g>
      <g opacity={0.55}>
        <path
          stroke="url(#a)"
          strokeWidth={1.6}
          d="M820 141v18m350-18v18m-350-9h350"
        />
        <text
          x={995}
          y={134}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={22}
          textAnchor="middle"
        >
          {"14'-0\""}
        </text>
      </g>
      <g opacity={0.75}>
        <path
          stroke="url(#a)"
          strokeWidth={1.6}
          d="M1280 251v18m370-18v18m-370-9h370"
        />
        <text
          x={1465}
          y={244}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={22}
          textAnchor="middle"
        >
          {"3'-9\""}
        </text>
      </g>
      <g opacity={0.35}>
        <path
          stroke="url(#a)"
          strokeWidth={1.6}
          d="M251 380h18m-18 340h18m-9-340v340"
        />
        <text
          x={276}
          y={550}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={22}
        >
          {"9'-6\""}
        </text>
      </g>
      <g opacity={0.8}>
        <path
          stroke="url(#a)"
          strokeWidth={1.6}
          d="M2491 500h18m-18 400h18m-9-400v400"
        />
        <text
          x={2516}
          y={700}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={22}
        >
          {"22'-0\""}
        </text>
      </g>
      <g opacity={0.7}>
        <path
          stroke="url(#a)"
          strokeWidth={1.6}
          d="M1450 971v18m400-18v18m-400-9h400"
        />
        <text
          x={1650}
          y={964}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={22}
          textAnchor="middle"
        >
          {"5'-4\""}
        </text>
      </g>
      <g opacity={0.5}>
        <path
          stroke="url(#a)"
          strokeWidth={1.6}
          d="M1711 150h18m-18 320h18m-9-320v320"
        />
        <text
          x={1736}
          y={310}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={22}
        >
          {"11'-8\""}
        </text>
      </g>
      <g opacity={0.75}>
        <path
          stroke="url(#a)"
          strokeWidth={1.6}
          d="M1150 611v18m330-18v18m-330-9h330"
        />
        <text
          x={1315}
          y={604}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={22}
          textAnchor="middle"
        >
          {"17'-2\""}
        </text>
      </g>
      <g opacity={0.75}>
        <path
          stroke="url(#a)"
          strokeWidth={1.6}
          d="M2311 780h18m-18 300h18m-9-300v300"
        />
        <text
          x={2336}
          y={930}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={22}
        >
          {"8'-0\""}
        </text>
      </g>
      <g opacity={0.35}>
        <path
          stroke="url(#a)"
          strokeWidth={1.6}
          d="M1180 1041v18m280-18v18m-280-9h280"
        />
        <text
          x={1320}
          y={1034}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={22}
          textAnchor="middle"
        >
          {"2'-6\""}
        </text>
      </g>
      <g opacity={0.4}>
        <path
          stroke="url(#a)"
          strokeWidth={1.6}
          d="M971 260h18m-18 300h18m-9-300v300"
        />
        <text
          x={996}
          y={410}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={22}
        >
          {"13'-11\""}
        </text>
      </g>
      <g opacity={0.7}>
        <path
          stroke="url(#a)"
          strokeWidth={1.6}
          d="M1550 1080v18m380-18v18m-380-9h380"
        />
        <text
          x={1740}
          y={1073}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={22}
          textAnchor="middle"
        >
          {"19'-5\""}
        </text>
      </g>
    </g>
    <g
      stroke="url(#a)"
      strokeWidth={1.4}
      style={{
        mixBlendMode: "soft-light",
      }}
    >
      <path d="M68 90h22V68M68 90v22M90 68h22m0 0v44m-22 0h22" opacity={0.4} />
      <path
        d="M2478 130h22v-22m-22 22v22M2500 108h22m0 0v44m-22 0h22"
        opacity={0.6}
      />
      <path
        d="M128 1080h22v-22m-22 22v22M150 1058h22m0 0v44m-22 0h22"
        opacity={0.35}
      />
      <path
        d="M2448 1080h22v-22m-22 22v22M2470 1058h22m0 0v44m-22 0h22"
        opacity={0.7}
      />
      <path
        d="M1283 60h22V38m-22 22v22M1305 38h22m0 0v44m-22 0h22M1283 1140h22v-22m-22 22v22M1305 1118h22m0 0v44m-22 0h22"
        opacity={0.4}
      />
    </g>
    <g
      fill="url(#a)"
      style={{
        mixBlendMode: "soft-light",
      }}
    >
      <circle cx={snap(1639)} cy={snap(1170.7)} r={2.5} opacity={0.33} />
      <circle cx={snap(234.1)} cy={snap(1170.7)} r={2.5} opacity={0.46} />
      <circle cx={snap(234.1)} cy={snap(234.1)} r={2.5} opacity={0.71} />
      <circle cx={snap(1639)} cy={snap(234.1)} r={2.5} opacity={0.32} />
    </g>
    <g
      style={{
        mixBlendMode: "soft-light",
      }}
    >
      <g opacity={0.85}>
        <path stroke="url(#a)" strokeWidth={1.4} d="M700 940h330v90H700z" />
        <text
          x={716}
          y={975}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={20}
          letterSpacing={1.5}
        >
          {"SCALE    N.T.S."}
        </text>
        <path stroke="url(#a)" d="M700 985h330" />
        <text
          x={716}
          y={1020}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={20}
          letterSpacing={1.5}
        >
          {"SHEET    A\u2014 1.0"}
        </text>
      </g>
      <g opacity={0.55}>
        <path stroke="url(#a)" strokeWidth={1.4} d="M1850 330h250v70h-250z" />
        <text
          x={1866}
          y={390}
          fill="url(#a)"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize={20}
          letterSpacing={1.5}
        >
          {"REV.    A"}
        </text>
      </g>
    </g>
  </svg>
  );
};
export default Bluprint3
