import { useRestaurantContext } from '../context/RestaurantContext'
import {
  addRestaurant as svcAdd,
  updateRestaurant as svcUpdate,
  deleteRestaurant as svcDelete,
} from '../services/restaurants'

export function useRestaurants() {
  const { state, dispatch } = useRestaurantContext()

  async function add(data) {
    const record = await svcAdd(data)
    dispatch({ type: 'ADD', payload: record })
    return record
  }

  async function update(id, data) {
    const record = await svcUpdate(id, data)
    dispatch({ type: 'UPDATE', payload: record })
    return record
  }

  async function remove(id) {
    await svcDelete(id)
    dispatch({ type: 'DELETE', payload: id })
  }

  return {
    restaurants: state.restaurants,
    loading: state.loading,
    error: state.error,
    add,
    update,
    remove,
  }
}
