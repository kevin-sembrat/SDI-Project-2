import { useState } from "react";
import "./Popup.css"; // We'll add styles here

export const Popup = ({ openPopup, setOpenPopup, responseFromGPT }) => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      TEST
      {/* Button to open popup */}
      {/* <button onClick={() => setOpenPopup(true)}>Open Popup</button> */}
      {/* Popup overlay */}
      {openPopup && (
        <div className="popup-overlay">
          <div className="popup-window">
            <h2>Battle Sequence</h2>
            <p>{responseFromGPT}</p>

            {/* Close button at bottom */}
            <div className="popup-footer">
              <button onClick={() => setOpenPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
