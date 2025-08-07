import { getPackImage } from "./utils";

export default function Pack({pack, count, clickHandler=()=>{}}){
  return (
    <div className='pack' onClick={()=>{clickHandler()}}>
      <img alt='pack-image' src={getPackImage(pack)}/>
      <p>{count}</p>
    </div>
  )
}