import { type ReactNode } from 'react';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import ProcessSteps from '../components/ProcessSteps';
import FAQSection, { type FAQItem } from '../components/FAQSection';
import RecommendedReading from '../components/RecommendedReading';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePageMeta } from '../hooks/usePageMeta';
import { blogPosts } from '../data/blogPosts';
import type { Route } from '../hooks/useRouter';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface LeadPageConfig {
  heroIcon: LucideIcon;
  heroBg: string;
  heroTitle: ReactNode;
  heroSubtitle: ReactNode;
  heroSubtitle2: string;
  ctaLabel: string;
  formId: string;
  processStepsBg: string;
  processVariant: 'buyer' | 'seller';
  benefitsBg: string;
  benefitsCardBg: string;
  benefitsTitle: string;
  benefitsSubtitle: string;
  benefits: Benefit[];
  formTitle: string;
  formSubtitle: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: FAQItem[];
  faqSchemaId: string;
  blogSlugs: string[];
  pageMeta: { title: string; description: string; keywords: string };
}

interface LeadPageTemplateProps {
  config: LeadPageConfig;
  navigate: (to: Route) => void;
  formComponent: ReactNode;
}

export default function LeadPageTemplate({ config, navigate, formComponent }: LeadPageTemplateProps) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollReveal(0.1);

  usePageMeta(config.pageMeta);

  const recommendedPosts = blogPosts.filter((p) => config.blogSlugs.includes(p.slug));

  return (
    <>
      <section className={`pt-28 pb-16 md:pt-36 md:pb-20 ${config.heroBg}`}>
        <div
          ref={heroRef}
          className={`max-w-4xl mx-auto px-6 text-center transition-all duration-700 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-blue/10 mb-6">
            <config.heroIcon className="w-8 h-8 text-dark-blue" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-5 leading-tight">
            {config.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-grey-dark max-w-2xl mx-auto leading-relaxed mb-3">
            {config.heroSubtitle}
          </p>
          <p className="text-base text-grey max-w-xl mx-auto">
            {config.heroSubtitle2}
          </p>
          <div className="mt-8">
            <button
              onClick={() => document.getElementById(config.formId)?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-dark-blue text-white font-semibold rounded-lg text-lg transition-all duration-300 hover:bg-dark-blue-light hover:shadow-[0_0_30px_rgba(0,31,63,0.3)] hover:-translate-y-0.5"
            >
              {config.ctaLabel}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className={`py-16 md:py-24 ${config.processStepsBg}`}>
        <div className="max-w-5xl mx-auto px-6">
          <ProcessSteps variant={config.processVariant} />
        </div>
      </section>

      <section className={`py-16 md:py-20 ${config.benefitsBg}`}>
        <div
          ref={benefitsRef}
          className={`max-w-5xl mx-auto px-6 transition-all duration-700 ${
            benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-black mb-3">
              {config.benefitsTitle}
            </h3>
            <p className="text-grey max-w-lg mx-auto">
              {config.benefitsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {config.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className={`${config.benefitsCardBg} rounded-xl p-7 border border-beige-dark/40 hover:shadow-lg hover:shadow-black/5 hover:border-dark-blue/20 transition-all duration-300`}
              >
                <benefit.icon className="w-7 h-7 text-dark-blue mb-4" />
                <h4 className="font-bold text-black text-lg mb-2">{benefit.title}</h4>
                <p className="text-grey text-[15px] leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id={config.formId} className="py-16 md:py-24 bg-beige">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-black mb-3">
              {config.formTitle}
            </h3>
            <p className="text-grey max-w-lg mx-auto">
              {config.formSubtitle}
            </p>
          </div>
          {formComponent}
        </div>
      </section>

      <FAQSection
        title={config.faqTitle}
        subtitle={config.faqSubtitle}
        faqs={config.faqs}
        schemaId={config.faqSchemaId}
      />

      <RecommendedReading posts={recommendedPosts} navigate={navigate} />

      <Footer navigate={navigate} />
    </>
  );
}
