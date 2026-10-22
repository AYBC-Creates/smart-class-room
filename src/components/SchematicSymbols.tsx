import React from 'react';
import { SchematicComponent } from '../types/schematic';

interface SymbolProps {
  component: SchematicComponent;
  isSelected?: boolean;
  isHovered?: boolean;
  highlightedNet?: string | null;
  onClick?: () => void;
  onPinHover?: (net: string | null) => void;
}

export const ResistorSymbol: React.FC<SymbolProps> = ({
  component,
  isSelected,
  isHovered,
  highlightedNet,
  onClick,
}) => {
  const isHorizontal = component.width > component.height;
  const isHighlighted = component.pins.some((p) => p.net === highlightedNet);

  return (
    <g
      className="cursor-pointer transition-transform duration-150"
      onClick={onClick}
    >
      {/* Selection / Hover Glow */}
      {(isSelected || isHovered || isHighlighted) && (
        <rect
          x={component.x - 6}
          y={component.y - 6}
          width={component.width + 12}
          height={component.height + 12}
          fill={isSelected ? 'rgba(37, 99, 235, 0.12)' : 'rgba(234, 88, 12, 0.1)'}
          stroke={isSelected ? '#2563eb' : '#ea580c'}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          rx="4"
        />
      )}

      {/* Leads & Zig-Zag */}
      {isHorizontal ? (
        <g stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1={component.x} y1={component.y + 15} x2={component.x + 15} y2={component.y + 15} />
          {/* Zig-Zag body */}
          <path
            d={`M ${component.x + 15} ${component.y + 15}
               l 4 -8 l 8 16 l 8 -16 l 8 16 l 8 -16 l 4 8
               L ${component.x + component.width} ${component.y + 15}`}
          />
        </g>
      ) : (
        <g stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <line x1={component.x + 15} y1={component.y} x2={component.x + 15} y2={component.y + 15} />
          <path
            d={`M ${component.x + 15} ${component.y + 15}
               l -8 4 l 16 8 l -16 8 l 16 8 l -16 8 l 8 4
               L ${component.x + 15} ${component.y + component.height}`}
          />
        </g>
      )}

      {/* Text Labels */}
      <text
        x={component.x + (isHorizontal ? component.width / 2 : 28)}
        y={component.y + (isHorizontal ? -6 : component.height / 2 - 4)}
        textAnchor={isHorizontal ? 'middle' : 'start'}
        className="text-[12px] font-bold font-mono fill-slate-900 select-none"
      >
        {component.refDes}
      </text>
      <text
        x={component.x + (isHorizontal ? component.width / 2 : 28)}
        y={component.y + (isHorizontal ? component.height + 12 : component.height / 2 + 10)}
        textAnchor={isHorizontal ? 'middle' : 'start'}
        className="text-[11px] font-mono fill-blue-700 font-medium select-none"
      >
        {component.value}
      </text>
    </g>
  );
};

export const CapacitorPolarizedSymbol: React.FC<SymbolProps> = ({
  component,
  isSelected,
  isHovered,
  highlightedNet,
  onClick,
}) => {
  const cx = component.x + 20;
  const isHighlighted = component.pins.some((p) => p.net === highlightedNet);

  return (
    <g className="cursor-pointer" onClick={onClick}>
      {(isSelected || isHovered || isHighlighted) && (
        <rect
          x={component.x - 6}
          y={component.y - 6}
          width={component.width + 12}
          height={component.height + 12}
          fill="rgba(37, 99, 235, 0.12)"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          rx="4"
        />
      )}

      {/* Top Lead (+) */}
      <line x1={cx} y1={component.y} x2={cx} y2={component.y + 30} stroke="#1e293b" strokeWidth="2" />
      {/* Top Straight Plate (+) */}
      <line x1={cx - 16} y1={component.y + 30} x2={cx + 16} y2={component.y + 30} stroke="#1e293b" strokeWidth="2.5" />
      {/* Plus Sign */}
      <text x={cx + 10} y={component.y + 24} className="text-[12px] font-bold fill-red-600 select-none">
        +
      </text>

      {/* Bottom Curved Plate (-) */}
      <path
        d={`M ${cx - 16} ${component.y + 40} Q ${cx} ${component.y + 46} ${cx + 16} ${component.y + 40}`}
        fill="none"
        stroke="#1e293b"
        strokeWidth="2.5"
      />
      {/* Bottom Lead (-) */}
      <line x1={cx} y1={component.y + 43} x2={cx} y2={component.y + component.height} stroke="#1e293b" strokeWidth="2" />

      {/* Labels */}
      <text x={cx + 22} y={component.y + 32} className="text-[12px] font-bold font-mono fill-slate-900 select-none">
        {component.refDes}
      </text>
      <text x={cx + 22} y={component.y + 48} className="text-[11px] font-mono fill-blue-700 font-medium select-none">
        {component.value}
      </text>
    </g>
  );
};

