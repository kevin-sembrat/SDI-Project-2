import { Link } from "react-router";
import "./Home.css";
export default function Home() {
  return (
    <div className="home">
      <header>
        <h1>Getting started</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum
          obcaecati recusandae aperiam minus eius aut temporibus assumenda
          nesciunt voluptas voluptate. Ut provident, incidunt autem eaque
          inventore repellendus repellat ipsa. Architecto.
        </p>
        <Link to="/shop">Start Shopping</Link>
      </header>
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
