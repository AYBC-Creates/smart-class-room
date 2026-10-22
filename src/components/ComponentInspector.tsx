import React from 'react';
import { X, ExternalLink, Cpu, ShieldCheck, Zap, Layers } from 'lucide-react';
import { SchematicComponent } from '../types/schematic';

interface ComponentInspectorProps {
  component: SchematicComponent | null;
  onClose: () => void;
  onSelectNet: (net: string) => void;
  highlightedNet: string | null;
}

export const ComponentInspector: React.FC<ComponentInspectorProps> = ({
  component,
  onClose,
  onSelectNet,
  highlightedNet,
}) => {
  if (!component) return null;

  return (
    <div className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-full shadow-2xl z-30">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-sm">
            {component.refDes}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-mono tracking-tight">
              {component.value}
            </h3>
            <span className="text-xs text-slate-400">{component.section}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Close Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable details */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs text-slate-300">
        {/* Device Overview */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Description
          </label>
          <p className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 leading-relaxed text-slate-300">
            {component.description}
          </p>
        </div>

        {/* Electrical Ratings */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-400 block">Voltage Rating</span>
            <span className="font-mono font-semibold text-slate-200">
              {component.voltageRating || '5.0V Logic'}
            </span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-400 block">Current Capacity</span>
            <span className="font-mono font-semibold text-slate-200">
              {component.currentRating || 'Low-power'}
            </span>
          </div>
        </div>

        {/* KiCad Footprint Package */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            PCB Footprint & Package
          </label>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 font-mono text-[11px] text-teal-400 break-all select-all">
            {component.kicadFootprint || component.package}
          </div>
        </div>

        {/* Pin Connections Matrix */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Pin Terminations ({component.pins.length})
            </label>
            <span className="text-[10px] text-slate-500 font-mono">Click net to trace</span>
          </div>

          <div className="bg-slate-950 rounded-lg border border-slate-800/80 divide-y divide-slate-800/60 overflow-hidden">
            {component.pins.map((pin) => {
              const isPinNetActive = pin.net === highlightedNet;
              return (
                <div
                  key={pin.id}
                  onClick={() => onSelectNet(pin.net)}
                  className={`p-2.5 flex items-center justify-between hover:bg-slate-800/50 cursor-pointer transition-colors ${
                    isPinNetActive ? 'bg-amber-950/40 border-l-2 border-amber-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-400 w-6">#{pin.number}</span>
                    <span className="font-mono font-semibold text-white">{pin.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <span
                      className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                        pin.net === '+5V'
                          ? 'bg-red-950 text-red-400'
                          : pin.net === 'GND'
                          ? 'bg-blue-950 text-blue-400'
                          : 'bg-slate-800 text-amber-300'
                      }`}
                    >
                      {pin.net}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Design Verification Notes */}
        {component.designNotes && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Engineering Design Rationale
            </label>
            <div className="bg-emerald-950/20 border border-emerald-900/40 p-3 rounded-lg text-emerald-300/90 leading-relaxed text-[11px]">
              {component.designNotes}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 text-center text-[11px] text-slate-500 font-mono">
        Ref: {component.refDes} · Section {component.sectionId.replace('sec-', '').toUpperCase()}
      </div>
    </div>
  );
};