export const CapacitorCeramicSymbol: React.FC<SymbolProps> = ({
  component,
  isSelected,
  isHovered,
  highlightedNet,
  onClick,
}) => {
  const cx = component.x + 20;
  const isHighlighted = component.pins.some((p) => p.net === highlightedNet);

  return (
    <g className="cursor-pointer" onClick={onClick}>
      {(isSelected || isHovered || isHighlighted) && (
        <rect
          x={component.x - 6}
          y={component.y - 6}
          width={component.width + 12}
          height={component.height + 12}
          fill="rgba(37, 99, 235, 0.12)"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          rx="4"
        />
      )}

      {/* Top Lead */}
      <line x1={cx} y1={component.y} x2={cx} y2={component.y + 32} stroke="#1e293b" strokeWidth="2" />
      {/* Top Plate */}
      <line x1={cx - 15} y1={component.y + 32} x2={cx + 15} y2={component.y + 32} stroke="#1e293b" strokeWidth="2.5" />
      {/* Bottom Plate */}
      <line x1={cx - 15} y1={component.y + 38} x2={cx + 15} y2={component.y + 38} stroke="#1e293b" strokeWidth="2.5" />
      {/* Bottom Lead */}
      <line x1={cx} y1={component.y + 38} x2={cx} y2={component.y + component.height} stroke="#1e293b" strokeWidth="2" />

      {/* Labels */}
      <text x={cx + 20} y={component.y + 32} className="text-[12px] font-bold font-mono fill-slate-900 select-none">
        {component.refDes}
      </text>
      <text x={cx + 20} y={component.y + 48} className="text-[11px] font-mono fill-blue-700 font-medium select-none">
        {component.value}
      </text>
    </g>
  );
};

