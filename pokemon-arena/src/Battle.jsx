import { sample_data } from "./sample-data.js";
import { useState } from "react";
import "./Battle.css";

export default function Battle() {
  console.log(sample_data);
  const [playerBench, setPlayerBench] = useState([]);
  const enemyBench = [];

  return (
    <>
      <div class="app">
        {/* TITLE AND GAME INFO */}
        <header class="header">
          <h3>Battle Board</h3>
          <p>Credits: 1000</p>
        </header>
        {/* PLAYER CARDS */}
        <aside class="sidebar player">
          <ul>
            <li>Pokémon A</li>
            <li>Pokémon B</li>
            <li>Pokémon C</li>
            <li>Pokémon D</li>
            <li>Pokémon E</li>
            <li>Pokémon F</li>
          </ul>
        </aside>

        {/* ENEMY CARDS  */}
        <aside class="sidebar enemy">
          <ul>
            <li>Pokémon A</li>
            <li>Pokémon B</li>
            <li>Pokémon C</li>
            <li>Pokémon D</li>
            <li>Pokémon E</li>
            <li>Pokémon F</li>
          </ul>
        </aside>

        {/* CENTER BATTLE BOARD SPACE */}
        <main class="board">
          <div class="card-box player">Player Card</div>
          <div class="card-box enemy">Enemy Card</div>
        </main>

        {/* BETS SECTION */}
        <section class="bets">
          <label for="units">Units:</label>
          <input id="units" type="number" value="10" />

          <div className="prop-bets">
            <div>
              <button>Flareon Moneyline (-210)</button>
            </div>
            <div>
              <label for="hp-after">HP After Match (35.5):</label>
              <button class="btn">OVER</button>
              <button class="btn">UNDER</button>
            </div>
            <div>
              <label>HP Spread:</label>
              <button class="btn">+15.5</button>
              <button class="btn">-15.5</button>
            </div>
          </div>
        </section>
        <section class="chatCPT-section">
          <button class="btn primary">BATTLE</button>
        </section>
      </div>
    </>
  );
}
