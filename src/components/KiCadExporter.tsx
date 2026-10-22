import React, { useState } from 'react';
import { Download, Copy, Check, FileCode, Layers, ShieldCheck, Cpu } from 'lucide-react';
import { generateKiCadNetlist, downloadFile } from '../utils/kicadExport';
import { SCHEMATIC_COMPONENTS } from '../data/schematicData';

export const KiCadExporter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const netlist = generateKiCadNetlist();

  const handleCopy = () => {
    navigator.clipboard.writeText(netlist);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadNetlist = () => {
    downloadFile(
      netlist,
      'Smart_Classroom_Utility_Management_System.net',
      'text/plain;charset=utf-8;'
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 font-mono">
            <FileCode className="w-5 h-5 text-teal-400" />
            KiCad EDA PACKAGE & PCB LAYOUT RULES
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Official KiCad 8 / 9 PCB Editor (.net) Netlist & Physical Design Rules for District Competition
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Netlist' : 'Copy Netlist'}
          </button>

          <button
            onClick={handleDownloadNetlist}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download .net Netlist
          </button>
        </div>
      </div>

      {/* PCB Layout Best Practices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            Trace Width Guidelines (IPC-2221)
          </div>
          <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed font-sans">
            <p>
              <strong className="text-white font-mono">Power & Load Traces:</strong> Minimum 1.5 mm (60 mil) width on 1 oz copper for J1 (+5V_IN), J2, J3 (Lights), and Q1/Q2 drain returns.
            </p>
            <p>
              <strong className="text-white font-mono">Signal Traces:</strong> 0.25 mm – 0.30 mm (10–12 mil) for Arduino I/O, LDR sensor lines, and DHT22 data.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Decoupling & Ground Plane
          </div>
          <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed font-sans">
            <p>
              <strong className="text-white font-mono">Capacitor Placement:</strong> Place C2 (100 nF ceramic) within 5 mm of Arduino Nano Pin 27 (+5V) and GND Pin 29.
            </p>
            <p>
              <strong className="text-white font-mono">Ground Return:</strong> Continuous bottom layer ground pour. Avoid routing signal traces through high-current MOSFET return paths.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            Inductive Diode Placement
          </div>
          <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed font-sans">
            <p>
              <strong className="text-white font-mono">Flyback Loop Area:</strong> Place 1N5819 diode D1 immediately adjacent to the J4 screw terminal pins to minimize high-frequency inductive loop radiated EMI.
            </p>
            <p>
              <strong className="text-white font-mono">Isolation:</strong> Keep sensitive analog divider traces (A0, A1) physically separated from switching MOSFET drains.
            </p>
          </div>
        </div>
      </div>

      {/* Netlist Preview Area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-300 uppercase">
            KiCad Netlist Code (Direct Import into KiCad 8.x / 9.x)
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            Export Format: E (S-Expression)
          </span>
        </div>

        <pre className="p-4 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-teal-300 overflow-x-auto max-h-96 leading-relaxed select-all">
          {netlist}
        </pre>
      </div>

      {/* Footprint Assignment Guide */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold font-mono tracking-wide text-white uppercase">
          Standard KiCad Library Footprint Mapping
        </h3>

        <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900 shadow-xl">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400">
                <th className="py-2.5 px-4">RefDes</th>
                <th className="py-2.5 px-4">Device Value</th>
                <th className="py-2.5 px-4">Physical Package</th>
                <th className="py-2.5 px-4 text-blue-400">Recommended KiCad 8 Footprint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {SCHEMATIC_COMPONENTS.map((c) => (
                <tr key={c.refDes} className="hover:bg-slate-800/40">
                  <td className="py-2.5 px-4 font-bold text-white">{c.refDes}</td>
                  <td className="py-2.5 px-4 text-teal-300">{c.value}</td>
                  <td className="py-2.5 px-4 text-slate-400 font-sans">{c.package}</td>
                  <td className="py-2.5 px-4 text-amber-300">{c.kicadFootprint || c.package}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
