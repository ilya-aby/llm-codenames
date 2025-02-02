import { useState } from 'react';
import { colorizeMessage } from '../utils/colors';
import { CardType, TeamColor } from '../utils/game';
import { LLMModel } from '../utils/models';
import userLogo from '../assets/logos/user.svg';

export type ChatMessage = {
  message: string;
  model: LLMModel | null;  // null for human players
  team: TeamColor;
  cards: CardType[];
  hideReasoning?: boolean; // Add this to indicate if reasoning should be hidden
};

export function Chat({ message, team, model, cards, hideReasoning }: ChatMessage) {
  const [isReasoningRevealed, setIsReasoningRevealed] = useState(false);

  const getLogo = (model: LLMModel | null) => {
    if (!model) {
      return userLogo;  // Use user logo for human players
    }
    return model.logo;
  };

  // Split message into reasoning and clue/guess parts
  const formatMessage = (message: string) => {
    const parts = message.split('\n\n');
    if (parts.length < 2) return { reasoning: '', action: message };
    return {
      reasoning: parts[0],
      action: parts.slice(1).join('\n\n')
    };
  };

  const { reasoning, action } = formatMessage(message);

  // Only colorize text when it's revealed
  const processReasoning = (reasoning: string) => {
    if (!hideReasoning || isReasoningRevealed) {
      return colorizeMessage(reasoning, cards);
    }
    return reasoning;
  };

  return (
    <div className='flex flex-col p-3'>
      {/* Model chat heading */}
      <div className='flex flex-row items-center gap-2'>
        {/* Avatar logo */}
        <div className='flex-shrink-0'>
          <img
            src={getLogo(model)}
            alt={model?.short_name || 'User'}
            className={`h-6 w-6 rounded-full border-black p-1 ${
              team === 'red' ? 'bg-red-50' : 'bg-sky-50'
            }`}
          />
        </div>
        {/* Model name */}
        <span
          className={`text-sm font-semibold ${team === 'blue' ? 'text-sky-500' : 'text-rose-500'}`}
        >
          {model?.short_name || 'User'}
        </span>
      </div>

      {/* Chat message */}
      <div className='flex flex-col'>
        {/* Colorize the words in the message based on game cards */}
        <p
          className={`mt-2 whitespace-pre-line border-l-4 pl-3 text-sm italic text-slate-300 ${
            team === 'blue' ? 'border-sky-600/90' : 'border-rose-600/90'
          }`}
        >
          {/* Reasoning section */}
          {reasoning && hideReasoning && (
            <span 
              onClick={() => setIsReasoningRevealed(!isReasoningRevealed)}
              className={`cursor-pointer rounded px-1 transition-all duration-200 ${
                isReasoningRevealed 
                  ? 'bg-transparent' 
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              <span className={isReasoningRevealed ? '' : 'invisible'}>
                {processReasoning(reasoning)}
              </span>
              {!isReasoningRevealed && (
                <span className="visible">
                  (Click to reveal spymaster reasoning)
                </span>
              )}
            </span>
          )}
          
          {reasoning && !hideReasoning && colorizeMessage(reasoning, cards)}
          
          {/* Action section (clue/guess) */}
          {action && (
            <>
              {reasoning && <br />}<br />
              {colorizeMessage(action, cards)}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
