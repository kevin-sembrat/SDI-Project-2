const API_KEY = "68cb9342-d1ee-47cb-a6f1-4d7bf1a081dc";

export async function getSet(callback=(cards)=>{console.log(cards)}, set='base1'){
  await fetch(...createGetRequest(set))
    .then(res => handleResponse(res))
    .then(json => conditionSet(json.data))
    .then(cards => callback([cards]))
}

async function handleResponse(res){
  try{
    if(res.status === 200){
      console.log("INFO: Request successful.");
      return res.json()
    } else {
      throw new Error(`ERROR: Request failed with a status of: ${res.status}.\nResponse message: ${res.statusText}`);
    }
  } catch(err) {
    console.error(err);
    return { "data": [] };
  }
}

function conditionSet(cards){
  let conditionedCards = cards.map(card => conditionCardData(card));
  return conditionedCards.filter(card => card != null);
}

function conditionCardData(card){
  if(card.supertype !== "Pokémon"){ return null }
  return {
    "name": card.name,
    "hp": card.hp,
    "images": card.images,
    "rarity": card.rarity
  }
}

function createGetRequest(set){
  return [
    `https://api.pokemontcg.io/v2/cards?q=set.id:${set}`,
    {
      method: "GET",
      mode: "cors",
      headers: { "x-api-key": API_KEY }
    }
  ]
}

export function getCardImage(card){
  return card?.images.small || null;
}

export function getPackImage(pack){
  return pack?.image || null;
}