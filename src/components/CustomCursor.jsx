import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [text, setText] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Tighter springs + lower mass = the cursor tracks the pointer almost
  // immediately; the ring keeps a soft trailing feel without the prior lag.
  const springX = useSpring(x, { stiffness: 800, damping: 40, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 800, damping: 40, mass: 0.2 })

  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.5 })

  // Mirror hover/text in refs so the mousemove handler can compare without
  // forcing a React re-render on every pointer event.
  const hoveringRef = useRef(false)
  const textRef = useRef('')

  useEffect(() => {
    const isDesktop =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      window.innerWidth > 900
    if (!isDesktop) return
    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)

      const target = e.target
      let nextHovering = false
      let nextText = ''
      if (target instanceof Element) {
        const trigger = target.closest('[data-cursor]')
        if (trigger) {
          nextHovering = true
          nextText = trigger.getAttribute('data-cursor-text') || ''
        }
      }

      if (nextHovering !== hoveringRef.current) {
        hoveringRef.current = nextHovering
        setHovering(nextHovering)
      }
      if (nextText !== textRef.current) {
        textRef.current = nextText
        setText(nextText)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className={styles.dot}
        style={{ x: springX, y: springY }}
        aria-hidden="true"
      />
      <motion.div
        className={`${styles.ring} ${hovering ? styles.ringActive : ''}`}
        style={{ x: ringX, y: ringY }}
        aria-hidden="true"
      >
        {text && <span className={styles.ringText}>{text}</span>}
      </motion.div>
    </>
  )
}
