import { CheckCircle, MessageCircle, ArrowLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { WHATSAPP_NUMBER } from '../utils/constants';

interface ThankYouProps {
  refCode: string;
  onBack: () => void;
}

export default function ThankYou({ refCode, onBack }: ThankYouProps) {
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
    <div className="min-h-screen bg-beige flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-dark-blue/10 mb-8">
          <CheckCircle className="w-10 h-10 text-dark-blue" />
        </div>

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-black mb-4">
          Thank You &mdash; Your Match is on the Way!
        </h1>

        <p className="text-grey text-lg mb-10 leading-relaxed">
          Our team is already working to find the best agencies for you.
        </p>

        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 p-8 mb-8 text-left">
          <h3 className="font-semibold text-black text-lg mb-5">What happens next:</h3>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-blue text-white text-sm font-semibold flex items-center justify-center">1</span>
              <span className="text-grey pt-1">Our team reviews your details within 24 hours.</span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-blue text-white text-sm font-semibold flex items-center justify-center">2</span>
              <span className="text-grey pt-1">We connect you to 2-3 expert agencies matching your needs.</span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-blue text-white text-sm font-semibold flex items-center justify-center">3</span>
              <span className="text-grey pt-1">Expect a personalized intro via email or phone.</span>
            </li>
          </ol>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-4 bg-dark-blue text-white font-semibold rounded-lg text-lg transition-all duration-300 hover:bg-dark-blue-light hover:shadow-[0_0_30px_rgba(0,31,63,0.3)] hover:-translate-y-0.5 w-full justify-center mb-6"
        >
          <MessageCircle className="w-6 h-6" />
          Chat Now on WhatsApp
        </a>

        {refCode && (
          <div className="bg-white rounded-xl p-5 mb-8 border border-beige-dark/50">
            <p className="text-sm text-grey mb-2">Your unique referral code:</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-dark-blue font-bold text-xl tracking-wider">{refCode}</span>
              <button
                onClick={copyRefCode}
                className="p-2 rounded-lg hover:bg-beige transition-colors"
                title="Copy code"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-grey-light" />}
              </button>
            </div>
            <p className="text-xs text-grey-light mt-2">Share this code with friends for referral bonuses.</p>
          </div>
        )}

        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-grey hover:text-dark-blue transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
