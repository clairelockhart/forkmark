import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Bell, LogOut } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { useAuth } from '../hooks/useAuth'

export function Settings() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)
    try {
      await signOut()
      navigate('/auth', { replace: true })
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <PageWrapper title="Settings">
      <div className="space-y-3">
        {/* Display name — placeholder until profiles table */}
        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
            <User size={18} className="text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-400">Display name</p>
            <p className="text-sm text-gray-400 italic">Coming soon</p>
          </div>
        </div>

        {/* Email — live */}
        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
            <Mail size={18} className="text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-400">Email</p>
            <p className="truncate text-sm text-gray-700">{user?.email}</p>
          </div>
        </div>

        {/* Notifications — placeholder */}
        <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
              <Bell size={18} className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Notifications</p>
              <p className="text-xs text-gray-400">Coming soon</p>
            </div>
          </div>
          <div className="h-6 w-11 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        disabled={signingOut}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 py-4 text-sm font-medium text-red-500 hover:bg-red-50 active:bg-red-100 disabled:opacity-60"
      >
        <LogOut size={17} />
        {signingOut ? 'Signing out…' : 'Sign out'}
      </button>
    </PageWrapper>
  )
}
