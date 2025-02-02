import { TeamColor } from '../utils/game';
import { LLMModel } from '../utils/models';
import userLogo from '../assets/logos/user.svg';

type ModelPillProps = {
  agent: {
    model: LLMModel | null;
    type: 'human' | 'ai';
  };
  teamColor: TeamColor;
  isActive?: boolean;
};

export function ModelPill({
  agent,
  teamColor,
  isActive = false,
}: ModelPillProps) {
  const logo = agent.type === 'human' ? userLogo : agent.model!.logo;
  const name = agent.type === 'human' ? 'Human' : agent.model!.short_name;

  return (
    <span
      className={`inline-flex w-full items-center gap-2 rounded-xl px-2 py-1 sm:w-fit ${
        teamColor === 'red' ? 'bg-rose-600/70 text-red-50' : 'bg-sky-700/70 text-sky-50'
      } ${isActive ? 'border-2 border-white' : ''}`}
    >
      {/* Avatar logo */}
      <img
        src={logo}
        alt={name}
        className={`h-6 w-6 rounded-full border-black p-1 ${
          teamColor === 'red' ? 'bg-red-50' : 'bg-sky-50'
        }`}
      />
      {/* Model/Player name */}
      <span className={`text-sm font-semibold`}>{name}</span>
    </span>
  );
}
