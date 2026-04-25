import { animate, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function useCountUp(target, { duration = 1.6, decimals = 0 } = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const value = useMotionValue(0)
  const rounded = useTransform(value, (v) =>
    decimals === 0 ? Math.round(v).toLocaleString('es-ES') : v.toFixed(decimals).replace('.', ',')
  )
  const [display, setDisplay] = useState(decimals === 0 ? '0' : '0,0')

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v))
    return () => unsub()
  }, [rounded])

  useEffect(() => {
    if (inView) {
      const controls = animate(value, target, { duration, ease: [0.16, 1, 0.3, 1] })
      return () => controls.stop()
    }
  }, [inView, target, value, duration])

  return [ref, display]
}
