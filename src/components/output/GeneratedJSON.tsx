import React, { useState } from 'react';
import { FormData, StepProps } from '../../types/forms';
import { toast } from 'react-toastify';
import { FaCopy, FaCheck, FaDownload } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

export const GeneratedJSON: React.FC<StepProps> = ({
  formData,
  darkMode,
}) => {
  const [copied, setCopied] = useState(false);

  const generateConfig = (data: FormData) => {
    const config: any = {
      name: data.name,
      host: data.host,
      port: data.port || 22,
      username: data.username,
      remotePath: data.remotePath || '/',
      uploadOnSave: data.uploadOnSave || false,
    };

    // Add protocol and secure if using FTP
    if (data.protocol === 'ftp') {
      config.protocol = 'ftp';
      config.secure = data.secure || false;
    }

    // Add authentication details
    if (data.authType === 'password' && data.password) {
      config.password = data.password;
    } else if (data.authType === 'privateKey' && data.privateKeyPath) {
      config.privateKeyPath = data.privateKeyPath;
      if (data.passphrase) {
        config.passphrase = data.passphrase;
      }
    }

    // Only add advanced options if showAdvancedOptions is true
    if (data.showAdvancedOptions) {
      if (data.useTempFile) config.useTempFile = true;
      if (data.openSsh) config.openSsh = true;
      if (data.connectionTimeout) config.connectionTimeout = data.connectionTimeout;
      if (data.keepAliveInterval) config.keepAliveInterval = data.keepAliveInterval;
      if (data.maxRetries) config.maxRetries = data.maxRetries;
      if (data.retryDelay) config.retryDelay = data.retryDelay;
      if (data.debugLogging) config.debugLogging = true;
      if (data.forceIPv4) config.forceIPv4 = true;
      if (data.compress) config.compress = true;
    }

    // Add watcher configuration if enabled
    if (data.watcher) {
      config.watcher = data.watcher;
    }

    // Add ignore patterns if specified
    if (data.ignore && data.ignore.length > 0) {
      config.ignore = data.ignore;
    }

    // Add context if specified
    if (data.context) {
      config.context = data.context;
    }

    // Add hop configuration if specified
    if (data.hop) {
      config.hop = data.hop;
    }

    return config;
  };

  const configJSON = generateConfig(formData);
  const formattedJSON = JSON.stringify(configJSON, null, 2);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedJSON);
      setCopied(true);
      toast.success('Configuration copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy configuration');
    }
  };

  const downloadJSON = () => {
    try {
      const blob = new Blob([formattedJSON], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sftp.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Configuration downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download configuration');
    }
  };

  const customStyle = {
    fontSize: '14px',
    borderRadius: '0.5rem',
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Generated Configuration
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={copyToClipboard}
            className={`flex items-center px-4 py-2 rounded ${
              darkMode
                ? copied
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
                : copied
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors duration-200`}
          >
            {copied ? (
              <>
                <FaCheck className="mr-2" />
                Copied!
              </>
            ) : (
              <>
                <FaCopy className="mr-2" />
                Copy to Clipboard
              </>
            )}
          </button>
          <button
            onClick={downloadJSON}
            className={`flex items-center px-4 py-2 rounded ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors duration-200`}
          >
            <FaDownload className="mr-2" />
            Download JSON
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language="json"
          style={darkMode ? oneDark : oneLight}
          customStyle={customStyle}
          showLineNumbers
        >
          {formattedJSON}
        </SyntaxHighlighter>
      </div>
      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Copy this configuration to your SFTP client's settings or save it as a JSON file.
      </p>
    </div>
  );
};
