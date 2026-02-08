interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function ProgressBar({ currentStep, totalSteps, labels }: ProgressBarProps) {
  const percentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-3">
        {labels.map((label, i) => (
          <div key={label} className="flex flex-col items-center flex-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
                i <= currentStep
                  ? 'bg-dark-blue text-white shadow-lg shadow-dark-blue/20'
                  : 'bg-beige-dark text-grey-light'
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-xs mt-1.5 font-medium transition-colors duration-300 hidden sm:block ${
                i <= currentStep ? 'text-dark-blue' : 'text-grey-light'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="h-1.5 bg-beige-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-dark-blue rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
