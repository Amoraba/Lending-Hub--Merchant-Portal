/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  HelpCircle, 
  Settings, 
  LogOut, 
  User, 
  Building2, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Smartphone, 
  UserCheck, 
  ChevronRight, 
  MapPin, 
  Info, 
  DollarSign, 
  Plus, 
  Send,
  Loader2,
  RefreshCw,
  Search,
  Boxes,
  Zap,
  CreditCard,
  Menu
} from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MerchantDetails, Transaction, CreditLine } from '../types';

const StatusBadge = ({ status }: { status: string }) => {
  const s = status.toLowerCase();
  const styles =
    s === "paid" || s === "completed" || s === "active"
      ? "bg-emerald-50 text-emerald-900 border-emerald-200/50"
      : s === "unpaid" || s === "pending" || s === "in review"
      ? "bg-amber-50 text-amber-800 border-amber-200/50"
      : "bg-slate-50 text-slate-600 border-slate-205";
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles}`}
    >
      {status}
    </span>
  );
};

const ApprovalProgress = ({ progress }: { progress: number }) => {
  const steps = [0, 1, 2];
  return (
    <div className="flex items-center gap-2">
      {steps.map((i) => (
        <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              i < progress
                ? "bg-regal-emerald-700 text-white"
                : i === progress
                ? "bg-regal-gold-500 text-white"
                : "bg-regal-cream-205 text-regal-emerald-800/40"
            }`}
          >
            {i < progress ? (
              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
            ) : i === progress ? (
              <Clock className="w-3.5 h-3.5" strokeWidth={3} />
            ) : (
              <span className="text-[10px] font-bold">{i + 1}</span>
            )}
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-1 flex-1 rounded-full transition-all ${
                i < progress ? "bg-regal-emerald-700" : "bg-regal-cream-205"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

interface MerchantDashboardProps {
  userRegistration: MerchantDetails | null;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export default function MerchantDashboard({ userRegistration, onLogout, onNavigateHome }: MerchantDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'draw' | 'repay' | 'branches' | 'settings'>('overview');
  
  // Dashboard primary dynamic numbers state
  const [creditLimit, setCreditLimit] = useState(500000);
  const [utilizedAmount, setUtilizedAmount] = useState(120000);
  
  // Calculated
  const availableAmount = Math.max(0, creditLimit - utilizedAmount);
  
  // Custom business name
  const [companyName, setCompanyName] = useState('Saudi Retail Distribution Partners Ltd');
  const [crNumber, setCrNumber] = useState('1010892431');
  const [hqCity, setHqCity] = useState('Riyadh');

  // Load custom registration if any
  useEffect(() => {
    if (userRegistration) {
      setCreditLimit(userRegistration.requestedLimit);
      setUtilizedAmount(Math.round(userRegistration.requestedLimit * 0.25)); // assume initial 25% utilization
      setCompanyName(userRegistration.companyName);
      setCrNumber(userRegistration.crNumber);
      setHqCity('Riyadh'); // default
    }
  }, [userRegistration]);

  // Transaction state
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TXN-SA-9824',
      reference: 'REF-RUH-483',
      date: '2026-06-20 14:32',
      type: 'Drawdown',
      amount: 45000,
      status: 'Completed',
      description: 'Inventory pre-purchase - Riyadh Grain Mills'
    },
    {
      id: 'TXN-SA-9710',
      reference: 'REF-JED-029',
      date: '2026-06-18 10:11',
      type: 'Drawdown',
      amount: 75000,
      status: 'Completed',
      description: 'Cold storage leasing lease payment - Jeddah Port'
    },
    {
      id: 'TXN-SA-9654',
      reference: 'REF-SAD-920',
      date: '2526-06-15 09:00',
      type: 'Repayment',
      amount: 30000,
      status: 'Completed',
      description: 'POS sweep automatic daily transfer - Geidea terminal'
    },
    {
      id: 'TXN-SA-9521',
      reference: 'REF-RUH-091',
      date: '2026-06-12 16:45',
      type: 'Drawdown',
      amount: 30000,
      status: 'Completed',
      description: 'Staff payroll bridging reserve'
    }
  ]);

  // Branch allocations
  const [branches, setBranches] = useState([
    { id: 1, name: 'Riyadh Central Terminal Hub', limit: 250000, utilized: 75000, manager: 'Khalid Al-Moneef' },
    { id: 2, name: 'Jeddah Coastal Warehouse', limit: 150000, utilized: 45000, manager: 'Sari bin Ghaith' },
    { id: 3, name: 'Dammam Port Retail Shop', limit: 100505, utilized: 0, manager: 'Yasser Shaker' },
  ]);

  // Input fields state
  const [drawAmountInput, setDrawAmountInput] = useState('');
  const [drawPurpose, setDrawPurpose] = useState('Inventory Procurement');
  const [selectedBank, setSelectedBank] = useState('Al-Rajhi Bank');
  const [isProcessingDraw, setIsProcessingDraw] = useState(false);

  const [repayAmountInput, setRepayAmountInput] = useState('');
  const [selectedRepayMethod, setSelectedRepayMethod] = useState('SADAD Bill Account');
  const [isProcessingRepay, setIsProcessingRepay] = useState(false);

  // Search filter
  const [filterType, setFilterType] = useState<'All' | 'Drawdown' | 'Repayment'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle drawdown execution simulation
  const executeDrawdown = (amount: number, purpose: string) => {
    if (isNaN(amount) || amount <= 0) {
      alert('Please specify a valid numeric drawdown amount.');
      return;
    }
    if (amount > availableAmount) {
      alert('Error: Specified amount exceeds your available credit line limit.');
      return;
    }

    setIsProcessingDraw(true);
    setTimeout(() => {
      setUtilizedAmount(prev => prev + amount);
      
      const newTxn: Transaction = {
        id: `TXN-SA-${Math.floor(1000 + Math.random() * 9000)}`,
        reference: `REF-RUH-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        type: 'Drawdown',
        amount: amount,
        status: 'Completed',
        description: `Simulated draw for ${purpose} via ${selectedBank}`
      };

      setTransactions(prev => [newTxn, ...prev]);
      
      // Update first branch limit utilization as default simulation experience
      setBranches(prev => prev.map((b, i) => i === 0 ? { ...b, utilized: b.utilized + amount } : b));
      
      setDrawAmountInput('');
      setIsProcessingDraw(false);
      setActiveTab('overview');
    }, 1500);
  };

  // Handle repayment execution simulation
  const executeRepayment = (amount: number) => {
    if (isNaN(amount) || amount <= 0) {
      alert('Please specify a valid numeric repayment amount.');
      return;
    }
    if (amount > utilizedAmount) {
      alert('Error: Repayment amount exceeds your total utilized balance.');
      return;
    }

    setIsProcessingRepay(true);
    setTimeout(() => {
      setUtilizedAmount(prev => Math.max(0, prev - amount));

      const newTxn: Transaction = {
        id: `TXN-SA-${Math.floor(1000 + Math.random() * 9000)}`,
        reference: `REF-SAD-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        type: 'Repayment',
        amount: amount,
        status: 'Completed',
        description: `Simulated repayment via ${selectedRepayMethod}`
      };

      setTransactions(prev => [newTxn, ...prev]);
      
      // Reduce branch 1 utilized to simulate payout
      setBranches(prev => prev.map((b, i) => i === 0 ? { ...b, utilized: Math.max(0, b.utilized - amount) } : b));

      setRepayAmountInput('');
      setIsProcessingRepay(false);
      setActiveTab('overview');
    }, 1500);
  };

  // Rebalance branch limits
  const rebalanceBranch = (id: number, offset: number) => {
    setBranches(prev => prev.map(b => {
      if (b.id === id) {
        const nextLimit = Math.max(b.utilized, b.limit + offset);
        return { ...b, limit: nextLimit };
      }
      return b;
    }));
  };

  // Filtering transactions
  const filteredTransactions = transactions.filter(t => {
    const matchesType = filterType === 'All' || t.type === filterType;
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.reference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div id="merchant-dashboard-view" className="min-h-screen bg-regal-cream-100 flex flex-col lg:flex-row text-regal-emerald-950 font-sans">
      
      {/* SIDEBAR NAVIGATION CONTROLLER */}
      <aside className="w-full lg:w-64 bg-regal-emerald-950 text-white shrink-0 flex flex-col justify-between border-r border-regal-emerald-900 shadow-xl">
        <div>
          {/* Logo Brandmark */}
          <div className="h-20 flex items-center px-6 border-b border-regal-emerald-900 bg-regal-emerald-950/80 cursor-pointer" onClick={onNavigateHome}>
            <span className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <span className="p-1 bg-regal-gold-500 rounded text-regal-emerald-950">
                <TrendingUp className="w-4 h-4" />
              </span>
              Merchant <span className="text-regal-gold-300 font-normal">Portal</span>
            </span>
            <span className="ml-2 bg-regal-gold-600/30 text-regal-gold-300 text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider font-mono">
              Portal
            </span>
          </div>

          {/* User profile recap */}
          <div className="p-5 border-b border-regal-emerald-900/60 bg-regal-emerald-900/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-regal-gold-500 text-regal-emerald-950 flex items-center justify-center font-bold font-serif shadow-inner">
                {companyName.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <h4 className="font-bold text-sm text-regal-gold-100 truncate">{companyName}</h4>
                <span className="text-[10px] text-white/50 block font-mono">CR: #{crNumber}</span>
              </div>
            </div>
          </div>

          {/* Nav menu links */}
          <nav className="p-4 space-y-1">
            <button 
              id="tab-btn-overview"
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
                activeTab === 'overview' 
                  ? 'bg-regal-gold-600 text-regal-emerald-950 shadow-md' 
                  : 'text-white/80 hover:bg-regal-emerald-900 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              Dashboard Overview
            </button>

            <button 
              id="tab-btn-draw"
              onClick={() => setActiveTab('draw')}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
                activeTab === 'draw' 
                  ? 'bg-regal-gold-600 text-regal-emerald-950 shadow-md' 
                  : 'text-white/80 hover:bg-regal-emerald-900 hover:text-white'
              }`}
            >
              <ArrowUpRight className="w-4 h-4 shrink-0 text-emerald-400" />
              Draw Capital (Disburse)
            </button>

            <button 
              id="tab-btn-repay"
              onClick={() => setActiveTab('repay')}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
                activeTab === 'repay' 
                  ? 'bg-regal-gold-600 text-regal-emerald-950 shadow-md' 
                  : 'text-white/80 hover:bg-regal-emerald-900 hover:text-white'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4 shrink-0 text-amber-400" />
              Repay Balance
            </button>

            <button 
              id="tab-btn-branches"
              onClick={() => setActiveTab('branches')}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
                activeTab === 'branches' 
                  ? 'bg-regal-gold-600 text-regal-emerald-950 shadow-md' 
                  : 'text-white/80 hover:bg-regal-emerald-900 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4 shrink-0" />
              Branch Limits Allocator
            </button>

            <button 
              id="tab-btn-settings"
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
                activeTab === 'settings' 
                  ? 'bg-regal-gold-600 text-regal-emerald-950 shadow-md' 
                  : 'text-white/80 hover:bg-regal-emerald-900 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              Portal settings
            </button>
          </nav>
        </div>

        {/* Action button at bottom */}
        <div className="p-4 border-t border-regal-emerald-900/60 bg-regal-emerald-950/40">
          <button 
            onClick={onLogout}
            className="w-full py-2.5 px-4 rounded-lg bg-red-950/30 hover:bg-red-900/20 text-red-300 font-semibold text-xs border border-red-905/30 transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Change Merchant Session
          </button>
          <div className="text-[10px] text-center text-white/30 font-mono mt-3 uppercase tracking-wider">
            SAMA Regulation V2026.1
          </div>
        </div>
      </aside>

      {/* PRIMARY WORKSPACE CONTENT */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Panel */}
        <header className="h-20 bg-white border-b border-regal-cream-200/80 px-6 sm:px-8 flex items-center justify-between shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-lg sm:text-xl font-bold text-regal-emerald-950 hidden sm:block">
              Welcome, <span className="text-regal-emerald-900">{companyName}</span>
            </h1>
            <div className="bg-emerald-50 text-emerald-900 border border-emerald-500/10 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              SAMA Live Feed Online
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onNavigateHome}
              className="text-xs font-semibold text-regal-emerald-950 bg-regal-cream-200 hover:bg-regal-cream-300 px-3.5 py-1.5 rounded-md transition"
            >
              Back to marketing
            </button>
            <div className="hidden md:flex flex-col items-end text-xs">
              <span className="font-bold text-regal-emerald-950 font-mono">SAR Base Hub</span>
              <span className="text-regal-emerald-500">KSA Settlement Portal</span>
            </div>
          </div>
        </header>

        {/* Dynamic Inner Panel Workspace */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Dynamic Learn Portfolio Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-regal-cream-300">
                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-regal-emerald-950 tracking-tight">
                    Merchant Portfolio Overview
                  </h2>
                  <p className="text-sm text-regal-emerald-800 mt-1">
                    A curated real-time view of your active revolving Murabaha credit holdings.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-6 items-center bg-white p-4 rounded-xl border border-regal-cream-205 shadow-sm">
                  <div className="text-right">
                    <p className="text-[10px] text-regal-emerald-800 uppercase tracking-[0.15em] font-mono font-bold mb-1">
                      Total Portfolio Limit
                    </p>
                    <p className="font-serif text-2xl font-bold text-regal-emerald-950">
                      SAR {creditLimit.toLocaleString()}
                    </p>
                  </div>
                  <div className="h-10 w-px bg-regal-cream-250" />
                  <div className="text-right">
                    <p className="text-[10px] text-regal-emerald-800 uppercase tracking-[0.15em] font-mono font-bold mb-1">
                      Available Capital
                    </p>
                    <p className="font-serif text-2xl font-bold text-emerald-700 underline decoration-regal-gold-500/40 decoration-4 underline-offset-4">
                      SAR {availableAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shariah compliance banner */}
              <div className="bg-gradient-to-r from-regal-emerald-950 to-regal-emerald-900 text-white p-5 rounded-2xl border border-regal-gold-400/10 shadow-lg relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-regal-gold-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-regal-gold-500 text-regal-emerald-950 shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-regal-gold-300">Dynamic Simah-Verified Revolving Ledger</h4>
                    <p className="text-xs text-white/80 mt-1 leading-relaxed">
                      Your business holdings are certified under Unified Shariah Murabahah Standards. All simulated drawdowns and automated POS Sweeps are processed through direct SAMA API pathways instantly updating your Saudi commercial banking standing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lovable Credit Line Cards */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    id: 1,
                    name: "Working Capital",
                    limit: Math.round(creditLimit * 0.60),
                    used: Math.min(Math.round(creditLimit * 0.60), Math.round(utilizedAmount * 0.65)),
                    status: "Active",
                    icon: Wallet
                  },
                  {
                    id: 2,
                    name: "Inventory Finance",
                    limit: Math.round(creditLimit * 0.30),
                    used: Math.min(Math.round(creditLimit * 0.30), Math.round(utilizedAmount * 0.35)),
                    status: "Active",
                    icon: Boxes
                  },
                  {
                    id: 3,
                    name: "Equipment Lease",
                    limit: Math.round(creditLimit * 0.10),
                    used: 0,
                    status: "Pending",
                    icon: Zap
                  }
                ].map((line) => {
                  const pct = Math.min(100, Math.round((line.used / line.limit) * 100)) || 0;
                  const isPending = line.status === "Pending";
                  return (
                    <article
                      key={line.id}
                      className={`bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all ${
                        isPending 
                          ? "border-amber-200/60 ring-1 ring-amber-50" 
                          : "border-regal-cream-205"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div
                          className={`p-3 rounded-xl ${
                            isPending ? "bg-amber-50" : "bg-emerald-50"
                          }`}
                        >
                          <line.icon
                            className={`w-6 h-6 ${
                              isPending ? "text-amber-750" : "text-regal-emerald-700"
                            }`}
                          />
                        </div>
                        <StatusBadge status={line.status} />
                      </div>
                      
                      <h3 className="font-serif text-lg font-bold text-regal-emerald-950 mb-4 h-6 flex items-center">
                        {line.name}
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-regal-emerald-800 font-semibold">Credit Used</span>
                          <span className="font-bold text-regal-emerald-950 font-mono">
                            SAR {line.used.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-regal-emerald-800 font-semibold">Allocated Limit</span>
                          <span className="font-bold text-regal-emerald-950 font-mono">
                            SAR {line.limit.toLocaleString()}
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-regal-cream-200 h-2 rounded-full overflow-hidden relative">
                          <motion.div
                            className={`h-full rounded-full transition-all duration-700 ${
                              isPending ? "bg-amber-400" : "bg-emerald-600"
                            }`}
                            style={{ width: `${pct}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] font-semibold text-regal-emerald-800/70 pt-1">
                          <span>Ratio: {pct}%</span>
                          <span>Available: SAR {(line.limit - line.used).toLocaleString()}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>

              {/* Chart + Approvals Side-By-Side Layout */}
              <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* Recharts chart */}
                <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-2xl border border-regal-cream-205 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-regal-emerald-950">
                        Credit Utilization Historicals
                      </h3>
                      <p className="text-xs text-regal-emerald-800">
                        Month-over-month utilization ratio against your active limits.
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold text-regal-emerald-800/80 mb-2 md:mb-0">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-regal-emerald-700" /> Used
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <div className="w-3 h-3 border border-dashed border-regal-cream-300 rounded-full" /> Limit
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={[
                          { month: "Jan", amount: Math.round(utilizedAmount * 0.45), approved: Math.round(creditLimit * 0.9) },
                          { month: "Feb", amount: Math.round(utilizedAmount * 0.70), approved: Math.round(creditLimit * 0.9) },
                          { month: "Mar", amount: Math.round(utilizedAmount * 0.55), approved: Math.round(creditLimit * 0.95) },
                          { month: "Apr", amount: Math.round(utilizedAmount * 0.85), approved: Math.round(creditLimit * 1.0) },
                          { month: "June Peak", amount: utilizedAmount, approved: creditLimit },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f4edd9" vertical={false} />
                        <XAxis dataKey="month" stroke="#033c30" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#033c30" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            background: "#02231c",
                            border: "none",
                            borderRadius: "12px",
                            color: "white",
                            fontSize: "12px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="approved"
                          stroke="#eddcb8"
                          strokeWidth={2}
                          strokeDasharray="4 4"
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="amount"
                          stroke="#0e836d"
                          strokeWidth={3}
                          dot={{ r: 5, fill: "#ebb12b", stroke: "#02231c", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pending approvals widget */}
                <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-regal-cream-205 shadow-sm">
                  <h3 className="font-serif text-lg font-bold text-regal-emerald-950 mb-2">
                    Pending Approvals
                  </h3>
                  <p className="text-xs text-regal-emerald-800 mb-6">
                    Commercial increase modifications currently undergoing Riyadh regulator review.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { id: 1, type: "Credit Limit Increase Request", amount: Math.round(creditLimit * 0.25), status: "In Review", date: "June 18, 2026", progress: 2 },
                      { id: 2, type: "Regional Branch Credit Line", amount: Math.round(creditLimit * 0.15), status: "Pending", date: "June 17, 2026", progress: 1 }
                    ].map((approval) => (
                      <div
                        key={approval.id}
                        className="bg-regal-cream-50 rounded-xl p-4 border border-regal-cream-200"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-xs text-regal-emerald-950">{approval.type}</h4>
                            <p className="text-[10px] text-regal-emerald-800 mt-0.5">
                              Submitted {approval.date}
                            </p>
                          </div>
                          <span className="font-mono text-xs font-bold text-emerald-850">
                            +SAR {approval.amount.toLocaleString()}
                          </span>
                        </div>
                        <ApprovalProgress progress={approval.progress} />
                      </div>
                    ))}
                  </div>
                </div>

              </section>

              {/* Unified Settlement Ledger - with Live filters & Search */}
              <section className="bg-white rounded-2xl border border-regal-cream-205 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-regal-cream-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-regal-emerald-950">Active Portal Settlement Ledger</h3>
                      <p className="text-xs text-regal-emerald-800">Complete digitized audit trails generated by SAMA central clearing house.</p>
                    </div>

                    {/* Filter types */}
                    <div className="flex flex-wrap gap-1.5">
                      {['All', 'Drawdown', 'Repayment'].map((t) => (
                        <button 
                          key={t}
                          onClick={() => setFilterType(t as any)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                            filterType === t 
                              ? 'bg-regal-emerald-950 text-white border-regal-emerald-950 shadow-sm' 
                              : 'bg-white text-regal-emerald-800 border-regal-cream-200 hover:bg-regal-cream-50'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search bar inside header */}
                  <div className="mt-4 relative max-w-sm">
                    <Search className="w-4 h-4 text-regal-emerald-800 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search ledger by trace ID or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-regal-cream-50 rounded-lg text-xs font-semibold border border-regal-cream-200 focus:outline-none focus:ring-1 focus:ring-regal-emerald-900"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-regal-cream-50 text-[10px] font-bold uppercase tracking-wider text-regal-emerald-800 border-b border-regal-cream-200">
                        <th className="p-4 pl-6">Trace ID</th>
                        <th className="p-4">Disbursement Contract</th>
                        <th className="p-4">Objective Purpose</th>
                        <th className="p-4">Reference</th>
                        <th className="p-4">Settlement Time</th>
                        <th className="p-4 text-right pr-6">Amount (SAR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-regal-cream-150 text-sm">
                      {filteredTransactions.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-xs text-regal-emerald-800 py-12">
                            No simulated trace transactions found matching query criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredTransactions.map((txn) => (
                          <tr key={txn.id} className="hover:bg-regal-cream-50/50 transition">
                            <td className="p-4 pl-6">
                              <span className="font-mono text-xs font-bold text-regal-emerald-950">{txn.id}</span>
                            </td>
                            <td className="p-4">
                              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                                txn.type === 'Drawdown' 
                                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
                                  : 'bg-amber-50 text-amber-900 border-amber-250'
                              }`}>
                                {txn.type === 'Drawdown' ? <ArrowUpRight className="w-3 h-3 text-emerald-600" /> : <ArrowDownLeft className="w-3 h-3 text-amber-600" />}
                                {txn.type}
                              </span>
                            </td>
                            <td className="p-4 font-bold text-regal-emerald-950 max-w-xs truncate" title={txn.description}>
                              {txn.description}
                            </td>
                            <td className="p-4 font-mono text-xs text-regal-emerald-800">
                              {txn.reference}
                            </td>
                            <td className="p-4 text-xs text-regal-emerald-800 font-medium">
                              {txn.date}
                            </td>
                            <td className={`p-4 text-right pr-6 font-mono font-bold text-sm ${
                              txn.type === 'Drawdown' ? 'text-emerald-750' : 'text-amber-800'
                            }`}>
                              {txn.type === 'Drawdown' ? '+' : '-'} SAR {txn.amount.toLocaleString()}.00
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

            </div>
          )}

          {/* TAB 2: DRAW FUNDS */}
          {activeTab === 'draw' && (
            <div className="max-w-xl mx-auto bg-white rounded-2xl border border-regal-cream-205 shadow p-6 sm:p-8">
              <div className="flex items-center gap-2 pb-4 border-b border-regal-cream-200 mb-6">
                <ArrowUpRight className="w-6 h-6 text-emerald-600" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-regal-emerald-950">Draw Revolving Capital</h3>
                  <p className="text-xs text-regal-emerald-850">Initiate an instantaneous disbursement directly into your branch bank wire.</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Available Balance Stat Panel */}
                <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white rounded-xl p-5 mb-2 border border-emerald-800">
                  <span className="text-xs font-mono uppercase text-white/50 block">Instant Available Draw Limit</span>
                  <div className="text-3xl font-extrabold font-mono text-regal-gold-300">
                    SAR {availableAmount.toLocaleString()}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-regal-emerald-850 mb-1">
                    Select Target Saudi Disbursement Bank
                  </label>
                  <select 
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full p-3 rounded-lg border border-regal-cream-200 bg-regal-cream-50 font-medium text-sm focus:outline-none"
                  >
                    <option value="Al-Rajhi Bank">Al-Rajhi Bank (IBAN: SA82900000XXXXXXXXXX)</option>
                    <option value="Saudi National Bank (SNB)">Saudi National Bank (IBAN: SA43100000XXXXXXXXXX)</option>
                    <option value="Riyad Bank">Riyad Bank (IBAN: SA92400000XXXXXXXXXX)</option>
                    <option value="Alinma Bank">Alinma Bank (IBAN: SA18100000XXXXXXXXXX)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-regal-emerald-850 mb-1">
                    Drawdown Capital Payout Amount (SAR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-regal-emerald-800 text-sm">
                      SAR
                    </span>
                    <input 
                      type="text"
                      placeholder="e.g. 50000"
                      value={drawAmountInput}
                      onChange={(e) => setDrawAmountInput(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-12 pr-4 py-3 border border-regal-cream-200 bg-regal-cream-50 text-sm rounded-lg font-mono font-bold text-regal-emerald-950 focus:outline-none focus:ring-1 focus:ring-regal-emerald-900"
                    />
                  </div>
                  <div className="mt-1 flex justify-between">
                    <span className="text-[10px] text-regal-emerald-800">Min draw: SAR 10,000</span>
                    <span className="text-[10px] text-regal-emerald-800 cursor-pointer hover:underline text-regal-gold-700 font-bold" onClick={() => setDrawAmountInput(availableAmount.toString())}>
                      Max available limit
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-regal-emerald-850 mb-1">
                    Drawdown Purpose (Murabaha Contract Objective)
                  </label>
                  <select 
                    value={drawPurpose}
                    onChange={(e) => setDrawPurpose(e.target.value)}
                    className="w-full p-3 rounded-lg border border-regal-cream-200 bg-regal-cream-50 text-sm focus:outline-none"
                  >
                    <option value="Inventory Procurement">Retail Inventory Procurement</option>
                    <option value="Supplier Logistics Pay">Logistics & Freight supplier pay</option>
                    <option value="Staff Payroll Expansion">Staff Salaries & Recruitment</option>
                    <option value="B2B Supply Raw Materials">Procurement of raw bakery elements</option>
                    <option value="POS Terminal Lease Setup">Branch Equipment & Till Expansion</option>
                  </select>
                </div>

                <div className="p-4 bg-regal-cream-50 rounded-xl border border-regal-cream-200 text-xs text-regal-emerald-800 leading-relaxed flex gap-2">
                  <Info className="w-4 h-4 text-regal-gold-600 shrink-0" />
                  <span>
                    Upon confirming, your SAMA digital contract ledger generates an instant Murabaha contract and instantly wire deposits the amount into the selected Saudi National Bank account.
                  </span>
                </div>

                <button 
                  type="button"
                  disabled={isProcessingDraw || !drawAmountInput}
                  onClick={() => executeDrawdown(Number(drawAmountInput), drawPurpose)}
                  className="w-full py-4 rounded-xl bg-regal-emerald-950 font-bold text-white hover:bg-regal-emerald-900 transition flex items-center justify-center gap-2 shadow-md disabled:bg-regal-cream-300 disabled:text-regal-emerald-800 disabled:cursor-not-allowed"
                >
                  {isProcessingDraw ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Simulating Murabaha Wire Placement (SAMA API)...
                    </>
                  ) : (
                    <>
                      Confirm Drawdown & Deposit <ArrowUpRight className="w-4 h-4 text-regal-gold-400" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: REPAY BALANCE */}
          {activeTab === 'repay' && (
            <div className="max-w-xl mx-auto bg-white rounded-2xl border border-regal-cream-205 shadow p-6 sm:p-8">
              <div className="flex items-center gap-2 pb-4 border-b border-regal-cream-200 mb-6">
                <ArrowDownLeft className="w-6 h-6 text-amber-600" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-regal-emerald-950">Repay Credit Balance</h3>
                  <p className="text-xs text-regal-emerald-850 font-medium">Settle utilized credit balances instantly via standard local settlement options.</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Utilized Balance Recap */}
                <div className="bg-gradient-to-r from-amber-950 to-amber-900 text-white rounded-xl p-5 mb-2 border border-amber-800">
                  <span className="text-xs font-mono uppercase text-white/50 block">Outstanding Utilized Balance</span>
                  <div className="text-3xl font-extrabold font-mono text-regal-gold-300">
                    SAR {utilizedAmount.toLocaleString()}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-regal-emerald-850 mb-1">
                    Select local Repayment Method
                  </label>
                  <select 
                    value={selectedRepayMethod}
                    onChange={(e) => setSelectedRepayMethod(e.target.value)}
                    className="w-full p-3 rounded-lg border border-regal-cream-200 bg-regal-cream-50 font-medium text-sm focus:outline-none"
                  >
                    <option value="SADAD Bill Account">SADAD Direct Bank Bill (Biller Code: #042)</option>
                    <option value="Automated POS Sweep">Dynamic Daily POS Terminal Sweep (Geidea / Foodics Sync)</option>
                    <option value="SAIB Bank Wire">Corporate Bank Transfer (Riyadh Bank - Main IBAN)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-regal-emerald-850 mb-1">
                    Enter Settlement Payout Amount (SAR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-regal-emerald-800 text-sm">
                      SAR
                    </span>
                    <input 
                      type="text"
                      placeholder="e.g. 20000"
                      value={repayAmountInput}
                      onChange={(e) => setRepayAmountInput(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-12 pr-4 py-3 border border-regal-cream-200 bg-regal-cream-50 text-sm rounded-lg font-mono font-bold text-regal-emerald-950 focus:outline-none focus:ring-1 focus:ring-regal-emerald-900"
                    />
                  </div>
                  <div className="mt-1 flex justify-between">
                    <span className="text-[10px] text-regal-emerald-805">Min repayment: SAR 5,000</span>
                    <span className="text-[10px] text-regal-emerald-805 cursor-pointer hover:underline text-regal-gold-700 font-bold" onClick={() => setRepayAmountInput(utilizedAmount.toString())}>
                      Settle total outstanding
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-regal-cream-50 rounded-xl border border-regal-cream-200 text-xs text-regal-emerald-800 leading-relaxed flex gap-2">
                  <Info className="w-4 h-4 text-regal-gold-600 shrink-0" />
                  <span>
                    Upon confirmation, our engine simulates a SADAD sweep, decreases utilized credit metrics, and re-expands credit line limit instantly for further branch drawdowns.
                  </span>
                </div>

                <button 
                  type="button"
                  disabled={isProcessingRepay || !repayAmountInput}
                  onClick={() => executeRepayment(Number(repayAmountInput))}
                  className="w-full py-4 rounded-xl bg-regal-emerald-950 font-bold text-white hover:bg-regal-emerald-900 transition flex items-center justify-center gap-2 shadow-md disabled:bg-regal-cream-300 disabled:text-regal-emerald-800 disabled:cursor-not-allowed"
                >
                  {isProcessingRepay ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Simulating SADAD sweep clearing...
                    </>
                  ) : (
                    <>
                      Confirm Repayment / Sweep settlement <ArrowDownLeft className="w-4 h-4 text-regal-gold-400" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: MULTI-LINE BRANCH ALLOCATOR */}
          {activeTab === 'branches' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-regal-cream-205 shadow">
                <div className="pb-4 border-b border-regal-cream-200 mb-6">
                  <h3 className="font-serif text-lg font-bold text-regal-emerald-950">Multi-Line Regional Branch Limits</h3>
                  <p className="text-xs text-regal-emerald-850 font-medium">Reallocate your main credit line across different branches so local managers can draw supplier capital independently.</p>
                </div>

                {/* Sub allocated info */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 bg-regal-cream-50 p-4 rounded-xl text-center">
                  <div>
                    <span className="text-[10px] text-regal-emerald-800 uppercase font-mono block">Aggregate Main Limit</span>
                    <span className="font-bold text-sm font-mono">SAR {creditLimit.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-regal-emerald-800 uppercase font-mono block">Allocated Total</span>
                    <span className="font-bold text-sm font-mono text-regal-emerald-900">
                      SAR {branches.reduce((acc, b) => acc + b.limit, 0).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-regal-emerald-800 uppercase font-mono block">Unallocated Headroom</span>
                    <span className="font-bold text-sm font-mono text-regal-gold-700">
                      SAR {(creditLimit - branches.reduce((acc, b) => acc + b.limit, 0)).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {branches.map(branch => (
                    <div key={branch.id} className="p-5 border border-regal-cream-200 rounded-xl bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h4 className="font-bold text-regal-emerald-950 text-sm flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-regal-gold-600" /> {branch.name}
                        </h4>
                        <span className="text-xs text-regal-emerald-800 block mt-0.5">Manager: {branch.manager} • Utilized: <span className="font-mono text-xs font-bold">SAR {branch.utilized.toLocaleString()}</span></span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[10px] text-regal-emerald-800 font-mono uppercase block">Allocated limit</span>
                          <span className="font-bold text-sm font-mono">SAR {branch.limit.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex gap-1.5">
                          <button 
                            onClick={() => rebalanceBranch(branch.id, -25000)}
                            className="p-1 px-3 bg-regal-cream-200 hover:bg-regal-cream-300 rounded font-bold text-xs"
                          >
                            -25K
                          </button>
                          <button 
                            onClick={() => rebalanceBranch(branch.id, 25000)}
                            className="p-1 px-3 bg-regal-emerald-950 text-white hover:bg-emerald-900 rounded font-bold text-xs"
                          >
                            +25K
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto bg-white rounded-2xl border border-regal-cream-205 shadow p-6 sm:p-8">
              <div className="pb-4 border-b border-regal-cream-200 mb-6">
                <h3 className="font-serif text-lg font-bold text-regal-emerald-950">Merchant Settings Configurations</h3>
                <p className="text-xs text-regal-emerald-850">Manage local API connections, automatic POS card sweep percentages, and user roles.</p>
              </div>

              <div className="space-y-5 text-sm">
                
                {/* Row 1 */}
                <div className="p-4 bg-regal-cream-50 rounded-xl border border-regal-cream-200 space-y-3">
                  <h4 className="font-bold text-regal-emerald-950 text-xs uppercase tracking-wider">POS Terminal Integration Provider</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="border border-regal-cream-200 p-3 rounded bg-white flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="pos_prov" defaultChecked className="accent-regal-emerald-950" />
                      <span className="text-xs font-semibold">Geidea Sync</span>
                    </label>
                    <label className="border border-regal-cream-200 p-3 rounded bg-white flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="pos_prov" className="accent-regal-emerald-950" />
                      <span className="text-xs font-semibold">Foodics Till</span>
                    </label>
                  </div>
                </div>

                {/* Sweep slider */}
                <div className="p-4 bg-regal-cream-50 rounded-xl border border-regal-cream-200">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-regal-emerald-950 text-xs uppercase tracking-wider">POS Repayment Sweep Ratio</h4>
                    <span className="text-xs font-bold font-mono text-regal-gold-700">Daily 2.5%</span>
                  </div>
                  <p className="text-[11px] text-regal-emerald-800 leading-normal mb-3">
                    Billed as a flexible rolling percentage swept automatically from daily point-of-sale card transactions.
                  </p>
                  <input type="range" min="1" max="10" defaultValue="2" className="w-full accent-regal-emerald-950" />
                </div>

                {/* Bank wires account */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-regal-emerald-850 mb-1">National Tax registration Certificate (KSA VAT ID)</h4>
                  <input 
                    type="text" 
                    defaultValue="300052319000003"
                    className="w-full p-3 bg-regal-cream-50 rounded-lg border border-regal-cream-200 text-xs font-mono" 
                    placeholder="3xxxxxxxxxxxxxx"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => {
                      alert('Settings successfully updated with SAMA live terminal configuration.');
                    }}
                    className="w-full py-3 rounded-lg bg-regal-emerald-950 text-white font-bold hover:bg-regal-emerald-900 transition text-sm"
                  >
                    Save configuration profiles
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
