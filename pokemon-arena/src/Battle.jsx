import { sample_data } from "./sample-data.js";
import { useState, useEffect } from "react";
import "./Battle.css";

export default function Battle() {
  // let playerBenchCards = sample_data.slice(0, 12);
  // let enemyBenchCards = sample_data.slice(13, 25);
  // let playerBenchCards = sample_data.slice(0, 12);
  // let enemyBenchCards = sample_data.slice(13, 25);
  // console.log(sample_data);
  const [playerCard, setPlayerCard] = useState([
    playerBenchCards[0].name,
    playerBenchCards[0].images.small,
  ]);
  const [enemyCard, setEnemyCard] = useState(() => {
    const randomNumber = Math.floor(Math.random() * 6);
    return [
      enemyBenchCards[randomNumber].name,
      enemyBenchCards[randomNumber].images.small,
    ];
  });

  //               SAMPLE DATA
  ////////////////////////////////////////////

  // {
  //   name: "Alakazam",
  //   hp: "80",
  //   images: {
  //     small: "https://images.pokemontcg.io/base1/1.png",
  //     large: "https://images.pokemontcg.io/base1/1_hires.png",
  //   },
  //   rarity: "Rare Holo",
  // }

  ///////////////////////////////////////////

  // console.log(sampleDeck);
  return (
    <>
      <div className="app">
        {/* TITLE AND GAME INFO */}
        <header className="header">
          <h3>Battle Board</h3>
          <p>Credits: 1000</p>
        </header>
        {/* PLAYER CARDS */}
        <aside className="player selected-menu">
          {playerBenchCards.map((card) => (
            <p
              key={card.name}
              className={`selectable ${
                playerCard.includes(card.name) ? "selected" : ""
              }`}
              onClick={() => setPlayerCard([card.name, card.images.small])}
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
        <main className="board">
          <div className="card-box player">
            <img src={playerCard[1]} alt="" />
          </div>
          <div className="card-box enemy">
            <img src={enemyCard[1]} alt="" />
          </div>
        </main>

        {/* BETS SECTION */}
        <section className="bets">
          <label htmlFor="units">Units:</label>
          <input id="units" type="number" />
          <button>Set Units</button>

          <div className="prop-bets">
            <div>
              <button>Flareon Moneyline (-210)</button>
            </div>
            <div>
              <label htmlFor="hp-after">HP After Match (35.5):</label>
              <button className="btn">OVER</button>
              <button className="btn">UNDER</button>
            </div>
            <div>
              <label>HP Spread:</label>
              <button className="btn">+15.5</button>
              <button className="btn">-15.5</button>
            </div>
          </div>
        </section>
        <section className="chatCPT-section">
          <button className="btn primary">BATTLE</button>
        </section>
      </div>
    </>
  );
}
