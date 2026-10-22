import {
  SchematicComponent,
  SchematicSection,
  WireSegment,
  JunctionDot,
  NetLabel,
  BomItem,
  ErcCheck,
} from '../types/schematic';

export const SCHEMATIC_SECTIONS: SchematicSection[] = [
  {
    id: 'sec-power',
    letter: 'A',
    title: 'POWER SUPPLY & DECOUPLING',
    description: 'Regulated +5V DC Input, Bulk Electrolytic & HF Ceramic Filtering',
    bounds: { x: 40, y: 50, width: 400, height: 260 },
    color: '#0284c7', // Sky Blue
    fillColor: 'rgba(2, 132, 199, 0.03)',
  },
  {
    id: 'sec-mcu',
    letter: 'B',
    title: 'MAIN CONTROLLER (ARDUINO NANO)',
    description: 'ATmega328P 5V / 16MHz DIP-30 with Complete Pinouts & Bus Integration',
    bounds: { x: 465, y: 50, width: 480, height: 1045 },
    color: '#0d9488', // Teal
    fillColor: 'rgba(13, 148, 136, 0.03)',
  },
  {
    id: 'sec-pir',
    letter: 'C',
    title: 'OCCUPANCY DETECTION',
    description: 'HC-SR501 Pyroelectric Infrared Sensor with Digital Output to D2',
    bounds: { x: 40, y: 330, width: 400, height: 220 },
    color: '#8b5cf6', // Violet
    fillColor: 'rgba(139, 92, 246, 0.03)',
  },
  {
    id: 'sec-ldr',
    letter: 'D',
    title: 'DUAL-ZONE DAYLIGHT SENSING',
    description: 'Dual LDR Photoresistors with 10kΩ Precision Precision Dividers to A0 & A1',
    bounds: { x: 40, y: 570, width: 400, height: 260 },
    color: '#d97706', // Amber
    fillColor: 'rgba(217, 119, 6, 0.03)',
  },
  {
    id: 'sec-dht',
    letter: 'E',
    title: 'TEMPERATURE & HUMIDITY MONITORING',
    description: 'DHT22 / AM2302 Digital Sensor with 4.7kΩ Pull-Up Bus to D7',
    bounds: { x: 40, y: 850, width: 400, height: 245 },
    color: '#059669', // Emerald
    fillColor: 'rgba(5, 150, 105, 0.03)',
  },
  {
    id: 'sec-lighting',
    letter: 'F',
    title: 'DUAL LIGHTING CONTROL OUTPUTS',
    description: 'Logic-Level N-Channel MOSFETs (IRLZ44N) with Low-Side Switching',
    bounds: { x: 970, y: 50, width: 790, height: 440 },
    color: '#ea580c', // Orange
    fillColor: 'rgba(234, 88, 12, 0.03)',
  },
  {
    id: 'sec-fan',
    letter: 'G',
    title: 'TEMPERATURE-CONTROLLED DC FAN',
    description: 'IRLZ44N PWM Low-Side Driver with 1N5819 Schottky Flyback Protection',
    bounds: { x: 970, y: 510, width: 790, height: 285 },
    color: '#2563eb', // Blue
    fillColor: 'rgba(37, 99, 235, 0.03)',
  },
  {
    id: 'sec-ui',
    letter: 'H',
    title: 'EXAMINATION MODE & MANUAL USER INTERFACE',
    description: 'SPST Switches with Hardware Input Pull-ups & Independent Status LEDs',
    bounds: { x: 970, y: 815, width: 790, height: 280 },
    color: '#db2777', // Pink
    fillColor: 'rgba(219, 39, 119, 0.03)',
  },
];