export const MosfetSymbol: React.FC<SymbolProps> = ({
  component,
  isSelected,
  isHovered,
  highlightedNet,
  onClick,
}) => {
  const isHighlighted = component.pins.some((p) => p.net === highlightedNet);
  const gx = component.x;
  const gy = component.y + 35; // Gate Y
  const cx = component.x + 60; // Center column

  return (
    <g className="cursor-pointer" onClick={onClick}>
      {(isSelected || isHovered || isHighlighted) && (
        <rect
          x={component.x - 8}
          y={component.y - 8}
          width={component.width + 16}
          height={component.height + 16}
          fill="rgba(234, 88, 12, 0.08)"
          stroke="#ea580c"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          rx="6"
        />
      )}

      {/* Gate lead & plate */}
      <line x1={gx} y1={gy} x2={gx + 30} y2={gy} stroke="#1e293b" strokeWidth="2" />
      <line x1={gx + 30} y1={gy - 20} x2={gx + 30} y2={gy + 20} stroke="#1e293b" strokeWidth="3" />

      {/* Channel dielectric gap */}
      {/* Channel 3 segments (Drain, Source/Bulk, Source) */}
      <line x1={gx + 38} y1={gy - 20} x2={gx + 38} y2={gy - 10} stroke="#1e293b" strokeWidth="3" />
      <line x1={gx + 38} y1={gy - 4} x2={gx + 38} y2={gy + 4} stroke="#1e293b" strokeWidth="3" />
      <line x1={gx + 38} y1={gy + 10} x2={gx + 38} y2={gy + 20} stroke="#1e293b" strokeWidth="3" />

      {/* Drain connection (Top) */}
      <line x1={gx + 38} y1={gy - 15} x2={cx} y2={gy - 15} stroke="#1e293b" strokeWidth="2" />
      <line x1={cx} y1={gy - 15} x2={cx} y2={component.y} stroke="#1e293b" strokeWidth="2" />

      {/* Source connection (Bottom) */}
      <line x1={gx + 38} y1={gy + 15} x2={cx} y2={gy + 15} stroke="#1e293b" strokeWidth="2" />
      <line x1={cx} y1={gy + 15} x2={cx} y2={component.y + component.height} stroke="#1e293b" strokeWidth="2" />

      {/* Inward N-channel Arrow on middle source line */}
      <line x1={gx + 38} y1={gy} x2={cx} y2={gy} stroke="#1e293b" strokeWidth="2" />
      <line x1={cx} y1={gy} x2={cx} y2={gy + 15} stroke="#1e293b" strokeWidth="2" />
      {/* Arrow pointing IN to channel (N-channel indicator) */}
      <polygon points={`${gx + 40},${gy} ${gx + 49},${gy - 4} ${gx + 49},${gy + 4}`} fill="#1e293b" />

      {/* Body Diode representation */}
      <g opacity="0.6">
        <line x1={cx + 12} y1={gy - 12} x2={cx + 12} y2={gy + 12} stroke="#64748b" strokeWidth="1" />
        <polygon points={`${cx + 7},${gy + 4} ${cx + 17},${gy + 4} ${cx + 12},${gy - 4}`} fill="#64748b" />
        <line x1={cx + 7} y1={gy - 4} x2={cx + 17} y2={gy - 4} stroke="#64748b" strokeWidth="1" />
        <line x1={cx} y1={gy - 12} x2={cx + 12} y2={gy - 12} stroke="#64748b" strokeWidth="1" />
        <line x1={cx} y1={gy + 12} x2={cx + 12} y2={gy + 12} stroke="#64748b" strokeWidth="1" />
      </g>

      {/* Pin designators: 1 (G), 2 (D), 3 (S) */}
      <text x={gx + 10} y={gy - 6} className="text-[10px] font-mono font-bold fill-slate-500 select-none">
        1:G
      </text>
      <text x={cx + 4} y={component.y + 12} className="text-[10px] font-mono font-bold fill-slate-500 select-none">
        2:D
      </text>
      <text x={cx + 4} y={component.y + component.height - 8} className="text-[10px] font-mono font-bold fill-slate-500 select-none">
        3:S
      </text>

      {/* RefDes & Value */}
      <text x={component.x + 8} y={component.y + 82} className="text-[12px] font-bold font-mono fill-slate-900 select-none">
        {component.refDes}
      </text>
      <text x={component.x + 8} y={component.y + 96} className="text-[11px] font-mono fill-orange-700 font-semibold select-none">
        {component.value}
      </text>
    </g>
  );
};

