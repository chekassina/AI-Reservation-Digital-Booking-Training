import React from "react";
import { Cpu, Award, Calendar, BookOpen, Globe, TrendingUp } from "lucide-react";

export default function WhyCyber() {
  const highlights = [
    {
      icon: <Cpu className="h-7 w-7 text-teal-600" />,
      title: "AI-Powered Learning",
      description: "Direct hands-on simulation tools using cutting-edge models (Gemini, ChatGPT) to handle booking, overbooking, and de-escalation scenarios in real-time.",
    },
    {
      icon: <Award className="h-7 w-7 text-amber-500" />,
      title: "International Certification",
      description: "Earn accredited certifications recognized globally by five-star hotels, luxury boutique resorts, safari operators, and cruise ships.",
    },
    {
      icon: <Calendar className="h-7 w-7 text-blue-600" />,
      title: "Flexible Online Training",
      description: "Study 100% online from any device, anytime. Tailored perfectly for active reservation desk professionals balancing busy shifts.",
    },
    {
      icon: <BookOpen className="h-7 w-7 text-purple-600" />,
      title: "Practical Workplace Skills",
      description: "Skip dry theory. Engage in authentic sandboxes of cloud property management systems (PMS) and central reservation configurations.",
    },
    {
      icon: <Globe className="h-7 w-7 text-cyan-600" />,
      title: "Industry Experts",
      description: "Learn from veterans who managed reservations for top hotels in South Africa, Botswana, and Europe. Benefit from true operational secrets.",
    },
    {
      icon: <TrendingUp className="h-7 w-7 text-emerald-600" />,
      title: "Career Advancement",
      description: "98% of our graduates reported direct promotion or employment upgrades within 90 days of concluding their booking modules.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-transparent relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Why Choose CyberGraduates?
          </h2>
          <div className="h-1 w-16 bg-teal-600 mx-auto rounded-full mb-5" />
          <p className="text-slate-600 text-base sm:text-lg">
            We bridge the gap between legacy hospitality methods and the digital automation wave, turning reservation staff into high-value revenue assets.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white/70 backdrop-blur-md p-8 rounded-2xl border border-white/60 shadow-xs hover:shadow-xl hover:border-white/80 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Highlight background light */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-50/10 to-blue-50/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-xs mb-6 group-hover:scale-105 transition-all duration-200">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors font-sans">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
