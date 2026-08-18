import './Skill.scss'

const GROUPS = [
  {
    title: 'Frontend ✧',
    skills: [
      { icon: '⚛️', name: 'React' },
      { icon: '🅰️', name: 'Angular' },
      { icon: '🧱', name: 'HTML' },
      { icon: '🎨', name: 'CSS & SCSS' },
      { icon: '📜', name: 'JavaScript' },
      { icon: '🔷', name: 'TypeScript' },
    ],
  },
  {
    title: 'Backend & Data ♬',
    skills: [
      { icon: '🎯', name: 'C#' },
      { icon: '🟣', name: '.NET' },
      { icon: '🗄️', name: 'SQL Server' },
    ],
  },
  {
    title: 'Cloud & AI ✩',
    skills: [
      { icon: '☁️', name: 'Microsoft Azure' },
      { icon: '🤖', name: 'GitHub Copilot' },
      { icon: '🧠', name: 'Claude Code' },
      { icon: '✨', name: 'Agentic AI' },
    ],
  },
]

function Skill() {
  return (
    <main className="page skill">
      <header className="page__head">
        <h1 className="page__title">My Skills</h1>
        <p className="page__subtitle">The little toolkit I build with ✩</p>
      </header>

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
                >
                  <span className="skill__badge-icon" aria-hidden="true">
                    {icon}
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