export const DiodeSchottkySymbol: React.FC<SymbolProps> = ({
  component,
  isSelected,
  isHovered,
  highlightedNet,
  onClick,
}) => {
  const cx = component.x + 20;
  const isHighlighted = component.pins.some((p) => p.net === highlightedNet);

  return (
    <g className="cursor-pointer" onClick={onClick}>
      {(isSelected || isHovered || isHighlighted) && (
        <rect
          x={component.x - 6}
          y={component.y - 6}
          width={component.width + 12}
          height={component.height + 12}
          fill="rgba(37, 99, 235, 0.12)"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          rx="4"
        />
      )}

      {/* Top Lead (Cathode to +5V) */}
      <line x1={cx} y1={component.y} x2={cx} y2={component.y + 30} stroke="#1e293b" strokeWidth="2" />

      {/* Schottky S-bent Cathode Bar (Top) */}
      <path
        d={`M ${cx - 16} ${component.y + 25} l 0 5 L ${cx + 16} ${component.y + 30} l 0 5`}
        fill="none"
        stroke="#1e293b"
        strokeWidth="2.5"
      />

      {/* Diode Triangle (Anode pointing up toward Cathode) */}
      <polygon
        points={`${cx - 16},${component.y + 50} ${cx + 16},${component.y + 50} ${cx},${component.y + 30}`}
        fill="#1e293b"
      />

      {/* Bottom Lead (Anode from Q3 Drain) */}
      <line x1={cx} y1={component.y + 50} x2={cx} y2={component.y + component.height} stroke="#1e293b" strokeWidth="2" />

      {/* Pin labels */}
      <text x={cx + 10} y={component.y + 24} className="text-[10px] font-mono font-bold fill-slate-500 select-none">
        K
      </text>
      <text x={cx + 10} y={component.y + 60} className="text-[10px] font-mono font-bold fill-slate-500 select-none">
        A
      </text>

      {/* RefDes & Value */}
      <text x={cx + 22} y={component.y + 38} className="text-[12px] font-bold font-mono fill-slate-900 select-none">
        {component.refDes}
      </text>
      <text x={cx + 22} y={component.y + 52} className="text-[11px] font-mono fill-blue-700 font-semibold select-none">
        {component.value}
      </text>
      <text x={cx + 22} y={component.y + 66} className="text-[9px] font-mono fill-slate-500 select-none">
        (Flyback Clamp)
      </text>
    </g>
  );
};

export const TerminalBlockSymbol: React.FC<SymbolProps> = ({
  component,
  isSelected,
  isHovered,
  highlightedNet,
  onClick,
}) => {
  const isHighlighted = component.pins.some((p) => p.net === highlightedNet);

  return (
    <g className="cursor-pointer" onClick={onClick}>
      {(isSelected || isHovered || isHighlighted) && (
        <rect
          x={component.x - 6}
          y={component.y - 6}
          width={component.width + 12}
          height={component.height + 12}
          fill="rgba(2, 132, 199, 0.12)"
          stroke="#0284c7"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          rx="6"
        />
      )}

      {/* Outer Enclosure Box */}
      <rect
        x={component.x}
        y={component.y}
        width={component.width}
        height={component.height}
        fill="#f8fafc"
        stroke="#1e293b"
        strokeWidth="2"
        rx="4"
      />

      {/* Header Band */}
      <rect
        x={component.x}
        y={component.y}
        width={component.width}
        height={22}
        fill="#e2e8f0"
        stroke="#1e293b"
        strokeWidth="1.5"
        rx="3"
      />
      <text
        x={component.x + component.width / 2}
        y={component.y + 15}
        textAnchor="middle"
        className="text-[11px] font-bold font-mono fill-slate-800 select-none"
      >
        {component.refDes}
      </text>

      {/* Screw Terminals */}
      {component.pins.map((pin) => (
        <g key={pin.id}>
          {/* Circular screw symbol */}
          <circle
            cx={pin.x > component.x + component.width / 2 ? component.x + component.width - 16 : component.x + 16}
            cy={pin.y}
            r="7"
            fill="#ffffff"
            stroke="#1e293b"
            strokeWidth="1.5"
          />
          <line
            x1={(pin.x > component.x + component.width / 2 ? component.x + component.width - 16 : component.x + 16) - 5}
            y1={pin.y - 5}
            x2={(pin.x > component.x + component.width / 2 ? component.x + component.width - 16 : component.x + 16) + 5}
            y2={pin.y + 5}
            stroke="#1e293b"
            strokeWidth="1.5"
          />
          {/* Pin label inside */}
          <text
            x={component.x + component.width / 2}
            y={pin.y + 4}
            textAnchor="middle"
            className="text-[10px] font-mono font-bold fill-slate-700 select-none"
          >
            {pin.name}
          </text>
        </g>
      ))}

      {/* Value label below */}
      <text
        x={component.x + component.width / 2}
        y={component.y + component.height + 14}
        textAnchor="middle"
        className="text-[11px] font-mono font-semibold fill-sky-800 select-none"
      >
        {component.value}
      </text>
    </g>
  );
};

