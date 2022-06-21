import React from "react";
import "../styles/Tooltip.css";

const Tooltip = () => {
  return (
    <div className="tooltip-wrapper">
      <div className="tooltip-header">To The Office</div>
      <div className="tooltip-body">
        <div className="tooltip-body-left"></div>
        <div className="tooltip-body-right">
          <div>Diana Russel</div>
          <div className="icon-label">
            <div></div>
            <div></div>
          </div>
          <div className="icon-label">
            <img src="assets/location.svg" alt="location" />
            <div>Kiryat Rishon, Rishon LeTsiyon, Israel</div>
          </div>
          <div>
            <img src="assets/location.svg" alt="location" />
            <div>Kiryat Rishon, Rishon LeTsiyon, Israel</div>
          </div>
        </div>
      </div>
      <div className="tooltip-footer"></div>
    </div>
  );
};

export default Tooltip;
