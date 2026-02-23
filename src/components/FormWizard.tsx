import { useState, type ReactNode } from 'react';
import { ArrowRight, ArrowLeft, Send } from 'lucide-react';
import ProgressBar from './ProgressBar';
import type { ValidationError } from '../utils/validation';

interface FormWizardProps {
  stepLabels: string[];
  validateStep: (step: number) => ValidationError[];
  onSubmit: () => Promise<string | null>;
  onComplete: (refCode: string) => void;
  onStepChange?: (completedStep: number) => void;
  submitLabel?: string;
  cardClassName?: string;
  children: (step: number, errors: Record<string, string>) => ReactNode;
}

function errorsToMap(errs: ValidationError[]): Record<string, string> {
  const map: Record<string, string> = {};
  errs.forEach((e) => { map[e.field] = e.message; });
  return map;
}

export default function FormWizard({
  stepLabels,
  validateStep,
  onSubmit,
  onComplete,
  onStepChange,
  submitLabel = 'Get Matched',
  cardClassName = '',
  children,
}: FormWizardProps) {
  const totalSteps = stepLabels.length;
  const lastStep = totalSteps - 1;
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleNext = () => {
    const validationErrors = validateStep(step);
    if (validationErrors.length > 0) {
      setErrors(errorsToMap(validationErrors));
      return;
    }
    setErrors({});
    onStepChange?.(step);
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    const validationErrors = validateStep(lastStep);
    if (validationErrors.length > 0) {
      setErrors(errorsToMap(validationErrors));
      return;
    }
    setErrors({});
    setSubmitting(true);

    const refCode = await onSubmit();
    setSubmitting(false);

    if (refCode === null) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
      return;
    }

    onComplete(refCode);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`bg-white rounded-2xl shadow-xl shadow-black/5 p-8 md:p-10 ${cardClassName}`}>
        <ProgressBar currentStep={step} totalSteps={totalSteps} labels={stepLabels} />

        {children(step, errors)}

        {errors.submit && (
          <p className="text-red-500 text-sm text-center mb-4">{errors.submit}</p>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-beige">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => { setStep((s) => s - 1); setErrors({}); }}
              className="flex items-center gap-2 px-5 py-2.5 text-grey-dark font-medium rounded-lg transition-all hover:bg-beige"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < lastStep ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-dark-blue text-white font-semibold rounded-lg transition-all duration-300 hover:bg-dark-blue-light hover:shadow-[0_0_20px_rgba(0,31,63,0.25)] hover:-translate-y-0.5"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-8 py-3 bg-dark-blue text-white font-semibold rounded-lg transition-all duration-300 hover:bg-dark-blue-light hover:shadow-[0_0_20px_rgba(0,31,63,0.25)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : submitLabel}
              {!submitting && <Send className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