export const SensorSymbol: React.FC<SymbolProps> = ({
  component,
  isSelected,
  isHovered,
  highlightedNet,
  onClick,
}) => {
  const isHighlighted = component.pins.some((p) => p.net === highlightedNet);

  return (
    <g className="cursor-pointer" onClick={onClick}>
      {(isSelected || isHovered || isHighlighted) && (
        <rect
          x={component.x - 6}
          y={component.y - 6}
          width={component.width + 12}
          height={component.height + 12}
          fill="rgba(13, 148, 136, 0.12)"
          stroke="#0d9488"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          rx="6"
        />
      )}

      {/* Sensor Enclosure */}
      <rect
        x={component.x}
        y={component.y}
        width={component.width}
        height={component.height}
        fill="#f8fafc"
        stroke="#1e293b"
        strokeWidth="2"
        rx="5"
      />

      {/* Header bar */}
      <rect
        x={component.x}
        y={component.y}
        width={component.width}
        height={24}
        fill="#e2e8f0"
        stroke="#1e293b"
        strokeWidth="1.5"
        rx="4"
      />
      <text
        x={component.x + 8}
        y={component.y + 16}
        className="text-[12px] font-bold font-mono fill-slate-900 select-none"
      >
        {component.refDes}
      </text>
      <text
        x={component.x + component.width - 8}
        y={component.y + 16}
        textAnchor="end"
        className="text-[11px] font-mono font-semibold fill-teal-700 select-none"
      >
        {component.value}
      </text>

      {/* Decorative internal sensor graphic */}
      <rect
        x={component.x + 12}
        y={component.y + 34}
        width={component.width - 70}
        height={component.height - 46}
        fill="#f1f5f9"
        stroke="#cbd5e1"
        strokeWidth="1"
        rx="3"
      />
      <text
        x={component.x + (component.width - 70) / 2 + 12}
        y={component.y + component.height / 2 + 15}
        textAnchor="middle"
        className="text-[9px] font-mono fill-slate-400 select-none"
      >
        {component.refDes === 'U2' ? 'PIR DETECTOR' : 'TEMP/RH CORE'}
      </text>

      {/* Pin Rows */}
      {component.pins.map((pin) => (
        <g key={pin.id}>
          <text
            x={pin.orientation === 'right' ? component.x + component.width - 8 : component.x + 8}
            y={pin.y + 4}
            textAnchor={pin.orientation === 'right' ? 'end' : 'start'}
            className="text-[11px] font-mono font-bold fill-slate-800 select-none"
          >
            {pin.name}
          </text>
          <text
            x={pin.orientation === 'right' ? component.x + component.width - 45 : component.x + 45}
            y={pin.y + 4}
            textAnchor={pin.orientation === 'right' ? 'end' : 'start'}
            className="text-[9px] font-mono fill-slate-400 select-none"
          >
            #{pin.number}
          </text>
        </g>
      ))}
    </g>
  );
};

