import React, { useState, useEffect, useRef } from "react";
import { TrainerScenario, TrainerMessage } from "../types";
import { TRAINER_SCENARIOS } from "../data";
import { MessageSquare, Sparkles, Send, Play, RefreshCw, AlertTriangle, User, Compass, HelpCircle, Activity, Award } from "lucide-react";

export default function TrainerWidget() {
  const [selectedScenario, setSelectedScenario] = useState<TrainerScenario>(TRAINER_SCENARIOS[0]);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [messages, setMessages] = useState<TrainerMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Scoring parameters for game energy
  const [frustration, setFrustration] = useState(50); // Starts at 50%
  const [solvedScore, setSolvedScore] = useState(0); // De-escalation score
  const [showFeedback, setShowFeedback] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setSolvedScore(0);
    setShowFeedback(false);

    // Initial frustration mapping
    const initialFrustration = difficulty === "easy" ? 30 : difficulty === "medium" ? 60 : 90;
    setFrustration(initialFrustration);

    // Initial greeting in character based on scenario
    let greeting = "";
    if (selectedScenario.id === "angry_guest") {
      greeting = "Hello? I am at your front desk right now, and the receptionist is telling me my Deluxe Ocean Suite isn't available because of some 'double booking' error! I booked this three months ago for our anniversary. What on earth is going on?!";
    } else if (selectedScenario.id === "corporate_vip") {
      greeting = "Good afternoon. This is Ms. Evelyn representing Global Logistics Corp. We are planning to book a block of 50 rooms during your peak Safari season, but your rates are astronomical. I expect a 40% discount, otherwise, we'll take our business to the alternative lodge down the river.";
    } else if (selectedScenario.id === "last_minute_safari") {
      greeting = "Hi there! I need to book a luxury safari package for 6 people starting tomorrow morning. We have strict gluten-free requirements, need a private airport transfer, and our absolute maximum budget is $1500 in total. Can you get this booked for us immediately?";
    } else {
      greeting = "Excuse me, I just checked my bank account, and I've been debited twice for my online booking! But when I call, your operator says my reservation doesn't exist in your Central Reservation System. I demand you find my money and my room right now!";
    }

    setMessages([
      {
        id: "sys-init",
        role: "system",
        content: `System: Simulation initialized on ${difficulty.toUpperCase()} difficulty. Scenario: ${selectedScenario.title}`,
        timestamp: new Date()
      },
      {
        id: "guest-init",
        role: "assistant",
        content: greeting,
        timestamp: new Date()
      }
    ]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg: TrainerMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    // Dynamic Frustration & Scoring Simulation (Simulates student progress before hitting API)
    // If student uses polite words like "apologize", "understand", "alternative", "compensate", frustrate drops.
    const textLower = userMsg.content.toLowerCase();
    let frustrateChange = 0;
    let scoreGain = 10;

    if (textLower.includes("apologize") || textLower.includes("sorry") || textLower.includes("sincere")) {
      frustrateChange -= 15;
      scoreGain += 15;
    }
    if (textLower.includes("upgrade") || textLower.includes("complimentary") || textLower.includes("free") || textLower.includes("compensation")) {
      frustrateChange -= 10;
      scoreGain += 10;
    }
    if (textLower.includes("understand") || textLower.includes("empathy") || textLower.includes("help")) {
      frustrateChange -= 8;
      scoreGain += 5;
    }
    if (textLower.includes("no") || textLower.includes("can't") || textLower.includes("policy") || textLower.includes("charge")) {
      frustrateChange += 10;
      scoreGain -= 10;
    }

    // Apply scaling based on difficulty
    const scale = difficulty === "easy" ? 1.2 : difficulty === "medium" ? 1.0 : 0.7;
    setFrustration((prev) => Math.max(0, Math.min(100, prev + Math.round(frustrateChange * scale))));
    setSolvedScore((prev) => Math.max(0, prev + scoreGain));

    try {
      // Build list of messages to send to backend, filtering out system messages
      const chatPayload = messages
        .filter((msg) => msg.role !== "system")
        .concat(userMsg)
        .map((msg) => ({
          role: msg.role,
          content: msg.content
        }));

      const response = await fetch("/api/trainer/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chatPayload,
          scenario: selectedScenario.scenarioKey,
          difficulty: difficulty
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: `g-${Date.now()}`,
            role: "assistant",
            content: data.content,
            timestamp: new Date()
          }
        ]);
        
        // If guest is satisfied, trigger final feedback
        if (data.content.toLowerCase().includes("thank you") || data.content.toLowerCase().includes("works") || data.content.toLowerCase().includes("appreciate")) {
          setFrustration(0);
          setSolvedScore((prev) => prev + 50);
        }
      } else {
        throw new Error(data.error || "Failed to communicate with AI guest");
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "system",
          content: `Connection Error: ${err.message || "Failed to reach trainer node."}. Please ensure your API Secrets are set up properly.`,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setIsSimulating(false);
    setSolvedScore(0);
    setFrustration(50);
    setShowFeedback(false);
  };

  return (
    <section className="py-20 bg-transparent text-white overflow-hidden relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50/75 border border-teal-150 text-teal-800 text-xs font-semibold tracking-wide uppercase mb-3">
            <Activity className="h-4 w-4 text-teal-600 animate-pulse" />
            AI Labs Platform
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 font-sans">
            Interactive AI Reservation Trainer
          </h2>
          <p className="text-slate-650 text-sm sm:text-base">
            Put your skills to the test. Simulate complex hospitality booking crises, practice de-escalation, and receive real-time scoring metrics driven by Google Gemini.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Setup and Metrics Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {!isSimulating ? (
              /* PANEL A: SIMULATOR SETUP */
              <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-xl space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Sparkles className="h-4.5 w-4.5 text-amber-400" />
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-200">
                    Simulation Configurator
                  </h3>
                </div>

                {/* Scenario Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Select Guest Crisis</label>
                  <div className="space-y-2">
                    {TRAINER_SCENARIOS.map((scenario) => (
                      <button
                        key={scenario.id}
                        onClick={() => setSelectedScenario(scenario)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex gap-3 items-start ${
                          selectedScenario.id === scenario.id
                            ? "bg-teal-500/10 border-teal-500 text-white"
                            : "bg-slate-900/60 border-slate-800/40 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <div className="mt-0.5">
                          {scenario.id === "angry_guest" && <AlertTriangle className={`h-4 w-4 ${selectedScenario.id === scenario.id ? "text-teal-400" : "text-slate-500"}`} />}
                          {scenario.id === "corporate_vip" && <Award className={`h-4 w-4 ${selectedScenario.id === scenario.id ? "text-teal-400" : "text-slate-500"}`} />}
                          {scenario.id === "last_minute_safari" && <Compass className={`h-4 w-4 ${selectedScenario.id === scenario.id ? "text-teal-400" : "text-slate-500"}`} />}
                          {scenario.id === "tech_failure" && <HelpCircle className={`h-4 w-4 ${selectedScenario.id === scenario.id ? "text-teal-400" : "text-slate-500"}`} />}
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-white">{scenario.title}</span>
                          <span className="block text-[11px] text-slate-400 leading-snug mt-1 line-clamp-2">
                            {scenario.description}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Select Difficulty</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["easy", "medium", "hard"] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`py-2 text-xs font-extrabold rounded-lg border text-center uppercase tracking-wide transition-all cursor-pointer ${
                          difficulty === level
                            ? level === "easy"
                              ? "bg-emerald-500/15 border-emerald-500 text-emerald-400"
                              : level === "medium"
                              ? "bg-amber-500/15 border-amber-500 text-amber-400"
                              : "bg-rose-500/15 border-rose-500 text-rose-400"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleStartSimulation}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-full shadow-lg shadow-teal-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="h-4 w-4" />
                  Launch Simulator
                </button>
              </div>
            ) : (
              /* PANEL B: LIVE METRICS SYSTEM */
              <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-teal-400 animate-pulse" />
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-200">
                      Live Telemetry
                    </h3>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Abrupt Close
                  </button>
                </div>

                {/* Score Panel */}
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">De-escalation Score</span>
                    <span className="block text-2xl font-black text-amber-400 mt-0.5">{solvedScore} pts</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Difficulty Scale</span>
                    <span className="block text-xs font-bold text-white uppercase mt-1 px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700">
                      {difficulty}
                    </span>
                  </div>
                </div>

                {/* Frustration Meter */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400 uppercase">Guest Frustration Level</span>
                    <span className={`uppercase font-black ${frustration > 75 ? "text-rose-400" : frustration > 40 ? "text-amber-400" : "text-emerald-400"}`}>
                      {frustration}%
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        frustration > 75
                          ? "bg-rose-500 shadow-lg shadow-rose-500/20"
                          : frustration > 40
                          ? "bg-amber-500 shadow-lg shadow-amber-500/20"
                          : "bg-emerald-500 shadow-lg shadow-emerald-500/20"
                      }`}
                      style={{ width: `${frustration}%` }}
                    />
                  </div>
                  <span className="block text-[10px] text-slate-400 italic">
                    {frustration > 75
                      ? "Warning: Mr. Henderson is extremely angry and ready to walk out. Apologize and offer high compensation!"
                      : frustration > 40
                      ? "The guest is listening but demands specific options and rate breakdowns. Keep the tone warm."
                      : "Excellent. The guest is cooperative and agrees to your reservation layout resolutions."}
                  </span>
                </div>

                {/* Educational Checklist */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase">Simulated Evaluation Rules</h4>
                  <div className="space-y-1.5 text-[11px] text-slate-400 font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      <span>Empathy First: Apologize before proposing a technical PMS booking transfer.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      <span>Offer Upgrades: Suggest complimentary breakfast, vouchers, or direct folios.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      <span>No Defensiveness: Do not blame PMS systems, channel managers, or GDS latency.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Chat Sandbox */}
          <div className="lg:col-span-8">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl h-[550px] flex flex-col relative">
              
              {/* Terminal Title */}
              <div className="bg-slate-900/80 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-500" />
                    <span className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-bold tracking-wider text-slate-400 font-mono">
                    simulation_node: guest_voice@cybergraduates
                  </span>
                </div>
                {isSimulating && (
                  <span className="text-[10px] font-black bg-teal-500/20 text-teal-400 px-2.5 py-0.5 rounded-full border border-teal-500/30 uppercase animate-pulse">
                    Crisis Active
                  </span>
                )}
              </div>

              {/* Chat Panel Box */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {!isSimulating ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="h-14 w-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                      <MessageSquare className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Simulation Sandbox Offline</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed mt-1">
                        Configure your scenario and click "Launch Simulator" to establish a live character dialogue with our hospitality guest engine.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg) => {
                      if (msg.role === "system") {
                        return (
                          <div key={msg.id} className="text-center">
                            <span className="inline-block text-[10px] font-bold font-mono bg-slate-900 text-slate-400 border border-slate-800/80 px-3 py-1 rounded-md">
                              {msg.content}
                            </span>
                          </div>
                        );
                      }

                      const isUser = msg.role === "user";
                      return (
                        <div
                          key={msg.id}
                          className={`flex items-start gap-3 max-w-[85%] ${
                            isUser ? "ml-auto flex-row-reverse" : "mr-auto"
                          }`}
                        >
                          {/* Avatar Circle */}
                          <div className={`h-8.5 w-8.5 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            isUser ? "bg-teal-600 text-white" : "bg-slate-800 text-amber-400 border border-slate-700"
                          }`}>
                            {isUser ? "You" : <User className="h-4.5 w-4.5" />}
                          </div>

                          {/* Bubble */}
                          <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            isUser
                              ? "bg-teal-500/15 border border-teal-500/30 text-white rounded-tr-none"
                              : "bg-slate-900 border border-slate-800/80 text-slate-100 rounded-tl-none"
                          }`}>
                            {!isUser && <span className="block text-[10px] font-bold text-amber-500 uppercase tracking-wide mb-1">{selectedScenario.guestName}</span>}
                            <p className="whitespace-pre-line font-medium">{msg.content}</p>
                          </div>
                        </div>
                      );
                    })}
                    {isLoading && (
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono italic pl-2 animate-pulse">
                        <RefreshCw className="h-4.5 w-4.5 animate-spin text-teal-400" />
                        <span>{selectedScenario.guestName} is typing...</span>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </>
                )}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-900/60 flex gap-3">
                <input
                  type="text"
                  disabled={!isSimulating || isLoading}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    isSimulating
                      ? "Apologize and offer a strategic technical resolution..."
                      : "Launch simulator to begin typing..."
                  }
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!isSimulating || isLoading || !inputValue.trim()}
                  className="p-3 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-40 cursor-pointer flex items-center justify-center"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
