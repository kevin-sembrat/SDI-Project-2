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
    "level": card.level,
    "hp": card.hp,
    "types": card.types,
    "weaknessess": card?.weaknesses || [],
    "resistances": card?.resistances || [],
    "images": card.images,
    "rarity": card.rarity
  }
}

export function conditionShopData(cart) {
  //count, id, set, image
  const counterObject = {}
  cart.forEach(item => {
    if (counterObject.hasOwnProperty(item.id)) {
      counterObject[item.id].count++
    } else {
     Object.assign( counterObject, {
      [item.id]:{
        id: item.id,
        count: 1,
        set: "base1",
        image: item.image,
        name: item.name
      }})
    }
  })
  const conditionedData= []
  for(let key in counterObject) {
    conditionedData.push(counterObject[key])
  }
  return conditionedData
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

export function addRemoveHandler(item, index=0, array=[], add=()=>{}, remove=()=>{}) {
    add((state) => [...state, item])
    if(array.length > 0){
      let tempArray = array.map(entry => entry);
      tempArray.splice(index, 1);
      remove(tempArray);
    }
  }

export function generatePack(cardPack, odds){
  const commons = cardPack.filter(card => card.rarity == 'Common');
  const uncommons = cardPack.filter(card => card.rarity == 'Uncommon');
  const rares = cardPack.filter(card => card.rarity == 'Rare');
  const holoRares = cardPack.filter(card => card.rarity == 'Rare Holo');

  const COMMON = 0; const UNCOMMON = 1; const RARE = 2; const RARE_HOLO = 3

  const PULL_RATES = {
    'Low': [
      [1.00, 0.00, 0.00, 0.00],
      [1.00, 0.00, 0.00, 0.00],
      [1.00, 0.00, 0.00, 0.00],
      [0.70, 1.00, 0.00, 0.00],
      [0.50, 0.90, 1.00, 0.10]
    ],
    'Mid': [
      [1.00, 0.00, 0.00, 0.00],
      [1.00, 0.00, 0.00, 0.00],
      [1.00, 0.00, 0.00, 0.00],
      [0.40, 1.00, 0.00, 0.00],
      [0.30, 0.70, 1.00, 0.25]
    ],
    'Rare': [
      [0.97, 0.99, 1.00, 0.00],
      [0.97, 0.99, 1.00, 0.00],
      [0.97, 0.99, 1.00, 0.00],
      [0.00, 0.99, 1.00, 0.00],
      [0.30, 0.00, 1.00, 0.25]
    ]
  };

  let generatedCards = [];

  for( let rates of PULL_RATES[odds] ){
    let roll = Math.random();

    if(roll <= rates[COMMON] && rates[COMMON] != 0 ){
      roll = Math.floor(Math.random() * commons.length);
      generatedCards.push(commons[roll]);
    } else if ( roll <= rates[UNCOMMON] && rates[UNCOMMON] != 0 ){
      roll = Math.floor(Math.random() * uncommons.length);
      generatedCards.push(uncommons[roll]);
    } else if ( roll <= rates[RARE] && rates[RARE] != 0 ){
      if( Math.random() < rates[RARE_HOLO] && rates[RARE_HOLO] != 0 ){
        roll = Math.floor(Math.random() * holoRares.length);
        generatedCards.push(holoRares[roll]);
      } else {
        roll = Math.floor(Math.random() * rares.length);
        generatedCards.push(rares[roll]);
      }
    }

  }

  return generatedCards;
}