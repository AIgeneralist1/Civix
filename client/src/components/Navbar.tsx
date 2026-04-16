import { useState } from 'react'
import type { Page } from '../App'
import './Navbar.css'

const navLinks: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⬡' },
  { id: 'quiz', label: 'Daily Quiz', icon: '✦' },
  { id: 'briefs', label: 'Briefs', icon: '◈' },
  { id: 'sources', label: 'Sources', icon: '◎' },
  { id: 'analytics', label: 'Analytics', icon: '◆' },
]

interface NavbarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  onLogout: () => void
  userName: string
}

export default function Navbar({ currentPage, onNavigate, onLogout, userName }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-inner">
        {/* Logo */}
        <button className="nav-logo" onClick={() => onNavigate('dashboard')} aria-label="Go to dashboard">
          <span className="logo-icon">B</span>
          <span className="logo-text">Civix</span>
          <span className="logo-badge">UPSC</span>
        </button>

        {/* Desktop links */}
        <ul className="nav-links" role="list">
          {navLinks.map(link => (
            <li key={link.id}>
              <button
                className={`nav-link ${currentPage === link.id ? 'active' : ''}`}
                onClick={() => onNavigate(link.id)}
                aria-current={currentPage === link.id ? 'page' : undefined}
              >
                <span className="nav-icon" aria-hidden="true">{link.icon}</span>
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* User menu */}
        <div className="nav-user">
          <button
            className="avatar-btn"
            onClick={() => setDropOpen(d => !d)}
            aria-expanded={dropOpen}
            aria-haspopup="menu"
            id="user-menu-btn"
          >
            <span className="avatar-circle">{userName.charAt(0).toUpperCase()}</span>
            <span className="avatar-name">{userName}</span>
            <span className={`chevron ${dropOpen ? 'open' : ''}`}>▾</span>
          </button>

          {dropOpen && (
            <div className="user-dropdown" role="menu" aria-labelledby="user-menu-btn">
              <div className="dropdown-header">
                <span className="avatar-circle lg">{userName.charAt(0).toUpperCase()}</span>
                <div>
                  <p className="dropdown-name">{userName}</p>
                  <p className="dropdown-role">UPSC Aspirant</p>
                </div>
              </div>
              <hr className="dropdown-divider" />
              <button className="dropdown-item" role="menuitem" onClick={() => { setDropOpen(false); onNavigate('analytics') }}>
                📊 My Analytics
              </button>
              <button className="dropdown-item danger" role="menuitem" onClick={() => { setDropOpen(false); onLogout() }}>
                ↩ Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          {navLinks.map(link => (
            <button
              key={link.id}
              className={`mobile-nav-link ${currentPage === link.id ? 'active' : ''}`}
              onClick={() => { onNavigate(link.id); setMenuOpen(false) }}
            >
              <span className="nav-icon">{link.icon}</span>
              {link.label}
            </button>
          ))}
          <hr className="dropdown-divider" />
          <button className="mobile-nav-link danger" onClick={() => { setMenuOpen(false); onLogout() }}>
            ↩ Sign Out
          </button>
        </div>
      )}
    </nav>
  )
}
