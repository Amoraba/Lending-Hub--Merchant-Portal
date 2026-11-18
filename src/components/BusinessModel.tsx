/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  ShoppingCart,
  Landmark,
  Handshake,
  CalendarCheck,
  ArrowRight,
  Store,
  Truck,
  TrendingUp,
  Repeat,
  Plug,
  BadgePercent,
  Info
} from 'lucide-react';

// Illustrative rates, matching the pricing tiers on the landing page.
const STARTER_LIMIT = 150_000;
const STARTER_RATE = 0.015;
const GROWTH_RATE = 0.011;

const MIN_AMOUNT = 50_000;
const MAX_AMOUNT = 1_500_000;
const TERMS = [1, 2, 3, 4, 5, 6];

const sar = (n: number) => `SAR ${Math.round(n).toLocaleString('en-US')}`;

const rateFor = (amount: number) => (amount <= STARTER_LIMIT ? STARTER_RATE : GROWTH_RATE);

// "One merchant, one year" example for the business side.
const EXAMPLE_LINE = 500_000;
const EXAMPLE_DRAW = 300_000;
const EXAMPLE_DRAWS_PER_YEAR = 4;
const EXAMPLE_FINANCED = EXAMPLE_DRAW * EXAMPLE_DRAWS_PER_YEAR;
const EXAMPLE_REVENUE = EXAMPLE_FINANCED * rateFor(EXAMPLE_DRAW);

const flowSteps = [
  {
    icon: ShoppingCart,
    title: "You pick the goods",
    text: "Choose the stock or equipment you need from your usual supplier."
  },
  {
    icon: Landmark,
    title: "We buy them first",
    text: "Merchant Portal pays the supplier in full. For a moment, the goods are ours."
  },
  {
    icon: Handshake,
    title: "We sell them to you",
    text: "At the cost plus one fixed markup, shown upfront. That price never changes."
  },
  {
    icon: CalendarCheck,
    title: "You pay in instalments",
    text: "Repay over up to 6 months, from your card sales, a bank transfer or SADAD."
  }
];

const winners = [
  {
    icon: Store,
    who: "The merchant",
    points: [
      "Gets stock now, pays from the sales it brings in",
      "Knows the full cost on day one",
      "No interest, a Shariah-compliant structure"
    ]
  },
  {
    icon: Truck,
    who: "The supplier",
    points: [
      "Paid in full, upfront",
      "No chasing unpaid invoices",
      "Customers can place bigger orders"
    ]
  },
  {
    icon: TrendingUp,
    who: "Merchant Portal",
    points: [
      "Earns the markup on every drawdown",
      "The line revolves, so merchants come back",
      "Repayment data improves every next decision"
    ]
  }
];

const revenueStreams = [
  {
    icon: BadgePercent,
    title: "Markup on each drawdown",
    text: "The main income: 1.1% to 1.5% of every purchase we finance, depending on the tier."
  },
  {
    icon: Repeat,
    title: "Revolving, repeat use",
    text: "What a merchant repays becomes available again, so one approved merchant draws many times a year."
  },
  {
    icon: Plug,
    title: "Enterprise and integrations",
    text: "Custom pricing for large chains, plus POS and API integrations across many branches."
  },
  {
    icon: Handshake,
    title: "Supplier partnerships (planned)",
    text: "Suppliers who get paid upfront may offer early-payment discounts or referral fees."
  }
];

const mustGoRight = [
  "Our cost of funds stays below what the markup earns",
  "Merchants repay on time; collecting from card sales helps",
  "Fully digital onboarding keeps the cost per merchant low"
];

