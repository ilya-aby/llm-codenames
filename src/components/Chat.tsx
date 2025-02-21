import { colorizeMessage } from '../utils/colors';
import { CardType, TeamColor } from '../utils/game';
import { LLMModel } from '../utils/models';

export type ChatMessage = {
  model: LLMModel;
  message: string;
  team: TeamColor;
  cards?: CardType[];
};

export function Chat({ message, team, model, cards }: ChatMessage) {
  return (
    <div className='flex flex-col p-3'>
      {/* Model chat heading */}
      <div className='flex flex-row items-center gap-2'>
        {/* Avatar logo */}
        <div className='flex-shrink-0'>
          <img
            src={model.logo}
            alt={model.short_name}
            className={`h-6 w-6 rounded-full border-black p-1 ${
              team === 'red' ? 'bg-red-50' : 'bg-sky-50'
            }`}
          />
        </div>
        {/* Model name */}
        <span
          className={`text-sm font-semibold ${team === 'blue' ? 'text-sky-500' : 'text-rose-500'}`}
        >
          {model.short_name}
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
          {cards ? colorizeMessage(message, cards) : message}
        </p>
      </div>
    </div>
  );
}
