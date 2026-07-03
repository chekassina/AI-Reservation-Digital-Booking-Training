import React from "react";
import { motion } from "motion/react";
import { Sparkles, Brain, Clock, ShieldCheck, Award, MessageSquare, ArrowRight, TrendingUp } from "lucide-react";

interface WhyAIHospitalityProps {
  onViewBlog: () => void;
  onViewAICourses: () => void;
}

export default function WhyAIHospitality({ onViewBlog, onViewAICourses }: WhyAIHospitalityProps) {
  return (
    <section className="py-24 bg-white border-y border-slate-100 relative overflow-hidden z-10">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-teal-100/30 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute right-10 bottom-10 w-[250px] h-[250px] bg-indigo-50/40 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50/75 border border-teal-150 text-teal-800 text-xs font-semibold tracking-wide uppercase mb-3.5">
            <Brain className="h-4 w-4 text-teal-600" />
            Modern Industry Trends
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 font-sans">
            Why AI in Hospitality?
          </h2>
          <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
            Discover how artificial intelligence is rewriting the rules of hospitality operations—powering high-conversion reservation offices, elevating luxury guest care, and opening elite career opportunities.
          </p>
        </div>

        {/* 3 Pillar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Pillar 1: Reservation Efficiency */}
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:border-teal-500/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-6">
              {/* Stat & Icon */}
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                  <Clock className="h-6 w-6 text-teal-600" />
                </div>
                <span className="text-3xl font-black text-teal-600 tracking-tight font-mono">
                  -75%
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
                  Reservation Efficiency
                </h3>
                <p className="text-xs text-teal-700 font-semibold mb-4 uppercase tracking-wider">
                  Accelerated Proposals
                </p>
                <ul className="space-y-3.5 text-slate-600 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-500 font-bold mt-0.5">✦</span>
                    <span>Draft personalized, high-conversion emails in under 90 seconds instead of hours.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-500 font-bold mt-0.5">✦</span>
                    <span>Automate repetitive guest FAQ checks (Wi-Fi, parking rules) with absolute accuracy.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-500 font-bold mt-0.5">✦</span>
                    <span>Audit complicated direct room reservations and rate parities seamlessly using smart models.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-200/50 mt-8">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block leading-none">Efficiency Metric</span>
              <span className="text-xs font-bold text-slate-700 mt-1 block">90s proposal generation</span>
            </div>
          </div>

          {/* Pillar 2: Guest Experience */}
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:border-teal-500/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-6">
              {/* Stat & Icon */}
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <MessageSquare className="h-6 w-6 text-amber-600" />
                </div>
                <span className="text-3xl font-black text-amber-600 tracking-tight font-mono">
                  +24%
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
                  Guest Experience (NPS)
                </h3>
                <p className="text-xs text-amber-700 font-semibold mb-4 uppercase tracking-wider">
                  Personalized Luxury Care
                </p>
                <ul className="space-y-3.5 text-slate-600 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold mt-0.5">✦</span>
                    <span>Formulate prompt, highly empathetic de-escalation scripts for booking disputes or overbookings.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold mt-0.5">✦</span>
                    <span>Compile customizable luxury itineraries (private safaris, wine excursions) curated on-the-fly.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold mt-0.5">✦</span>
                    <span>Translate entire welcome itineraries and local resort facts into 25+ guest languages instantly.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-200/50 mt-8">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block leading-none">Satisfaction Metric</span>
              <span className="text-xs font-bold text-slate-700 mt-1 block">High-empathy rapid responses</span>
            </div>
          </div>

          {/* Pillar 3: Career Opportunities */}
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:border-teal-500/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-6">
              {/* Stat & Icon */}
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                </div>
                <span className="text-3xl font-black text-indigo-600 tracking-tight font-mono">
                  3.5x
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
                  Career Opportunities
                </h3>
                <p className="text-xs text-indigo-700 font-semibold mb-4 uppercase tracking-wider">
                  Accredited Specialization
                </p>
                <ul className="space-y-3.5 text-slate-600 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="text-indigo-500 font-bold mt-0.5">✦</span>
                    <span>Gain premium certifications confirming active mastery of PMS sandboxes and hospitality prompt models.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-indigo-500 font-bold mt-0.5">✦</span>
                    <span>Become a highly competitive candidate for elite wilderness lodges and urban boutique hotels.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-indigo-500 font-bold mt-0.5">✦</span>
                    <span>Pivot from static front-office entry roles to strategic reservations revenue managers.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-200/50 mt-8">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block leading-none">Candidate Metric</span>
              <span className="text-xs font-bold text-slate-700 mt-1 block">Accredited CHAS credentials</span>
            </div>
          </div>

        </div>

        {/* Action / Linking Panel */}
        <div className="bg-gradient-to-r from-teal-900 to-blue-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-2.5 max-w-2xl text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold tracking-tight">
              Ready to delve deeper into AI-driven Hospitality?
            </h4>
            <p className="text-teal-100 text-xs sm:text-sm leading-relaxed">
              Read how leading safari lodges utilize Google Gemini in our hospitality technology blog, or view our flagship accredited training modules.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 w-full md:w-auto">
            <button
              onClick={onViewBlog}
              className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold rounded-full cursor-pointer transition-colors text-center"
            >
              Read Technology Blog
            </button>
            <button
              onClick={onViewAICourses}
              className="px-5 py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 text-xs font-bold rounded-full cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-teal-500/15"
            >
              Explore AI Courses
              <ArrowRight className="h-4 w-4 text-slate-950" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
