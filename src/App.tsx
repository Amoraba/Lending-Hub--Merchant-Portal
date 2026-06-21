/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MarketingPage from './components/MarketingPage';
import MerchantDashboard from './components/MerchantDashboard';
import RequestCreditForm from './components/RequestCreditForm';
import { MerchantDetails } from './types';
import { ShieldCheck, ArrowLeft, Home, TrendingUp } from 'lucide-react';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [userRegistration, setUserRegistration] = useState<MerchantDetails | null>(null);

  // Synchronize on back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    // Initial load from local storage
    const stored = localStorage.getItem('merchant_portal_reg');
    if (stored) {
      try {
        setUserRegistration(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to restore merchant reg cached profile', e);
      }
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Custom routing navigator
  const navigate = (targetPath: string) => {
    window.history.pushState({}, '', targetPath);
    setPath(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Action on successful credit submission
  const handleRequestSuccess = (formData: MerchantDetails) => {
    setUserRegistration(formData);
    localStorage.setItem('merchant_portal_reg', JSON.stringify(formData));
    
    // Jump straight to the dashboard workspace to let them play with the balance
    navigate('/dashboard');
  };

  // Logout/clear session
  const handleLogout = () => {
    setUserRegistration(null);
    localStorage.removeItem('merchant_portal_reg');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-regal-cream-100 flex flex-col font-sans selection:bg-regal-gold-100/80">
      
      {/* Route Switcher Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.25 }}
          className="flex-1 flex flex-col"
        >
          {(() => {
            // '/' default marketing homepage
            if (path === '/' || path === '' || !path.startsWith('/')) {
              return (
                <MarketingPage 
                  onNavigate={navigate} 
                />
              );
            }

            // '/dashboard' interactive hub
            if (path.startsWith('/dashboard')) {
              return (
                <MerchantDashboard 
                  userRegistration={userRegistration}
                  onLogout={handleLogout}
                  onNavigateHome={() => navigate('/')}
                />
              );
            }

            // '/request' application layout
            if (path.startsWith('/request')) {
              return (
                <div className="min-h-screen bg-regal-cream-100 flex flex-col justify-between">
                  {/* Simplistic Top Nav with escape route */}
                  <header className="h-20 bg-white border-b border-regal-cream-200 flex items-center justify-between px-6 sm:px-8 shrink-0">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                      <span className="p-1 px-2 bg-regal-emerald-950 text-regal-gold-400 rounded-lg font-serif font-bold text-sm flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" /> MP
                      </span>
                      <span className="text-sm font-bold text-regal-emerald-950 hidden sm:inline-block font-mono">
                        Merchant Portal Saudi Arabia
                      </span>
                    </div>

                    <button 
                      onClick={() => navigate('/')}
                      className="text-xs font-semibold text-regal-emerald-900 bg-regal-cream-200 hover:bg-regal-cream-300 p-2 px-4 rounded-lg flex items-center gap-1.5 transition"
                    >
                      <Home className="w-3.5 h-3.5" /> Back to home
                    </button>
                  </header>

                  <main className="flex-1 py-12 px-4">
                    <RequestCreditForm 
                      onSuccess={handleRequestSuccess}
                      onCancel={() => navigate('/')}
                    />
                  </main>

                  <footer className="h-16 border-t border-regal-cream-205 flex items-center justify-center text-xs text-regal-emerald-800 bg-regal-cream-150">
                    <p>© {new Date().getFullYear()} Merchant Portal Ltd. Unified Shariah Murabahah Standards.</p>
                  </footer>
                </div>
              );
            }

            // Fallback for unexpected routes
            return (
              <div className="flex-1 flex flex-col items-center justify-center p-8 py-24 text-center">
                <ShieldCheck className="w-16 h-16 text-regal-gold-600 mb-4" />
                <h1 className="font-serif text-3xl font-bold mb-2">Endpoint Not Found</h1>
                <p className="text-sm text-regal-emerald-800 max-w-sm mb-6">
                  You are exploring outside Riyadh portal network. Return safely to home.
                </p>
                <button 
                  onClick={() => navigate('/')}
                  className="bg-regal-emerald-950 text-white p-3 px-6 rounded-lg font-bold"
                >
                  Return to Landing Homepage
                </button>
              </div>
            );
          })()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
