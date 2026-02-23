import { useState } from 'react';
import FormWizard from './FormWizard';
import { TextInput, SelectInput, RangeSlider, CheckboxGroup, RadioGroup, Textarea, ConsentCheckbox, NumberInput } from './FormFields';
import { VILLAGES, PROPERTY_TYPES, SELLER_FEATURES, SELLER_TIMELINES, LISTING_PURPOSES, RENTAL_TIMELINES } from '../utils/constants';
import { validateSellerStep1, validateSellerStep2, validateSellerStep3 } from '../utils/validation';
import { supabase } from '../lib/supabase';
import { submitSellerStepToHubSpot } from '../lib/hubspot';

interface SellerSectionProps {
  onComplete: (refCode: string) => void;
}

const STEP_LABELS = ['Basics', 'Details', 'Goals'];

function formatPrice(value: number): string {
  if (value >= 10000000) return '\u20AC10M+';
  if (value >= 1000000) return `\u20AC${(value / 1000000).toFixed(1)}M`;
  return `\u20AC${(value / 1000).toFixed(0)}k`;
}

function formatMonthlyRent(value: number): string {
  return `\u20AC${value.toLocaleString()}/mo`;
}

function formatNightlyRate(value: number): string {
  return `\u20AC${value}/night`;
}

export default function SellerSection({ onComplete }: SellerSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');
  const [address, setAddress] = useState('');
  const [listingPurpose, setListingPurpose] = useState('');
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [size, setSize] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [askingPrice, setAskingPrice] = useState(1500000);
  const [monthlyRent, setMonthlyRent] = useState(3000);
  const [nightlyRate, setNightlyRate] = useState(200);
  const [hasEtvLicence, setHasEtvLicence] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);

  const isSale = listingPurpose === 'Sale';
  const isLongTerm = listingPurpose === 'Long-term Rental';
  const isShortTerm = listingPurpose === 'Short-term Rental';
  const isRental = isLongTerm || isShortTerm;

  const getAllData = () => ({
    name, email, phone, village, address, listingPurpose, propertyType,
    size, features, askingPrice, monthlyRent, nightlyRate, hasEtvLicence,
    timeline, notes,
  });

  const validateStep = (step: number) => {
    if (step === 0) return validateSellerStep1({ name, email, phone, village, listingPurpose });
    if (step === 1) return validateSellerStep2({ propertyType, askingPrice, monthlyRent, nightlyRate, listingPurpose });
    return validateSellerStep3({ timeline, consent });
  };

  const handleStepChange = (completedStep: number) => {
    submitSellerStepToHubSpot(completedStep, getAllData()).catch(() => {});
  };

  const handleSubmit = async () => {
    if (!supabase) return null;

    const details: Record<string, unknown> = {
      name, email, phone, village, address, listingPurpose, propertyType,
      size: size ? Number(size) : null,
      features, timeline, notes,
    };
    if (isSale) details.askingPrice = askingPrice;
    else if (isLongTerm) details.monthlyRent = monthlyRent;
    else if (isShortTerm) {
      details.nightlyRate = nightlyRate;
      details.hasEtvLicence = hasEtvLicence.length > 0;
    }

    try {
      const { data, error } = await supabase
        .from('leads')
        .insert({ type: 'seller', details })
        .select('ref_code')
        .maybeSingle();

      if (error) {
        console.error('Supabase insert error:', error.message, error.code, error.details);
        return null;
      }

      submitSellerStepToHubSpot(2, getAllData()).catch(() => {});

      return data?.ref_code || '';
    } catch (err) {
      console.error('Form submission error:', err);
      return null;
    }
  };

  const timelineOptions = isRental ? RENTAL_TIMELINES : SELLER_TIMELINES;
  const timelineLabel = isRental ? 'Availability Timeline' : 'Sale Timeline';

  return (
    <FormWizard
      stepLabels={STEP_LABELS}
      validateStep={validateStep}
      onSubmit={handleSubmit}
      onComplete={onComplete}
      onStepChange={handleStepChange}
      cardClassName="border border-beige-dark/50"
    >
      {(step, errors) => (
        <>
          {step === 0 && (
            <div className="animate-fade-in">
              <TextInput label="Full Name" value={name} onChange={setName} placeholder="Your full name" error={errors.name} required />
              <TextInput label="Email" value={email} onChange={setEmail} type="email" placeholder="you@email.com" error={errors.email} required />
              <TextInput label="Phone" value={phone} onChange={setPhone} type="tel" placeholder="+34 600 000 000" error={errors.phone} required />
              <SelectInput label="Property Village" value={village} onChange={setVillage} options={VILLAGES} placeholder="Select a village..." error={errors.village} required />
              <TextInput label="Property Address" value={address} onChange={setAddress} placeholder="Street name and number (optional)" />
              <RadioGroup
                label="What would you like to do?"
                options={LISTING_PURPOSES}
                value={listingPurpose}
                onChange={(val) => { setListingPurpose(val); setTimeline(''); }}
                error={errors.listingPurpose}
                required
              />
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <CheckboxGroup label="Property Type" options={PROPERTY_TYPES} selected={propertyType} onChange={setPropertyType} error={errors.propertyType} required />
              <NumberInput label="Property Size" value={size} onChange={setSize} placeholder="E.g., 250" suffix="m&#178;" />
              <CheckboxGroup label="Property Features" options={SELLER_FEATURES} selected={features} onChange={setFeatures} />

              {isSale && (
                <RangeSlider
                  label="Asking Price"
                  value={askingPrice}
                  onChange={setAskingPrice}
                  min={300000}
                  max={10000000}
                  step={50000}
                  formatValue={formatPrice}
                  error={errors.askingPrice}
                  required
                />
              )}

              {isLongTerm && (
                <RangeSlider
                  label="Monthly Rent"
                  value={monthlyRent}
                  onChange={setMonthlyRent}
                  min={500}
                  max={15000}
                  step={100}
                  formatValue={formatMonthlyRent}
                  error={errors.monthlyRent}
                  required
                />
              )}

              {isShortTerm && (
                <>
                  <RangeSlider
                    label="Nightly Rate"
                    value={nightlyRate}
                    onChange={setNightlyRate}
                    min={50}
                    max={1500}
                    step={10}
                    formatValue={formatNightlyRate}
                    error={errors.nightlyRate}
                    required
                  />
                  <CheckboxGroup
                    label="ETV Licence (Tourist Rental Licence)"
                    options={['I have a valid ETV licence'] as unknown as readonly string[]}
                    selected={hasEtvLicence}
                    onChange={setHasEtvLicence}
                  />
                </>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <RadioGroup label={timelineLabel} options={timelineOptions} value={timeline} onChange={setTimeline} error={errors.timeline} required />
              <Textarea
                label="Special Conditions"
                value={notes}
                onChange={setNotes}
                placeholder={isRental
                  ? 'E.g., furnished, minimum rental period, pet-friendly, parking included...'
                  : 'E.g., quick sale needed, discreet listing preferred, tenant in place...'
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
