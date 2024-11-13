import { useState } from 'react';
import Card from './components/Card';
import { Chat, ChatMessage } from './components/Chat';
import { GameState, initializeGameState } from './Game';
import { createSpymasterPrompt } from './prompts/spymasterPrompt';

const handleSpymasterTest = async (
  gameState: GameState,
  addChatMessage: (message: ChatMessage) => void
) => {
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
    addChatMessage({
      message: data.reasoning,
      name: 'Red Spymaster (ChatGPT 4o-mini)',
      initials: '4om',
      team: 'red',
    });
    // addChatMessage({
    //   message: data.clue + ' ' + data.number,
    //   name: 'Red Spymaster (ChatGPT 4o-mini)',
    //   initials: '4om',
    //   team: 'red',
    // });
  } catch (error) {
    console.error('Error testing spymaster:', error);
  }
};

export default function App() {
  const [gameState] = useState<GameState>(initializeGameState());
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const addChatMessage = (message: ChatMessage) => {
    setChatHistory((prev) => [...prev, message]);
  };

  return (
    <div className='min-h-screen flex flex-col gap-2 items-center justify-around bg-gradient-to-br from-slate-800 to-slate-600 p-1 lg:flex-row sm:px-4'>
      {/* Game board */}
      <div className='w-full h-1/2 grid grid-cols-5 gap-2 max-w-4xl lg:w-2/3 md:gap-4'>
        {gameState.cards.map((card, index) => (
          <Card
            key={index}
            word={card.word}
            color={card.color}
            isRevealed={card.isRevealed}
            isSpymasterView={gameState.currentRole === 'spymaster'}
          />
        ))}
      </div>
      {/* Chat history */}
      <div className='w-full h-screen max-w-4xl self-start lg:w-1/3 lg:border-l lg:border-slate-200 lg:pl-4 lg:ml-4 py-2'>
        {chatHistory.map((message, index) => (
          <Chat key={index} {...message} />
        ))}
      </div>
      <button
        onClick={() => handleSpymasterTest(gameState, addChatMessage)}
        className='absolute bottom-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Test Spymaster
      </button>
    </div>
  );
}
