import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Features.scss'
import cursorArrow from '../images/cursor_arrow.png'
import cursorHand from '../images/cursor_hand.png'

const THEME_KEY = 'dyuti-theme'

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
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY)
    return THEMES.some((t) => t.id === saved) ? saved : THEMES[0].id
  })
  const [sparks, setSparks] = useState([])
  const [cursors, setCursors] = useState(null)
  const sparkId = useRef(0)

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

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

  const spawnSparks = (event) => {
    const born = Array.from({ length: 7 }, () => {
      const angle = Math.random() * Math.PI * 2
      const dist = 40 + Math.random() * 80
      return {
        id: sparkId.current++,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        x: event.clientX,
        y: event.clientY,
        dx: `${Math.cos(angle) * dist}px`,
        dy: `${Math.sin(angle) * dist - 30}px`,
        rot: `${(Math.random() - 0.5) * 200}deg`,
        size: `${(0.75 + Math.random() * 0.9).toFixed(2)}rem`,
      }
    })
    setSparks((current) => [...current, ...born])
  }

  return (
    <div
      className="features"
      data-theme={theme}
      style={cursors ?? undefined}
      onPointerDown={spawnSparks}
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
              <Link to={to} onClick={() => setMenuOpen(false)}>
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
      </div>

      {children}

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
    </div>
  )
}

export default Features
