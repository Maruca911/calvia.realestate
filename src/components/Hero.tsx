import { useState, useEffect, useRef } from 'react';
import { ArrowDown, Users, Building2, Star, Clock } from 'lucide-react';
import type { Route } from '../hooks/useRouter';

interface HeroProps {
  navigate: (to: Route) => void;
}

const TRUST_STATS = [
  { icon: Users, value: 340, suffix: '+', label: 'Leads Matched' },
  { icon: Building2, value: 25, suffix: '+', label: 'Partner Agencies' },
  { icon: Star, value: 4.9, suffix: '', label: 'Avg. Rating', decimals: 1 },
  { icon: Clock, value: 24, suffix: 'h', label: 'Response Time' },
];

function AnimatedCounter({ target, suffix, decimals = 0 }: { target: number; suffix: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
      {suffix}
    </span>
  );
}

export default function Hero({ navigate }: HeroProps) {
  const scrollToTrends = () => {
    document.getElementById('market-trends')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Serra de Tramuntana Mallorca property hero">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1007796/pexels-photo-1007796.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Aerial view of Valldemossa and the Serra de Tramuntana mountains in Mallorca with traditional stone buildings and Mediterranean landscape"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-blue/60 via-dark-blue/40 to-dark-blue/70" />
      </div>

      <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-white/5 blur-3xl animate-float-slow pointer-events-none hidden md:block" />
      <div className="absolute bottom-1/3 right-[8%] w-48 h-48 rounded-full bg-white/5 blur-2xl animate-float-delayed pointer-events-none hidden md:block" />
      <div className="absolute top-1/2 left-[60%] w-32 h-32 rounded-full bg-white/[0.03] blur-xl animate-pulse-gentle pointer-events-none hidden lg:block" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-16">
        <div className="mb-6">
          <span className="inline-block text-white/80 font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 opacity-0 animate-fade-in">
            Calvi&agrave;, Mallorca
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 sm:mb-8 opacity-0 animate-slide-up drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            Instant Expert Connections for Buyers &amp; Home Owners
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white max-w-2xl mx-auto leading-relaxed opacity-0 animate-slide-up font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]" style={{ animationDelay: '0.15s' }}>
            Tell us what you need. We find the right agency for you.
            <span className="block text-sm sm:text-base md:text-lg text-white/85 font-normal mt-3">
              Whether buying, selling, or renting in Calvi&agrave;, our team personally matches you
              to expert local agencies &mdash; saving you time and getting results fast.
            </span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 opacity-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => navigate('/buyers')}
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-dark-blue font-semibold rounded-lg text-base sm:text-lg transition-all duration-300 hover:bg-beige hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Find Your Dream Home
          </button>
          <button
            onClick={() => navigate('/sellers')}
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-transparent text-white font-semibold rounded-lg text-base sm:text-lg border-2 border-white/70 transition-all duration-300 hover:bg-white hover:text-dark-blue hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 active:scale-[0.98]"
          >
            I'm a Home Owner
          </button>
        </div>

        <div className="mt-10 sm:mt-14 opacity-0 animate-slide-up grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto" style={{ animationDelay: '0.5s' }}>
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 mx-auto mb-1" />
              <div className="text-xl sm:text-2xl font-bold text-white">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <button onClick={scrollToTrends} className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-white/60" />
        </button>
      </div>
    </section>
  );
}
