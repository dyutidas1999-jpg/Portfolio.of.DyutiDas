import { useState } from 'react'
import './About.scss'
import theGirl from '../images/the_girl.png'

const FACTS = [
  { icon: '💗', label: 'Forever team pink' },
  { icon: '🎹', label: 'Plays a little piano' },
  { icon: '📚', label: 'Fiction over reality' },
  { icon: '🎨', label: 'Watercolour & acrylic' },
  { icon: '✈️', label: 'Always up for travel' },
  { icon: '🔘', label: 'Secretly collects buttons' },
]

const TINY_FACTS = [
  '🍝 I make a very good plate of pasta.',
  '🧼 I love keeping everything hygienic and organized.',
  '🍱 Lunch is one of my favourite little moments of the day.',
  '📌 I would love to work at Pinterest in a truly Pinteresty role.',
]

function About() {
  const [fact, setFact] = useState(0)

  return (
    <main className="page about">
      <header className="page__head">
        <h1 className="page__title">About Me</h1>
        <p className="page__subtitle">A little hello from me to you ♡</p>
      </header>

      <section className="cute-card about__card pop-in">
        <div className="about__avatar">
          <img src={theGirl} alt="Illustration of Dyuti" />
          <span className="about__wave emoji emoji--wiggle" aria-hidden="true">
            👋
          </span>
        </div>
        <div className="about__body">
          <h2 className="about__name">Dyuti Das</h2>
          <p className="about__role">
            Frontend developer with a soft spot for pretty pixels ✧
          </p>
          <button
            type="button"
            className="about__fact-button"
            onClick={() => setFact((current) => (current + 1) % TINY_FACTS.length)}
          >
            <span>Tiny Irrelevant Fact about Me</span>
            <strong key={fact}>{TINY_FACTS[fact]}</strong>
          </button>
          <p className="about__bio">
            Hi, I&apos;m Dyuti! By day I craft React &amp; Angular interfaces at
            Accenture; by heart I&apos;m an artist who paints, plays piano, and
            designs a little haute couture on the side. I love turning ideas
            into soft, playful, pixel-perfect little worlds — and I care about
            the tiny details, like the wobble of a button or the glow behind a
            card.        
            When I&apos;m not coding you&apos;ll catch me lost in a fiction
            novel, chasing still-life &amp; nature shots with my camera,
            travelling somewhere new, or shopping for anything pink. ♡
          </p>
          <ul className="about__facts">
            {FACTS.map(({ icon, label }, i) => (
              <li
                key={label}
                className="cute-chip pop-in"
                style={{ '--pop': i + 1 }}
              >
                <span className="emoji" aria-hidden="true">
                  {icon}
                </span>{' '}
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default About
