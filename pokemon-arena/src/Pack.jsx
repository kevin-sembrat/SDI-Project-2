import { getPackImage } from "./utils";

export default function Pack({pack, count, clickHandler=()=>{}}){
  return (
    <div className='pack' onClick={()=>{clickHandler()}}>
<<<<<<< HEAD
=======
        <h3>{pack.name}</h3>
>>>>>>> shop-page
      <img alt='pack-image' src={getPackImage(pack)}/>
      <p>{count}</p>
    </div>
  )
}