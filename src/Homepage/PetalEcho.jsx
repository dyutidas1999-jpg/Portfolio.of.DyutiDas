import { useCallback, useEffect, useRef, useState } from 'react'

// Four petal pads: colour + face. Their index is what the sequence stores.
const PADS = [
  { face: '🌸', color: '#ff9ecb' },
  { face: '🌼', color: '#ffd36b' },
  { face: '🌷', color: '#c79bff' },
  { face: '🌻', color: '#8ad6b6' },
]

const bestKey = 'petal-echo-best'

function PetalEcho() {
  const [sequence, setSequence] = useState([])
  const [step, setStep] = useState(0) // how far the player has echoed
  const [active, setActive] = useState(null) // pad lit right now
  const [watching, setWatching] = useState(false) // sequence is playing back
  const [playing, setPlaying] = useState(false)
  const [message, setMessage] = useState('Repeat the petals ♡')
  const [best, setBest] = useState(() => {
    const stored = Number(localStorage.getItem(bestKey))
    return Number.isFinite(stored) && stored > 0 ? stored : 0
  })
  const timers = useRef([])

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  // Light each pad in turn, then hand control back to the player.
  const playBack = useCallback(
    (seq) => {
      setWatching(true)
      setStep(0)
      seq.forEach((pad, i) => {
        const on = setTimeout(() => setActive(pad), 600 * i + 250)
        const off = setTimeout(() => setActive(null), 600 * i + 600)
        timers.current.push(on, off)
      })
      const done = setTimeout(() => setWatching(false), 600 * seq.length + 300)
      timers.current.push(done)
    },
    [],
  )

  const addStep = useCallback(
    (seq) => {
      const next = [...seq, Math.floor(Math.random() * PADS.length)]
      setSequence(next)
      setMessage(`Round ${next.length} ✿`)
      playBack(next)
    },
    [playBack],
  )

  const start = () => {
    clearTimers()
    setPlaying(true)
    setSequence([])
    setStep(0)
    addStep([])
  }

  const tap = (i) => {
    if (!playing || watching) return
    setActive(i)
    setTimeout(() => setActive((a) => (a === i ? null : a)), 220)

    if (i !== sequence[step]) {
      setPlaying(false)
      setWatching(false)
      setMessage(`Oops! Reached round ${sequence.length} ♡`)
      setBest((b) => {
        const record = Math.max(b, sequence.length - 1 < 0 ? 0 : sequence.length)
        localStorage.setItem(bestKey, String(record))
        return record
      })
      return
    }

    const nextStep = step + 1
    if (nextStep === sequence.length) {
      setMessage('Nice! ✧')
      const grow = setTimeout(() => addStep(sequence), 700)
      timers.current.push(grow)
    } else {
      setStep(nextStep)
    }
  }

  return (
    <section className="mini mini--echo cute-card" aria-label="Petal Echo game">
      <header className="mini__head">
        <h2 className="mini__title">Petal Echo</h2>
        <p className="mini__hint">{message}</p>
      </header>

      <div className="mini__stats">
        <span className="cute-chip">Round {sequence.length || 0}</span>
        <span className="cute-chip">Best {best}</span>
      </div>

      <div className="mini__grid mini__grid--echo">
        {PADS.map((pad, i) => (
          <button
            key={i}
            type="button"
            className={`mini__pad${active === i ? ' is-lit' : ''}`}
            style={{ '--pad': pad.color }}
            onClick={() => tap(i)}
            disabled={!playing || watching}
            aria-label={`Petal ${i + 1}`}
          >
            <span className="mini__petal">{pad.face}</span>
          </button>
        ))}
      </div>

      <button type="button" className="mini__play" onClick={start}>
        {playing ? 'Restart' : 'Play ♡'}
      </button>
    </section>
  )
}

export default PetalEcho