export const LdrSymbol: React.FC<SymbolProps> = ({
  component,
  isSelected,
  isHovered,
  highlightedNet,
  onClick,
}) => {
  const cx = component.x + component.width / 2;
  const cy = component.y + component.height / 2;
  const isHighlighted = component.pins.some((p) => p.net === highlightedNet);

  return (
    <g className="cursor-pointer" onClick={onClick}>
      {(isSelected || isHovered || isHighlighted) && (
        <rect
          x={component.x - 6}
          y={component.y - 6}
          width={component.width + 12}
          height={component.height + 12}
          fill="rgba(217, 119, 6, 0.12)"
          stroke="#d97706"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          rx="6"
        />
      )}

      {/* Surrounding Opto Circle */}
      <circle cx={cx} cy={cy} r="22" fill="#fffbeb" stroke="#1e293b" strokeWidth="2" />

      {/* Internal Resistor Element */}
      <line x1={cx} y1={component.y} x2={cx} y2={cy - 12} stroke="#1e293b" strokeWidth="2" />
      <path
        d={`M ${cx} ${cy - 12} l -6 4 l 12 5 l -12 5 l 12 5 l -6 3`}
        fill="none"
        stroke="#1e293b"
        strokeWidth="2"
      />
      <line x1={cx} y1={cy + 10} x2={cx} y2={component.y + component.height} stroke="#1e293b" strokeWidth="2" />

      {/* Light Influx Arrows */}
      <g stroke="#d97706" strokeWidth="1.5" fill="#d97706">
        <line x1={cx - 28} y1={cy - 18} x2={cx - 15} y2={cy - 8} />
        <polygon points={`${cx - 14},${cy - 7} ${cx - 19},${cy - 13} ${cx - 15},${cy - 14}`} />
        <line x1={cx - 24} y1={cy - 24} x2={cx - 11} y2={cy - 14} />
        <polygon points={`${cx - 10},${cy - 13} ${cx - 15},${cy - 19} ${cx - 11},${cy - 20}`} />
      </g>

      {/* Text Labels */}
      <text x={cx + 28} y={cy - 2} className="text-[12px] font-bold font-mono fill-slate-900 select-none">
        {component.refDes}
      </text>
      <text x={cx + 28} y={cy + 14} className="text-[11px] font-mono fill-amber-700 font-semibold select-none">
        {component.value}
      </text>
    </g>
  );
};

export const SwitchSymbol: React.FC<SymbolProps> = ({
  component,
  isSelected,
  isHovered,
  highlightedNet,
  onClick,
}) => {
  const isHighlighted = component.pins.some((p) => p.net === highlightedNet);
  const cy = component.y + component.height / 2;

  return (
    <g className="cursor-pointer" onClick={onClick}>
      {(isSelected || isHovered || isHighlighted) && (
        <rect
          x={component.x - 6}
          y={component.y - 6}
          width={component.width + 12}
          height={component.height + 12}
          fill="rgba(219, 39, 119, 0.12)"
          stroke="#db2777"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          rx="6"
        />
      )}

      {/* Terminal Dots */}
      <circle cx={component.x + 15} cy={cy} r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <circle cx={component.x + component.width - 15} cy={cy} r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />

      {/* Left connection wire */}
      <line x1={component.x} y1={cy} x2={component.x + 11} y2={cy} stroke="#1e293b" strokeWidth="2" />
      {/* Right connection wire */}
      <line x1={component.x + component.width - 11} y1={cy} x2={component.x + component.width} y2={cy} stroke="#1e293b" strokeWidth="2" />

      {/* Switch Blade (Normally Open angled line) */}
      <line
        x1={component.x + 15}
        y1={cy}
        x2={component.x + component.width - 20}
        y2={cy - 16}
        stroke="#1e293b"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Pushbutton actuator graphic */}
      <line
        x1={component.x + component.width / 2 - 4}
        y1={cy - 9}
        x2={component.x + component.width / 2 - 4}
        y2={cy - 22}
        stroke="#64748b"
        strokeWidth="1.5"
      />
      <rect
        x={component.x + component.width / 2 - 12}
        y={cy - 24}
        width="16"
        height="4"
        fill="#64748b"
        rx="1"
      />

      {/* Text Labels */}
      <text
        x={component.x + component.width / 2}
        y={component.y - 4}
        textAnchor="middle"
        className="text-[12px] font-bold font-mono fill-slate-900 select-none"
      >
        {component.refDes}
      </text>
      <text
        x={component.x + component.width / 2}
        y={component.y + component.height + 12}
        textAnchor="middle"
        className="text-[10px] font-mono fill-pink-700 font-semibold select-none"
      >
        {component.value}
      </text>
    </g>
  );
};

