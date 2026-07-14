import { supabase } from '../lib/supabase'

// DB uses snake_case; frontend uses camelCase — map at the boundary
function fromDb(row) {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    cuisine: row.cuisine,
    status: row.status,
    rating: row.rating,
    notes: row.notes,
    dishes: row.dishes,
    wouldReturn: row.would_return,
    tags: row.tags ?? [],
    source: row.source,
    createdAt: row.created_at,
    visitedAt: row.visited_at,
  }
}

function toDb(data) {
  const db = {}
  if (data.name      !== undefined) db.name         = data.name
  if (data.city      !== undefined) db.city         = data.city
  if (data.cuisine   !== undefined) db.cuisine      = data.cuisine
  if (data.status    !== undefined) db.status       = data.status
  if (data.rating    !== undefined) db.rating       = data.rating
  if (data.notes     !== undefined) db.notes        = data.notes
  if (data.dishes    !== undefined) db.dishes       = data.dishes
  if (data.wouldReturn !== undefined) db.would_return = data.wouldReturn
  if (data.tags      !== undefined) db.tags         = data.tags
  if (data.source    !== undefined) db.source       = data.source
  if (data.visitedAt !== undefined) db.visited_at   = data.visitedAt
  return db
}

// RLS automatically filters by the authenticated user — no explicit user_id needed in queries
export async function getRestaurants() {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(fromDb)
}

export async function getRestaurant(id) {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return fromDb(data)
}

export async function addRestaurant(data) {
  const { data: row, error } = await supabase
    .from('restaurants')
    .insert(toDb(data))
    .select()
    .single()
  if (error) throw error
  return fromDb(row)
}

export async function updateRestaurant(id, data) {
  const { data: row, error } = await supabase
    .from('restaurants')
    .update(toDb(data))
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return fromDb(row)
}

export async function deleteRestaurant(id) {
  const { error } = await supabase
    .from('restaurants')
    .delete()
    .eq('id', id)
  if (error) throw error
  return { id }
}
