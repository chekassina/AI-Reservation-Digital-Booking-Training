import React, { useState } from "react";
import { FAQS } from "../data";
import { ChevronDown, ChevronUp, HelpCircle, FileQuestion } from "lucide-react";

export default function FAQWidget() {
  const [activeId, setActiveId] = useState<string | null>("f1");
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "general", label: "Accreditation" },
    { id: "courses", label: "Course Structure" },
    { id: "payment", label: "Payments" },
    { id: "corporate", label: "Corporate Groups" },
  ];

  const filteredFaqs = FAQS.filter(
    (faq) => activeTab === "all" || faq.category === activeTab
  );

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-20 bg-transparent relative z-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50/75 border border-teal-100 text-teal-805 text-xs font-semibold tracking-wide uppercase mb-3 animate-fade-in">
            <FileQuestion className="h-4 w-4 text-teal-600" />
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-650 text-sm sm:text-base">
            Everything you need to know about certificates, computer requirements, and team onboarding.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                // Reset active accordion to first item of new filter if any
                const matches = FAQS.filter((f) => cat.id === "all" || f.category === cat.id);
                if (matches.length > 0) setActiveId(matches[0].id);
              }}
              className={`px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                activeTab === cat.id
                  ? "bg-teal-600 text-white shadow-md shadow-teal-600/15"
                  : "bg-white/50 border border-slate-200/55 text-slate-700 hover:bg-white/90"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Deck */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white/70 backdrop-blur-md rounded-2xl border transition-all overflow-hidden ${
                  isOpen ? "border-teal-500/50 bg-white/95 shadow-md" : "border-white/55 shadow-xs"
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`h-5 w-5 flex-shrink-0 ${isOpen ? "text-teal-600" : "text-slate-400"}`} />
                    <span className="font-bold text-slate-800 text-sm sm:text-base leading-tight font-sans">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-teal-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-slide-down">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
