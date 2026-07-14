export function TagChip({ label, selected, onClick }) {
  const interactive = typeof onClick === 'function'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      className={[
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
        interactive ? 'cursor-pointer' : 'cursor-default',
        selected
          ? 'bg-accent text-white'
          : interactive
          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          : 'bg-gray-100 text-gray-500',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
