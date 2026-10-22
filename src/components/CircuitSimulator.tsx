import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Sun,
  Thermometer,
  Wind,
  Lightbulb,
  UserCheck,
  GraduationCap,
  Sliders,
  Activity,
} from 'lucide-react';

export const CircuitSimulator: React.FC = () => {
  // Simulator Sensor Inputs
  const [motionDetected, setMotionDetected] = useState<boolean>(true);
  const [luxZone1, setLuxZone1] = useState<number>(250); // Lux Window
  const [luxZone2, setLuxZone2] = useState<number>(120); // Lux Corridor
  const [temperature, setTemperature] = useState<number>(28); // °C
  const [humidity, setHumidity] = useState<number>(55); // %RH
  const [examModeActive, setExamModeActive] = useState<boolean>(false); // SW1
  const [manualOverrideActive, setManualOverrideActive] = useState<boolean>(false); // SW2

  // Voltage divider calculations for LDRs:
  // LDR resistance approx: R_ldr = 500k / (Lux + 5)^0.8
  const rLdr1 = Math.max(1000, Math.min(500000, Math.round(500000 / Math.pow(luxZone1 + 5, 0.8))));
  const vA0 = Number((5.0 * (10000 / (rLdr1 + 10000))).toFixed(2));

  const rLdr2 = Math.max(1000, Math.min(500000, Math.round(500000 / Math.pow(luxZone2 + 5, 0.8))));
  const vA1 = Number((5.0 * (10000 / (rLdr2 + 10000))).toFixed(2));

  // Microcontroller Algorithm Evaluation
  let ledNormal = false; // D10
  let ledExam = false; // D11
  let light1Pwm = 0; // D5 (0-100%)
  let light2Pwm = 0; // D6 (0-100%)
  let fanPwm = 0; // D9 (0-100%)

  if (examModeActive) {
    // EXAMINATION MODE:
    // LED2 ON, LED1 OFF
    // Uniform, flicker-free 100% lighting in all zones regardless of motion timeout
    // Whisper-quiet fan acoustics for silence during exams
    ledExam = true;
    ledNormal = false;
    light1Pwm = 100;
    light2Pwm = 100;

    if (temperature > 25) {
      fanPwm = temperature > 32 ? 65 : 40; // Acoustic quiet ceiling
    } else {
      fanPwm = 0;
    }
  } else {
    // NORMAL CLASSROOM MANAGEMENT:
    ledNormal = true;
    ledExam = false;

    if (manualOverrideActive) {
      // Manual Teacher Override forces lights ON
      light1Pwm = 100;
      light2Pwm = 100;
    } else if (motionDetected) {
      // Smart Daylight Harvesting based on A0 & A1
      // If natural daylight is high, artificial lighting is dimmed or shut off
      light1Pwm = luxZone1 > 600 ? 0 : Math.round(100 - (luxZone1 / 600) * 100);
      light2Pwm = luxZone2 > 600 ? 0 : Math.round(100 - (luxZone2 / 600) * 100);
    } else {
      // Empty Classroom: Zero lighting consumption
      light1Pwm = 0;
      light2Pwm = 0;
    }

    // Temperature-Controlled Fan in Normal Mode
    if (temperature < 24) {
      fanPwm = 0;
    } else if (temperature <= 32) {
      fanPwm = Math.round(((temperature - 24) / 8) * 80 + 20);
    } else {
      fanPwm = 100; // Max cooling
    }
  }

  // Reset simulator defaults
  const handleReset = () => {
    setMotionDetected(true);
    setLuxZone1(250);
    setLuxZone2(120);
    setTemperature(28);
    setHumidity(55);
    setExamModeActive(false);
    setManualOverrideActive(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 font-mono">
            <Activity className="w-5 h-5 text-teal-400" />
            INTERACTIVE LOGIC SIMULATOR & TEST BENCH
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulate classroom environmental stimuli, examination modes, and inspect real-time Arduino Nano pin responses.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer w-fit"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Stimuli
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Environmental Inputs & Switches (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-sm font-bold font-mono tracking-wide text-white uppercase flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-400" />
            Classroom Inputs & Controls
          </h3>

          {/* Occupancy PIR HC-SR501 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-purple-400" />
                HC-SR501 Occupancy Detection (OUT → D2)
              </span>
              <button
                onClick={() => setMotionDetected(!motionDetected)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  motionDetected
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {motionDetected ? 'MOTION DETECTED (HIGH)' : 'CLASSROOM EMPTY (LOW)'}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              PIR digital output feeds Pin D2 (INT0). In Normal mode, zero occupancy triggers auto light shut-off.
            </p>
          </div>

          {/* Dual-Zone Daylight Sensing LDRs */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-4">
            <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              Dual-Zone Ambient Daylight Sensing (LDR1 & LDR2 Dividers)
            </span>

            {/* Zone 1 Window */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Zone 1 Perimeter (Window):</span>
                <span className="text-amber-400 font-bold">
                  {luxZone1} Lux · V_A0 = {vA0} V
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                value={luxZone1}
                onChange={(e) => setLuxZone1(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Zone 2 Corridor */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Zone 2 Interior (Corridor):</span>
                <span className="text-amber-400 font-bold">
                  {luxZone2} Lux · V_A1 = {vA1} V
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                value={luxZone2}
                onChange={(e) => setLuxZone2(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* DHT22 Temperature & Humidity */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-4">
            <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-emerald-400" />
              DHT22 Temperature & Humidity Bus (DATA → D7)
            </span>

            {/* Temperature */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Ambient Temperature:</span>
                <span className="text-emerald-400 font-bold">{temperature} °C</span>
              </div>
              <input
                type="range"
                min="15"
                max="45"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Humidity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Relative Humidity:</span>
                <span className="text-teal-400 font-bold">{humidity} % RH</span>
              </div>
              <input
                type="range"
                min="20"
                max="95"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>
          </div>

          {/* User Interface Hardware Switches (SW1 & SW2) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-3">
            <span className="text-xs font-mono font-bold text-slate-200 block">
              Physical Hardware Switches (INPUT_PULLUP to GND)
            </span>

            <div className="grid grid-cols-2 gap-3">
              {/* SW1 Exam Mode */}
              <button
                onClick={() => setExamModeActive(!examModeActive)}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  examModeActive
                    ? 'bg-pink-950/60 border-pink-500 text-pink-300 shadow-lg shadow-pink-950/50'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <GraduationCap className="w-5 h-5 text-pink-400" />
                <span className="font-mono text-xs font-bold">SW1: EXAM MODE</span>
                <span className="text-[10px] font-mono">
                  {examModeActive ? 'ACTIVE (D3=LOW)' : 'DISABLED (D3=HIGH)'}
                </span>
              </button>

              {/* SW2 Manual Override */}
              <button
                onClick={() => setManualOverrideActive(!manualOverrideActive)}
                disabled={examModeActive}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  examModeActive ? 'opacity-40 cursor-not-allowed' : ''
                } ${
                  manualOverrideActive && !examModeActive
                    ? 'bg-blue-950/60 border-blue-500 text-blue-300 shadow-lg shadow-blue-950/50'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <Lightbulb className="w-5 h-5 text-blue-400" />
                <span className="font-mono text-xs font-bold">SW2: MANUAL OVERRIDE</span>
                <span className="text-[10px] font-mono">
                  {manualOverrideActive ? 'OVERRIDE ON (D4=LOW)' : 'AUTO SENSING (D4=HIGH)'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Circuit Outputs & Arduino Pin Matrix (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-sm font-bold font-mono tracking-wide text-white uppercase flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Circuit Actuators & Output Responses
          </h3>

          {/* Actuator Status Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Light Zone 1 (Q1) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">J2: LIGHT ZONE 1</span>
                <span className="font-mono text-xs font-bold text-orange-400">Q1 (IRLZ44N)</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-bold text-white">{light1Pwm}%</span>
                <span className="text-xs text-slate-400 font-mono">PWM Duty (D5)</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-orange-500 h-full transition-all duration-300"
                  style={{ width: `${light1Pwm}%` }}
                />
              </div>
            </div>

            {/* Light Zone 2 (Q2) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">J3: LIGHT ZONE 2</span>
                <span className="font-mono text-xs font-bold text-orange-400">Q2 (IRLZ44N)</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-bold text-white">{light2Pwm}%</span>
                <span className="text-xs text-slate-400 font-mono">PWM Duty (D6)</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-orange-500 h-full transition-all duration-300"
                  style={{ width: `${light2Pwm}%` }}
                />
              </div>
            </div>

            {/* Fan Output (Q3 + D1) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">J4: 5V DC FAN</span>
                <span className="font-mono text-xs font-bold text-blue-400">Q3 + D1 Flyback</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-bold text-white">{fanPwm}%</span>
                <span className="text-xs text-slate-400 font-mono">Speed (D9)</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-blue-500 h-full transition-all duration-300"
                  style={{ width: `${fanPwm}%` }}
                />
              </div>
            </div>

            {/* Status LEDs */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-2">
              <span className="text-xs font-mono text-slate-400 block">SYSTEM STATUS LEDS</span>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div
                  className={`p-2 rounded-lg border flex items-center gap-2 ${
                    ledNormal
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-600'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      ledNormal ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-slate-700'
                    }`}
                  />
                  <div className="text-[10px] font-mono leading-tight font-bold">
                    LED1 (D10)
                    <span className="block text-[9px] font-normal">NORMAL</span>
                  </div>
                </div>

                <div
                  className={`p-2 rounded-lg border flex items-center gap-2 ${
                    ledExam
                      ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-600'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      ledExam ? 'bg-amber-400 shadow-lg shadow-amber-400/50' : 'bg-slate-700'
                    }`}
                  />
                  <div className="text-[10px] font-mono leading-tight font-bold">
                    LED2 (D11)
                    <span className="block text-[9px] font-normal">EXAM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arduino Nano Pin Logic Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-3">
            <span className="text-xs font-mono font-bold text-slate-200 block">
              Arduino Nano Microcontroller Real-Time Pin State Matrix
            </span>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 font-mono text-xs">
              <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-400">D2 (PIR):</span>
                <span className={motionDetected ? 'text-purple-400 font-bold' : 'text-slate-500'}>
                  {motionDetected ? 'HIGH (3.3V)' : 'LOW (0.0V)'}
                </span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-400">D3 (SW1):</span>
                <span className={examModeActive ? 'text-pink-400 font-bold' : 'text-slate-300'}>
                  {examModeActive ? 'LOW (PULLUP)' : 'HIGH'}
                </span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-400">D4 (SW2):</span>
                <span className={manualOverrideActive ? 'text-blue-400 font-bold' : 'text-slate-300'}>
                  {manualOverrideActive ? 'LOW (PULLUP)' : 'HIGH'}
                </span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-400">D5 (Light1):</span>
                <span className="text-orange-400 font-bold">{light1Pwm}% PWM</span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-400">D6 (Light2):</span>
                <span className="text-orange-400 font-bold">{light2Pwm}% PWM</span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-400">D7 (DHT22):</span>
                <span className="text-emerald-400 font-bold">1-WIRE DATA</span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-400">D9 (Fan):</span>
                <span className="text-blue-400 font-bold">{fanPwm}% PWM</span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-400">D10 (LED1):</span>
                <span className={ledNormal ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {ledNormal ? 'HIGH (5V)' : 'LOW (0V)'}
                </span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-400">D11 (LED2):</span>
                <span className={ledExam ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                  {ledExam ? 'HIGH (5V)' : 'LOW (0V)'}
                </span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-400">A0 (LDR1):</span>
                <span className="text-amber-400 font-bold">{vA0} V</span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-400">A1 (LDR2):</span>
                <span className="text-amber-400 font-bold">{vA1} V</span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                <span className="text-slate-400">VCC (+5V):</span>
                <span className="text-red-400 font-bold">5.00 V NOM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
