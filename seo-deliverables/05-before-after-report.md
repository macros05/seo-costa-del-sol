# Informe antes/después — seocostadelsol.com
**Fecha:** 2026-05-08
**Scope:** auditoría completa + cambios técnicos aplicados en una sesión.

> **Estado del trabajo:** TODOS los cambios técnicos están aplicados localmente en `/root/seo-malaga/`. Falta el deploy: `git add -A && git commit && git push origin main` para que Cloudflare Pages re-deploye automáticamente.

---

## 1. Métricas medibles directamente

| Métrica | ANTES (2026-05-08 18:03) | DESPUÉS (post-build local) | Δ |
|---|---|---|---|
| Rutas indexables | 13 (1 home + /blog + 11 posts) | **26** (1 home + /blog + 11 posts + 7 ciudades + 4 servicios + FAQ + contacto) | +13 / +100% |
| `sitemap.xml` accesible | ❌ 200 + HTML SPA fallback (inválido) | ✅ XML real con 26 `<url>` | Crítico |
| `robots.txt` accesible | ❌ HTML SPA fallback | ✅ Real con `Sitemap:` referenciado | Crítico |
| Bloques JSON-LD por página | 1 (graph estático en index.html) | **3-5 por ruta** (graph + breadcrumb + service/article + FAQ + place) | +200-400% |
| Schema types presentes | Person, LocalBusiness, Service | + Organization, WebSite (con SearchAction), BreadcrumbList, FAQPage, BlogPosting, Place, ContactPage | +7 tipos |
| Per-page `<title>` correcto sin JS | ❌ Solo /  (todas las rutas servían el mismo title) | ✅ Las 26 rutas servidas con título único | Crítico |
| Per-page canonical | ❌ Solo / | ✅ Per-route canonical correcto | Crítico |
| Open Graph dinámico | ❌ Estático para /  | ✅ Dinámico per-route (incluye imagen del post para articles) | Importante |
| GA4 instrumentado | ❌ Sin tracking | ✅ Stub `gtag.js` listo (placeholder `G-XXXXXXXXXX` por sustituir) | Importante |
| Search Console verification | ❌ Ausente | ✅ Meta tag presente (token por sustituir) | Importante |
| TTFB (Cloudflare Edge) | 86 ms | Previsto idéntico (Cloudflare Pages) | = |
| Tamaño HTML home | 6,9 KB | ~8,7 KB (más schema) | +26% (irrelevante) |
| Compresión brotli/gzip | ✅ Cloudflare auto | ✅ Igual | = |
| HTTPS / HTTP3 | ✅ | ✅ | = |

## 2. Cambios técnicos aplicados (lista exhaustiva)

### Infraestructura
- ✅ Instalado `react-helmet-async` para gestión per-página de `<head>`
- ✅ `HelmetProvider` en `main.jsx` envolviendo `<App>`
- ✅ Componente `<Seo>` reutilizable: title, description, canonical, OG, Twitter Card, JSON-LD arbitrario
- ✅ Helpers en `Seo.jsx`: `breadcrumbJsonLd`, `faqJsonLd`, `serviceJsonLd`, `articleJsonLd`
- ✅ Script post-build `scripts/build-seo.mjs` que genera 26 `index.html` estáticos en `dist/<route>/` con head correcto + sitemap.xml + robots.txt
- ✅ `package.json`: nuevo `npm run build` ejecuta `vite build && node scripts/build-seo.mjs`

### Estructura
- ✅ Nuevas rutas creadas: `/seo-malaga`, `/seo-marbella`, `/seo-fuengirola`, `/seo-benalmadena`, `/seo-torremolinos`, `/seo-estepona`, `/seo-nerja`, `/servicios/auditoria-seo`, `/servicios/seo-local`, `/servicios/seo-ecommerce`, `/servicios/link-building`, `/preguntas-frecuentes`, `/contacto`
- ✅ Componente `<CityPage>` reutilizable con datos de cada ciudad (`src/data/cities.js`)
- ✅ Componente `<ServicePage>` reutilizable (`src/data/services.js`)
- ✅ Componentes `<FAQPage>` y `<Contact>`

### UX / SEO on-page
- ✅ Componente `<Breadcrumbs>` con migas de pan + JSON-LD por ruta interior
- ✅ Componente `<FAQ>` reutilizable con animación, schema FAQPage
- ✅ FAQ añadida a la home (6 preguntas), a cada servicio (3-4 preguntas) y a cada ciudad (6 preguntas)
- ✅ `<BlogPost>`: añadido CTA contextual al final + sección "Más artículos" con 3 posts relacionados + breadcrumbs + Article schema
- ✅ `<BlogIndex>`: breadcrumbs + Blog schema con todos los posts
- ✅ Footer ampliado: 5 columnas con NAP completo, áreas (7 ciudades), servicios (4) y blog/FAQ enlazados — sin enlaces sociales rotos
- ✅ Navbar reescrito: Servicios, Áreas, Blog, FAQ, Contacto (todos client-side `<Link>`)

