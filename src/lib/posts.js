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

export function formatDate(iso) {
  if (!iso) return ''
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ]
  const d = new Date(iso)
  return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`
}