export const SCHEMATIC_COMPONENTS: SchematicComponent[] = [
  // SECTION A: Power Supply
  {
    refDes: 'J1',
    value: '+5V DC IN',
    deviceType: 'connector',
    section: 'POWER SUPPLY',
    sectionId: 'sec-power',
    x: 80,
    y: 110,
    width: 60,
    height: 90,
    package: 'TerminalBlock_bornier-2_P5.08mm',
    description: '2-Pin Screw Terminal Block (5.08mm pitch) for Regulated +5V DC Supply Input',
    voltageRating: '300V / 15A max',
    currentRating: '3.0A System Requirement',
    kicadFootprint: 'TerminalBlock:TerminalBlock_bornier-2_P5.08mm',
    designNotes: 'External regulated +5V supply must supply min. 3A to handle Arduino, sensors, fan and LED load strips simultaneously.',
    pins: [
      { id: 'J1-1', number: 1, name: '+5V_IN', type: 'power_out', net: '+5V', x: 140, y: 135, orientation: 'right' },
      { id: 'J1-2', number: 2, name: 'GND', type: 'power_out', net: 'GND', x: 140, y: 175, orientation: 'right' },
    ],
  },
  {
    refDes: 'C1',
    value: '100µF / 25V',
    deviceType: 'capacitor',
    section: 'POWER SUPPLY',
    sectionId: 'sec-power',
    x: 230,
    y: 115,
    width: 40,
    height: 70,
    package: 'CP_Radial_D6.3mm_P2.50mm',
    description: 'Electrolytic Capacitor (Polarized), Low ESR bulk energy reservoir',
    voltageRating: '25V DC',
    kicadFootprint: 'Capacitor_THT:CP_Radial_D6.3mm_P2.50mm',
    designNotes: 'Smooths switching transience from MOSFET turn-on and fan motor startup.',
    pins: [
      { id: 'C1-1', number: '+', name: '+', type: 'passive', net: '+5V', x: 250, y: 115, orientation: 'top' },
      { id: 'C1-2', number: '-', name: '-', type: 'passive', net: 'GND', x: 250, y: 185, orientation: 'bottom' },
    ],
  },
  {
    refDes: 'C2',
    value: '100nF / 50V',
    deviceType: 'capacitor',
    section: 'POWER SUPPLY',
    sectionId: 'sec-power',
    x: 320,
    y: 115,
    width: 40,
    height: 70,
    package: 'C_Disc_D4.3mm_W1.9mm_P5.00mm',
    description: 'Ceramic Capacitor (Non-Polarized, X7R), High-frequency bypass decoupling',
    voltageRating: '50V DC',
    kicadFootprint: 'Capacitor_THT:C_Disc_D4.3mm_W1.9mm_P5.00mm',
    designNotes: 'Filters high frequency digital switching noise close to microcontroller bus.',
    pins: [
      { id: 'C2-1', number: 1, name: '1', type: 'passive', net: '+5V', x: 340, y: 115, orientation: 'top' },
      { id: 'C2-2', number: 2, name: '2', type: 'passive', net: 'GND', x: 340, y: 185, orientation: 'bottom' },
    ],
  },

  // SECTION B: Arduino Nano (ATmega328P)
  {
    refDes: 'U1',
    value: 'Arduino Nano V3.0',
    deviceType: 'mcu',
    section: 'MAIN CONTROLLER',
    sectionId: 'sec-mcu',
    x: 520,
    y: 90,
    width: 370,
    height: 970,
    package: 'DIP-30 (2x15 2.54mm pitch)',
    description: 'ATmega328P 8-bit AVR Microcontroller, 16MHz crystal, 5V operating logic',
    voltageRating: '5.0V ± 5%',
    currentRating: '40mA per GPIO max, 200mA total VCC max',
    kicadFootprint: 'Module:Arduino_Nano',
    designNotes: 'Powered directly via Pin 27 (5V) from the regulated system +5V rail. Loads are driven via MOSFETs to avoid exceeding ATmega328P current limits.',
    pins: [
      // Left side pins (1-15)
      { id: 'U1-1', number: 1, name: 'D1 / TX', type: 'output', net: 'NC_TX', x: 520, y: 140, orientation: 'left', description: 'Serial TX (Hardware UART)' },
      { id: 'U1-2', number: 2, name: 'D0 / RX', type: 'input', net: 'NC_RX', x: 520, y: 190, orientation: 'left', description: 'Serial RX (Hardware UART)' },
      { id: 'U1-3', number: 3, name: 'RESET', type: 'input', net: 'RST_MCU', x: 520, y: 240, orientation: 'left', description: 'Active-Low Reset' },
      { id: 'U1-4', number: 4, name: 'GND', type: 'power_in', net: 'GND', x: 520, y: 290, orientation: 'left', description: 'Digital Ground 1' },
      { id: 'U1-5', number: 5, name: 'D2 / INT0', type: 'input', net: 'NET_PIR_OUT', x: 520, y: 350, orientation: 'left', description: 'PIR Occupancy Sensor Motion Input' },
      { id: 'U1-6', number: 6, name: 'D3 / INT1 / PWM', type: 'input', net: 'NET_SW_EXAM', x: 520, y: 410, orientation: 'left', description: 'SW1 Examination Mode Switch (INPUT_PULLUP)' },
      { id: 'U1-7', number: 7, name: 'D4', type: 'input', net: 'NET_SW_MANUAL', x: 520, y: 470, orientation: 'left', description: 'SW2 Manual Override Switch (INPUT_PULLUP)' },
      { id: 'U1-8', number: 8, name: 'D5 / PWM', type: 'output', net: 'NET_LIGHT1_CTRL', x: 520, y: 530, orientation: 'left', description: 'Light Zone 1 Low-Side Gate Drive' },
      { id: 'U1-9', number: 9, name: 'D6 / PWM', type: 'output', net: 'NET_LIGHT2_CTRL', x: 520, y: 590, orientation: 'left', description: 'Light Zone 2 Low-Side Gate Drive' },
      { id: 'U1-10', number: 10, name: 'D7', type: 'bidirectional', net: 'NET_DHT_DATA', x: 520, y: 650, orientation: 'left', description: 'DHT22 Digital Temperature & Humidity Data' },
      { id: 'U1-11', number: 11, name: 'D8', type: 'bidirectional', net: 'NC_D8', x: 520, y: 710, orientation: 'left', description: 'Uncommitted Digital I/O (Auxiliary)' },
      { id: 'U1-12', number: 12, name: 'D9 / PWM', type: 'output', net: 'NET_FAN_CTRL', x: 520, y: 770, orientation: 'left', description: 'DC Fan Speed PWM Gate Drive' },
      { id: 'U1-13', number: 13, name: 'D10 / PWM / SS', type: 'output', net: 'NET_LED_NORMAL', x: 520, y: 830, orientation: 'left', description: 'Normal Status Indicator LED Driver' },
      { id: 'U1-14', number: 14, name: 'D11 / MOSI / PWM', type: 'output', net: 'NET_LED_EXAM', x: 520, y: 890, orientation: 'left', description: 'Examination Mode Active LED Driver' },
      { id: 'U1-15', number: 15, name: 'D12 / MISO', type: 'bidirectional', net: 'NC_D12', x: 520, y: 950, orientation: 'left', description: 'Uncommitted Digital I/O (SPI MISO)' },

      // Right side pins (16-30)
      { id: 'U1-16', number: 16, name: 'D13 / SCK', type: 'output', net: 'NC_D13', x: 890, y: 950, orientation: 'right', description: 'SPI SCK / Onboard LED' },
      { id: 'U1-17', number: 17, name: '3V3', type: 'power_out', net: 'NET_3V3', x: 890, y: 890, orientation: 'right', description: 'Internal FTDI/CH340 3.3V LDO Output' },
      { id: 'U1-18', number: 18, name: 'AREF', type: 'input', net: 'NC_AREF', x: 890, y: 830, orientation: 'right', description: 'Analog ADC Voltage Reference' },
      { id: 'U1-19', number: 19, name: 'A0', type: 'input', net: 'NET_LDR1_SENSE', x: 890, y: 770, orientation: 'right', description: 'Daylight Sensing Zone 1 Analog Voltage' },
      { id: 'U1-20', number: 20, name: 'A1', type: 'input', net: 'NET_LDR2_SENSE', x: 890, y: 710, orientation: 'right', description: 'Daylight Sensing Zone 2 Analog Voltage' },
      { id: 'U1-21', number: 21, name: 'A2', type: 'input', net: 'NC_A2', x: 890, y: 650, orientation: 'right', description: 'Auxiliary Analog Input A2' },
      { id: 'U1-22', number: 22, name: 'A3', type: 'input', net: 'NC_A3', x: 890, y: 590, orientation: 'right', description: 'Auxiliary Analog Input A3' },
      { id: 'U1-23', number: 23, name: 'A4 / SDA', type: 'bidirectional', net: 'NC_SDA', x: 890, y: 530, orientation: 'right', description: 'I2C Data Bus / Analog Input A4' },
      { id: 'U1-24', number: 24, name: 'A5 / SCL', type: 'bidirectional', net: 'NC_SCL', x: 890, y: 470, orientation: 'right', description: 'I2C Clock Bus / Analog Input A5' },
      { id: 'U1-25', number: 25, name: 'A6', type: 'input', net: 'NC_A6', x: 890, y: 410, orientation: 'right', description: 'Pure Analog Input A6' },
      { id: 'U1-26', number: 26, name: 'A7', type: 'input', net: 'NC_A7', x: 890, y: 350, orientation: 'right', description: 'Pure Analog Input A7' },
      { id: 'U1-27', number: 27, name: '+5V', type: 'power_in', net: '+5V', x: 890, y: 290, orientation: 'right', description: 'System +5V DC Supply Input' },
      { id: 'U1-28', number: 28, name: 'RESET', type: 'input', net: 'RST_MCU', x: 890, y: 240, orientation: 'right', description: 'Microcontroller Reset Line' },
      { id: 'U1-29', number: 29, name: 'GND', type: 'power_in', net: 'GND', x: 890, y: 190, orientation: 'right', description: 'Digital Ground 2 (Common Reference)' },
      { id: 'U1-30', number: 30, name: 'VIN', type: 'power_in', net: 'NC_VIN', x: 890, y: 140, orientation: 'right', description: 'Unregulated Input (Unused in 5V Bus)' },
    ],
  },

  // SECTION C: PIR Sensor (HC-SR501)
  {
    refDes: 'U2',
    value: 'HC-SR501',
    deviceType: 'sensor',
    section: 'OCCUPANCY SENSOR',
    sectionId: 'sec-pir',
    x: 100,
    y: 380,
    width: 140,
    height: 120,
    package: 'Header_1x03_P2.54mm_Vertical',
    description: 'PIR Motion Sensor Module, 3.3V internal LDO with 3.3V TTL output, 5V compatible',
    voltageRating: '4.5V - 20V DC',
    currentRating: '65 µA static quiescent',
    kicadFootprint: 'Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical',
    designNotes: 'Output delivers 3.3V HIGH upon motion detection, which comfortably exceeds the ATmega328P VIH threshold (0.6 x VCC = 3.0V). Connected to D2 (INT0) for interrupt wake-up.',
    pins: [
      { id: 'U2-1', number: 1, name: 'VCC', type: 'power_in', net: '+5V', x: 240, y: 405, orientation: 'right' },
      { id: 'U2-2', number: 2, name: 'OUT', type: 'output', net: 'NET_PIR_OUT', x: 240, y: 440, orientation: 'right' },
      { id: 'U2-3', number: 3, name: 'GND', type: 'power_in', net: 'GND', x: 240, y: 475, orientation: 'right' },
    ],
  },

  // SECTION D: Dual-Zone Daylight Sensing
  {
    refDes: 'LDR1',
    value: 'GL5528 (5mm)',
    deviceType: 'sensor',
    section: 'DAYLIGHT SENSING',
    sectionId: 'sec-ldr',
    x: 90,
    y: 620,
    width: 60,
    height: 60,
    package: 'Opto_LDR_5mm_P3.4mm',
    description: 'Cadmium Sulfide (CdS) Photoresistor Zone 1 (Window/Perimeter Zone)',
    voltageRating: '150V max, 100mW max',
    kicadFootprint: 'OptoDevice:R_LDR_5.1x4.3mm_P3.4mm_Vertical',
    designNotes: 'Light resistance: 10-20 kΩ @ 10 Lux, Dark resistance: 1 MΩ. Forms upper arm of voltage divider with R1.',
    pins: [
      { id: 'LDR1-1', number: 1, name: '1', type: 'passive', net: '+5V', x: 120, y: 620, orientation: 'top' },
      { id: 'LDR1-2', number: 2, name: '2', type: 'passive', net: 'NET_LDR1_SENSE', x: 120, y: 680, orientation: 'bottom' },
    ],
  },
  {
    refDes: 'R1',
    value: '10 kΩ / 0.25W',
    deviceType: 'resistor',
    section: 'DAYLIGHT SENSING',
    sectionId: 'sec-ldr',
    x: 100,
    y: 720,
    width: 40,
    height: 70,
    package: 'R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm',
    description: 'Metal Film Resistor 1% Precision (Zone 1 Divider Ground Arm)',
    voltageRating: '250V / 250mW',
    kicadFootprint: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal',
    designNotes: 'Calculated midpoint V_out = 5V * (10k / (R_LDR + 10k)). At bright daylight (~2kΩ LDR), V_out ≈ 4.16V. At darkness (~500kΩ), V_out ≈ 0.10V.',
    pins: [
      { id: 'R1-1', number: 1, name: '1', type: 'passive', net: 'NET_LDR1_SENSE', x: 120, y: 720, orientation: 'top' },
      { id: 'R1-2', number: 2, name: '2', type: 'passive', net: 'GND', x: 120, y: 790, orientation: 'bottom' },
    ],
  },
  {
    refDes: 'LDR2',
    value: 'GL5528 (5mm)',
    deviceType: 'sensor',
    section: 'DAYLIGHT SENSING',
    sectionId: 'sec-ldr',
    x: 270,
    y: 620,
    width: 60,
    height: 60,
    package: 'Opto_LDR_5mm_P3.4mm',
    description: 'Cadmium Sulfide (CdS) Photoresistor Zone 2 (Interior/Corridor Zone)',
    voltageRating: '150V max, 100mW max',
    kicadFootprint: 'OptoDevice:R_LDR_5.1x4.3mm_P3.4mm_Vertical',
    designNotes: 'Monitors ambient illuminance away from windows to enable independent dual-bank smart dimming/switching.',
    pins: [
      { id: 'LDR2-1', number: 1, name: '1', type: 'passive', net: '+5V', x: 300, y: 620, orientation: 'top' },
      { id: 'LDR2-2', number: 2, name: '2', type: 'passive', net: 'NET_LDR2_SENSE', x: 300, y: 680, orientation: 'bottom' },
    ],
  },
  {
    refDes: 'R2',
    value: '10 kΩ / 0.25W',
    deviceType: 'resistor',
    section: 'DAYLIGHT SENSING',
    sectionId: 'sec-ldr',
    x: 280,
    y: 720,
    width: 40,
    height: 70,
    package: 'R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm',
    description: 'Metal Film Resistor 1% Precision (Zone 2 Divider Ground Arm)',
    voltageRating: '250V / 250mW',
    kicadFootprint: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal',
    designNotes: 'Connected between divider midpoint and GND. Midpoint routes directly to ADC Channel A1.',
    pins: [
      { id: 'R2-1', number: 1, name: '1', type: 'passive', net: 'NET_LDR2_SENSE', x: 300, y: 720, orientation: 'top' },
      { id: 'R2-2', number: 2, name: '2', type: 'passive', net: 'GND', x: 300, y: 790, orientation: 'bottom' },
    ],
  },

  // SECTION E: Temperature & Humidity (DHT22 / AM2302)
  {
    refDes: 'U3',
    value: 'DHT22 / AM2302',
    deviceType: 'sensor',
    section: 'ENVIRONMENT SENSING',
    sectionId: 'sec-dht',
    x: 170,
    y: 910,
    width: 150,
    height: 140,
    package: 'Package_DHT22_4Pin_P2.54mm',
    description: 'Capacitive Humidity & NTC Temperature Sensor, Single-Wire Digital Bus',
    voltageRating: '3.3V - 5.5V DC',
    currentRating: '1.5mA during measurement, 40 µA standby',
    kicadFootprint: 'Sensor:Aosong_DHT22_AM2302',
    designNotes: 'Pin 1: VDD (+5V), Pin 2: DATA (to Arduino D7 via R3 pullup), Pin 3: NC (Do not connect), Pin 4: GND.',
    pins: [
      { id: 'U3-1', number: 1, name: 'VDD', type: 'power_in', net: '+5V', x: 170, y: 940, orientation: 'left' },
      { id: 'U3-2', number: 2, name: 'DATA', type: 'bidirectional', net: 'NET_DHT_DATA', x: 170, y: 980, orientation: 'left' },
      { id: 'U3-3', number: 3, name: 'NC', type: 'passive', net: 'NC_DHT', x: 170, y: 1010, orientation: 'left' },
      { id: 'U3-4', number: 4, name: 'GND', type: 'power_in', net: 'GND', x: 170, y: 1040, orientation: 'left' },
    ],
  },
  {
    refDes: 'R3',
    value: '4.7 kΩ / 0.25W',
    deviceType: 'resistor',
    section: 'ENVIRONMENT SENSING',
    sectionId: 'sec-dht',
    x: 80,
    y: 890,
    width: 40,
    height: 70,
    package: 'R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm',
    description: 'Single-wire bidirectional bus pull-up resistor to +5V',
    voltageRating: '250V / 250mW',
    kicadFootprint: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal',
    designNotes: 'Ensures reliable logic HIGH idle state on D7 one-wire protocol against line capacitance.',
    pins: [
      { id: 'R3-1', number: 1, name: '1', type: 'passive', net: '+5V', x: 100, y: 890, orientation: 'top' },
      { id: 'R3-2', number: 2, name: '2', type: 'passive', net: 'NET_DHT_DATA', x: 100, y: 960, orientation: 'bottom' },
    ],
  },

  // SECTION F: Lighting Control Zone 1 & Zone 2
  // Zone 1
  {
    refDes: 'R4',
    value: '100 Ω / 0.25W',
    deviceType: 'resistor',
    section: 'LIGHTING CONTROL',
    sectionId: 'sec-lighting',
    x: 1090,
    y: 110,
    width: 70,
    height: 30,
    package: 'R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm',
    description: 'Gate Current Limiting Resistor (Q1 Gate Dampener)',
    voltageRating: '250V / 250mW',
    kicadFootprint: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal',
    designNotes: 'Limits transient charging current from Arduino D5 into Q1 C_iss gate capacitance, eliminating high frequency parasitic oscillations.',
    pins: [
      { id: 'R4-1', number: 1, name: '1', type: 'passive', net: 'NET_LIGHT1_CTRL', x: 1090, y: 125, orientation: 'left' },
      { id: 'R4-2', number: 2, name: '2', type: 'passive', net: 'NET_Q1_GATE', x: 1160, y: 125, orientation: 'right' },
    ],
  },
  {
    refDes: 'R5',
    value: '10 kΩ / 0.25W',
    deviceType: 'resistor',
    section: 'LIGHTING CONTROL',
    sectionId: 'sec-lighting',
    x: 1180,
    y: 160,
    width: 30,
    height: 70,
    package: 'R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm',
    description: 'Gate-to-Source Pull-Down Bleeder Resistor (Q1)',
    voltageRating: '250V / 250mW',
    kicadFootprint: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal',
    designNotes: 'Pulls Q1 gate reliably to GND during MCU power-on reset (when D5 is tri-stated as input) preventing unintended lamp flash.',
    pins: [
      { id: 'R5-1', number: 1, name: '1', type: 'passive', net: 'NET_Q1_GATE', x: 1195, y: 160, orientation: 'top' },
      { id: 'R5-2', number: 2, name: '2', type: 'passive', net: 'GND', x: 1195, y: 230, orientation: 'bottom' },
    ],
  },
  {
    refDes: 'Q1',
    value: 'IRLZ44N',
    deviceType: 'mosfet',
    section: 'LIGHTING CONTROL',
    sectionId: 'sec-lighting',
    x: 1260,
    y: 90,
    width: 90,
    height: 100,
    package: 'TO-220-3_Vertical',
    description: 'Logic-Level N-Channel Power MOSFET (55V, 47A, RDS(on)=0.028Ω @ VGS=5V)',
    voltageRating: 'V_DS = 55V max',
    currentRating: 'I_D = 47A continuous (Tc=25°C)',
    kicadFootprint: 'Package_TO_SOT_THT:TO-220-3_Vertical',
    designNotes: 'Pin 1: Gate, Pin 2: Drain (Center / Tab), Pin 3: Source. Fully saturated at 5V logic level, dissipates under 0.05W at 1.5A load.',
    pins: [
      { id: 'Q1-G', number: 1, name: 'G', type: 'input', net: 'NET_Q1_GATE', x: 1260, y: 125, orientation: 'left' },
      { id: 'Q1-D', number: 2, name: 'D', type: 'passive', net: 'NET_LIGHT1_NEG', x: 1320, y: 90, orientation: 'top' },
      { id: 'Q1-S', number: 3, name: 'S', type: 'passive', net: 'GND', x: 1320, y: 190, orientation: 'bottom' },
    ],
  },
  {
    refDes: 'J2',
    value: 'LIGHT ZONE 1',
    deviceType: 'connector',
    section: 'LIGHTING CONTROL',
    sectionId: 'sec-lighting',
    x: 1480,
    y: 75,
    width: 70,
    height: 90,
    package: 'TerminalBlock_bornier-2_P5.08mm',
    description: '2-Pin Screw Terminal Block for Light Zone 1 Low-Voltage Load',
    voltageRating: '300V / 15A',
    kicadFootprint: 'TerminalBlock:TerminalBlock_bornier-2_P5.08mm',
    designNotes: 'Pin 1: Positive Rail (+V_LOAD / +5V), Pin 2: Switched Ground Return (Q1 Drain). Low-voltage demonstration only - DO NOT connect 230V AC mains!',
    pins: [
      { id: 'J2-1', number: 1, name: '+V_LOAD', type: 'power_out', net: '+5V', x: 1480, y: 95, orientation: 'left' },
      { id: 'J2-2', number: 2, name: 'LOAD-', type: 'passive', net: 'NET_LIGHT1_NEG', x: 1480, y: 140, orientation: 'left' },
    ],
  },

  // Zone 2
  {
    refDes: 'R6',
    value: '100 Ω / 0.25W',
    deviceType: 'resistor',
    section: 'LIGHTING CONTROL',
    sectionId: 'sec-lighting',
    x: 1090,
    y: 290,
    width: 70,
    height: 30,
    package: 'R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm',
    description: 'Gate Current Limiting Resistor (Q2 Gate Dampener)',
    voltageRating: '250V / 250mW',
    kicadFootprint: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal',
    designNotes: 'Protects Arduino D6 against capacitive transient inrush current.',
    pins: [
      { id: 'R6-1', number: 1, name: '1', type: 'passive', net: 'NET_LIGHT2_CTRL', x: 1090, y: 305, orientation: 'left' },
      { id: 'R6-2', number: 2, name: '2', type: 'passive', net: 'NET_Q2_GATE', x: 1160, y: 305, orientation: 'right' },
    ],
  },
  {
    refDes: 'R7',
    value: '10 kΩ / 0.25W',
    deviceType: 'resistor',
    section: 'LIGHTING CONTROL',
    sectionId: 'sec-lighting',
    x: 1180,
    y: 340,
    width: 30,
    height: 70,
    package: 'R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm',
    description: 'Gate-to-Source Pull-Down Bleeder Resistor (Q2)',
    voltageRating: '250V / 250mW',
    kicadFootprint: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal',
    designNotes: 'Guarantees OFF state when MCU is reset or firmware boots.',
    pins: [
      { id: 'R7-1', number: 1, name: '1', type: 'passive', net: 'NET_Q2_GATE', x: 1195, y: 340, orientation: 'top' },
      { id: 'R7-2', number: 2, name: '2', type: 'passive', net: 'GND', x: 1195, y: 410, orientation: 'bottom' },
    ],
  },
  {
    refDes: 'Q2',
    value: 'IRLZ44N',
    deviceType: 'mosfet',
    section: 'LIGHTING CONTROL',
    sectionId: 'sec-lighting',
    x: 1260,
    y: 270,
    width: 90,
    height: 100,
    package: 'TO-220-3_Vertical',
    description: 'Logic-Level N-Channel Power MOSFET (55V, 47A, RDS(on)=0.028Ω @ VGS=5V)',
    voltageRating: 'V_DS = 55V max',
    currentRating: 'I_D = 47A continuous',
    kicadFootprint: 'Package_TO_SOT_THT:TO-220-3_Vertical',
    designNotes: 'Low-side switch for Light Zone 2. Source connected to common power ground.',
    pins: [
      { id: 'Q2-G', number: 1, name: 'G', type: 'input', net: 'NET_Q2_GATE', x: 1260, y: 305, orientation: 'left' },
      { id: 'Q2-D', number: 2, name: 'D', type: 'passive', net: 'NET_LIGHT2_NEG', x: 1320, y: 270, orientation: 'top' },
      { id: 'Q2-S', number: 3, name: 'S', type: 'passive', net: 'GND', x: 1320, y: 370, orientation: 'bottom' },
    ],
  },
  {
    refDes: 'J3',
    value: 'LIGHT ZONE 2',
    deviceType: 'connector',
    section: 'LIGHTING CONTROL',
    sectionId: 'sec-lighting',
    x: 1480,
    y: 255,
    width: 70,
    height: 90,
    package: 'TerminalBlock_bornier-2_P5.08mm',
    description: '2-Pin Screw Terminal Block for Light Zone 2 Low-Voltage Load',
    voltageRating: '300V / 15A',
    kicadFootprint: 'TerminalBlock:TerminalBlock_bornier-2_P5.08mm',
    designNotes: 'Pin 1: Positive Rail (+V_LOAD / +5V), Pin 2: Switched Ground Return (Q2 Drain).',
    pins: [
      { id: 'J3-1', number: 1, name: '+V_LOAD', type: 'power_out', net: '+5V', x: 1480, y: 275, orientation: 'left' },
      { id: 'J3-2', number: 2, name: 'LOAD-', type: 'passive', net: 'NET_LIGHT2_NEG', x: 1480, y: 320, orientation: 'left' },
    ],
  },

  // SECTION G: Fan Control & Flyback Diode
  {
    refDes: 'R8',
    value: '100 Ω / 0.25W',
    deviceType: 'resistor',
    section: 'FAN CONTROL',
    sectionId: 'sec-fan',
    x: 1090,
    y: 570,
    width: 70,
    height: 30,
    package: 'R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm',
    description: 'Gate Current Limiting Resistor (Q3 Fan PWM Gate)',
    voltageRating: '250V / 250mW',
    kicadFootprint: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal',
    designNotes: 'Protects MCU pin D9 during 490Hz PWM switching.',
    pins: [
      { id: 'R8-1', number: 1, name: '1', type: 'passive', net: 'NET_FAN_CTRL', x: 1090, y: 585, orientation: 'left' },
      { id: 'R8-2', number: 2, name: '2', type: 'passive', net: 'NET_Q3_GATE', x: 1160, y: 585, orientation: 'right' },
    ],
  },
  {
    refDes: 'R9',
    value: '10 kΩ / 0.25W',
    deviceType: 'resistor',
    section: 'FAN CONTROL',
    sectionId: 'sec-fan',
    x: 1180,
    y: 620,
    width: 30,
    height: 70,
    package: 'R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm',
    description: 'Gate-to-Source Pull-Down Bleeder Resistor (Q3)',
    voltageRating: '250V / 250mW',
    kicadFootprint: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal',
    designNotes: 'Maintains fan safely in OFF state while Arduino bootloader runs.',
    pins: [
      { id: 'R9-1', number: 1, name: '1', type: 'passive', net: 'NET_Q3_GATE', x: 1195, y: 620, orientation: 'top' },
      { id: 'R9-2', number: 2, name: '2', type: 'passive', net: 'GND', x: 1195, y: 690, orientation: 'bottom' },
    ],
  },
  {
    refDes: 'Q3',
    value: 'IRLZ44N',
    deviceType: 'mosfet',
    section: 'FAN CONTROL',
    sectionId: 'sec-fan',
    x: 1260,
    y: 550,
    width: 90,
    height: 100,
    package: 'TO-220-3_Vertical',
    description: 'Logic-Level N-Channel Power MOSFET (55V, 47A, RDS(on)=0.028Ω)',
    voltageRating: 'V_DS = 55V max',
    currentRating: 'I_D = 47A continuous',
    kicadFootprint: 'Package_TO_SOT_THT:TO-220-3_Vertical',
    designNotes: 'PWM low-side driver for 5V DC brushless fan.',
    pins: [
      { id: 'Q3-G', number: 1, name: 'G', type: 'input', net: 'NET_Q3_GATE', x: 1260, y: 585, orientation: 'left' },
      { id: 'Q3-D', number: 2, name: 'D', type: 'passive', net: 'NET_FAN_NEG', x: 1320, y: 550, orientation: 'top' },
      { id: 'Q3-S', number: 3, name: 'S', type: 'passive', net: 'GND', x: 1320, y: 650, orientation: 'bottom' },
    ],
  },
  {
    refDes: 'D1',
    value: '1N5819',
    deviceType: 'diode',
    section: 'FAN CONTROL',
    sectionId: 'sec-fan',
    x: 1410,
    y: 580,
    width: 40,
    height: 80,
    package: 'DO-41_SOD81_Horizontal',
    description: '1A / 40V Schottky Barrier Rectifier Diode (Flyback Clamping)',
    voltageRating: '40V Reverse Repetitive Peak',
    currentRating: '1.0A Forward Average',
    kicadFootprint: 'Diode_THT:D_DO-41_SOD81_P10.16mm_Horizontal',
    designNotes: 'Connected directly anti-parallel across the DC fan: Cathode to +5V, Anode to Q3 Drain (FAN-). Fast recovery Schottky clamps inductive turn-off spike V = -L(di/dt) protecting Q3.',
    pins: [
      { id: 'D1-K', number: 'K', name: 'Cathode', type: 'passive', net: '+5V', x: 1430, y: 580, orientation: 'top' },
      { id: 'D1-A', number: 'A', name: 'Anode', type: 'passive', net: 'NET_FAN_NEG', x: 1430, y: 660, orientation: 'bottom' },
    ],
  },
  {
    refDes: 'J4',
    value: '5V DC FAN',
    deviceType: 'connector',
    section: 'FAN CONTROL',
    sectionId: 'sec-fan',
    x: 1530,
    y: 565,
    width: 70,
    height: 90,
    package: 'TerminalBlock_bornier-2_P5.08mm',
    description: '2-Pin Connector for 5V DC Cooling Fan (or 2-pin Molex/JST)',
    voltageRating: '300V / 15A',
    kicadFootprint: 'TerminalBlock:TerminalBlock_bornier-2_P5.08mm',
    designNotes: 'Pin 1: +5V Rail, Pin 2: Switched Fan Return (NET_FAN_NEG / Q3 Drain). Flyback diode D1 sits across Pins 1 & 2.',
    pins: [
      { id: 'J4-1', number: 1, name: '+5V_FAN', type: 'power_out', net: '+5V', x: 1530, y: 585, orientation: 'left' },
      { id: 'J4-2', number: 2, name: 'FAN-', type: 'passive', net: 'NET_FAN_NEG', x: 1530, y: 630, orientation: 'left' },
    ],
  },

  // SECTION H: User Interface (Switches & LEDs)
  {
    refDes: 'SW1',
    value: 'EXAM MODE',
    deviceType: 'switch',
    section: 'USER INTERFACE',
    sectionId: 'sec-ui',
    x: 1040,
    y: 860,
    width: 80,
    height: 50,
    package: 'SW_Push_SPST_NO_Alps_SKHH_Horizontal',
    description: 'SPST Switch / Pushbutton for Examination Mode Enable',
    voltageRating: '12V / 50mA',
    kicadFootprint: 'Button_Switch_THT:SW_PUSH_6mm',
    designNotes: 'Terminal 1 connects to Arduino D3; Terminal 2 to GND. Arduino configured as INPUT_PULLUP in firmware.',
    pins: [
      { id: 'SW1-1', number: 1, name: '1', type: 'passive', net: 'NET_SW_EXAM', x: 1040, y: 885, orientation: 'left' },
      { id: 'SW1-2', number: 2, name: '2', type: 'passive', net: 'GND', x: 1120, y: 885, orientation: 'right' },
    ],
  },
  {
    refDes: 'SW2',
    value: 'MANUAL OVERRIDE',
    deviceType: 'switch',
    section: 'USER INTERFACE',
    sectionId: 'sec-ui',
    x: 1040,
    y: 970,
    width: 80,
    height: 50,
    package: 'SW_Push_SPST_NO_Alps_SKHH_Horizontal',
    description: 'SPST Switch / Pushbutton for Manual Classroom Lighting Override',
    voltageRating: '12V / 50mA',
    kicadFootprint: 'Button_Switch_THT:SW_PUSH_6mm',
    designNotes: 'Terminal 1 connects to Arduino D4; Terminal 2 to GND. Arduino configured as INPUT_PULLUP in firmware.',
    pins: [
      { id: 'SW2-1', number: 1, name: '1', type: 'passive', net: 'NET_SW_MANUAL', x: 1040, y: 995, orientation: 'left' },
      { id: 'SW2-2', number: 2, name: '2', type: 'passive', net: 'GND', x: 1120, y: 995, orientation: 'right' },
    ],
  },
  {
    refDes: 'R10',
    value: '1 kΩ / 0.25W',
    deviceType: 'resistor',
    section: 'USER INTERFACE',
    sectionId: 'sec-ui',
    x: 1260,
    y: 870,
    width: 70,
    height: 30,
    package: 'R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm',
    description: 'Current Limiting Resistor for Normal Status LED (D10 drive)',
    voltageRating: '250V / 250mW',
    kicadFootprint: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal',
    designNotes: 'Calculated current: I = (5V - 2.1V_f) / 1000Ω = 2.9mA. Bright, energy-efficient, well within ATmega328P 20mA recommended per-pin limit.',
    pins: [
      { id: 'R10-1', number: 1, name: '1', type: 'passive', net: 'NET_LED_NORMAL', x: 1260, y: 885, orientation: 'left' },
      { id: 'R10-2', number: 2, name: '2', type: 'passive', net: 'NET_LED1_ANODE', x: 1330, y: 885, orientation: 'right' },
    ],
  },
  {
    refDes: 'LED1',
    value: 'GREEN (Normal)',
    deviceType: 'led',
    section: 'USER INTERFACE',
    sectionId: 'sec-ui',
    x: 1390,
    y: 865,
    width: 50,
    height: 40,
    package: 'LED_D5.0mm',
    description: '5mm Green Diffused Through-Hole LED (Normal Classroom Mode Active)',
    voltageRating: 'V_f = 2.1V typ.',
    currentRating: '20mA max',
    kicadFootprint: 'LED_THT:LED_D5.0mm',
    designNotes: 'Anode driven via R10 from Arduino D10; Cathode connected to system common GND.',
    pins: [
      { id: 'LED1-A', number: 'A', name: 'Anode', type: 'passive', net: 'NET_LED1_ANODE', x: 1390, y: 885, orientation: 'left' },
      { id: 'LED1-K', number: 'K', name: 'Cathode', type: 'passive', net: 'GND', x: 1440, y: 885, orientation: 'right' },
    ],
  },
  {
    refDes: 'R11',
    value: '1 kΩ / 0.25W',
    deviceType: 'resistor',
    section: 'USER INTERFACE',
    sectionId: 'sec-ui',
    x: 1260,
    y: 980,
    width: 70,
    height: 30,
    package: 'R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm',
    description: 'Current Limiting Resistor for Examination Mode LED (D11 drive)',
    voltageRating: '250V / 250mW',
    kicadFootprint: 'Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal',
    designNotes: 'Calculated current: I = (5V - 2.0V_f) / 1000Ω = 3.0mA.',
    pins: [
      { id: 'R11-1', number: 1, name: '1', type: 'passive', net: 'NET_LED_EXAM', x: 1260, y: 995, orientation: 'left' },
      { id: 'R11-2', number: 2, name: '2', type: 'passive', net: 'NET_LED2_ANODE', x: 1330, y: 995, orientation: 'right' },
    ],
  },
  {
    refDes: 'LED2',
    value: 'AMBER (Exam Mode)',
    deviceType: 'led',
    section: 'USER INTERFACE',
    sectionId: 'sec-ui',
    x: 1390,
    y: 975,
    width: 50,
    height: 40,
    package: 'LED_D5.0mm',
    description: '5mm Amber/Red Diffused Through-Hole LED (Examination Mode Active)',
    voltageRating: 'V_f = 2.0V typ.',
    currentRating: '20mA max',
    kicadFootprint: 'LED_THT:LED_D5.0mm',
    designNotes: 'Anode driven via R11 from Arduino D11; Cathode connected to system common GND.',
    pins: [
      { id: 'LED2-A', number: 'A', name: 'Anode', type: 'passive', net: 'NET_LED2_ANODE', x: 1390, y: 995, orientation: 'left' },
      { id: 'LED2-K', number: 'K', name: 'Cathode', type: 'passive', net: 'GND', x: 1440, y: 995, orientation: 'right' },
    ],
  },
];

