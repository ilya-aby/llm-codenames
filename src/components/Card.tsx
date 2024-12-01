import assassinGif from '../assets/assassin-animated.gif';
import cardFrontImage from '../assets/card-front.png';
import { bgColorMap } from '../utils/colors.tsx';
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
      } overflow-hidden rounded-lg`}
    >
      <img src={cardFrontImage} alt='Card background' className='w-full' />
      {/* Color overlay hint to reveal card color */}
      {isSpymasterView && color !== 'neutral' && !isRevealed && (
        <div
          className={`absolute right-[12%] top-[18%] h-[33%] w-[16%] ${bgColorMap[color]} bg-gradient-to-b from-white/10 to-transparent opacity-70 backdrop-blur-sm`}
        />
      )}
      {/* Full-color mask for revealed cards */}
      {isRevealed && (
        <div
          className={`absolute inset-0 ${bgColorMap[color]} overflow-hidden rounded-lg bg-gradient-to-b from-white/20 to-transparent opacity-75 backdrop-blur-[2px]`}
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
          className={`z-20 mt-[30%] font-bold tracking-tighter ${
            color === 'black' && isRevealed ? 'text-slate-50' : 'text-slate-800'
          } ${word.length >= 9 ? 'text-[0.6rem] sm:text-base' : 'text-[0.7rem] sm:text-base'}`}
        >
          {word}
        </span>
      </div>
    </div>
  );
}
