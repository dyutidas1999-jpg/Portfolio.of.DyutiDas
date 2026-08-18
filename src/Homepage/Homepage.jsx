import { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Homepage.scss'
import theGirl from '../images/the_girl.png'

const TITLE = "Dyuti's Portfolio"

// Ordered back-to-front: later hotspots win wherever the regions overlap.
const HOTSPOTS = [
  { id: 'girl', to: '/aboutme', label: 'About me', tip: 'Hi! Get to know me ♡' },
  { id: 'laptop', to: '/myexperience', label: 'My experience', tip: 'Peek at my work ✧' },
  { id: 'books', to: '/myeducation', label: 'My education', tip: 'Where I studied ✿' },
  { id: 'toy', to: '/myhobbies', label: 'My hobbies', tip: 'What I love doing ♬' },
  { id: 'pens', to: '/mycontact', label: 'Contact me', tip: 'Say hello ✎' },
  { id: 'cup', to: '/myskills', label: 'My skills', tip: 'What I brew up ✩' },
]

const MENU = [
  { to: '/aboutme', label: 'About me' },
  { to: '/myexperience', label: 'My experience' },
  { to: '/myskills', label: 'My skills' },
  { to: '/myeducation', label: 'My education' },
  { to: '/myhobbies', label: 'My hobbies' },
  { to: '/mycontact', label: 'Contact me' },
]

function Homepage() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="homepage">
      <button
        type="button"
        className={`homepage__menu-btn${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="homepage-nav"
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`homepage__backdrop${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <nav
        id="homepage-nav"
        className={`homepage__nav${menuOpen ? ' is-open' : ''}`}
        aria-label="Main"
      >
        <p className="homepage__nav-title">Explore ♡</p>
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

      <h1 className="homepage__title" aria-label={TITLE}>
        {[...TITLE].map((char, i) => {
          const glyph = char === ' ' ? '\u00A0' : char
          return (
            <span
              key={i}
              className="homepage__title-letter"
              style={{ '--i': i }}
              data-letter={glyph}
              aria-hidden="true"
            >
              {glyph}
            </span>
          )
        })}
      </h1>
      <div className="homepage__hero-wrap">
        <img
          className="homepage__hero"
          src={theGirl}
          alt="Illustration of Dyuti waving while working at a laptop"
        />
        {HOTSPOTS.map(({ id, to, label, tip }) => (
          <Fragment key={id}>
            <button
              type="button"
              className={`homepage__hot homepage__hot--${id}`}
              onClick={() => navigate(to)}
              aria-label={label}
            />
            {/* tooltip is a sibling, not a pseudo-element: the hotspots are clipped */}
            <span className={`homepage__tip homepage__tip--${id}`} aria-hidden="true">
              {tip}
            </span>
          </Fragment>
        ))}
      </div>
    </main>
  )
}

export default Homepage
