import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Features.scss'
import cursorArrow from '../images/cursor_arrow.png'
import cursorHand from '../images/cursor_hand.png'

const THEME_KEY = 'dyuti-theme'

const MODE_KEY = 'dyuti-mode'

const INBOX_KEY = 'dyuti-inbox'

// Fired by the Contact form (and the bubble itself) so every listener re-reads
// the shared inbox from localStorage.
const INBOX_EVENT = 'dyuti-inbox-change'

const readInbox = () => {
  try {
    return JSON.parse(localStorage.getItem(INBOX_KEY) || '[]')
  } catch {
    return []
  }
}

const formatInboxTime = (iso) =>
  new Date(iso).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

// Hue of the pink in the cursor artwork; every theme rotates away from it.
const CURSOR_BASE_HUE = 331

const THEMES = [
  { id: 'strawberry', label: 'Strawberry milk', hue: 331 },
  { id: 'mint', label: 'Mint soda', hue: 168 },
  { id: 'blueberry', label: 'Blueberry sky', hue: 209 },
  { id: 'lavender', label: 'Lavender dream', hue: 258 },
  { id: 'butter', label: 'Honey butter', hue: 40 },
]

const MENU = [
  { to: '/', label: 'Home' },
  { to: '/aboutme', label: 'About me' },
  { to: '/myexperience', label: 'My experience' },
  { to: '/myskills', label: 'My skills' },
  { to: '/myeducation', label: 'My education' },
  { to: '/myhobbies', label: 'My hobbies' },
  { to: '/mycontact', label: 'Contact me' },
]

const GLYPHS = ['♡', '✧', '✿', '♬', '✩', '❀']

// One sticker per page, shown in the pocket cheerleader's little passport.
const PAGE_ICONS = {
  '/': '🏠',
  '/aboutme': '💗',
  '/myexperience': '🚀',
  '/myskills': '✩',
  '/myeducation': '🎓',
  '/myhobbies': '♬',
  '/mycontact': '✎',
}

// Drifting background confetti; fixed values so React never re-randomises them.
const FLOATERS = Array.from({ length: 16 }, (_, i) => {
  const rand = (salt) => {
    const x = Math.sin((i + 1) * salt) * 43758.5453
    return x - Math.floor(x)
  }
  return {
    glyph: GLYPHS[Math.floor(rand(3.31) * GLYPHS.length)],
    left: `${rand(12.9898) * 100}%`,
    size: `${(0.7 + rand(78.233) * 1.5).toFixed(2)}rem`,
    delay: `${(rand(39.425) * 18).toFixed(2)}s`,
    duration: `${(14 + rand(9.71) * 12).toFixed(2)}s`,
    drift: `${((rand(4.13) - 0.5) * 10).toFixed(2)}rem`,
  }
})

// Redraws the cursor art through a hue-rotate filter, keeping its shape intact.
const tint = (src, shift) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.filter = `hue-rotate(${shift}deg)`
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL())
    }
    img.onerror = reject
    img.src = src
  })

