import postsIndex from '../data/posts-index.json'

const postModules = import.meta.glob('../data/posts/*.json', { eager: true })

const postsBySlug = Object.fromEntries(
  Object.entries(postModules).map(([path, mod]) => {
    const slug = path.split('/').pop().replace(/\.json$/, '')
    return [slug, mod.default ?? mod]
  })
)

export function getAllPosts() {
  return [...postsIndex]
    .filter((entry) => postsBySlug[entry.slug])
    .map((entry) => postsBySlug[entry.slug])
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
}

export function getPost(slug) {
  return postsBySlug[slug] ?? null
}

function normalize(text) {
  return (text || '')
    .toString()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

function similarityScore(a, b) {
  if (!a || !b) return 0
  let score = 0
  if (a.sector && b.sector && a.sector === b.sector) score += 4
  if (a.intent && b.intent && a.intent === b.intent) score += 1
  const aTerms = new Set([
    normalize(a.keyword),
    ...((a.keywords || []).map(normalize))
  ])
  const bTerms = [normalize(b.keyword), ...((b.keywords || []).map(normalize))]
  for (const term of bTerms) {
    if (term && aTerms.has(term)) score += 3
  }
  const aTokens = new Set(normalize(a.keyword).split(/\s+/).filter(Boolean))
  const bTokens = normalize(b.keyword).split(/\s+/).filter(Boolean)
  for (const token of bTokens) {
    if (token.length > 3 && aTokens.has(token)) score += 0.25
  }
  return score
}

export function getRelatedPosts(post, limit = 3) {
  if (!post) return []
  const others = getAllPosts().filter((p) => p.slug !== post.slug)
  const scored = others
    .map((p) => ({ post: p, score: similarityScore(post, p) }))
    .sort((a, b) => b.score - a.score)

  const picked = []
  const seen = new Set()
  for (const entry of scored) {
    if (entry.score <= 0) break
    picked.push(entry.post)
    seen.add(entry.post.slug)
    if (picked.length >= limit) return picked
  }
  for (const p of others) {
    if (seen.has(p.slug)) continue
    picked.push(p)
    if (picked.length >= limit) break
  }
  return picked
}

export function formatDate(iso) {
  if (!iso) return ''
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ]
  const d = new Date(iso)
  return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`
}
