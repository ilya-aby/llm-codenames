import { useState } from 'react';
import { Role, SpymasterMove, OperativeMove } from '../utils/game';

interface HumanInputProps {
  role: Role;
  onSubmitMove: (move: SpymasterMove | OperativeMove) => void;
  currentClue?: { clueText: string; number: number };
  selectedWords: string[];
}

export function HumanInput({ role, onSubmitMove, currentClue, selectedWords }: HumanInputProps) {
  const [clueText, setClueText] = useState('');
  const [clueNumber, setClueNumber] = useState('');
  const [reasoning, setReasoning] = useState('');

  if (role === 'spymaster') {
    return (
      <div className="p-4 bg-slate-700 rounded-lg">
        <h3 className="text-lg font-bold text-slate-200 mb-4">Give a Clue</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your clue word"
            value={clueText}
            onChange={(e) => setClueText(e.target.value)}
            className="w-full p-2 rounded"
          />
          <input
            type="number"
            placeholder="Enter number of related words"
            value={clueNumber}
            onChange={(e) => setClueNumber(e.target.value)}
            className="w-full p-2 rounded"
          />
          <textarea
            placeholder="Enter your reasoning (optional)"
            value={reasoning}
            onChange={(e) => setReasoning(e.target.value)}
            className="w-full p-2 rounded"
          />
          <button
            onClick={() => {
              if (clueText && clueNumber) {
                onSubmitMove({
                  clue: clueText,
                  number: parseInt(clueNumber),
                  reasoning: reasoning || 'No reasoning provided.',
                });
              }
            }}
            className="w-full bg-slate-200 text-slate-800 p-2 rounded font-bold hover:bg-slate-300"
          >
            Submit Clue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-700 rounded-lg">
      <h3 className="text-lg font-bold text-slate-200 mb-4">
        Clue: {currentClue?.clueText}, {currentClue?.number}
      </h3>
      <div className="space-y-4">
        <textarea
          placeholder="Enter your reasoning (optional)"
          value={reasoning}
          onChange={(e) => setReasoning(e.target.value)}
          className="w-full p-2 rounded"
        />
        <button
          onClick={() => {
            if (selectedWords.length > 0) {
              onSubmitMove({
                guesses: selectedWords,
                reasoning: reasoning || 'No reasoning provided.',
              });
            }
          }}
          disabled={selectedWords.length === 0}
          className="w-full bg-slate-200 text-slate-800 p-2 rounded font-bold hover:bg-slate-300 disabled:opacity-50 disabled:hover:bg-slate-200"
        >
          Submit Guesses ({selectedWords.length})
        </button>
      </div>
    </div>
  );
} 