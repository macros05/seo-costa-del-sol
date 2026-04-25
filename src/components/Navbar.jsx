import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const links = [
  { href: '/#problema', label: 'El problema' },
  { href: '/#servicio', label: 'Servicio' },
  { href: '/#proceso', label: 'Proceso' },
  { href: '/#sectores', label: 'Sectores' },
  { href: '/blog', label: 'Blog', route: true }
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 100)
  })

  // On the homepage the navbar appears after scrolling past the hero.
  // On every other route it should be visible from the start.
  const show = !isHome || scrolled

  return (
    <AnimatePresence>
      {show && (
        <motion.header
          className={styles.nav}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.inner}>
            <Link to="/" className={styles.logo} data-cursor data-cursor-text="Inicio">
              <span className={styles.logoMark}>M</span>
              <span className={styles.logoWord}>
                Marcos<span className={styles.logoDot}>.</span>
              </span>
              <span className={styles.logoMeta}>SEO · Costa del Sol</span>
            </Link>

            <nav className={styles.links} aria-label="Navegación principal">
              {links.map((l) =>
                l.route ? (
                  <Link key={l.href} to={l.href} className={styles.link} data-cursor>
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.href} href={l.href} className={styles.link} data-cursor>
                    {l.label}
                  </a>
                )
              )}
            </nav>

            <div className={styles.actions}>
              <a href="/#contacto" className={styles.cta} data-cursor data-cursor-text="Empezar">
                <span>Auditoría gratis</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </a>

              <button
                className={styles.burger}
                onClick={() => setOpen(!open)}
                aria-label="Abrir menú"
                aria-expanded={open}
              >
                <span className={open ? styles.burgerOpen : ''} />
                <span className={open ? styles.burgerOpen : ''} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                className={styles.mobile}
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.mobileInner}>
                  {links.map((l, i) => {
                    const props = {
                      key: l.href,
                      onClick: () => setOpen(false),
                      className: styles.mobileLink,
                      initial: { opacity: 0, x: -20 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: 0.1 + i * 0.06 }
                    }
                    return l.route ? (
                      <motion.span {...props}>
                        <Link to={l.href} onClick={() => setOpen(false)} className={styles.mobileLinkInner}>
                          <span className={styles.mobileNum}>0{i + 1}</span>
                          {l.label}
                        </Link>
                      </motion.span>
                    ) : (
                      <motion.a href={l.href} {...props}>
                        <span className={styles.mobileNum}>0{i + 1}</span>
                        {l.label}
                      </motion.a>
                    )
                  })}
                  <a href="/#contacto" onClick={() => setOpen(false)} className={styles.mobileCta}>
                    Auditoría gratis →
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
