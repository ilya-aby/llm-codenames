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

// Game state
export type GameState = {
  cards: CardType[];
  currentTeam: TeamColor;
  currentRole: Role;
  remainingRed: number;
  remainingBlue: number;
  currentClue?: {
    word: string;
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
