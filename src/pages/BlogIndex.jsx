import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo, { breadcrumbJsonLd, SITE_URL } from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import { getAllPosts, formatDate } from '../lib/posts'
import styles from './BlogIndex.module.css'

export default function BlogIndex() {
  const posts = getAllPosts()
  const path = '/blog'

  const jsonLd = [
    breadcrumbJsonLd([{ name: 'Inicio', path: '/' }, { name: 'Blog', path }]),
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${SITE_URL}${path}`,
      name: 'Blog SEO Costa del Sol',
      description: 'Artículos prácticos de SEO local para negocios en Málaga, Marbella, Fuengirola, Benalmádena, Torremolinos y Nerja.',
      url: `${SITE_URL}${path}`,
      publisher: { '@id': `${SITE_URL}/#business` },
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.publishedAt,
        image: p.imageUrl ? `${SITE_URL}${p.imageUrl}` : undefined
      }))
    }
  ]

  return (
    <>
      <Seo
        title="Blog SEO Costa del Sol | Marcos Morales"
        description="Artículos prácticos de SEO local para negocios en Málaga, Marbella, Fuengirola, Benalmádena, Torremolinos y Nerja. Publicación diaria, sin tecnicismos."
        path={path}
        jsonLd={jsonLd}
      />

      <main className={styles.page}>
        <div className="container">
          <Breadcrumbs items={[{ name: 'Inicio', path: '/' }, { name: 'Blog' }]} />
        </div>

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
                          <img
                            src={post.imageUrl}
                            alt={post.imageAlt || post.title}
                            loading={i < 2 ? 'eager' : 'lazy'}
                            fetchpriority={i === 0 ? 'high' : 'auto'}
                            width="800"
                            height="450"
                          />
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
    </>
  )
}
