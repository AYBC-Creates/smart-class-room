import React, { useState } from 'react';
import { Download, Search, FileSpreadsheet, Package, Layers } from 'lucide-react';
import { BILL_OF_MATERIALS } from '../data/schematicData';
import { generateBomCsv, downloadFile } from '../utils/kicadExport';

export const BomViewer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('ALL');

  const sections = ['ALL', ...new Set(BILL_OF_MATERIALS.map((b) => b.section))];

  const filteredItems = BILL_OF_MATERIALS.filter((item) => {
    const matchesSearch =
      item.refDes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.package.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSection = selectedSection === 'ALL' || item.section === selectedSection;

    return matchesSearch && matchesSection;
  });

  const totalQuantity = BILL_OF_MATERIALS.reduce((sum, item) => sum + item.quantity, 0);

  const handleDownloadCsv = () => {
    const csvContent = generateBomCsv();
    downloadFile(csvContent, 'Smart_Classroom_Utility_BOM.csv', 'text/csv;charset=utf-8;');
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Controls Bar */}
      <div className="p-6 border-b border-slate-800 bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 font-mono">
            <Package className="w-5 h-5 text-blue-400" />
            BILL OF MATERIALS (BOM)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            District-Level PCB Competition Specification · 16 Line Items · {totalQuantity} Total Components
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search RefDes, value, package..."
              className="pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-64"
            />
          </div>

          {/* Export CSV button */}
          <button
            onClick={handleDownloadCsv}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Section Filter Pills */}
      <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-400 text-[11px] font-mono mr-2 shrink-0">FILTER SECTION:</span>
        {sections.map((sec) => (
          <button
            key={sec}
            onClick={() => setSelectedSection(sec)}
            className={`px-3 py-1 rounded-md font-mono text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
              selectedSection === sec
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto p-6">
        <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900 shadow-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4 font-bold text-slate-300">RefDes</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4 text-blue-400">Value / Device</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-teal-400">Package / Footprint</th>
                <th className="py-3 px-4">Functional Section</th>
                <th className="py-3 px-4">Design Notes & Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredItems.map((item) => (
                <tr key={item.itemNumber} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 text-center text-slate-500">{item.itemNumber}</td>
                  <td className="py-3 px-4 font-bold text-white">{item.refDes}</td>
                  <td className="py-3 px-4 text-center font-bold text-amber-400">{item.quantity}</td>
                  <td className="py-3 px-4 font-semibold text-blue-300">{item.value}</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">{item.description}</td>
                  <td className="py-3 px-4 text-teal-300 text-[11px]">{item.package}</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">{item.section}</td>
                  <td className="py-3 px-4 text-slate-400 text-[11px] font-sans leading-relaxed">
                    {item.notes}
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 font-sans">
                    No components match your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
