import { Building2, TrendingUp, Clock, Eye } from 'lucide-react';
import SellerSection from '../components/SellerSection';
import LeadPageTemplate, { type LeadPageConfig } from './LeadPageTemplate';
import { sellerFaqs } from '../data/sellerFaqs';
import type { Route } from '../hooks/useRouter';

interface SellerPageProps {
  onComplete: (refCode: string) => void;
  navigate: (to: Route) => void;
}

const CONFIG: LeadPageConfig = {
  heroIcon: Building2,
  heroBg: 'bg-white',
  heroTitle: <>Sell or Rent Your Calvi&agrave; Property with Confidence</>,
  heroSubtitle: <>Describe your property once. Our team identifies the best agency to handle your sale or rental &mdash; then connects you directly via your preferred channel.</>,
  heroSubtitle2: 'WhatsApp, email, or phone call \u2014 you choose how to connect with your matched agent.',
  ctaLabel: 'List Your Property',
  formId: 'seller-form',
  processStepsBg: 'bg-beige',
  processVariant: 'seller',
  benefitsBg: 'bg-white',
  benefitsCardBg: 'bg-beige/30',
  benefitsTitle: 'Why List Through Calvia Real Estate?',
  benefitsSubtitle: 'We are not an agency. We are the shortcut to the right one for your property.',
  benefits: [
    {
      icon: TrendingUp,
      title: 'Maximise Your Returns',
      description: 'We connect you with agencies that specialise in your property type and price bracket \u2014 ensuring expert pricing, marketing, and negotiation from day one.',
    },
    {
      icon: Clock,
      title: 'Speed Without Compromise',
      description: 'No weeks of interviewing agents. Describe your property once, and we introduce you to the right one who can start immediately.',
    },
    {
      icon: Eye,
      title: 'Discretion Guaranteed',
      description: 'Need a quiet sale or discreet rental? Our network includes agencies experienced in off-market and confidential transactions. Your privacy is our priority.',
    },
  ],
  formTitle: 'Describe Your Property',
  formSubtitle: 'Takes under 2 minutes. The more detail you provide, the better your agency match.',
  faqTitle: 'Frequently Asked Questions for Home Owners',
  faqSubtitle: 'Everything you need to know about selling or renting property in Calvia, Mallorca.',
  faqs: sellerFaqs,
  faqSchemaId: 'seller',
  blogSlugs: ['short-term-renting-regulations-guide', 'new-developments-calvia-guide', 'agencies-notaries-calvia-guide'],
  pageMeta: {
    title: 'Sell or Rent Property in Calvia, Mallorca | Home Owner Matching | Calvia Real Estate',
    description: 'Selling or renting property in Calvia, Mallorca? Get matched to the best local estate agencies for your property type and price range. Villas, apartments, fincas -- expert agents who know the market.',
    keywords: 'sell property Calvia, rent property Calvia, Mallorca property owners, sell villa Mallorca, estate agents Calvia, rent apartment Santa Ponsa, Bendinat property, real estate Calvia',
  },
};

export default function SellerPage({ onComplete, navigate }: SellerPageProps) {
  return (
    <LeadPageTemplate
      config={CONFIG}
      navigate={navigate}
      formComponent={<SellerSection onComplete={onComplete} />}
    />
  );
}
