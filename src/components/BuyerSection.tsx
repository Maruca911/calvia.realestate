import { useState } from 'react';
import FormWizard from './FormWizard';
import { TextInput, SelectInput, RangeSlider, CheckboxGroup, RadioGroup, Textarea, ConsentCheckbox } from './FormFields';
import { VILLAGES, PROPERTY_TYPES, BUYER_FEATURES, TIMELINES, BUYER_INTENTS } from '../utils/constants';
import { validateBuyerStep1, validateBuyerStep2, validateBuyerStep3 } from '../utils/validation';
import { supabase } from '../lib/supabase';
import { submitBuyerStepToHubSpot } from '../lib/hubspot';

interface BuyerSectionProps {
  onComplete: (refCode: string) => void;
}

const STEP_LABELS = ['Basics', 'Desires', 'Preferences'];

function formatBudget(value: number): string {
  if (value >= 5000000) return '\u20AC5M+';
  if (value >= 1000000) return `\u20AC${(value / 1000000).toFixed(1)}M`;
  return `\u20AC${(value / 1000).toFixed(0)}k`;
}

function formatMonthlyBudget(value: number): string {
  return `\u20AC${value.toLocaleString()}/mo`;
}

export default function BuyerSection({ onComplete }: BuyerSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');
  const [intent, setIntent] = useState('');
  const [budget, setBudget] = useState(1000000);
  const [monthlyBudget, setMonthlyBudget] = useState(3000);
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);

  const isBuy = intent === 'Buy';
  const isRent = intent === 'Long-term Rental' || intent === 'Short-term Rental';

  const getAllData = () => ({
    name, email, phone, village, intent, propertyType, features,
    timeline, notes, budget, monthlyBudget,
  });

  const validateStep = (step: number) => {
    if (step === 0) return validateBuyerStep1({ name, email, phone, village, intent });
    if (step === 1) return validateBuyerStep2({ propertyType, timeline, intent, budget, monthlyBudget });
    return validateBuyerStep3({ consent });
  };

  const handleStepChange = (completedStep: number) => {
    submitBuyerStepToHubSpot(completedStep, getAllData()).catch(() => {});
  };

  const handleSubmit = async () => {
    if (!supabase) return null;

    const details: Record<string, unknown> = {
      name, email, phone, village, intent, propertyType, features, timeline, notes,
    };
    if (isBuy) details.budget = budget;
    else details.monthlyBudget = monthlyBudget;

    try {
      const { data, error } = await supabase
        .from('leads')
        .insert({ type: 'buyer', details })
        .select('ref_code')
        .maybeSingle();

      if (error) {
        console.error('Supabase insert error:', error.message, error.code, error.details);
        return null;
      }

      submitBuyerStepToHubSpot(2, getAllData()).catch(() => {});

      return data?.ref_code || '';
    } catch (err) {
      console.error('Form submission error:', err);
      return null;
    }
  };

  return (
    <FormWizard
      stepLabels={STEP_LABELS}
      validateStep={validateStep}
      onSubmit={handleSubmit}
      onComplete={onComplete}
      onStepChange={handleStepChange}
    >
      {(step, errors) => (
        <>
          {step === 0 && (
            <div className="animate-fade-in">
              <TextInput label="Full Name" value={name} onChange={setName} placeholder="Your full name" error={errors.name} required />
              <TextInput label="Email" value={email} onChange={setEmail} type="email" placeholder="you@email.com" error={errors.email} required />
              <TextInput label="Phone" value={phone} onChange={setPhone} type="tel" placeholder="+34 600 000 000" error={errors.phone} required />
              <SelectInput label="Preferred Village" value={village} onChange={setVillage} options={VILLAGES} placeholder="Select a village..." error={errors.village} required />
              <RadioGroup
                label="Are you looking to buy or rent?"
                options={BUYER_INTENTS}
                value={intent}
                onChange={(val) => { setIntent(val); }}
                error={errors.intent}
                required
              />
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <CheckboxGroup label="Property Type" options={PROPERTY_TYPES} selected={propertyType} onChange={setPropertyType} error={errors.propertyType} required />
              <CheckboxGroup label="Desired Features" options={BUYER_FEATURES} selected={features} onChange={setFeatures} />

              {isBuy && (
                <RangeSlider
                  label="Budget Range"
                  value={budget}
                  onChange={setBudget}
                  min={300000}
                  max={5000000}
                  step={50000}
                  formatValue={formatBudget}
                  error={errors.budget}
                  required
                />
              )}

              {isRent && (
                <RangeSlider
                  label="Monthly Budget"
                  value={monthlyBudget}
                  onChange={setMonthlyBudget}
                  min={500}
                  max={15000}
                  step={100}
                  formatValue={formatMonthlyBudget}
                  error={errors.monthlyBudget}
                  required
                />
              )}

              <RadioGroup label="Timeline" options={TIMELINES} value={timeline} onChange={setTimeline} error={errors.timeline} required />
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <Textarea
                label="Specific Requirements"
                value={notes}
                onChange={setNotes}
                placeholder={isRent
                  ? 'E.g., furnished, pet-friendly, close to international schools, minimum 2 bedrooms...'
                  : 'E.g., eco-friendly, close to international schools, minimum 4 bedrooms...'
                }
              />
              <ConsentCheckbox checked={consent} onChange={setConsent} error={errors.consent} />
            </div>
          )}
        </>
      )}
    </FormWizard>
  );
}
