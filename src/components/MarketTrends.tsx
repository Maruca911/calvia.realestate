import { TrendingUp, Anchor, Building, Gem, MapPin, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const STATS = [
  { label: 'Avg. Price Increase (YoY)', value: '+8.2%', icon: TrendingUp },
  { label: 'Avg. Price per m\u00B2', value: '\u20AC5,800', icon: Building },
  { label: 'International Buyers', value: '67%', icon: MapPin },
  { label: 'Luxury Segment Growth', value: '+12%', icon: Gem },
];

const DEVELOPMENTS = [
  {
    icon: Anchor,
    title: 'Club de Mar Superyacht Harbour',
    description: 'Palma\'s Club de Mar is undergoing a major transformation into a world-class superyacht marina, attracting ultra-high-net-worth individuals and driving demand for premium waterfront properties across the Calvi\u00E0 coast.',
  },
  {
    icon: Building,
    title: 'Palmanova & Magaluf Regeneration',
    description: 'Significant public and private investment is reshaping Palmanova and Magaluf into upscale, year-round destinations. New boutique hotels, promenades, and green spaces are elevating property values across the western corridor.',
  },
  {
    icon: Gem,
    title: 'Portals Nous Harbour Renovation',
    description: 'Ongoing upgrades to Puerto Portals and the surrounding Portals Nous area continue to reinforce its status as Mallorca\'s premier lifestyle hub. Modern dining, retail, and marina facilities keep demand consistently high.',
  },
  {
    icon: MapPin,
    title: 'Bendinat: The Established Prestige Hub',
    description: 'Bendinat remains the benchmark for prestige living in Calvi\u00E0. Tree-lined streets, proximity to the Royal Bendinat golf course, and a quiet exclusivity make it the top choice for discerning buyers seeking long-term value.',
  },
];

export default function MarketTrends() {
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal(0.1);
  const { ref: devRef, isVisible: devVisible } = useScrollReveal(0.1);

  return (
    <section id="market-trends" className="bg-white">
      <div className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-dark-blue font-semibold text-sm tracking-[0.15em] uppercase mb-3">
              Market Intelligence
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-black mb-4">
              Mallorca Real Estate in 2026
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto leading-relaxed">
              Calvi&agrave; continues to be one of the Mediterranean's most sought-after
              real estate markets. Here are the key trends shaping the region.
            </p>
          </div>

          <div
            ref={statsRef}
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-beige/50 rounded-xl p-6 text-center group hover:bg-beige transition-colors duration-300"
              >
                <stat.icon className="w-6 h-6 text-dark-blue mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl md:text-3xl font-bold text-dark-blue mb-1">{stat.value}</div>
                <div className="text-sm text-grey">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-warm-grey py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-6">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-black mb-3 text-center">
              Key Developments
            </h3>
            <p className="text-grey text-center max-w-xl mx-auto mb-12">
              Major infrastructure and lifestyle projects driving value across Calvi&agrave;.
            </p>
          </div>

          <div
            ref={devRef}
            className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ${
              devVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {DEVELOPMENTS.map((dev) => (
              <div
                key={dev.title}
                className="bg-white border border-beige-dark/40 rounded-xl p-7 group hover:shadow-lg hover:shadow-black/5 hover:border-dark-blue/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-dark-blue/10 flex items-center justify-center group-hover:bg-dark-blue/15 transition-colors">
                    <dev.icon className="w-5 h-5 text-dark-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-black text-lg">{dev.title}</h4>
                      <ArrowUpRight className="w-4 h-4 text-dark-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-grey text-[15px] leading-relaxed">{dev.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-grey-light mt-10">
            Market data sourced from Engel &amp; V&ouml;lkers Mallorca Market Report 2025/2026 and regional property indices.
          </p>
        </div>
      </div>
    </section>
  );
}
