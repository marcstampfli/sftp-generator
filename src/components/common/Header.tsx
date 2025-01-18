import React from "react";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleProfiles: () => void;
  showProfiles: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleDarkMode,
  toggleProfiles,
  showProfiles,
}) => {
  return (
    <header
      className={`flex justify-between items-center mb-8 ${darkMode ? "text-white" : "text-gray-800"}`}
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleProfiles}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            showProfiles
              ? darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
              : darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
          }`}
          title="Toggle Profiles"
        >
          <FaUserCircle className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">SFTP Config Generator</h1>
      </div>
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-lg ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-100 hover:bg-gray-200"
        } transition-colors duration-200`}
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {darkMode ? (
          <FaSun className="w-5 h-5" />
        ) : (
          <FaMoon className="w-5 h-5" />
        )}
      </button>
    </header>
  );
};
