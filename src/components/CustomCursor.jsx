import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [text, setText] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const springX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.4 })

  const ringX = useSpring(x, { stiffness: 140, damping: 22, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 140, damping: 22, mass: 0.6 })

  const ref = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const isDesktop =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      window.innerWidth > 900
    if (!isDesktop) return
    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const onMove = (e) => {
      ref.current = { x: e.clientX, y: e.clientY }
      x.set(e.clientX)
      y.set(e.clientY)

      const target = e.target
      if (target instanceof Element) {
        const trigger = target.closest('[data-cursor]')
        if (trigger) {
          setHovering(true)
          setText(trigger.getAttribute('data-cursor-text') || '')
          return
        }
      }
      setHovering(false)
      setText('')
    }

    window.addEventListener('mousemove', onMove)
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
