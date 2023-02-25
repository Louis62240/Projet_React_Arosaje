import React from "react";
import "../assets/css/ProgressBar.css";

const ProgressBar = ({ currentStep }) => {
  return (
    <div className="progress-bar-container">
      <div className={`progress-bar-step ${currentStep >= 1 ? "completed" : ""}`}>
        <div className="progress-bar-circle">1</div>
        <div className="progress-bar-label">Etape 1</div>
      </div>
      <div className={`progress-bar-step ${currentStep >= 2 ? "completed" : ""}`}>
        <div className="progress-bar-circle">2</div>
        <div className="progress-bar-label">Etape 2</div>
      </div>
      <div className={`progress-bar-step ${currentStep >= 3 ? "completed" : ""}`}>
        <div className="progress-bar-circle">3</div>
        <div className="progress-bar-label">Etape 3</div>
      </div>
    </div>
  );
};

export default ProgressBar;
