import './About.scss'
import theGirl from '../images/the_girl.png'

const FACTS = [
  '💗 Forever team pink',
  '🎹 Plays a little piano',
  '📚 Fiction over reality',
  '🎨 Watercolour & acrylic',
  '✈️ Always up for travel',
  '🔘 Secretly collects buttons',
]

function About() {
  return (
    <main className="page about">
      <header className="page__head">
        <h1 className="page__title">About Me</h1>
        <p className="page__subtitle">A little hello from me to you ♡</p>
      </header>

      <section className="cute-card about__card pop-in">
        <div className="about__avatar">
          <img src={theGirl} alt="Illustration of Dyuti" />
          <span className="about__wave" aria-hidden="true">
            👋
          </span>
        </div>
        <div className="about__body">
          <h2 className="about__name">Dyuti Das</h2>
          <p className="about__role">
            Frontend developer with a soft spot for pretty pixels ✧
          </p>
          <p className="about__bio">
            Hi, I&apos;m Dyuti! By day I craft React &amp; Angular interfaces at
            Accenture; by heart I&apos;m an artist who paints, plays piano, and
            designs a little haute couture on the side. I love turning ideas
            into soft, playful, pixel-perfect little worlds — and I care about
            the tiny details, like the wobble of a button or the glow behind a
            card.
          </p>
          <p className="about__bio">
            When I&apos;m not coding you&apos;ll catch me lost in a fiction
            novel, chasing still-life &amp; nature shots with my camera,
            travelling somewhere new, or shopping for anything pink. ♡
          </p>
          <ul className="about__facts">
            {FACTS.map((fact, i) => (
              <li
                key={fact}
                className="cute-chip pop-in"
                style={{ '--pop': i + 1 }}
              >
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default About