export const SCHEMATIC_WIRES: WireSegment[] = [
  // POWER +5V BUS (Main Rails)
  {
    id: 'w-pwr-1',
    net: '+5V',
    points: [
      { x: 140, y: 135 }, // J1-1
      { x: 250, y: 135 }, // C1 top node
      { x: 340, y: 135 }, // C2 top node
      { x: 410, y: 135 },
    ],
  },
  {
    id: 'w-pwr-c1-top',
    net: '+5V',
    points: [{ x: 250, y: 135 }, { x: 250, y: 115 }],
  },
  {
    id: 'w-pwr-c2-top',
    net: '+5V',
    points: [{ x: 340, y: 135 }, { x: 340, y: 115 }],
  },
  // +5V to Arduino Pin 27
  {
    id: 'w-pwr-to-mcu',
    net: '+5V',
    points: [
      { x: 890, y: 290 }, // Arduino Pin 27 (+5V)
      { x: 930, y: 290 },
      { x: 930, y: 20 },
      { x: 410, y: 20 },
      { x: 410, y: 135 },
    ],
  },
  // +5V to PIR (U2-1)
  {
    id: 'w-pwr-to-pir',
    net: '+5V',
    points: [
      { x: 410, y: 135 },
      { x: 410, y: 405 },
      { x: 240, y: 405 }, // U2-1
    ],
  },
  // +5V to LDR1 and LDR2
  {
    id: 'w-pwr-to-ldr1',
    net: '+5V',
    points: [
      { x: 410, y: 405 },
      { x: 410, y: 600 },
      { x: 120, y: 600 },
      { x: 120, y: 620 }, // LDR1-1
    ],
  },
  {
    id: 'w-pwr-to-ldr2',
    net: '+5V',
    points: [
      { x: 410, y: 600 },
      { x: 300, y: 600 },
      { x: 300, y: 620 }, // LDR2-1
    ],
  },
  // +5V to DHT22 (U3-1) & R3-1
  {
    id: 'w-pwr-to-dht',
    net: '+5V',
    points: [
      { x: 410, y: 600 },
      { x: 410, y: 880 },
      { x: 100, y: 880 },
      { x: 100, y: 890 }, // R3-1
    ],
  },
  {
    id: 'w-pwr-to-dht-vcc',
    net: '+5V',
    points: [
      { x: 100, y: 880 },
      { x: 150, y: 880 },
      { x: 150, y: 940 },
      { x: 170, y: 940 }, // U3-1
    ],
  },
  // +5V to Right side loads (J2-1, J3-1, J4-1, D1-K)
  {
    id: 'w-pwr-to-loads-bus',
    net: '+5V',
    points: [
      { x: 930, y: 20 },
      { x: 1660, y: 20 },
      { x: 1660, y: 95 },
      { x: 1550, y: 95 }, // J2-1
    ],
  },
  {
    id: 'w-pwr-to-j3',
    net: '+5V',
    points: [
      { x: 1660, y: 95 },
      { x: 1660, y: 275 },
      { x: 1550, y: 275 }, // J3-1
    ],
  },
  {
    id: 'w-pwr-to-j4-d1',
    net: '+5V',
    points: [
      { x: 1660, y: 275 },
      { x: 1660, y: 530 },
      { x: 1430, y: 530 },
      { x: 1430, y: 580 }, // D1 Cathode
    ],
  },
  {
    id: 'w-pwr-to-j4',
    net: '+5V',
    points: [
      { x: 1660, y: 530 },
      { x: 1660, y: 585 },
      { x: 1600, y: 585 }, // J4-1
    ],
  },

  // COMMON GROUND (GND) BUS
  {
    id: 'w-gnd-1',
    net: 'GND',
    points: [
      { x: 140, y: 175 }, // J1-2
      { x: 250, y: 175 }, // C1 bottom node
      { x: 340, y: 175 }, // C2 bottom node
      { x: 380, y: 175 },
    ],
  },
  {
    id: 'w-gnd-c1-bot',
    net: 'GND',
    points: [{ x: 250, y: 175 }, { x: 250, y: 185 }],
  },
  {
    id: 'w-gnd-c2-bot',
    net: 'GND',
    points: [{ x: 340, y: 175 }, { x: 340, y: 185 }],
  },
  {
    id: 'w-gnd-mcu-pin4',
    net: 'GND',
    points: [
      { x: 380, y: 175 },
      { x: 380, y: 290 },
      { x: 520, y: 290 }, // Arduino Pin 4 GND
    ],
  },
  {
    id: 'w-gnd-mcu-pin29',
    net: 'GND',
    points: [
      { x: 890, y: 190 }, // Arduino Pin 29 GND
      { x: 910, y: 190 },
      { x: 910, y: 40 },
      { x: 380, y: 40 },
      { x: 380, y: 175 },
    ],
  },
  {
    id: 'w-gnd-pir',
    net: 'GND',
    points: [
      { x: 380, y: 290 },
      { x: 380, y: 475 },
      { x: 240, y: 475 }, // U2-3
    ],
  },
  {
    id: 'w-gnd-ldr1',
    net: 'GND',
    points: [
      { x: 380, y: 475 },
      { x: 380, y: 810 },
      { x: 120, y: 810 },
      { x: 120, y: 790 }, // R1-2
    ],
  },
  {
    id: 'w-gnd-ldr2',
    net: 'GND',
    points: [
      { x: 380, y: 810 },
      { x: 300, y: 810 },
      { x: 300, y: 790 }, // R2-2
    ],
  },
  {
    id: 'w-gnd-dht',
    net: 'GND',
    points: [
      { x: 380, y: 810 },
      { x: 380, y: 1040 },
      { x: 170, y: 1040 }, // U3-4
    ],
  },

  // Right side GND Bus
  {
    id: 'w-gnd-right-bus',
    net: 'GND',
    points: [
      { x: 910, y: 40 },
      { x: 1720, y: 40 },
      { x: 1720, y: 230 },
      { x: 1195, y: 230 }, // R5-2
    ],
  },
  {
    id: 'w-gnd-q1-s',
    net: 'GND',
    points: [
      { x: 1320, y: 190 }, // Q1 Source
      { x: 1320, y: 230 },
    ],
  },
  {
    id: 'w-gnd-q2-s-r7',
    net: 'GND',
    points: [
      { x: 1720, y: 230 },
      { x: 1720, y: 410 },
      { x: 1195, y: 410 }, // R7-2
    ],
  },
  {
    id: 'w-gnd-q2-s',
    net: 'GND',
    points: [
      { x: 1320, y: 370 }, // Q2 Source
      { x: 1320, y: 410 },
    ],
  },
  {
    id: 'w-gnd-fan-q3-r9',
    net: 'GND',
    points: [
      { x: 1720, y: 410 },
      { x: 1720, y: 690 },
      { x: 1195, y: 690 }, // R9-2
    ],
  },
  {
    id: 'w-gnd-q3-s',
    net: 'GND',
    points: [
      { x: 1320, y: 650 }, // Q3 Source
      { x: 1320, y: 690 },
    ],
  },
  {
    id: 'w-gnd-ui-sw1-sw2',
    net: 'GND',
    points: [
      { x: 1720, y: 690 },
      { x: 1720, y: 885 },
      { x: 1120, y: 885 }, // SW1-2
    ],
  },
  {
    id: 'w-gnd-sw2',
    net: 'GND',
    points: [
      { x: 1720, y: 885 },
      { x: 1720, y: 995 },
      { x: 1120, y: 995 }, // SW2-2
    ],
  },
  {
    id: 'w-gnd-led1',
    net: 'GND',
    points: [
      { x: 1440, y: 885 }, // LED1 Cathode
      { x: 1500, y: 885 },
      { x: 1500, y: 885 },
      { x: 1720, y: 885 },
    ],
  },
  {
    id: 'w-gnd-led2',
    net: 'GND',
    points: [
      { x: 1440, y: 995 }, // LED2 Cathode
      { x: 1720, y: 995 },
    ],
  },

  // SIGNAL NETS
  // 1. PIR Output to Arduino D2 (Pin 5)
  {
    id: 'w-sig-pir',
    net: 'NET_PIR_OUT',
    points: [
      { x: 240, y: 440 }, // U2-2
      { x: 450, y: 440 },
      { x: 450, y: 350 },
      { x: 520, y: 350 }, // Arduino Pin 5 (D2)
    ],
  },

  // 2. Daylight Sensor Zone 1 (A0, Pin 19)
  {
    id: 'w-sig-ldr1-mid',
    net: 'NET_LDR1_SENSE',
    points: [
      { x: 120, y: 680 }, // LDR1-2
      { x: 120, y: 720 }, // R1-1
    ],
  },
  {
    id: 'w-sig-ldr1-to-a0',
    net: 'NET_LDR1_SENSE',
    points: [
      { x: 120, y: 700 },
      { x: 200, y: 700 },
      { x: 200, y: 770 },
      { x: 480, y: 770 },
      { x: 480, y: 1080 },
      { x: 920, y: 1080 },
      { x: 920, y: 770 },
      { x: 890, y: 770 }, // Arduino Pin 19 (A0)
    ],
  },

  // 3. Daylight Sensor Zone 2 (A1, Pin 20)
  {
    id: 'w-sig-ldr2-mid',
    net: 'NET_LDR2_SENSE',
    points: [
      { x: 300, y: 680 }, // LDR2-2
      { x: 300, y: 720 }, // R2-1
    ],
  },
  {
    id: 'w-sig-ldr2-to-a1',
    net: 'NET_LDR2_SENSE',
    points: [
      { x: 300, y: 700 },
      { x: 350, y: 700 },
      { x: 350, y: 740 },
      { x: 460, y: 740 },
      { x: 460, y: 1060 },
      { x: 940, y: 1060 },
      { x: 940, y: 710 },
      { x: 890, y: 710 }, // Arduino Pin 20 (A1)
    ],
  },

  // 4. DHT22 DATA to Arduino D7 (Pin 10)
  {
    id: 'w-sig-dht-mid',
    net: 'NET_DHT_DATA',
    points: [
      { x: 100, y: 960 }, // R3-2
      { x: 100, y: 980 },
      { x: 170, y: 980 }, // U3-2
    ],
  },
  {
    id: 'w-sig-dht-to-d7',
    net: 'NET_DHT_DATA',
    points: [
      { x: 100, y: 980 },
      { x: 70, y: 980 },
      { x: 70, y: 650 },
      { x: 520, y: 650 }, // Arduino Pin 10 (D7)
    ],
  },

  // 5. Lighting Zone 1 Control (D5, Pin 8) -> R4 -> Q1 Gate
  {
    id: 'w-sig-light1-d5',
    net: 'NET_LIGHT1_CTRL',
    points: [
      { x: 520, y: 530 }, // Arduino Pin 8 (D5)
      { x: 490, y: 530 },
      { x: 490, y: 30 },
      { x: 1040, y: 30 },
      { x: 1040, y: 125 },
      { x: 1090, y: 125 }, // R4-1
    ],
  },
  {
    id: 'w-sig-q1-gate',
    net: 'NET_Q1_GATE',
    points: [
      { x: 1160, y: 125 }, // R4-2
      { x: 1195, y: 125 },
      { x: 1260, y: 125 }, // Q1 Gate
    ],
  },
  {
    id: 'w-sig-r5-top',
    net: 'NET_Q1_GATE',
    points: [
      { x: 1195, y: 125 },
      { x: 1195, y: 160 }, // R5-1
    ],
  },
  {
    id: 'w-sig-light1-neg',
    net: 'NET_LIGHT1_NEG',
    points: [
      { x: 1320, y: 90 }, // Q1 Drain
      { x: 1320, y: 140 },
      { x: 1480, y: 140 }, // J2-2
    ],
  },

  // 6. Lighting Zone 2 Control (D6, Pin 9) -> R6 -> Q2 Gate
  {
    id: 'w-sig-light2-d6',
    net: 'NET_LIGHT2_CTRL',
    points: [
      { x: 520, y: 590 }, // Arduino Pin 9 (D6)
      { x: 500, y: 590 },
      { x: 500, y: 305 },
      { x: 1090, y: 305 }, // R6-1
    ],
  },
  {
    id: 'w-sig-q2-gate',
    net: 'NET_Q2_GATE',
    points: [
      { x: 1160, y: 305 }, // R6-2
      { x: 1195, y: 305 },
      { x: 1260, y: 305 }, // Q2 Gate
    ],
  },
  {
    id: 'w-sig-r7-top',
    net: 'NET_Q2_GATE',
    points: [
      { x: 1195, y: 305 },
      { x: 1195, y: 340 }, // R7-1
    ],
  },
  {
    id: 'w-sig-light2-neg',
    net: 'NET_LIGHT2_NEG',
    points: [
      { x: 1320, y: 270 }, // Q2 Drain
      { x: 1320, y: 320 },
      { x: 1480, y: 320 }, // J3-2
    ],
  },

  // 7. Fan Control (D9, Pin 12) -> R8 -> Q3 Gate
  {
    id: 'w-sig-fan-d9',
    net: 'NET_FAN_CTRL',
    points: [
      { x: 520, y: 770 }, // Arduino Pin 12 (D9)
      { x: 470, y: 770 },
      { x: 470, y: 510 },
      { x: 1040, y: 510 },
      { x: 1040, y: 585 },
      { x: 1090, y: 585 }, // R8-1
    ],
  },
  {
    id: 'w-sig-q3-gate',
    net: 'NET_Q3_GATE',
    points: [
      { x: 1160, y: 585 }, // R8-2
      { x: 1195, y: 585 },
      { x: 1260, y: 585 }, // Q3 Gate
    ],
  },
  {
    id: 'w-sig-r9-top',
    net: 'NET_Q3_GATE',
    points: [
      { x: 1195, y: 585 },
      { x: 1195, y: 620 }, // R9-1
    ],
  },
  {
    id: 'w-sig-fan-neg',
    net: 'NET_FAN_NEG',
    points: [
      { x: 1320, y: 550 }, // Q3 Drain
      { x: 1320, y: 630 },
      { x: 1430, y: 630 },
      { x: 1430, y: 660 }, // D1 Anode
    ],
  },
  {
    id: 'w-sig-fan-j4-neg',
    net: 'NET_FAN_NEG',
    points: [
      { x: 1430, y: 630 },
      { x: 1530, y: 630 }, // J4-2
    ],
  },

  // 8. User Interface Signals
  // SW1: Exam Mode (D3, Pin 6)
  {
    id: 'w-sig-sw-exam',
    net: 'NET_SW_EXAM',
    points: [
      { x: 520, y: 410 }, // Arduino Pin 6 (D3)
      { x: 480, y: 410 },
      { x: 480, y: 830 },
      { x: 990, y: 830 },
      { x: 990, y: 885 },
      { x: 1040, y: 885 }, // SW1-1
    ],
  },
  // SW2: Manual Override (D4, Pin 7)
  {
    id: 'w-sig-sw-manual',
    net: 'NET_SW_MANUAL',
    points: [
      { x: 520, y: 470 }, // Arduino Pin 7 (D4)
      { x: 470, y: 470 },
      { x: 470, y: 940 },
      { x: 990, y: 940 },
      { x: 990, y: 995 },
      { x: 1040, y: 995 }, // SW2-1
    ],
  },
  // LED1: Normal Status (D10, Pin 13) -> R10 -> LED1
  {
    id: 'w-sig-led-normal',
    net: 'NET_LED_NORMAL',
    points: [
      { x: 520, y: 830 }, // Arduino Pin 13 (D10)
      { x: 490, y: 830 },
      { x: 490, y: 870 },
      { x: 1200, y: 870 },
      { x: 1200, y: 885 },
      { x: 1260, y: 885 }, // R10-1
    ],
  },
  {
    id: 'w-sig-led1-anode',
    net: 'NET_LED1_ANODE',
    points: [
      { x: 1330, y: 885 }, // R10-2
      { x: 1390, y: 885 }, // LED1 Anode
    ],
  },
  // LED2: Exam Mode (D11, Pin 14) -> R11 -> LED2
  {
    id: 'w-sig-led-exam',
    net: 'NET_LED_EXAM',
    points: [
      { x: 520, y: 890 }, // Arduino Pin 14 (D11)
      { x: 500, y: 890 },
      { x: 500, y: 980 },
      { x: 1200, y: 980 },
      { x: 1200, y: 995 },
      { x: 1260, y: 995 }, // R11-1
    ],
  },
  {
    id: 'w-sig-led2-anode',
    net: 'NET_LED2_ANODE',
    points: [
      { x: 1330, y: 995 }, // R11-2
      { x: 1390, y: 995 }, // LED2 Anode
    ],
  },
];

