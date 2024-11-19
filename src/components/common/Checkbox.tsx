import React from 'react';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  darkMode?: boolean;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  darkMode = false,
  disabled = false,
}) => {
  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className={`
            w-4 h-4 
            border-2 rounded
            focus:ring-2 focus:ring-offset-2
            transition-colors duration-200
            appearance-none
            cursor-pointer
            ${
              checked
                ? 'bg-green-500 border-green-500'
                : `border-gray-300 ${darkMode ? 'bg-gray-700' : 'bg-white'}`
            }
            ${
              disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:border-green-500'
            }
            ${darkMode ? 'focus:ring-green-400' : 'focus:ring-green-500'}
          `}
        />
        {checked && (
          <svg
            className="absolute w-3 h-3 text-white pointer-events-none"
            style={{ left: '2px', top: '2px' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <label
        htmlFor={id}
        className={`ml-2 text-sm font-medium ${
          darkMode ? 'text-gray-200' : 'text-gray-700'
        } ${disabled ? 'opacity-50' : ''}`}
      >
        {label}
      </label>
    </div>
  );
};
