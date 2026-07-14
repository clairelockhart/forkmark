import { MapPin } from 'lucide-react'
import { StarRating } from '../ui/StarRating'

export function ShareCard({ restaurant, selected, onToggle }) {
  const { id, name, city, cuisine, rating } = restaurant

  return (
    <label
      className={[
        'flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-colors',
        selected ? 'border-accent bg-accent-light' : 'border-transparent bg-white',
      ].join(' ')}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(id)}
        className="h-5 w-5 rounded accent-[#D97706] cursor-pointer"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-gray-900">{name}</p>
        <div className="mt-0.5 flex items-center gap-1 text-sm text-gray-400">
          <MapPin size={13} />
          <span>{city}</span>
          <span className="mx-0.5">·</span>
          <span>{cuisine}</span>
        </div>
        {rating != null && (
          <div className="mt-1">
            <StarRating value={rating} size="sm" />
          </div>
        )}
      </div>
    </label>
  )
}
