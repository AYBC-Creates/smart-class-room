export interface Pin {
  id: string;
  number: string | number;
  name: string;
  type: 'power_in' | 'power_out' | 'input' | 'output' | 'bidirectional' | 'passive';
  net: string;
  x: number;
  y: number;
  orientation?: 'left' | 'right' | 'top' | 'bottom';
  description?: string;
}

export interface SchematicComponent {
  refDes: string;
  value: string;
  deviceType: 'mcu' | 'mosfet' | 'resistor' | 'capacitor' | 'diode' | 'sensor' | 'connector' | 'switch' | 'led';
  section: string;
  sectionId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  pins: Pin[];
  package: string;
  description: string;
  voltageRating?: string;
  currentRating?: string;
  kicadFootprint?: string;
  designNotes?: string;
}

export interface WireSegment {
  id: string;
  net: string;
  points: { x: number; y: number }[];
  isBus?: boolean;
}

export interface JunctionDot {
  id: string;
  x: number;
  y: number;
  net: string;
}

export interface NetLabel {
  id: string;
  net: string;
  text: string;
  x: number;
  y: number;
  orientation?: 'horizontal' | 'vertical';
  type: 'power' | 'ground' | 'signal';
}

export interface SchematicSection {
  id: string;
  letter: string;
  title: string;
  description: string;
  bounds: { x: number; y: number; width: number; height: number };
  color: string;
  fillColor: string;
}

export interface BomItem {
  itemNumber: number;
  refDes: string;
  quantity: number;
  value: string;
  description: string;
  package: string;
  section: string;
  manufacturerPart?: string;
  notes: string;
}

export interface ErcCheck {
  id: string;
  category: 'connectivity' | 'power' | 'protection' | 'component' | 'thermal';
  title: string;
  status: 'passed' | 'warning' | 'info';
  details: string;
  referenceReq: string;
}
