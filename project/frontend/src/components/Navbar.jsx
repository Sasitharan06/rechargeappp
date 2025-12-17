import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg text-sm font-semibold transition ${
    isActive
      ? 'bg-white text-airtel-primary shadow-soft'
      : 'text-white/90 hover:bg-white/10'
  }`

export const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth()

  return (
    <header className="bg-gradient-to-r from-airtel-primary to-red-700 text-white shadow-lg sticky top-0 z-50">
      <nav className="container-page h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-90 transition">
          <span className="text-2xl">📱</span>
          <div>
            <p className="text-white">Airtel</p>
            <p className="text-xs text-yellow-200">Recharge</p>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/plans" className={navLinkClass}>
            Plans
          </NavLink>
          {!isLoggedIn && (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/signup" className={navLinkClass}>
                Signup
              </NavLink>
            </>
          )}
          {isLoggedIn && (
            <>
              <NavLink to="/payment" className={navLinkClass}>
                Payment
              </NavLink>
              <button
                onClick={logout}
                className="ml-1 px-3 py-2 rounded-lg text-sm font-semibold bg-white text-airtel-primary hover:bg-gray-100 transition shadow-soft"
              >
                Logout{user?.name ? ` (${user.name.split(' ')[0]})` : ''}
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
