// Post-build SEO generator.
//
// Why: the site is a Vite SPA. With one static index.html, every route returns
// the same <head>. Crawlers and social previews see the homepage meta even when
// they request /seo-marbella or /blog/<slug>. This script fixes that without a
// full SSR pipeline (framer-motion + browser-only APIs make full SSR fragile).
//
// What it does:
//   1. Reads dist/index.html as a template.
//   2. For each known route (home, blog, blog posts, FAQ, contact, services,
//      cities), substitutes title/description/canonical/og/twitter and injects
//      the route-specific JSON-LD into the <head>.
//   3. Writes dist/<route>/index.html.
//   4. Generates dist/sitemap.xml with <lastmod> from blog post dates.
//   5. Generates dist/robots.txt that points to the sitemap.
//
// Cloudflare Pages will serve dist/<route>/index.html directly when the URL
// matches, falling back to dist/index.html for unknown paths via _redirects.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const SITE_URL = 'https://seocostadelsol.com'

const { cities } = await import(path.join(ROOT, 'src/data/cities.js'))
const { services } = await import(path.join(ROOT, 'src/data/services.js'))
const { generalFaqs } = await import(path.join(ROOT, 'src/data/faqs.js'))
const postsIndex = JSON.parse(
  await fs.readFile(path.join(ROOT, 'src/data/posts-index.json'), 'utf8')
)

function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.path ? `${SITE_URL}${it.path}` : undefined
    }))
  }
}

