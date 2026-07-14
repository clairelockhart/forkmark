import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { BottomNav } from './BottomNav'

export function PageWrapper({ title, children, showBack = false, action }) {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-svh flex-col bg-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="-ml-1 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 active:bg-gray-200"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>
        {action && <div>{action}</div>}
      </header>

      {/* Scrollable content */}
      <main className="mx-auto w-full max-w-mobile flex-1 px-4 pb-28 pt-4">
        {children}
      </main>

      <BottomNav />
    </div>
  )
}
