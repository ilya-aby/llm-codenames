import { TeamColor } from '../utils/game';
import { LLMModel } from '../utils/models';

export function ModelPill({
  model,
  teamColor,
  isActive = false,
}: {
  model: LLMModel;
  teamColor: TeamColor;
  isActive?: boolean;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-xl px-2 py-1 ${
        teamColor === 'red' ? 'bg-rose-600 text-red-50' : 'bg-sky-700 text-sky-50'
      } ${isActive ? 'border-2 border-white' : ''}`}
    >
      {/* Avatar logo */}
      <img
        src={model.logo}
        alt={model.short_name}
        className={`h-6 w-6 rounded-full border-black p-1 ${
          teamColor === 'red' ? 'bg-red-50' : 'bg-sky-50'
        }`}
      />
      {/* Model name */}
      <span className={`text-sm font-semibold`}>{model.short_name}</span>
    </span>
  );
}