export const LedSymbol: React.FC<SymbolProps> = ({
  component,
  isSelected,
  isHovered,
  highlightedNet,
  onClick,
}) => {
  const isHighlighted = component.pins.some((p) => p.net === highlightedNet);
  const cx = component.x + 22;
  const cy = component.y + component.height / 2;

  return (
    <g className="cursor-pointer" onClick={onClick}>
      {(isSelected || isHovered || isHighlighted) && (
        <rect
          x={component.x - 6}
          y={component.y - 6}
          width={component.width + 12}
          height={component.height + 12}
          fill="rgba(37, 99, 235, 0.12)"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          rx="6"
        />
      )}

      {/* Left Lead (Anode) */}
      <line x1={component.x} y1={cy} x2={cx - 10} y2={cy} stroke="#1e293b" strokeWidth="2" />

      {/* Diode Triangle */}
      <polygon
        points={`${cx - 10},${cy - 12} ${cx - 10},${cy + 12} ${cx + 10},${cy}`}
        fill="#1e293b"
      />

      {/* Cathode Bar */}
      <line x1={cx + 10} y1={cy - 12} x2={cx + 10} y2={cy + 12} stroke="#1e293b" strokeWidth="2.5" />

      {/* Right Lead (Cathode to GND) */}
      <line x1={cx + 10} y1={cy} x2={component.x + component.width} y2={cy} stroke="#1e293b" strokeWidth="2" />

      {/* Light Emission Arrows */}
      <g stroke="#059669" strokeWidth="1.5" fill="#059669">
        <line x1={cx} y1={cy - 14} x2={cx + 10} y2={cy - 24} />
        <polygon points={`${cx + 11},${cy - 25} ${cx + 4},${cy - 24} ${cx + 8},${cy - 20}`} />
        <line x1={cx + 6} y1={cy - 11} x2={cx + 16} y2={cy - 21} />
        <polygon points={`${cx + 17},${cy - 22} ${cx + 10},${cy - 21} ${cx + 14},${cy - 17}`} />
      </g>

      {/* Pin Labels */}
      <text x={component.x + 4} y={cy - 6} className="text-[9px] font-mono font-bold fill-slate-500 select-none">
        A
      </text>
      <text x={component.x + component.width - 10} y={cy - 6} className="text-[9px] font-mono font-bold fill-slate-500 select-none">
        K
      </text>

      {/* Labels */}
      <text
        x={component.x + component.width / 2}
        y={component.y - 2}
        textAnchor="middle"
        className="text-[12px] font-bold font-mono fill-slate-900 select-none"
      >
        {component.refDes}
      </text>
      <text
        x={component.x + component.width / 2}
        y={component.y + component.height + 12}
        textAnchor="middle"
        className="text-[10px] font-mono font-semibold fill-emerald-700 select-none"
      >
        {component.value}
      </text>
    </g>
  );
};

