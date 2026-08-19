import { useState } from 'react'
import './Contact.scss'

const INBOX_KEY = 'dyuti-inbox'
const INBOX_EVENT = 'dyuti-inbox-change'

const LINKS = [
  { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/916290642867' },
  { icon: '📞', label: '+91 62906 42867', href: 'tel:+916290642867' },
  { icon: '💌', label: 'dyutidas1999@gmail.com', href: 'mailto:dyutidas1999@gmail.com' },
  { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/dyutidas1999' },
  { icon: '📸', label: 'Instagram', href: 'https://www.instagram.com/d.y.u.t.i.d.a.s' },
]

const readInbox = () => {
  try {
    return JSON.parse(localStorage.getItem(INBOX_KEY) || '[]')
  } catch {
    return []
  }
}

function Contact() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [justSent, setJustSent] = useState(false)

  // Saves the note into the shared inbox and pings the floating bubble to
  // refresh — no email, no SMS.
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!message.trim()) return
    const note = {
      id: Date.now(),
      name: name.trim() || 'A new friend',
      message: message.trim(),
      time: new Date().toISOString(),
    }
    localStorage.setItem(INBOX_KEY, JSON.stringify([note, ...readInbox()]))
    window.dispatchEvent(new Event(INBOX_EVENT))
    setName('')
    setMessage('')
    setJustSent(true)
  }

  return (
    <main className="page contact">
      <header className="page__head">
        <h1 className="page__title">Contact Me</h1>
        <p className="page__subtitle">
          Let&apos;s make something sweet together{' '}
          <span className="emoji emoji--wiggle" aria-hidden="true">
            ✎
          </span>
        </p>
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
            <span className="emoji" aria-hidden="true">
              {icon}
            </span>{' '}
            {label}
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
          <span>Your comment</span>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              setJustSent(false)
            }}
            placeholder="Say something nice ♡"
            maxLength={280}
            required
          />
          <span className="contact__counter">{message.length}/280 little characters</span>
        </label>
        <div className="contact__preview" aria-live="polite">
          <span>
            {justSent ? 'Popped into your comment box ♡' : 'Tiny preview'}
          </span>
          <strong>{message || 'Your lovely comment will appear here...'}</strong>
        </div>
        <button type="submit" className="contact__send">
          Drop in the comment box{' '}
          <span className="emoji" aria-hidden="true">
            💌
          </span>
        </button>
      </form>
    </main>
  )
}

export default Contact

