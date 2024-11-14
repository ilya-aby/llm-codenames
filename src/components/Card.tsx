import { CardType } from '../Game';
import assassinGif from '../assets/assassin-animated.gif';
import cardFrontImage from '../assets/card-front.png';
import { bgColorMap } from '../constants/colors';

type CardProps = CardType & {
  isSpymasterView: boolean;
};

export default function Card({ word, color, isRevealed, isSpymasterView }: CardProps) {
  return (
    <div className={`relative transform transition-transform hover:scale-105 rounded-lg`}>
      <img src={cardFrontImage} alt='Card background' className='w-full' />
      {/* Colored circle for profile area to show spymaster the card color */}
      {isSpymasterView && color !== 'neutral' && !isRevealed && (
        <div
          className={`absolute top-[18%] left-[12%] w-[15%] aspect-square ${bgColorMap[color]} opacity-80 rounded-sm`}
        />
      )}
      {/* Full-color mask for revealed cards */}
      {isRevealed && (
        <div
          className={`absolute inset-0 ${bgColorMap[color]} opacity-80 rounded-lg overflow-hidden`}
        />
      )}
      {/* Special animated assassin reveal */}
      {isRevealed && color === 'black' && (
        <img
          src={assassinGif}
          alt='Assassin'
          className='flex mx-auto w-auto h-full absolute inset-0 z-10'
        />
      )}
      {/* Word overlay */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <span
          className={`tracking-tight font-bold text-xs md:text-base mt-[30%] z-20 ${
            color === 'black' && isRevealed ? 'text-slate-50' : 'text-slate-800'
          }`}
        >
          {word}
        </span>
      </div>
    </div>
  );
}
