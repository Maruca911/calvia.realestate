import { ChevronDown } from 'lucide-react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function TextInput({ label, value, onChange, type = 'text', placeholder, error, required }: TextInputProps) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-grey-dark mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 bg-white font-montserrat text-grey-dark placeholder:text-grey-light focus:outline-none focus:border-dark-blue focus:shadow-md ${
          error ? 'border-red-400' : 'border-beige-dark'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
  );
}

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function SelectInput({ label, value, onChange, options, placeholder = 'Select...', error, required }: SelectInputProps) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-grey-dark mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 bg-white font-montserrat text-grey-dark appearance-none focus:outline-none focus:border-dark-blue focus:shadow-md ${
            error ? 'border-red-400' : 'border-beige-dark'
          } ${!value ? 'text-grey-light' : ''}`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-grey-light pointer-events-none" />
      </div>
      {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
  );
}

interface RangeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  formatValue: (value: number) => string;
  error?: string;
  required?: boolean;
}

export function RangeSlider({ label, value, onChange, min, max, step, formatValue, error, required }: RangeSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-grey-dark mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="flex items-center justify-between mb-2">
        <span className="text-dark-blue font-bold text-lg">{formatValue(value)}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="range-slider w-full"
          style={{ '--range-progress': `${percentage}%` } as React.CSSProperties}
        />
        <div className="flex justify-between text-xs text-grey-light mt-1">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
  );
}

interface CheckboxGroupProps {
  label: string;
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
  required?: boolean;
}

export function CheckboxGroup({ label, options, selected, onChange, error, required }: CheckboxGroupProps) {
  const toggle = (option: string) => {
    onChange(
      selected.includes(option)
        ? selected.filter((s) => s !== option)
        : [...selected, option]
    );
  };

  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-grey-dark mb-2">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
              selected.includes(opt)
                ? 'bg-dark-blue text-white border-dark-blue shadow-md'
                : 'bg-white text-grey border-beige-dark hover:border-dark-blue/30'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
  );
}

interface RadioGroupProps {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export function RadioGroup({ label, options, value, onChange, error, required }: RadioGroupProps) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-grey-dark mb-2">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((opt) => (
          <div
            key={opt}
            onClick={() => onChange(opt)}
            role="radio"
            aria-checked={value === opt}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') onChange(opt); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              value === opt
                ? 'border-dark-blue bg-dark-blue/5'
                : 'border-beige-dark bg-white hover:border-dark-blue/30'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              value === opt ? 'border-dark-blue' : 'border-grey-light'
            }`}>
              {value === opt && <div className="w-2.5 h-2.5 rounded-full bg-dark-blue" />}
            </div>
            <span className="text-sm font-medium text-grey-dark">{opt}</span>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
  );
}

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Textarea({ label, value, onChange, placeholder }: TextareaProps) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-grey-dark mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full px-4 py-3 rounded-lg border-2 border-beige-dark transition-all duration-200 bg-white font-montserrat text-grey-dark placeholder:text-grey-light focus:outline-none focus:border-dark-blue focus:shadow-md resize-none"
      />
    </div>
  );
}

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export function ConsentCheckbox({ checked, onChange, error }: ConsentCheckboxProps) {
  return (
    <div className="mb-5">
      <label className="flex items-start gap-3 cursor-pointer group">
        <div
          className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
            checked ? 'bg-dark-blue border-dark-blue' : 'border-grey-light group-hover:border-dark-blue/50'
          }`}
          onClick={() => onChange(!checked)}
        >
          {checked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className="text-sm text-grey leading-relaxed" onClick={() => onChange(!checked)}>
          I agree to my data being shared with partner agencies to match my request, in accordance with GDPR regulations.
        </span>
      </label>
      {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
  );
}

interface NumberInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
}

export function NumberInput({ label, value, onChange, placeholder, suffix }: NumberInputProps) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-grey-dark mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg border-2 border-beige-dark transition-all duration-200 bg-white font-montserrat text-grey-dark placeholder:text-grey-light focus:outline-none focus:border-dark-blue focus:shadow-md"
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-grey-light text-sm">{suffix}</span>
        )}
      </div>
    </div>
  );
}
