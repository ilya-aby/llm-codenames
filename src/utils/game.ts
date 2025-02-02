import wordlist from '../assets/wordlist-eng.txt?raw';
import { ChatMessage } from '../components/Chat';
import { agents, LLMModel } from './models';
// Core types
export type TeamColor = 'red' | 'blue';
export type CardColor = 'red' | 'blue' | 'black' | 'neutral';
export type Role = 'spymaster' | 'operative';
export type PlayerType = 'human' | 'ai';

export type CardType = {
  word: string;
  color: CardColor;
  isRevealed: boolean;
  wasRecentlyRevealed: boolean;
  selectedTimestamp?: number;
};

export type SpymasterMove = {
  clue: string;
  number: number;
  reasoning: string;
};

export type OperativeMove = {
  guesses: string[];
  reasoning: string;
};

// Nested object type for team agents to track which LLM model is being used for each role
export type TeamAgents = {
  [key in Role]: {
    model: PlayerType extends 'human' ? null : LLMModel;
    type: PlayerType;
  };
};

export type GameAgents = {
  [key in TeamColor]: TeamAgents;
};

// Game state
export type GameState = {
  agents: GameAgents;
  cards: CardType[];
  chatHistory: ChatMessage[];
  currentTeam: TeamColor;
  currentRole: Role;
  previousTeam?: TeamColor;
  previousRole?: Role;
  remainingRed: number;
  remainingBlue: number;
  currentClue?: {
    clueText: string;
    number: number;
  };
  currentGuesses?: string[];
  gameWinner?: TeamColor;
};

// Initialize new game state
export const initializeGameState = (): GameState => {
  return {
    cards: drawNewCards(),
    agents: selectRandomAgents(),
    currentTeam: 'red',
    currentRole: 'spymaster',
    remainingRed: 9,
    remainingBlue: 8,
    chatHistory: [],
  };
};

// Add this function to allow setting up custom team configurations
export const initializeGameStateWithPlayers = (
  redSpymaster: 'human' | 'ai',
  redOperative: 'human' | 'ai',
  _blueSpymaster: 'ai',
  _blueOperative: 'ai'
): GameState => {
  const availableAgents = [...agents];
  
  const pickAgent = (type: PlayerType, isOperative: boolean): TeamAgents[Role] => {
    if (type === 'human') {
      return {
        model: null!,
        type: 'human' as const
      };
    }
    // For AI players
    if (isOperative) {
      return {
        model: agents[0],
        type: 'ai' as const
      };
    }
    // For AI spymasters, pick randomly from remaining agents
    const randomIndex = Math.floor(Math.random() * availableAgents.length);
    return {
      model: availableAgents.splice(randomIndex, 1)[0],
      type: 'ai' as const
    };
  };

  return {
    cards: drawNewCards(),
    agents: {
      red: {
        spymaster: pickAgent(redSpymaster, false),
        operative: pickAgent(redOperative, true),
      },
      blue: {
        spymaster: pickAgent('ai', false),
        operative: pickAgent('ai', true),
      },
    },
    currentTeam: 'red',
    currentRole: 'spymaster',
    remainingRed: 9,
    remainingBlue: 8,
    chatHistory: [],
  };
};

const drawNewCards = (): CardType[] => {
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
      wasRecentlyRevealed: false,
      selectedTimestamp: undefined,
    });
    teams.splice(randomIndex, 1);
  });

  return gameCards;
};

// Select four random agents to form the two teams
// More agents can be added by editing the `agents` array in `constants/models.ts`
const selectRandomAgents = (): GameAgents => {
  return {
    red: {
      spymaster: {
        model: agents[0],
        type: 'ai' as const
      },
      operative: {
        model: agents[1],
        type: 'ai' as const
      },
    },
    blue: {
      spymaster: {
        model: agents[2],
        type: 'ai' as const
      },
      operative: {
        model: agents[3],
        type: 'ai' as const
      },
    },
  };
};

const resetAnimations = (cards: CardType[]) => {
  cards.forEach((card) => {
    card.wasRecentlyRevealed = false;
  });
};

// Set the guess properties and switch to operative role
export function updateGameStateFromSpymasterMove(
  currentState: GameState,
  move: SpymasterMove,
): GameState {
  const newState = { ...currentState };
  newState.currentClue = {
    clueText: move.clue.toUpperCase(),
    number: move.number,
  };
  newState.chatHistory.push({
    message: move.reasoning + '\n\nClue: ' + move.clue.toUpperCase() + ', ' + move.number,
    model: currentState.agents[currentState.currentTeam].spymaster.model,
    team: currentState.currentTeam,
    cards: currentState.cards,
    hideReasoning: currentState.agents[currentState.currentTeam].operative.type === 'human'
  });
  newState.currentRole = 'operative';
  newState.currentGuesses = undefined;
  newState.previousRole = currentState.currentRole;
  newState.previousTeam = currentState.currentTeam;
  return newState;
}

// Make guesses and switch to spymaster role
export function updateGameStateFromOperativeMove(
  currentState: GameState,
  move: OperativeMove,
): GameState {
  const newState = structuredClone(currentState);
  
  // Reset all selection timestamps when submitting
  newState.cards.forEach(card => {
    card.selectedTimestamp = undefined;
  });
  
  newState.chatHistory.push({
    message: move.reasoning + '\n\nGuesses: ' + move.guesses.join(', '),
    model: currentState.agents[currentState.currentTeam].operative.model,
    team: currentState.currentTeam,
    cards: currentState.cards,
    hideReasoning: false
  });

  // Reset recently revealed cards
  resetAnimations(newState.cards);

  newState.currentGuesses = move.guesses;

  // Validate all guesses first
  const guessedCards = move.guesses.map(guess => {
    const card = newState.cards.find((card) => card.word.toUpperCase() === guess.toUpperCase());
    if (!card || card.isRevealed) {
      console.error(`INVALID GUESS: ${guess}`);
      return null;
    }
    return card;
  }).filter((card): card is CardType => card !== null);

  // Process all valid guesses
  let shouldEndTurn = false;
  for (const card of guessedCards) {
    card.isRevealed = true;
    card.wasRecentlyRevealed = true;

    newState.previousRole = currentState.currentRole;
    newState.previousTeam = currentState.currentTeam;

    // Assassin card instantly loses the game
    if (card.color === 'black') {
      newState.gameWinner = currentState.currentTeam === 'red' ? 'blue' : 'red';
      resetAnimations(newState.cards);
      return newState;
    }

    // Decrement the count of remaining cards for the team
    if (card.color === 'red') {
      newState.remainingRed--;
      if (newState.remainingRed === 0) {
        newState.gameWinner = 'red';
        return newState;
      }
    } else if (card.color === 'blue') {
      newState.remainingBlue--;
      if (newState.remainingBlue === 0) {
        newState.gameWinner = 'blue';
        resetAnimations(newState.cards);
        return newState;
      }
    }

    // If we guessed a card that isn't our team's color, mark to end turn
    if (card.color !== currentState.currentTeam) {
      shouldEndTurn = true;
    }
  }

  // End turn if we guessed wrong or if we're done guessing
  if (shouldEndTurn || guessedCards.length >= ((currentState.currentClue?.number || 0) + 1)) {
    newState.currentRole = 'spymaster';
    newState.currentTeam = currentState.currentTeam === 'red' ? 'blue' : 'red';
    newState.currentClue = undefined;
  }

  return newState;
}
