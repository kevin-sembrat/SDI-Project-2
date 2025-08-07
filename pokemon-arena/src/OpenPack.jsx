import { useState } from "react"
import { Link } from "react-router";
import Pack from "./Pack";
import Card from "./Card";

const mock_cards=[
  {
    "name": "Tangela",
    "hp": "50",
    "images": {
      "small": "https://images.pokemontcg.io/base1/66.png",
      "large": "https://images.pokemontcg.io/base1/66_hires.png"
    },
    "rarity": "Common"
  },
  {
    "name": "Vulpix",
    "hp": "50",
    "images": {
      "small": "https://images.pokemontcg.io/base1/68.png",
      "large": "https://images.pokemontcg.io/base1/68_hires.png"
    },
    "rarity": "Common"
  },
  {
    "name": "Weedle",
    "hp": "40",
    "images": {
      "small": "https://images.pokemontcg.io/base1/69.png",
      "large": "https://images.pokemontcg.io/base1/69_hires.png"
    },
    "rarity": "Common"
  }
]

const mock_packs = [
  {
    id: 1,
    count: 2,
    set: 'base1',
    image: "https://loosepacks.com/cdn/shop/files/Untitled_-_2024-06-11T141531.068.png?v=1745610115&width=713",
  },
  {
    id: 2,
    count: 1,
    set: 'base1',
    image: "https://loosepacks.com/cdn/shop/files/Untitled_-_2024-06-11T141848.421.png?v=1745610115&width=713",
  },
  {
    id: 3,
    count: 4,
    set: 'base1',
    image: "https://loosepacks.com/cdn/shop/files/Untitled_-_2024-06-11T141857.864.png?v=1740867758&width=713",
  },
];

export default function OpenPack(){
  const [selection, setSelection] = useState([]);

  return(
    <div className="open-pack">
      <div className='pack-carousel'>
        {mock_packs.map( pack => <Pack key={pack.id} pack={pack} count={pack.count}/>)}
      </div>
      <div className='card-view'>
        <h3>Available Cards</h3>
        {mock_cards.map( card => <Card key={card.name} card={card}/> )}
      </div>
      <div className='party-selection'>
        <h3>Selected</h3>
        <Card card={mock_cards[0]} />
      </div>
      <Link to='/battle'>Battle</Link>
    </div>
  )
}