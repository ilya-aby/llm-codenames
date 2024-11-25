import { GameState } from '../Game';
import { colorizeMessage } from '../utils/colors';
import { ModelPill } from './ModelPill';

export function Scoreboard({ gameState }: { gameState: GameState }) {
  return (
    <div className='flex flex-col rounded-lg border border-slate-500/30 bg-slate-600/50 shadow-2xl backdrop-blur-md'>
      <div className='flex items-center gap-5 px-5 py-4'>
        {/* Red Team */}
        <div className='flex gap-2'>
          <ModelPill model={gameState.agents.red.spymaster} teamColor='red' />
          <ModelPill model={gameState.agents.red.operative} teamColor='red' />
        </div>

        {/* Score */}
        <div className='relative flex items-center justify-center gap-5'>
          <div
            className={`text-mono text-lg font-bold ${
              gameState.gameWinner === 'blue' ? 'text-slate-400' : 'text-slate-200'
            }`}
          >
            {9 - gameState.remainingRed}
          </div>
          {gameState.gameWinner === 'red' && (
            <div className='absolute -left-3 text-slate-200'>⏵</div>
          )}
          <div
            className={`text-mono text-lg font-bold ${
              gameState.gameWinner === 'red' ? 'text-slate-400' : 'text-slate-200'
            }`}
          >
            {8 - gameState.remainingBlue}
          </div>
          {gameState.gameWinner === 'blue' && (
            <div className='absolute -right-3 text-slate-200'>⏴</div>
          )}
        </div>

        {/* Blue Team */}
        <div className='flex gap-2'>
          <ModelPill model={gameState.agents.blue.spymaster} teamColor='blue' />
          <ModelPill model={gameState.agents.blue.operative} teamColor='blue' />
        </div>
      </div>
      {/* Status Message */}
      {gameState.statusMessage && (
        <div className='rounded-b-lg bg-neutral-300/90 px-5 py-1.5 text-center text-sm font-bold text-slate-900'>
          {colorizeMessage(gameState.statusMessage, gameState.cards)}
        </div>
      )}
    </div>
  );
}
