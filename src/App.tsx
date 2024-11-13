import { useState } from 'react';
import Card from './components/Card';
import { GameState, initializeGameState } from './Game';
import { createSpymasterPrompt } from './prompts/spymasterPrompt';

const handleSpymasterTest = async (gameState: GameState) => {
  const prompt = createSpymasterPrompt(gameState);
  try {
    const response = await fetch('/.netlify/functions/llm-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    });
    const data = await response.json();
    console.log('Spymaster response:', data);
  } catch (error) {
    console.error('Error testing spymaster:', error);
  }
};

export default function App() {
  const [gameState] = useState<GameState>(initializeGameState());

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-800 to-slate-600 p-4 flex items-center justify-center'>
      <div className='grid grid-cols-5 gap-4 max-w-3xl'>
        {gameState.cards.map((card, index) => (
          <Card
            key={index}
            word={card.word}
            color={card.color}
            isRevealed={card.isRevealed}
            isSpymasterView={gameState.currentRole === 'spymaster'}
          />
        ))}
        <button
          onClick={() => handleSpymasterTest(gameState)}
          className='absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Test Spymaster
        </button>
      </div>
    </div>
  );
}
