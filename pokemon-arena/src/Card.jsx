import { getCardImage } from "./utils"

export default function Card({card, clickHandler=()=>{}}){
  return(
    <div className='card' onClick={()=>{clickHandler()}}>
      <img alt='card-image' src={getCardImage(card)} />
    </div>
  )
}