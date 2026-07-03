import React, { useState } from "react";
import { Copy, Check, Terminal, Sparkles, RefreshCw, Send, HelpCircle } from "lucide-react";

export default function PromptGenerator() {
  const [department, setDepartment] = useState("Reservations Consultant");
  const [challenge, setChallenge] = useState("Overbooking De-escalation");
  const [aiTool, setAiTool] = useState("Google Gemini");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const departments = [
    "Reservations Consultant",
    "Front Office Staff",
    "Safari Booking Coordinator",
    "Revenue / Yield Manager",
    "Tour Operator / Travel Broker"
  ];

  const challenges = [
    { value: "Overbooking De-escalation", label: "De-escalating a double-booked Deluxe suite" },
    { value: "Corporate Upselling", label: "Upselling a corporate VIP into a luxury family villa" },
    { value: "No-Show Dispute Resolution", label: "Resolving a guest credit card folio charge dispute" },
    { value: "Late Transfer Email Workflow", label: "Drafting custom flight delay / lodge shuttle emails" },
    { value: "Dynamic OTA Commission Audit", label: "Formulating mapping formulas for channel managers" }
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult("");
    setCopied(false);

    try {
      const response = await fetch("/api/resources/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          department,
          challenge,
          aiTool
        })
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.promptResult);
      } else {
        throw new Error(data.error || "Failed to generate prompt template.");
      }
    } catch (err: any) {
      console.error(err);
      setResult(`### Generation Failed\n\n${err.message || "An unexpected error occurred."}\n\n*Please ensure that your GEMINI_API_KEY is configured in the secrets menu.*`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 bg-transparent relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Panel: Form */}
          <div className="lg:col-span-5 bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/60 shadow-xl space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200/60 pb-3">
              <Sparkles className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-sans">
                AI Prompt Architect
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
              Don't guess what to ask AI. Use our custom compiler to generate detailed prompt frameworks tested specifically for five-star booking desks.
            </p>

            <form onSubmit={handleGenerate} className="space-y-4">
              {/* Dept select */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase font-sans">Your Desk Role</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-white border border-slate-200/50 rounded-lg p-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Challenge select */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase font-sans">Target Hospitality Challenge</label>
                <select
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className="w-full bg-white border border-slate-200/50 rounded-lg p-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  {challenges.map((ch) => (
                    <option key={ch.value} value={ch.value}>{ch.label}</option>
                  ))}
                </select>
              </div>

              {/* Target model */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase font-sans">Target AI Engine</label>
                <select
                  value={aiTool}
                  onChange={(e) => setAiTool(e.target.value)}
                  className="w-full bg-white border border-slate-200/50 rounded-lg p-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="Google Gemini">Google Gemini (Recommended)</option>
                  <option value="ChatGPT (GPT-4o)">ChatGPT (GPT-4o)</option>
                  <option value="Microsoft Copilot">Microsoft Copilot</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-full shadow-lg shadow-teal-600/15 active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Compiling Template...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Compile Prompt Framework
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Panel: Output Template */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-md text-slate-800 rounded-2xl border border-white/60 p-6 sm:p-8 h-[450px] flex flex-col shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="h-4.5 w-4.5 text-teal-600" />
                <span className="text-xs font-bold tracking-wider font-mono text-slate-600 uppercase">
                  compiled_output.md
                </span>
              </div>
              {result && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 text-slate-700 hover:text-teal-800 rounded-full text-xs font-bold cursor-pointer transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-slate-500" />
                      Copy Prompt
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto font-mono text-xs leading-relaxed space-y-4">
              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3.5">
                  <RefreshCw className="h-8 w-8 text-teal-600 animate-spin" />
                  <span className="text-slate-550 text-xs font-sans">Assembling system tokens and prompt engineering algorithms...</span>
                </div>
              ) : result ? (
                <div className="whitespace-pre-line text-slate-700 font-sans p-2">
                  {result}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <Terminal className="h-10 w-10 text-slate-300 mb-3 animate-pulse" />
                  <p className="text-xs max-w-sm font-sans">
                    Select your role and click "Compile" to generate a complete structured prompt blueprint in markdown.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
