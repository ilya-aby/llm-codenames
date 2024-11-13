import { useEffect, useRef, useState } from 'react';
import Card from './components/Card';
import { Chat } from './components/Chat';
import {
  GameState,
  initializeGameState,
  updateGameStateFromOperativeMove,
  updateGameStateFromSpymasterMove,
} from './Game';
import { createRolePrompt } from './prompts/rolePrompt';

type AppState = 'paused' | 'ready_for_turn' | 'waiting_for_response' | 'error' | 'game_over';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(initializeGameState());
  const [appState, setAppState] = useState<AppState>('paused');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResponse = async () => {
      const prompt = createRolePrompt(gameState);
      console.log('Prompt:', prompt);
      try {
        // Add 5 second delay before making the request
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const response = await fetch('/.netlify/functions/llm-proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: prompt }),
        });
        const data = await response.json();
        console.log('Response:', data);

        if (gameState.currentRole === 'spymaster') {
          setGameState(updateGameStateFromSpymasterMove(gameState, data));
        } else {
          setGameState(updateGameStateFromOperativeMove(gameState, data));
        }
        setAppState('ready_for_turn');
      } catch (error) {
        console.error('Error fetching response:', error);
        setAppState('error');
      }
    };
    if (gameState.gameWinner) {
      setAppState('game_over');
    } else if (appState === 'ready_for_turn') {
      setAppState('waiting_for_response');
      fetchResponse();
    }
  }, [appState, gameState]);

  // Handle scrolling to the bottom of the chat history as chats stream in
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [gameState]);

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
            isSpymasterView={true} // Temporarily locking to see if more interesting this way
          />
        ))}
      </div>
      {/* Chat history */}
      <div
        ref={chatContainerRef}
        className='w-full h-screen max-w-4xl self-start lg:w-1/3 lg:border-l lg:border-slate-500/30 lg:pl-4 lg:ml-4 py-2 overflow-y-auto'
      >
        {gameState.chatHistory.map((message, index) => (
          <Chat key={index} {...message} />
        ))}
      </div>
      <button
        onClick={() =>
          setAppState((current) => (current === 'paused' ? 'ready_for_turn' : 'paused'))
        }
        className='absolute bottom-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        {appState === 'paused' ? 'Start Game' : 'Pause Game'}
      </button>
    </div>
  );
}