export default function BusinessModel() {
  const [amount, setAmount] = useState(200_000);
  const [months, setMonths] = useState(6);

  const rate = rateFor(amount);
  const markup = amount * rate;
  const total = amount + markup;
  const monthly = total / months;
  const tierName = amount <= STARTER_LIMIT ? "Starter" : "Growth";

  return (
    <section id="business-model" className="py-24 bg-regal-cream-50 border-b border-regal-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-regal-gold-600 mb-2">The Business Model</h2>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-regal-emerald-950">Our business model, in plain words</h3>
          <p className="text-regal-emerald-800 mt-4 leading-relaxed">
            We buy what your business needs, then sell it to you at a fixed price agreed upfront.
            You pay it back over time. No interest, no surprises. This is called <strong className="text-regal-emerald-950">Murabaha</strong>.
          </p>
        </div>

        {/* A. Money flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 mb-6">
          {flowSteps.map((step, idx) => (
            <div key={idx} className="flex items-stretch">
              <div className="flex-1 bg-white p-6 rounded-xl border border-regal-cream-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="p-2.5 bg-emerald-50 rounded-lg">
                    <step.icon className="w-5 h-5 text-regal-emerald-800" />
                  </span>
                  <span className="text-xs font-bold text-regal-gold-600">Step {idx + 1}</span>
                </div>
                <h4 className="font-bold text-regal-emerald-950 mb-1">{step.title}</h4>
                <p className="text-sm text-regal-emerald-800 leading-relaxed">{step.text}</p>
              </div>
              {idx < flowSteps.length - 1 && (
                <div className="hidden lg:flex items-center px-2 text-regal-cream-300" aria-hidden="true">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 items-start bg-regal-gold-100 border border-regal-gold-200 rounded-xl p-4 mb-20 text-sm text-regal-emerald-900">
          <Info className="w-5 h-5 shrink-0 text-regal-emerald-700 mt-0.5" />
          <p>
            <strong>Why buy the goods first?</strong> In Murabaha the financier must own what it sells.
            That ownership step is what makes this a trade, rather than an interest-bearing loan.
          </p>
        </div>

        {/* B. Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-24">
          <div>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-regal-emerald-950 mb-3">See what it costs you</h4>
            <p className="text-regal-emerald-800 leading-relaxed mb-8">
              Say you need stock for Ramadan. Move the slider to your amount and pick how many months you want to pay over.
              The supplier is paid today, and you know the full price before you sign.
            </p>

            <label htmlFor="bm-amount" className="flex justify-between text-sm font-bold text-regal-emerald-950 mb-2">
              <span>Purchase amount</span>
              <span className="font-mono">{sar(amount)}</span>
            </label>
            <input
              id="bm-amount"
              type="range"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step={10_000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-regal-emerald-700 mb-1"
            />
            <div className="flex justify-between text-xs text-regal-emerald-800 mb-8">
              <span>{sar(MIN_AMOUNT)}</span>
              <span>{sar(MAX_AMOUNT)}</span>
            </div>

            <span id="bm-months-label" className="block text-sm font-bold text-regal-emerald-950 mb-2">Pay back over</span>
            <div role="radiogroup" aria-labelledby="bm-months-label" className="grid grid-cols-6 gap-2">
              {TERMS.map((m) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={months === m}
                  onClick={() => setMonths(m)}
                  className={`py-2 rounded-lg text-sm font-bold border transition ${
                    months === m
                      ? 'bg-regal-emerald-950 text-white border-regal-emerald-950'
                      : 'bg-white text-regal-emerald-950 border-regal-cream-300 hover:border-regal-emerald-700'
                  }`}
                >
                  {m} mo
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-regal-cream-200 shadow-lg p-6 sm:p-8">
            <dl className="divide-y divide-regal-cream-200 text-sm">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-regal-emerald-800">We pay your supplier (today)</dt>
                <dd className="font-mono font-bold text-regal-emerald-950 whitespace-nowrap">{sar(amount)}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-regal-emerald-800">Our fixed markup ({(rate * 100).toFixed(1)}%, {tierName} tier)</dt>
                <dd className="font-mono font-bold text-regal-emerald-950 whitespace-nowrap">+ {sar(markup)}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="font-bold text-regal-emerald-950">Total you pay</dt>
                <dd className="font-mono font-bold text-regal-emerald-950 whitespace-nowrap">{sar(total)}</dd>
              </div>
            </dl>
            <div className="mt-4 p-5 bg-regal-emerald-950 rounded-xl text-center">
              <span className="block text-xs uppercase tracking-widest text-white/60 mb-1">Your monthly instalment</span>
              <span className="block text-3xl font-bold font-mono text-regal-gold-300" aria-live="polite">{sar(monthly)}</span>
              <span className="block text-xs text-white/50 mt-1">for {months} {months === 1 ? 'month' : 'months'}</span>
            </div>
            <p className="text-xs text-regal-emerald-800 mt-4">
              Illustrative prototype figures. A real offer would depend on a risk check. Above SAR 1.5M, Enterprise pricing applies.
            </p>
          </div>
        </div>

        {/* C. Why everyone wins */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h4 className="font-serif text-2xl sm:text-3xl font-bold text-regal-emerald-950">Why everyone wins</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {winners.map((w, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-8 rounded-xl border border-regal-cream-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2.5 bg-emerald-50 rounded-lg">
                  <w.icon className="w-5 h-5 text-regal-emerald-800" />
                </span>
                <h5 className="font-bold text-lg text-regal-emerald-950">{w.who}</h5>
              </div>
              <ul className="space-y-2 text-sm text-regal-emerald-800">
                {w.points.map((p, pIdx) => (
                  <li key={pIdx} className="flex gap-2">
                    <span className="text-emerald-600 font-bold" aria-hidden="true">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* D. How the business makes money */}
        <div className="bg-regal-emerald-950 text-white rounded-2xl p-6 sm:p-10">
          <h4 className="text-xs font-bold uppercase tracking-widest text-regal-gold-400 mb-2">For investors</h4>
          <h5 className="font-serif text-2xl sm:text-3xl font-bold mb-8">How the business makes money</h5>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {revenueStreams.map((r, idx) => (
                <div key={idx} className="flex gap-3">
                  <r.icon className="w-5 h-5 shrink-0 text-regal-gold-400 mt-0.5" />
                  <div>
                    <h6 className="font-bold mb-1">{r.title}</h6>
                    <p className="text-sm text-white/70 leading-relaxed">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <span className="block text-xs uppercase tracking-widest text-white/60 mb-3">One merchant, one year</span>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                A shop with a {sar(EXAMPLE_LINE)} line draws {sar(EXAMPLE_DRAW)} for stock {EXAMPLE_DRAWS_PER_YEAR} times a year,
                repaying each time. That is {sar(EXAMPLE_FINANCED)} financed.
              </p>
              <span className="block text-xs text-white/60">Markup revenue</span>
              <span className="block text-3xl font-bold font-mono text-regal-gold-300">{sar(EXAMPLE_REVENUE)}</span>
              <span className="block text-xs text-white/50 mt-1">before funding costs and losses</span>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <h6 className="font-bold mb-3">What has to go right</h6>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/70">
              {mustGoRight.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-regal-gold-400 font-bold">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
