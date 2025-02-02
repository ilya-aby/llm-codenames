import { useState } from 'react';
import { Role, TeamColor } from '../utils/game';

interface TeamSelectorProps {
  onStart: (players: {
    red: { spymaster: 'human' | 'ai'; operative: 'human' | 'ai' };
    blue: { spymaster: 'human' | 'ai'; operative: 'human' | 'ai' };
  }) => void;
}

export function TeamSelector({ onStart }: TeamSelectorProps) {
  const [players, setPlayers] = useState({
    red: { spymaster: 'ai' as const, operative: 'ai' as const },
    blue: { spymaster: 'ai' as const, operative: 'ai' as const },
  });

  const togglePlayer = (team: TeamColor, role: Role) => {
    setPlayers((prev) => ({
      ...prev,
      [team]: {
        ...prev[team],
        [role]: prev[team][role] === 'ai' ? 'human' : 'ai',
      },
    }));
  };

  return (
    <div className="p-6 bg-slate-700 rounded-lg">
      <h2 className="text-xl font-bold text-slate-200 mb-6">Select Players</h2>
      
      {(['red', 'blue'] as const).map((team) => (
        <div key={team} className="mb-6">
          <h3 className={`text-lg font-bold mb-3 ${team === 'red' ? 'text-rose-500' : 'text-sky-500'}`}>
            {team.charAt(0).toUpperCase() + team.slice(1)} Team
          </h3>
          {(['spymaster', 'operative'] as const).map((role) => (
            <div key={role} className="flex items-center gap-4 mb-2">
              <span className="text-slate-200 w-24 capitalize">{role}:</span>
              <button
                onClick={() => togglePlayer(team, role)}
                className={`px-4 py-2 rounded ${
                  players[team][role] === 'human'
                    ? 'bg-slate-200 text-slate-800'
                    : 'bg-slate-600 text-slate-200'
                }`}
              >
                {players[team][role] === 'human' ? 'Human' : 'AI'}
              </button>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={() => onStart(players)}
        className="w-full bg-slate-200 text-slate-800 p-2 rounded font-bold hover:bg-slate-300 mt-4"
      >
        Start Game
      </button>
    </div>
  );
} 