/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  HelpCircle, 
  Menu, 
  X, 
  ArrowRight, 
  Check, 
  Building2, 
  Wallet, 
  Truck, 
  ChevronDown, 
  DollarSign, 
  Clock, 
  Layers, 
  RefreshCw, 
  BadgePercent,
  MessageSquare,
  Users
} from 'lucide-react';
import { FAQItem, PricingTier } from '../types';

interface MarketingPageProps {
  onNavigate: (path: string) => void;
}

export default function MarketingPage({ onNavigate }: MarketingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // FAQ List
  const faqs: FAQItem[] = [
    {
      question: "Is this a live credit service?",
      answer: "Not yet. Merchant Portal is a prototype for demonstration only. It does not offer real credit, and no money moves. All company names and figures are made up."
    },
    {
      question: "What registration documents are required to apply?",
      answer: "To secure a credit line, we require a valid Saudi Commercial Registration (CR), your national address, audited financial statements or 6-month bank statements, and the owner's national ID. The entire setup is digital."
    },
    {
      question: "How quickly are funds disbursed after an approval?",
      answer: "Once your credit line is approved (our target is within 24 hours), you can trigger drawdowns on demand. Disbursements are processed instantly to your configured merchant bank account within minutes in SAR."
    },
    {
      question: "Is there an setup fee or maintenance fee?",
      answer: "We believe in absolute transparency. There are zero upfront application fees and no annual membership costs. You only pay a transparent, mutually agreed markup rate on the drawn capital."
    },
    {
      question: "How does auto-reconciliation link with our POS?",
      answer: "The plan is to connect to POS terminal providers and bank feeds, so repayments can be collected as a percentage of your daily sales. No provider or bank is connected in this prototype."
    },
    {
      question: "Can I increase my credit limit over time?",
      answer: "Absolutely. As your merchant transaction history increases and repayments are processed on-schedule, our underwriting engine automatically flags your portal account for limit increases up to SAR 5,000,000."
    }
  ];

  // Pricing Tiers
  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      volume: "Up to SAR 150,000",
      fee: "1.5% fixed fee/draw",
      features: [
        "Instant drawdown approval",
        "Standard bank wire transfer",
        "Weekly repayment schedules",
        "Standard Murabaha contract",
        "Online chat support"
      ],
      recommended: false
    },
    {
      name: "Growth",
      volume: "SAR 150,000 - 1,500,000",
      fee: "1.1% fixed fee/draw",
      features: [
        "Dedicated relationship executive",
        "Real-time POS auto-reconciliation",
        "Dynamic daily or weekly repayment options",
        "Integration with up to 5 branch terminals",
        "Priority 2-hour disbursement priority"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      volume: "SAR 1,500,000+",
      fee: "Custom premium rates",
      features: [
        "Tailored API integrations",
        "Unlimited POS terminal reconciliation",
        "Flexible seasonal amortization schedules",
        "Direct CFO dashboard with audit logging",
        "Dedicated corporate risk committee support"
      ],
      recommended: false
    }
  ];

  const handleRouteClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <div className="min-h-screen bg-regal-cream-100 flex flex-col font-sans text-regal-emerald-950 overflow-x-hidden selection:bg-regal-gold-100">
      
      {/* 1. TOP NAVIGATION */}
      <nav id="marketing-nav" className="sticky top-0 z-50 bg-regal-cream-100/90  border-b border-regal-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => handleRouteClick('/')}>
              <span className="font-serif text-2xl font-bold tracking-tight text-regal-emerald-900 flex items-center gap-2">
                <span className="inline-block p-1 bg-regal-emerald-900 rounded-lg text-regal-gold-400">
                  <TrendingUp className="w-6 h-6" />
                </span>
                Merchant <span className="text-regal-gold-600 font-normal">Portal</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8 items-center font-medium">
              <a href="#how-it-works" className="text-regal-emerald-800 hover:text-regal-gold-700 transition">How it works</a>
              <a href="#what-we-do" className="text-regal-emerald-800 hover:text-regal-gold-700 transition">Credit Lines</a>
              <a href="#pricing" className="text-regal-emerald-800 hover:text-regal-gold-700 transition">Pricing</a>
              <a href="#faq" className="text-regal-emerald-800 hover:text-regal-gold-700 transition">FAQ</a>
            </div>

            {/* CTAs */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                id="btn-nav-signin"
                onClick={() => handleRouteClick('/dashboard')} 
                className="text-regal-emerald-900 hover:bg-regal-cream-200 font-medium px-4 py-2 rounded-lg transition"
              >
                Sign in
              </button>
              <button 
                id="btn-nav-apply"
                onClick={() => handleRouteClick('/request')}
                className="bg-regal-emerald-900 text-regal-gold-100 hover:bg-regal-emerald-800 font-semibold px-5 py-2.5 rounded-lg border border-regal-gold-500/20 shadow-md hover:shadow-lg transition"
              >
                Apply for credit
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-regal-emerald-900 p-2 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-regal-cream-50 border-b border-regal-cream-200 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-4">
                <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-regal-emerald-800 hover:text-regal-gold-700 px-3 py-2">How it works</a>
                <a href="#what-we-do" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-regal-emerald-800 hover:text-regal-gold-700 px-3 py-2">Credit Lines</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-regal-emerald-800 hover:text-regal-gold-700 px-3 py-2">Pricing</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-regal-emerald-800 hover:text-regal-gold-700 px-3 py-2">FAQ</a>
                
                <div className="pt-4 border-t border-regal-cream-200 flex flex-col gap-3">
                  <button 
                    onClick={() => handleRouteClick('/dashboard')}
                    className="w-full text-center text-regal-emerald-900 bg-regal-cream-200 border border-regal-cream-300 font-medium py-3 rounded-lg"
                  >
                    Sign in
                  </button>
                  <button 
                    onClick={() => handleRouteClick('/request')}
                    className="w-full text-center bg-regal-emerald-900 text-regal-gold-100 font-bold py-3 rounded-lg border border-regal-gold-500/20"
                  >
                    Apply for credit
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative pt-6 pb-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text Copy */}
            <div className="lg:col-span-7 flex flex-col text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 rounded-full bg-regal-emerald-900/10 text-regal-emerald-800 text-xs sm:text-sm font-semibold mb-6 tracking-wide"
              >
                <ShieldCheck className="w-4 h-4 text-regal-gold-600" />
                Working capital for modern merchants
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-regal-emerald-950 leading-tight tracking-tight mb-6"
              >
                Credit that moves at the speed of your <span className="relative inline-block text-regal-emerald-900 italic font-medium decoration-regal-gold-500/80 underline decoration-2 underline-offset-4">business.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-regal-emerald-800/90 leading-relaxed mb-8 max-w-xl"
              >
                Unlock instant, revolving business lines of credit up to <strong>SAR 5,000,000</strong>. Fuel your expansion, procure inventory, and manage your seasonal cash flow cycle with a digital merchant portal built for Riyadh.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <button 
                  id="btn-hero-apply"
                  onClick={() => handleRouteClick('/request')}
                  className="bg-regal-emerald-900 text-regal-gold-100 hover:bg-regal-emerald-950 font-bold px-8 py-4 rounded-xl border border-regal-gold-500/30 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  Request credit <ArrowRight className="w-5 h-5 text-regal-gold-400" />
                </button>
                <button 
                  id="btn-hero-demo"
                  onClick={() => handleRouteClick('/dashboard')}
                  className="bg-white hover:bg-regal-cream-50 text-regal-emerald-950 font-semibold px-8 py-4 rounded-xl border border-regal-cream-300 flex items-center justify-center gap-2 shadow-sm transition"
                >
                  View dashboard demo
                </button>
              </motion.div>

              {/* Trust strip */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="pt-6 border-t border-regal-cream-300 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-regal-emerald-850 font-medium"
              >
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-regal-gold-500"></span>
                  Prototype demo
                </span>
                <span className="text-regal-cream-300">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-regal-gold-500"></span>
                  SAR settlement
                </span>
                <span className="text-regal-cream-300">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-regal-gold-500"></span>
                  Target: 24h decisions
                </span>
              </motion.div>
            </div>

            {/* Visual preview card (Interactive Sparkline element!) */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                className="bg-regal-emerald-950 rounded-2xl p-6 sm:p-8 text-white border border-regal-gold-400/20 shadow-2xl relative overflow-hidden"
              >
                {/* Visual Backdrop effects */}
                
                {/* Header info */}
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-white/10 relative z-10">
                  <div>
                    <h4 className="text-regal-gold-300 text-xs font-mono tracking-widest uppercase">Saudi Merchant Ltd</h4>
                    <span className="text-xs text-white/50">Riyadh Branch • CR: #1010XXXX92</span>
                  </div>
                  <span className="bg-emerald-900/40 text-emerald-305 border border-emerald-500/20 text-xs font-semibold px-2.5 py-1 rounded-full">
                    CR on file
                  </span>
                </div>

                {/* KPI block 1 */}
                <div className="mb-6 relative z-10">
                  <div className="text-sm text-white/60 mb-1">Approved Credit Line Limit</div>
                  <div className="text-3xl font-bold font-mono tracking-tight text-regal-gold-100 flex items-baseline gap-1">
                    SAR 500,000 <span className="text-xs font-medium font-sans text-white/40">Sample figure</span>
                  </div>
                </div>

                {/* Sub KPI Block Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/10 relative z-10">
                  <div>
                    <div className="text-xs text-white/60 mb-0.5">Utilized Amount</div>
                    <div className="text-base font-bold font-mono text-white">SAR 120,000</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-0.5">Available Limit</div>
                    <div className="text-base font-bold font-mono text-regal-gold-300">SAR 380,000</div>
                  </div>
                </div>

                {/* Utilization Sparkline */}
                <div className="relative z-10">
                  <div className="flex justify-between text-xs text-white/50 mb-3 font-medium">
                    <span>90-Day Utilization Trend</span>
                    <span className="text-[#1e6b52] font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> 24.0% Average
                    </span>
                  </div>
                  
                  {/* Dynamic Sparkline Chart */}
                  <div className="h-16 w-full flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8fd1b0" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#8fd1b0" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Grid Lines */}
                      <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                      <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                      
                      {/* Gradient path fill */}
                      <path 
                        d="M0,30 L0,5 L15,10 L30,3 L45,18 L60,8 L75,22 L90,12 L100,6 L100,30 Z" 
                        fill="url(#chartGrad)" 
                      />
                      {/* Stroke line path */}
                      <motion.path 
                        d="M0,5 L15,10 L30,3 L45,18 L60,8 L75,22 L90,12 L100,6" 
                        fill="none" 
                        stroke="#8fd1b0" 
                        strokeWidth="1.5" 
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                      {/* Active point indicator */}
                      <circle cx="100" cy="6" r="1.8" fill="#fff" />
                      <circle cx="100" cy="6" r="3.2" fill="#8fd1b0" fillOpacity="0.5" className="animate-ping" />
                    </svg>
                  </div>
                  
                  {/* Timeline labels */}
                  <div className="flex justify-between text-[10px] text-white/35 font-mono mt-2 uppercase tracking-wider">
                    <span>90 Days Ago</span>
                    <span>Active Now</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 bg-white/5 rounded-xl px-4 py-2 flex items-center justify-between text-xs text-white/70 relative z-10 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-regal-gold-400" /> Drawdowns are simulated
                  </span>
                  <span className="font-semibold text-regal-gold-300">Demo</span>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </header>

      {/* 3. WHAT WE DO (3-up) */}
      <section id="what-we-do" className="py-24 bg-regal-cream-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-regal-gold-600 mb-2">Our Solutions</h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-regal-emerald-950">Three ways to use your credit line</h3>
            <p className="text-regal-emerald-800 mt-4 leading-relaxed">Choose Murabaha-based financing designed to bridge short-term cash gaps and accelerate supply-chain distribution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Box 1 */}
            <div className="bg-white rounded-2xl p-8 border border-regal-cream-205 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-regal-emerald-900/5 text-regal-emerald-900 flex items-center justify-center mb-6 group-hover:bg-regal-emerald-905 transition">
                <Building2 className="w-7 h-7 text-regal-emerald-850" />
              </div>
              <h4 className="text-xl font-bold text-regal-emerald-950 mb-3">Working Capital</h4>
              <p className="text-regal-emerald-800/95 leading-relaxed mb-6">Gain flexible, quick drawdown liquidity to manage supplier invoices, staff payroll, and daily retail cash requirements smoothly.</p>
              <div className="pt-4 border-t border-regal-cream-200 flex justify-between items-center text-sm font-medium">
                <span className="text-regal-emerald-700">Flexible limit range</span>
                <span className="text-regal-gold-750 font-mono font-bold text-base bg-regal-gold-100/50 px-3 py-1 rounded-md">from SAR 50,000</span>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-white rounded-2xl p-8 border border-regal-cream-205 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-regal-emerald-900/5 text-regal-emerald-900 flex items-center justify-center mb-6 group-hover:bg-regal-emerald-905 transition">
                <Wallet className="w-7 h-7 text-regal-emerald-850" />
              </div>
              <h4 className="text-xl font-bold text-regal-emerald-950 mb-3">Inventory Finance</h4>
              <p className="text-regal-emerald-800/95 leading-relaxed mb-6">Stock up early for high-demand seasons (Ramadan, seasonal sales) with quick merchant inventory drawdowns sent direct to your distributors.</p>
              <div className="pt-4 border-t border-regal-cream-200 flex justify-between items-center text-sm font-medium">
                <span className="text-regal-emerald-700">Underwritten bounds</span>
                <span className="text-regal-gold-750 font-mono font-bold text-base bg-regal-gold-100/50 px-3 py-1 rounded-md">from SAR 100,000</span>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white rounded-2xl p-8 border border-regal-cream-205 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-regal-emerald-900/5 text-regal-emerald-900 flex items-center justify-center mb-6 group-hover:bg-regal-emerald-905 transition">
                <Truck className="w-7 h-7 text-regal-emerald-850" />
              </div>
              <h4 className="text-xl font-bold text-regal-emerald-950 mb-3">Equipment Lease</h4>
              <p className="text-regal-emerald-800/95 leading-relaxed mb-6">Lease modern cash register POS units, delivery vehicle fleets, cold storage facilities, or baking kitchen equipment with dynamic SAR payments.</p>
              <div className="pt-4 border-t border-regal-cream-200 flex justify-between items-center text-sm font-medium">
                <span className="text-regal-emerald-700">Leasing thresholds</span>
                <span className="text-regal-gold-750 font-mono font-bold text-base bg-regal-gold-100/50 px-3 py-1 rounded-md">from SAR 150,000</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (4 steps, horizontal timeline) */}
      <section id="how-it-works" className="py-24 bg-white border-y border-regal-cream-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-regal-gold-600 mb-2">Process</h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-regal-emerald-950">Simple Setup in Hours</h3>
            <p className="text-regal-emerald-800 mt-4 leading-relaxed">No red tape. Our fully digital boarding flows connect to your commercial registers directly.</p>
          </div>

          <div className="relative">
            {/* Horizontal connection line for desktop */}
            <div className="hidden lg:block absolute left-[12%] right-[12%] top-1/2 -translate-y-8 h-0.5 bg-regal-cream-200"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              
              {/* Step 1 */}
              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-regal-emerald-950 border-4 border-regal-gold-200 text-regal-gold-300 flex items-center justify-center text-lg font-bold font-mono mb-4 shadow">
                  1
                </div>
                <h4 className="text-lg font-bold text-regal-emerald-950 mb-2">Apply in minutes</h4>
                <p className="text-sm text-regal-emerald-800 px-4">Provide Saudi CR number, basic business details, and upload your PDF statements.</p>
              </div>

              {/* Step 2 */}
              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-regal-emerald-950 border-4 border-regal-gold-200 text-regal-gold-300 flex items-center justify-center text-lg font-bold font-mono mb-4 shadow">
                  2
                </div>
                <h4 className="text-lg font-bold text-regal-emerald-950 mb-2">Aim: a decision in 24h</h4>
                <p className="text-sm text-regal-emerald-800 px-4">An automated risk check would assess each request. In this prototype, the decision is simulated.</p>
              </div>

              {/* Step 3 */}
              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-regal-emerald-950 border-4 border-regal-gold-200 text-regal-gold-300 flex items-center justify-center text-lg font-bold font-mono mb-4 shadow">
                  3
                </div>
                <h4 className="text-lg font-bold text-regal-emerald-950 mb-2">Draw funds on demand</h4>
                <p className="text-sm text-regal-emerald-800 px-4">Request discrete drawdowns matching raw inventory supplier needs directly in the portal.</p>
              </div>

              {/* Step 4 */}
              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-regal-emerald-950 border-4 border-regal-gold-200 text-regal-gold-300 flex items-center justify-center text-lg font-bold font-mono mb-4 shadow">
                  4
                </div>
                <h4 className="text-lg font-bold text-regal-emerald-950 mb-2">Repay flexibly</h4>
                <p className="text-sm text-regal-emerald-800 px-4">Settle repayments dynamically over 6 months, or match POS transaction volumes directly.</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY MERCHANTS CHOOSE US (feature grid, 6 tiles) */}
      <section className="py-24 bg-regal-cream-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-regal-gold-600 mb-2">Key Advantages</h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-regal-emerald-950">Why merchants would choose it</h3>
            <p className="text-regal-emerald-800 mt-4 leading-relaxed">Built block-by-block with advanced capabilities to maximize transparency and avoid administrative overhead.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Tile 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-regal-cream-200 shadow-sm flex gap-4">
              <div className="p-3 bg-emerald-50 rounded-lg text-regal-emerald-900 self-start">
                <Clock className="w-6 h-6 text-regal-emerald-800" />
              </div>
              <div>
                <h4 className="font-bold text-regal-emerald-950 text-lg mb-1">Real-time approvals</h4>
                <p className="text-sm text-regal-emerald-800/90 leading-relaxed">Planned checks against official records such as the Commercial Registration. Not connected in this prototype.</p>
              </div>
            </div>

            {/* Tile 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-regal-cream-200 shadow-sm flex gap-4">
              <div className="p-3 bg-emerald-50 rounded-lg text-regal-emerald-900 self-start">
                <BadgePercent className="w-6 h-6 text-regal-emerald-800" />
              </div>
              <div>
                <h4 className="font-bold text-regal-emerald-950 text-lg mb-1">Transparent pricing</h4>
                <p className="text-sm text-regal-emerald-800/90 leading-relaxed">No surprise, hidden maintenance or audit costs. All markups are explicitly detailed.</p>
              </div>
            </div>

            {/* Tile 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-regal-cream-200 shadow-sm flex gap-4">
              <div className="p-3 bg-emerald-50 rounded-lg text-regal-emerald-900 self-start">
                <Layers className="w-6 h-6 text-regal-emerald-800" />
              </div>
              <div>
                <h4 className="font-bold text-regal-emerald-950 text-lg mb-1">Multi-line credit</h4>
                <p className="text-regal-emerald-800/90 leading-relaxed">Equip your procurement framework with different credit limits for separate regional branches.</p>
              </div>
            </div>

            {/* Tile 4 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-regal-cream-200 shadow-sm flex gap-4">
              <div className="p-3 bg-emerald-50 rounded-lg text-regal-emerald-900 self-start">
                <RefreshCw className="w-6 h-6 text-regal-emerald-800" />
              </div>
              <div>
                <h4 className="font-bold text-regal-emerald-950 text-lg mb-1">Auto-reconciliation</h4>
                <p className="text-sm text-regal-emerald-800/90 leading-relaxed">Our system matches bank deposit references automatically so ledger books remain pixel-perfect.</p>
              </div>
            </div>

            {/* Tile 5 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-regal-cream-200 shadow-sm flex gap-4">
              <div className="p-3 bg-emerald-50 rounded-lg text-regal-emerald-900 self-start">
                <Wallet className="w-6 h-6 text-regal-emerald-800" />
              </div>
              <div>
                <h4 className="font-bold text-regal-emerald-950 text-lg mb-1">POS/bank/cash repayment</h4>
                <p className="text-sm text-regal-emerald-800/90 leading-relaxed">Planned: pay by SADAD, bank transfer, or a share of your card sales. Simulated in this prototype.</p>
              </div>
            </div>

            {/* Tile 6 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-regal-cream-200 shadow-sm flex gap-4">
              <div className="p-3 bg-emerald-50 rounded-lg text-regal-emerald-900 self-start">
                <ShieldCheck className="w-6 h-6 text-regal-emerald-800" />
              </div>
              <div>
                <h4 className="font-bold text-regal-emerald-950 text-lg mb-1">Privacy first</h4>
                <p className="text-sm text-regal-emerald-800/90 leading-relaxed">In this prototype, nothing you type leaves your browser. Security for a live product would need independent testing.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. NUMBERS STRIP (dark emerald band with gold accents) */}
      <section className="bg-regal-emerald-950 text-white py-16 relative overflow-hidden">
        {/* Aesthetic underline decoration built with SVG for key numbers */}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center items-center">
            
            {/* Honest prototype facts, not traction numbers */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-white/50 font-mono tracking-widest uppercase mb-1">Max credit line</span>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-regal-gold-300 leading-tight">
                SAR 5M
              </div>
              <div className="w-12 h-1 bg-regal-gold-500 rounded-full mt-2 opacity-80"></div>
              <span className="text-xs text-white/40 mt-1">planned limit per merchant</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs text-white/50 font-mono tracking-widest uppercase mb-1">Request steps</span>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-regal-gold-300 leading-tight">
                3
              </div>
              <div className="w-12 h-1 bg-regal-gold-500 rounded-full mt-2 opacity-80"></div>
              <span className="text-xs text-white/40 mt-1">company, contact, review</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs text-white/50 font-mono tracking-widest uppercase mb-1">Target decision</span>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-regal-gold-300 leading-tight">
                24h
              </div>
              <div className="w-12 h-1 bg-regal-gold-500 rounded-full mt-2 opacity-80"></div>
              <span className="text-xs text-white/40 mt-1">a goal, not yet tested</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs text-white/50 font-mono tracking-widest uppercase mb-1">Real money moved</span>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-regal-gold-300 leading-tight">
                SAR 0
              </div>
              <div className="w-12 h-1 bg-regal-gold-500 rounded-full mt-2 opacity-80"></div>
              <span className="text-xs text-white/40 mt-1">this is a prototype</span>
            </div>

          </div>
        </div>
      </section>

      {/* 8. PRICING TEASER */}
      <section id="pricing" className="py-24 bg-regal-cream-50 relative border-t border-regal-cream-205">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-regal-gold-600 mb-2">Transparency Plan</h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-regal-emerald-950">Simple pricing</h3>
            <p className="text-regal-emerald-800 mt-4 leading-relaxed">No setup surprises. Predictable rates calculated dynamically per drawdown with automatic discount tiers.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl p-8 border ${tier.recommended ? 'border-regal-gold-550 shadow-lg relative' : 'border-regal-cream-205 shadow-sm'} flex flex-col justify-between`}
              >
                {tier.recommended && (
                  <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-regal-gold-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                
                <div>
                  <h4 className="text-xl font-bold text-regal-emerald-950 mb-1">{tier.name}</h4>
                  <span className="text-xs text-regal-emerald-800 font-medium block mb-4">{tier.volume}</span>
                  
                  <div className="mb-6 p-4 bg-regal-cream-100 rounded-xl border border-regal-cream-200">
                    <span className="text-2xl font-bold font-mono text-regal-emerald-950">{tier.fee}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start text-sm text-regal-emerald-850 gap-2">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => handleRouteClick('/request')}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-center transition ${
                    tier.recommended 
                      ? 'bg-regal-emerald-950 text-regal-gold-100 hover:bg-regal-emerald-900 shadow-md' 
                      : 'bg-regal-cream-200 text-regal-emerald-950 hover:bg-regal-cream-300'
                  }`}
                >
                  Talk to us
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section id="faq" className="py-24 bg-white border-y border-regal-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-regal-gold-600 mb-2">Support</h2>
            <h3 className="font-serif text-3xl font-bold text-regal-emerald-950">Questions</h3>
            <p className="text-regal-emerald-800 mt-3 leading-relaxed">Understand the verification process, timing, and integration protocols.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-regal-cream-205 rounded-xl overflow-hidden bg-regal-cream-50"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center bg-white hover:bg-regal-cream-50 focus:outline-none transition-all"
                >
                  <span className="font-bold text-regal-emerald-950 text-sm sm:text-base flex items-center gap-2">
                    <span className="p-1 rounded-md bg-regal-emerald-950/5 text-regal-emerald-950 text-xs font-mono font-bold">{idx + 1}</span>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-regal-emerald-800 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-regal-cream-50 overflow-hidden"
                    >
                      <p className="px-6 py-4 text-sm text-regal-emerald-850 leading-relaxed border-t border-regal-cream-200 bg-white/45">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA BAND */}
      <section className="bg-regal-emerald-950 text-white py-20 relative overflow-hidden">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            Ready to unlock your credit line?
          </h2>
          <p className="text-base sm:text-lg text-regal-gold-100/90 max-w-xl mx-auto mb-10 leading-relaxed">
            Take 5 minutes to submit your merchant registration today. This is a demo: your request is simulated and nothing is sent.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              id="btn-final-apply"
              onClick={() => handleRouteClick('/request')}
              className="bg-regal-gold-500 hover:bg-regal-gold-450 text-regal-emerald-950 font-bold px-8 py-4 rounded-xl border border-regal-gold-200/20 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              Get started instantly <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              id="btn-final-dashboard"
              onClick={() => handleRouteClick('/dashboard')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl border border-white/10 transition"
            >
              Explore portal demo
            </button>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-regal-cream-150 border-t border-regal-cream-205 py-16 text-regal-emerald-900 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Logo details */}
            <div className="flex flex-col gap-4">
              <span className="font-serif text-xl font-bold tracking-tight text-regal-emerald-950 flex items-center gap-2">
                <span className="inline-block p-1 bg-regal-emerald-900 rounded text-regal-gold-400">
                  <TrendingUp className="w-5 h-5" />
                </span>
                Merchant Portal
              </span>
              <p className="text-xs text-regal-emerald-800 leading-relaxed">
                Murabaha-based revolving business credit lines. A student prototype: not a licensed financial service, and not connected to any bank.
              </p>
              <div className="flex gap-3 text-xs text-regal-gold-700 font-semibold cursor-pointer">
                <span>Riyadh, Saudi Arabia</span>
              </div>
            </div>

            {/* Column Product */}
            <div>
              <h5 className="font-bold text-regal-emerald-950 mb-4 tracking-wide uppercase text-xs">Product</h5>
              <ul className="space-y-2.5 text-xs font-medium text-regal-emerald-800">
                <li><a href="#what-we-do" className="hover:text-regal-gold-700 transition">Working Capital</a></li>
                <li><a href="#what-we-do" className="hover:text-regal-gold-700 transition">Inventory Finance</a></li>
                <li><a href="#what-we-do" className="hover:text-regal-gold-700 transition">POS Sweep Repayments</a></li>
                <li><a href="#pricing" className="hover:text-regal-gold-700 transition">Tier Rate Options</a></li>
              </ul>
            </div>

            {/* Column Company */}
            <div>
              <h5 className="font-bold text-regal-emerald-950 mb-4 tracking-wide uppercase text-xs">Company</h5>
              <ul className="space-y-2.5 text-xs font-medium text-regal-emerald-800">
                <li><span className="hover:text-regal-gold-700 transition cursor-pointer">About Merchant Portal Ltd</span></li>
                <li><span className="hover:text-regal-gold-700 transition cursor-pointer">Careers</span></li>
                <li><span className="hover:text-regal-gold-700 transition cursor-pointer">Security Systems</span></li>
                <li><span className="hover:text-regal-gold-700 transition cursor-pointer">Risk Underwriting</span></li>
              </ul>
            </div>

            {/* Column Legal Footer */}
            <div>
              <h5 className="font-bold text-regal-emerald-950 mb-4 tracking-wide uppercase text-xs">Regulatory</h5>
              <ul className="space-y-2.5 text-xs font-medium text-regal-emerald-800">
                <li><span className="hover:text-regal-gold-700 transition cursor-pointer">Prototype notice</span></li>
                <li><span className="hover:text-regal-gold-700 transition cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-regal-gold-700 transition cursor-pointer">Privacy</span></li>
                <li><span className="hover:text-regal-gold-700 transition cursor-pointer">How Murabaha works</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-regal-cream-205 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-regal-emerald-850">
            <p>© {new Date().getFullYear()} Merchant Portal Saudi Arabia Ltd. All rights reserved.</p>
            <div className="bg-regal-cream-200 text-[10px] uppercase font-bold text-regal-emerald-950 px-4 py-2 rounded-lg border border-regal-cream-300 flex items-center gap-1.5 shadow-sm">
              <span className="inline-block w-2 bg-emerald-600 h-2 rounded-full"></span>
              PROTOTYPE · NO REAL CREDIT OR PAYMENTS
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
