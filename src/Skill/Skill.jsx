import { useState } from 'react'
import './Skill.scss'
import {
  siAgentskills,
  siAngular,
  siClaude,
  siClaudecode,
  siCss,
  siDotnet,
  siGithubcopilot,
  siHtml5,
  siJavascript,
  siReact,
  siSass,
  siTypescript,
} from 'simple-icons'
import azureIcon from 'devicon/icons/azure/azure-original.svg?url'
import csharpIcon from 'devicon/icons/csharp/csharp-original.svg?url'
import sqlServerIcon from 'devicon/icons/azuresqldatabase/azuresqldatabase-original.svg?url'

const SkillIcon = ({ icon }) =>
  icon?.src ? (
    <img src={icon.src} alt="" />
  ) : (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path fill={`#${icon.hex}`} d={icon.path} />
    </svg>
  )

const GROUPS = [
  {
    title: 'Frontend ✧',
    skills: [
      { icon: siReact, name: 'React' },
      { icon: siAngular, name: 'Angular' },
      { icon: siHtml5, name: 'HTML' },
      { icon: siCss, name: 'CSS' },
      { icon: siSass, name: 'SCSS' },
      { icon: siJavascript, name: 'JavaScript' },
      { icon: siTypescript, name: 'TypeScript' },
    ],
  },
  {
    title: 'Backend & Data ♬',
    skills: [
      { icon: { src: csharpIcon }, name: 'C#' },
      { icon: siDotnet, name: 'Dot Net' },
      { icon: { src: sqlServerIcon }, name: 'SQL Server' },
    ],
  },
  {
    title: 'Cloud & AI ✩',
    skills: [
      { icon: { src: azureIcon }, name: 'Microsoft Azure' },
      { icon: siGithubcopilot, name: 'GitHub Copilot' },
      { icon: siClaudecode || siClaude, name: 'Claude Code' },
      { icon: siAgentskills, name: 'Agentic AI' },
    ],
  },
]

const SKILL_RATINGS = {
  React: { score: 8, stars: 4 },
  Angular: { score: 7, stars: 3.5 },
  HTML: { score: 8, stars: 4 },
  CSS: { score: 8, stars: 4 },
  SCSS: { score: 8, stars: 4 },
  JavaScript: { score: 7, stars: 3.5 },
  TypeScript: { score: 7, stars: 3.5 },
  'Microsoft Azure': { score: 8, stars: 4 },
  'GitHub Copilot': { score: 9, stars: 4.5 },
  'Claude Code': { score: 9, stars: 4.5 },
  'Agentic AI': { score: 7, stars: 3.5 },
  'C#': { score: 4, stars: 2 },
  'Dot Net': { score: 4, stars: 2 },
  'SQL Server': { score: 4, stars: 2 },
}

function Skill() {
  const [selected, setSelected] = useState('React')
  const selectedSkill = GROUPS.flatMap(({ skills }) => skills).find(({ name }) => name === selected)
  const rating = SKILL_RATINGS[selected]

  return (
    <main className="page skill">
      <header className="page__head">
        <h1 className="page__title">My Skills</h1>
        <p className="page__subtitle">The little toolkit I build with ✩</p>
      </header>

      <div className="skill__focus cute-card" aria-live="polite">
        <div
          className="skill__score-ring"
          style={{ '--skill-score': `${rating.score * 10}%` }}
          aria-label={`${rating.score} out of 10 fluency`}
        >
          <span className="skill__score-value">{rating.score}</span>
          <span className="skill__score-max">/10</span>
        </div>
        <div className="skill__focus-copy">
          <span className="skill__focus-icon emoji--wiggle">
            <SkillIcon icon={selectedSkill?.icon} />
          </span>
          <span className="skill__focus-label">Selected skill</span>
          <strong>{selected}</strong>
          <div className="skill__fluency-track" aria-label={`Fluency ${rating.score} out of 10`}>
            {Array.from({ length: 10 }, (_, index) => (
              <span key={index} className={index < rating.score ? 'is-filled' : ''} />
            ))}
          </div>
          <small>Fluency level</small>
        </div>
        <div className="skill__stars" aria-label={`${rating.stars} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, index) => {
            const fill = rating.stars - index
            const state = fill >= 1 ? 'is-full' : fill === 0.5 ? 'is-half' : 'is-empty'
            return <span key={index} className={state} aria-hidden="true">★</span>
          })}
          <small>{rating.stars} stars</small>
        </div>
      </div>

      <div className="skill__groups">
        {GROUPS.map(({ title, skills }, g) => (
          <section key={title} className="cute-card skill__group pop-in" style={{ '--pop': g + 1 }}>
            <h2 className="skill__group-title">{title}</h2>
            <ul className="skill__list">
              {skills.map(({ icon, name }, i) => (
                <li
                  key={name}
                  className="skill__badge pop-in"
                  style={{ '--pop': g * 3 + i + 1 }}
                  onClick={() => setSelected(name)}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(event) => event.key === 'Enter' && setSelected(name)}
                  aria-pressed={selected === name}
                >
                  <span className="skill__badge-icon" aria-hidden="true">
                    <SkillIcon icon={icon} />
                  </span>
                  {name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}

export default Skill
