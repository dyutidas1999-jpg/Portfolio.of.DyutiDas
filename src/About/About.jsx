import { useState } from 'react'
import './About.scss'
import theGirl from '../images/the_girl.png'

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
            Hi, I&apos;m Dyuti Das — born and brought up in Kolkata, now in my
            twenties and happily married to my favorite human. By day, I&apos;m a
            Software Engineer at Accenture, crafting pixel-perfect frontends in
            React and Angular for clients spanning the UK, US, Saudi Arabia, and
            Singapore, occasionally even teaming up with AI tools like GitHub
            Copilot and Claude Code. Off the clock, I paint watercolors, design
            haute couture, play piano, collect buttons, read fiction, travel
            often, snap photographs, and binge horror movies while hunting for
            anything pink. Curious, creative, and endlessly excited about
            everyday life — that&apos;s me, in a nutshell.
          </p>
        </div>
      </section>
    </main>
  )
}

export default About
