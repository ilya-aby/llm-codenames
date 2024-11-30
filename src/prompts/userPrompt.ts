import { GameState } from '../utils/game';

export const createUserPrompt = (gameState: GameState): string => `
### Current Game State
Your Team: ${gameState.currentTeam}
Your Role: ${gameState.currentRole}
Red Cards Left to Guess: ${gameState.remainingRed}
Blue Cards Left to Guess: ${gameState.remainingBlue}

Board: ${JSON.stringify(
  gameState.currentRole === 'spymaster' ?
    gameState.cards
  : gameState.cards.map((card) => ({
      word: card.word,
      isRevealed: card.isRevealed,
      color: card.isRevealed ? card.color : undefined,
    })),
)}

${
  gameState.currentRole === 'operative' && gameState.currentClue ?
    `
  Your Clue: ${gameState.currentClue.clueText}
  Number: ${gameState.currentClue.number}
  `
  : ''
}
`;
