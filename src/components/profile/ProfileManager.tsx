import React from "react";
import { Profile, SFTPFormData } from "../../types/forms";

interface ProfileManagerProps {
  darkMode: boolean;
  profiles: { [key: string]: Profile };
  onProfileSelect: (profile: SFTPFormData) => void;
  onDeleteProfile: (profileName: string) => void;
  isOpen: boolean;
}

export const ProfileManager: React.FC<ProfileManagerProps> = ({
  darkMode,
  profiles,
  onProfileSelect,
  onDeleteProfile,
  isOpen,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="p-4">
        <h2
          className={`text-lg font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Saved Profiles
        </h2>

        <div className="space-y-2">
          {Object.entries(profiles).map(([name, profile]) => (
            <div
              key={name}
              className={`p-2 rounded cursor-pointer ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
              onClick={() => onProfileSelect(profile)}
            >
              <div
                className={`text-sm ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {name}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteProfile(name);
                }}
                className={`text-xs ${
                  darkMode
                    ? "text-red-400 hover:text-red-300"
                    : "text-red-600 hover:text-red-500"
                }`}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
