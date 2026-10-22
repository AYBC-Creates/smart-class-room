import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  FileSpreadsheet,
  ShieldCheck,
  Activity,
  FileCode,
  Printer,
  Sparkles,
} from 'lucide-react';
import { SchematicViewer } from './components/SchematicViewer';
import { ComponentInspector } from './components/ComponentInspector';
import { BomViewer } from './components/BomViewer';
import { ErcReport } from './components/ErcReport';
import { CircuitSimulator } from './components/CircuitSimulator';
import { KiCadExporter } from './components/KiCadExporter';
import { PrintA3View } from './components/PrintA3View';
import { SchematicComponent } from './types/schematic';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'schematic' | 'bom' | 'erc' | 'simulator' | 'kicad'
  >('schematic');
  const [selectedComponent, setSelectedComponent] = useState<SchematicComponent | null>(null);
  const [highlightedNet, setHighlightedNet] = useState<string | null>(null);
  const [isPrintViewOpen, setIsPrintViewOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      {/* 
        Top Bar Contract:
        [Zone 1: Brand title, one line] — [Zone 2: 4-5 nav links, 1-2 word labels, single line] — [Zone 3: 1 primary action]
      */}
      <header className="h-14 px-6 border-b border-slate-800 bg-slate-900 flex items-center justify-between gap-8 shrink-0 select-none z-20">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white font-mono">
            Smart Classroom Utility EDA
          </span>
        </div>

        {/* Zone 2: Navigation Links / Segmented View Selectors */}
        <nav className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('schematic')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'schematic'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Schematic CAD
          </button>
          <button
            onClick={() => setActiveTab('bom')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'bom'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Bill of Materials
          </button>
          <button
            onClick={() => setActiveTab('erc')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'erc'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            ERC Rules Audit
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Logic Simulator
          </button>
          <button
            onClick={() => setActiveTab('kicad')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'kicad'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            KiCad Package
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsPrintViewOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            A3 Print Sheet
          </button>
        </div>
      </header>

      {/* Main Workspace Stage */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Schematic CAD View */}
        {activeTab === 'schematic' && (
          <div className="flex-1 flex h-full w-full overflow-hidden">
            <SchematicViewer
              selectedComponent={selectedComponent}
              onSelectComponent={(comp) => setSelectedComponent(comp)}
              highlightedNet={highlightedNet}
              onSelectNet={(net) => setHighlightedNet(net)}
              onOpenPrintView={() => setIsPrintViewOpen(true)}
            />

            {/* Component Inspector Drawer */}
            {selectedComponent && (
              <ComponentInspector
                component={selectedComponent}
                onClose={() => setSelectedComponent(null)}
                onSelectNet={(net) => setHighlightedNet(net)}
                highlightedNet={highlightedNet}
              />
            )}
          </div>
        )}

        {/* Bill of Materials View */}
        {activeTab === 'bom' && <BomViewer />}

        {/* ERC & Design Audit Report */}
        {activeTab === 'erc' && <ErcReport />}

        {/* Interactive Circuit & Examination Mode Simulator */}
        {activeTab === 'simulator' && <CircuitSimulator />}

        {/* KiCad EDA Package & Netlist */}
        {activeTab === 'kicad' && <KiCadExporter />}
      </main>

      {/* Printable A3 Full-Screen Modal */}
      {isPrintViewOpen && (
        <PrintA3View onClose={() => setIsPrintViewOpen(false)} />
      )}
    </div>
  );
}
