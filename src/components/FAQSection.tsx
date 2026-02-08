import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  subtitle?: string;
  faqs: FAQItem[];
  schemaId: string;
}

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-beige-dark rounded-xl overflow-hidden transition-all duration-300 hover:border-dark-blue/20">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-warm-grey transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-grey-dark text-[15px] leading-snug pr-2">{item.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-dark-blue flex-shrink-0 mt-0.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6 pt-1 text-sm text-grey leading-relaxed whitespace-pre-line bg-warm-grey/50">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQSection({ title, subtitle, faqs, schemaId }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = `faq-schema-${schemaId}`;
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });

    const existing = document.getElementById(`faq-schema-${schemaId}`);
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(`faq-schema-${schemaId}`);
      if (el) el.remove();
    };
  }, [faqs, schemaId]);

  return (
    <section className="py-20 bg-warm-grey">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-dark-blue mb-3">{title}</h2>
          {subtitle && (
            <p className="text-grey text-base max-w-xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQAccordion
              key={index}
              item={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
