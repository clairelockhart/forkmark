export function StatusBadge({ status }) {
  if (status === 'been') {
    return (
      <span className="inline-flex items-center rounded-full bg-success-light px-2.5 py-0.5 text-xs font-medium text-success">
        Been there
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent-dark">
      Want to try
    </span>
  )
}
