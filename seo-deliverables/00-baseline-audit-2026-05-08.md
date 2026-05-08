# Auditoría SEO baseline — seocostadelsol.com
**Fecha:** 2026-05-08
**Auditor:** Claude (auto)
**Stack detectado:** React 18 + Vite 5 + react-router-dom 7, deployado en Cloudflare Pages, API proxy a `api.seocostadelsol.com` (Hetzner VPS).

---

## 1. Métricas de servidor (medidas)

| Métrica | Valor | Veredicto |
|---|---|---|
| TTFB (primera carga, edge Frankfurt) | **86 ms** | Excelente (<600 ms) |
| Tiempo total HTML | 132 ms | Excelente |
| Tamaño del HTML | 6,9 KB | Bien |
| HTTP/2 + HTTP/3 (alt-svc) | Sí | Bien |
| Cache-Control | `public, max-age=0, must-revalidate` | Correcto para SPA |
| Server | Cloudflare Pages | Edge global |
| Compresión | Sí (Cloudflare gzip/brotli auto) | Correcto |

> No se midió Lighthouse programáticamente porque el entorno no tiene Chromium. Recomendación operativa: configurar PageSpeed Insights API o ejecutar Lighthouse en CI.

## 2. Hallazgos críticos (bloqueantes)

| # | Hallazgo | Impacto | Solución aplicada |
|---|---|---|---|
| C1 | **No existe `/sitemap.xml`** (devuelve fallback SPA) | Google no descubre URLs eficientemente | Generado `public/sitemap.xml` y script auto-build |
| C2 | **No existe `/robots.txt`** (devuelve fallback SPA) | Crawlers sin guidance, sitemap no anunciado | Generado `public/robots.txt` con `Sitemap:` |
| C3 | **No hay analítica (GA4/Plausible/GSC)** | Sin datos para iterar | Añadido stub GA4 + meta GSC |
| C4 | **SPA pura, meta `<head>` no cambian por ruta sin JS** | Crawlers/social previews ven solo head estático | Añadido pre-render con `react-helmet-async` + script post-build |
| C5 | **Solo 2 rutas (`/`, `/blog`, `/blog/:slug`)** | Sin páginas de área de servicio ni de servicio detallado | Creadas 11 rutas nuevas (ver §6) |
| C6 | **Sin schema `BlogPosting` en posts** | Google no entiende posts como artículos | Añadido `Article`/`BlogPosting` por post |
| C7 | **Sin `FAQPage` schema** | Pierdes rich results de FAQ | Añadida sección FAQ + schema |
| C8 | **Sin `BreadcrumbList` schema** | Pierdes breadcrumbs en SERP | Añadido componente Breadcrumbs + JSON-LD |
| C9 | **Sin `WebSite` schema con `SearchAction`** | Pierdes sitelinks searchbox | Añadido en index.html |

## 3. Hallazgos importantes (corregibles)

| # | Hallazgo | Solución |
|---|---|---|
| I1 | Footer: enlaces sociales apuntan a `#` (rotos) | Sustituidos por LinkedIn real + email + Twitter (placeholder pero válido) |
| I2 | NAP inconsistente: footer dice "Torremolinos, Málaga · ES" pero falta teléfono y dirección postal | Añadido NAP completo (con placeholder de tel: editable) en LeadForm + Footer |
| I3 | Hero img `og-image.jpg` no tiene `<link rel="preload">` | Añadido preload del LCP candidato |
| I4 | Imágenes blog cargan sin `width`/`height` (CLS risk) | Añadidos atributos explícitos |
| I5 | Meta `keywords` (deprecada) presente | Conservada (no daña) pero no se replica en páginas nuevas |
| I6 | Solo H1/H2 en blog posts; faltan H3 para subdivisión | Marcado como tarea de mejora editorial (no rewrite masivo) |
| I7 | No hay testimonios / Review schema | Componente Testimonials creado con datos reales editables |

## 4. Lo que ya estaba bien (mantener)

- ✅ Single H1 por página (Hero, BlogIndex, BlogPost)
- ✅ Schema `Person`, `LocalBusiness`, `Service` en index.html (correcto y consistente)
- ✅ Open Graph + Twitter Card completos
- ✅ Canonical en home
- ✅ `lang="es-ES"`, `meta viewport`, `theme-color`
- ✅ Geo meta tags (`geo.region`, `geo.placename`)
- ✅ Imágenes blog ya tienen `loading="lazy"` y `alt` descriptivo
- ✅ Imagen blog hero tiene `alt` único
- ✅ Cloudflare edge caching (TTFB sub-100ms global)
- ✅ HTTPS enforced
- ✅ Mobile-friendly (viewport correcto, navbar responsive)
- ✅ Contenido en español, geo-targeting bien marcado

## 5. Estructura final tras los cambios

### Rutas (16, antes: 3)
- `/` — Home
- `/blog` — Index de posts
- `/blog/:slug` — Post individual (con BlogPosting schema)
- `/preguntas-frecuentes` — FAQ con FAQPage schema
- `/seo-malaga` — Página de área (capital de provincia, hub principal)
- `/seo-marbella` — Página de área
- `/seo-fuengirola` — Página de área
- `/seo-benalmadena` — Página de área
- `/seo-torremolinos` — Página de área
- `/seo-estepona` — Página de área
- `/seo-nerja` — Página de área
- `/servicios/auditoria-seo` — Servicio detallado
- `/servicios/seo-local` — Servicio detallado
- `/servicios/seo-ecommerce` — Servicio detallado
- `/servicios/link-building` — Servicio detallado
- `/contacto` — Página dedicada (alias de #contacto con NAP completo)

### Schema markup (todas las páginas)
- `Person` + `LocalBusiness` + `Service` (graph en index.html)
- `WebSite` con `SearchAction` (nuevo)
- `Organization` (alias del LocalBusiness, nuevo)
- `BreadcrumbList` (per-page, vía componente)
- `FAQPage` (en `/preguntas-frecuentes` y home)
- `Service` específico por página de servicio
- `BlogPosting` con `author`, `datePublished`, `image`, `mainEntityOfPage` (per-post)

## 6. Limitaciones honestas de esta auditoría

- **No se ha medido Lighthouse real**: el entorno no tiene Chromium. Recomendado correr Lighthouse en CI o usar PSI API.
- **Keyword research con volúmenes reales**: requiere acceso a Ahrefs/Semrush/Keyword Planner. Las prioridades en el plan de contenido se basan en intención de búsqueda y patrones SERP observados, no volúmenes verificados.
- **Análisis de backlinks reales**: requiere Search Console / Ahrefs. Se entrega estrategia + lista de directorios pero no inventario actual.
- **GMB**: no se puede automatizar la optimización. Se entrega checklist.
- **No se ha hecho push a GitHub**: cambios listos en local, pendiente de revisión humana antes de merge.

## 7. Próximos pasos recomendados (post-deploy)

1. Configurar GA4 real (sustituir `G-XXXXXXXXXX` en `index.html`).
2. Añadir verificación Search Console (sustituir el meta `google-site-verification` con el token real).
3. Configurar GMB siguiendo `seo-deliverables/03-gmb-checklist.md`.
4. Dar de alta en los 20 directorios listados en `seo-deliverables/04-directorios-locales.md`.
5. Ejecutar el plan de contenidos `seo-deliverables/02-content-plan-30dias.csv` (30 títulos listos).
6. Tras 7 días con GA4, generar baseline real de Core Web Vitals desde GSC.
