import { createContext, useContext, useReducer, useEffect } from 'react'
import { getRestaurants } from '../services/restaurants'
import { useAuth } from '../hooks/useAuth'

const RestaurantContext = createContext(null)

const initialState = {
  restaurants: [],
  loading: true,
  error: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return { ...state, restaurants: action.payload, loading: false, error: null }
    case 'ADD':
      return { ...state, restaurants: [action.payload, ...state.restaurants] }
    case 'UPDATE':
      return {
        ...state,
        restaurants: state.restaurants.map((r) =>
          r.id === action.payload.id ? action.payload : r
        ),
      }
    case 'DELETE':
      return {
        ...state,
        restaurants: state.restaurants.filter((r) => r.id !== action.payload),
      }
    case 'ERROR':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export function RestaurantProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      dispatch({ type: 'LOAD', payload: [] })
      return
    }
    dispatch({ type: 'LOAD', payload: [] }) // reset before fetch
    getRestaurants()
      .then((data) => dispatch({ type: 'LOAD', payload: data }))
      .catch((err) => dispatch({ type: 'ERROR', payload: err.message }))
  }, [user])

  return (
    <RestaurantContext.Provider value={{ state, dispatch }}>
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurantContext() {
  const ctx = useContext(RestaurantContext)
  if (!ctx) throw new Error('useRestaurantContext must be used within RestaurantProvider')
  return ctx
}
