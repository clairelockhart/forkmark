import { useState } from 'react'
import { StarRating } from '../ui/StarRating'
import { TagChip } from '../ui/TagChip'

const ALL_TAGS = [
  'date night',
  'groups',
  'special occasion',
  'casual',
  'brunch',
  'vegan-friendly',
  'business lunch',
]

const CUISINE_OPTIONS = [
  'American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese',
  'Korean', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Pizza',
  'Seafood', 'Thai', 'Vietnamese', 'Other',
]

const WOULD_RETURN = [
  { value: 'yes', label: 'Yes' },
  { value: 'maybe', label: 'Maybe' },
  { value: 'no', label: 'No' },
]

function blank() {
  return {
    name: '',
    city: '',
    cuisine: '',
    status: 'want',
    notes: '',
    source: '',
    tags: [],
    rating: 0,
    dishes: '',
    wouldReturn: '',
    visitedAt: '',
  }
}

function normalize(data) {
  return {
    name: data.name ?? '',
    city: data.city ?? '',
    cuisine: data.cuisine ?? '',
    status: data.status ?? 'want',
    notes: data.notes ?? '',
    source: data.source ?? '',
    tags: data.tags ?? [],
    rating: data.rating ?? 0,
    dishes: data.dishes ?? '',
    wouldReturn: data.wouldReturn ?? '',
    visitedAt: data.visitedAt ?? '',
  }
}

export function RestaurantForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState(initialData ? normalize(initialData) : blank())
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function toggleTag(tag) {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Restaurant name is required'
    if (form.status === 'been' && !form.rating) e.rating = 'Please add a star rating'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setSaving(true)
    const payload = {
      ...form,
      rating: form.status === 'been' ? form.rating : null,
      dishes: form.status === 'been' ? form.dishes || null : null,
      wouldReturn: form.status === 'been' ? form.wouldReturn || null : null,
      visitedAt: form.status === 'been' ? (form.visitedAt || new Date().toISOString()) : null,
    }
    await onSave(payload)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Mode toggle */}
      <div className="flex rounded-xl border border-gray-200 bg-gray-100 p-1">
        {['want', 'been'].map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => set('status', mode)}
            className={[
              'flex-1 rounded-lg py-2 text-sm font-medium transition-all',
              form.status === mode
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-500 hover:text-gray-700',
            ].join(' ')}
          >
            {mode === 'want' ? 'Want to try' : 'Been there'}
          </button>
        ))}
      </div>

      {/* Name */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Restaurant name <span className="text-red-400">*</span>
        </label>
        <input
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="e.g. Zuni Café"
          className={[
            'w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-colors',
            errors.name
              ? 'border-red-400 focus:border-red-400'
              : 'border-gray-200 focus:border-accent',
          ].join(' ')}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* City */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">City</label>
        <input
          value={form.city}
          onChange={(e) => set('city', e.target.value)}
          placeholder="e.g. San Francisco"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </div>

      {/* Cuisine */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Cuisine</label>
        <select
          value={form.cuisine}
          onChange={(e) => set('cuisine', e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-accent appearance-none"
        >
          <option value="">Select cuisine…</option>
          {CUISINE_OPTIONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Source */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">How you heard about it</label>
        <input
          value={form.source}
          onChange={(e) => set('source', e.target.value)}
          placeholder="e.g. Recommended by Jamie"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Tags</label>
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((tag) => (
            <TagChip
              key={tag}
              label={tag}
              selected={form.tags.includes(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          placeholder="What to order, what to know, why you want to go…"
          rows={3}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-accent resize-none"
        />
      </div>

      {/* Been-there extras */}
      {form.status === 'been' && (
        <>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Rating <span className="text-red-400">*</span>
            </label>
            <StarRating value={form.rating} onChange={(v) => set('rating', v)} size="lg" />
            {errors.rating && <p className="mt-1 text-xs text-red-500">{errors.rating}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Dishes to order</label>
            <input
              value={form.dishes}
              onChange={(e) => set('dishes', e.target.value)}
              placeholder="e.g. Fusilli, Crudo"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Would you return?</label>
            <div className="flex gap-2">
              {WOULD_RETURN.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set('wouldReturn', value)}
                  className={[
                    'flex-1 rounded-xl border py-2.5 text-sm font-medium transition-colors',
                    form.wouldReturn === value
                      ? 'border-accent bg-accent-light text-accent-dark'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300',
                  ].join(' ')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-gray-200 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 rounded-xl bg-accent py-3.5 text-sm font-semibold text-white hover:bg-accent-dark active:bg-accent-dark disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  )
}
