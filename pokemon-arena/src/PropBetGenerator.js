// const charizard = {
//   name: "Charizard",
//   level: 60,
//   hp: 150,
//   types: ["fire", "flying"],
//   weaknesses: [{ type: "water", value: 30 }],
//   resistances: [{ type: "grass", value: 20 }],
//   images: {
//     small: "https://images.pokemontcg.io/base1/4.png",
//     large: "https://images.pokemontcg.io/base1/4_hires.png",
//   },
//   rarity: "Rare Holo",
// };

const charizard = [
  "Charizard",
  "https://images.pokemontcg.io/base1/4.png",
  60,
  150,
  ["fire", "flying"],
  [{ type: "water", value: 30 }],
  [{ type: "grass", value: 20 }],
];

const blastoise = {
  name: "Blastoise",
  level: 55,
  hp: 160,
  types: ["water"],
  weaknesses: [{ type: "electric", value: 20 }],
  resistances: [{ type: "fire", value: 30 }],
};

const pikachu = {
  name: "Pikachu",
  level: 40,
  hp: 60,
  types: ["electric"],
  weaknesses: [{ type: "ground", value: 20 }],
  resistances: [{ type: "steel", value: 20 }],
};

const gyarados = {
  name: "Gyarados",
  level: 45,
  hp: 120,
  types: ["water", "flying"],
  weaknesses: [{ type: "electric", value: 40 }],
  resistances: [{ type: "fighting", value: 20 }],
};

const machamp = [
  "Machamp",
  "https://images.pokemontcg.io/base1/8.png",
  55,
  130,
  ["fighting"],
  [{ type: "psychic", value: 30 }],
  [{ type: "rock", value: 20 }],
];
//  {
//   name: "Machamp",
//   level: 55,
//   hp: 130,
//   types: ["fighting"],
//   weaknesses: [{ type: "psychic", value: 30 }],
//   resistances: [{ type: "rock", value: 20 }],
// };

const alakazam = {
  name: "Alakazam",
  level: 52,
  hp: 100,
  types: ["psychic"],
  weaknesses: [{ type: "dark", value: 20 }],
  resistances: [{ type: "fighting", value: 30 }],
};

const venusaur = {
  name: "Venusaur",
  level: 58,
  hp: 155,
  types: ["grass", "poison"],
  weaknesses: [{ type: "fire", value: 30 }],
  resistances: [{ type: "water", value: 20 }],
};

const arcanine = {
  name: "Arcanine",
  level: 55,
  hp: 140,
  types: ["fire"],
  weaknesses: [{ type: "water", value: 30 }],
  resistances: [{ type: "grass", value: 30 }],
};
// console.log("charizard, machamp");
// console.log("FROM JS", generatePropBetsFromArray(charizard, machamp));
// console.log("arcanine, venusaur");
// console.log(generatePropBets(arcanine, venusaur));
// console.log("alakazam, blastoise");
// console.log(generatePropBets(alakazam, blastoise));
// console.log("charizard, machamp");
// console.log(generatePropBets(charizard, machamp));
// console.log("pikachu, venusaur");
// console.log(generatePropBets(pikachu, venusaur));
//OUTPUT
// harizard, blastoise
// {
//   moneyline: '+344',
//   spread: 'Charizard HP left: 33.5',
//   overUnder: 'O/U on HP Difference: 90.5'
// }
// arcanine, venusaur
// {
//   moneyline: '-318',
//   spread: 'Arcanine HP left: 106.5',
//   overUnder: 'O/U on HP Difference: 69.5'
// }
// alakazam, blastoise
// {
//   moneyline: '+132',
//   spread: 'Alakazam HP left: 43',
//   overUnder: 'O/U on HP Difference: 48'
// }
// charizard, machamp
// {
//   moneyline: '-112',
//   spread: 'Charizard HP left: 79.5',
//   overUnder: 'O/U on HP Difference: 18.5'
// }
// pikachu, venusaur
// {
//   moneyline: '+193',
//   spread: 'Pikachu HP left: 20.5',
//   overUnder: 'O/U on HP Difference: 81.5'
// }
export function generatePropBetsFromArray(pokemon1Array, pokemon2Array) {
  // Convert array to object for cleaner access
  function convertToPokemonObject(arr) {
    return {
      name: arr[0],
      imageUrl: arr[1],
      level: arr[2],
      hp: arr[3],
      types: arr[4] || [],
      weaknesses: arr[5] || [],
      resistances: arr[6] || [],
    };
  }

  const pokemon1 = convertToPokemonObject(pokemon1Array);
  const pokemon2 = convertToPokemonObject(pokemon2Array);

  const roundToHalf = (num) => (Math.round(num * 2) / 2).toFixed(1);

  function calculateStrength(pokemon, opponent) {
    const baseScore = pokemon.level * 2 + pokemon.hp;

    let offenseMod = 1.0;
    (pokemon.types || []).forEach((type) => {
      const weak = (opponent.weaknesses || []).find((w) => w.type === type);
      if (weak) offenseMod += weak.value / 100;

      const resist = (opponent.resistances || []).find((r) => r.type === type);
      if (resist) offenseMod -= resist.value / 100;
    });

    let defenseMod = 1.0;
    (opponent.types || []).forEach((type) => {
      const weak = (pokemon.weaknesses || []).find((w) => w.type === type);
      if (weak) defenseMod -= weak.value / 100;

      const resist = (pokemon.resistances || []).find((r) => r.type === type);
      if (resist) defenseMod += resist.value / 100;
    });

    return Math.max(baseScore * offenseMod * defenseMod, 1);
  }

  const score1 = calculateStrength(pokemon1, pokemon2);
  const score2 = calculateStrength(pokemon2, pokemon1);

  const total = score1 + score2;
  const winProb1 = score1 / total;
  const winProb2 = score2 / total;

  let moneyline;
  if (winProb1 > 0.5) {
    const odds = 100 * (winProb1 / (1 - winProb1));
    moneyline = `-${Math.floor(odds)}`;
  } else {
    const odds = 100 * ((1 - winProb1) / winProb1);
    moneyline = `+${Math.floor(odds)}`;
  }

  const expectedHp1 = parseFloat(roundToHalf(pokemon1.hp * winProb1));
  const expectedHp2 = pokemon2.hp * winProb2;
  const hpDiff = parseFloat(roundToHalf(Math.abs(expectedHp1 - expectedHp2)));

  return {
    moneyline,
    spread: expectedHp1.toString(),
    overUnder: hpDiff.toString(),
  };
}
