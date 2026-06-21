/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  CheckCircle, 
  ShieldCheck, 
  DollarSign, 
  Briefcase, 
  Phone, 
  Mail, 
  UserCheck 
} from 'lucide-react';
import { MerchantDetails } from '../types';

interface RequestCreditFormProps {
  onSuccess: (details: MerchantDetails) => void;
  onCancel: () => void;
}

export default function RequestCreditForm({ onSuccess, onCancel }: RequestCreditFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<MerchantDetails>({
    companyName: '',
    crNumber: '',
    monthlyRevenue: 250000,
    requestedLimit: 500000,
    contactEmail: '',
    contactPhone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sector, setSector] = useState('Retail');
  const [city, setCity] = useState('Riyadh');
  const [ownerName, setOwnerName] = useState('');
  const [ownerId, setOwnerId] = useState('');

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
      if (!formData.crNumber.trim()) {
        newErrors.crNumber = "Saudi CR number is required";
      } else if (!/^\d{10}$/.test(formData.crNumber.trim())) {
        newErrors.crNumber = "Saudi Commercial Registration must be exactly 10 digits";
      }
    } else if (step === 3) {
      if (!ownerName.trim()) newErrors.ownerName = "Owner's Full Name is required";
      if (!ownerId.trim()) {
        newErrors.ownerId = "Owner's National ID/Iqama is required";
      } else if (!/^[12]\d{9}$/.test(ownerId.trim())) {
        newErrors.ownerId = "National ID must start with 1 or 2 and be exactly 10 digits";
      }
      if (!formData.contactEmail.trim()) {
        newErrors.email = "Email address is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.contactPhone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^(05|5)\d{8}$/.test(formData.contactPhone.trim())) {
        newErrors.phone = "Phone number must be a valid Saudi mobile (e.g., 05xxxxxxxx)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      onSuccess(formData);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-1">
      
      {/* Page Header */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl font-bold text-regal-emerald-950">
          SAMA-Compliant Credit Request
        </h2>
        <p className="text-sm text-regal-emerald-800 mt-2">
          Secure an instant revolving capital decision in under 24 hours.
        </p>
      </div>

      {/* Progress timeline tracker */}
      <div className="flex items-center justify-between mb-8 px-4">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center flex-1 last:flex-initial">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition ${
              step >= num 
                ? 'bg-regal-emerald-950 text-regal-gold-300' 
                : 'bg-regal-cream-200 text-regal-emerald-800'
            }`}>
              {num}
            </div>
            {num < 3 && (
              <div className={`h-1 flex-1 mx-2 rounded transition-colors ${
                step > num ? 'bg-regal-emerald-950' : 'bg-regal-cream-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Main Card Container */}
      <div className="bg-white rounded-2xl border border-regal-cream-205 shadow-xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* STEP 1: Entity verification */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-regal-cream-200 mb-2">
                <Building2 className="w-5 h-5 text-regal-gold-600" />
                <h3 className="font-bold text-regal-emerald-950 text-base">Corporate Entity Details</h3>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-regal-emerald-850 mb-1">
                  Registered Corporate Name
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Al-Fahad Sweets and Restaurants Ltd"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  className={`w-full p-3 rounded-lg border bg-regal-cream-50/50 text-sm focus:outline-none focus:ring-1 focus:ring-regal-emerald-900 ${
                    errors.companyName ? 'border-red-500' : 'border-regal-cream-200'
                  }`}
                />
                {errors.companyName && <span className="text-xs text-red-500 mt-1 block">{errors.companyName}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-regal-emerald-850 mb-1">
                  Saudi Commercial Registration (10-Digit CR)
                </label>
                <input 
                  type="text"
                  placeholder="e.g. 1010123456"
                  maxLength={10}
                  value={formData.crNumber}
                  onChange={(e) => setFormData({...formData, crNumber: e.target.value.replace(/\D/g, '')})}
                  className={`w-full p-3 rounded-lg border bg-regal-cream-50/50 text-sm focus:outline-none focus:ring-1 focus:ring-regal-emerald-900 font-mono tracking-wider ${
                    errors.crNumber ? 'border-red-500' : 'border-regal-cream-200'
                  }`}
                />
                {errors.crNumber && <span className="text-xs text-red-500 mt-1 block">{errors.crNumber}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-regal-emerald-850 mb-1">
                    Operating Sector
                  </label>
                  <select 
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full p-3 rounded-lg border border-regal-cream-200 bg-regal-cream-50/50 text-sm focus:outline-none"
                  >
                    <option value="Retail">Retail Store</option>
                    <option value="Food & Beverage">F&B / Restaurant</option>
                    <option value="Logistics">Logistics & Supply</option>
                    <option value="E-Commerce">Online E-Commerce</option>
                    <option value="Manufacturing">Manufacturing / Workshop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-regal-emerald-850 mb-1">
                    Headquarters City
                  </label>
                  <select 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 rounded-lg border border-regal-cream-200 bg-regal-cream-50/50 text-sm focus:outline-none"
                  >
                    <option value="Riyadh">Riyadh</option>
                    <option value="Jeddah">Jeddah</option>
                    <option value="Dammam">Dammam</option>
                    <option value="Khobar">Khobar</option>
                    <option value="Mecca">Mecca</option>
                    <option value="Medina">Medina</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={onCancel}
                  className="flex-1 py-3 px-4 rounded-lg bg-regal-cream-200 text-regal-emerald-950 font-bold hover:bg-regal-cream-300 transition text-sm text-center"
                >
                  Cancel / Return
                </button>
                <button 
                  type="button"
                  onClick={nextStep}
                  className="flex-1 py-3 px-4 rounded-lg bg-regal-emerald-950 text-white font-bold hover:bg-regal-emerald-900 transition text-sm flex items-center justify-center gap-1.5"
                >
                  Next: Sizing <ArrowRight className="w-4 h-4 text-regal-gold-400" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Limit parameters styling */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-regal-cream-200 mb-2">
                <DollarSign className="w-5 h-5 text-regal-gold-600" />
                <h3 className="font-bold text-regal-emerald-950 text-base">Select Requested Limits</h3>
              </div>

              {/* Slider 1: Monthly sales */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-regal-emerald-850">
                    Average Monthly POS Revenue
                  </span>
                  <span className="text-sm font-bold font-mono text-regal-emerald-950">
                    SAR {formData.monthlyRevenue.toLocaleString()}
                  </span>
                </div>
                <input 
                  type="range"
                  min={50000}
                  max={2000000}
                  step={25000}
                  value={formData.monthlyRevenue}
                  onChange={(e) => {
                    const rev = Number(e.target.value);
                    setFormData({
                      ...formData, 
                      monthlyRevenue: rev,
                      // Autopredict max reasonable limit as 2x monthly revenue
                      requestedLimit: Math.min(formData.requestedLimit, rev * 2.5)
                    });
                  }}
                  className="w-full accent-regal-emerald-900 cursor-pointer h-2 bg-regal-cream-205 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-regal-emerald-800 font-mono mt-1">
                  <span>SAR 50K</span>
                  <span>SAR 1M</span>
                  <span>SAR 2M</span>
                </div>
              </div>

              {/* Slider 2: Requested limits */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-regal-emerald-850">
                    Requested Revolving Credit Line Limit
                  </span>
                  <span className="text-sm font-bold font-mono text-regal-gold-700">
                    SAR {formData.requestedLimit.toLocaleString()}
                  </span>
                </div>
                <input 
                  type="range"
                  min={25000}
                  max={Math.min(5000000, formData.monthlyRevenue * 3.5)}
                  step={25000}
                  value={formData.requestedLimit}
                  onChange={(e) => setFormData({...formData, requestedLimit: Number(e.target.value)})}
                  className="w-full accent-regal-emerald-900 cursor-pointer h-2 bg-regal-cream-205 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-regal-emerald-800 font-mono mt-1">
                  <span>SAR 25K</span>
                  <span>Recommended Limit (SAR {(formData.monthlyRevenue * 1.5).toLocaleString()})</span>
                  <span>Max (SAR {Math.min(5000000, formData.monthlyRevenue * 3.5).toLocaleString()})</span>
                </div>
              </div>

              <div className="bg-regal-cream-100 p-4 rounded-xl border border-regal-cream-200">
                <span className="text-xs font-bold text-regal-emerald-950 block mb-1">Pre-Computed Indicative Rates</span>
                <p className="text-xs text-regal-emerald-850 leading-relaxed">
                  Based on a monthly POS volume of SAR {formData.monthlyRevenue.toLocaleString()}, we project you qualify for our <strong className="text-regal-emerald-950">Growth pricing tier</strong> at a fixed drawdown fee of <strong className="text-regal-gold-700">1.1% per disbursement</strong>.
                </p>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3 px-4 rounded-lg bg-regal-cream-200 text-regal-emerald-950 font-bold hover:bg-regal-cream-300 transition text-sm flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button 
                  type="button"
                  onClick={nextStep}
                  className="flex-1 py-3 px-4 rounded-lg bg-regal-emerald-950 text-white font-bold hover:bg-regal-emerald-900 transition text-sm flex items-center justify-center gap-1.5"
                >
                  Next: Contact <ArrowRight className="w-4 h-4 text-regal-gold-400" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Contact details & Sign off */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-regal-cream-200 mb-2">
                <UserCheck className="w-5 h-5 text-regal-gold-600" />
                <h3 className="font-bold text-regal-emerald-950 text-base">Authorized Contact & ID Verification</h3>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-regal-emerald-850 mb-1">
                  Owner's Full Name (As in Absher)
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Fahad bin Abdulaziz Al-Saud"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className={`w-full p-3 rounded-lg border bg-regal-cream-50/50 text-sm focus:outline-none focus:ring-1 focus:ring-regal-emerald-900 ${
                    errors.ownerName ? 'border-red-500' : 'border-regal-cream-200'
                  }`}
                />
                {errors.ownerName && <span className="text-xs text-red-500 mt-1 block">{errors.ownerName}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-regal-emerald-850 mb-1">
                  Owner's Saudi National ID or Iqama Number (10 digits)
                </label>
                <input 
                  type="text"
                  placeholder="e.g. 10xxxxxxxx or 20xxxxxxxx"
                  maxLength={10}
                  value={ownerId}
                  onChange={(e) => setOwnerId(e.target.value.replace(/\D/g, ''))}
                  className={`w-full p-3 rounded-lg border bg-regal-cream-50/50 text-sm focus:outline-none focus:ring-1 focus:ring-regal-emerald-900 font-mono tracking-widest ${
                    errors.ownerId ? 'border-red-500' : 'border-regal-cream-200'
                  }`}
                />
                {errors.ownerId && <span className="text-xs text-red-500 mt-1 block">{errors.ownerId}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-regal-emerald-850 mb-1">
                    Business Email Address
                  </label>
                  <input 
                    type="email"
                    placeholder="e.g. finance@example.sa"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    className={`w-full p-3 rounded-lg border bg-regal-cream-50/50 text-sm focus:outline-none focus:ring-1 focus:ring-regal-emerald-900 ${
                      errors.email ? 'border-red-500' : 'border-regal-cream-200'
                    }`}
                  />
                  {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-regal-emerald-850 mb-1">
                    Saudi Mobile Phone
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. 0551234567"
                    maxLength={10}
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    className={`w-full p-3 rounded-lg border bg-regal-cream-50/50 text-sm focus:outline-none focus:ring-1 focus:ring-regal-emerald-900 font-mono ${
                      errors.phone ? 'border-red-500' : 'border-regal-cream-200'
                    }`}
                  />
                  {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone}</span>}
                </div>
              </div>

              {/* Compliance Consent check */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-600/10 rounded-xl flex gap-3">
                <input 
                  type="checkbox" 
                  id="compliance_consent" 
                  defaultChecked 
                  required 
                  className="mt-1 accent-regal-emerald-900 cursor-pointer h-4 w-4 shrink-0" 
                />
                <label htmlFor="compliance_consent" className="text-xs text-regal-emerald-950 leading-relaxed select-none cursor-pointer">
                  I authorize Merchant Portal to perform an immediate SIMAH / commercial credit query and verify the registration parameters against the government records under SAMA standards.
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3 px-4 rounded-lg bg-regal-cream-200 text-regal-emerald-950 font-bold hover:bg-regal-cream-300 transition text-sm flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-lg bg-regal-gold-550 text-regal-emerald-950 font-extrabold hover:bg-regal-gold-500 transition text-sm flex items-center justify-center gap-1.5 shadow-md border border-regal-gold-600/30"
                >
                  Submit Application <ShieldCheck className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

        </form>
      </div>

      <div className="text-center mt-6 text-xs text-regal-emerald-800 flex items-center justify-center gap-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600" /> SAMA-regulated electronic ledger network certification
      </div>
    </div>
  );
}
