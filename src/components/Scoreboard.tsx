import { GameState } from '../Game';

export function Scoreboard({ gameState }: { gameState: GameState }) {
  return (
    <div className='flex flex-col items-end rounded-lg border border-slate-500/30 bg-slate-600/50 px-5 py-2'>
      <div className='flex relative gap-6'>
        <div className='text-red-500'>
          {gameState.agents.red.spymaster.short_name} + {gameState.agents.red.operative.short_name}
        </div>
        <div
          className={`text-mono font-bold ${
            gameState.gameWinner === 'blue' ? 'text-slate-400' : 'text-slate-200'
          }`}
        >
          {9 - gameState.remainingRed}
        </div>
        {gameState.gameWinner === 'red' && (
          <div className='absolute -right-3 text-slate-200'>⏴</div>
        )}
      </div>
      <div className='flex relative gap-6'>
        <div className='text-blue-500'>
          {gameState.agents.blue.spymaster.short_name} +{' '}
          {gameState.agents.blue.operative.short_name}
        </div>
        <div
          className={`text-mono font-bold ${
            gameState.gameWinner === 'red' ? 'text-slate-400' : 'text-slate-200'
          }`}
        >
          {8 - gameState.remainingBlue}
        </div>
        {gameState.gameWinner === 'blue' && (
          <div className='absolute -right-3 text-slate-200'>⏴</div>
        )}
      </div>
    </div>
  );
}
