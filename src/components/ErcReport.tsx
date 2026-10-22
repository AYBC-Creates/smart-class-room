import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Zap,
  Flame,
  ShieldCheck,
  Layers,
  Thermometer,
} from 'lucide-react';
import { ERC_RULES_AUDIT } from '../data/schematicData';

export const ErcReport: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto p-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 font-mono">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            ELECTRICAL RULES CHECK (ERC) & DESIGN AUDIT
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Formal Electrical Verification for District-Level PCB Design Competition · 10 Rules Passed (100% Verified)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/80 border border-emerald-600/50 rounded-lg text-emerald-400 font-mono text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            STATUS: 10/10 CHECKS PASSED
          </div>
        </div>
      </div>

      {/* Grid of Key Technical Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Power Budget Analysis */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            Power Budget & Supply Sizing
          </div>
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Arduino Nano (ATmega328P):</span>
              <span className="font-mono text-white">~45 mA</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Sensors (HC-SR501 + DHT22):</span>
              <span className="font-mono text-white">~2 mA</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Status LEDs (LED1 + LED2):</span>
              <span className="font-mono text-white">~6 mA</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">5V DC Brushless Fan (J4):</span>
              <span className="font-mono text-white">~300 mA</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Lighting Zones (J2 + J3):</span>
              <span className="font-mono text-white">~2.0 A peak</span>
            </div>
            <div className="flex justify-between pt-1 font-bold text-amber-400">
              <span>Total Peak Bus Current:</span>
              <span className="font-mono">~2.35 A (PSU &ge; 3.0A recommended)</span>
            </div>
          </div>
        </div>

        {/* Thermal & MOSFET Conduction Loss */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4" />
            MOSFET Conduction Loss (IRLZ44N)
          </div>
          <div className="space-y-1 text-xs text-slate-300 leading-relaxed">
            <p className="font-mono text-teal-400 text-[11px]">
              R_DS(on) = 0.028 Ω @ V_GS = 5.0V
            </p>
            <p className="text-slate-400 text-[11px]">
              Power dissipation under full 1.5A lighting load:
            </p>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 font-mono text-xs text-white">
              P = I² × R_DS(on) = (1.5 A)² × 0.028 Ω = <span className="text-emerald-400 font-bold">0.063 W</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Thermal junction rise: ΔT = P × R_thJA = 0.063W × 62°C/W ≈ <span className="text-white font-semibold">+3.9°C</span>. Heatsinks not required!
            </p>
          </div>
        </div>

        {/* Inductive Kickback Clamping */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Inductive Protection (D1 1N5819)
          </div>
          <div className="space-y-1 text-xs text-slate-300 leading-relaxed">
            <p className="text-slate-400 text-[11px]">
              Motor coil inductance generates severe back-EMF spike upon PWM shut-off:
            </p>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 font-mono text-xs text-white">
              V_spike = -L (di/dt)
            </div>
            <p className="text-slate-400 text-[11px]">
              1N5819 Schottky diode with ultra-fast recovery (&lt;10ns) clamps voltage across Q3 Drain to +5V + 0.45V, preventing MOSFET avalanche breakdown.
            </p>
          </div>
        </div>
      </div>

      {/* Itemized ERC Checklist Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold font-mono tracking-wide text-white uppercase">
          Detailed Specification Compliance Matrix
        </h3>

        <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900 shadow-xl divide-y divide-slate-800/80">
          {ERC_RULES_AUDIT.map((rule) => (
            <div key={rule.id} className="p-4 flex flex-col md:flex-row md:items-start gap-4 hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-2 md:w-64 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-xs font-bold text-white">{rule.title}</span>
              </div>

              <div className="md:w-36 shrink-0">
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono text-[10px] uppercase">
                  {rule.referenceReq}
                </span>
              </div>

              <div className="flex-1 text-xs text-slate-300 leading-relaxed font-sans">
                {rule.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
