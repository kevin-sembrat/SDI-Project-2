import { useContext } from 'react';
import { useState, useEffect } from 'react';
import './Shop.css'
import  Pack  from './Pack'
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

  function addToCart(pack){
    if(funds>=pack.price)
      setCart((prevPacks) => [...prevPacks, pack]);
  }
  function removeFromCart(){}


  return (
  <div className="shop-container">
    <h1 className="shop-title">Pokémon Shop</h1>
    <p className="shop-funds">Money: ₱{funds}</p>

    <div className="pack-list">
      {packs.map((pack) => (
        <Pack
          key={pack.id}
          pack={pack}
          count={"₱" + pack.price}
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
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
}

export default Shop;

//id, count, image
//set base1 //exporting packData including id/count/image and base1.
//..spread operator for adding
//splicing for removing create new array to push packs into so to not mutate
//splice index with remove cart inde

//fetch pack data
// map through for data needed
//
// {
//   "data": {
//     "id": "swsh1",
//     "name": "Sword & Shield",
//     "series": "Sword & Shield",
//     "printedTotal": 202,
//     "total": 216,
//     "legalities": {
//       "unlimited": "Legal",
//       "standard": "Legal",
//       "expanded": "Legal"
//     },
//     "ptcgoCode": "SSH",
//     "releaseDate": "2020/02/07",
//     "updatedAt": "2020/08/14 09:35:00",
//     "images": {
//       "symbol": "https://images.pokemontcg.io/swsh1/symbol.png",
//       "logo": "https://images.pokemontcg.io/swsh1/logo.png"
//     }
//   }
// }
  // fetch('https://pokeapi.co/api/v2/item?limit=50')

  //pack images
  //array storing items selected
    // const {credits, setCredits} = useContext(AppContext)
//   const [balance, setBalance] = useState(1000);
//   const [packs, setPacks] = useState([]);
//   const [puchased, setPurchased] =useState([]);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch('https://api.pokemontcg.io/v2/cards?q=set.name:Fossil nationalPokedexNumbers:[1 TO 151]', {
//       headers: {
//         'X-Api-Key': ''
//       }
//     })
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const json = await res.json();
//         setData(json);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     // fetchData()
//   }, []);

//   if (loading) return <p>Loading…</p>;
//   if (error) return <p>Error: {error}</p>;

// // console.log(data)

