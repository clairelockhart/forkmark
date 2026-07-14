import { NavLink } from 'react-router-dom'
import { List, PlusCircle, Share2, Settings } from 'lucide-react'

const navItems = [
  { to: '/', icon: List, label: 'My List', exact: true },
  { to: '/add', icon: PlusCircle, label: 'Add', exact: false },
  { to: '/share', icon: Share2, label: 'Share', exact: false },
  { to: '/settings', icon: Settings, label: 'Settings', exact: false },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-mobile items-center justify-around px-2 pb-safe">
        {navItems.map(({ to, icon: Icon, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              [
                'flex flex-col items-center gap-1 px-4 py-3 text-xs font-medium transition-colors',
                isActive ? 'text-accent' : 'text-gray-400 hover:text-gray-600',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
