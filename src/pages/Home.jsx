import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, Plus, Utensils, Bookmark } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { RestaurantCard } from '../components/restaurant/RestaurantCard'
import { useRestaurants } from '../hooks/useRestaurants'

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'been', label: 'Been there' },
  { key: 'want', label: 'Want to try' },
]

function EmptyState({ tab, hasQuery }) {
  if (hasQuery) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <Search size={40} className="text-gray-200" />
        <p className="font-medium text-gray-500">No matches found</p>
        <p className="text-sm text-gray-400">Try a different name, city, or cuisine</p>
      </div>
    )
  }
  if (tab === 'been') {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <Utensils size={40} className="text-gray-200" />
        <p className="font-medium text-gray-500">No visits logged yet</p>
        <p className="text-sm text-gray-400">Add a restaurant you've been to and remember it forever</p>
      </div>
    )
  }
  if (tab === 'want') {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <Bookmark size={40} className="text-gray-200" />
        <p className="font-medium text-gray-500">Your wish list is empty</p>
        <p className="text-sm text-gray-400">Save places you want to try before you forget about them</p>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <Utensils size={40} className="text-gray-200" />
      <p className="font-medium text-gray-500">No restaurants yet</p>
      <p className="text-sm text-gray-400">Tap + to add your first place</p>
    </div>
  )
}

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'all'
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { restaurants, loading } = useRestaurants()

  function setTab(key) {
    setSearchParams(key === 'all' ? {} : { tab: key })
  }

  const filtered = restaurants
    .filter((r) => {
      if (tab === 'been') return r.status === 'been'
      if (tab === 'want') return r.status === 'want'
      return true
    })
    .filter((r) => {
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        r.name.toLowerCase().includes(q) ||
        (r.city ?? '').toLowerCase().includes(q) ||
        (r.cuisine ?? '').toLowerCase().includes(q) ||
        (r.tags ?? []).some((t) => t.toLowerCase().includes(q))
      )
    })

  return (
    <PageWrapper title="Forkmark">
      {/* Search bar */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, city, cuisine, tag…"
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-accent"
        />
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-xl border border-gray-200 bg-gray-100 p-1">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={[
              'flex-1 rounded-lg py-2 text-sm font-medium transition-all',
              tab === key ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-gray-200" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState tab={tab} hasQuery={!!query.trim()} />
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => navigate('/add')}
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-lg hover:bg-accent-dark active:scale-95 transition-all"
        aria-label="Add restaurant"
      >
        <Plus size={26} className="text-white" strokeWidth={2.5} />
      </button>
    </PageWrapper>
  )
}