### Performance
- ✅ Imágenes blog: añadidos `width`/`height` explícitos (evita CLS)
- ✅ Hero blog: `loading="eager" fetchpriority="high"` (LCP candidate)
- ✅ Cards blog: primeras 2 con `loading="eager"`, resto `lazy`
- ✅ Preconnect añadido a `api.seocostadelsol.com` + dns-prefetch
- ✅ index.html: `prioritizeSeoTags` evita reordenado de Helmet

### Tracking
- ✅ Google Analytics 4 stub en index.html (placeholder `G-XXXXXXXXXX` para sustituir)
- ✅ Search Console meta verification placeholder
- ✅ Evento `generate_lead` disparado en LeadForm.jsx al envío exitoso

### Schema
- ✅ index.html graph ampliado:
  - `Organization` añadido (alias del LocalBusiness para señales de marca)
  - `WebSite` con `SearchAction` (potencial sitelinks searchbox)
  - `LocalBusiness` enriquecido con `foundingDate`, `logo`, `alternateName`, `sameAs` (LinkedIn)
  - `OfferCatalog` ampliado a 5 servicios
- ✅ Per-page schema vía JSON-LD inyectado por el script post-build:
  - `BreadcrumbList` en todas las páginas internas
  - `FAQPage` en home, /preguntas-frecuentes, cada /servicios/*, cada /seo-*
  - `Service` en cada /servicios/* y /seo-*
  - `Place` con coordenadas en cada /seo-*
  - `BlogPosting` con autor, fecha, imagen, mainEntityOfPage en cada /blog/*
  - `ContactPage` en /contacto

## 3. Lo que NO se ha podido aplicar (y por qué)

| Tarea | Por qué no | Cómo solucionar |
|---|---|---|
| Lighthouse real con LCP/INP/CLS medidos | El entorno no tiene Chromium ni Lighthouse | Configurar PageSpeed Insights API o lighthouse-ci en GitHub Actions |
| Keyword research con volúmenes reales | Sin acceso a Ahrefs/Semrush/KW Planner | Trial de Semrush (1 mes) o usar Keyword Planner gratis |
| Inventario de backlinks actuales | Sin acceso a Search Console / Ahrefs | Conectar GSC para ver backlinks reales |
| Optimización GMB | No automatizable | Ejecutar `03-gmb-checklist.md` manualmente |
| Alta en 20 directorios | No automatizable (captchas, validaciones manuales) | Ejecutar `04-directorios-locales.md` manualmente |
| Análisis competencia con métricas reales | Sin acceso a Ahrefs/Semrush | Ver §3 de `01-keyword-map.md` |
| Push automático a GitHub | Cambios listos en local — no he hecho commit ni push sin permiso explícito | `cd /root/seo-malaga && git add -A && git commit && git push origin main` cuando revises los cambios |

## 4. Próximos pasos en orden de impacto

1. **HOY:** revisar diff (`git diff`), ejecutar `npm run dev` y navegar las nuevas rutas para validar visualmente.
2. **HOY:** sustituir `G-XXXXXXXXXX` en `index.html` por tu Measurement ID real de GA4.
3. **HOY:** sustituir `REPLACE_WITH_GSC_TOKEN` en `index.html` por tu meta verification de Search Console.
4. **HOY:** `git add -A && git commit -m "feat: full SEO overhaul - cities, services, schema, sitemap"` y `git push origin main`. Cloudflare re-deploya en ~30s.
5. **DÍA +1:** verificar en GSC que `/sitemap.xml` se descarga correctamente y enviar para indexación.
6. **DÍA +1 a +7:** ejecutar `03-gmb-checklist.md` (90 min repartidos).
7. **DÍA +1 a +21:** dar de alta en directorios `04-directorios-locales.md` (3 sesiones de 1h).
8. **DESDE DÍA +1:** publicar 1 post diario del plan `02-content-plan-30dias.csv` (ya alimenta el blog automatizado existente).
9. **DÍA +30:** primer review de impacto. Métricas a comparar: impresiones GSC, posición media, clics, CTR, sesiones GA4, conversiones (leads).

## 5. Cambios pendientes opcionales (mejoras de segunda iteración)

Estos no son bloqueantes pero merecen agendarse:

- [ ] Reescribir 3-5 posts del blog top de tráfico añadiendo H3s y enlaces internos a las nuevas páginas de servicio/ciudad
- [ ] Crear 1 case study real con métricas verificables (cuando haya cliente que dé permiso)
- [ ] Añadir sección "Reseñas" con `Review` schema en home (cuando haya 5+ reseñas reales en GMB)
- [ ] Migrar a SSR completo con `vike` o `vite-react-ssg` si la indexación con el actual pre-render no es suficiente (no debería necesitarse, pero opción a tener)
- [ ] Implementar hreflang ES/EN si se decide entrar en mercado británico de Marbella/Estepona
