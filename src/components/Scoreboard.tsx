import { colorizeMessage } from '../utils/colors';
import { GameState } from '../utils/game';
import { ModelPill } from './ModelPill';

export function Scoreboard({ gameState }: { gameState: GameState }) {
  return (
    <div className='mt-4 flex flex-col rounded-lg border border-slate-500/30 bg-slate-600/50 shadow-2xl backdrop-blur-md sm:mt-0'>
      <div className='flex items-center gap-5 px-5 py-4'>
        {/* Red Team */}
        <div className='flex flex-col items-end gap-2 sm:flex-row sm:items-center'>
          <ModelPill
            agent={gameState.agents.red.spymaster}
            teamColor='red'
            isActive={gameState.previousTeam === 'red' && gameState.previousRole === 'spymaster'}
          />
          <ModelPill
            agent={gameState.agents.red.operative}
            teamColor='red'
            isActive={gameState.previousTeam === 'red' && gameState.previousRole === 'operative'}
          />
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
          {/* "Final" label */}
          {gameState.gameWinner && (
            <div className='absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-200'>
              FINAL
            </div>
          )}
        </div>

        {/* Blue Team */}
        <div className='flex flex-col gap-2 sm:flex-row'>
          <ModelPill
            agent={gameState.agents.blue.spymaster}
            teamColor='blue'
            isActive={gameState.previousTeam === 'blue' && gameState.previousRole === 'spymaster'}
          />
          <ModelPill
            agent={gameState.agents.blue.operative}
            teamColor='blue'
            isActive={gameState.previousTeam === 'blue' && gameState.previousRole === 'operative'}
          />
        </div>
      </div>
      {/* Status Message */}
      {gameState.currentClue && (
        <div className='rounded-b-lg bg-neutral-300/90 px-5 py-2 text-center text-sm font-bold text-slate-900'>
          <span>
            {gameState.currentClue.clueText}, {gameState.currentClue.number}
          </span>
          {gameState.currentGuesses && (
            <span className='ml-1.5'>
              {colorizeMessage(gameState.currentGuesses.join(' '), gameState.cards)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
