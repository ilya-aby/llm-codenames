import { CardType } from './game';

export const bgColorMap = {
  blue: 'bg-sky-700',
  red: 'bg-rose-600',
  black: 'bg-black',
  neutral: 'bg-slate-700',
};

export const borderColorMap = {
  blue: 'border-sky-600',
  red: 'border-rose-500',
  black: 'border-black',
  neutral: 'border-slate-700',
};

// Helper function to colorize words in the message based on the cards
export const colorizeMessage = (text: string, cards: CardType[]) => {
  return text.split(/(\s+)/).map((word, i) => {
    // If it's whitespace or a boundary, return it unchanged
    if (!word.trim()) return word;
    const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const card = cards.find((c) => c.word.toUpperCase() === cleanWord);

    if (!card) return word + ' ';

    const colorClasses = {
      red: 'text-rose-50 bg-rose-600/70',
      blue: 'text-sky-50 bg-sky-700/70',
      black: 'text-slate-50 bg-slate-800/90',
      neutral: 'text-slate-600 bg-orange-200/70',
    };

    return (
      <span key={i} className={`${colorClasses[card.color]} rounded px-1 font-semibold`}>
        {cleanWord}
      </span>
    );
  });
};
