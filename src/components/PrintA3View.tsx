import React, { useRef } from 'react';
import { Printer, X, Download, ShieldCheck } from 'lucide-react';
import {
  SCHEMATIC_SECTIONS,
  SCHEMATIC_COMPONENTS,
  SCHEMATIC_WIRES,
  SCHEMATIC_JUNCTIONS,
  SCHEMATIC_NET_LABELS,
} from '../data/schematicData';
import {
  ResistorSymbol,
  CapacitorPolarizedSymbol,
  CapacitorCeramicSymbol,
  MosfetSymbol,
  DiodeSchottkySymbol,
  TerminalBlockSymbol,
  SensorSymbol,
  LdrSymbol,
  SwitchSymbol,
  LedSymbol,
  ArduinoNanoSymbol,
} from './SchematicSymbols';

interface PrintA3ViewProps {
  onClose: () => void;
}

export const PrintA3View: React.FC<PrintA3ViewProps> = ({ onClose }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExportSvg = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Smart_Classroom_Utility_Schematic_A3_Print.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderComponentSymbol = (comp: any) => {
    const commonProps = {
      key: comp.refDes,
      component: comp,
      isSelected: false,
      isHovered: false,
      highlightedNet: null,
    };

    switch (comp.deviceType) {
      case 'mcu':
        return <ArduinoNanoSymbol {...commonProps} />;
      case 'mosfet':
        return <MosfetSymbol {...commonProps} />;
      case 'resistor':
        return <ResistorSymbol {...commonProps} />;
      case 'capacitor':
        return comp.refDes === 'C1' ? (
          <CapacitorPolarizedSymbol {...commonProps} />
        ) : (
          <CapacitorCeramicSymbol {...commonProps} />
        );
      case 'diode':
        return <DiodeSchottkySymbol {...commonProps} />;
      case 'connector':
        return <TerminalBlockSymbol {...commonProps} />;
      case 'sensor':
        return comp.refDes.startsWith('LDR') ? (
          <LdrSymbol {...commonProps} />
        ) : (
          <SensorSymbol {...commonProps} />
        );
      case 'switch':
        return <SwitchSymbol {...commonProps} />;
      case 'led':
        return <LedSymbol {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-auto print:p-0 print:bg-white print:overflow-visible">
      {/* Print View Top Bar (Hidden during actual print) */}
      <div className="print:hidden p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 font-mono text-xs font-bold border border-blue-500/30">
            A3 LANDSCAPE (420 × 297 mm)
          </div>
          <div>
            <h2 className="text-sm font-bold text-white font-mono">
              ENGINEERING SCHEMATIC PRINT PREVIEW
            </h2>
            <p className="text-xs text-slate-400">
              High-resolution vector CAD drawing formatted for district competition submission.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportSvg}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Vector SVG
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print to A3 / Save PDF
          </button>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Printable Stage */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-950 print:p-0 print:m-0 print:bg-white">
        <div className="bg-white p-2 shadow-2xl rounded border border-slate-300 print:shadow-none print:border-none print:p-0">
          <svg
            ref={svgRef}
            width="1800"
            height="1240"
            viewBox="0 0 1800 1240"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-white"
          >
            <defs>
              <pattern id="printGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="0.8" />
              </pattern>
            </defs>

            <rect width="1800" height="1240" fill="url(#printGrid)" />

            {/* Engineering Borders */}
            <rect
              x="20"
              y="20"
              width="1760"
              height="1200"
              fill="none"
              stroke="#0f172a"
              strokeWidth="3"
            />
            <rect
              x="26"
              y="26"
              width="1748"
              height="1188"
              fill="none"
              stroke="#0f172a"
              strokeWidth="1"
            />

            {/* Grid Coordinates */}
            <g className="font-mono text-[11px] font-bold fill-slate-700">
              {[
                { label: '1', x: 130 },
                { label: '2', x: 350 },
                { label: '3', x: 570 },
                { label: '4', x: 790 },
                { label: '5', x: 1010 },
                { label: '6', x: 1230 },
                { label: '7', x: 1450 },
                { label: '8', x: 1670 },
              ].map((col) => (
                <React.Fragment key={col.label}>
                  <text x={col.x} y="18" textAnchor="middle">
                    {col.label}
                  </text>
                  <text x={col.x} y="1232" textAnchor="middle">
                    {col.label}
                  </text>
                </React.Fragment>
              ))}

              {[
                { label: 'A', y: 160 },
                { label: 'B', y: 440 },
                { label: 'C', y: 720 },
                { label: 'D', y: 1000 },
              ].map((row) => (
                <React.Fragment key={row.label}>
                  <text x="14" y={row.y} textAnchor="middle">
                    {row.label}
                  </text>
                  <text x="1786" y={row.y} textAnchor="middle">
                    {row.label}
                  </text>
                </React.Fragment>
              ))}
            </g>

            {/* Functional Sections */}
            {SCHEMATIC_SECTIONS.map((sec) => (
              <g key={sec.id}>
                <rect
                  x={sec.bounds.x}
                  y={sec.bounds.y}
                  width={sec.bounds.width}
                  height={sec.bounds.height}
                  fill={sec.fillColor}
                  stroke={sec.color}
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  rx="6"
                />
                <rect
                  x={sec.bounds.x + 12}
                  y={sec.bounds.y - 12}
                  width={sec.title.length * 8.2 + 60}
                  height="24"
                  fill="#ffffff"
                  stroke={sec.color}
                  strokeWidth="1.5"
                  rx="4"
                />
                <text
                  x={sec.bounds.x + 20}
                  y={sec.bounds.y + 4}
                  className="text-[12px] font-bold font-mono"
                  fill={sec.color}
                >
                  SEC {sec.letter}: {sec.title}
                </text>
              </g>
            ))}

            {/* Wires */}
            {SCHEMATIC_WIRES.map((wire) => {
              const isPower = wire.net === '+5V';
              const isGnd = wire.net === 'GND';
              const strokeColor = isPower ? '#ef4444' : isGnd ? '#2563eb' : '#334155';
              const strokeWidth = isPower || isGnd ? 2.5 : 2;

              const pathStr = wire.points.reduce((acc, pt, idx) => {
                return `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
              }, '');

              return (
                <path
                  key={wire.id}
                  d={pathStr}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
              );
            })}

            {/* Junctions */}
            {SCHEMATIC_JUNCTIONS.map((j) => {
              const dotColor = j.net === '+5V' ? '#ef4444' : j.net === 'GND' ? '#2563eb' : '#0f172a';
              return (
                <circle
                  key={j.id}
                  cx={j.x}
                  cy={j.y}
                  r="4"
                  fill={dotColor}
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              );
            })}

            {/* Components */}
            {SCHEMATIC_COMPONENTS.map((comp) => renderComponentSymbol(comp))}

            {/* Net Labels */}
            {SCHEMATIC_NET_LABELS.map((lbl) => {
              const bgFill =
                lbl.type === 'power' ? '#fee2e2' : lbl.type === 'ground' ? '#dbeafe' : '#fef3c7';
              const textFill =
                lbl.type === 'power' ? '#b91c1c' : lbl.type === 'ground' ? '#1d4ed8' : '#b45309';
              const borderStroke =
                lbl.type === 'power' ? '#ef4444' : lbl.type === 'ground' ? '#3b82f6' : '#f59e0b';

              return (
                <g key={lbl.id}>
                  <rect
                    x={lbl.x - 4}
                    y={lbl.y - 14}
                    width={lbl.text.length * 7.5 + 8}
                    height="18"
                    fill={bgFill}
                    stroke={borderStroke}
                    strokeWidth="1"
                    rx="3"
                  />
                  <text
                    x={lbl.x}
                    y={lbl.y}
                    className="text-[10px] font-mono font-bold"
                    fill={textFill}
                  >
                    {lbl.text}
                  </text>
                </g>
              );
            })}

            {/* Title Block */}
            <g id="print-title-block">
              <rect
                x="1220"
                y="1115"
                width="540"
                height="105"
                fill="#ffffff"
                stroke="#0f172a"
                strokeWidth="2"
              />
              <line x1="1220" y1="1145" x2="1760" y2="1145" stroke="#0f172a" strokeWidth="1.5" />
              <line x1="1220" y1="1185" x2="1760" y2="1185" stroke="#0f172a" strokeWidth="1.5" />
              <line x1="1520" y1="1145" x2="1520" y2="1220" stroke="#0f172a" strokeWidth="1.5" />
              <line x1="1640" y1="1185" x2="1640" y2="1220" stroke="#0f172a" strokeWidth="1.5" />

              <text x="1230" y="1135" className="text-[13px] font-bold font-mono fill-slate-900">
                SMART CLASSROOM UTILITY MANAGEMENT SYSTEM
              </text>
              <text x="1230" y="1162" className="text-[11px] font-mono fill-slate-600">
                DISTRICT-LEVEL PCB DESIGN COMPETITION
              </text>
              <text x="1230" y="1178" className="text-[10px] font-mono font-semibold fill-blue-700">
                WITH INTEGRATED EXAMINATION MODE & DUAL-ZONE DAYLIGHTING
              </text>

              <text x="1530" y="1162" className="text-[10px] font-mono fill-slate-500">
                DOC ID: <tspan className="font-bold fill-slate-900">SCUMS-EM-01</tspan>
              </text>
              <text x="1530" y="1178" className="text-[10px] font-mono fill-slate-500">
                REV: <tspan className="font-bold fill-emerald-600">1.0 (VERIFIED)</tspan>
              </text>

              <text x="1230" y="1205" className="text-[10px] font-mono fill-slate-500">
                FORMAT: <tspan className="font-bold fill-slate-900">A3 LANDSCAPE</tspan>
              </text>
              <text x="1530" y="1205" className="text-[10px] font-mono fill-slate-500">
                DATE: <tspan className="font-bold fill-slate-900">2026-10-22</tspan>
              </text>
              <text x="1650" y="1205" className="text-[10px] font-mono fill-slate-500">
                SHEET: <tspan className="font-bold fill-slate-900">1 OF 1</tspan>
              </text>
            </g>

            {/* Notes & Safety */}
            <g id="print-notes">
              <rect
                x="40"
                y="1115"
                width="1160"
                height="105"
                fill="#f8fafc"
                stroke="#0f172a"
                strokeWidth="2"
              />
              <text x="50" y="1132" className="text-[11px] font-bold font-mono fill-slate-900">
                ENGINEERING NOTES & ELECTRICAL RULES AUDIT:
              </text>
              <text x="50" y="1152" className="text-[9.5px] font-mono fill-slate-700">
                1. POWER SUPPLY: Regulated +5V DC input via J1 (3.0A minimum rating). Bulk reservoir C1 (100 µF) and high-frequency bypass C2 (100 nF) in parallel.
              </text>
              <text x="50" y="1168" className="text-[9.5px] font-mono fill-slate-700">
                2. LOAD ISOLATION: High-current loads (Lights & Fan) switched via IRLZ44N logic-level N-FETs. Zero heavy loads powered through ATmega328P GPIO.
              </text>
              <text x="50" y="1184" className="text-[9.5px] font-mono fill-slate-700">
                3. INDUCTIVE CLAMP: 1N5819 Schottky diode D1 connected anti-parallel across J4 fan terminal safely absorbs back-EMF inductive kickback during PWM.
              </text>
              <text x="50" y="1200" className="text-[9.5px] font-mono fill-red-600 font-semibold">
                4. SAFETY CLASSIFICATION: SELV Demonstration System (+5V DC). DO NOT CONNECT 230V AC MAINS DIRECTLY TO THIS PCB.
              </text>

              <g transform="translate(930, 1122)">
                <rect width="260" height="90" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" rx="3" />
                <text x="10" y="16" className="text-[10px] font-bold font-mono fill-slate-800">
                  SCHEMATIC NET LEGEND
                </text>
                <line x1="10" y1="30" x2="40" y2="30" stroke="#ef4444" strokeWidth="2.5" />
                <text x="48" y="34" className="text-[9px] font-mono fill-slate-700">
                  +5V Power Rail (Regulated)
                </text>
                <line x1="10" y1="48" x2="40" y2="48" stroke="#2563eb" strokeWidth="2.5" />
                <text x="48" y="52" className="text-[9px] font-mono fill-slate-700">
                  Common Ground Return (GND)
                </text>
                <line x1="10" y1="66" x2="40" y2="66" stroke="#334155" strokeWidth="2" />
                <circle cx="25" cy="66" r="3.5" fill="#0f172a" />
                <text x="48" y="70" className="text-[9px] font-mono fill-slate-700">
                  Logic / Analog Net with Junction
                </text>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
