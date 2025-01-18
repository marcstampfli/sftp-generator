import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { SFTPForm } from "./components/forms/SFTPForm";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import "./styles/index.css";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto">
        <SFTPForm darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <ToastContainer
          position="bottom-right"
          theme={darkMode ? "dark" : "light"}
        />
        <Tooltip id="tooltip" className={darkMode ? "dark" : ""} />
      </div>
    </div>
  );
};

export default App;
