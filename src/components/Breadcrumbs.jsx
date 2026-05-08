import { Link } from 'react-router-dom'
import styles from './Breadcrumbs.module.css'

export default function Breadcrumbs({ items }) {
  return (
    <nav className={styles.nav} aria-label="Migas de pan">
      <ol className={styles.list}>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={i} className={styles.item}>
              {item.path && !last ? (
                <Link to={item.path} className={styles.link}>
                  {item.name}
                </Link>
              ) : (
                <span className={styles.current} aria-current={last ? 'page' : undefined}>
                  {item.name}
                </span>
              )}
              {!last && (
                <span className={styles.sep} aria-hidden="true">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
