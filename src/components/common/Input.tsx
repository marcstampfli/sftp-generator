import React from 'react';
import { Tooltip } from 'react-tooltip';

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  tooltip?: string;
  className?: string;
  darkMode?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  tooltip,
  className,
  darkMode = false,
}) => {
  const tooltipId = `tooltip-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="relative">
      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        {label}
        {tooltip && (
          <span
            className="ml-1 text-gray-500 hover:text-gray-700 cursor-help"
            data-tooltip-id={tooltipId}
            data-tooltip-content={tooltip}
          >
            ℹ️
          </span>
        )}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${className}`}
      />
      {tooltip && (
        <Tooltip
          id={tooltipId}
          className={darkMode ? '!bg-gray-800 !text-white' : '!bg-white !text-gray-900'}
          style={{ zIndex: 1000 }}
        />
      )}
    </div>
  );
};
