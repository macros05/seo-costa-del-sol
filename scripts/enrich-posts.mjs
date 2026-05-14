// One-shot post enrichment.
//
// Adds the fields the BlogPosting schema in build-seo.mjs already knows how to
// use (wordCount, keywords, sector, dateModified) but that older posts in
// src/data/posts/*.json don't have. Re-runnable: skips fields already set.
//
// Sector is inferred from the post title/keyword. Keywords are derived from the
// existing `keyword` field plus the canonical city, so each post links itself
// thematically to a city/service hub.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const POSTS_DIR = path.join(ROOT, 'src/data/posts')
const INDEX_PATH = path.join(ROOT, 'src/data/posts-index.json')

const CITY_MAP = [
  { match: /m[áa]laga/i, city: 'Málaga', slug: 'seo-malaga' },
  { match: /marbella/i, city: 'Marbella', slug: 'seo-marbella' },
  { match: /fuengirola/i, city: 'Fuengirola', slug: 'seo-fuengirola' },
  { match: /benalm[áa]dena/i, city: 'Benalmádena', slug: 'seo-benalmadena' },
  { match: /torremolinos/i, city: 'Torremolinos', slug: 'seo-torremolinos' },
  { match: /estepona/i, city: 'Estepona', slug: 'seo-estepona' },
  { match: /nerja/i, city: 'Nerja', slug: 'seo-nerja' },
  { match: /mijas/i, city: 'Mijas', slug: 'seo-mijas' },
  { match: /v[ée]lez/i, city: 'Vélez-Málaga', slug: 'seo-velez-malaga' },
  { match: /rinc[óo]n/i, city: 'Rincón de la Victoria', slug: 'seo-rincon-de-la-victoria' },
  { match: /costa del sol/i, city: 'Costa del Sol', slug: null }
]

const SECTOR_MAP = [
  { match: /abogado|despacho legal|asesor[ií]a jur[ií]dica/i, sector: 'Servicios profesionales' },
  { match: /restaurante|chiringuito|bar /i, sector: 'Restauración' },
  { match: /hotel|alojamiento|apartamento tur/i, sector: 'Turismo y alojamiento' },
  { match: /clínica|cl[ií]nica|dentista|dental|veterinario|fisio/i, sector: 'Salud y bienestar' },
  { match: /tienda|comercio|ecommerce|e-commerce/i, sector: 'Comercio y retail' },
  { match: /academia|formaci[óo]n|alumnos|escuela/i, sector: 'Educación y formación' },
  { match: /taller|mec[áa]nico|reparaci[óo]n/i, sector: 'Servicios técnicos' },
  { match: /gimnasio|fitness/i, sector: 'Salud y bienestar' },
  { match: /inmobiliaria|real estate/i, sector: 'Inmobiliaria' },
  { match: /google maps|my business|local/i, sector: 'SEO local' }
]

const STOPWORDS = new Set([
  'a', 'al', 'ante', 'bajo', 'cabe', 'con', 'contra', 'de', 'del', 'desde', 'durante',
  'en', 'entre', 'hacia', 'hasta', 'mediante', 'para', 'por', 'según', 'sin', 'so',
  'sobre', 'tras', 'versus', 'vía', 'el', 'la', 'los', 'las', 'un', 'una', 'unos',
  'unas', 'y', 'o', 'u', 'e', 'que', 'cómo', 'como', 'qué', 'donde', 'dónde', 'es',
  'son', 'tu', 'tus', 'mi', 'mis', 'su', 'sus', 'lo', 'le', 'les', 'se', 'te', 'me',
  'guía', 'guia', 'práctica', 'practica', 'descubre', 'claves', 'mejor', 'mejores',
  'más', 'mas', 'sin', 'pagar', 'gratis', 'hoy', 'tu', 'para', 'guía', 'paso'
])

function detectCity(text) {
  for (const c of CITY_MAP) {
    if (c.match.test(text)) return c
  }
  return null
}

function detectSector(text) {
  for (const s of SECTOR_MAP) {
    if (s.match.test(text)) return s.sector
  }
  return 'SEO local'
}

function htmlToText(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildKeywords({ keyword, title, sector, city }) {
  const seeds = new Set()
  if (keyword) seeds.add(keyword.toLowerCase())
  // Always pin a city + sector + service keyword
  if (city) {
    seeds.add(`seo ${city.city.toLowerCase()}`)
    seeds.add(`posicionamiento web ${city.city.toLowerCase()}`)
  }
  if (sector) {
    seeds.add(`${sector.toLowerCase()} costa del sol`)
  }
  // Title-derived ngrams (very light)
  const tokens = title
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 3 && !STOPWORDS.has(t))
  for (let i = 0; i < tokens.length - 1 && seeds.size < 8; i++) {
    seeds.add(`${tokens[i]} ${tokens[i + 1]}`)
  }
  return Array.from(seeds).slice(0, 8)
}

async function main() {
  const indexRaw = JSON.parse(await fs.readFile(INDEX_PATH, 'utf8'))
  const updatedIndex = []
  let touched = 0

  for (const entry of indexRaw) {
    const fullPath = path.join(POSTS_DIR, `${entry.slug}.json`)
    let post
    try {
      post = JSON.parse(await fs.readFile(fullPath, 'utf8'))
    } catch {
      console.warn(`Missing ${entry.slug}.json — skipping`)
      updatedIndex.push(entry)
      continue
    }

    let changed = false
    const text = htmlToText(post.content || '')
    const wordCount = text ? text.split(/\s+/).filter(Boolean).length : 0
    if (post.wordCount !== wordCount && wordCount > 0) {
      post.wordCount = wordCount
      changed = true
    }

    if (!post.dateModified) {
      post.dateModified = post.publishedAt
      changed = true
    }

    const combinedText = `${post.title} ${post.keyword || ''} ${text.slice(0, 600)}`
    const city = detectCity(combinedText)
    const sector = detectSector(combinedText)

    if (!post.sector || post.sector !== sector) {
      post.sector = sector
      changed = true
    }
    if (!post.city && city) {
      post.city = city.city
      post.citySlug = city.slug
      changed = true
    }

    const desiredKeywords = buildKeywords({
      keyword: post.keyword,
      title: post.title,
      sector,
      city
    })
    if (!Array.isArray(post.keywords) || post.keywords.length !== desiredKeywords.length) {
      post.keywords = desiredKeywords
      changed = true
    }

    if (changed) {
      await fs.writeFile(fullPath, JSON.stringify(post, null, 2) + '\n', 'utf8')
      touched++
    }

    updatedIndex.push({
      ...entry,
      wordCount: post.wordCount,
      sector: post.sector,
      city: post.city,
      citySlug: post.citySlug,
      dateModified: post.dateModified
    })
  }

  await fs.writeFile(INDEX_PATH, JSON.stringify(updatedIndex, null, 2) + '\n', 'utf8')
  console.log(`Enriched ${touched}/${indexRaw.length} posts.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
