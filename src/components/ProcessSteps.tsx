import { ClipboardList, Users, MessageCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ProcessStepsProps {
  variant: 'buyer' | 'seller';
}

const BUYER_STEPS = [
  {
    icon: ClipboardList,
    title: 'Share Your Criteria',
    description: 'Fill in a short form with your preferences \u2014 whether buying or renting, your budget, location, property type, and must-have features. It takes under 2 minutes.',
  },
  {
    icon: Users,
    title: 'We Find Your Match',
    description: 'Our team personally reviews your needs and identifies the ideal agency from our vetted network of Calvi\u00E0 specialists. No algorithms \u2014 real people who know the market.',
  },
  {
    icon: MessageCircle,
    title: 'Get Connected Instantly',
    description: 'We introduce you to your matched agent via WhatsApp, email, or phone \u2014 whichever you prefer. They take it from there with tailored property options.',
  },
];

const SELLER_STEPS = [
  {
    icon: ClipboardList,
    title: 'Describe Your Property',
    description: 'Tell us about your property and whether you want to sell or rent it \u2014 location, type, size, and what makes it special. A quick form that captures everything an agency needs.',
  },
  {
    icon: Users,
    title: 'We Select the Right Agency',
    description: 'Our team matches your property to agencies with proven expertise in your area and price range. We prioritise discretion, speed, and maximising your value.',
  },
  {
    icon: MessageCircle,
    title: 'Get Connected Instantly',
    description: 'We introduce you to your matched agent via WhatsApp, email, or phone \u2014 whichever you prefer. They handle the rest: valuation, marketing, and managing your listing.',
  },
];

export default function ProcessSteps({ variant }: ProcessStepsProps) {
  const { ref, isVisible } = useScrollReveal(0.1);
  const steps = variant === 'buyer' ? BUYER_STEPS : SELLER_STEPS;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="text-center mb-10">
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-black mb-3">
          How It Works
        </h3>
        <p className="text-grey max-w-lg mx-auto">
          Three simple steps to your perfect {variant === 'buyer' ? 'property' : 'listing'}.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {steps.map((step, i) => (
          <div key={step.title} className="relative text-center group">
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px border-t-2 border-dashed border-beige-dark" />
            )}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-dark-blue text-white font-bold text-lg mb-4 relative z-10 group-hover:shadow-lg group-hover:shadow-dark-blue/20 transition-shadow">
              {i + 1}
            </div>
            <step.icon className="w-6 h-6 text-dark-blue mx-auto mb-3" />
            <h4 className="font-bold text-black text-lg mb-2">{step.title}</h4>
            <p className="text-grey text-[15px] leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
