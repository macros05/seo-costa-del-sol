import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllPosts, formatDate } from '../lib/posts'
import styles from './BlogIndex.module.css'

export default function BlogIndex() {
  const posts = getAllPosts()

  useEffect(() => {
    document.title = 'Blog SEO Costa del Sol | Marcos Morales'
    setMeta('description', 'Artículos prácticos de SEO local para negocios en Málaga, Marbella, Fuengirola, Benalmádena, Torremolinos y Nerja. Publicación diaria.')
    setCanonical('https://seocostadelsol.com/blog')
  }, [])

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <span className="eyebrow">Blog · Costa del Sol</span>
          <h1 className={styles.title}>
            SEO LOCAL,
            <span className={styles.titleAccent}> SIN HUMO.</span>
          </h1>
          <p className={styles.lede}>
            Cada día publicamos un artículo concreto y accionable para dueños de negocios locales en la Costa del Sol.
            Sin tecnicismos, sin spam, sin paja.
          </p>
        </div>
      </header>

      <section className={styles.grid}>
        <div className="container">
          {posts.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyDot} />
              <p>El primer artículo se publica mañana a las 09:00.</p>
            </div>
          ) : (
            <div className={styles.cards}>
              {posts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  className={styles.card}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={`/blog/${post.slug}`} className={styles.cardLink} data-cursor data-cursor-text="Leer">
                    <div className={styles.cardImage}>
                      {post.imageUrl ? (
                        <img src={post.imageUrl} alt={post.imageAlt || post.title} loading="lazy" />
                      ) : (
                        <div className={styles.cardPlaceholder} />
                      )}
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span>{formatDate(post.publishedAt)}</span>
                        <span className={styles.cardDot} />
                        <span>{post.readingTime} min</span>
                      </div>
                      <h2 className={styles.cardTitle}>{post.title}</h2>
                      <p className={styles.cardExcerpt}>{post.metaDescription}</p>
                      <span className={styles.cardArrow}>
                        Leer artículo
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 7h12m0 0L8 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setCanonical(href) {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}
