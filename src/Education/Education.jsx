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
            <span className="education__badge" aria-hidden="true">
              {icon}
            </span>
            <div className="cute-card education__card">
              <span className="education__period">{period}</span>
              <h2 className="education__title">{title}</h2>
              <p className="education__place">{place}</p>
              <p className="education__note">{note}</p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  )
}

export default Education