export const ArduinoNanoSymbol: React.FC<SymbolProps> = ({
  component,
  isSelected,
  isHovered,
  highlightedNet,
  onClick,
  onPinHover,
}) => {
  const isHighlighted = component.pins.some((p) => p.net === highlightedNet);

  return (
    <g className="cursor-pointer" onClick={onClick}>
      {(isSelected || isHovered || isHighlighted) && (
        <rect
          x={component.x - 8}
          y={component.y - 8}
          width={component.width + 16}
          height={component.height + 16}
          fill="rgba(13, 148, 136, 0.08)"
          stroke="#0d9488"
          strokeWidth="2"
          strokeDasharray="4 4"
          rx="8"
        />
      )}

      {/* Main DIP-30 Package Body */}
      <rect
        x={component.x}
        y={component.y}
        width={component.width}
        height={component.height}
        fill="#ffffff"
        stroke="#0f172a"
        strokeWidth="2.5"
        rx="6"
        filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.04))"
      />

      {/* Top IC Orientation Notch */}
      <path
        d={`M ${component.x + component.width / 2 - 20} ${component.y}
            A 20 20 0 0 0 ${component.x + component.width / 2 + 20} ${component.y}`}
        fill="#f1f5f9"
        stroke="#0f172a"
        strokeWidth="2"
      />

      {/* Header Band */}
      <rect
        x={component.x}
        y={component.y + 25}
        width={component.width}
        height={50}
        fill="#0f766e"
        stroke="#0f172a"
        strokeWidth="1.5"
      />
      <text
        x={component.x + component.width / 2}
        y={component.y + 50}
        textAnchor="middle"
        className="text-[16px] font-bold font-mono fill-white tracking-wider select-none"
      >
        ARDUINO NANO V3.0
      </text>
      <text
        x={component.x + component.width / 2}
        y={component.y + 68}
        textAnchor="middle"
        className="text-[11px] font-mono fill-teal-100 select-none"
      >
        ATmega328P · 16MHz · 5V LOGIC · DIP-30
      </text>

      {/* Central Board Details */}
      <rect
        x={component.x + 95}
        y={component.y + 90}
        width={component.width - 190}
        height={component.height - 110}
        fill="#f8fafc"
        stroke="#e2e8f0"
        strokeWidth="1.5"
        rx="4"
      />

      {/* ATmega328P Microcontroller TQFP Graphic in center */}
      <rect
        x={component.x + component.width / 2 - 40}
        y={component.y + component.height / 2 - 40}
        width="80"
        height="80"
        fill="#1e293b"
        rx="3"
      />
      <text
        x={component.x + component.width / 2}
        y={component.y + component.height / 2 - 5}
        textAnchor="middle"
        className="text-[10px] font-bold font-mono fill-white select-none"
      >
        ATMEGA
      </text>
      <text
        x={component.x + component.width / 2}
        y={component.y + component.height / 2 + 10}
        textAnchor="middle"
        className="text-[9px] font-mono fill-slate-300 select-none"
      >
        328P-AU
      </text>

      {/* Left and Right Pin Columns */}
      {component.pins.map((pin) => {
        const isPinHighlighted = pin.net === highlightedNet;
        const isLeft = pin.orientation === 'left';
        const pinColor =
          pin.type === 'power_in' || pin.type === 'power_out'
            ? '#dc2626'
            : pin.net.includes('GND')
            ? '#2563eb'
            : '#0f172a';

        return (
          <g
            key={pin.id}
            onMouseEnter={() => onPinHover?.(pin.net)}
            onMouseLeave={() => onPinHover?.(null)}
            className="group"
          >
            {/* Horizontal Lead Stub to schematic boundary */}
            <line
              x1={isLeft ? component.x : component.x + component.width - 25}
              y1={pin.y}
              x2={isLeft ? component.x + 25 : component.x + component.width}
              y2={pin.y}
              stroke={isPinHighlighted ? '#f59e0b' : '#334155'}
              strokeWidth={isPinHighlighted ? 3 : 2}
            />

            {/* Solder Pad Dot */}
            <circle
              cx={isLeft ? component.x + 25 : component.x + component.width - 25}
              cy={pin.y}
              r={isPinHighlighted ? 4.5 : 3}
              fill={isPinHighlighted ? '#f59e0b' : '#ffffff'}
              stroke={isPinHighlighted ? '#d97706' : '#0f172a'}
              strokeWidth="1.5"
            />

            {/* Pin Physical Number (Inside margin) */}
            <text
              x={isLeft ? component.x + 36 : component.x + component.width - 36}
              y={pin.y + 4}
              textAnchor={isLeft ? 'start' : 'end'}
              className="text-[11px] font-mono font-bold fill-slate-400 select-none"
            >
              #{pin.number}
            </text>

            {/* Pin Functional Name */}
            <text
              x={isLeft ? component.x + 58 : component.x + component.width - 58}
              y={pin.y + 4}
              textAnchor={isLeft ? 'start' : 'end'}
              fill={isPinHighlighted ? '#d97706' : pinColor}
              className={`text-[12px] font-mono font-bold select-none ${
                isPinHighlighted ? 'font-black' : ''
              }`}
            >
              {pin.name}
            </text>
          </g>
        );
      })}
    </g>
  );
};