function Features({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState(() => new Date())
  const [companionOpen, setCompanionOpen] = useState(false)
  const [hearts, setHearts] = useState(() => Number(localStorage.getItem('dyuti-hearts') || 0))
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY)
    return THEMES.some((t) => t.id === saved) ? saved : THEMES[0].id
  })
  const [mode, setMode] = useState(() =>
    localStorage.getItem(MODE_KEY) === 'dark' ? 'dark' : 'light',
  )
  const [inbox, setInbox] = useState(readInbox)
  const [inboxOpen, setInboxOpen] = useState(false)
  const [sparks, setSparks] = useState([])
  const [cursors, setCursors] = useState(null)
  const [visited, setVisited] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('dyuti-visited') || '[]'))
    } catch {
      return new Set()
    }
  })
  const [celebration, setCelebration] = useState('')
  const sparkId = useRef(0)

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem(MODE_KEY, mode)
  }, [mode])

  // Keep the bubble in sync whenever the Contact form (or another tab) writes.
  useEffect(() => {
    const sync = () => setInbox(readInbox())
    window.addEventListener(INBOX_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(INBOX_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const persistInbox = (next) => {
    localStorage.setItem(INBOX_KEY, JSON.stringify(next))
    setInbox(next)
  }

  const removeNote = (id) => persistInbox(inbox.filter((note) => note.id !== id))

  const clearInbox = () => persistInbox([])

  useEffect(() => {
    localStorage.setItem('dyuti-hearts', hearts)
  }, [hearts])

  // Stamps the current page into the passport the first time it's seen.
  useEffect(() => {
    setVisited((current) => {
      if (current.has(location.pathname)) return current
      const next = new Set(current)
      next.add(location.pathname)
      localStorage.setItem('dyuti-visited', JSON.stringify([...next]))
      return next
    })
  }, [location.pathname])

  useEffect(() => {
    if (!celebration) return
    const id = setTimeout(() => setCelebration(''), 3600)
    return () => clearTimeout(id)
  }, [celebration])

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    const { hue } = THEMES.find((t) => t.id === theme)
    const shift = (((hue - CURSOR_BASE_HUE) % 360) + 360) % 360
    let stale = false

    Promise.all([tint(cursorArrow, shift), tint(cursorHand, shift)])
      .then(([arrow, hand]) => {
        if (stale) return
        setCursors({
          '--cursor-arrow': `url(${arrow}) 10 4, auto`,
          '--cursor-heart': `url(${hand}) 22 3, pointer`,
        })
      })
      .catch(() => setCursors(null))

    return () => {
      stale = true
    }
  }, [theme])

  // Shared confetti-burst: click sparks, heart milestones and the passport
  // celebration all spawn from here with a different particle count.
  const burst = (count, cx, cy) => {
    const born = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2
      const dist = 40 + Math.random() * (60 + count * 3)
      return {
        id: sparkId.current++,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        x: cx,
        y: cy,
        dx: `${Math.cos(angle) * dist}px`,
        dy: `${Math.sin(angle) * dist - 30}px`,
        rot: `${(Math.random() - 0.5) * 200}deg`,
        size: `${(0.75 + Math.random() * 0.9).toFixed(2)}rem`,
      }
    })
    setSparks((current) => [...current, ...born])
  }

  const spawnSparks = (event) => burst(7, event.clientX, event.clientY)

  // Sends a heart and throws a little party every 5th one.
  const sendHeart = () => {
    setHearts((count) => {
      const next = count + 1
      if (next % 5 === 0) {
        burst(24, window.innerWidth / 2, window.innerHeight * 0.4)
        setCelebration(`✨ ${next} hearts collected! You're glowing ✨`)
      }
      return next
    })
  }

  // Confetti burst the moment every page in the passport has been stamped.
  useEffect(() => {
    if (visited.size < MENU.length) return
    if (localStorage.getItem('dyuti-all-visited')) return
    localStorage.setItem('dyuti-all-visited', 'true')
    burst(32, window.innerWidth / 2, window.innerHeight / 2)
    setCelebration('🎉 Passport complete! You explored every page ♡')
  }, [visited])

  // Cursor-follow tilt + shine on every .cute-card, delegated from one root
  // listener so individual pages never need to opt in.
  const tiltCard = (event) => {
    const card = event.target.closest?.('.cute-card')
    if (!card) return
    const rect = card.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    card.style.setProperty('--tilt-x', `${((0.5 - py) * 8).toFixed(2)}deg`)
    card.style.setProperty('--tilt-y', `${((px - 0.5) * 8).toFixed(2)}deg`)
    card.style.setProperty('--shine-x', `${(px * 100).toFixed(1)}%`)
    card.style.setProperty('--shine-y', `${(py * 100).toFixed(1)}%`)
  }

  const untiltCard = (event) => {
    const card = event.target.closest?.('.cute-card')
    if (!card || card.contains(event.relatedTarget)) return
    card.style.removeProperty('--tilt-x')
    card.style.removeProperty('--tilt-y')
  }

  return (
    <div
      className="features"
      data-theme={theme}
      data-mode={mode}
      data-home={location.pathname === '/' ? 'true' : 'false'}
      style={cursors ?? undefined}
      onPointerDown={spawnSparks}
      onPointerMove={tiltCard}
      onPointerOut={untiltCard}
    >
      <div className="features__floaters" aria-hidden="true">
        {FLOATERS.map(({ glyph, left, size, delay, duration, drift }, i) => (
          <span
            key={i}
            className="features__floater"
            style={{
              left,
              fontSize: size,
              animationDelay: delay,
              animationDuration: duration,
              '--drift': drift,
            }}
          >
            {glyph}
          </span>
        ))}
      </div>

      <button
        type="button"
        className={`features__menu-btn${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="features-nav"
      >
        <span />
        <span />
        <span />
      </button>

      {location.pathname !== '/' && (
        <button
          type="button"
          className="features__back"
          onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
          aria-label="Go back"
        >
          <span className="features__back-arrow" aria-hidden="true">
            ←
          </span>
          <span className="features__back-label">Back</span>
        </button>
      )}

      <div
        className={`features__backdrop${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <nav
        id="features-nav"
        className={`features__nav${menuOpen ? ' is-open' : ''}`}
        aria-label="Main"
      >
        <p className="features__nav-title">Explore ♡</p>
        <ul>
          {MENU.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setMenuOpen(false)}
                className={location.pathname === to ? 'is-current' : undefined}
                aria-current={location.pathname === to ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="features__palette" role="group" aria-label="Colour flavour">
        <span className="features__palette-label">Flavour</span>
        {THEMES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`features__swatch features__swatch--${id}${
              theme === id ? ' is-active' : ''
            }`}
            onClick={() => setTheme(id)}
            title={label}
            aria-label={label}
            aria-pressed={theme === id}
          />
        ))}
        <button
          type="button"
          className="features__mode"
          onClick={() => setMode((m) => (m === 'dark' ? 'light' : 'dark'))}
          title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={mode === 'dark'}
        >
          {mode === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="features__route" key={location.pathname}>
        {children}
      </div>

      <section className={`features__inbox${inboxOpen ? ' is-open' : ''}`}>
        {inboxOpen && (
          <div className="features__inbox-panel">
            <div className="features__inbox-head">
              <strong>
                Message inbox <span className="features__inbox-count">{inbox.length}</span>
              </strong>
              {inbox.length > 0 && (
                <button type="button" onClick={clearInbox}>
                  Clear all
                </button>
              )}
            </div>
            {inbox.length === 0 ? (
              <p className="features__inbox-empty">
                No notes yet — send one from the Contact me page 🕊️
              </p>
            ) : (
              <ul className="features__inbox-list">
                {inbox.map(({ id, name, message, time }) => (
                  <li key={id} className="features__inbox-note">
                    <div className="features__inbox-note-head">
                      <span>💗 {name}</span>
                      <time dateTime={time}>{formatInboxTime(time)}</time>
                    </div>
                    <p>{message}</p>
                    <button
                      type="button"
                      className="features__inbox-remove"
                      onClick={() => removeNote(id)}
                      aria-label={`Delete message from ${name}`}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <button
          type="button"
          className="features__inbox-button"
          onClick={() => setInboxOpen((open) => !open)}
          aria-label={inboxOpen ? 'Close message inbox' : 'Open message inbox'}
          aria-expanded={inboxOpen}
        >
          <span className="features__inbox-icon" aria-hidden="true">
            💌
          </span>
          {inbox.length > 0 && <small>{inbox.length}</small>}
        </button>
      </section>

      <section className={`features__companion${companionOpen ? ' is-open' : ''}`}>
        {companionOpen && (
          <div className="features__companion-card">
            <span className="features__companion-eyebrow">Pocket cheerleader</span>
            <strong>{hearts ? `${hearts} hearts collected!` : 'You found the cute button!'}</strong>
            <p>Click it whenever a page makes you smile.</p>
            <button type="button" onClick={sendHeart}>
              Send a heart <span aria-hidden="true">♡</span>
            </button>
            <div className="features__passport">
              <span className="features__passport-label">
                Passport · {visited.size}/{MENU.length} pages explored
              </span>
              <ul className="features__passport-stickers">
                {MENU.map(({ to, label }) => (
                  <li
                    key={to}
                    className={`features__sticker${visited.has(to) ? ' is-collected' : ''}`}
                    title={label}
                    aria-label={`${label}${visited.has(to) ? ' — visited' : ' — not visited yet'}`}
                  >
                    <span className="emoji" aria-hidden="true">
                      {PAGE_ICONS[to]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <button
          type="button"
          className="features__companion-button"
          onClick={() => setCompanionOpen((open) => !open)}
          aria-label={companionOpen ? 'Close pocket cheerleader' : 'Open pocket cheerleader'}
          aria-expanded={companionOpen}
        >
          <span className="features__buddy" aria-hidden="true">
            <span className="features__buddy-ear features__buddy-ear--left" />
            <span className="features__buddy-ear features__buddy-ear--right" />
            <span className="features__buddy-face">
              <i />
              <i />
              <b />
              <em />
              <em />
            </span>
          </span>
          <small>{hearts}</small>
        </button>
      </section>

      <aside className="features__status" aria-label="Portfolio status">
        <span className="features__status-dot" aria-hidden="true" />
        <span>Available for delightful builds</span>
        <time dateTime={time.toISOString()}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </aside>

      <div className="features__sparks" aria-hidden="true">
        {sparks.map(({ id, glyph, x, y, dx, dy, rot, size }) => (
          <span
            key={id}
            className="features__spark"
            style={{ left: x, top: y, fontSize: size, '--dx': dx, '--dy': dy, '--rot': rot }}
            onAnimationEnd={() => setSparks((cur) => cur.filter((s) => s.id !== id))}
          >
            {glyph}
          </span>
        ))}
      </div>

      {celebration && (
        <div className="features__toast" role="status" key={celebration}>
          {celebration}
        </div>
      )}
    </div>
  )
}

export default Features
