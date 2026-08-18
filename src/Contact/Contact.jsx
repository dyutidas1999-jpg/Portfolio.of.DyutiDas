import { useState } from 'react'
import './Contact.scss'

const LINKS = [
  { icon: '�', label: 'WhatsApp', href: 'https://wa.me/916290642867' },
  { icon: '📞', label: '+91 62906 42867', href: 'tel:+916290642867' },
  { icon: '💌', label: 'dyutidas1999@gmail.com', href: 'mailto:dyutidas1999@gmail.com' },
  { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/dyutidas1999' },
  { icon: '📸', label: 'Instagram', href: 'https://www.instagram.com/d.y.u.t.i.d.a.s' },
]

function Contact() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Hi from ${name || 'a new friend'} ♡`)
    const body = encodeURIComponent(message)
    window.location.href = `mailto:dyutidas1999@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <main className="page contact">
      <header className="page__head">
        <h1 className="page__title">Contact Me</h1>
        <p className="page__subtitle">Let&apos;s make something sweet together ✎</p>
      </header>

      <div className="contact__links">
        {LINKS.map(({ icon, label, href }, i) => (
          <a
            key={label}
            className="cute-chip contact__link pop-in"
            style={{ '--pop': i + 1 }}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
          >
            <span aria-hidden="true">{icon}</span> {label}
          </a>
        ))}
      </div>

      <form className="cute-card contact__form pop-in" onSubmit={handleSubmit}>
        <label className="contact__field">
          <span>Your name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What should I call you?"
          />
        </label>
        <label className="contact__field">
          <span>Your message</span>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say something nice ♡"
            required
          />
        </label>
        <button type="submit" className="contact__send">
          Send with love 💗
        </button>
      </form>
    </main>
  )
}

export default Contact
