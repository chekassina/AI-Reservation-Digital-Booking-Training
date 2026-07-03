import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, MessageCircle, Monitor, Users, Activity, Sparkles, 
  AlertTriangle, Send, RefreshCw, Check, ArrowRight, Play, Bell, ShieldCheck, Laptop 
} from "lucide-react";

interface ReservationTeamProps {
  onLearnMore: () => void;
}

interface LogEntry {
  time: string;
  sender: string;
  type: "info" | "success" | "warning" | "ai";
  text: string;
}

export default function ReservationTeam({ onLearnMore }: ReservationTeamProps) {
  const [activeSim, setActiveSim] = useState<"idle" | "inquiry" | "sync" | "overbooking">("idle");
  const [simProgress, setSimProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([
    { time: "14:40:02", sender: "Sarah (MalaMala Desk)", type: "success", text: "Direct checkout ledger cleared for Party Henderson. Room folio balanced." },
    { time: "14:41:15", sender: "System Node", type: "info", text: "Syncing OTA channel manager. Room inventory updated across 5 networks." },
    { time: "14:42:30", sender: "AI Assistant", type: "ai", text: "Auto-translated & drafted luxury German welcome kit for arriving Guest Schmidt." },
  ]);

  // Specific simulation states
  const [selectedInquiryIndex, setSelectedInquiryIndex] = useState(0);
  const [aiDraftedReply, setAiDraftedReply] = useState("");
  const [syncStatus, setSyncStatus] = useState<"pending" | "direct" | "booking" | "expedia" | "done">("pending");
  const [overbookStep, setOverbookStep] = useState(0);

  const sampleInquiries = [
    {
      guest: "Mr. Dieter Kunze",
      text: "Does the lodge provide private open-vehicle game drives for photographic safaris, and is there stable Wi-Fi in the suite for Zoom?",
      draftReply: "Subject: Photographic Safari & Connectivity Inquiry - Suite 4\n\nDear Mr. Kunze, \n\nAbsolutely! We have reserved a private, customized 4x4 open Land Cruiser with a master photographic guide for your stay. Regarding connectivity, Suite 4 features a dedicated high-speed Starlink terminal yielding 150 Mbps, perfect for stable video conferencing amidst the wilderness.\n\nBest regards,\nCyberGraduates Host Desk"
    },
    {
      guest: "Elena Rostova",
      text: "We are celebrating our 10th honeymoon anniversary. Do you offer champagne arrivals and private bush dinners?",
      draftReply: "Subject: Celebrate Your 10th Anniversary with Us\n\nDear Mrs. Rostova, \n\nHappy Anniversary! To honor this special milestone, we have scheduled a complimentary chilled bottle of Cape Classique sparkling wine in your plunge pool villa upon landing. Additionally, your private guide will escort you to a candlelit three-course bush dinner under the Baobabs on July 14th.\n\nWarmest regards,\nLodge Reservation Team"
    }
  ];

  // Soundless visual wave simulation
  const [waves, setWaves] = useState<number[]>([20, 40, 15, 30, 45, 10, 25, 40]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeSim !== "idle") {
      interval = setInterval(() => {
        setSimProgress((p) => {
          if (p >= 100) {
            clearInterval(interval!);
            finalizeSimulation();
            return 100;
          }
          return p + 5;
        });
        setWaves(Array.from({ length: 8 }, () => Math.floor(Math.random() * 40) + 10));
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeSim]);

  // Multi-stage check animators during progress
  useEffect(() => {
    if (activeSim === "sync") {
      if (simProgress < 25) setSyncStatus("pending");
      else if (simProgress < 50) setSyncStatus("direct");
      else if (simProgress < 75) setSyncStatus("booking");
      else if (simProgress < 95) setSyncStatus("expedia");
      else setSyncStatus("done");
    }

    if (activeSim === "overbooking") {
      if (simProgress < 30) setOverbookStep(1);
      else if (simProgress < 65) setOverbookStep(2);
      else if (simProgress < 95) setOverbookStep(3);
      else setOverbookStep(4);
    }
  }, [simProgress, activeSim]);

  const addLog = (sender: string, type: "info" | "success" | "warning" | "ai", text: string) => {
    const time = new Date().toLocaleTimeString("en-ZA", { hour12: false });
    setLogs((prev) => [{ time, sender, type, text }, ...prev.slice(0, 5)]);
  };

  const startSimulation = (mode: "inquiry" | "sync" | "overbooking") => {
    if (activeSim !== "idle") return; // complete current first
    setActiveSim(mode);
    setSimProgress(0);
    setAiDraftedReply("");
    
    if (mode === "inquiry") {
      addLog("System Desk", "info", `Loading AI guest formula draft for ${sampleInquiries[selectedInquiryIndex].guest}...`);
    } else if (mode === "sync") {
      addLog("Channel Manager", "info", "Initializing dynamic rate and parity scan across global GDS nodes...");
    } else if (mode === "overbooking") {
      addLog("System Alert", "warning", "Overbooking detected on Executive Suite! Triggering de-escalation workflow...");
    }
  };

  const finalizeSimulation = () => {
    const mode = activeSim;
    setActiveSim("idle");

    if (mode === "inquiry") {
      const data = sampleInquiries[selectedInquiryIndex];
      setAiDraftedReply(data.draftReply);
      addLog("AI Copilot", "ai", `Generated 5-star tailored guest response for ${data.guest}.`);
    } else if (mode === "sync") {
      addLog("Channel Manager", "success", "Rate Parity 100% matched. Direct Engine, Booking.com, and Expedia locked in.");
    } else if (mode === "overbooking") {
      addLog("Sarah (MalaMala Desk)", "success", "Conflict cleared: Guest upgraded to President Villa. Direct margin preserved, VIP tag appended.");
    }
  };

  const points = [
    "AI-Assisted Guest Response Flow",
    "Central Reservation System (CRS) & GDS Links",
    "Property Management Systems (PMS) Sandboxes",
    "CRM & Personalized Guest Loyalty Tiers",
    "Multi-Channel Managers & OTA Mappings",
    "De-escalation & Resolution Frameworks"
  ];

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden border-b border-slate-900">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-bold tracking-wide uppercase mb-4 shadow-sm animate-pulse">
            <Activity className="h-3.5 w-3.5" />
            Live Operation Terminal
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            See the Reservation <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">Team at Work</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Experience our active learning sandbox. Toggle the high-energy simulation modes below to watch booking professionals handle real-world scenarios in real-time.
          </p>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Block: The Interactive Simulation Terminal (7 columns) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col flex-1">
              
              {/* Terminal Title Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 bg-slate-950/80 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black tracking-widest text-slate-300 uppercase">RESERVATION SIMULATOR v4.1</span>
                </div>
                <div className="flex gap-2 text-[10px] font-mono text-slate-400">
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-white/5">LATENCY: 12ms</span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-white/5 text-teal-400 font-bold">STATUS: OPERATIONAL</span>
                </div>
              </div>

              {/* Simulation Mode Selector Tab Ribbons */}
              <div className="grid grid-cols-3 bg-slate-950/40 border-b border-slate-800 text-center text-xs font-bold">
                <button
                  onClick={() => {
                    setActiveSim("idle");
                    setSelectedInquiryIndex(0);
                    setAiDraftedReply("");
                  }}
                  className={`py-3.5 border-r border-slate-800 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    activeSim === "idle" && aiDraftedReply === ""
                      ? "bg-slate-900 text-teal-400 border-b-2 border-b-teal-500"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <MessageCircle className="h-4 w-4 text-teal-400" />
                  <span>1. AI Guest Inquiry</span>
                </button>
                <button
                  onClick={() => {
                    setActiveSim("idle");
                    setAiDraftedReply("");
                    setSyncStatus("pending");
                  }}
                  className={`py-3.5 border-r border-slate-800 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    syncStatus !== "pending" || activeSim === "sync"
                      ? "bg-slate-900 text-teal-400 border-b-2 border-b-teal-500"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <RefreshCw className="h-4 w-4 text-emerald-400" />
                  <span>2. Multi-Channel Sync</span>
                </button>
                <button
                  onClick={() => {
                    setActiveSim("idle");
                    setAiDraftedReply("");
                    setOverbookStep(0);
                  }}
                  className={`py-3.5 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    overbookStep > 0 || activeSim === "overbooking"
                      ? "bg-slate-900 text-teal-400 border-b-2 border-b-teal-500"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span>3. Overbook Solver</span>
                </button>
              </div>

              {/* Dynamic Interactive Stage */}
              <div className="p-6 sm:p-8 flex-1 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col justify-between min-h-[360px]">
                
                {/* 1. GUEST INQUIRY SIMULATION PANEL */}
                {((activeSim === "inquiry" || aiDraftedReply !== "") || (activeSim === "idle" && syncStatus === "pending" && overbookStep === 0)) && (
                  <div className="space-y-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-black tracking-wider text-slate-450 bg-slate-800 px-2.5 py-1 rounded">
                          Incoming Guest Request
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedInquiryIndex(0);
                              setAiDraftedReply("");
                            }}
                            className={`px-2 py-1 text-[10px] rounded font-bold cursor-pointer ${selectedInquiryIndex === 0 ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-300"}`}
                          >
                            Inquiry A
                          </button>
                          <button
                            onClick={() => {
                              setSelectedInquiryIndex(1);
                              setAiDraftedReply("");
                            }}
                            className={`px-2 py-1 text-[10px] rounded font-bold cursor-pointer ${selectedInquiryIndex === 1 ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-300"}`}
                          >
                            Inquiry B
                          </button>
                        </div>
                      </div>

                      {/* Guest Inquiry Card */}
                      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1.5 shadow-inner">
                        <span className="block text-[11px] font-extrabold text-amber-400">
                          {sampleInquiries[selectedInquiryIndex].guest} (Safari Booking Request)
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                          &ldquo;{sampleInquiries[selectedInquiryIndex].text}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* AI Drafting State / Result Output */}
                    <div className="mt-4 flex-1 flex flex-col justify-center">
                      {activeSim === "inquiry" ? (
                        <div className="space-y-3.5 text-center py-6">
                          <div className="flex items-center justify-center gap-1.5">
                            <Sparkles className="h-5 w-5 text-amber-400 animate-spin" />
                            <span className="text-xs font-bold text-teal-400">Gemini Pro executing customized host response...</span>
                          </div>
                          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden max-w-xs mx-auto border border-white/5">
                            <div style={{ width: `${simProgress}%` }} className="h-full bg-teal-500 rounded-full transition-all duration-100" />
                          </div>
                          {/* Simulated audio waveform representing typing voice */}
                          <div className="flex justify-center gap-0.5 items-end h-4">
                            {waves.map((h, i) => (
                              <div key={i} style={{ height: `${h}%` }} className="w-0.75 bg-teal-500 rounded-full" />
                            ))}
                          </div>
                        </div>
                      ) : aiDraftedReply ? (
                        <div className="bg-teal-950/20 border border-teal-800/60 p-4.5 rounded-xl space-y-2 mt-2 animate-fade-in">
                          <div className="flex items-center gap-1.5 text-[11px] font-black text-teal-400 tracking-wider uppercase">
                            <Sparkles className="h-3.5 w-3.5" />
                            Tailored AI Response Compiled
                          </div>
                          <pre className="text-[10px] sm:text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[160px] bg-slate-950/50 p-3 rounded-lg border border-slate-900 shadow-inner">
                            {aiDraftedReply}
                          </pre>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-500 space-y-2">
                          <Play className="h-8 w-8 mx-auto opacity-30 text-teal-500" />
                          <p className="text-xs font-bold">Ready to simulate AI Guest Relations workflow</p>
                        </div>
                      )}
                    </div>

                    {/* Action Trigger Button */}
                    {activeSim === "idle" && !aiDraftedReply && (
                      <button
                        onClick={() => startSimulation("inquiry")}
                        className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all hover:shadow-lg shadow-teal-600/10 cursor-pointer flex items-center justify-center gap-2 mt-4"
                      >
                        <Sparkles className="h-4.5 w-4.5 text-amber-300 animate-pulse" />
                        Trigger AI Response Formulation
                      </button>
                    )}
                  </div>
                )}

                {/* 2. CHANNELS RATE PARITY SYNC PANEL */}
                {((activeSim === "sync" || (syncStatus !== "pending" && activeSim !== "inquiry" && overbookStep === 0))) && (
                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
                        Multi-Channel Sync Parity Monitor
                      </span>
                      <p className="text-xs text-slate-400 mt-1.5">
                        Maintaining parity locks rates correctly on direct bookings and OTAs (avoiding manual spreadsheets).
                      </p>
                    </div>

                    {/* Checkmarks Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
                      {[
                        { id: "direct", name: "Direct Engine (1.0x Rate)", color: "text-blue-400" },
                        { id: "booking", name: "Booking.com Sync (1.2x Rate)", color: "text-teal-400" },
                        { id: "expedia", name: "Expedia GDS (1.2x Dynamic)", color: "text-amber-400" },
                        { id: "done", name: "Airbnb Parity Integrity Match", color: "text-purple-400" }
                      ].map((ch, idx) => {
                        const isChecked = 
                          (ch.id === "direct" && (syncStatus === "direct" || syncStatus === "booking" || syncStatus === "expedia" || syncStatus === "done")) ||
                          (ch.id === "booking" && (syncStatus === "booking" || syncStatus === "expedia" || syncStatus === "done")) ||
                          (ch.id === "expedia" && (syncStatus === "expedia" || syncStatus === "done")) ||
                          (ch.id === "done" && (syncStatus === "done"));

                        return (
                          <div key={idx} className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between shadow-sm">
                            <span className="text-xs font-bold text-slate-200">{ch.name}</span>
                            <div className="flex items-center gap-1.5">
                              {isChecked ? (
                                <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                  <Check className="h-3 w-3" />
                                </span>
                              ) : (
                                <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-slate-800 text-slate-500 text-[10px] font-mono border border-slate-700">
                                  ..
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Progress Bar & Button */}
                    <div className="space-y-3.5">
                      {activeSim === "sync" ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-teal-400">
                            <span>Syncing API endpoints...</span>
                            <span>{Math.floor(simProgress)}%</span>
                          </div>
                          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/5">
                            <div style={{ width: `${simProgress}%` }} className="h-full bg-emerald-500 rounded-full transition-all duration-100" />
                          </div>
                        </div>
                      ) : syncStatus === "done" ? (
                        <div className="bg-emerald-950/20 border border-emerald-800/40 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in text-emerald-400">
                          <CheckCircle2 className="h-5 w-5" />
                          <div>
                            <span className="block text-xs font-black uppercase tracking-wider">ALL ENDPOINTS SYNCHRONIZED</span>
                            <span className="block text-[11px] text-slate-300">Rates and inventory locked. Zero parity discrepancies found.</span>
                          </div>
                        </div>
                      ) : null}

                      {activeSim === "idle" && syncStatus === "pending" && (
                        <button
                          onClick={() => startSimulation("sync")}
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all hover:shadow-lg shadow-emerald-600/10 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <RefreshCw className="h-4.5 w-4.5 animate-spin-slow" />
                          Initiate GDS Channel Sync Parity
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. OVERBOOKING DE-ESCALATION RESOLVER */}
                {(activeSim === "overbooking" || overbookStep > 0) && (
                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-wider text-rose-400 bg-rose-950/30 px-2.5 py-1 rounded border border-rose-900/30">
                        PMS Overbooking Crisis Management
                      </span>
                      <p className="text-xs text-slate-450 mt-1.5 leading-relaxed">
                        Simulating double-booking in Executive Suite: Guest Henderson (Expedia) vs Guest Mashigo (Direct Engine).
                      </p>
                    </div>

                    {/* Step Timeline */}
                    <div className="space-y-2.5 my-3">
                      {[
                        { step: 1, title: "Query Loyalty Data Nodes", text: "Checked CRM. Guest Mashigo detected as Diamond Loyalty tier." },
                        { step: 2, title: "Draft presidential upgrade", text: "Allocated unoccupied President Villa to Mashigo. Zero cost loss." },
                        { step: 3, title: "Generate de-escalation email", text: "AI compiled celebration kit + private bush dinner voucher." },
                      ].map((s, idx) => {
                        const active = overbookStep >= s.step;
                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border flex items-center gap-3 transition-all duration-350 ${
                              active
                                ? "bg-slate-900 border-teal-500/30 text-white"
                                : "bg-slate-950/20 border-transparent text-slate-600"
                            }`}
                          >
                            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                              active ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "bg-slate-900 text-slate-600 border border-transparent"
                            }`}>
                              0{s.step}
                            </span>
                            <div>
                              <span className="block text-xs font-extrabold">{s.title}</span>
                              <span className={`block text-[10px] ${active ? "text-slate-300" : "text-slate-600"}`}>{s.text}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Actions and loaders */}
                    <div className="space-y-3.5">
                      {activeSim === "overbooking" ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-amber-400">
                            <span>Executing crisis protocol steps...</span>
                            <span>{Math.floor(simProgress)}%</span>
                          </div>
                          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/5">
                            <div style={{ width: `${simProgress}%` }} className="h-full bg-amber-500 rounded-full transition-all duration-100" />
                          </div>
                        </div>
                      ) : overbookStep === 4 ? (
                        <div className="bg-emerald-950/25 border border-emerald-800/40 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in text-emerald-400">
                          <CheckCircle2 className="h-5 w-5" />
                          <div>
                            <span className="block text-xs font-black uppercase tracking-wider">CONFLICT SUCCESSFULLY RESOLVED</span>
                            <span className="block text-[11px] text-slate-300">Mashigo upgraded. Henderson retains Suite. Customer rating preserved!</span>
                          </div>
                        </div>
                      ) : null}

                      {activeSim === "idle" && overbookStep === 0 && (
                        <button
                          onClick={() => startSimulation("overbooking")}
                          className="w-full py-3 bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/50 hover:border-rose-700 font-extrabold text-xs sm:text-sm rounded-xl transition-all hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                        >
                          <AlertTriangle className="h-4.5 w-4.5 animate-bounce" />
                          Simulate & Resolve PMS Overbooking
                        </button>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Console Logs Footer Panel */}
              <div className="bg-slate-950/95 p-4.5 border-t border-slate-800 font-mono text-[10px]">
                <div className="flex items-center justify-between mb-2 text-slate-450 font-bold tracking-wider">
                  <span>ACTIVE DESK SIMULATION LOGS:</span>
                  <span className="text-teal-400 animate-pulse">● LIVE DATA ROUTE</span>
                </div>
                <div className="space-y-1 max-h-[105px] overflow-y-auto">
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 hover:bg-white/5 p-1 rounded transition-colors">
                      <span className="text-slate-500 flex-shrink-0">[{log.time}]</span>
                      <span className={`font-bold flex-shrink-0 ${
                        log.type === "success" ? "text-emerald-400" :
                        log.type === "warning" ? "text-amber-500" :
                        log.type === "ai" ? "text-teal-300" : "text-slate-400"
                      }`}>{log.sender}:</span>
                      <span className="text-slate-300 flex-1 leading-normal">{log.text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Block: Structured Copywriting, Image and CTA (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-slate-900/60 border border-slate-800/80 p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between h-full">
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-bold tracking-wide uppercase">
                  <Users className="h-3.5 w-3.5" />
                  Active Workspace Energy
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  Master the Skills of High-Yield Booking Hubs
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  A modern booking department does not just take phone calls. Today's booking professional is a dynamic strategist executing dynamic pricing formulas, resolving overbookings with AI assistance, managing OTA synchronizations, and operating cloud Property Management Systems (PMS).
                </p>

                {/* Bullet lists */}
                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  {points.map((point, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4.5 w-4.5 text-teal-400 flex-shrink-0" />
                      <span className="text-slate-200 text-xs sm:text-sm font-semibold">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Small team photo highlight inside card */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 group h-32 my-2 shadow">
                <img
                  src="/src/assets/images/reservation_team_at_work_1783109452415.jpg"
                  alt="Boutique Reservation Team at Work"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <span className="block text-[8px] tracking-widest text-teal-400 font-extrabold uppercase">CyberGraduates Sandbox</span>
                  <span className="block text-[11px] font-extrabold text-white">Interactive Reservation Desks</span>
                </div>
              </div>

              {/* Master CTA button */}
              <button
                onClick={onLearnMore}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-teal-500/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-4"
              >
                <span>Master These Skills</span>
                <ArrowRight className="h-4 w-4" />
              </button>

            </div>
          </div>

        </div>

        {/* Dynamic Interactive Stats Banner */}
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center shadow-lg">
          <div className="space-y-1">
            <span className="block text-2xl sm:text-3xl font-black text-teal-400">
              &lt; 2 Minutes
            </span>
            <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider">
              AI Inquiry response rate
            </span>
          </div>
          <div className="space-y-1 border-y sm:border-y-0 sm:border-x border-slate-800 py-4 sm:py-0">
            <span className="block text-2xl sm:text-3xl font-black text-emerald-400">
              100% Guaranteed
            </span>
            <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider">
              GDS Channel Parity Sync
            </span>
          </div>
          <div className="space-y-1">
            <span className="block text-2xl sm:text-3xl font-black text-amber-400">
              Zero Error
            </span>
            <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider">
              PMS overbooking risk index
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
