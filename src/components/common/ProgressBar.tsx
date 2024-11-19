import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  darkMode: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
  darkMode,
}) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="relative">
      <div className="flex justify-between mb-2">
        {stepTitles.map((title, index) => (
          <div
            key={index}
            className={`text-sm font-medium ${
              index + 1 <= currentStep
                ? darkMode
                  ? 'text-blue-400'
                  : 'text-blue-600'
                : darkMode
                ? 'text-gray-500'
                : 'text-gray-400'
            }`}
          >
            {title}
          </div>
        ))}
      </div>
      <div
        className={`h-2 rounded-full ${
          darkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}
      >
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            darkMode ? 'bg-blue-400' : 'bg-blue-600'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
    </div>
  );
};
