import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Tag, Utensils, RotateCcw, MessageSquare, Edit2, Trash2, CheckCircle } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { StarRating } from '../components/ui/StarRating'
import { StatusBadge } from '../components/ui/StatusBadge'
import { TagChip } from '../components/ui/TagChip'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { useRestaurants } from '../hooks/useRestaurants'
import { getRestaurant } from '../services/restaurants'

const RETURN_LABELS = { yes: 'Yes', maybe: 'Maybe', no: 'No' }

function Section({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-3">
      <Icon size={18} className="mt-0.5 shrink-0 text-gray-400" />
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
        <div className="mt-0.5 text-sm text-gray-700">{children}</div>
      </div>
    </div>
  )
}

export function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { remove, update } = useRestaurants()
  const [restaurant, setRestaurant] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    getRestaurant(id).then(setRestaurant)
  }, [id])

  async function handleDelete() {
    await remove(id)
    navigate('/', { replace: true })
  }

  async function handleMarkVisited() {
    await update(id, {
      status: 'been',
      visitedAt: new Date().toISOString(),
    })
    navigate(`/edit/${id}`)
  }

  if (!restaurant) {
    return (
      <PageWrapper title="" showBack>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      </PageWrapper>
    )
  }

  const { name, city, cuisine, status, rating, notes, tags, dishes, wouldReturn, source } = restaurant

  return (
    <PageWrapper
      title=""
      showBack
      action={
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Edit2 size={15} />
            Edit
          </button>
          <button
            onClick={() => setConfirmOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-red-100 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <Trash2 size={15} />
          </button>
        </div>
      }
    >
      {/* Hero */}
      <div className="mb-5 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">{name}</h2>
          <StatusBadge status={status} />
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-400">
          <MapPin size={14} />
          {city && <span>{city}</span>}
          {city && cuisine && <span>·</span>}
          {cuisine && <span>{cuisine}</span>}
        </div>
        {status === 'been' && rating != null && (
          <div className="mt-3">
            <StarRating value={rating} size="md" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="rounded-2xl bg-white p-5 shadow-sm space-y-5">
        {notes && (
          <Section icon={MessageSquare} label="Notes">
            <p className="leading-relaxed">{notes}</p>
          </Section>
        )}

        {source && (
          <Section icon={Tag} label="How I heard about it">
            <p>{source}</p>
          </Section>
        )}

        {status === 'been' && dishes && (
          <Section icon={Utensils} label="Dishes to order">
            <p>{dishes}</p>
          </Section>
        )}

        {status === 'been' && wouldReturn && (
          <Section icon={RotateCcw} label="Would return?">
            <p>{RETURN_LABELS[wouldReturn] ?? wouldReturn}</p>
          </Section>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>

      {/* Mark as visited CTA */}
      {status === 'want' && (
        <button
          onClick={handleMarkVisited}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-success py-4 text-sm font-semibold text-white hover:bg-green-700 active:bg-green-800"
        >
          <CheckCircle size={18} />
          Mark as visited
        </button>
      )}

      <ConfirmDialog
        open={confirmOpen}
        message={`Remove "${name}" from your list?`}
        confirmLabel="Remove"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </PageWrapper>
  )
}
