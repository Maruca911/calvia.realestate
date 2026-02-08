import { useState, useEffect } from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import type { Route } from '../hooks/useRouter';

interface NavigationProps {
  route: Route;
  navigate: (to: Route) => void;
}

export default function Navigation({ route, navigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [route]);

  const isHome = route === '/';
  const transparent = isHome && !scrolled && !mobileOpen;

  const links: { label: string; to: Route; match?: string }[] = [
    { label: 'Home', to: '/' },
    { label: 'Find Your Dream Home', to: '/buyers' },
    { label: 'For Home Owners', to: '/sellers' },
    { label: 'Blog', to: '/blog', match: '/blog' },
  ];

  const isActive = (link: typeof links[number]) => {
    if (link.match) return route.startsWith(link.match);
    return route === link.to;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-sm'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-18">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 group"
        >
          <MapPin className={`w-5 h-5 transition-colors ${transparent ? 'text-white' : 'text-dark-blue'}`} />
          <span className={`font-bold text-lg tracking-tight transition-colors ${
            transparent ? 'text-white' : 'text-black'
          }`}>
            Calvia Real Estate
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.to}
              onClick={() => navigate(link.to)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(link)
                  ? transparent
                    ? 'text-white bg-white/15'
                    : 'text-dark-blue bg-dark-blue/5'
                  : transparent
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-grey hover:text-black hover:bg-beige/50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-beige/50 transition-colors"
        >
          {mobileOpen
            ? <X className="w-5 h-5 text-grey-dark" />
            : <Menu className={`w-5 h-5 ${transparent ? 'text-white' : 'text-grey-dark'}`} />
          }
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-beige-dark/30 animate-fade-in">
          <div className="px-6 py-4 space-y-1">
            {links.map((link) => (
              <button
                key={link.to}
                onClick={() => navigate(link.to)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive(link)
                    ? 'text-dark-blue bg-dark-blue/5'
                    : 'text-grey hover:text-black hover:bg-beige/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
