import React, { useState } from "react";
import { Sparkles, Mail, Send, Check, ShieldCheck, Globe } from "lucide-react";

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSuccess(true);
    setEmail("");
  };

  const navigateTo = (tabId: string) => {
    setTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white/40 backdrop-blur-md text-slate-600 font-sans border-t border-slate-200/50 pt-16 pb-12 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-slate-200/50">
          
          {/* Col 1: Branding */}
          <div className="lg:col-span-4 space-y-5">
            <button
              onClick={() => navigateTo("home")}
              className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md">
                <Sparkles className="h-5.5 w-5.5 text-amber-300" />
              </div>
              <div>
                <span className="block font-sans text-lg font-bold tracking-tight text-slate-900 leading-none">
                  CYBER<span className="text-teal-600">GRADUATES</span>
                </span>
                <span className="block text-[10px] font-bold tracking-widest text-amber-600 uppercase leading-normal mt-0.5">
                  AI Booking Academy
                </span>
              </div>
            </button>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Empowering tourism professionals and lodge operators across Africa and Europe with high-conversion reservations methodologies and Google Gemini automation models.
            </p>
            <div className="flex items-center gap-2.5 text-slate-700 font-semibold text-xs">
              <ShieldCheck className="h-4.5 w-4.5 text-teal-600" />
              <span>Accredited Reservation Training Provider</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="text-slate-900 text-xs font-extrabold uppercase tracking-widest border-l-2 border-teal-500 pl-2">
              Syllabus Paths
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => navigateTo("courses")} className="hover:text-teal-650 transition-colors cursor-pointer text-left">
                  Property Management (PMS)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("courses")} className="hover:text-teal-650 transition-colors cursor-pointer text-left">
                  Central Reservations (CRS)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("courses")} className="hover:text-teal-650 transition-colors cursor-pointer text-left">
                  AI for Hospitality Desk
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("courses")} className="hover:text-teal-650 transition-colors cursor-pointer text-left">
                  Channel parity Managers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Links */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="text-slate-900 text-xs font-extrabold uppercase tracking-widest border-l-2 border-teal-500 pl-2">
              Student Portals
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => navigateTo("trainer")} className="hover:text-teal-650 transition-colors cursor-pointer text-left">
                  AI Guest simulator Trainer
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("resources")} className="hover:text-teal-650 transition-colors cursor-pointer text-left">
                  AI Prompt compiler
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("corporate")} className="hover:text-teal-650 transition-colors cursor-pointer text-left">
                  Corporate Lodge Quote
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("blog")} className="hover:text-teal-650 transition-colors cursor-pointer text-left">
                  Hospitality Tech Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-slate-900 text-xs font-extrabold uppercase tracking-widest border-l-2 border-teal-500 pl-2">
              Industry Briefings
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Receive monthly hotel occupancy checklists, new prompt macros, and system updates.
            </p>

            {success ? (
              <div className="bg-teal-50 border border-teal-200/60 p-3 rounded-full text-xs text-teal-800 font-semibold flex items-center justify-center gap-2 animate-fade-in">
                <Check className="h-4 w-4 text-teal-600" />
                <span>Subscription successful!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="flex-1 flex items-center bg-white border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-800">
                  <Mail className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    className="bg-transparent focus:outline-none w-full font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="p-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow cursor-pointer transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Globe className="h-4.5 w-4.5 text-slate-400" />
            <span>© 2026 CyberGraduates Academy. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo("faq")} className="hover:text-slate-800 cursor-pointer">Privacy Policy</button>
            <button onClick={() => navigateTo("faq")} className="hover:text-slate-800 cursor-pointer">Terms & Conditions</button>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-slate-500 bg-white/50 border border-slate-200/60 px-3 py-1 rounded-full">
              UTC Desk Node Active
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
