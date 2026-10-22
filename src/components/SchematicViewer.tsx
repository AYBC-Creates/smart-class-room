import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Info,
  Layers,
  Sparkles,
  MousePointer,
  Printer,
} from 'lucide-react';
import {
  SCHEMATIC_SECTIONS,
  SCHEMATIC_COMPONENTS,
  SCHEMATIC_WIRES,
  SCHEMATIC_JUNCTIONS,
  SCHEMATIC_NET_LABELS,
} from '../data/schematicData';
import { SchematicComponent } from '../types/schematic';
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

interface SchematicViewerProps {
  onSelectComponent: (component: SchematicComponent | null) => void;
  selectedComponent: SchematicComponent | null;
  highlightedNet: string | null;
  onSelectNet: (net: string | null) => void;
  onOpenPrintView: () => void;
}

export const SchematicViewer: React.FC<SchematicViewerProps> = ({
  onSelectComponent,
  selectedComponent,
  highlightedNet,
  onSelectNet,
  onOpenPrintView,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Pan & Zoom state
  const [scale, setScale] = useState<number>(0.85);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 20, y: 10 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Visual toggles
  const [showSections, setShowSections] = useState<boolean>(true);
  const [showNetLabels, setShowNetLabels] = useState<boolean>(true);
  const [showRulerGrid, setShowRulerGrid] = useState<boolean>(true);
  const [hoveredNet, setHoveredNet] = useState<string | null>(null);

  const activeNet = highlightedNet || hoveredNet;

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = Math.min(Math.max(scale * zoomFactor, 0.4), 2.8);
    setScale(newScale);
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && (e.target as HTMLElement).tagName === 'svg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset view to fit
  const handleResetZoom = () => {
    setScale(0.85);
    setPan({ x: 20, y: 10 });
  };

  // SVG Export function
  const handleExportSvg = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Smart_Classroom_Utility_Schematic_A3.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Render Component Symbol according to its device type
  const renderComponentSymbol = (comp: SchematicComponent) => {
    const isSelected = selectedComponent?.refDes === comp.refDes;
    const isHovered = false;

    const commonProps = {
      key: comp.refDes,
      component: comp,
      isSelected,
      isHovered,
      highlightedNet: activeNet,
      onClick: () => onSelectComponent(comp),
      onPinHover: (net: string | null) => setHoveredNet(net),
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
    <div className="relative w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Floating Canvas Toolbar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-1.5 shadow-xl">
        <button
          onClick={() => setScale((s) => Math.min(s + 0.15, 2.8))}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setScale((s) => Math.max(s - 0.15, 0.4))}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title="Fit to Screen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-700 mx-1" />

        <button
          onClick={() => setShowSections((prev) => !prev)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
            showSections
              ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Toggle Functional Section Borders"
        >
          <Layers className="w-3.5 h-3.5" />
          Sections
        </button>

        <button
          onClick={() => setShowNetLabels((prev) => !prev)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
            showNetLabels
              ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Toggle Net Signal Labels"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Nets
        </button>

        <button
          onClick={() => setShowRulerGrid((prev) => !prev)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
            showRulerGrid
              ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Toggle Standard CAD Reference Grid (A-D, 1-8)"
        >
          <MousePointer className="w-3.5 h-3.5" />
          Grid
        </button>

        <div className="w-px h-5 bg-slate-700 mx-1" />

        <button
          onClick={handleExportSvg}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
          title="Export Standalone Vector SVG Drawing"
        >
          <Download className="w-3.5 h-3.5" />
          Vector SVG
        </button>

        <button
          onClick={onOpenPrintView}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md transition-colors"
          title="Open Official A3 Landscape Print Layout"
        >
          <Printer className="w-3.5 h-3.5" />
          A3 Print
        </button>
      </div>

      {/* Interactive Active Net Telemetry Pill */}
      {activeNet && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-amber-950/90 border border-amber-600/60 rounded-xl px-3.5 py-2 shadow-xl backdrop-blur-md">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold text-amber-200">
            Active Net: <span className="text-amber-400 font-bold">{activeNet}</span>
          </span>
          <button
            onClick={() => {
              onSelectNet(null);
              setHoveredNet(null);
            }}
            className="ml-2 text-xs text-amber-300 hover:text-white underline cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}

      {/* Main CAD Canvas Area */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="flex-1 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing bg-slate-950 flex items-center justify-center p-4"
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.08s ease-out',
          }}
          className="shadow-2xl rounded-sm transition-shadow duration-300"
        >
          <svg
            ref={svgRef}
            width="1800"
            height="1240"
            viewBox="0 0 1800 1240"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-white rounded border border-slate-400 shadow-2xl"
          >
            <defs>
              {/* Subtle schematic background grid pattern */}
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="0.8" />
              </pattern>
              <pattern id="majorGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#grid)" />
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#e2e8f0" strokeWidth="1.2" />
              </pattern>
            </defs>

            {/* Background Grid */}
            <rect width="1800" height="1240" fill="url(#majorGrid)" />

            {/* Outer Drawing Border (A3 Standard Engineering Frame) */}
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

            {/* Reference Grid Coordinates (1-8 and A-D) */}
            {showRulerGrid && (
              <g className="select-none font-mono text-[11px] font-bold fill-slate-700">
                {/* Horizontal columns 1 to 8 */}
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

                {/* Vertical rows A to D */}
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
            )}

            {/* SECTION BACKGROUNDS & BOUNDARIES */}
            {showSections &&
              SCHEMATIC_SECTIONS.map((sec) => (
                <g key={sec.id}>
                  {/* Subtle shaded box */}
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
                  {/* Section Title Header Badge */}
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
                    className="text-[12px] font-bold font-mono select-none"
                    fill={sec.color}
                  >
                    SEC {sec.letter}: {sec.title}
                  </text>
                </g>
              ))}

            {/* WIRE ROUTING NETS */}
            <g id="wires-layer">
              {SCHEMATIC_WIRES.map((wire) => {
                const isWireActive = wire.net === activeNet;
                const isPowerNet = wire.net === '+5V';
                const isGndNet = wire.net === 'GND';

                let strokeColor = '#334155';
                let strokeWidth = 2;

                if (isPowerNet) {
                  strokeColor = isWireActive ? '#dc2626' : '#ef4444';
                  strokeWidth = isWireActive ? 4 : 2.5;
                } else if (isGndNet) {
                  strokeColor = isWireActive ? '#1d4ed8' : '#2563eb';
                  strokeWidth = isWireActive ? 4 : 2.5;
                } else if (isWireActive) {
                  strokeColor = '#d97706';
                  strokeWidth = 3.5;
                }

                // Construct SVG polyline path string
                const pathStr = wire.points.reduce((acc, pt, idx) => {
                  return `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
                }, '');

                return (
                  <g
                    key={wire.id}
                    className="cursor-pointer group"
                    onClick={() => onSelectNet(wire.net)}
                    onMouseEnter={() => setHoveredNet(wire.net)}
                    onMouseLeave={() => setHoveredNet(null)}
                  >
                    {/* Invisible fat hit-area for easy hover/clicking */}
                    <path
                      d={pathStr}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Active Halo Glow */}
                    {isWireActive && (
                      <path
                        d={pathStr}
                        fill="none"
                        stroke={isPowerNet ? '#f87171' : isGndNet ? '#60a5fa' : '#fbbf24'}
                        strokeWidth="8"
                        strokeOpacity="0.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* Crisp Core Wire Path */}
                    <path
                      d={pathStr}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                    />
                  </g>
                );
              })}
            </g>

            {/* SOLDER JUNCTION DOTS */}
            <g id="junctions-layer">
              {SCHEMATIC_JUNCTIONS.map((j) => {
                const isJunctionActive = j.net === activeNet;
                const dotColor =
                  j.net === '+5V' ? '#ef4444' : j.net === 'GND' ? '#2563eb' : '#0f172a';

                return (
                  <circle
                    key={j.id}
                    cx={j.x}
                    cy={j.y}
                    r={isJunctionActive ? 5.5 : 4}
                    fill={isJunctionActive ? '#f59e0b' : dotColor}
                    stroke="#ffffff"
                    strokeWidth="1"
                    className="cursor-pointer"
                    onClick={() => onSelectNet(j.net)}
                    onMouseEnter={() => setHoveredNet(j.net)}
                    onMouseLeave={() => setHoveredNet(null)}
                  />
                );
              })}
            </g>

            {/* SCHEMATIC COMPONENTS */}
            <g id="components-layer">
              {SCHEMATIC_COMPONENTS.map((comp) => renderComponentSymbol(comp))}
            </g>

            {/* NET LABELS & ARROWS */}
            {showNetLabels && (
              <g id="net-labels-layer">
                {SCHEMATIC_NET_LABELS.map((lbl) => {
                  const isLabelActive = lbl.net === activeNet;
                  const bgFill =
                    lbl.type === 'power'
                      ? '#fee2e2'
                      : lbl.type === 'ground'
                      ? '#dbeafe'
                      : '#fef3c7';
                  const textFill =
                    lbl.type === 'power'
                      ? '#b91c1c'
                      : lbl.type === 'ground'
                      ? '#1d4ed8'
                      : '#b45309';
                  const borderStroke =
                    lbl.type === 'power'
                      ? '#ef4444'
                      : lbl.type === 'ground'
                      ? '#3b82f6'
                      : '#f59e0b';

                  return (
                    <g
                      key={lbl.id}
                      className="cursor-pointer select-none"
                      onClick={() => onSelectNet(lbl.net)}
                      onMouseEnter={() => setHoveredNet(lbl.net)}
                      onMouseLeave={() => setHoveredNet(null)}
                    >
                      <rect
                        x={lbl.x - 4}
                        y={lbl.y - 14}
                        width={lbl.text.length * 7.5 + 8}
                        height="18"
                        fill={isLabelActive ? '#fef08a' : bgFill}
                        stroke={isLabelActive ? '#ca8a04' : borderStroke}
                        strokeWidth={isLabelActive ? 1.8 : 1}
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
              </g>
            )}

            {/* TITLE BLOCK & COMPETITION DOCUMENTATION (Bottom Right: 1220 to 1760) */}
            <g id="title-block" className="select-none">
              {/* Outer boundary */}
              <rect
                x="1220"
                y="1115"
                width="540"
                height="105"
                fill="#ffffff"
                stroke="#0f172a"
                strokeWidth="2"
              />
              {/* Internal grid lines */}
              <line x1="1220" y1="1145" x2="1760" y2="1145" stroke="#0f172a" strokeWidth="1.5" />
              <line x1="1220" y1="1185" x2="1760" y2="1185" stroke="#0f172a" strokeWidth="1.5" />
              <line x1="1520" y1="1145" x2="1520" y2="1220" stroke="#0f172a" strokeWidth="1.5" />
              <line x1="1640" y1="1185" x2="1640" y2="1220" stroke="#0f172a" strokeWidth="1.5" />

              {/* Title Header */}
              <text x="1230" y="1135" className="text-[13px] font-bold font-mono fill-slate-900">
                SMART CLASSROOM UTILITY MANAGEMENT SYSTEM
              </text>
              <text x="1230" y="1162" className="text-[11px] font-mono fill-slate-600">
                DISTRICT-LEVEL PCB DESIGN COMPETITION
              </text>
              <text x="1230" y="1178" className="text-[10px] font-mono font-semibold fill-blue-700">
                WITH INTEGRATED EXAMINATION MODE & DUAL-ZONE DAYLIGHTING
              </text>

              {/* Revision & Drawing Info */}
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

            {/* LEGEND & ENGINEERING NOTES (Bottom Left: 40 to 1200) */}
            <g id="drawing-notes" className="select-none">
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

              {/* Mini Legend Box inside */}
              <g transform="translate(930, 1122)">
                <rect width="260" height="90" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" rx="3" />
                <text x="10" y="16" className="text-[10px] font-bold font-mono fill-slate-800">
                  SCHEMATIC NET LEGEND
                </text>
                {/* +5V line */}
                <line x1="10" y1="30" x2="40" y2="30" stroke="#ef4444" strokeWidth="2.5" />
                <text x="48" y="34" className="text-[9px] font-mono fill-slate-700">
                  +5V Power Rail (Regulated)
                </text>
                {/* GND line */}
                <line x1="10" y1="48" x2="40" y2="48" stroke="#2563eb" strokeWidth="2.5" />
                <text x="48" y="52" className="text-[9px] font-mono fill-slate-700">
                  Common Ground Return (GND)
                </text>
                {/* Signal line */}
                <line x1="10" y1="66" x2="40" y2="66" stroke="#334155" strokeWidth="2" />
                <circle cx="25" cy="66" r="3.5" fill="#0f172a" />
                <text x="48" y="70" className="text-[9px] font-mono fill-slate-700">
                  Logic / Analog Net with Junction Dot
                </text>
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Bottom Status & Quick Guide Bar */}
      <div className="h-10 bg-slate-900 border-t border-slate-800 px-6 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Schematic Validated · All 8 Sections Integrated
          </span>
          <span>·</span>
          <span>Click any component or net to inspect connections & specifications</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span>Zoom: {Math.round(scale * 100)}%</span>
          <span>·</span>
          <span>Pan: ({Math.round(pan.x)}, {Math.round(pan.y)})</span>
          <span>·</span>
          <span>Standard: A3 (420 x 297mm)</span>
        </div>
      </div>
    </div>
  );
};
