import { useState } from 'react'
import './Education.scss'

const MILESTONES = [
  {
    icon: '🎓',
    title: 'B.Tech in ECE',
    place: 'Meghnad Saha Institute of Technology (MAKAUT)',
    period: '2018 — 2022',
    note: 'Where curiosity turned into circuits, code, and late-night project magic.',
  },
  {
    icon: '🔬',
    title: 'ISC — Science',
    place: 'The Modern Academy',
    period: '2018',
    note: 'Fell for problem-solving, one experiment at a time.',
  },
  {
    icon: '🏫',
    title: 'ICSE',
    place: "St. Stephen's School",
    period: '2016',
    note: 'Where the whole adventure began ♡',
  },
]

function Education() {
  const [open, setOpen] = useState(0)

  return (
    <main className="page education">
      <header className="page__head">
        <h1 className="page__title">My Education</h1>
        <p className="page__subtitle">Where I learned to make things ✿</p>
      </header>

      <ol className="education__list">
        {MILESTONES.map(({ icon, title, place, period, note }, i) => (
          <li
            key={title}
            className="education__item pop-in"
            style={{ '--pop': i + 1 }}
          >
            <span className="education__badge emoji emoji--wiggle" aria-hidden="true">
              {icon}
            </span>
            <button
              type="button"
              className={`cute-card education__card${open === i ? ' is-open' : ''}`}
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <span className="education__period">{period}</span>
              <h2 className="education__title">{title}</h2>
              <p className="education__place">{place}</p>
              <span className="education__hint">{open === i ? 'Tap to tuck away ↑' : 'Tap to peek inside ↓'}</span>
              <p className="education__note">{note}</p>
            </button>
          </li>
        ))}
      </ol>
    </main>
  )
}

export default Education
