import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageWrapper } from '../components/layout/PageWrapper'
import { RestaurantForm } from '../components/restaurant/RestaurantForm'
import { useRestaurants } from '../hooks/useRestaurants'
import { getRestaurant } from '../services/restaurants'

export function AddEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { add, update } = useRestaurants()
  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(!!id)

  const isEdit = !!id

  useEffect(() => {
    if (!id) return
    getRestaurant(id).then((data) => {
      setInitialData(data)
      setLoading(false)
    })
  }, [id])

  async function handleSave(data) {
    if (isEdit) {
      await update(id, data)
    } else {
      await add(data)
    }
    navigate(-1)
  }

  return (
    <PageWrapper title={isEdit ? 'Edit restaurant' : 'Add restaurant'} showBack>
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      ) : (
        <RestaurantForm
          initialData={initialData ?? undefined}
          onSave={handleSave}
          onCancel={() => navigate(-1)}
        />
      )}
    </PageWrapper>
  )
}
