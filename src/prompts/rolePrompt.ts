import { GameState } from '../Game';
import { basePrompt } from './basePrompt';

export const createRolePrompt = (gameState: GameState): string => `
${basePrompt}

### Current Game State
Your Team: ${gameState.currentTeam}
Your Role: ${gameState.currentRole}
Red Cards Left to Guess: ${gameState.remainingRed}
Blue Cards Left to Guess: ${gameState.remainingBlue}

Board: ${JSON.stringify(
  gameState.currentRole === 'spymaster'
    ? gameState.cards
    : gameState.cards.map((card) => ({
        word: card.word,
        isRevealed: card.isRevealed,
        color: card.isRevealed ? card.color : undefined,
      }))
)}

${
  gameState.currentRole === 'operative' && gameState.currentClue
    ? `
  Your Clue: ${gameState.currentClue.clueText}
  Number: ${gameState.currentClue.number}
  `
    : ''
}

${
  gameState.currentRole === 'spymaster'
    ? `
### Output Format
In addition to the clue and number as described above, you should also include a reasoning string that explains your thought process for choosing the clue and number.
This will not be shown to the field operative but will help you improve your strategy.
The string should be plaintext, not markdown.
Reason about why you chose the clue and number you did, what cards you're hoping to get your field operative to guess, and any other considerations you took into account.
Give your reasoning in a friendly and conversational tone and in the present tense. For example, "Ok, I see a good grouping of sports-related words, but I'm concerned that the operative might guess SPIKE, which is the assassin, so I'll try a movie reference instead and try for a smaller number."

Remember to follow the clue format rules described above. Most importantly, the clue cannot contain any words in the grid or be a substing/superset of any words in the grid.
And it must be a SINGLE WORD unless it's a proper noun. Your clue CANNOT just be a word that is on a card in the grid - that is an invalid clue.

Return a valid JSON object with the following structure:
{
  "clue": "string",
  "number": "number",
  "reasoning": "string"
}

Your response will be parsed as JSON, so make sure you ONLY return a JSON object and nothing else.
`
    : `
### Output Format
Based on the clue and number given by your Spymaster, you should return a list of words from the board that you want to guess.
You do not have to guess all of the words that your Spymaster gave you a clue for.
Only guess words that have not already been revealed.
Return the list of words in the order you want to guess them, separated by commas in the array as shown below.
Order them by how confident you are that they are the correct words to guess.
For example, if you're given the clue "SEASON, 4", you might guess ["WINTER", "SPRING", "PEPPER"] because you're
confident that WINTER and SPRING are correct but PEPPER might not be. And you only want to guess 3 words because you couldn't find
a fourth word that was obviously related to the clue and didn't want to risk guessing a word that was wrong.

In addition to the guess list, you should also include a reasoning string that explains your thought process for choosing the words you did.
Reason about how you made sense of the board given the clue and number, and any other considerations you took into account.
This string should be plaintext, not markdown.
Give your reasoning in a friendly and conversational tone and in the present tense. For example, given the clue "ARCHITECTURE, 3":
"I see a few plausible architecture-related words. I'm very confident in BRIDGE and SPAN. I'm less sure about what the third could be. 
EMBASSY is a bit of a reach because embassies have fancy architecture. But we're behind and I'll take the risk. So I'll guess BRIDGE, SPAN, EMBASSY."

Return a valid JSON object with the following structure:
{
  "guesses": ["string"],
  "reasoning": "string"
}

Your response will be parsed as JSON, so make sure you ONLY return a JSON object and nothing else.
`
}`;
