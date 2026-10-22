import { BILL_OF_MATERIALS, SCHEMATIC_COMPONENTS } from '../data/schematicData';

/**
 * Generates an official KiCad 8/9 PCB Editor compatible netlist (.net) file
 */
export function generateKiCadNetlist(): string {
  const dateStr = new Date().toISOString();
  
  // Collect unique nets
  const netMap = new Map<string, { ref: string; pin: string | number }[]>();
  
  SCHEMATIC_COMPONENTS.forEach((comp) => {
    comp.pins.forEach((pin) => {
      const netName = pin.net;
      if (!netMap.has(netName)) {
        netMap.set(netName, []);
      }
      netMap.get(netName)!.push({ ref: comp.refDes, pin: pin.number });
    });
  });

  let kicadStr = `(export (version "E")
  (design
    (source "Smart_Classroom_Utility_Management_System.kicad_sch")
    (date "${dateStr}")
    (tool "AI Studio EDA Engine / KiCad 8.0 Generator")
    (sheet (number "1") (name "/") (tstamps "/")
      (title_block
        (title "Smart Classroom Utility Management System with Examination Mode")
        (company "District PCB Design Competition")
        (rev "1.0")
        (date "2026-10-22")
        (source "Smart_Classroom_Management.kicad_sch")
        (comment (number "1") (value "Low-Voltage Demonstration System (+5V DC SELV)"))
        (comment (number "2") (value "Arduino Nano ATmega328P with Dual Light & Fan PWM MOSFET Drivers"))
      )
    )
  )
  (components
`;

  SCHEMATIC_COMPONENTS.forEach((comp) => {
    kicadStr += `    (comp (ref "${comp.refDes}")
      (value "${comp.value}")
      (footprint "${comp.kicadFootprint || comp.package}")
      (description "${comp.description}")
      (fields
        (field (name "Manufacturer") "${comp.section}")
        (field (name "VoltageRating") "${comp.voltageRating || 'N/A'}")
        (field (name "CurrentRating") "${comp.currentRating || 'N/A'}")
      )
      (libsource (lib "Device") (part "${comp.deviceType.toUpperCase()}") (description "${comp.description}"))
      (sheetpath (names "/") (tstamps "/"))
    )\n`;
  });

  kicadStr += `  )
  (nets
`;

  let netCode = 1;
  netMap.forEach((pins, netName) => {
    kicadStr += `    (net (code "${netCode++}") (name "${netName}")\n`;
    pins.forEach((p) => {
      kicadStr += `      (node (ref "${p.ref}") (pin "${p.pin}"))\n`;
    });
    kicadStr += `    )\n`;
  });

  kicadStr += `  )
)
`;

  return kicadStr;
}

/**
 * Generates comma-separated values (CSV) Bill of Materials ready for Excel, Digikey, Mouser
 */
export function generateBomCsv(): string {
  const headers = [
    'Item #',
    'Reference Designators',
    'Qty',
    'Value / Specification',
    'Device Description',
    'Package / Footprint',
    'Functional Section',
    'Manufacturer / Part Number',
    'Design Verification Notes',
  ];

  const rows = BILL_OF_MATERIALS.map((b) => [
    b.itemNumber,
    `"${b.refDes}"`,
    b.quantity,
    `"${b.value}"`,
    `"${b.description.replace(/"/g, '""')}"`,
    `"${b.package}"`,
    `"${b.section}"`,
    `"${b.manufacturerPart || ''}"`,
    `"${b.notes.replace(/"/g, '""')}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

/**
 * Downloads a text file directly in the browser
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
