/**
 * ConstellationBG - static SVG network of nodes + edges used as a decorative
 * section background. Zero animations, zero canvas, zero JS at runtime.
 */

interface NodeDef {
  x: number;
  y: number;
  label: string;
}

interface EdgeDef {
  a: number;
  b: number;
}

// Nodes spread across a 1400x3200 viewBox - covers Services through Testimonials.
const NODES: NodeDef[] = [
  // Services band (y 80-600)
  { x: 110,  y: 130,  label: "Live Events" },        // 0
  { x: 1295, y: 180,  label: "Virtual Events" },     // 1
  { x: 700,  y: 220,  label: "70+ Countries" },      // 2
  { x: 980,  y: 300,  label: "Fortune 500" },        // 3
  { x: 355,  y: 420,  label: "Hybrid" },             // 4
  { x: 1055, y: 530,  label: "Video Production" },   // 5
  // About band (y 650-1200)
  { x: 190,  y: 720,  label: "100K Attendees" },     // 6
  { x: 845,  y: 780,  label: "Streaming" },          // 7
  { x: 1200, y: 880,  label: "95% Retention" },      // 8
  { x: 500,  y: 990,  label: "Meeting Pros" },       // 9
  { x: 700,  y: 1100, label: "2,000+ Events" },      // 10
  // PainPoints band (y 1250-1750)
  { x: 130,  y: 1300, label: "On-Site Support" },    // 11
  { x: 1260, y: 1380, label: "Hybrid Production" },  // 12
  { x: 600,  y: 1480, label: "48-hr Match" },        // 13
  { x: 980,  y: 1600, label: "Global Network" },     // 14
  // WhatYouGet band (y 1850-2500)
  { x: 280,  y: 1870, label: "500+ Events" },        // 15
  { x: 1100, y: 1950, label: "White-Glove" },        // 16
  { x: 700,  y: 2100, label: "Broadcast Quality" },  // 17
  { x: 170,  y: 2310, label: "Live Streaming" },     // 18
  { x: 1280, y: 2280, label: "100% Success" },       // 19
  { x: 650,  y: 2480, label: "70+ Destinations" },   // 20
  // Testimonials band (y 2600-3100)
  { x: 360,  y: 2680, label: "Client Success" },     // 21
  { x: 1050, y: 2720, label: "Trusted Worldwide" },  // 22
  { x: 700,  y: 2900, label: "5-Star Reviews" },     // 23
  { x: 180,  y: 3050, label: "Corporate Events" },   // 24
  { x: 1230, y: 3000, label: "95% Return Rate" },    // 25
];

const EDGES: EdgeDef[] = [
  // Services band
  { a: 0, b: 2  }, { a: 0, b: 4  }, { a: 2, b: 1  }, { a: 2, b: 3  },
  { a: 1, b: 3  }, { a: 3, b: 5  }, { a: 4, b: 5  }, { a: 2, b: 4  },
  // Services → About
  { a: 4, b: 6  }, { a: 5, b: 7  }, { a: 5, b: 8  },
  // About band
  { a: 6, b: 7  }, { a: 7, b: 8  }, { a: 7, b: 10 }, { a: 6, b: 9  },
  { a: 9, b: 10 }, { a: 8, b: 10 },
  // About → PainPoints
  { a: 9, b: 11 }, { a: 10, b: 13 }, { a: 8, b: 12 },
  // PainPoints band
  { a: 11, b: 13 }, { a: 13, b: 12 }, { a: 13, b: 14 }, { a: 12, b: 14 },
  // PainPoints → WhatYouGet
  { a: 11, b: 15 }, { a: 14, b: 16 }, { a: 13, b: 17 },
  // WhatYouGet band
  { a: 15, b: 17 }, { a: 16, b: 17 }, { a: 17, b: 18 }, { a: 17, b: 19 },
  { a: 18, b: 20 }, { a: 19, b: 20 }, { a: 15, b: 18 }, { a: 16, b: 19 },
  // WhatYouGet → Testimonials
  { a: 20, b: 21 }, { a: 20, b: 22 }, { a: 19, b: 22 },
  // Testimonials band
  { a: 21, b: 23 }, { a: 22, b: 23 }, { a: 23, b: 24 }, { a: 23, b: 25 },
  { a: 21, b: 24 }, { a: 22, b: 25 },
];

interface ConstellationBGProps {
  /** "light" = subtle on white/off-white bg, "dark" = glow on dark bg */
  variant?: "light" | "dark";
  className?: string;
}

export function ConstellationBG({
  variant = "light",
  className = "",
}: ConstellationBGProps) {
  const isLight = variant === "light";

  const lineStroke = isLight
    ? "hsl(216 90% 58% / 0.35)"
    : "hsl(250 60% 70% / 0.18)";
  const dotFill = isLight
    ? "hsl(216 90% 58% / 0.75)"
    : "hsl(250 60% 80% / 0.6)";
  const textFill = isLight
    ? "hsl(216 90% 35% / 0.65)"
    : "hsl(250 40% 80% / 0.45)";

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={isLight ? { mixBlendMode: "multiply", zIndex: -1 } : { zIndex: -1 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1400 3200"
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Edges */}
        {EDGES.map((e, i) => {
          const a = NODES[e.a];
          const b = NODES[e.b];
          return (
            <line
              key={i}
              x1={a.x} y1={a.y}
              x2={b.x} y2={b.y}
              stroke={lineStroke}
              strokeWidth="1"
            />
          );
        })}

        {/* Nodes - dot only, no outer ring */}
        {NODES.map((n, i) => (
          <g key={i} transform={`translate(${n.x},${n.y})`}>
            <circle r="3" fill={dotFill} />
            <text
              y="13"
              textAnchor="middle"
              fill={textFill}
              fontSize="7.5"
              fontFamily="system-ui, sans-serif"
              fontWeight="500"
              letterSpacing="0.07em"
            >
              {n.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default ConstellationBG;
