import { useState } from 'react'
import './Hobby.scss'

const HOBBIES = [
  { icon: '🧵', name: 'Craftworks', note: 'Making little handmade treasures from scratch.' },
  { icon: '📚', name: 'Reading fiction', note: 'Always three stories deep, one more chapter.' },
  { icon: '✈️', name: 'Travelling', note: 'Collecting new places and cozy memories.' },
  { icon: '🔘', name: 'Button collecting', note: 'A tiny, quirky hoard of pretty buttons.' },
  { icon: '🎹', name: 'Playing piano', note: 'Soft melodies for softer evenings.' },
  { icon: '🎧', name: 'Music', note: 'A soundtrack for absolutely every mood.' },
  { icon: '👗', name: 'Dress designing', note: 'Dreaming up haute couture silhouettes.' },
  { icon: '🎬', name: 'Movies', note: 'Horror & thriller, the spookier the better.' },
  { icon: '📷', name: 'Photography', note: 'Still life & nature through a soft lens.' },
  { icon: '🎨', name: 'Painting', note: 'Watercolour & acrylic, splashes everywhere.' },
  { icon: '🍳', name: 'Cooking', note: 'Making something delicious from a little bit of everything.' },
  { icon: '🛍️', name: 'Shopping pink', note: "If it's pink, it's already in my cart." },
  { icon: '💫', name: '…and many more', note: 'Forever curious, forever collecting hobbies.' },
]

const MOODS = [
  { id: 'all', label: 'All the joys' },
  { id: 'create', label: 'Make things' },
  { id: 'cozy', label: 'Cozy mode' },
  { id: 'adventure', label: 'Go places' },
]

const MOOD_BY_HOBBY = {
  Craftworks: 'create',
  'Reading fiction': 'cozy',
  Travelling: 'adventure',
  'Button collecting': 'cozy',
  'Playing piano': 'create',
  Music: 'cozy',
  'Dress designing': 'create',
  Movies: 'cozy',
  Photography: 'adventure',
  Painting: 'create',
  Cooking: 'create',
  'Shopping pink': 'adventure',
  '…and many more': 'adventure',
}

function Hobby() {
  const [mood, setMood] = useState('all')
  const [loved, setLoved] = useState([])
  const visibleHobbies = HOBBIES.filter(({ name }) => mood === 'all' || MOOD_BY_HOBBY[name] === mood)

  return (
    <main className="page hobby">
      <header className="page__head">
        <h1 className="page__title">My Hobbies</h1>
        <p className="page__subtitle">The things that make me smile ♬</p>
      </header>

      <p className="hobby__loved-count" aria-live="polite">
        {loved.length === 0
          ? 'Tap the little hearts on the ones you love ♡'
          : `You loved ${loved.length} ${loved.length === 1 ? 'hobby' : 'hobbies'} ♥`}
      </p>

      <div className="hobby__moods" role="group" aria-label="Filter hobbies by mood">
        {MOODS.map(({ id, label }) => (
          <button key={id} type="button" className={`cute-chip${mood === id ? ' is-selected' : ''}`} onClick={() => setMood(id)} aria-pressed={mood === id}>
            {label}
          </button>
        ))}
      </div>

      <section className="hobby__grid">
        {visibleHobbies.map(({ icon, name, note }, i) => (
          <article
            key={name}
            className="cute-card hobby__card pop-in"
            style={{ '--pop': i + 1 }}
          >
            <button
              type="button"
              className={`hobby__love${loved.includes(name) ? ' is-loved' : ''}`}
              onClick={() => setLoved((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])}
              aria-label={`${loved.includes(name) ? 'Unfavourite' : 'Favourite'} ${name}`}
            >
              {loved.includes(name) ? '♥' : '♡'}
            </button>
            <span className="hobby__icon emoji emoji--wiggle" aria-hidden="true">
              {icon}
            </span>
            <h2 className="hobby__name">{name}</h2>
            <p className="hobby__note">{note}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Hobby
