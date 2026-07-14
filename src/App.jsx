import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RestaurantProvider } from './context/RestaurantContext'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { Home } from './pages/Home'
import { AddEdit } from './pages/AddEdit'
import { Detail } from './pages/Detail'
import { Share } from './pages/Share'
import { Settings } from './pages/Settings'
import { Auth } from './pages/Auth'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RestaurantProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddEdit />} />
              <Route path="/edit/:id" element={<AddEdit />} />
              <Route path="/restaurant/:id" element={<Detail />} />
              <Route path="/share" element={<Share />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </RestaurantProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}
