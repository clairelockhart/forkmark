import { Star } from 'lucide-react'

export function StarRating({ value, onChange, size = 'md' }) {
  const sizes = { sm: 14, md: 18, lg: 24 }
  const px = sizes[size] ?? sizes.md

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          className={onChange ? 'cursor-pointer' : 'cursor-default'}
          aria-label={onChange ? `Rate ${n} stars` : `${n} stars`}
        >
          <Star
            size={px}
            className={n <= value ? 'text-star fill-star' : 'text-gray-300'}
            fill={n <= value ? 'currentColor' : 'none'}
          />
        </button>
      ))}
    </div>
  )
}
