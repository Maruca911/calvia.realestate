import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Route } from '../hooks/useRouter';

interface MobileCTAProps {
  navigate: (to: Route) => void;
}

export default function MobileCTA({ navigate }: MobileCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden animate-slide-up-banner">
      <div className="bg-dark-blue/95 backdrop-blur-sm border-t border-white/10 px-4 py-3">
        <button
          onClick={() => navigate('/buyers')}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white text-dark-blue font-semibold rounded-lg text-sm active:scale-[0.98] transition-transform"
        >
          Get Your Free Match
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
