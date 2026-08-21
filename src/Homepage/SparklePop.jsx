import { useCallback, useEffect, useRef, useState } from 'react'

const CUTE = ['🍓', '🧁', '🌸', '🎀', '💖', '⭐', '🍰', '🐰']
const BOMB = '💣'
const CELLS = 9
const ROUND = 20 // seconds

// Which cells are "up" right now, and whether each is a treat or a bomb.
const emptyBoard = () => Array.from({ length: CELLS }, () => null)

function SparklePop() {
  const [board, setBoard] = useState(emptyBoard)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [time, setTime] = useState(ROUND)
  const [playing, setPlaying] = useState(false)
  const [pop, setPop] = useState(null) // cell index flashing a "+1"/"boom"
  const timers = useRef([])

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current.forEach(clearInterval)
    timers.current = []
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const start = () => {
    clearTimers()
    setBoard(emptyBoard())
    setScore(0)
    setTime(ROUND)
    setPlaying(true)

    const countdown = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(countdown)
          return 0
        }
        return t - 1
      })
    }, 1000)
    timers.current.push(countdown)
  }

  // Spawn loop: while playing, pop a random critter into a free cell.
  useEffect(() => {
    if (!playing) return undefined

    const spawn = setInterval(() => {
      setBoard((prev) => {
        const free = prev.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0)
        if (!free.length) return prev
        const cell = free[Math.floor(Math.random() * free.length)]
        const next = [...prev]
        const isBomb = Math.random() < 0.2
        next[cell] = {
          face: isBomb ? BOMB : CUTE[Math.floor(Math.random() * CUTE.length)],
          bomb: isBomb,
        }
        // Auto-hide after a short, shrinking window.
        const life = 700 + Math.random() * 500
        const hide = setTimeout(() => {
          setBoard((b) => {
            if (b[cell] == null) return b
            const copy = [...b]
            copy[cell] = null
            return copy
          })
        }, life)
        timers.current.push(hide)
        return next
      })
    }, 620)
    timers.current.push(spawn)

    return () => clearInterval(spawn)
  }, [playing])

  // End the round when the clock runs out.
  useEffect(() => {
    if (playing && time === 0) {
      setPlaying(false)
      setBoard(emptyBoard())
      setBest((b) => Math.max(b, score))
    }
  }, [time, playing, score])

  const whack = (i) => {
    const item = board[i]
    if (!playing || !item) return
    setBoard((b) => {
      const copy = [...b]
      copy[i] = null
      return copy
    })
    setPop({ i, bomb: item.bomb })
    setTimeout(() => setPop(null), 450)
    setScore((s) => Math.max(0, s + (item.bomb ? -3 : 1)))
  }

  return (
    <section className="mini mini--pop cute-card" aria-label="Sparkle Pop game">
      <header className="mini__head">
        <h2 className="mini__title">Sparkle Pop</h2>
        <p className="mini__hint">Tap the treats, dodge the 💣</p>
      </header>

      <div className="mini__stats">
        <span className="cute-chip">Score {score}</span>
        <span className="cute-chip">{playing ? `⏱ ${time}s` : `Best ${best}`}</span>
      </div>

      <div className="mini__grid mini__grid--pop">
        {board.map((item, i) => (
          <button
            key={i}
            type="button"
            className={`mini__hole${item ? ' is-up' : ''}${
              pop?.i === i ? (pop.bomb ? ' is-boom' : ' is-hit') : ''
            }`}
            onClick={() => whack(i)}
            disabled={!playing}
            aria-label={item ? 'Pop it' : 'empty'}
          >
            <span className="mini__critter">{item?.face}</span>
            {pop?.i === i && (
              <span className="mini__float">{pop.bomb ? '-3' : '+1'}</span>
            )}
          </button>
        ))}
      </div>

      <button type="button" className="mini__play" onClick={start}>
        {playing ? 'Restart' : 'Play ♡'}
      </button>
    </section>
  )
}

export default SparklePop
