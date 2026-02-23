import { MapPin, ExternalLink } from 'lucide-react';
import { openCookiePreferences } from './CookieBanner';
import type { Route } from '../hooks/useRouter';

interface FooterProps {
  navigate?: (to: Route) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const handleNav = (to: Route) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigate) navigate(to);
  };

  return (
    <footer className="bg-dark-blue text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-8 mb-10 sm:mb-12">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-white/80" />
              <span className="font-bold text-lg">Calvia Real Estate</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Instant expert connections for property buyers and home owners in the Calvia municipality, Mallorca.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#/" onClick={handleNav('/')} className="text-sm text-white/60 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#/buyers" onClick={handleNav('/buyers')} className="text-sm text-white/60 hover:text-white transition-colors">
                  Find Your Dream Home
                </a>
              </li>
              <li>
                <a href="#/sellers" onClick={handleNav('/sellers')} className="text-sm text-white/60 hover:text-white transition-colors">
                  For Home Owners
                </a>
              </li>
              <li>
                <a href="#/blog" onClick={handleNav('/blog')} className="text-sm text-white/60 hover:text-white transition-colors">
                  Blog & Guides
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">Popular Guides</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#/blog/lex-beckham-ruling-mallorca" onClick={handleNav('/blog/lex-beckham-ruling-mallorca')} className="text-sm text-white/60 hover:text-white transition-colors">
                  Lex Beckham Tax Regime
                </a>
              </li>
              <li>
                <a href="#/blog/buying-property-bendinat-guide" onClick={handleNav('/blog/buying-property-bendinat-guide')} className="text-sm text-white/60 hover:text-white transition-colors">
                  Buying in Bendinat
                </a>
              </li>
              <li>
                <a href="#/blog/golden-visa-ended-spain-calvia-alternatives-2026" onClick={handleNav('/blog/golden-visa-ended-spain-calvia-alternatives-2026')} className="text-sm text-white/60 hover:text-white transition-colors">
                  Golden Visa Alternatives
                </a>
              </li>
              <li>
                <a href="#/blog/cost-of-living-calvia-mallorca-2026" onClick={handleNav('/blog/cost-of-living-calvia-mallorca-2026')} className="text-sm text-white/60 hover:text-white transition-colors">
                  Cost of Living in Calvia
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">Useful Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://calvia.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Calvia App
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://calvia.group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Calvia Group
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ajuntamentdecalvia.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Calvia Town Hall
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button
                  onClick={openCookiePreferences}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/50">
              <span>&copy; {new Date().getFullYear()} Calvia Real Estate</span>
              <span className="hidden sm:inline">&middot;</span>
              <a
                href="https://calvia.group"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80 transition-colors"
              >
                A calvia.group company
              </a>
            </div>
            <p className="text-xs text-white/40 text-center md:text-right max-w-md">
              Your data is handled in accordance with GDPR regulations.
              We only share your information with partner agencies relevant to your enquiry.
            </p>
          </div>
          <p className="text-[10px] sm:text-xs text-white/30 text-center leading-relaxed">
            Portions of this website's content, including blog articles and property descriptions,
            were generated or assisted by artificial intelligence and reviewed by our editorial team.
            For personalised advice, always consult a qualified professional.
            <a
              href="https://calvia.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/60 transition-colors ml-1"
            >
              calvia.app
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
