import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo, { breadcrumbJsonLd, articleJsonLd } from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import { getPost, getRelatedPosts, formatDate } from '../lib/posts'
import styles from './BlogPost.module.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  useEffect(() => {
    if (post) window.scrollTo(0, 0)
  }, [post])

  if (!post) return <Navigate to="/blog" replace />

  const path = `/blog/${post.slug}`
  const related = getRelatedPosts(post, 3)

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Inicio', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path }
    ]),
    articleJsonLd({
      title: post.title,
      description: post.metaDescription,
      slug: post.slug,
      image: post.imageUrl,
      datePublished: post.publishedAt,
      dateModified: post.dateModified || post.publishedAt,
      wordCount: post.wordCount,
      keywords: post.keywords,
      articleSection: post.sector
    })
  ]

  return (
    <>
      <Seo
        title={`${post.title} | Blog SEO Costa del Sol`}
        description={post.metaDescription}
        path={path}
        ogImage={post.imageUrl ? `https://seocostadelsol.com${post.imageUrl}` : undefined}
        type="article"
        publishedTime={post.publishedAt}
        jsonLd={jsonLd}
      />
      <main className={styles.page}>
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Inicio', path: '/' },
              { name: 'Blog', path: '/blog' },
              { name: post.title }
            ]}
          />
        </div>
        <article>
          <header className={styles.hero}>
            <div className="container">
              <Link to="/blog" className={styles.back} data-cursor>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M13 7H1m0 0l5-5m-5 5l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
                Volver al blog
              </Link>

              <div className={styles.meta}>
                <span>{formatDate(post.publishedAt)}</span>
                <span className={styles.metaDot} />
                <span>{post.readingTime} min de lectura</span>
              </div>

              <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {post.title}
              </motion.h1>
            </div>

            {post.imageUrl && (
              <motion.div
                className={styles.heroImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                <img
                  src={post.imageUrl}
                  alt={post.imageAlt || post.title}
                  width="1600"
                  height="900"
                  loading="eager"
                  fetchpriority="high"
                />
              </motion.div>
            )}
          </header>

          <div className="container">
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <aside className={styles.cta}>
              <div className={styles.ctaInner}>
                <span className={styles.ctaEyebrow}>¿Te ha resonado?</span>
                <h2 className={styles.ctaTitle}>
                  Audito tu negocio gratis y te digo
                  <br /> <span className={styles.ctaAccent}>qué arreglar primero.</span>
                </h2>
                <p className={styles.ctaText}>
                  Si lo que has leído te suena, mira tu propio caso. La auditoría inicial es gratuita,
                  sin compromiso, y la recibes en 48 horas.
                </p>
                <Link to="/#contacto" className={styles.ctaBtn} data-cursor>
                  Solicitar auditoría gratis →
                </Link>
              </div>
            </aside>

            {related.length > 0 && (
              <section className={styles.related}>
                <h2 className={styles.relatedTitle}>Más artículos del blog</h2>
                <div className={styles.relatedGrid}>
                  {related.map((p) => (
                    <Link key={p.slug} to={`/blog/${p.slug}`} className={styles.relatedCard} data-cursor>
                      {p.imageUrl && (
                        <img
                          src={p.imageUrl}
                          alt={p.imageAlt || p.title}
                          loading="lazy"
                          width="400"
                          height="225"
                        />
                      )}
                      <div className={styles.relatedBody}>
                        <span className={styles.relatedDate}>{formatDate(p.publishedAt)}</span>
                        <h3 className={styles.relatedHeading}>{p.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className={styles.footer}>
              <Link to="/blog" className={styles.backLg} data-cursor data-cursor-text="Volver">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M13 7H1m0 0l5-5m-5 5l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
                Más artículos del blog
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
