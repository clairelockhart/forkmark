import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

export function Toast({ message, visible, onDismiss }) {
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(onDismiss, 2500)
    return () => clearTimeout(t)
  }, [visible, onDismiss])

  return (
    <div
      className={[
        'fixed bottom-20 left-1/2 z-50 -translate-x-1/2 transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none',
      ].join(' ')}
    >
      <div className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-sm text-white shadow-lg">
        <CheckCircle size={16} className="text-success shrink-0" />
        {message}
      </div>
    </div>
  )
}
