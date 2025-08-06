import { useContext } from 'react';
import { useState, useEffect } from 'react';



function Shop(){
  const [balance, setBalance] = useState(1000);
  const [packs, setPacks] = useState([]);
  const [puchased, setPurchased] =useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.pokemontcg.io/v2/cards?q=set.name:Fossil nationalPokedexNumbers:[1 TO 151]', {
      headers: {
        'X-Api-Key': '78290a77-238d-4f3f-a8d7-b255c3d425df' 
      }
    })
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    // fetchData()
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

// console.log(data)


  return ( 
    <>
  <div>Shop</div>
  <h1>HELLO</h1>
  <img key="hello"
        src="https://images.pokemontcg.io/base3/31.png"
        alt="card image"
        ></img>
  <ul>
    {data.data.map((card)=> {
      <img key={card.id}
        src={card.images.small}
        alt="card image"
      ></img>
    })}  
  </ul>
  </>
  )
}

export default Shop

//fetch pack data
// map through for data needed
// 78290a77-238d-4f3f-a8d7-b255c3d425df
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