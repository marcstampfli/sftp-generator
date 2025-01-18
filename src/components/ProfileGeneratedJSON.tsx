import React from "react";
import { FiDownload, FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import { SFTPFormData } from "../types/forms";

export const ProfileGeneratedJSON: React.FC<{
  config: SFTPFormData;
  darkMode: boolean;
}> = ({ config, darkMode }) => {
  const handleDownload = () => {
    const jsonString = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.name || "sftp-config"}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("JSON file downloaded successfully");
  };

  const handleCopyToClipboard = async () => {
    const jsonString = JSON.stringify(config, null, 2);
    try {
      await navigator.clipboard.writeText(jsonString);
      toast.success("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div
      className={`w-full mt-8 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-2xl rounded-xl p-10 transition-colors duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2
          className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
        >
          Generated JSON
        </h2>
        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } transition-colors duration-200`}
            data-tooltip-id="tooltip"
            data-tooltip-content="Download JSON"
          >
            <FiDownload className="w-5 h-5" />
            <span>Download</span>
          </button>
          <button
            onClick={handleCopyToClipboard}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            } transition-colors duration-200`}
            data-tooltip-id="tooltip"
            data-tooltip-content="Copy to clipboard"
          >
            <FiCopy className="w-5 h-5" />
            <span>Copy</span>
          </button>
        </div>
      </div>
      <pre
        className={`p-4 rounded-lg overflow-x-auto ${
          darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-800"
        }`}
      >
        <code>{JSON.stringify(config, null, 2)}</code>
      </pre>
    </div>
  );
};
