import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const springX = useSpring(x, { stiffness: 800, damping: 40, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 800, damping: 40, mass: 0.2 })

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
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      className={styles.dot}
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    />
  )
}
