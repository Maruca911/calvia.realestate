import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/constants';

export default function WhatsAppButton() {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I\'m interested in Calvia real estate. Can you help me?')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {tooltipVisible && (
        <div className="animate-fade-in bg-white rounded-xl shadow-lg shadow-black/10 p-4 max-w-[240px] border border-gray-100 relative">
          <button
            onClick={() => setTooltipVisible(false)}
            className="absolute top-2 right-2 text-grey-light hover:text-grey-dark transition-colors"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-sm font-semibold text-grey-dark mb-1">Need help?</p>
          <p className="text-xs text-grey leading-relaxed mb-3">
            Chat with our Calvia property experts instantly on WhatsApp.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xs font-semibold text-white bg-[#25D366] rounded-lg py-2 px-4 hover:bg-[#1fb855] transition-colors"
          >
            Start Chat
          </a>
        </div>
      )}

      <button
        onClick={() => setTooltipVisible(!tooltipVisible)}
        className="group w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-105 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}
