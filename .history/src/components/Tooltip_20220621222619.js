import React from "react";
import Avatar from "@material-ui/core/Avatar";

import "../styles/Tooltip.css";
import { Chip } from "@material-ui/core";

const Tooltip = () => {
  return (
    <div className="tooltip-wrapper">
      <div className="tooltip-header">To The Office</div>
      <div className="tooltip-body">
        <Avatar
          style={{ width: 76, height: 76 }}
          alt="Diana Russel"
          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
        />
        <div className="tooltip-body-right">
          <div>Diana Russel</div>
          <div className="icon-label">
            <img src="assets/location.svg" alt="location" />
            <div>Kiryat Rishon, Rishon LeTsiyon, Israel</div>
          </div>
          <div className="icon-label">
            <img src="assets/time.svg" alt="time" />
            <div>08:30 AM</div>
          </div>
          <div className="chips">
            {["sunday", "monday", "friday"].map((day) => (
              <Chip label={day} color="primary" />
            ))}
          </div>
        </div>
      </div>
      <div className="line" />
      <div className="tooltip-footer">
        <div>Send a message via</div>
        <div className="contacts">
          {["slack", "whatsapp", "email"].map((contact) => {
            return (
              <img
                className="icon"
                src={`assets/${contact}.svg`}
                alt={contact}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
