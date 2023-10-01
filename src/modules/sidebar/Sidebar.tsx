import React from "react";
import { LocationData } from "../../Types/Coordinates";
import "./Sidebar.css";
import { GlobeAmericas } from 'react-bootstrap-icons';

function Sidebar({ coordinates }: LocationData) {
  return (
    <div className="wrapper">
      <div className="sidebar">
        <div className="header">
          <div className="text">
            Your Locations
          </div></div>
        <div className="list">
          {coordinates.map((location, index) => (
            <div className="row" key={index}>
              <div className="icon">
                <GlobeAmericas />
              </div>
              <div className="latitude">
                {location.latitude},
              </div>
              <div className="location">
                {location.longitude}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;