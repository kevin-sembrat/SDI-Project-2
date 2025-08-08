import { Link } from "react-router";
import "./Home.css";
export default function Home() {
  return (
    <div className="home">
      <header>
        <h1>Dumpster Fire Duels</h1>
        <h2>Getting started</h2>
        <p>
         <ul>
          <li>Use Pokédollars to buy Pokémon card packs.</li>
          <li>Open packs and pick your favorite Pokémon.</li>
          <li>Choose a Pokémon and place your bets.</li>
          <li>Battle!</li>
        </ul>

    </p>
        <Link to="/shop">Start Shopping</Link>
      </header>
      <h3>Dumpster Fire Duels, <span className="slogan"> Winning Starts Here</span></h3>
      <div className="logo">
        <div>
          <img alt="Chat Gpt Logo" src="./ChatGPT-Logo-PNG.png" />
          <p>
            <i>Powered By</i>
            <b> ChatGPT</b>
          </p>
        </div>
      </div>
    </div>
  );
}
