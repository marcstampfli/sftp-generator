import React from "react";
import { StepProps } from "../../types/forms";

export const GeneratedJSON: React.FC<StepProps> = ({ formData, darkMode }) => {
  return (
    <div className="space-y-6">
      <h2
        className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
      >
        Generated Configuration
      </h2>

      <div
        className={`p-4 rounded ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
      >
        <pre
          className={`text-sm ${darkMode ? "text-gray-200" : "text-gray-700"}`}
        >
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
};
