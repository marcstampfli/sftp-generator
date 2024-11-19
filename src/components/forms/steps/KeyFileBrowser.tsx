import React, { useRef, useState } from 'react';
import { FaFolder, FaKey, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface KeyFileBrowserProps {
  darkMode?: boolean;
  value: string;
  onChange: (path: string) => void;
}

export const KeyFileBrowser: React.FC<KeyFileBrowserProps> = ({
  darkMode = false,
  value = '',
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    // Read the file to validate it's a proper SSH key
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (isValidSSHKey(content)) {
        onChange(file.name);
        toast.success('SSH key file selected successfully');
      } else {
        toast.error('Invalid SSH key file. Please select a valid private key file.');
      }
    };
    reader.onerror = () => {
      toast.error('Error reading the key file. Please try again.');
    };
    reader.readAsText(file);
  };

  const isValidSSHKey = (content: string): boolean => {
    // Basic validation for SSH private key format
    const opensshPattern = /^-----BEGIN (.+ )?PRIVATE KEY-----/;
    const puttyPattern = /^PuTTY-User-Key-File-/;
    
    // Trim whitespace and check for common key formats
    const trimmedContent = content.trim();
    return opensshPattern.test(trimmedContent) || puttyPattern.test(trimmedContent);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pem,.ppk,.key,id_rsa,id_dsa,id_ecdsa,id_ed25519"
        onChange={handleFileInputChange}
      />

      {!value ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          className={`
            cursor-pointer
            border-2 border-dashed rounded-lg p-6
            flex flex-col items-center justify-center space-y-2
            transition-colors duration-200
            ${
              darkMode
                ? 'border-gray-600 hover:border-gray-500'
                : 'border-gray-300 hover:border-gray-400'
            }
            ${isDragging ? 'border-blue-500 bg-blue-50' : ''}
          `}
        >
          <FaFolder
            className={`text-4xl ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          />
          <div
            className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <span className="font-medium">Click to browse</span> or drag and drop
            <br />
            your SSH private key file here
          </div>
          <div
            className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Supports OpenSSH and PuTTY key formats
          </div>
        </div>
      ) : (
        <div
          className={`
            flex items-center justify-between
            p-4 rounded-lg
            ${
              darkMode
                ? 'bg-gray-700 text-gray-200'
                : 'bg-gray-100 text-gray-700'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <FaKey className="text-lg" />
            <div className="truncate">
              <div className="font-medium">{value}</div>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className={`
              p-2 rounded-full
              transition-colors duration-200
              ${
                darkMode
                  ? 'hover:bg-gray-600 text-gray-400 hover:text-gray-200'
                  : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
              }
            `}
            title="Remove key"
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
};
