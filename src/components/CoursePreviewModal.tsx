import React, { useState, useEffect, useRef } from "react";
import { Course } from "../types";
import { 
  X, Play, Pause, RotateCcw, Video, Terminal, Laptop, Check, Sparkles, 
  Settings, Volume2, ShieldCheck, ArrowRight, UserCheck, ShieldAlert,
  AlertTriangle, DollarSign, Compass, Layers, Sliders, ToggleLeft, HelpCircle
} from "lucide-react";

interface CoursePreviewModalProps {
  course: Course;
  onClose: () => void;
  onOpenEnroll: () => void;
}

interface TranscriptLine {
  time: number;
  text: string;
  speaker: string;
}

export default function CoursePreviewModal({ course, onClose, onOpenEnroll }: CoursePreviewModalProps) {
  const [activeTab, setActiveTab] = useState<"video" | "sandbox">("video");
  
  // Video Simulator state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 180; // 3 minutes total
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // TRANSCRIPTS MATCHING COURSE ID
  const transcripts: Record<string, TranscriptLine[]> = {
    "ai-res": [
      { time: 0, text: "Welcome to AI for Reservation Professionals. Today we're looking at prompt frameworks for luxury desks.", speaker: "Inst. Marcus Cole" },
      { time: 15, text: "Standard hotel templates look robotic. Luxury guests expect bespoke language that mentions their preferences.", speaker: "Inst. Marcus Cole" },
      { time: 35, text: "Observe this prompt structure: 'You are a luxury front desk lead. A guest named Henderson is angry about deluxe room check-in delay.'", speaker: "Inst. Marcus Cole" },
      { time: 60, text: "By using the tone parameter 'compassionate, professional, and solution-driven', Gemini drafts an elite alternative.", speaker: "Inst. Marcus Cole" },
      { time: 90, text: "Let's run this sandbox now. Notice how the response matches their GDS profile codes while offering an organic room perk.", speaker: "Inst. Marcus Cole" },
      { time: 120, text: "Your assignment is to modify the prompt constraint to enforce a local currency quote. Check the resources guide for details.", speaker: "Inst. Marcus Cole" },
      { time: 150, text: "In the next module, we will connect this prompt output back to your auto-email responder logs. Happy engineering!", speaker: "Inst. Marcus Cole" }
    ],
    "pms-mastery": [
      { time: 0, text: "Welcome. Today we are auditing Property Management Systems ledger folios.", speaker: "Inst. Rachel Vance" },
      { time: 20, text: "Every guest profile has a ledger folio. Let's run a mock check-in on room 204.", speaker: "Inst. Rachel Vance" },
      { time: 45, text: "First, verify that the room housekeeping status in the PMS is marked as CLEAN before assigning the key.", speaker: "Inst. Rachel Vance" },
      { time: 70, text: "Now, notice how clicking check-in automatically updates the occupancy registry and posts the first night's room charge.", speaker: "Inst. Rachel Vance" },
      { time: 105, text: "What happens if they want to pay with a corporate bill? We must route the charge to the corporate AR folio.", speaker: "Inst. Rachel Vance" },
      { time: 135, text: "Review the ledger balances. If there's an outstanding balance, the PMS locks the check-out flow.", speaker: "Inst. Rachel Vance" },
      { time: 160, text: "Practice this checking procedure in the sandbox workspace to ensure zero billing discrepancies. See you in module 2.", speaker: "Inst. Rachel Vance" }
    ],
    "crs-distribution": [
      { time: 0, text: "In CRS Distribution Essentials, we link your rates across the global hotel network.", speaker: "Inst. David Vance" },
      { time: 20, text: "We manage room inventory allocations. If occupancy rises above 85%, yield rules kick in.", speaker: "Inst. David Vance" },
      { time: 50, text: "Notice how sliding the yield rate upwards instantly pushes a dynamic price multiplier to the booking engine.", speaker: "Inst. David Vance" },
      { time: 80, text: "We must ensure that all third-party GDS channels are updated simultaneously to prevent rate disparity penalties.", speaker: "Inst. David Vance" },
      { time: 115, text: "Our sandbox lets you adjust occupancy thresholds and observe how the CRS automatically triggers stop-sell rules.", speaker: "Inst. David Vance" },
      { time: 145, text: "For your practical task, configure a corporate rate code 'CORP-LODGE-26' with a 15% discount threshold.", speaker: "Inst. David Vance" }
    ]
  };

  // Fallback transcript for other courses
  const defaultTranscript: TranscriptLine[] = [
    { time: 0, text: `Welcome to ${course.title}. This clip highlights our core practical training.`, speaker: "Consultant Lead" },
    { time: 25, text: "In hospitality technology, speed and accuracy are everything. Watch this interface demonstration.", speaker: "Consultant Lead" },
    { time: 60, text: "By coordinating your local PMS systems with online modules, we minimize guest checkout friction.", speaker: "Consultant Lead" },
    { time: 100, text: "Use the hands-on sandbox tab to practice adjusting rates, checking bookings, or writing responses.", speaker: "Consultant Lead" },
    { time: 140, text: "Our certificate courses are accredited and self-paced. Complete the modules to upgrade your credentials.", speaker: "Consultant Lead" }
  ];

  const activeTranscript = transcripts[course.id] || defaultTranscript;

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            clearInterval(timerRef.current!);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleResetVideo = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  // Find currently active transcript line
  const activeLineIndex = [...activeTranscript]
    .reverse()
    .findIndex((line) => currentTime >= line.time);
  const currentLine = activeLineIndex !== -1 ? activeTranscript[activeTranscript.length - 1 - activeLineIndex] : null;

  // HANDS-ON INTERACTIVE SANDBOX STATE
  const [sandboxAIInput, setSandboxAIInput] = useState("Henderson requests an early check-in for the Safari suite, but it's occupied.");
  const [sandboxAIResult, setSandboxAIResult] = useState("");
  const [sandboxAILoading, setSandboxAILoading] = useState(false);

  // PMS Sandbox State
  const [pmsGuest, setPmsGuest] = useState("John Henderson");
  const [pmsRoom, setPmsRoom] = useState("204 (Luxury Safari Tent)");
  const [pmsStatus, setPmsStatus] = useState<"Reserved" | "CheckedIn" | "CheckedOut">("Reserved");
  const [pmsFolio, setPmsFolio] = useState<number>(0);
  const [pmsLog, setPmsLog] = useState<string[]>(["[PMS initialized]: Waiting for actions..."]);

  const handlePmsAction = (action: "assign" | "checkin" | "charge" | "checkout") => {
    if (action === "assign") {
      setPmsLog((prev) => [...prev, `[PMS Room Assigned]: Room 204 successfully locked to guest ${pmsGuest}.`]);
    } else if (action === "checkin") {
      setPmsStatus("CheckedIn");
      setPmsFolio((prev) => prev + 250);
      setPmsLog((prev) => [...prev, `[PMS Checked In]: ${pmsGuest} checked into Room 204. Nightly room rate $250 posted to Folio.`]);
    } else if (action === "charge") {
      setPmsFolio((prev) => prev + 45);
      setPmsLog((prev) => [...prev, `[PMS Folio Post]: Luxury Bush Breakfast charge $45 posted to guest folio.`]);
    } else if (action === "checkout") {
      setPmsStatus("CheckedOut");
      setPmsLog((prev) => [
        ...prev, 
        `[PMS Check Out]: Folio paid in full ($${pmsFolio} USD). Guest ${pmsGuest} checked out. Room 204 queued for Housekeeping.`
      ]);
      setPmsFolio(0);
    }
  };

  // CRS Yield Sandbox
  const [crsOccupancy, setCrsOccupancy] = useState<number>(65);
  const [crsBaseRate] = useState<number>(150);
  const crsMultiplier = crsOccupancy > 85 ? 1.8 : crsOccupancy > 75 ? 1.4 : crsOccupancy > 50 ? 1.15 : 1.0;
  const crsFinalRate = Math.round(crsBaseRate * crsMultiplier);

  // Direct Funnel Sandbox
  const [funnelPerks, setFunnelPerks] = useState({ breakfast: false, lateCheckout: false, directDiscount: false });
  const funnelConversion = 12 + (funnelPerks.breakfast ? 15 : 0) + (funnelPerks.lateCheckout ? 10 : 0) + (funnelPerks.directDiscount ? 18 : 0);

  // OTA Parity Sync State
  const [otaDirectPrice, setOtaDirectPrice] = useState<number>(180);
  const [otaSynced, setOtaSynced] = useState<boolean>(false);
  const [otaLog, setOtaLog] = useState<string>("Rates are out of sync! Channels have differing pricing.");

  const handleOtaSync = () => {
    setOtaSynced(true);
    setOtaLog("XML Channel manager sync successful! Booking.com, Expedia, and Direct rates match.");
  };

  // CRM VIP WELCOME CARD
  const [crmVIPName, setCrmVIPName] = useState("Ambassador Sterling");
  const [crmVIPOccasion, setCrmVIPOccasion] = useState("25th Anniversary Safari");
  const [crmVIPAllergy, setCrmVIPAllergy] = useState("Gluten Intolerance & Nut Allergy");
  const [crmWelcomeCard, setCrmWelcomeCard] = useState("");

  const handleGenerateWelcomeCard = () => {
    setCrmWelcomeCard(
      `Dear ${crmVIPName},\n\n` +
      `Welcome to CyberGraduates Lodge! It is an absolute honor to host you for your ${crmVIPOccasion}.\n\n` +
      `We have flagged your profile preferences regarding "${crmVIPAllergy}" with our culinary head chef, and all gourmet bush-dinners will be custom-prepared.\n\n` +
      `Enjoy your sunset game drives! Please contact your private butler at any hour.\n\n` +
      `Warmest African regards,\nCyberGraduates Reservations Desk`
    );
  };

  // MULTI-AI COMPILATION
  const [multiAIQuery, setMultiAIQuery] = useState("Draft late arrival check-in instructions");
  const [multiAISelected, setMultiAISelected] = useState<"gemini" | "chatgpt" | "copilot">("gemini");
  const multiAIOutputs = {
    gemini: "🏨 [Google Gemini - Highly personalized & empathetic]:\n'Greetings! We noticed your flight lands late. No worries! Your luxury safari tent is prepared, lamps are lit, and a gourmet cold platter awaits in your mini-fridge. The late-night guard will meet you at the main gate for a swift key handoff.'",
    chatgpt: "🤖 [ChatGPT - Structured & operational]:\n'Dear Guest. Please find your late arrival instructions. 1. Access main gate using PIN 2045. 2. Front desk office is closed after 10PM. 3. Your room key is stored in box #4. Please report to reception at 8:00 AM to process credit card.'",
    copilot: "💻 [Microsoft Copilot - Brief & professional]:\n'Late arrival instructions confirmed for reservation #9084. Key collection at gate guard. Breakfast served 7:00-10:00 AM. Please review hotel policies attached in email.'"
  };

  const handleRunAIResponse = () => {
    setSandboxAILoading(true);
    setTimeout(() => {
      setSandboxAILoading(false);
      let reply = "";
      const text = sandboxAIInput.toLowerCase();
      if (text.includes("broken") || text.includes("ac") || text.includes("refund")) {
        reply = "Dear Guest,\n\nWe are incredibly sorry to hear about the AC discrepancy in tent 304. Rest assured, our lead maintenance engineer has been dispatched to resolve this immediately.\n\nTo ensure your comfort, we have reserved a scenic table for you at our sunset deck for complimentary champagne while we process this. If the AC cannot be fixed within 30 minutes, we will gladly relocate you to our premium Safari suite with our compliments.\n\nWarm regards,\nCyberGraduates Reservation Desk";
      } else if (text.includes("early") || text.includes("safari") || text.includes("check-in")) {
        reply = "Dear Mr. Henderson,\n\nWelcome to our wilderness sanctuary! Your luxury safari suite is currently being polished by housekeeping to ensure absolute perfection.\n\nWhile our team prepares your room, we have organized an early morning guided bushwalk with our head ranger, starting in 15 minutes. Alternatively, you are welcome to enjoy organic fruit juices at our panoramic lounge. Your bags have been securely checked and will be in your room upon your return!\n\nWarm regards,\nFront Desk Team";
      } else {
        reply = `Dear Guest,\n\nThank you for reaching out to us. We have received your inquiry regarding "${sandboxAIInput}". Our luxury team is prioritizing your request to ensure a tailored, five-star stay.\n\nWe will update your reservation profile ledger immediately with these instructions.\n\nWarmest regards,\nGuest Services Lead`;
      }
      setSandboxAIResult(reply);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 relative animate-scale-in font-sans">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-10 w-10 bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center rounded-full transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-900 to-blue-950 text-white p-6 sm:p-8 pr-16 relative">
          <div className="absolute right-0 top-0 w-64 h-full bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 bg-teal-500/20 text-teal-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border border-teal-500/30">
              Interactive Preview
            </span>
            <span className="text-slate-400 text-xs font-semibold">•</span>
            <span className="text-slate-300 text-xs font-semibold">{course.duration} Module Demo</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
            {course.title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm line-clamp-1">
            {course.description}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50 p-2.5 gap-2">
          <button
            onClick={() => setActiveTab("video")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "video"
                ? "bg-white text-teal-950 shadow-md border border-slate-200/50"
                : "text-slate-650 hover:bg-white/50"
            }`}
          >
            <Video className="h-4 w-4" />
            Lecture Clip Simulator
          </button>
          <button
            onClick={() => {
              setActiveTab("sandbox");
              if (course.id === "ai-res" && !sandboxAIResult) {
                handleRunAIResponse();
              }
              if (course.id === "crm-guest" && !crmWelcomeCard) {
                handleGenerateWelcomeCard();
              }
            }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "sandbox"
                ? "bg-white text-teal-950 shadow-md border border-slate-200/50"
                : "text-slate-650 hover:bg-white/50"
            }`}
          >
            <Terminal className="h-4 w-4" />
            Hands-On Interactive Demo
          </button>
        </div>

        {/* Modal Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 min-h-[350px] max-h-[55vh]">
          {activeTab === "video" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Realistic Player Simulator */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-video rounded-2xl bg-slate-900 border border-slate-800 shadow-lg overflow-hidden flex flex-col justify-between p-4">
                  {/* Backdrop screenshot mockup of lecture slides */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center">
                    <div className="text-center space-y-2 p-6 max-w-xs">
                      <div className="h-10 w-10 bg-teal-500/10 border border-teal-500/20 rounded-xl flex items-center justify-center mx-auto">
                        <Sparkles className="h-5 w-5 text-teal-400 animate-pulse" />
                      </div>
                      <span className="block text-[11px] font-black text-teal-400 uppercase tracking-widest">Interactive Classroom</span>
                      <span className="block text-xs font-bold text-slate-300">Module Lecture & Multi-Channel Case Studies</span>
                    </div>
                  </div>

                  {/* Header overlay */}
                  <div className="z-10 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <span>LECTURE VIDEO SAMPLE</span>
                    <span className="text-teal-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                      Accredited Content
                    </span>
                  </div>

                  {/* Center Play Button indicator */}
                  <div className="z-10 flex items-center justify-center flex-1">
                    <button
                      onClick={handlePlayPause}
                      className="h-14 w-14 rounded-full bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center shadow-xl active:scale-90 transition-transform cursor-pointer"
                    >
                      {isPlaying ? <Pause className="h-6 w-6 fill-white" /> : <Play className="h-6 w-6 fill-white translate-x-0.5" />}
                    </button>
                  </div>

                  {/* Real-time Subtitle Overlay on screen */}
                  {isPlaying && currentLine && (
                    <div className="z-10 bg-black/75 backdrop-blur-xs text-white px-4 py-2 rounded-xl text-center text-xs font-semibold leading-relaxed max-w-md mx-auto mb-2 border border-white/5 animate-fade-in">
                      <span className="text-teal-400 text-[10px] font-extrabold uppercase block mb-0.5">{currentLine.speaker}</span>
                      "{currentLine.text}"
                    </div>
                  )}

                  {/* Video Control Bar */}
                  <div className="z-10 bg-slate-950/95 backdrop-blur-sm p-3 rounded-xl border border-slate-800 space-y-2.5">
                    {/* Time bar slider */}
                    <div className="relative w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="absolute h-full bg-teal-500 transition-all duration-300"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                      <div className="flex items-center gap-3">
                        <button onClick={handlePlayPause} className="hover:text-white transition-colors cursor-pointer">
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </button>
                        <button onClick={handleResetVideo} className="hover:text-white transition-colors cursor-pointer">
                          <RotateCcw className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-mono text-[11px]">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Volume2 className="h-4 w-4" />
                        <Settings className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs text-slate-600 leading-relaxed">
                  <Laptop className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">How this helps you learn:</span>
                    Interactive lectures combine visual screens, real system walk-throughs, and instant translation models so you gain muscle memory for hotel desks.
                  </div>
                </div>
              </div>

              {/* Right Column: Live Transcript Synchronization */}
              <div className="lg:col-span-5 flex flex-col h-[270px] lg:h-[235px] border border-slate-100 rounded-2xl overflow-hidden bg-slate-50">
                <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Sync Transcript</span>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">Automated</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs">
                  {activeTranscript.map((line, idx) => {
                    const isActive = currentTime >= line.time && (idx === activeTranscript.length - 1 || currentTime < activeTranscript[idx + 1].time);
                    return (
                      <div 
                        key={idx}
                        onClick={() => {
                          setCurrentTime(line.time);
                          setIsPlaying(true);
                        }}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                          isActive 
                            ? "bg-teal-50 border-teal-200 shadow-xs" 
                            : "bg-white border-slate-100 hover:border-slate-200 text-slate-600"
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span className={isActive ? "text-teal-800" : "text-slate-700"}>{line.speaker}</span>
                          <span className="font-mono text-[10px] text-slate-400">{formatTime(line.time)}</span>
                        </div>
                        <p className={isActive ? "text-slate-850 font-medium" : "text-slate-500"}>"{line.text}"</p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {activeTab === "sandbox" && (
            <div className="space-y-6">
              
              {/* 1. AI FOR RESERVATIONS SANDBOX */}
              {course.id === "ai-res" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2.5">
                      <Sparkles className="h-4.5 w-4.5 text-teal-600" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase">Input Scenario</h4>
                    </div>
                    <p className="text-xs text-slate-500">Pick a predefined hospitality crisis or edit below to test response generations:</p>
                    <div className="space-y-1.5">
                      {[
                        "Henderson requests early check-in for Safari Suite, but it's occupied.",
                        "Guest is angry about broken AC in Room 304 and demands full refund."
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSandboxAIInput(item)}
                          className="w-full text-left p-2.5 text-xs rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors cursor-pointer"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Custom Prompt</label>
                      <textarea
                        value={sandboxAIInput}
                        onChange={(e) => setSandboxAIInput(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 h-20"
                      />
                    </div>
                    <button
                      onClick={handleRunAIResponse}
                      disabled={sandboxAILoading}
                      className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-full shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      {sandboxAILoading ? "Compiling with Google Gemini..." : "Generate AI Proposal"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  
                  <div className="md:col-span-7 bg-slate-900 text-slate-200 p-5 rounded-2xl border border-slate-800 h-[340px] flex flex-col justify-between shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-400">output_response.md</span>
                      <span className="text-[9px] bg-teal-500/10 text-teal-400 px-2.5 py-0.5 rounded border border-teal-500/20 uppercase font-bold">Processed</span>
                    </div>
                    <div className="flex-1 overflow-y-auto text-xs font-mono leading-relaxed text-slate-300">
                      {sandboxAILoading ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-2">
                          <span className="h-6 w-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></span>
                          <span className="text-slate-400 text-[10px]">Processing hospitality tone parameters...</span>
                        </div>
                      ) : sandboxAIResult ? (
                        <div className="whitespace-pre-line p-1 bg-slate-950/40 rounded-lg border border-slate-850">
                          {sandboxAIResult}
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                          <Terminal className="h-8 w-8 mb-2" />
                          <p className="max-w-xs text-[11px]">Click "Generate" to compile a perfect luxury response draft.</p>
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-2 flex items-center justify-between font-mono">
                      <span>Google Gemini Pro</span>
                      <span>100% Policy Parity</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. PMS MASTERY SANDBOX */}
              {course.id === "pms-mastery" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start animate-fade-in">
                  <div className="md:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2.5">
                      <Laptop className="h-4.5 w-4.5 text-teal-600" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase">PMS Controls</h4>
                    </div>
                    <div className="space-y-3.5 text-xs">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase">Guest Name</span>
                        <input
                          type="text"
                          value={pmsGuest}
                          onChange={(e) => setPmsGuest(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 mt-1 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handlePmsAction("assign")}
                          className="py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer text-center"
                        >
                          Assign Room 204
                        </button>
                        <button
                          onClick={() => handlePmsAction("checkin")}
                          disabled={pmsStatus === "CheckedIn"}
                          className="py-2 px-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg cursor-pointer text-center disabled:opacity-50"
                        >
                          Check In Guest
                        </button>
                        <button
                          onClick={() => handlePmsAction("charge")}
                          disabled={pmsStatus !== "CheckedIn"}
                          className="py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer text-center disabled:opacity-50"
                        >
                          + Post $45 Breakfast
                        </button>
                        <button
                          onClick={() => handlePmsAction("checkout")}
                          disabled={pmsStatus !== "CheckedIn"}
                          className="py-2 px-3 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-lg cursor-pointer text-center disabled:opacity-50"
                        >
                          Settle & Out
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-7 bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between h-[340px] shadow-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase font-sans">Active Reception Screen</span>
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                          pmsStatus === "CheckedIn" ? "bg-emerald-100 text-emerald-800" : pmsStatus === "CheckedOut" ? "bg-slate-100 text-slate-650" : "bg-teal-100 text-teal-850"
                        }`}>
                          {pmsStatus}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">Guest Profile</span>
                          <span className="block text-slate-800 font-bold mt-0.5">{pmsGuest}</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">Assigned Key</span>
                          <span className="block text-slate-800 font-bold mt-0.5">{pmsRoom}</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 col-span-2 flex items-center justify-between">
                          <div>
                            <span className="block text-[9px] font-bold text-slate-400 uppercase">Total Folio Balance</span>
                            <span className="block text-slate-800 font-black text-base mt-0.5">${pmsFolio} USD</span>
                          </div>
                          {pmsStatus === "CheckedIn" && (
                            <span className="text-[10px] text-emerald-600 font-bold">Unsettled Charges Active</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950 text-emerald-400 p-3 rounded-xl font-mono text-[10px] space-y-1 h-24 overflow-y-auto border border-slate-850 mt-4">
                      {pmsLog.map((logLine, idx) => (
                        <div key={idx} className="leading-tight">{logLine}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. CRS DISTRIBUTION SANDBOX */}
              {course.id === "crs-distribution" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start animate-fade-in">
                  <div className="md:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2.5">
                      <Sliders className="h-4.5 w-4.5 text-teal-600" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase">Yield Management</h4>
                    </div>
                    <div className="space-y-4 text-xs font-sans">
                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span className="text-slate-500">Lodge Occupancy</span>
                          <span className="text-teal-700 font-mono font-black">{crsOccupancy}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={crsOccupancy}
                          onChange={(e) => setCrsOccupancy(Number(e.target.value))}
                          className="w-full accent-teal-600"
                        />
                      </div>
                      
                      <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase">Trigger Thresholds</span>
                        <div className="flex justify-between text-[10px] font-semibold">
                          <span className="text-slate-500">50% Occupancy:</span>
                          <span className="text-slate-700">1.15x Rate</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-semibold">
                          <span className="text-slate-500">75% Occupancy:</span>
                          <span className="text-slate-700">1.40x Rate</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-semibold">
                          <span className="text-slate-500">85% Peak:</span>
                          <span className="text-amber-600 font-bold">1.80x Rate & Stop-Sell</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-7 bg-white border border-slate-200 p-5 rounded-2xl h-[340px] flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase font-sans">Central Reservations Ledger</span>
                        <span className="text-[10px] bg-teal-50 text-teal-800 font-bold px-2.5 py-0.5 rounded-full uppercase">
                          Dynamic Rates Active
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 items-center">
                          <div>
                            <span className="block text-[9px] font-bold text-slate-400 uppercase">Base Winter Rate</span>
                            <span className="block text-slate-700 font-bold mt-0.5">$150 USD</span>
                          </div>
                          <span className="text-slate-300 font-bold">→</span>
                          <div>
                            <span className="block text-[9px] font-bold text-teal-600 uppercase">Current Yield rate</span>
                            <span className="block text-teal-850 font-black text-lg mt-0.5">${crsFinalRate} USD</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="block text-[9px] font-bold text-slate-400 uppercase">Channel Parity status</span>
                            <span className={`block font-bold mt-0.5 ${crsOccupancy > 85 ? "text-amber-600" : "text-teal-600"}`}>
                              {crsOccupancy > 85 ? "Warning: Stop-Sell Triggered!" : "Synchronized (Booking/Expedia)"}
                            </span>
                          </div>
                          {crsOccupancy > 85 ? <AlertTriangle className="h-5 w-5 text-amber-500 animate-pulse" /> : <ShieldCheck className="h-5 w-5 text-teal-600" />}
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 leading-relaxed font-semibold bg-teal-50 p-3.5 rounded-xl border border-teal-100/60">
                      <strong>How this helps you learn:</strong> Study how large resort chains handle group bookings and dynamically update CRS pricing rules automatically when occupancy spikes.
                    </div>
                  </div>
                </div>
              )}

              {/* 4. ONLINE BOOKING ENGINES SANDBOX */}
              {course.id === "booking-engines" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start animate-fade-in">
                  <div className="md:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2.5">
                      <Layers className="h-4.5 w-4.5 text-teal-600" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase">Checkout Funnels</h4>
                    </div>
                    <p className="text-xs text-slate-550 leading-relaxed">Add value-added perks below to optimize hotel direct bookings and see conversion rates climb:</p>
                    <div className="space-y-2.5 text-xs font-sans">
                      <label className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={funnelPerks.breakfast}
                          onChange={(e) => setFunnelPerks({ ...funnelPerks, breakfast: e.target.checked })}
                          className="rounded accent-teal-600"
                        />
                        <div>
                          <span className="block font-bold">Complimentary Breakfast perk</span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">+15% Funnel Conversion</span>
                        </div>
                      </label>
                      <label className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={funnelPerks.lateCheckout}
                          onChange={(e) => setFunnelPerks({ ...funnelPerks, lateCheckout: e.target.checked })}
                          className="rounded accent-teal-600"
                        />
                        <div>
                          <span className="block font-bold">Late checkout priority card</span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">+10% Funnel Conversion</span>
                        </div>
                      </label>
                      <label className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={funnelPerks.directDiscount}
                          onChange={(e) => setFunnelPerks({ ...funnelPerks, directDiscount: e.target.checked })}
                          className="rounded accent-teal-600"
                        />
                        <div>
                          <span className="block font-bold">10% Direct booking discount</span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">+18% Funnel Conversion</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-7 bg-white border border-slate-200 p-5 rounded-2xl h-[340px] flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase font-sans">A/B Testing Simulator</span>
                        <span className="text-[10px] bg-teal-50 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">Active Metrics</span>
                      </div>

                      <div className="space-y-3">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center space-y-1">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase">Simulated Checkout Completion</span>
                          <span className="block text-4xl font-black text-teal-600 font-mono tracking-tight">{funnelConversion}%</span>
                          <span className="block text-[10px] text-slate-500 mt-1">Industry standard is approx. 15%</span>
                        </div>

                        {funnelConversion > 30 ? (
                          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 text-xs flex items-center gap-2.5">
                            <Check className="h-4 w-4 text-emerald-600" />
                            <span>Great optimization! The direct booking engine beats standard OTA referrals.</span>
                          </div>
                        ) : (
                          <div className="p-3 bg-amber-50 text-amber-800 rounded-xl border border-amber-100 text-xs flex items-center gap-2.5">
                            <AlertTriangle className="h-4 w-4 text-amber-600 animate-pulse" />
                            <span>Low conversions. Add incentives to discourage users from fleeing back to Booking.com.</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 leading-relaxed font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <strong>How this helps you learn:</strong> Explore direct booking conversion funnels and master how to avoid high commissions to OTAs.
                    </div>
                  </div>
                </div>
              )}

              {/* 5. CHANNEL MANAGERS SANDBOX */}
              {course.id === "channel-managers" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start animate-fade-in">
                  <div className="md:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2.5">
                      <ToggleLeft className="h-4.5 w-4.5 text-teal-600" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase">Sync Operations</h4>
                    </div>
                    <div className="space-y-4 text-xs font-sans">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase">Direct Booking Price</span>
                        <input
                          type="number"
                          value={otaDirectPrice}
                          onChange={(e) => {
                            setOtaDirectPrice(Number(e.target.value));
                            setOtaSynced(false);
                            setOtaLog("Rates are out of sync! Channels have differing pricing.");
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 mt-1 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                      
                      <button
                        onClick={handleOtaSync}
                        className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-full cursor-pointer text-center"
                      >
                        Enforce Parity Sync
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-7 bg-white border border-slate-200 p-5 rounded-2xl h-[340px] flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase font-sans">OTA Distribution Parity Panel</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          otaSynced ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                        }`}>
                          {otaSynced ? "Synchronized" : "Disparity Alert"}
                        </span>
                      </div>

                      <div className="space-y-2 text-xs font-sans">
                        <div className="flex justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl items-center">
                          <span className="font-bold text-slate-700">Direct Lodge Portal:</span>
                          <span className="font-mono font-bold text-teal-600">${otaDirectPrice} USD</span>
                        </div>
                        <div className="flex justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl items-center">
                          <span className="font-bold text-slate-700">Booking.com:</span>
                          <span className={`font-mono font-bold ${otaSynced ? "text-teal-600" : "text-red-500 animate-pulse"}`}>
                            ${otaSynced ? otaDirectPrice : 210} USD
                          </span>
                        </div>
                        <div className="flex justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl items-center">
                          <span className="font-bold text-slate-700">Expedia:</span>
                          <span className={`font-mono font-bold ${otaSynced ? "text-teal-600" : "text-red-500 animate-pulse"}`}>
                            ${otaSynced ? otaDirectPrice : 195} USD
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-150 leading-relaxed font-semibold">
                      <strong>Log message:</strong> {otaLog}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. CRM GUEST WELCOME CARD */}
              {course.id === "crm-guest" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start animate-fade-in">
                  <div className="md:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2.5">
                      <UserCheck className="h-4.5 w-4.5 text-teal-600" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase">VIP preferences</h4>
                    </div>
                    <div className="space-y-3.5 text-xs font-sans">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase">VIP Guest Name</span>
                        <input
                          type="text"
                          value={crmVIPName}
                          onChange={(e) => setCrmVIPName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 mt-1 text-xs text-slate-850 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase">Occasion</span>
                        <input
                          type="text"
                          value={crmVIPOccasion}
                          onChange={(e) => setCrmVIPOccasion(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 mt-1 text-xs text-slate-850 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase">Medical / Dietary Allergy</span>
                        <input
                          type="text"
                          value={crmVIPAllergy}
                          onChange={(e) => setCrmVIPAllergy(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 mt-1 text-xs text-slate-850 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                      
                      <button
                        onClick={handleGenerateWelcomeCard}
                        className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-full cursor-pointer text-center shadow-xs"
                      >
                        Compile Welcome Letter
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-7 bg-white border border-slate-200 p-5 rounded-2xl h-[340px] flex flex-col justify-between shadow-sm">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase font-sans">Automated CRM Print Preview</span>
                        <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">VIP CARD</span>
                      </div>

                      <div className="p-4 bg-amber-50/40 border border-amber-100 rounded-xl text-slate-700 font-sans text-[11px] leading-relaxed whitespace-pre-line h-48 overflow-y-auto italic shadow-inner">
                        {crmWelcomeCard}
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 leading-none flex justify-between font-mono">
                      <span>Lodge-CRM v4.2</span>
                      <span>Syllabus Module 3 case</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. AI MULTI-BOT COMPARATOR */}
              {course.id === "ai-hospitality-tools" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start animate-fade-in">
                  <div className="md:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2.5">
                      <Sliders className="h-4.5 w-4.5 text-teal-600" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase">Engine Settings</h4>
                    </div>
                    <div className="space-y-4 text-xs font-sans">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase">Input Scenario Query</span>
                        <input
                          type="text"
                          value={multiAIQuery}
                          onChange={(e) => setMultiAIQuery(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2.5 mt-1 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                      
                      <div>
                        <span className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Select Active AI Module</span>
                        <div className="grid grid-cols-3 gap-2">
                          {(["gemini", "chatgpt", "copilot"] as const).map((aiId) => (
                            <button
                              key={aiId}
                              onClick={() => setMultiAISelected(aiId)}
                              className={`py-2 text-[10px] font-bold rounded-lg cursor-pointer text-center border uppercase ${
                                multiAISelected === aiId
                                  ? "bg-teal-600 border-teal-600 text-white shadow-xs"
                                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {aiId}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-7 bg-slate-900 text-slate-200 p-5 rounded-2xl h-[340px] flex flex-col justify-between shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-400">Live AI Output Simulator</span>
                      <span className="text-[9px] bg-teal-500/10 text-teal-400 px-2.5 py-0.5 rounded border border-teal-500/20 font-bold uppercase">Active Compare</span>
                    </div>

                    <div className="flex-1 bg-slate-950/40 border border-slate-850 p-4 rounded-xl font-mono text-[11px] text-slate-300 leading-relaxed overflow-y-auto">
                      {multiAIOutputs[multiAISelected]}
                    </div>

                    <div className="text-[10px] text-slate-500 leading-relaxed font-sans border-t border-slate-800 pt-3 mt-3">
                      <strong>How this helps you learn:</strong> Study how to select the absolute best AI model for different desk scenarios—comparing speed, custom templates, and empathy levels.
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-100 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-550 text-xs text-center sm:text-left">
            <ShieldCheck className="h-5 w-5 text-teal-600 flex-shrink-0" />
            <span>Ready for full credentials? This is just a glimpse of our practical sandboxes.</span>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-full cursor-pointer hover:bg-slate-50 transition-colors"
            >
              Back to Catalog
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenEnroll();
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-full cursor-pointer shadow-md shadow-teal-600/15 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              Enroll in Full Course
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
