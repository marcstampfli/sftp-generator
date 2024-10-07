import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiCopy, FiDownload, FiCheckCircle, FiSun, FiMoon, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaServer, FaUserAlt, FaLock, FaFolderOpen, FaFileAlt, FaKey } from 'react-icons/fa';
import { MdOutlineCloudUpload } from 'react-icons/md';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const SFTPForm = () => {
  const [formData, setFormData] = useState({
    name: 'My Server',
    host: 'localhost',
    protocol: 'sftp',
    port: 22,
    username: 'username',
    password: '',
    remotePath: '/',
    uploadOnSave: false,
    useTempFile: false,
    openSsh: false,
  });
  const [generatedJSON, setGeneratedJSON] = useState('');
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const generatedContentRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (generatedJSON) Prism.highlightAll();
  }, [darkMode, generatedJSON]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sftpConfig = JSON.stringify(formData, null, 2);
    setGeneratedJSON(sftpConfig);
    toast.success('JSON successfully generated!', { icon: <FiCheckCircle /> });
    setTimeout(() => {
      generatedContentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filename = formData.name.replace(/\s+/g, '_') + '.json';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.info('JSON file downloaded successfully!', { icon: <FiDownload /> });
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedJSON).then(() => {
      toast.success('JSON copied to clipboard!', { icon: <FiCopy /> });
    });
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ease-in-out ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-blue-500 to-purple-600 text-gray-800'}`}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme={darkMode ? 'dark' : 'light'} />
      <div className={`w-full max-w-3xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl rounded-xl p-10 transition-colors duration-300 ease-in-out`}>
        <div className="flex justify-between items-center mb-10">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>SFTP Config Generator</h1>
          <button onClick={toggleDarkMode} className="text-3xl focus:outline-none transition-colors duration-300 ease-in-out">
            {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-800" />}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
          {step === 1 && (
            <div className={`flex flex-col p-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg transition-colors duration-300 ease-in-out`}>
              <h2 className={`text-2xl mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}> <FaServer className="mr-2 text-blue-500" /> Server Settings </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Server Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
                    placeholder="Enter server name"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Host</label>
                  <input
                    type="text"
                    name="host"
                    value={formData.host}
                    onChange={handleChange}
                    className={`border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
                    placeholder="Enter host address"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Port</label>
                  <input
                    type="number"
                    name="port"
                    value={formData.port}
                    onChange={handleChange}
                    className={`border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
                    placeholder="22"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className={`flex flex-col p-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg transition-colors duration-300 ease-in-out`}>
              <h2 className={`text-2xl mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}> <FaUserAlt className="mr-2 text-blue-500" /> User Credentials </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="flex flex-col relative">
                  <label className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-10 text-2xl focus:outline-none text-gray-500 hover:text-gray-700 transition-colors duration-300 ease-in-out"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className={`flex flex-col p-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg transition-colors duration-300 ease-in-out`}>
              <h2 className={`text-2xl mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}> <FaFolderOpen className="mr-2 text-blue-500" /> Remote Path & Options </h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col">
                  <label className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Remote Path</label>
                  <input
                    type="text"
                    name="remotePath"
                    value={formData.remotePath}
                    onChange={handleChange}
                    className={`border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 ease-in-out ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
                    placeholder="/"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="uploadOnSave"
                    checked={formData.uploadOnSave}
                    onChange={handleCheckboxChange}
                    className={`mr-4 h-6 w-6 text-blue-600 focus:ring-blue-500 border ${darkMode ? 'border-gray-600 bg-gray-600' : 'border-gray-300'}`}
                  />
                  <label className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                    <MdOutlineCloudUpload className="mr-2 text-blue-500" /> Upload on Save
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="useTempFile"
                    checked={formData.useTempFile}
                    onChange={handleCheckboxChange}
                    className={`mr-4 h-6 w-6 text-blue-600 focus:ring-blue-500 border ${darkMode ? 'border-gray-600 bg-gray-600' : 'border-gray-300'}`}
                  />
                  <label className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                    <FaFileAlt className="mr-2 text-blue-500" /> Use Temp File
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="openSsh"
                    checked={formData.openSsh}
                    onChange={handleCheckboxChange}
                    className={`mr-4 h-6 w-6 text-blue-600 focus:ring-blue-500 border ${darkMode ? 'border-gray-600 bg-gray-600' : 'border-gray-300'}`}
                  />
                  <label className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                    <FaKey className="mr-2 text-blue-500" /> Open SSH
                  </label>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white text-lg font-semibold p-4 rounded-lg hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 flex items-center"
              >
                Previous
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto bg-blue-600 text-white text-lg font-semibold p-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center"
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                className={`ml-auto w-auto bg-blue-600 text-white text-xl font-semibold p-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center ${darkMode ? 'bg-blue-800 hover:bg-blue-900' : ''}`}
              >
                <FiCheckCircle className="mr-2" /> Generate SFTP JSON
              </button>
            )}
          </div>
        </form>
        {generatedJSON && (
          <div className="mt-12" ref={generatedContentRef}>
            <h2 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Generated JSON</h2>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <div className={`p-6 border-l-4 ${darkMode ? 'border-blue-400 bg-gray-800 text-green-400' : 'border-blue-600 bg-gray-100 text-gray-800'}`} style={{ fontFamily: 'monospace', lineHeight: '1.5' }}>
                <div className="pl-4">
                  {generatedJSON.split('\n').map((line, index) => (
                    <div key={index} className="flex">
                      <span className={`pr-4 select-none ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{index + 1}</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleCopyToClipboard}
                className="bg-green-500 text-white text-lg font-semibold p-4 rounded-lg hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 flex items-center dark:bg-green-700 dark:hover:bg-green-800"
              >
                <FiCopy className="mr-2" /> Copy to Clipboard
              </button>
              <button
                onClick={handleDownload}
                className="bg-indigo-600 text-white text-lg font-semibold p-4 rounded-lg hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex items-center dark:bg-indigo-700 dark:hover:bg-indigo-800"
              >
                <FiDownload className="mr-2" /> Download JSON File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SFTPForm;