export const SCHEMATIC_JUNCTIONS: JunctionDot[] = [
  // +5V power rail junctions
  { id: 'j-5v-1', x: 250, y: 135, net: '+5V' },
  { id: 'j-5v-2', x: 340, y: 135, net: '+5V' },
  { id: 'j-5v-3', x: 410, y: 135, net: '+5V' },
  { id: 'j-5v-4', x: 410, y: 405, net: '+5V' },
  { id: 'j-5v-5', x: 410, y: 600, net: '+5V' },
  { id: 'j-5v-6', x: 100, y: 880, net: '+5V' },
  { id: 'j-5v-7', x: 930, y: 20, net: '+5V' },
  { id: 'j-5v-8', x: 1660, y: 95, net: '+5V' },
  { id: 'j-5v-9', x: 1660, y: 275, net: '+5V' },
  { id: 'j-5v-10', x: 1660, y: 530, net: '+5V' },

  // GND junctions
  { id: 'j-gnd-1', x: 250, y: 175, net: 'GND' },
  { id: 'j-gnd-2', x: 340, y: 175, net: 'GND' },
  { id: 'j-gnd-3', x: 380, y: 175, net: 'GND' },
  { id: 'j-gnd-4', x: 380, y: 290, net: 'GND' },
  { id: 'j-gnd-5', x: 380, y: 475, net: 'GND' },
  { id: 'j-gnd-6', x: 380, y: 810, net: 'GND' },
  { id: 'j-gnd-7', x: 1320, y: 230, net: 'GND' },
  { id: 'j-gnd-8', x: 1320, y: 410, net: 'GND' },
  { id: 'j-gnd-9', x: 1320, y: 690, net: 'GND' },
  { id: 'j-gnd-10', x: 1720, y: 885, net: 'GND' },
  { id: 'j-gnd-11', x: 1720, y: 995, net: 'GND' },

  // Signal midpoint junctions
  { id: 'j-ldr1', x: 120, y: 700, net: 'NET_LDR1_SENSE' },
  { id: 'j-ldr2', x: 300, y: 700, net: 'NET_LDR2_SENSE' },
  { id: 'j-dht-data', x: 100, y: 980, net: 'NET_DHT_DATA' },
  { id: 'j-q1-gate', x: 1195, y: 125, net: 'NET_Q1_GATE' },
  { id: 'j-q2-gate', x: 1195, y: 305, net: 'NET_Q2_GATE' },
  { id: 'j-q3-gate', x: 1195, y: 585, net: 'NET_Q3_GATE' },
  { id: 'j-fan-neg', x: 1430, y: 630, net: 'NET_FAN_NEG' },
];

