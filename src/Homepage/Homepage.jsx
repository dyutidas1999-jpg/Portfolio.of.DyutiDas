import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Homepage.scss'
import theGirl from '../images/the_girl.png'
import SparklePop from './SparklePop'
import PetalEcho from './PetalEcho'

const TITLE = "200 OK // Connection Successful — Welcome to My Pink Corner"

const CHATS = [
  'Hover the title to pause the scroll ✧',
  'Every bit of the picture is clickable ♡',
  'Tap anywhere for a little sparkle ✩',
  'Pick a flavour up there, top right ✿',
  'Brewed with chai and too many semicolons ♬',
]

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
  const [chat, setChat] = useState(0)
  const titleRef = useRef(null)
  const [marquee, setMarquee] = useState({ start: 0, end: 0, duration: 18 })

  useEffect(() => {
    const id = setInterval(() => setChat((c) => (c + 1) % CHATS.length), 6000)
    return () => clearInterval(id)
  }, [])

  useLayoutEffect(() => {
    const measure = () => {
      const title = titleRef.current
      if (!title) return
      // Marquee runs from the box's right edge to just past its left edge at a
      // constant speed, so a wide title neither drifts in late nor leaves a gap.
      const boxWidth = title.parentElement?.offsetWidth ?? 0
      const titleWidth = title.offsetWidth
      const distance = boxWidth + titleWidth
      const SPEED = 90 // px per second
      setMarquee({ start: boxWidth, end: -titleWidth, duration: distance / SPEED })
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <main className="homepage">
      <div className="homepage__title-box">
        <h1
          ref={titleRef}
          className="homepage__title"
          aria-label={TITLE}
          style={{
            '--m-start': `${marquee.start}px`,
            '--m-end': `${marquee.end}px`,
            animationDuration: `${marquee.duration}s`,
          }}
        >
          {[...TITLE].map((char, i) => {
            const glyph = char === ' ' ? '\u00A0' : char
            return (
              <span
                key={i}
                className="homepage__title-letter"
                style={{ '--i': i }}
                aria-hidden="true"
              >
                <span className="homepage__title-glyph" data-letter={glyph}>
                  {glyph}
                </span>
              </span>
            )
          })}
        </h1>
      </div>
      <div className="homepage__stage">
        <aside className="homepage__game homepage__game--left">
          <SparklePop />
        </aside>

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

        <aside className="homepage__game homepage__game--right">
          <PetalEcho />
        </aside>
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
