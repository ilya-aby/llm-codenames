import { Loader2, Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Card from './components/Card';
import { Chat } from './components/Chat';
import { Scoreboard } from './components/Scoreboard';
import {
  GameState,
  initializeGameState,
  OperativeMove,
  SpymasterMove,
  updateGameStateFromOperativeMove,
  updateGameStateFromSpymasterMove,
} from './utils/game';
import { createMessagesFromGameState, fetchLLMResponse } from './utils/llm';

type AppState = 'game_start' | 'ready_for_turn' | 'waiting_for_response' | 'error' | 'game_over';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(initializeGameState());
  const [appState, setAppState] = useState<AppState>('game_start');
  const [isGamePaused, setIsGamePaused] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const data = await fetchLLMResponse({
          messages: createMessagesFromGameState(gameState),
          modelName:
            gameState.agents[gameState.currentTeam][gameState.currentRole].openrouter_model_id,
          referer: 'https://llmcodenames.com',
          title: 'LLM Codenames',
        });
        if (gameState.currentRole === 'spymaster') {
          setGameState(updateGameStateFromSpymasterMove(gameState, data as SpymasterMove));
        } else {
          setGameState(updateGameStateFromOperativeMove(gameState, data as OperativeMove));
        }
        setAppState('ready_for_turn');
      } catch (error) {
        console.error('Error in fetchResponse:', error);
        setAppState('error');
        setIsGamePaused(true);
      }
    };
    if (isGamePaused) {
      return;
    }
    if (gameState.gameWinner) {
      setIsGamePaused(true);
      setAppState('game_over');
    } else if (appState === 'ready_for_turn') {
      setAppState('waiting_for_response');
      fetchResponse();
    } else if (appState === 'game_start') {
      setAppState('ready_for_turn');
    }
  }, [appState, gameState, isGamePaused]);

  // Handle scrolling to the bottom of the chat history as chats stream in
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [gameState, appState]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-around gap-2 bg-gradient-to-br from-slate-800 to-slate-600 antialiased lg:flex-row'>
      {/* Left panel: Scoreboard + Game Board + Game Controls */}
      <div className='flex w-full flex-col items-center gap-y-6 sm:mt-4 lg:w-2/3 lg:gap-y-8'>
        {appState === 'error' && (
          <div className='fixed left-4 top-4 z-50 rounded-md bg-red-500 px-4 py-2 text-white shadow-lg'>
            An error occurred. Please reload the game.
          </div>
        )}

        {/* Scoreboard */}
        <Scoreboard gameState={gameState} />

        {/* Game board */}
        <div className='flex flex-col items-center justify-center'>
          <div className='grid w-full max-w-3xl grid-cols-5 gap-0.5 p-2 sm:gap-2 md:gap-4'>
            {gameState.cards.map((card, index) => (
              <Card
                key={index}
                word={card.word}
                color={card.color}
                isRevealed={card.isRevealed}
                wasRecentlyRevealed={card.wasRecentlyRevealed}
                isSpymasterView={true}
              />
            ))}
          </div>
        </div>

        {/* Start/Pause game button */}
        <button
          onClick={() => {
            if (appState === 'game_over' || appState === 'error') {
              setGameState(initializeGameState());
              setAppState('game_start');
            }
            setIsGamePaused(!isGamePaused);
          }}
          className='mb-6 flex w-36 items-center justify-center gap-2 rounded bg-slate-200 px-2 py-2 font-bold text-slate-800 hover:bg-slate-300'
        >
          {appState === 'game_start' || appState === 'game_over' || appState === 'error' ?
            <>
              <Play className='inline size-4' /> New Game
            </>
          : isGamePaused ?
            <>
              <Play className='inline size-4' /> Continue
            </>
          : <>
              <Pause className='inline size-4' /> Pause
            </>
          }
        </button>
      </div>

      {/* Right panel: Chat history */}
      <div
        ref={chatContainerRef}
        className='relative w-full max-w-4xl bg-slate-800/50 p-2 backdrop-blur-sm md:h-screen md:overflow-y-auto lg:w-1/3 lg:border-l lg:border-slate-500/30'
      >
        {gameState.chatHistory.map((message, index) => (
          <Chat key={index} {...message} />
        ))}
        {appState === 'game_over' && (
          <div className='flex w-full justify-center p-2 font-semibold tracking-wide'>
            <div
              className={`text-${gameState.gameWinner === 'red' ? 'rose' : 'sky'}-500 text-base`}
            >
              {gameState.gameWinner === 'red' ? 'Red' : 'Blue'} team wins.
            </div>
          </div>
        )}
        {/* Spinner & Pause indicator */}
        {appState === 'waiting_for_response' && (
          <div className='sticky flex w-full justify-end p-2'>
            <Loader2 className='animate-spin text-slate-200' />
          </div>
        )}
        {isGamePaused && appState === 'ready_for_turn' && (
          <div className='sticky flex w-full justify-end p-2'>
            <Pause className='text-slate-200' />
          </div>
        )}
      </div>
    </div>
  );
}
