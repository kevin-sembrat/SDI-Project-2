import { useState } from "react";
import "./Popup.css"; // We'll add styles here

export const Popup = ({
  openPopup,
  setOpenPopup,
  responseFromGPT,
  playerBets,
  units,
  battleResultOBJ,
  playerCard,
  matchupPropBets,
  setCredits,
  credits,
}) => {
  // const [isOpen, setIsOpen] = useState(false);

  function calculateWinningsOrLosses(playerBets, battleResult, units) {
    //player bets: [false, null, null, 10] , [true, 'over', 'greater-than', 10]
    //battle Results: {winner: "Charizard", winnerHP: "100", loser: "Machamp", loserHP:"0"}
    // const overUnder = 79.5;
    // const units = playerBets[3];
    let winningsOrLosses = 0;
    const unitsNum = Number(units);
    // playerPick = "Charizard";

    //moneyline bet was taken
    playerBets[0]
      ? playerCard[0] == battleResult.winner
        ? (winningsOrLosses += unitsNum)
        : (winningsOrLosses -= unitsNum)
      : winningsOrLosses;

    // Check: Did the player bet AND win the match?
    if (playerBets[1] != null && playerCard[0] === battleResult.winner) {
      if (playerBets[1] === "over") {
        if (Number(battleResult.winnerHP) > Number(matchupPropBets.overUnder)) {
          winningsOrLosses += unitsNum;
        } else {
          winningsOrLosses -= unitsNum;
        }
      } else if (playerBets[1] === "under") {
        if (Number(battleResult.winnerHP) < Number(matchupPropBets.overUnder)) {
          winningsOrLosses += unitsNum;
        } else {
          winningsOrLosses -= unitsNum;
        }
      }
    } else if (playerBets[1] != null) {
      if (playerBets[1] === "under") {
        winningsOrLosses += unitsNum;
      } else {
        winningsOrLosses -= unitsNum;
      }
    }

    //spread was taken
    if (playerBets[2] != null) {
      const spread = Number(matchupPropBets.spread);
      if (playerBets[2] == "greater-than") {
        Math.abs(Number(battleResult.winnerHP) - Number(battleResult.loserHP)) >
        spread
          ? (winningsOrLosses += unitsNum)
          : (winningsOrLosses -= unitsNum);
      } else {
        Math.abs(Number(battleResult.winnerHP) - Number(battleResult.loserHP)) <
        spread
          ? (winningsOrLosses += unitsNum)
          : (winningsOrLosses -= unitsNum);
      }
    }
    // console.log(typeof unitsNum);
    // console.log(credits);
    // console.log(winningsOrLosses);
    setCredits(Number(credits) + Number(winningsOrLosses));
  }

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
              <button
                onClick={() => {
                  calculateWinningsOrLosses(playerBets, battleResultOBJ, units);
                  setOpenPopup(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
