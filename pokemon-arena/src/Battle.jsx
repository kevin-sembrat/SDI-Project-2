import { sample_data, playerDeck, enemyDeck } from "./sample-data.js";
import { generatePropBetsFromArray } from "./PropBetGenerator";
import { useState, useEffect, useContext } from "react";
import "./Battle.css";
import { ChatGPT } from "./ChatGPT";
import "./Popup.css";
import { Popup } from "./Popup";
import { useParams } from "react-router";
import AppContext from "./AppContext.js";

export default function Battle() {

  const { pokemon } = useParams();
  let selectedCards = JSON.parse(pokemon.replaceAll("'","")) // <---- data from the open pack page ready for you to use

  let playerBenchCards = selectedCards;
  let enemyBenchCards = enemyDeck;
  // let moneylinebutton = false;

  //buttonssetResponseFromGPT("Genereating picks for " + inputString);
  // return;

  const [moneylineButton, setMoneyLineButton] = useState(true);
  const [overButton, setOverButton] = useState(true);
  const [underButton, setUnderButton] = useState(true);
  const [plusButton, setPlusButton] = useState(true);
  const [minusButton, setMinusButton] = useState(true);

  const {credits, setCredits} = useContext(AppContext);

  const [openPopup, setOpenPopup] = useState(false);
  const [battleResultOBJ, setBattleResultOBJ] = useState({});

  const [units, setUnits] = useState(10);

  const [responseFromGPT, setResponseFromGPT] = useState(
    "waiting to start battle..."
  );

  function resetPicks() {
    setMoneyLineButton(true);
    setOverButton(true);
    setUnderButton(true);
    setPlusButton(true);
    setMinusButton(true);
  }

  const [playerCard, setPlayerCard] = useState([
    playerBenchCards[0].name,
    playerBenchCards[0].images.small,
    playerBenchCards[0].level,
    playerBenchCards[0].hp,
    playerBenchCards[0].types,
    playerBenchCards[0].weaknesses,
    playerBenchCards[0].resistances,
  ]);
  const [enemyCard, setEnemyCard] = useState(() => {
    const randomNumber = Math.floor(Math.random() * 4);
    return [
      enemyBenchCards[randomNumber].name,
      enemyBenchCards[randomNumber].images.small,
      enemyBenchCards[randomNumber].level,
      enemyBenchCards[randomNumber].hp,
      enemyBenchCards[randomNumber].types,
      enemyBenchCards[randomNumber].weaknesses,
      enemyBenchCards[randomNumber].resistances,
    ];
  });
  const [matchupPropBets, setMatchupPropBets] = useState(
    generatePropBetsFromArray(playerCard, enemyCard)
  );
  const [playerBets, setPlayerBets] = useState([false, null, null, 10]);
  //[true, "over", "greater-than"]
  //[false, "under", null]
  //[false, null, "less-than"]

  // console.log("NEW MATCHUP", matchupPropBets);

  //               SAMPLE DATA
  ////////////////////////////////////////////

  // {
  //   name: "Charizard",
  //   level: 60,
  //   hp: 150,
  //   types: ["fire", "flying"],
  //   weaknesses: [{ type: "water", value: 30 }],
  //   resistances: [{ type: "grass", value: 20 }],
  //   images: {
  //     small: "https://images.pokemontcg.io/base1/4.png",
  //     large: "https://images.pokemontcg.io/base1/4_hires.png",
  //   },
  //   rarity: "Rare Holo",
  // };

  ///////////////////////////////////////////

  // console.log(sampleDeck);
  return (
    <>
      <div className="app">
        {/* TITLE AND GAME INFO */}
        <header className="header">
          <h3>Battle Board</h3>
          <p>Credits: {credits}</p>
        </header>
        {/* PLAYER CARDS */}
        <aside className="player selected-menu">
          {playerBenchCards.map((card, index) => (
            <p
              key={card.name + index}
              className={`selectable ${
                playerCard.includes(card.name) ? "selected" : ""
              }`}
              onClick={() => {
                setPlayerCard([
                  card.name,
                  card.images.small,
                  card.level,
                  card.hp,
                  card.types,
                  card.weaknesses,
                  card.resistances,
                ]);
                setMatchupPropBets({
                  moneyline: "",
                  spread: "",
                  overUnder: "",
                });
                resetPicks();
              }}
            >
              {`${card.name}`}
            </p>
          ))}
        </aside>

        {/* ENEMY CARDS  */}
        <aside className="enemy selected-menu">
          {enemyBenchCards.map((card) => (
            <p
              key={card.name}
              className={`selectable ${
                enemyCard.includes(card.name) ? "selected enemy" : ""
              }`}
            >
              {`${card.name}`}
            </p>
          ))}
        </aside>

        {/* CENTER BATTLE BOARD SPACE */}
        {openPopup ? (
          <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            responseFromGPT={responseFromGPT}
            playerBets={playerBets}
            units={units}
            battleResultOBJ={battleResultOBJ}
            playerCard={playerCard}
            matchupPropBets={matchupPropBets}
            setCredits={setCredits}
            credits={credits}
          />
        ) : (
          <main className="board">
            <div className="card-box player">
              <img src={playerCard[1]} alt="" />
            </div>
            <h1>VS</h1>
            <div className="card-box enemy">
              <img src={enemyCard[1]} alt="" />
            </div>
          </main>
        )}

        {/* BETS SECTION */}
        <section className="bets">
          <button
            onClick={() => {
              // console.log("Player Bets", playerBets);
              setMatchupPropBets(
                generatePropBetsFromArray(playerCard, enemyCard)
              );
            }}
          >
            Genereate Odds...
          </button>
          <div>
            <label htmlFor="units">Wager:</label>
            <input
              id="units"
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
            />
            {/* <button
              onClick={() => {
                setPlayerBets(() => {
                  let changedBet = playerBets;
                  changedBet[3] = units;
                });
              }}
            >
              Set Units
            </button> */}
          </div>

          <div className="prop-bets">
            <div>
              <button
                className={`moneyline button ${
                  moneylineButton == false ? "clicked" : ""
                }`}
                onClick={() => {
                  moneylineButton
                    ? setMoneyLineButton(false)
                    : setMoneyLineButton(true);
                  setPlayerBets(() => {
                    // console.log("MONELINE");

                    let changedBet = playerBets;
                    changedBet[0] = playerBets[0] == true ? false : true;
                    return changedBet;
                  });
                }}
              >
                Moneyline {`(${matchupPropBets.moneyline})`}
              </button>
            </div>
            <div>
              <label htmlFor="hp-after">
                HP After Match {`(${matchupPropBets.spread})`}:
              </label>
              <button
                className={`over button ${
                  overButton == false ? "clicked" : ""
                }`}
                onClick={() => {
                  if (overButton) {
                    setUnderButton(true);
                    setOverButton(false);
                    setPlayerBets(() => {
                      let changedBet = playerBets;
                      changedBet[1] = "over";
                      return changedBet;
                    });
                  } else {
                    setOverButton(true);
                    setPlayerBets(() => {
                      let changedBet = playerBets;
                      changedBet[1] = "null";
                      return changedBet;
                    });
                  }
                }}
              >
                OVER
              </button>
              <button
                className={`under button ${
                  underButton == false ? "clicked" : ""
                }`}
                onClick={() => {
                  if (underButton) {
                    setUnderButton(false);
                    setOverButton(true);
                    setPlayerBets(() => {
                      let changedBet = playerBets;
                      changedBet[1] = "under";
                      return changedBet;
                    });
                  } else {
                    setUnderButton(true);
                    setPlayerBets(() => {
                      let changedBet = playerBets;
                      changedBet[1] = "null";
                      return changedBet;
                    });
                  }
                }}
              >
                UNDER
              </button>
            </div>
            <div>
              <label>HP Spread:</label>
              <button
                className={`minus button ${
                  minusButton == false ? "clicked" : ""
                }`}
                onClick={() => {
                  if (minusButton) {
                    setMinusButton(false);
                    setPlusButton(true);
                    setPlayerBets(() => {
                      let changedBet = playerBets;
                      changedBet[2] = "less-than";
                      return changedBet;
                    });
                  } else {
                    setMinusButton(true);
                    setPlayerBets(() => {
                      let changedBet = playerBets;
                      changedBet[2] = "null";
                      return changedBet;
                    });
                  }
                }}
              >{`(-${matchupPropBets.overUnder})`}</button>
              <button
                className={`plus button ${
                  plusButton == false ? "clicked" : ""
                }`}
                onClick={() => {
                  if (plusButton) {
                    setPlusButton(false);
                    setMinusButton(true);
                    setPlayerBets(() => {
                      let changedBet = playerBets;
                      changedBet[2] = "greater-than";
                      return changedBet;
                    });
                  } else {
                    setPlusButton(true);
                    setPlayerBets(() => {
                      let changedBet = playerBets;
                      changedBet[2] = "null";
                      return changedBet;
                    });
                  }
                }}
              >{`(+${matchupPropBets.overUnder})`}</button>
            </div>
          </div>
        </section>
        <section className="chatCPT-section">
          <ChatGPT
            playerCard={playerCard}
            enemyCard={enemyCard}
            playerBets={playerBets}
            setOpenPopup={setOpenPopup}
            responseFromGPT={responseFromGPT}
            setResponseFromGPT={setResponseFromGPT}
            credits={credits}
            setCredits={setCredits}
            matchupPropBets={matchupPropBets}
            units={units}
            setBattleResultOBJ={setBattleResultOBJ}
          />
        </section>
      </div>
    </>
  );
}
