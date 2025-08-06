import { Link } from "react-router"
import "./Home.css"
export default function Home(){


  return(
  <div className="home">
    <Link to = '/shop'>
    Start Shopping
    </Link>
    <h1>Getting started</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum obcaecati recusandae aperiam minus eius aut temporibus assumenda nesciunt voluptas voluptate. Ut provident, incidunt autem eaque inventore repellendus repellat ipsa. Architecto.</p>
  </div>)
}