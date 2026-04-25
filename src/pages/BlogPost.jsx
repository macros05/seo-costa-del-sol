import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getPost, formatDate } from '../lib/posts'
import styles from './BlogPost.module.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  useEffect(() => {
    if (!post) return
    document.title = `${post.title} | Blog SEO Costa del Sol`
    setMeta('description', post.metaDescription)
    setCanonical(`https://seocostadelsol.com/blog/${post.slug}`)
    window.scrollTo(0, 0)
  }, [post])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <main className={styles.page}>
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
              <img src={post.imageUrl} alt={post.imageAlt || post.title} />
            </motion.div>
          )}
        </header>

        <div className="container">
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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