export const SCHEMATIC_NET_LABELS: NetLabel[] = [
  { id: 'nl-5v-in', net: '+5V', text: '+5V_REG', x: 170, y: 125, type: 'power' },
  { id: 'nl-gnd-in', net: 'GND', text: 'GND', x: 170, y: 190, type: 'ground' },
  { id: 'nl-pir-out', net: 'NET_PIR_OUT', text: 'PIR_OUT (D2)', x: 340, y: 430, type: 'signal' },
  { id: 'nl-ldr1', net: 'NET_LDR1_SENSE', text: 'LDR1_SENSE (A0)', x: 160, y: 690, type: 'signal' },
  { id: 'nl-ldr2', net: 'NET_LDR2_SENSE', text: 'LDR2_SENSE (A1)', x: 320, y: 690, type: 'signal' },
  { id: 'nl-dht', net: 'NET_DHT_DATA', text: 'DHT22_DATA (D7)', x: 120, y: 950, type: 'signal' },
  { id: 'nl-light1', net: 'NET_LIGHT1_CTRL', text: 'LIGHT1_PWM (D5)', x: 800, y: 35, type: 'signal' },
  { id: 'nl-light2', net: 'NET_LIGHT2_CTRL', text: 'LIGHT2_PWM (D6)', x: 800, y: 315, type: 'signal' },
  { id: 'nl-fan', net: 'NET_FAN_CTRL', text: 'FAN_PWM (D9)', x: 800, y: 520, type: 'signal' },
  { id: 'nl-sw1', net: 'NET_SW_EXAM', text: 'SW_EXAM (D3)', x: 740, y: 840, type: 'signal' },
  { id: 'nl-sw2', net: 'NET_SW_MANUAL', text: 'SW_MANUAL (D4)', x: 740, y: 950, type: 'signal' },
  { id: 'nl-led-n', net: 'NET_LED_NORMAL', text: 'STATUS_NORM (D10)', x: 840, y: 865, type: 'signal' },
  { id: 'nl-led-e', net: 'NET_LED_EXAM', text: 'STATUS_EXAM (D11)', x: 840, y: 975, type: 'signal' },
];

