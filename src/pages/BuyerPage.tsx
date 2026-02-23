import { Home, Search, Clock, Shield } from 'lucide-react';
import BuyerSection from '../components/BuyerSection';
import LeadPageTemplate, { type LeadPageConfig } from './LeadPageTemplate';
import { buyerFaqs } from '../data/buyerFaqs';
import type { Route } from '../hooks/useRouter';

interface BuyerPageProps {
  onComplete: (refCode: string) => void;
  navigate: (to: Route) => void;
}

const CONFIG: LeadPageConfig = {
  heroIcon: Home,
  heroBg: 'bg-beige',
  heroTitle: <>Find Your Dream Home in Calvi&agrave;</>,
  heroSubtitle: <>Whether you want to buy or rent, tell us what you are looking for. Our team personally finds the ideal agency to help you &mdash; then connects you directly.</>,
  heroSubtitle2: 'You choose how: WhatsApp, email, or phone call. Your preference, your pace.',
  ctaLabel: 'Start Your Search',
  formId: 'buyer-form',
  processStepsBg: 'bg-white',
  processVariant: 'buyer',
  benefitsBg: 'bg-beige/50',
  benefitsCardBg: 'bg-white',
  benefitsTitle: 'Why Use Calvia Real Estate?',
  benefitsSubtitle: 'We are not an agency. We are the bridge that gets you to the right one, fast.',
  benefits: [
    {
      icon: Search,
      title: 'Curated Agency Matching',
      description: 'We don\'t just list agencies. We handpick the one best suited to your specific requirements \u2014 villa specialist, investment advisor, or relocation expert.',
    },
    {
      icon: Clock,
      title: 'Save Weeks of Searching',
      description: 'Skip the research, cold calls, and dead ends. Share your criteria once and we do the legwork so you can focus on finding your dream property.',
    },
    {
      icon: Shield,
      title: 'Vetted Local Experts Only',
      description: 'Every agency in our network is established in Calvi\u00E0 with a proven track record. You get quality introductions, not random listings.',
    },
  ],
  formTitle: 'Share Your Criteria',
  formSubtitle: 'Takes under 2 minutes. The more detail you provide, the better we can match you.',
  faqTitle: 'Frequently Asked Questions',
  faqSubtitle: 'Everything you need to know about buying or renting property in Calvia, Mallorca.',
  faqs: buyerFaqs,
  faqSchemaId: 'buyer',
  blogSlugs: ['lex-beckham-ruling-guide', 'bendinat-real-estate-guide', 'villas-calvia-mallorca-guide'],
  pageMeta: {
    title: 'Buy or Rent Property in Calvia, Mallorca | Property Matching | Calvia Real Estate',
    description: 'Looking to buy or rent property in Calvia, Mallorca? Share your criteria and get matched to the best local estate agencies instantly. Villas, apartments, fincas in Bendinat, Santa Ponsa, Son Vida and more.',
    keywords: 'buy property Calvia, rent property Calvia, Mallorca real estate, villas Calvia, apartments Santa Ponsa, Bendinat property, Son Vida real estate, rent house Mallorca',
  },
};

export default function BuyerPage({ onComplete, navigate }: BuyerPageProps) {
  return (
    <LeadPageTemplate
      config={CONFIG}
      navigate={navigate}
      formComponent={<BuyerSection onComplete={onComplete} />}
    />
  );
}
