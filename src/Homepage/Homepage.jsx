import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Homepage.scss'
import theGirl from '../images/the_girl.png'

const TITLE = "Dyuti's Portfolio"

const CHATS = [
  'Hover my name and watch it explode ✧',
  'Every bit of the picture is clickable ♡',
  'Tap anywhere for a little sparkle ✩',
  'Pick a flavour up there, top right ✿',
  'Brewed with chai and too many semicolons ♬',
]

// Random direction + reach; the letters all launch from the title's centre.
const makeScatter = () =>
  [...TITLE].map(() => {
    const angle = Math.random() * Math.PI * 2
    const reach = 0.55 + Math.random() * 0.45
    return {
      ux: Math.cos(angle) * reach,
      uy: Math.sin(angle) * reach,
      rot: (Math.random() - 0.5) * 720,
    }
  })

const greetingFor = (hour) => {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

// Ordered back-to-front: later hotspots win wherever the regions overlap.
const HOTSPOTS = [
  { id: 'girl', to: '/aboutme', label: 'About me', tip: 'Hi! Get to know me ♡' },
  { id: 'laptop', to: '/myexperience', label: 'My experience', tip: 'Peek at my work ✧' },
  { id: 'books', to: '/myeducation', label: 'My education', tip: 'Where I studied ✿' },
  { id: 'toy', to: '/myhobbies', label: 'My hobbies', tip: 'What I love doing ♬' },
  { id: 'pens', to: '/mycontact', label: 'Contact me', tip: 'Say hello ✎' },
  { id: 'cup', to: '/myskills', label: 'My skills', tip: 'What I brew up ✩' },
]

function Homepage() {
  const navigate = useNavigate()
  const [scatter, setScatter] = useState(makeScatter)
  const [centers, setCenters] = useState(() => [...TITLE].map(() => ({ cx: 0, cy: 0 })))
  const [chat, setChat] = useState(0)
  const titleRef = useRef(null)
  const letterRefs = useRef([])

  useEffect(() => {
    const id = setInterval(() => setChat((c) => (c + 1) % CHATS.length), 6000)
    return () => clearInterval(id)
  }, [])

  useLayoutEffect(() => {
    // offsetLeft/Top instead of rects: the glyphs are mid-animation and rects
    // would bake the wobble into the measurement.
    const measure = () => {
      const title = titleRef.current
      if (!title) return
      const midX = title.offsetLeft + title.offsetWidth / 2
      const midY = title.offsetTop + title.offsetHeight / 2
      setCenters(
        letterRefs.current.map((el) =>
          el
            ? {
                cx: midX - (el.offsetLeft + el.offsetWidth / 2),
                cy: midY - (el.offsetTop + el.offsetHeight / 2),
              }
            : { cx: 0, cy: 0 },
        ),
      )
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <main className="homepage">
      <h1
        ref={titleRef}
        className="homepage__title"
        aria-label={TITLE}
        // Reshuffled on the way out so the next hover is always a new scatter.
        onMouseLeave={() => setScatter(makeScatter())}
      >
        {[...TITLE].map((char, i) => {
          const glyph = char === ' ' ? '\u00A0' : char
          const { cx, cy } = centers[i]
          const { ux, uy, rot } = scatter[i]
          return (
            <span
              key={i}
              ref={(el) => {
                letterRefs.current[i] = el
              }}
              className="homepage__title-letter"
              style={{
                '--i': i,
                '--cx': `${cx}px`,
                '--cy': `${cy}px`,
                '--dx': `calc(${cx}px + ${(ux * 45).toFixed(2)}vw)`,
                '--dy': `calc(${cy}px + ${(uy * 40).toFixed(2)}vh)`,
                '--rot': `${rot.toFixed(1)}deg`,
              }}
              aria-hidden="true"
            >
              <span className="homepage__title-glyph" data-letter={glyph}>
                {glyph}
              </span>
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

      <button
        type="button"
        className="homepage__chat"
        onClick={() => setChat((c) => (c + 1) % CHATS.length)}
        aria-live="polite"
      >
        <span className="homepage__chat-hi">{greetingFor(new Date().getHours())}!</span>
        <span key={chat} className="homepage__chat-line">
          {CHATS[chat]}
        </span>
      </button>
    </main>
  )
}

export default Homepage