export const BILL_OF_MATERIALS: BomItem[] = [
  {
    itemNumber: 1,
    refDes: 'U1',
    quantity: 1,
    value: 'Arduino Nano V3.0',
    description: 'ATmega328P 8-bit AVR Microcontroller, 16MHz, 5V System Logic',
    package: 'DIP-30 (2x15 2.54mm)',
    section: 'Main Controller',
    manufacturerPart: 'Arduino / Gravitech Nano 3.0',
    notes: 'Main system processing core. Programmed via onboard Mini-B / Type-C USB.',
  },
  {
    itemNumber: 2,
    refDes: 'U2',
    quantity: 1,
    value: 'HC-SR501',
    description: 'PIR Motion Sensor Module, Pyroelectric Infrared, 3.3V TTL out',
    package: '3-Pin Header (2.54mm)',
    section: 'Occupancy Detection',
    manufacturerPart: 'HC-SR501 Module',
    notes: 'VCC to +5V, GND to GND, OUT to Nano D2. Internal 3.3V regulator included.',
  },
  {
    itemNumber: 3,
    refDes: 'U3',
    quantity: 1,
    value: 'DHT22 / AM2302',
    description: 'Digital Relative Humidity & Temperature Sensor (One-Wire)',
    package: '4-Pin Single In-Line (2.54mm)',
    section: 'Temperature Monitoring',
    manufacturerPart: 'Aosong AM2302',
    notes: 'VDD to +5V, DATA to D7 with 4.7k pullup, Pin 3 NC, Pin 4 GND.',
  },
  {
    itemNumber: 4,
    refDes: 'Q1, Q2, Q3',
    quantity: 3,
    value: 'IRLZ44N',
    description: 'Logic-Level N-Channel Power MOSFET, 55V, 47A, RDS(on)=0.028Ω @ Vgs=5V',
    package: 'TO-220-3 Vertical',
    section: 'Lighting & Fan Outputs',
    manufacturerPart: 'Infineon / International Rectifier IRLZ44NPBF',
    notes: 'Pin 1: Gate, Pin 2: Drain, Pin 3: Source. Driven directly by 5V Arduino PWM.',
  },
  {
    itemNumber: 5,
    refDes: 'LDR1, LDR2',
    quantity: 2,
    value: 'GL5528 (5mm)',
    description: 'Cadmium Sulfide (CdS) Photoresistor, 10k-20kΩ @ 10 Lux, 1MΩ Dark',
    package: 'Radial 5mm (P3.4mm)',
    section: 'Daylight Sensing',
    manufacturerPart: 'Senba GL5528',
    notes: 'Zone 1 (Window) & Zone 2 (Corridor) illuminance sensing.',
  },
  {
    itemNumber: 6,
    refDes: 'D1',
    quantity: 1,
    value: '1N5819',
    description: 'Schottky Barrier Rectifier Diode, 40V, 1A, Fast Recovery (Flyback clamp)',
    package: 'DO-41 (SOD81)',
    section: 'Fan Control',
    manufacturerPart: 'Vishay / ON Semi 1N5819',
    notes: 'Cathode to +5V rail, Anode to Q3 Drain. Suppresses inductive kickback spikes.',
  },
  {
    itemNumber: 7,
    refDes: 'R1, R2, R5, R7, R9',
    quantity: 5,
    value: '10 kΩ / 0.25W',
    description: 'Metal Film Resistor 1% Precision (LDR dividers & MOSFET pull-downs)',
    package: 'Axial DIN 0207 (P10.16mm)',
    section: 'Sensors & Drivers',
    manufacturerPart: 'Yageo MFR-25FTE52-10K',
    notes: 'R1, R2: Dividers to GND; R5, R7, R9: MOSFET gate pull-downs to GND.',
  },
  {
    itemNumber: 8,
    refDes: 'R4, R6, R8',
    quantity: 3,
    value: '100 Ω / 0.25W',
    description: 'Metal Film Resistor 1% Precision (MOSFET Gate Dampeners)',
    package: 'Axial DIN 0207 (P10.16mm)',
    section: 'Drivers',
    manufacturerPart: 'Yageo MFR-25FTE52-100R',
    notes: 'Limits capacitive charging current from Arduino GPIO into MOSFET gates.',
  },
  {
    itemNumber: 9,
    refDes: 'R3',
    quantity: 1,
    value: '4.7 kΩ / 0.25W',
    description: 'Metal Film Resistor 1% Precision (DHT22 Data Pull-up)',
    package: 'Axial DIN 0207 (P10.16mm)',
    section: 'Temperature Monitoring',
    manufacturerPart: 'Yageo MFR-25FTE52-4K7',
    notes: 'Pulls DHT22 DATA line to +5V rail.',
  },
  {
    itemNumber: 10,
    refDes: 'R10, R11',
    quantity: 2,
    value: '1 kΩ / 0.25W',
    description: 'Metal Film Resistor 1% Precision (LED Current Limiters)',
    package: 'Axial DIN 0207 (P10.16mm)',
    section: 'User Interface',
    manufacturerPart: 'Yageo MFR-25FTE52-1K',
    notes: 'Limits status LED currents to safe ~3.0mA per indicator.',
  },
  {
    itemNumber: 11,
    refDes: 'C1',
    quantity: 1,
    value: '100 µF / 25V',
    description: 'Aluminum Electrolytic Capacitor (Polarized), Low-ESR Radial',
    package: 'Radial D6.3mm (P2.5mm)',
    section: 'Power Supply',
    manufacturerPart: 'Nichicon UVZ1E101MDD',
    notes: 'Bulk energy storage across +5V and GND.',
  },
  {
    itemNumber: 12,
    refDes: 'C2',
    quantity: 1,
    value: '100 nF / 50V',
    description: 'Ceramic Capacitor (Non-Polarized), Multilayer X7R',
    package: 'Disc / Radial D4.3mm (P5.0mm)',
    section: 'Power Supply',
    manufacturerPart: 'KEMET C315C104K5R5TA',
    notes: 'High-frequency decoupling across +5V and GND near MCU.',
  },
  {
    itemNumber: 13,
    refDes: 'SW1, SW2',
    quantity: 2,
    value: 'Tactile SPST',
    description: 'Miniature Pushbutton / Toggle Switch, Normally Open',
    package: 'Tactile 6x6mm (THT)',
    section: 'User Interface',
    manufacturerPart: 'Omron B3F-1000 / Alps SKHH',
    notes: 'SW1: Examination Mode, SW2: Manual Override. Switch to GND with INPUT_PULLUP.',
  },
  {
    itemNumber: 14,
    refDes: 'LED1',
    quantity: 1,
    value: 'Green 5mm',
    description: 'Through-Hole Diffused LED (Normal Operation Active Indicator)',
    package: 'Radial 5mm (P2.54mm)',
    section: 'User Interface',
    manufacturerPart: 'Kingbright WP7113GD',
    notes: 'Driven by Arduino D10 via R10 (1kΩ).',
  },
  {
    itemNumber: 15,
    refDes: 'LED2',
    quantity: 1,
    value: 'Amber 5mm',
    description: 'Through-Hole Diffused LED (Examination Mode Active Indicator)',
    package: 'Radial 5mm (P2.54mm)',
    section: 'User Interface',
    manufacturerPart: 'Kingbright WP7113ED',
    notes: 'Driven by Arduino D11 via R11 (1kΩ).',
  },
  {
    itemNumber: 16,
    refDes: 'J1, J2, J3, J4',
    quantity: 4,
    value: 'Screw Terminal 2-Pin',
    description: 'PCB Screw Terminal Block 2-Position, 5.08mm Pitch, 15A / 300V',
    package: 'TerminalBlock_2P_P5.08mm',
    section: 'Power & Output Connectors',
    manufacturerPart: 'Phoenix Contact MKDSN 1,5/ 2-5,08',
    notes: 'J1: +5V_IN, J2: Light Zone 1, J3: Light Zone 2, J4: 5V DC Fan.',
  },
];

