import wordlist from './assets/wordlist-eng.txt?raw';

// Core types
export type TeamColor = 'red' | 'blue';
export type CardColor = 'red' | 'blue' | 'black' | 'neutral';
export type Role = 'spymaster' | 'operative';

export type CardType = {
  word: string;
  color: CardColor;
  isRevealed: boolean;
};

export type SpymasterResponse = {
  clue: string;
  number: number;
  reasoning: string;
};

export type OperativeResponse = {
  guesses: string[];
  reasoning: string;
};

export type AIResponse = SpymasterResponse | OperativeResponse;

// Game state
export type GameState = {
  cards: CardType[];
  currentTeam: TeamColor;
  currentRole: Role;
  remainingRed: number;
  remainingBlue: number;
  currentClue?: {
    clueText: string;
    number: number;
  };
};

// Initialize new game state
export const initializeGameState = (): GameState => {
  return {
    cards: drawNewCards(),
    currentTeam: 'red',
    currentRole: 'spymaster',
    remainingRed: 9,
    remainingBlue: 8,
  };
};

export const drawNewCards = (): CardType[] => {
  const allWords = wordlist.split('\n').filter((word) => word.trim() !== '');
  const gameCards: CardType[] = [];

  // Randomly select 25 words
  const selectedWords = [];
  const tempWords = [...allWords];
  for (let i = 0; i < 25; i++) {
    const randomIndex = Math.floor(Math.random() * tempWords.length);
    selectedWords.push(tempWords[randomIndex]);
    tempWords.splice(randomIndex, 1);
  }

  // Team assignment counts for randomization
  const teams: CardColor[] = [
    ...Array(9).fill('red'),
    ...Array(8).fill('blue'),
    ...Array(1).fill('black'),
    ...Array(7).fill('neutral'),
  ];

  // Randomly assign teams to words
  selectedWords.forEach((word) => {
    const randomIndex = Math.floor(Math.random() * teams.length);
    gameCards.push({
      word,
      color: teams[randomIndex],
      isRevealed: false,
    });
    teams.splice(randomIndex, 1);
  });

  return gameCards;
};

export function updateGameState(currentState: GameState, aiResponse: AIResponse): GameState {
  const newState = { ...currentState };

  if (currentState.currentRole === 'spymaster') {
    newState.currentClue = {
      clueText: (aiResponse as SpymasterResponse).clue,
      number: (aiResponse as SpymasterResponse).number,
    };
    newState.currentRole = 'operative';
  } else {
    // TODO: Implement guessing logic
    // const guesses = (aiResponse as OperativeResponse).guesses;
    // guesses.forEach((guess) => {
    //   const card = newState.cards.find(
    //     (card) => card.word.toUpperCase() === guess.toUpperCase()
    //   );
    //   if (card) {
    //     card.isRevealed = true;
    //   }
    // });
    newState.currentRole = 'spymaster';
    newState.currentTeam = currentState.currentTeam === 'red' ? 'blue' : 'red';
  }

  // Update relevant game state properties
  // For example:
  // - Mark cards as revealed
  // - Switch teams
  // - Switch roles
  // - Update score

  return newState;
}
