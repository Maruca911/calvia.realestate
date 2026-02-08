import { ArrowDown } from 'lucide-react';
import type { Route } from '../hooks/useRouter';

interface HeroProps {
  navigate: (to: Route) => void;
}

export default function Hero({ navigate }: HeroProps) {
  const scrollToTrends = () => {
    document.getElementById('market-trends')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Calvia Mallorca coastal property hero">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        role="img"
        aria-label="Aerial view of the Calvia coastline in Mallorca with turquoise Mediterranean waters and luxury villas"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-blue/60 via-dark-blue/40 to-dark-blue/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-16">
        <div className="mb-6">
          <span className="inline-block text-white/80 font-semibold text-sm tracking-[0.25em] uppercase mb-4 opacity-0 animate-fade-in">
            Calvi&agrave;, Mallorca
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 opacity-0 animate-slide-up drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            Instant Expert Connections for Buyers &amp; Home Owners
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto leading-relaxed opacity-0 animate-slide-up font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]" style={{ animationDelay: '0.15s' }}>
            Tell us what you need. We find the right agency for you.
            <span className="block text-base md:text-lg text-white/85 font-normal mt-3">
              Whether buying, selling, or renting in Calvi&agrave;, our team personally matches you
              to expert local agencies &mdash; saving you time and getting results fast.
            </span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 opacity-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => navigate('/buyers')}
            className="w-full sm:w-auto px-10 py-4 bg-white text-dark-blue font-semibold rounded-lg text-lg transition-all duration-300 hover:bg-beige hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5"
          >
            Find Your Dream Home
          </button>
          <button
            onClick={() => navigate('/sellers')}
            className="w-full sm:w-auto px-10 py-4 bg-transparent text-white font-semibold rounded-lg text-lg border-2 border-white/70 transition-all duration-300 hover:bg-white hover:text-dark-blue hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5"
          >
            I'm a Home Owner
          </button>
        </div>

        <button onClick={scrollToTrends} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/60" />
        </button>
      </div>
    </section>
  );
}
