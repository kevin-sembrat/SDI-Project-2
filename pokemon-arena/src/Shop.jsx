import { useContext } from 'react';
import { useState, useEffect } from 'react';
import './Shop.css'
import  Pack  from './Pack' 
import { Link } from 'react-router'
// import AppContext from './AppContext';



function Shop() {
  const [funds, setFunds] = useState(1000);
  const [cart, setCart] = useState([]);

  const packs = [
    {
      id: 1,
      name: "Rare",
      price: 600,
      image: "https://loosepacks.com/cdn/shop/files/Untitled_-_2024-06-11T141531.068.png?v=1745610115&width=713",
    },
    {
      id: 2,
      name: "Mid",
      price: 500,
      image: "https://loosepacks.com/cdn/shop/files/Untitled_-_2024-06-11T141848.421.png?v=1745610115&width=713",
    },
    {
      id: 3,
      name: "Low",
      price: 400,
      image: "https://loosepacks.com/cdn/shop/files/Untitled_-_2024-06-11T141857.864.png?v=1740867758&width=713",
    },
  ];

function addToCart(pack) {
  if (funds >= pack.price) {
    setCart((prevPacks) => [...prevPacks, pack]);
    setFunds((prevFunds) => prevFunds - pack.price);
  } else {
    alert("Not enough funds!");
  }
}
  const removeFromCart = (packId) => {
  const packIndex = cart.findIndex(pack => pack.id === packId);
    let updatedCart = [...cart];
      if (packIndex > -1) {
    updatedCart.splice(packIndex, 1);
    setCart(updatedCart);
    setFunds((prevFunds) => prevFunds + cart[packIndex].price);
  }
};
  



  return (
  <div className="shop-container">
    <div className="shop-container-shader"></div>
    <h1 className="shop-title">Pokémon Shop</h1>
    <p className="shop-funds">Money: ₱{funds}</p>
    <div className="pack-card">
      {packs.map((pack) => (
        <Pack
          key={pack.id}
          pack={pack}
          count={"$" + pack.price}
          clickHandler={() => addToCart(pack)}
        />
      ))}
    </div>

    <div className="cart">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price} {" "}
              <button onClick={() => removeFromCart(item.id)}>Remove</button> 
            </li>
          ))}
        </ul>
      )}
      <div className="Checkout">
        <Link to={`/open-packs/'${encodeURIComponent(JSON.stringify(cart))}'`}>Open Packs</Link>
      </div>
    </div>
  </div>
);
}

export default Shop;
