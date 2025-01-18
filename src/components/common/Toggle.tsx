import React from "react";
import { Tooltip } from "react-tooltip";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  tooltip?: string;
  className?: string;
  darkMode?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  tooltip,
  className = "",
  darkMode = false,
}) => {
  const tooltipId = `tooltip-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`flex items-center ${className}`}>
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div
            className={`w-10 h-6 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
              checked ? "bg-green-500" : "bg-gray-300"
            }`}
          />
          <div
            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
              checked ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </div>
        <div className="ml-3 flex items-center">
          <span
            className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}
          >
            {label}
          </span>
          {tooltip && (
            <span
              className="ml-1 text-gray-500 hover:text-gray-700 cursor-help"
              data-tooltip-id={tooltipId}
              data-tooltip-content={tooltip}
            >
              ℹ️
            </span>
          )}
        </div>
      </label>
      {tooltip && (
        <Tooltip
          id={tooltipId}
          className={
            darkMode ? "!bg-gray-800 !text-white" : "!bg-white !text-gray-900"
          }
          style={{ zIndex: 1000 }}
        />
      )}
    </div>
  );
};
