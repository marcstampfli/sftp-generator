import React, { useState } from 'react';
import { FormData } from '../../types/forms';
import { FaTrash, FaFolder } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface ProfileManagerProps {
  darkMode: boolean;
  onProfileSelect: (profile: FormData) => void;
  onDeleteProfile: (profileName: string) => void;
  isOpen: boolean;
  profiles: { [key: string]: FormData };
}

export const ProfileManager: React.FC<ProfileManagerProps> = ({
  darkMode,
  onProfileSelect,
  onDeleteProfile,
  isOpen,
  profiles
}) => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleProfileSelect = (profileName: string) => {
    setSelectedProfile(profileName);
    onProfileSelect(profiles[profileName]);
  };

  return isOpen ? (
    <div
      className={`w-64 h-full fixed left-0 top-0 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } shadow-lg border-r ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      } overflow-y-auto`}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <FaFolder className="mr-2" />
          Profiles
        </h2>
        <div className="space-y-2">
          {Object.keys(profiles).length === 0 ? (
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No profiles saved yet
            </p>
          ) : (
            Object.entries(profiles).map(([name, _]) => (
              <div
                key={name}
                className={`group flex items-center justify-between p-2 rounded cursor-pointer ${
                  selectedProfile === name
                    ? darkMode
                      ? 'bg-blue-600'
                      : 'bg-blue-100'
                    : darkMode
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleProfileSelect(name)}
              >
                <span className="truncate flex-1">{name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteProfile(name);
                    if (selectedProfile === name) {
                      setSelectedProfile(null);
                    }
                  }}
                  className={`opacity-0 group-hover:opacity-100 p-1 rounded ${
                    darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                  }`}
                >
                  <FaTrash className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  ) : null;
};
