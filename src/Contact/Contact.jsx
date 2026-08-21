import { useState } from 'react'
import './Contact.scss'

const INBOX_KEY = 'dyuti-inbox'
const INBOX_EVENT = 'dyuti-inbox-change'

const BRAND_ICONS = {
  whatsapp: (
    <svg viewBox="0 0 24 24" width="18" height="18" role="img" aria-hidden="true">
      <path
        fill="#25D366"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      />
    </svg>
  ),
  gmail: (
    <svg viewBox="0 0 24 24" width="18" height="18" role="img" aria-hidden="true">
      <path fill="#4285F4" d="M22.05 3H1.95C.873 3 0 3.873 0 4.95v14.1C0 20.127.873 21 1.95 21H4.5V9.9l7.5 5.625L19.5 9.9V21h2.55c1.077 0 1.95-.873 1.95-1.95V4.95C24 3.873 23.127 3 22.05 3z" />
      <path fill="#34A853" d="M0 19.05C0 20.127.873 21 1.95 21H4.5V9.9L0 6.525z" />
      <path fill="#FBBC04" d="M19.5 21h2.55c1.077 0 1.95-.873 1.95-1.95V6.525L19.5 9.9z" />
      <path fill="#EA4335" d="M4.5 9.9L0 6.525V4.95C0 3.873.873 3 1.95 3h.3L12 10.125 21.75 3h.3C23.127 3 24 3.873 24 4.95v1.575L19.5 9.9 12 15.525z" />
      <path fill="#C5221F" d="M0 4.95v1.575L4.5 9.9V3H1.95C.873 3 0 3.873 0 4.95z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="18" height="18" role="img" aria-hidden="true">
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="30%" stopColor="#DD2A7B" />
          <stop offset="60%" stopColor="#8134AF" />
          <stop offset="100%" stopColor="#515BD4" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ig-gradient)"
        d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z"
      />
    </svg>
  ),
}

const LINKS = [
  { brand: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/916290642867' },
  { icon: '📞', label: '+91 62906 42867', href: 'tel:+916290642867' },
  { brand: 'gmail', label: 'dyutidas1999@gmail.com', href: 'mailto:dyutidas1999@gmail.com' },
  { brand: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/dyutidas1999' },
  { brand: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/d.y.u.t.i.d.a.s' },
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
        {LINKS.map(({ icon, brand, label, href }, i) => (
          <a
            key={label}
            className="cute-chip contact__link pop-in"
            style={{ '--pop': i + 1 }}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
          >
            {brand ? (
              <span className="contact__brand" aria-hidden="true">
                {BRAND_ICONS[brand]}
              </span>
            ) : (
              <span className="emoji" aria-hidden="true">
                {icon}
              </span>
            )}{' '}
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