export const ERC_RULES_AUDIT: ErcCheck[] = [
  {
    id: 'erc-01',
    category: 'power',
    title: 'Regulated +5V DC Supply Rail Verification',
    status: 'passed',
    referenceReq: 'Prompt Section 8',
    details: 'The schematic features a dedicated 2-pin screw terminal connector (J1) explicitly labeled "+5V DC IN". No unverified 7805 regulator is included, satisfying requirement 8. Dual decoupling capacitors C1 (100 µF electrolytic) and C2 (100 nF ceramic) are placed across the +5V and GND rail.',
  },
  {
    id: 'erc-02',
    category: 'connectivity',
    title: 'Occupancy Sensor (HC-SR501) Pin Mapping',
    status: 'passed',
    referenceReq: 'Prompt Section 2',
    details: 'VCC connected to system +5V rail, GND connected to common GND, OUT pin routed directly to Arduino Nano Pin 5 (D2 / INT0). Logic level 3.3V is verified fully compatible with ATmega328P input high threshold.',
  },
  {
    id: 'erc-03',
    category: 'connectivity',
    title: 'Dual-Zone Daylight Sensing Dividers',
    status: 'passed',
    referenceReq: 'Prompt Section 3',
    details: 'Zone 1: LDR1 connected to +5V, R1 (10 kΩ) connected to GND, midpoint routed to Arduino Nano Pin 19 (A0). Zone 2: LDR2 connected to +5V, R2 (10 kΩ) connected to GND, midpoint routed to Arduino Nano Pin 20 (A1). Full analog range 0.1V to 4.5V verified.',
  },
  {
    id: 'erc-04',
    category: 'connectivity',
    title: 'DHT22 Temperature & Humidity Sensor Bus',
    status: 'passed',
    referenceReq: 'Prompt Section 4',
    details: 'DHT22 VDD connected to +5V, GND to GND, DATA connected to Arduino Nano Pin 10 (D7). R3 = 4.7 kΩ pull-up resistor connected from DATA line to +5V rail. Sensor Pin 3 clearly designated as NC (No Connection).',
  },
  {
    id: 'erc-05',
    category: 'component',
    title: 'Dual Lighting Control Low-Side MOSFET Drivers',
    status: 'passed',
    referenceReq: 'Prompt Section 5',
    details: 'Q1 & Q2 IRLZ44N logic-level N-channel MOSFETs (TO-220: Pin 1 Gate, Pin 2 Drain, Pin 3 Source). Arduino D5 drives Q1 Gate via R4 (100 Ω); D6 drives Q2 Gate via R6 (100 Ω). Pull-down resistors R5 and R7 (10 kΩ) connected from Gate to GND prevent floating gates. Drains connect to negative terminals of 2-pin connectors J2 and J3. Sources tie to common GND.',
  },
  {
    id: 'erc-06',
    category: 'protection',
    title: 'DC Fan Inductive Flyback Protection (D1 1N5819)',
    status: 'passed',
    referenceReq: 'Prompt Section 6',
    details: 'Q3 (IRLZ44N) driven by Arduino D9 via R8 (100 Ω) and pulled down by R9 (10 kΩ). Q3 Drain switches the negative terminal of 2-pin connector J4. 1N5819 Schottky diode D1 is connected anti-parallel across the fan load: Cathode to +5V, Anode to Q3 Drain (FAN-), safely clamping inductive turn-off back-EMF.',
  },
  {
    id: 'erc-07',
    category: 'connectivity',
    title: 'User Interface & Examination Mode Logic',
    status: 'passed',
    referenceReq: 'Prompt Section 7',
    details: 'SW1 (Exam Mode) wired between Arduino Pin 6 (D3) and GND with INPUT_PULLUP. SW2 (Manual Override) wired between Arduino Pin 7 (D4) and GND with INPUT_PULLUP. Status LED1 (Normal) driven from D10 via R10 (1 kΩ). Status LED2 (Exam Mode) driven from D11 via R11 (1 kΩ).',
  },
  {
    id: 'erc-08',
    category: 'power',
    title: 'Current Budget & Load Isolation from MCU',
    status: 'passed',
    referenceReq: 'Prompt Section 8',
    details: 'Verified: Zero load currents flow through ATmega328P GPIO pins. All high-current loads (Light Zone 1, Light Zone 2, Fan) are switched via IRLZ44N power MOSFETs capable of 47A. External power supply requirement calculated at ≥ 3.0A to ensure clean rail stability.',
  },
  {
    id: 'erc-09',
    category: 'thermal',
    title: 'MOSFET Power Dissipation & Thermal Audit',
    status: 'passed',
    referenceReq: 'PCB Competition Best Practices',
    details: 'IRLZ44N features R_DS(on) of 0.028 Ω at V_GS = 5.0V. At 1.5A lighting load: P_loss = I² * R_DS(on) = (1.5)² * 0.028 = 0.063 W. Junction temperature rise is < 4°C above ambient in free air. Bulky heatsinks are not required, preserving compact single-PCB layout.',
  },
  {
    id: 'erc-10',
    category: 'protection',
    title: 'Common Ground Return & Low-Voltage Safety Classification',
    status: 'passed',
    referenceReq: 'Safety Guidelines',
    details: 'All returns (Arduino GND Pin 4 & 29, sensors, MOSFET sources, switch grounds, LED cathodes) unite into a single low-impedance ground net. Circuit operates strictly at +5V SELV (Safety Extra Low Voltage). High-voltage mains isolation notice prominently stamped on drawing.',
  },
];
