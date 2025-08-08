import OpenAI from "openai";
import { useState } from "react";

export const ChatGPT = ({
  playerCard,
  enemyCard,
  playerBets,
  units,
  setOpenPopup,
  responseFromGPT,
  setResponseFromGPT,
}) => {
  const openai = new OpenAI({
    apiKey:
      "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",
    dangerouslyAllowBrowser: true,
  });

  function startBattle(playerPokemon, enemyPokemon) {
    console.log("ASKING CHAT...");
    console.log(
      "make the best parlay based on the following picks",
      playerPokemon[0] + " VS. " + enemyPokemon[0]
    );

    const resultString =
      'Some battle text here { "winner": "Blastoise", "winnerHP": 63, "loser": "Charizard", "loserHP": 0 }';

    // return;
    const response = openai.responses.create({
      model: "gpt-4o-mini",
      input:
        "Simulate a battle script between these two pokemon objects, refering to them by their names found at the property .name." +
        playerPokemon +
        enemyPokemon +
        ". the battle sequence should refer to their specific abilities, make a note of how much damage was dealt and how much HP the opponent has remaining after each turn, and should end by declaring a winner at the end of the battle. Do not return any objects other than the final winner object. The format for this output should be an object as follows: {winner:<winner name>, winnerHP: <HP of the winner after the battle is over>, loser:<loser name>, loserHP: <HP of the loser after the battle is over>}. Your final output should look something like this 1. first move\n 2. second move\n 3. third move etc... {winner:_ winnerHP:_ loser:_ loserHP:_}",
      store: true,
    });

    response.then((result) => {
      // console.log(result.output_text);
      // return;
      const jsonStartIndex = result.output_text.indexOf("{");
      const jsonEndIndex = result.output_text.indexOf("}");
      const battleScript = result.output_text
        .substring(0, jsonStartIndex)
        .trim();
      const jsonString = result.output_text.substring(
        jsonStartIndex,
        jsonEndIndex + 1
      );
      const battleResult = jsonString;
      setResponseFromGPT(
        playerPokemon[0] + " VS. " + enemyPokemon[0] + "\n" + battleScript
      );
      console.log("BATTLE RESULTS:", battleResult);
    });
  }

  return (
    <>
      <button
        className="btn primary"
        onClick={() => {
          setOpenPopup(true);
          console.log("PLAYER BETS:", playerBets);
          setResponseFromGPT(
            `BATTLE STARTED, Wager: ${units}, Prop bets placed:` +
              `Moneyline:${playerBets[0] ? " YES" : " No Bet Placed"}, O/U: ${
                playerBets[1] == "null"
                  ? " No Bet Placed"
                  : playerBets[1] == "under"
                  ? " UNDER"
                  : " OVER"
              }, To Cover Spread? ${
                playerBets[2] == "null"
                  ? " No Bet Placed"
                  : playerBets[1] == "less-than"
                  ? " NO"
                  : " YES"
              }`
          );
          startBattle(playerCard, enemyCard);
        }}
      >
        BATTLE
      </button>
    </>
  );
};
