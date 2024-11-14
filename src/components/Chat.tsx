import { CardType, TeamColor } from '../Game';

export type ChatMessage = {
  message: string;
  name: string;
  team: TeamColor;
  logo: string;
  cards?: CardType[];
};

// Helper function to colorize words in the message based on the cards
const colorizeMessage = (text: string, cards: CardType[]) => {
  return text.split(/(\s+)/).map((word, i) => {
    // If it's whitespace or a boundary, return it unchanged
    if (!word.trim()) return word;
    const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const card = cards.find((c) => c.word.toUpperCase() === cleanWord);

    if (!card) return word + ' ';

    const colorClasses = {
      red: 'text-red-500 bg-orange-200',
      blue: 'text-blue-600 bg-orange-200',
      black: 'text-slate-50 bg-slate-800',
      neutral: 'text-slate-600 bg-orange-200',
    };

    return (
      <>
        <span key={i} className={`${colorClasses[card.color]} font-semibold px-1 rounded`}>
          {cleanWord}
        </span>{' '}
      </>
    );
  });
};

export function Chat({ message, name, team, logo, cards }: ChatMessage) {
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
        {/* Colorize the words in the message based on game cards */}
        <p className='text-slate-300 text-sm italic whitespace-pre-line'>
          {cards ? colorizeMessage(message, cards) : message}
        </p>
      </div>
    </div>
  );
}
