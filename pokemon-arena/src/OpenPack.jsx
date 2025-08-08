import { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router";
import Pack from "./Pack";
import Card from "./Card";
import './OpenPack.css'
import {generatePack} from './utils'
import AppContext from "./AppContext";

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
  },
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
  },
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
  const [packsToOpen, setPacksToOpen] = useState([]);
  const {packs} = useParams();
  const [cards, setCards] = useState([]);
  const {cardPacks} = useContext(AppContext);

  useEffect(()=>{
    setPacksToOpen(JSON.parse(packs.replaceAll("'","")))
  },[])
  const openPackHandler = (pack) => {
    generatePack(cardPacks[0][pack.set][0])
    // console.log(cardPacks[0][pack.set][0])
  }
  const addPokemonHandler = (card) => {
    if( selection.length < 6){setSelection((state) => [...state, card])}
  }
  const removePokemonHandler = (index) => {
    if(selection.length > 0){
      let tempArray = selection.map(card => card);
      tempArray.splice(index, 1);
      setSelection(tempArray);
    }
  }
  return(
    <div className="open-pack">
      <div className="open-pack-shader" />
      <div className='pack-carousel'>
        {packsToOpen.map( pack => <Pack key={pack.id} pack={pack} count={pack.count} clickHandler={() => {openPackHandler(pack)}}/>)}
      </div>
      <div className='card-view'>
        <h3>Available Cards</h3>
        {cards.map((card, index ) => <Card key={card.name + index} card={card} clickHandler={() => {addPokemonHandler(card)}}/> )}
      </div>
      <div className="wrapper">
        <div className='party-selection'>
          <h3>Selected</h3>
          {selection.map((card, index ) => <Card key={card.name + index} card={card} clickHandler={() => removePokemonHandler(index)}/> )}
          {/* <Card card={mock_cards[0]} /> */}
        </div>
        <Link to='/battle'>Battle</Link>
      </div>
    </div>
  )
}
