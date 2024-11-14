import { TeamColor } from '../Game';

export type ChatMessage = {
  message: string;
  name: string;
  team: TeamColor;
  logo: string;
};

export function Chat({ message, name, team, logo }: ChatMessage) {
  return (
    <div className='flex gap-3 p-2'>
      {/* Avatar logo */}
      <div className='flex-shrink-0'>
        <img src={logo} alt={name} className={'size-8 rounded-full bg-slate-200 p-1'} />
      </div>
      {/* Chat message */}
      <div className='flex flex-col'>
        <span className={`font-bold text-sm ${team === 'red' ? 'text-red-500' : 'text-blue-500'}`}>
          {name}
        </span>
        <p className='text-slate-300 text-sm italic'>{message}</p>
      </div>
    </div>
  );
}
