import { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router";
import Pack from "./Pack";
import Card from "./Card";
import './OpenPack.css'
import { generatePack, addRemoveHandler } from './utils'
import AppContext from "./AppContext";

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
    let generatedCards = generatePack(cardPacks[0][pack.set][0], pack.name);
    setCards((state)=>[...state, ...generatedCards ])

    //Breaking REACT patterns
    pack.count--;

    for( let i = 0; i < packsToOpen.length; i++ ){
      if( packsToOpen[i].id != pack.id ){ continue }
      if( pack.count <= 0 ){
        let tempArray = packsToOpen.map(element=>element);
        tempArray.splice(i,1);
        setPacksToOpen(tempArray);
      }
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
        {cards.map(
          (card, index ) => <Card key={card.name + index} card={card} clickHandler={() => {addRemoveHandler(card, index, cards, setSelection, setCards)}}/> )}
      </div>
      <div className="wrapper">
        <div className='party-selection'>
          <h3>Selected</h3>
          {selection.map((card, index ) => <Card key={card.name + index} card={card} clickHandler={() => {addRemoveHandler(card, index, selection, setCards, setSelection)}}/> )}
        </div>
        <Link to={`/battle/${encodeURIComponent(JSON.stringify(selection))}`}>Battle</Link>
      </div>
    </div>
  )
}
