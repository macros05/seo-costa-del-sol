import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://seocostadelsol.com'
const DEFAULT_OG = `${SITE_URL}/og-image.jpg`

export default function Seo({
  title,
  description,
  path = '/',
  ogImage = DEFAULT_OG,
  type = 'website',
  noindex = false,
  jsonLd,
  publishedTime,
  modifiedTime
}) {
  const canonical = `${SITE_URL}${path}`
  const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="SEO Costa del Sol · Marcos Morales" />
      <meta property="og:locale" content="es_ES" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      <meta property="article:author" content="Marcos Morales" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  )
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.path ? `${SITE_URL}${item.path}` : undefined
    }))
  }
}

export function faqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  }
}

export function serviceJsonLd({ name, description, slug, areaServed = 'Costa del Sol' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${slug}#service`,
    name,
    description,
    serviceType: name,
    provider: { '@id': `${SITE_URL}/#person` },
    areaServed: { '@type': 'Place', name: areaServed },
    url: `${SITE_URL}${slug}`
  }
}

export function articleJsonLd({
  title,
  description,
  slug,
  image,
  datePublished,
  dateModified,
  wordCount,
  keywords,
  articleSection
}) {
  const block = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image ? `${SITE_URL}${image}` : DEFAULT_OG,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { '@type': 'Person', name: 'Marcos Morales', '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#business` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` }
  }
  if (typeof wordCount === 'number' && wordCount > 0) block.wordCount = wordCount
  if (Array.isArray(keywords) && keywords.length) block.keywords = keywords.join(', ')
  if (articleSection) block.articleSection = articleSection
  return block
}

export { SITE_URL }
