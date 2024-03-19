import React, { useState } from 'react';

const Popup = ({ event }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <button className="btn btn-primary" style={{ backgroundColor: '#6d7f69', width: "100px", alignItems: "center" }} onClick={() => setShowPopup(!showPopup)}>
        Show 
      </button>
      {showPopup && (
        <div className="popup-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 999, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="popup-content" style={{ width: "700px", maxHeight: "80%", overflowY: "auto", backgroundColor: "white", borderRadius: "10px", padding: "20px", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)", position: "relative" }}>
            <h1 style={{ color: '#ff5733', animation: 'rainbow 5s infinite alternate', textAlign:"center"}}>Event Rules</h1>
            <div style={{ marginTop: '10px' }}>
              {event.eventDescription}
            </div>
            <button onClick={() => setShowPopup(false)} style={{ position: "absolute", top: "10px", right: "10px", background: "transparent", border: "none", cursor: "pointer", fontSize: "20px", zIndex: 1000 }}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
