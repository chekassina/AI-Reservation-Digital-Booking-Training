import React, { useState, useMemo } from "react";
import { Building2, Calculator, Check, ArrowRight, MessageSquare, ShieldCheck } from "lucide-react";

export default function CorporateQuote() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    propertyType: "safari_lodge",
    teamSize: "10",
    deliveryMode: "hybrid",
    pmsRequired: true,
    crsRequired: true,
    aiRequired: true,
    otaRequired: false,
    crmRequired: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Dynamic estimate generator based on options
  const estimatedCost = useMemo(() => {
    let basePricePerStudent = 250;
    
    if (formData.deliveryMode === "self_paced") basePricePerStudent = 180;
    if (formData.deliveryMode === "onsite") basePricePerStudent = 350;

    const size = parseInt(formData.teamSize) || 10;
    let subtotal = size * basePricePerStudent;

    // Add modular systems cost
    let modulesCount = 0;
    if (formData.pmsRequired) modulesCount++;
    if (formData.crsRequired) modulesCount++;
    if (formData.aiRequired) modulesCount++;
    if (formData.otaRequired) modulesCount++;
    if (formData.crmRequired) modulesCount++;

    const systemSurcharge = modulesCount * 120 * size;
    let finalTotal = subtotal + systemSurcharge;

    // Apply corporate group tier discounts
    if (size >= 50) {
      finalTotal *= 0.70; // 30% off
    } else if (size >= 25) {
      finalTotal *= 0.80; // 20% off
    } else if (size >= 10) {
      finalTotal *= 0.90; // 10% off
    }

    return Math.round(finalTotal);
  }, [
    formData.teamSize,
    formData.deliveryMode,
    formData.pmsRequired,
    formData.crsRequired,
    formData.aiRequired,
    formData.otaRequired,
    formData.crmRequired,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <section className="py-20 sm:py-24 bg-transparent text-slate-800 overflow-hidden relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Info Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50/75 border border-teal-100 text-teal-800 text-xs font-semibold tracking-wide uppercase">
              <Building2 className="h-4 w-4 text-teal-600" />
              Lodge & Resort Modules
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-sans">
              Tailored Training for Hospitality Groups
            </h2>

            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
              We upgrade entire reservation divisions. Whether you operate a luxury safari camp in Chobe, a boutique lodge in the Winelands, or a national resort chain, we construct hybrid curriculums matching your specific PMS, OTA channels, and guest guidelines.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Custom System Mapping</h4>
                  <p className="text-xs text-slate-550 mt-0.5">We map training directly onto your active PMS software (Opera, GuestReverie, RoomRaccoon, etc.) and OTA configurations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Hybrid Workshop Modalities</h4>
                  <p className="text-xs text-slate-550 mt-0.5">Combine interactive online webinars, physical on-site roleplay labs, and custom AI prompt exercises for your desk staff.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Accredited Enterprise Invoice Support</h4>
                  <p className="text-xs text-slate-550 mt-0.5">We offer full multi-currency business billing files and post-graduation competency metrics reports for HR directors.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Calculator & Form Panel */}
          <div className="lg:col-span-7 bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/60 shadow-xl space-y-6">
            
            {isSuccess ? (
              <div className="text-center py-16 space-y-5 animate-fade-in text-slate-800">
                <div className="h-16 w-16 bg-teal-100 text-teal-700 border border-teal-200 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <ShieldCheck className="h-10 w-10 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Quotation Request Received!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Excellent, <strong>{formData.contactName}</strong>. Our enterprise team has generated request file #<strong>CG-{Math.floor(1000 + Math.random() * 9000)}</strong> for <strong>{formData.companyName}</strong>. 
                  A detailed corporate contract draft has been dispatched to <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-full cursor-pointer hover:bg-slate-800 transition-colors"
                >
                  Recalculate Quote
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-200/60 pb-3 mb-2 text-slate-800">
                  <Calculator className="h-5 w-5 text-teal-600" />
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 font-sans">
                    Enterprise Quote & Syllabus Estimator
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-sans">Company / Lodge Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Chobe Safari Lodge"
                      className="w-full bg-white border border-slate-200/50 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-sans">Contact Person Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="e.g. John Smith"
                      className="w-full bg-white border border-slate-200/50 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-sans">Professional Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@lodgegroup.com"
                      className="w-full bg-white border border-slate-200/50 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-sans">Property Type</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full bg-white border border-slate-200/50 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="safari_lodge">Safari Lodge / Wilderness Camp</option>
                      <option value="boutique_hotel">Boutique Guest House</option>
                      <option value="large_resort">Resort & Conference Center</option>
                      <option value="travel_agency">Travel Operator / Agency</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-sans">Reservation Team Size</label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full bg-white border border-slate-200/50 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="5">Small Desk (1 - 5 staff)</option>
                      <option value="10">Standard Group (6 - 15 staff) - 10% Off</option>
                      <option value="25">Large Division (16 - 35 staff) - 20% Off</option>
                      <option value="50">Enterprise Chain (36 - 60+ staff) - 30% Off</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-sans">Preferred delivery mode</label>
                    <select
                      value={formData.deliveryMode}
                      onChange={(e) => setFormData({ ...formData, deliveryMode: e.target.value })}
                      className="w-full bg-white border border-slate-200/50 rounded-lg p-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="self_paced">100% Self-Paced Online</option>
                      <option value="hybrid">Hybrid Webinars + Guided Sandboxes</option>
                      <option value="onsite">On-Site Lodge Roleplay Audit</option>
                    </select>
                  </div>
                </div>

                {/* Core Systems Modules Checklist */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-550 uppercase font-sans">Target Systems Integration</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 bg-white/60 p-2 rounded border border-slate-200/40 text-xs cursor-pointer text-slate-700 hover:bg-white/95">
                      <input
                        type="checkbox"
                        checked={formData.pmsRequired}
                        onChange={(e) => setFormData({ ...formData, pmsRequired: e.target.checked })}
                        className="rounded accent-teal-650"
                      />
                      <span>PMS Mastery</span>
                    </label>
                    <label className="flex items-center gap-2 bg-white/60 p-2 rounded border border-slate-200/40 text-xs cursor-pointer text-slate-700 hover:bg-white/95">
                      <input
                        type="checkbox"
                        checked={formData.crsRequired}
                        onChange={(e) => setFormData({ ...formData, crsRequired: e.target.checked })}
                        className="rounded accent-teal-650"
                      />
                      <span>CRS Distribution</span>
                    </label>
                    <label className="flex items-center gap-2 bg-white/60 p-2 rounded border border-slate-200/40 text-xs cursor-pointer text-slate-700 hover:bg-white/95">
                      <input
                        type="checkbox"
                        checked={formData.aiRequired}
                        onChange={(e) => setFormData({ ...formData, aiRequired: e.target.checked })}
                        className="rounded accent-teal-650"
                      />
                      <span>AI Prompt Desk</span>
                    </label>
                    <label className="flex items-center gap-2 bg-white/60 p-2 rounded border border-slate-200/40 text-xs cursor-pointer text-slate-700 hover:bg-white/95">
                      <input
                        type="checkbox"
                        checked={formData.otaRequired}
                        onChange={(e) => setFormData({ ...formData, otaRequired: e.target.checked })}
                        className="rounded accent-teal-650"
                      />
                      <span>OTA Channel Managers</span>
                    </label>
                    <label className="flex items-center gap-2 bg-white/60 p-2 rounded border border-slate-200/40 text-xs cursor-pointer text-slate-700 hover:bg-white/95">
                      <input
                        type="checkbox"
                        checked={formData.crmRequired}
                        onChange={(e) => setFormData({ ...formData, crmRequired: e.target.checked })}
                        className="rounded accent-teal-650"
                      />
                      <span>Guest CRM Loyalty</span>
                    </label>
                  </div>
                </div>

                {/* Estimate output box */}
                <div className="bg-white/80 border border-slate-200/50 p-4.5 rounded-xl flex items-center justify-between mt-2 shadow-xs">
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none font-sans">Estimated Price</span>
                    <span className="block text-2xl font-black text-teal-600 mt-1">${estimatedCost.toLocaleString()} USD</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">Syllabus license fee</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-full shadow-lg shadow-teal-600/15 transition-all active:scale-95 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    Request Contract
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
