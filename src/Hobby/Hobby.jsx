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
  { icon: '🛍️', name: 'Shopping pink', note: "If it's pink, it's already in my cart." },
  { icon: '💫', name: '…and many more', note: 'Forever curious, forever collecting hobbies.' },
]

function Hobby() {
  return (
    <main className="page hobby">
      <header className="page__head">
        <h1 className="page__title">My Hobbies</h1>
        <p className="page__subtitle">The things that make me smile ♬</p>
      </header>

      <section className="hobby__grid">
        {HOBBIES.map(({ icon, name, note }, i) => (
          <article
            key={name}
            className="cute-card hobby__card pop-in"
            style={{ '--pop': i + 1 }}
          >
            <span className="hobby__icon" aria-hidden="true">
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
