import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react'
import { StarRating } from '../ui/StarRating'
import { StatusBadge } from '../ui/StatusBadge'
import { TagChip } from '../ui/TagChip'

const NOTE_LIMIT = 90

export function RestaurantCard({ restaurant }) {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()
  const { id, name, city, cuisine, status, rating, notes, tags } = restaurant

  const truncated = notes && notes.length > NOTE_LIMIT && !expanded
  const displayNote = truncated ? notes.slice(0, NOTE_LIMIT) + '…' : notes

  return (
    <div
      className="rounded-2xl bg-white p-4 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
      onClick={() => navigate(`/restaurant/${id}`)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-gray-900">{name}</p>
          <div className="mt-0.5 flex items-center gap-1 text-sm text-gray-400">
            <MapPin size={13} />
            <span className="truncate">{city}</span>
            <span className="mx-0.5">·</span>
            <span className="truncate">{cuisine}</span>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {status === 'been' && rating != null && (
        <div className="mt-2">
          <StarRating value={rating} size="sm" />
        </div>
      )}

      {notes && (
        <div className="mt-2">
          <p
            className="text-sm text-gray-500 leading-relaxed"
            onClick={(e) => {
              if (notes.length > NOTE_LIMIT) {
                e.stopPropagation()
                setExpanded((v) => !v)
              }
            }}
          >
            {displayNote}
          </p>
          {notes.length > NOTE_LIMIT && (
            <button
              className="mt-0.5 flex items-center gap-0.5 text-xs text-accent font-medium"
              onClick={(e) => {
                e.stopPropagation()
                setExpanded((v) => !v)
              }}
            >
              {expanded ? (
                <>Less <ChevronUp size={13} /></>
              ) : (
                <>More <ChevronDown size={13} /></>
              )}
            </button>
          )}
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      )}
    </div>
  )
}
