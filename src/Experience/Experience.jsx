import './Experience.scss'

const ROLES = [
  { icon: '🚀', role: 'Software Engineering Analyst', period: "Dec '2024 — Present" },
  { icon: '🌱', role: 'Software Development Associate', period: "Oct '2022 — Nov '2024" },
]

const PROJECTS = [
  {
    icon: '🎟️',
    name: 'EventUK',
    role: 'Frontend Developer',
    stack: ['React.js', 'Azure DevOps'],
    notes: [
      'Developed and maintained features with the frontend team using React.js.',
      'Participated in deployment activities through Azure DevOps.',
    ],
  },
  {
    icon: '🛍️',
    name: "Macy's",
    role: 'Frontend Developer',
    stack: ['React.js', 'GCP', 'GitLab'],
    notes: [
      'Contributed to frontend development using React.js.',
      'Assisted with deployments using GitLab and Google Cloud Platform.',
    ],
  },
  {
    icon: '🏦',
    name: 'Public Investment Fund (PIF)',
    role: 'Frontend Developer',
    stack: ['React.js', 'Azure DevOps', 'Bomgar'],
    notes: [
      'Developed frontend features using React.js.',
      'Deployed changes through Azure DevOps in the Bomgar environment.',
    ],
  },
  {
    icon: '🇸🇬',
    name: 'Inland Revenue Authority of Singapore (IRAS)',
    role: 'Frontend Developer',
    stack: ['AngularJS', 'Azure Virtual Machine'],
    notes: [
      'Worked on frontend development and maintenance using AngularJS.',
      'Performed development in an Azure Virtual Machine environment.',
    ],
  },
  {
    icon: '📊',
    name: 'Maximus',
    role: 'Frontend Developer',
    stack: ['AngularJS', 'Azure Data Studio'],
    notes: [
      'Developed and maintained frontend modules using AngularJS.',
      'Used Azure Data Studio for script execution and data maintenance.',
    ],
  },
  {
    icon: '🤝',
    name: 'Avanade Shared Service',
    role: 'Frontend Developer',
    stack: ['AngularJS', 'SSMS'],
    notes: [
      'Worked on frontend development using AngularJS.',
      'Used SQL Server Management Studio for database scripts and data tasks.',
    ],
  },
  {
    icon: '⚙️',
    name: 'NextDecade LLC',
    role: 'Backend Developer',
    stack: ['.NET', 'C#', 'Windows App'],
    notes: [
      'Worked on backend integration using .NET and C#.',
      'Performed unit testing in a Windows application environment.',
    ],
  },
  {
    icon: '🛢️',
    name: 'Australian Pipeline Agency',
    role: 'Backend Developer',
    stack: ['.NET', 'C#', 'Citrix'],
    notes: [
      'Contributed to backend integration using .NET and C#.',
      'Performed unit testing in a Citrix environment.',
    ],
  },
]

function Experience() {
  return (
    <main className="page experience">
      <header className="page__head">
        <h1 className="page__title">My Experience</h1>
        <p className="page__subtitle">A little journey, one hop at a time ✧</p>
      </header>

      <section className="cute-card experience__company pop-in">
        <span className="experience__logo" aria-hidden="true">
          💼
        </span>
        <div className="experience__company-body">
          <h2 className="experience__company-name">Accenture</h2>
          <p className="experience__company-sub">My very first company ♡</p>
          <ul className="experience__roles">
            {ROLES.map(({ icon, role, period }) => (
              <li key={role} className="experience__role-row">
                <span className="experience__role-icon" aria-hidden="true">
                  {icon}
                </span>
                <span className="experience__role-name">{role}</span>
                <span className="experience__role-period">{period}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <h2 className="experience__projects-title">Projects I&apos;ve loved ✿</h2>

      <section className="experience__grid">
        {PROJECTS.map(({ icon, name, role, stack, notes }, i) => (
          <article
            key={name}
            className="cute-card experience__card pop-in"
            style={{ '--pop': i + 1 }}
          >
            <div className="experience__card-head">
              <span className="experience__card-icon" aria-hidden="true">
                {icon}
              </span>
              <div>
                <h3 className="experience__card-name">{name}</h3>
                <p className="experience__card-role">{role}</p>
              </div>
            </div>
            <ul className="experience__stack">
              {stack.map((tech) => (
                <li key={tech} className="experience__tag">
                  {tech}
                </li>
              ))}
            </ul>
            <ul className="experience__notes">
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Experience