function faqSchema(faqs) {
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

function serviceSchema({ name, description, slug, areaServed = 'Costa del Sol' }) {
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

function articleSchema(p) {
  const block = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.metaDescription,
    image: p.imageUrl ? `${SITE_URL}${p.imageUrl}` : `${SITE_URL}/og-image.jpg`,
    datePublished: p.publishedAt,
    dateModified: p.dateModified || p.publishedAt,
    author: { '@type': 'Person', name: 'Marcos Morales', '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#business` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${p.slug}` }
  }
  if (typeof p.wordCount === 'number' && p.wordCount > 0) block.wordCount = p.wordCount
  if (Array.isArray(p.keywords) && p.keywords.length) block.keywords = p.keywords.join(', ')
  if (p.sector) block.articleSection = p.sector
  return block
}

function buildHead({ title, description, path: p, ogImage, type = 'website', published, jsonLd }) {
  const canonical = `${SITE_URL}${p}`
  const og = ogImage || `${SITE_URL}/og-image.jpg`
  const blocks = (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
    .filter(Boolean)
    .map(
      (b) =>
        `<script type="application/ld+json">${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`
    )
    .join('\n    ')

  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:locale" content="es_ES" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:site_name" content="SEO Costa del Sol · Marcos Morales" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:image" content="${og}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeAttr(title)}" />`,
    published ? `<meta property="article:published_time" content="${published}" />` : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${og}" />`,
    blocks
  ]
    .filter(Boolean)
    .join('\n    ')
}

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeAttr = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const HEAD_REGEX = /<!-- BEGIN HEAD -->[\s\S]*?<!-- END HEAD -->/

function applyHead(template, headHtml) {
  return template.replace(
    HEAD_REGEX,
    `<!-- BEGIN HEAD -->\n    ${headHtml}\n    <!-- END HEAD -->`
  )
}

async function writeRoute(template, p, headOpts) {
  const headHtml = buildHead({ ...headOpts, path: p })
  const html = applyHead(template, headHtml)
  const outDir = p === '/' ? DIST : path.join(DIST, p)
  await fs.mkdir(outDir, { recursive: true })
  await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8')
}

async function main() {
  const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8')
  if (!HEAD_REGEX.test(template)) {
    throw new Error(
      'No <!-- BEGIN HEAD --> ... <!-- END HEAD --> markers in dist/index.html. The post-build script needs them.'
    )
  }

  const routes = []

  // Home
  const homeFaqs = generalFaqs.slice(0, 6)
  routes.push({
    path: '/',
    title: 'SEO Costa del Sol | Auditoría SEO Gratis Málaga, Marbella, Fuengirola',
    description:
      'SEO Costa del Sol: auditoría gratuita y sin compromiso para negocios locales en Málaga, Marbella, Fuengirola, Benalmádena, Torremolinos y Nerja. Te digo exactamente por qué no apareces en Google y cómo posicionarte en 30 días.',
    jsonLd: [breadcrumb([{ name: 'Inicio', path: '/' }]), faqSchema(homeFaqs)],
    priority: 1.0,
    changefreq: 'weekly'
  })

  // Blog index
  routes.push({
    path: '/blog',
    title: 'Blog SEO Costa del Sol | Marcos Morales',
    description:
      'Artículos prácticos de SEO local para negocios en Málaga, Marbella, Fuengirola, Benalmádena, Torremolinos y Nerja. Publicación diaria, sin tecnicismos.',
    jsonLd: [
      breadcrumb([{ name: 'Inicio', path: '/' }, { name: 'Blog', path: '/blog' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog`,
        name: 'Blog SEO Costa del Sol',
        url: `${SITE_URL}/blog`,
        publisher: { '@id': `${SITE_URL}/#business` }
      }
    ],
    priority: 0.9,
    changefreq: 'daily'
  })

  // Blog posts
  const postsBySlug = {}
  for (const entry of postsIndex) {
    const fullPath = path.join(ROOT, `src/data/posts/${entry.slug}.json`)
    try {
      postsBySlug[entry.slug] = JSON.parse(await fs.readFile(fullPath, 'utf8'))
    } catch {
      // skip
    }
  }
  for (const p of Object.values(postsBySlug)) {
    routes.push({
      path: `/blog/${p.slug}`,
      title: `${p.title} | Blog SEO Costa del Sol`,
      description: p.metaDescription,
      ogImage: p.imageUrl ? `${SITE_URL}${p.imageUrl}` : undefined,
      type: 'article',
      published: p.publishedAt,
      jsonLd: [
        breadcrumb([
          { name: 'Inicio', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: p.title, path: `/blog/${p.slug}` }
        ]),
        articleSchema(p)
      ],
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: (p.dateModified || p.publishedAt).slice(0, 10)
    })
  }

  // FAQ
  routes.push({
    path: '/preguntas-frecuentes',
    title: 'Preguntas frecuentes sobre SEO en la Costa del Sol | Marcos Morales',
    description:
      'Resuelvo las dudas más habituales: precios, plazos, garantías, sectores, ciudades. Todo lo que un dueño de negocio quiere saber antes de contratar SEO en Málaga.',
    jsonLd: [
      breadcrumb([
        { name: 'Inicio', path: '/' },
        { name: 'Preguntas frecuentes', path: '/preguntas-frecuentes' }
      ]),
      faqSchema(generalFaqs)
    ],
    priority: 0.7,
    changefreq: 'monthly'
  })

  // Contact
  routes.push({
    path: '/contacto',
    title: 'Contacto · SEO Costa del Sol | Marcos Morales',
    description:
      'Contacta con Marcos Morales para tu auditoría SEO gratis en la Costa del Sol. Email seo@marcosmorales.dev. Respuesta en menos de 48 horas.',
    jsonLd: [
      breadcrumb([{ name: 'Inicio', path: '/' }, { name: 'Contacto', path: '/contacto' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        url: `${SITE_URL}/contacto`,
        name: 'Contacto · SEO Costa del Sol',
        mainEntity: { '@id': `${SITE_URL}/#business` }
      }
    ],
    priority: 0.6,
    changefreq: 'monthly'
  })

  // Services
  for (const s of services) {
    routes.push({
      path: `/servicios/${s.slug}`,
      title: s.title,
      description: s.description,
      jsonLd: [
        breadcrumb([
          { name: 'Inicio', path: '/' },
          { name: 'Servicios' },
          { name: s.name, path: `/servicios/${s.slug}` }
        ]),
        serviceSchema({ name: s.name, description: s.description, slug: `/servicios/${s.slug}` }),
        faqSchema(s.faqs)
      ],
      priority: 0.85,
      changefreq: 'monthly'
    })
  }

  // Cities
  for (const c of cities) {
    const cityFaqs = [
      {
        q: `¿Por qué hace falta un SEO específico para ${c.city}?`,
        a: `Porque las búsquedas en ${c.city} son distintas a las de Madrid o Barcelona: long-tails locales, competencia geográfica concreta y comportamiento de cliente que un SEO genérico no entiende.`
      },
      {
        q: `¿Cuánto tarda en posicionar mi negocio en ${c.city}?`,
        a: `Depende del punto de partida y el sector, pero la media para negocios locales en ${c.city} es: primeros movimientos a partir del mes 2, top 3 estable entre el mes 4 y el 8.`
      },
      ...generalFaqs.slice(0, 4)
    ]
    routes.push({
      path: `/${c.slug}`,
      title: `${c.name} | Consultor SEO en ${c.city} · Marcos Morales`,
      description: `Consultor SEO en ${c.city}: auditoría gratis, posicionamiento web local y SEO en Google Maps para negocios de ${c.city} y la Costa del Sol. Plan de acción en 48 horas.`,
      jsonLd: [
        breadcrumb([
          { name: 'Inicio', path: '/' },
          { name: 'Áreas de servicio' },
          { name: c.name, path: `/${c.slug}` }
        ]),
        serviceSchema({
          name: c.name,
          description: `Servicios de SEO local y posicionamiento web en ${c.city}.`,
          slug: `/${c.slug}`,
          areaServed: c.city
        }),
        faqSchema(cityFaqs),
        {
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: c.city,
          address: {
            '@type': 'PostalAddress',
            addressLocality: c.city,
            addressRegion: 'Málaga',
            addressCountry: 'ES'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: c.coords.lat,
            longitude: c.coords.lng
          }
        }
      ],
      priority: 0.85,
      changefreq: 'monthly'
    })
  }

  // Write per-route HTML
  for (const r of routes) {
    await writeRoute(template, r.path, r)
  }

  // sitemap.xml
  const today = new Date().toISOString().slice(0, 10)
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((r) =>
      [
        '  <url>',
        `    <loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc>`,
        `    <lastmod>${r.lastmod || today}</lastmod>`,
        `    <changefreq>${r.changefreq || 'monthly'}</changefreq>`,
        `    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>`,
        '  </url>'
      ].join('\n')
    ),
    '</urlset>',
    ''
  ].join('\n')
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8')

  // robots.txt
  const robots = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    ''
  ].join('\n')
  await fs.writeFile(path.join(DIST, 'robots.txt'), robots, 'utf8')

  console.log(`✓ Generated ${routes.length} static HTML routes`)
  console.log(`✓ sitemap.xml: ${routes.length} URLs`)
  console.log(`✓ robots.txt`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
