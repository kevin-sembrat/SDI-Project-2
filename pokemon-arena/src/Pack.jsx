import { getPackImage } from "./utils";
import  './Pack.css'

export default function Pack({pack, count, clickHandler=()=>{}}){
  return (
    <div className='pack' onClick={()=>{clickHandler()}}>
      <h3>{pack.name}</h3>
      <img alt='pack-image' src={getPackImage(pack)}/>
      <p>{count}</p>
    </div>
  )
}