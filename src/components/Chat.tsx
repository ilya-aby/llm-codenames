import { TeamColor } from '../Game';
import { colorMap } from '../constants/colors';

export type ChatMessage = {
  message: string;
  name: string;
  initials: string;
  team: TeamColor;
};

export function Chat({ message, name, initials, team }: ChatMessage) {
  return (
    <div className='flex gap-3 p-2'>
      {/* Avatar Circle */}
      <div className='flex-shrink-0'>
        <div
          className={`w-10 h-10 rounded-full ${colorMap[team]} flex items-center justify-center text-white text-sm font-medium`}
        >
          {initials}
        </div>
      </div>
      {/* Chat message */}
      <div className='flex flex-col'>
        <span className='text-slate-300 font-black text-sm'>{name}</span>
        <p className='text-slate-300 text-sm italic'>{message}</p>
      </div>
    </div>
  );
}
