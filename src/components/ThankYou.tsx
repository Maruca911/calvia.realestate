import { useState, useEffect } from 'react';
import { CheckCircle, MessageCircle, Copy, Check, Mail, CalendarClock, AlertTriangle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/constants';
import Footer from './Footer';
import type { Route } from '../hooks/useRouter';

interface ThankYouProps {
  refCode: string;
  navigate: (to: Route) => void;
}

function CountdownTimer() {
  const [seconds, setSeconds] = useState(24 * 60 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {[
        { value: hours, label: 'Hours' },
        { value: minutes, label: 'Min' },
        { value: secs, label: 'Sec' },
      ].map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="w-14 sm:w-16 h-14 sm:h-16 bg-dark-blue rounded-lg flex items-center justify-center">
            <span className="text-xl sm:text-2xl font-bold text-white font-montserrat tabular-nums">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-grey uppercase tracking-wider mt-1 block">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function ThankYou({ refCode, navigate }: ThankYouProps) {
  const [copied, setCopied] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I just submitted a lead on Calvia Real Estate. My reference code is ${refCode}.`
  )}`;

  const copyRefCode = async () => {
    try {
      await navigator.clipboard.writeText(refCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may not be available */
    }
  };

  return (
    <>
      <div className="min-h-screen bg-warm-grey pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-dark-blue/10 mb-6">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-dark-blue" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4">
              Thank You &mdash; Your Match is on the Way!
            </h1>
            <p className="text-grey text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
              Our team is already working to find the best agencies for you.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl shadow-black/5 p-5 sm:p-8 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start gap-3 mb-5 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 text-sm sm:text-base mb-1">
                  Confirm Your Email to Activate Your Match
                </h3>
                <p className="text-amber-700 text-xs sm:text-sm leading-relaxed">
                  We have sent a confirmation email to your inbox. Please click the verification link
                  within 24 hours to activate your match. If you do not confirm, your enquiry will expire
                  and you will need to resubmit.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-dark-blue" />
              <h3 className="font-semibold text-black text-base sm:text-lg">Time Remaining</h3>
            </div>
            <CountdownTimer />
            <p className="text-xs text-grey text-center mt-3">
              Check your spam folder if you don't see our email within 5 minutes.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl shadow-black/5 p-5 sm:p-8 mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-semibold text-black text-base sm:text-lg mb-5">What happens next:</h3>
            <ol className="space-y-4">
              <li className="flex gap-3 sm:gap-4">
                <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-dark-blue text-white text-xs sm:text-sm font-semibold flex items-center justify-center">1</span>
                <span className="text-grey text-sm sm:text-base pt-0.5">Confirm your email within 24 hours to keep your enquiry active.</span>
              </li>
              <li className="flex gap-3 sm:gap-4">
                <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-dark-blue text-white text-xs sm:text-sm font-semibold flex items-center justify-center">2</span>
                <span className="text-grey text-sm sm:text-base pt-0.5">Our team reviews your details and matches you to 2-3 expert agencies.</span>
              </li>
              <li className="flex gap-3 sm:gap-4">
                <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-dark-blue text-white text-xs sm:text-sm font-semibold flex items-center justify-center">3</span>
                <span className="text-grey text-sm sm:text-base pt-0.5">Expect a personalized intro via email or phone within 48 hours.</span>
              </li>
            </ol>
          </div>

          <div className="bg-dark-blue rounded-2xl p-5 sm:p-8 mb-6 text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CalendarClock className="w-8 h-8 text-white/80 mx-auto mb-3" />
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2">
              Want Faster Results?
            </h3>
            <p className="text-white/70 text-sm sm:text-base mb-5 max-w-md mx-auto">
              Book a free 15-minute consultation with our team. We will discuss your needs
              and fast-track your agency match.
            </p>
            <a
              href="https://calendly.com/calvia-realestate/consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-dark-blue font-semibold rounded-lg text-sm sm:text-base transition-all duration-300 hover:bg-beige hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <CalendarClock className="w-4 h-4 sm:w-5 sm:h-5" />
              Book Free Consultation
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white font-semibold rounded-lg text-sm sm:text-base transition-all duration-300 hover:bg-[#20BD5A] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {refCode && (
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-beige-dark/50 text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <p className="text-xs sm:text-sm text-grey mb-2">Your unique referral code:</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-dark-blue font-bold text-lg sm:text-xl tracking-wider">{refCode}</span>
                <button
                  onClick={copyRefCode}
                  className="p-2 rounded-lg hover:bg-beige transition-colors"
                  title="Copy code"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-grey-light" />}
                </button>
              </div>
              <p className="text-[10px] sm:text-xs text-grey-light mt-2">Share this code with friends for referral bonuses.</p>
            </div>
          )}
        </div>
      </div>
      <Footer navigate={navigate} />
    </>
  );
}
