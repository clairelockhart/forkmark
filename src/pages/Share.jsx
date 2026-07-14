import { useState, useMemo } from 'react'
import { Copy, Share2 } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { ShareCard } from '../components/restaurant/ShareCard'
import { Toast } from '../components/ui/Toast'
import { useRestaurants } from '../hooks/useRestaurants'

function buildMessage(selected) {
  const lines = ['🍽 My restaurant picks for you:']
  selected.forEach((r, i) => {
    const stars = r.rating ? '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating) : ''
    lines.push(`${i + 1}. ${r.name} (${r.city})${stars ? ' ' + stars : ''}`)
    const detail = [r.cuisine, r.notes ? `"${r.notes}"` : null].filter(Boolean).join(' · ')
    if (detail) lines.push(`   ${detail}`)
  })
  return lines.join('\n')
}

export function Share() {
  const { restaurants } = useRestaurants()
  const [selectedIds, setSelectedIds] = useState([])
  const [cityFilter, setCityFilter] = useState('all')
  const [toast, setToast] = useState(false)

  const beenList = useMemo(
    () => restaurants.filter((r) => r.status === 'been'),
    [restaurants]
  )

  const cities = useMemo(() => {
    const s = new Set(beenList.map((r) => r.city).filter(Boolean))
    return ['all', ...Array.from(s).sort()]
  }, [beenList])

  const visible = cityFilter === 'all' ? beenList : beenList.filter((r) => r.city === cityFilter)

  function toggle(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const selectedRestaurants = useMemo(
    () => beenList.filter((r) => selectedIds.includes(r.id)),
    [beenList, selectedIds]
  )

  const message = buildMessage(selectedRestaurants)

  async function handleCopy() {
    await navigator.clipboard.writeText(message)
    setToast(true)
  }

  return (
    <PageWrapper title="Share recs">
      {beenList.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Share2 size={40} className="text-gray-200" />
          <p className="font-medium text-gray-500">Nothing to share yet</p>
          <p className="text-sm text-gray-400">Visit some restaurants first, then share your favourites</p>
        </div>
      ) : (
        <>
          {/* City filter */}
          {cities.length > 2 && (
            <div className="mb-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {cities.map((c) => (
                <button
                  key={c}
                  onClick={() => setCityFilter(c)}
                  className={[
                    'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                    cityFilter === c
                      ? 'bg-accent text-white'
                      : 'bg-white border border-gray-200 text-gray-600',
                  ].join(' ')}
                >
                  {c === 'all' ? 'All cities' : c}
                </button>
              ))}
            </div>
          )}

          {/* Select all / none */}
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {selectedIds.length === 0
                ? 'Select restaurants to share'
                : `${selectedIds.length} selected`}
            </p>
            {selectedIds.length > 0 && (
              <button
                onClick={() => setSelectedIds([])}
                className="text-sm text-accent font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Cards */}
          <div className="space-y-2">
            {visible.map((r) => (
              <ShareCard
                key={r.id}
                restaurant={r}
                selected={selectedIds.includes(r.id)}
                onToggle={toggle}
              />
            ))}
          </div>

          {/* Preview */}
          {selectedIds.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                Message preview
              </p>
              <pre className="rounded-2xl bg-white p-4 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap shadow-sm font-sans">
                {message}
              </pre>
              <button
                onClick={handleCopy}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-4 text-sm font-semibold text-white hover:bg-accent-dark active:bg-accent-dark"
              >
                <Copy size={17} />
                Copy message
              </button>
            </div>
          )}
        </>
      )}

      <Toast
        message="Copied to clipboard!"
        visible={toast}
        onDismiss={() => setToast(false)}
      />
    </PageWrapper>
  )
}
