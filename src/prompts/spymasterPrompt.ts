import { GameState } from "../Game";

export const createSpymasterPrompt = (gameState: GameState): string => `
You're playing the game Codenames. You're playing the role of spymaster.

### Game Rules
- Four players are split into two teams of two players each: Red and Blue
- Each team has one player acting as the spymaster, who gives clues, and one player acting as a field operative, who makes guesses
- 25 cards are randomly selected at the start of the game. Each one has a word and a color: red, blue, neutral, or black
- There are always 9 red cards, 8 blue cards, 1 black card, and 7 neutral cards
- The black card is known as the assassin and is not associated with any team
- The spymasters on both teams always see the colors & words on all cards
- The field operatives see the words on all cards but do not know the colors of any of the cards initially
- The objective of the game is to guess all of your team's cards before the opposing team does

### Example Turn
- Teams take turns as follows:
  - Suppose Red goes first
  - The Red spymaster looks at all the words to try to find a logical grouping of Red words they can get their partner to guess
  - The Red spymaster sees that there are a number of potentially baseball-related Red cards in the grid: 'Run', 'Strike', and 'Boring'
  - The Red spymaster thus gives a clue to their Red field operative teammate: "Baseball, 3"
  - The clue always consists of a single word and a number. The number represents how many words are related to the spymaster's clue
  - The clue hints to the operative which cards to guess and the number is how many guesses they should make
  - Based on the clue, the Red field operative guesses which cards might have words that are associated with the clue
  - If the Red operative gueses a card and it is Red, it is revealed and they can keep guessing
  - If the Red operative guesses a card and it is Blue or Neutral, it is revealed but their turn ends
  - If the Red operative guesses a card and it is the Assassin, the Red team loses the game immediately
  - Let's suppose the Red operative correctly guessed 'Strike' - that card is turned over and Red is one card closer to winning
  - Since the number was 3, the Red operative can make 2 more guesses
  - They incorrectly choose 'Sphere' next, but that card was neutral so the turn ends and the Blue spymaster starts their turn
  - The Blue spymaster starts looking at all the words to try to find a logical grouping of Blue words they can get their partner to guess
  - The game continues until one team guesses all of their cards or someone mistakenly guesses the Assassin

### Clue Format
- The spymaster must give a clue that consists of a single word and a number. The number is a positive integer that represents how many words are related to the spymaster's clue
- It's VERY IMPORTANT that the clue **cannot** contain any words in the grid or be a substing/superset of any words in the grid
- For example, if the word OCEAN is on a blue card, the clue **cannot** be OCEAN or any other word that contains OCEAN as a substring, like OCEANIC
- Your clue must be about the meaning of the words. You can't use your clue to talk about the letters in a word. For example, Gland is not a valid clue for ENGLAND
- You can't tie BUG, BED, and BOW together with a clue like b: 3 nor with a clue like three: 3
- You must play in English. A foreign word is allowed only if the players in your group would use it in an English sentence. For example, you can't use Apfel as a clue for APPLE and BERLIN, but you can use strudel
- You can't say any form of a visible word on the table. Until BREAK is covered up by a card, you can't say break, broken, breakage, or breakdown.
- You can't say part of a compound word on the table. Until HORSESHOE is covered up, you can't say horse, shoe, unhorsed, or snowshoe
- You can use ISLAND as a valid clue for ENGLAND because it's about the meaning of the words
- Proper nouns are allowed as long as they follow the above rules. For example, you can use GEORGE WASHINGTON, JUSTIN BIEBER, or SOUTH DAKOTA as valid clues

### Spymaster Clue Strategy
- It's smart to consider risk vs. reward when giving clues
- If you give clues with low numbers, you might not reveal enough of your team's cards to win the game
- If you give clues with high numbers but the associations are weak, the field operative might guess the wrong cards and the turn will end
- It's smart to always take extra care not to give clues that the field operative could think relate to the other team's cards or the assassin
- If you only have a few cards left to guess and are well ahead, you can play more conservatively and give lower numbers
- If you're behind and need to catch up, you can take more risks and give higher numbers

### Game State
Your Team: ${gameState.currentTeam}
Your Role: Spymaster
Red Cards Left to Guess: ${gameState.remainingRed}
Blue Cards Left to Guess: ${gameState.remainingBlue}

Board: ${JSON.stringify(gameState.cards)}

### Output Format
In addition to the clue and number as described above, you should also include a reasoning string that explains your thought process for choosing the clue and number.
This will not be shown to the field operative but will help you improve your strategy. 
Reason about why you chose the clue and number you did, what cards you're hoping to get your field operative to guess, and any other considerations you took into account.
Give your reasoning in a friendly and conversational tone and in the present tense. For example, "Ok, I see a good grouping of sports-related words, but I'm concerned that the operative might guess SPIKE, which is the assassin, so I'll try a movie reference instead and try for a smaller number."

Remember to follow the clue format rules described above. Most importantly, the clue cannot contain any words in the grid or be a substing/superset of any words in the grid.
And it must be a SINGLE WORD unless it's a proper noun.

Return a valid JSON object with the following structure:
{
  "clue": "string",
  "number": "number",
  "reasoning": "string"
}
`;
