import assassinGif from '../assets/assassin-animated.gif';
import cardFrontImage from '../assets/card-front-edited.png';
import { bgColorMap, borderColorMap } from '../utils/colors.tsx';
import { CardType } from '../utils/game.ts';

type CardProps = CardType & {
  isSpymasterView: boolean;
};

export default function Card({
  word,
  color,
  isRevealed,
  isSpymasterView,
  wasRecentlyRevealed,
}: CardProps) {
  return (
    <div
      className={`relative transform transition-transform hover:scale-105 ${
        wasRecentlyRevealed ? 'animate-[pulse_1.1s_ease-in-out_infinite]' : ''
      } rounded-lg ${
        isSpymasterView && color !== 'neutral' && !isRevealed ?
          `rounded-lg ring-2 ring-orange-100 ring-offset-0`
        : ''
      }`}
    >
      <img
        src={cardFrontImage}
        alt='Card background'
        className={`w-full rounded-lg ${
          isSpymasterView && color !== 'neutral' && !isRevealed ?
            `border-4 ${borderColorMap[color]}`
          : ''
        }`}
      />
      {/* Full-color mask for revealed cards */}
      {isRevealed && (
        <div
          className={`absolute inset-0 ${bgColorMap[color]} overflow-hidden rounded-lg opacity-80`}
        />
      )}
      {/* Special animated assassin reveal */}
      {isRevealed && color === 'black' && (
        <img
          src={assassinGif}
          alt='Assassin'
          className='absolute inset-0 z-10 mx-auto flex h-full w-auto'
        />
      )}
      {/* Word overlay */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <span
          className={`z-20 mt-[30%] text-xs font-bold tracking-tighter md:text-base ${
            color === 'black' && isRevealed ? 'text-slate-50' : 'text-slate-800'
          }`}
        >
          {word}
        </span>
      </div>
    </div>
  );
}
