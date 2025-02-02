import { useState } from 'react';
import { Role, TeamColor } from '../utils/game';

interface TeamSelectorProps {
  onStart: (players: {
    red: { spymaster: 'human' | 'ai'; operative: 'human' | 'ai' };
    blue: { spymaster: 'ai'; operative: 'ai' };
  }) => void;
}

export function TeamSelector({ onStart }: TeamSelectorProps) {
  // We'll only track the red team role since blue team must be all AI
  const [humanRole, setHumanRole] = useState<Role>('operative');

  const players = {
    red: {
      spymaster: humanRole === 'spymaster' ? 'human' : 'ai',
      operative: humanRole === 'operative' ? 'human' : 'ai',
    },
    blue: {
      spymaster: 'ai',
      operative: 'ai',
    },
  } as const;

  return (
    <div className="p-6 bg-slate-700 rounded-lg">
      <h2 className="text-xl font-bold text-slate-200 mb-6">Select Your Role</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-rose-500">Red Team</h3>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-slate-200">Play as:</span>
          <button
            onClick={() => setHumanRole('spymaster')}
            className={`px-4 py-2 rounded ${
              humanRole === 'spymaster'
                ? 'bg-slate-200 text-slate-800'
                : 'bg-slate-600 text-slate-200'
            }`}
          >
            Spymaster
          </button>
          <button
            onClick={() => setHumanRole('operative')}
            className={`px-4 py-2 rounded ${
              humanRole === 'operative'
                ? 'bg-slate-200 text-slate-800'
                : 'bg-slate-600 text-slate-200'
            }`}
          >
            Operative
          </button>
        </div>
      </div>

      <button
        onClick={() => onStart(players)}
        className="w-full bg-slate-200 text-slate-800 p-2 rounded font-bold hover:bg-slate-300 mt-4"
      >
        Start Game
      </button>
    </div>
  );
} 