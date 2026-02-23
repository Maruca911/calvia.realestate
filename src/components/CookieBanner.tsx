import { useState, useEffect } from 'react';
import { Shield, X, Settings } from 'lucide-react';
import { initGA } from '../lib/analytics';

interface ConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const CONSENT_KEY = 'calvia_cookie_consent';

function getStoredConsent(): ConsentState | null {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentState) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    /* storage unavailable */
  }
}

export function getCookieConsent(): ConsentState | null {
  return getStoredConsent();
}

export function openCookiePreferences() {
  try {
    localStorage.removeItem(CONSENT_KEY);
    window.location.reload();
  } catch {
    /* storage unavailable */
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
    if (existing.analytics) initGA();
  }, []);

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true, timestamp: new Date().toISOString() });
    initGA();
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    saveConsent({ essential: true, analytics: false, marketing: false, timestamp: new Date().toISOString() });
    setVisible(false);
  };

  const handleSavePreferences = () => {
    saveConsent({ essential: true, analytics, marketing, timestamp: new Date().toISOString() });
    if (analytics) initGA();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] animate-slide-up-banner">
      <div className="bg-white border-t border-beige-dark/50 shadow-[0_-4px_30px_rgba(0,0,0,0.1)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          {!showPreferences ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Shield className="w-5 h-5 text-dark-blue flex-shrink-0 mt-0.5" />
                <p className="text-sm text-grey-dark leading-relaxed">
                  We use cookies to improve your experience and analyse site traffic.
                  By clicking &ldquo;Accept All&rdquo;, you consent to our use of cookies.
                  See our{' '}
                  <span className="text-dark-blue font-medium">Privacy Policy</span>{' '}
                  for details.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:flex-shrink-0">
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 bg-dark-blue text-white text-sm font-semibold rounded-lg hover:bg-dark-blue-light transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={handleEssentialOnly}
                  className="px-4 py-2 bg-beige text-grey-dark text-sm font-semibold rounded-lg hover:bg-beige-dark transition-colors"
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="p-2 text-grey hover:text-dark-blue transition-colors"
                  aria-label="Manage preferences"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={handleEssentialOnly}
                  className="p-2 text-grey hover:text-dark-blue transition-colors sm:hidden"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-grey-dark text-sm">Cookie Preferences</h3>
                <button onClick={() => setShowPreferences(false)} className="text-grey hover:text-dark-blue">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between gap-3 p-3 bg-warm-grey rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-grey-dark">Essential</span>
                    <p className="text-xs text-grey">Required for the site to function. Cannot be disabled.</p>
                  </div>
                  <input type="checkbox" checked disabled className="w-4 h-4 accent-dark-blue" />
                </label>

                <label className="flex items-center justify-between gap-3 p-3 bg-warm-grey rounded-lg cursor-pointer">
                  <div>
                    <span className="text-sm font-medium text-grey-dark">Analytics</span>
                    <p className="text-xs text-grey">Help us understand how visitors interact with our site.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="w-4 h-4 accent-dark-blue cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between gap-3 p-3 bg-warm-grey rounded-lg cursor-pointer">
                  <div>
                    <span className="text-sm font-medium text-grey-dark">Marketing</span>
                    <p className="text-xs text-grey">Used to deliver personalised ads and measure campaign performance.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="w-4 h-4 accent-dark-blue cursor-pointer"
                  />
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 bg-dark-blue text-white text-sm font-semibold rounded-lg hover:bg-dark-blue-light transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 bg-beige text-grey-dark text-sm font-semibold rounded-lg hover:bg-beige-dark transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
