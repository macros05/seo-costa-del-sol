import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo, { breadcrumbJsonLd, faqJsonLd } from '../components/Seo'
import Breadcrumbs from '../components/Breadcrumbs'
import FAQ from '../components/FAQ'
import LeadForm from '../components/LeadForm'
import styles from './Pricing.module.css'

const plans = [
  {
    name: 'Auditoría SEO inicial',
    price: '0 €',
    priceNote: 'Gratis · 48 h',
    tagline: 'Para saber qué te está frenando hoy sin pagar nada.',
    description:
      'Informe en PDF con problemas técnicos, oportunidades de keywords, análisis de los 3 competidores que te ganan y un plan de 90 días priorizado por impacto.',
    features: [
      'Auditoría técnica (velocidad, indexación, schema)',
      'Análisis de keywords reales con intención comercial',
      'Top 3 competidores locales con sus puntos débiles',
      'Plan 90 días: 3 quick-wins en 7 días + roadmap',
      'Reunión 30 min para resolverte dudas (opcional)'
    ],
    cta: 'Solicitar gratis',
    href: '/contacto',
    highlight: false
  },
  {
    name: 'SEO local mensual',
    price: 'desde 600 €',
    priceNote: '/ mes · sin permanencia',
    tagline: 'Para negocios locales que quieren entrar en el top 3 de su zona.',
    description:
      'Trabajo continuado de SEO local: Google My Business, contenido geo-targeted, citaciones, schema, seguimiento mensual. Compromiso mínimo recomendado: 6 meses para resultados evaluables.',
    features: [
      'Optimización Google My Business + estrategia reseñas',
      'Contenido mensual: 2 artículos blog + páginas de barrio',
      'Citaciones NAP en directorios locales (1ª oleada)',
      'Schema LocalBusiness + AggregateRating cuando proceda',
      'Informe mensual transparente (impresiones, posición, leads)'
    ],
    cta: 'Hablar del plan',
    href: '/contacto',
    highlight: true,
    badge: 'Más contratado'
  },
  {
    name: 'SEO ecommerce / proyectos',
    price: 'desde 1.200 €',
    priceNote: '/ mes',
    tagline: 'Para tiendas online y proyectos con catálogo grande.',
    description:
      'Setup técnico, arquitectura, optimización de fichas y categorías, schema Product, enlazado interno, recuperación de productos zombi. Para tiendas con sede o foco en Málaga / Costa del Sol.',
    features: [
      'Auditoría técnica profunda (crawl + log analysis)',
      'Arquitectura de categorías y enlazado interno',
      'Optimización masiva de fichas (snippets, schema Product)',
      'Recuperación de productos con tráfico perdido',
      'Reporting mensual + reuniones quincenales'
    ],
    cta: 'Hablar del proyecto',
    href: '/contacto',
    highlight: false
  }
]

const pricingFaqs = [
  {
    q: '¿Por qué empiezas en 600 €/mes y no más barato?',
    a: 'Porque SEO real es trabajo manual: análisis técnico, contenido escrito por una persona, optimización de Google My Business, citaciones, reporting. Por debajo de 600 €/mes el único modelo viable es automatización barata o paquetes con plantillas reutilizadas que perjudican a tu web. Prefiero decirte que no a venderte algo que no funciona.'
  },
  {
    q: '¿Tengo que firmar permanencia?',
    a: 'No. Todos mis contratos son por meses sueltos. Lo recomendable son 6 meses mínimo para evaluar resultados con honestidad — el SEO necesita tiempo — pero si no ves valor al mes 3, te vas sin penalización. Mi modelo es "te quedas porque ves resultados", no "te quedas porque firmaste".'
  },
  {
    q: '¿Cómo justifico el gasto en SEO ante mi gestor / socio?',
    a: 'Con números. En el reporting mensual ves: impresiones en Google, clics, posición media, leads atribuibles. A los 6-8 meses el coste por lead orgánico suele estar por debajo del coste por lead en Google Ads para el mismo sector. Y a diferencia de Ads, cuando dejas de pagar el SEO no desaparece de un día para otro.'
  },
  {
    q: '¿Qué incluye el precio? ¿Hay costes ocultos?',
    a: 'Cero costes ocultos. El precio incluye todas las horas de trabajo. Excepciones que te aviso siempre por adelantado: (1) compra de dominios expirados para link building si entra en la estrategia, (2) herramientas terceras si tu proyecto lo requiere específicamente (raro), (3) traducciones profesionales si trabajamos bilingüe.'
  },
  {
    q: '¿Puedo pagar solo por la auditoría y aplicarla yo?',
    a: 'La auditoría inicial es gratuita y te la quedas tú. Si después decides aplicarla por tu cuenta o pasársela a otro SEO, perfecto. Ese es el trato: si lo que te entrego vale, hablamos de seguir. Si no, ya has ganado tú.'
  },
  {
    q: '¿Trabajas con presupuestos pequeños o solo con empresas?',
    a: 'La mayoría de mis clientes son autónomos y pymes con un único local. Si tu presupuesto es 600 €/mes y tu negocio cuadra con SEO local, entras. Si tu presupuesto es más bajo, te lo digo de entrada y te oriento a alternativas (mejorar tu ficha de Google My Business gratis, formación, herramientas DIY).'
  },
  {
    q: '¿Garantizas posiciones en Google?',
    a: 'No. Y desconfía de quien lo haga: nadie controla el algoritmo de Google. Lo que sí garantizo: aplicar las mejores prácticas, transparencia total en lo que se hace cada mes, y resultados medibles en métricas que dependen del trabajo (mejoras técnicas implementadas, contenido publicado, enlaces conseguidos, evolución de impresiones).'
  },
  {
    q: '¿Cómo se pagan los proyectos?',
    a: 'Mensualmente, primera semana del mes, transferencia o domiciliación. Para proyectos con setup técnico fuerte (ecommerce) hay un pago inicial de setup (50% del primer mes adicional). Factura con IVA emitida desde España, totalmente deducible para tu negocio.'
  }
]

const planSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Precios SEO Costa del Sol',
  itemListElement: plans.map((p, i) => ({
    '@type': 'Offer',
    position: i + 1,
    name: p.name,
    description: p.description,
    priceCurrency: 'EUR',
    price: p.price.replace(/[^0-9]/g, '') || '0',
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: p.price.replace(/[^0-9]/g, '') || '0',
      priceCurrency: 'EUR',
      description: p.priceNote
    },
    itemOffered: {
      '@type': 'Service',
      name: p.name,
      description: p.description
    }
  }))
}

export default function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const path = '/precios'
  const title = 'Precios SEO Costa del Sol | Cuánto cuesta posicionar tu negocio · Marcos Morales'
  const description =
    'Precios reales de SEO en la Costa del Sol: auditoría inicial gratis, SEO local desde 600 €/mes sin permanencia, SEO ecommerce desde 1.200 €/mes. Transparencia total y sin paquetes baratos que no funcionan.'

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Inicio', path: '/' },
      { name: 'Precios', path }
    ]),
    faqJsonLd(pricingFaqs),
    planSchema
  ]

  return (
    <>
      <Seo title={title} description={description} path={path} jsonLd={jsonLd} />
      <main className={styles.page}>
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Inicio', path: '/' },
              { name: 'Precios' }
            ]}
          />
        </div>

        <header className={styles.hero}>
          <div className="container">
            <span className="eyebrow">Tarifas · Costa del Sol</span>
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Cuánto cuesta posicionar
              <br /> tu negocio en Google
              <br />
              <span className={styles.titleAccent}>en la Costa del Sol.</span>
            </motion.h1>
            <p className={styles.lede}>
              Sin paquetes inflados, sin permanencia y con auditoría inicial gratuita.
              Aquí te digo qué cuesta cada cosa y por qué — para que decidas con datos reales,
              no con presupuestos que pintan bien en un PDF.
            </p>
          </div>
        </header>

        <section className={styles.plans}>
          <div className="container">
            <div className={styles.plansGrid}>
              {plans.map((p) => (
                <article
                  key={p.name}
                  className={`${styles.plan} ${p.highlight ? styles.planHighlight : ''}`}
                >
                  {p.badge && <span className={styles.planBadge}>{p.badge}</span>}
                  <h2 className={styles.planName}>{p.name}</h2>
                  <div className={styles.planPriceRow}>
                    <span className={styles.planPrice}>{p.price}</span>
                    <span className={styles.planPriceNote}>{p.priceNote}</span>
                  </div>
                  <p className={styles.planTagline}>{p.tagline}</p>
                  <p className={styles.planDesc}>{p.description}</p>
                  <ul className={styles.planFeatures}>
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Link to={p.href} className={styles.planCta} data-cursor>
                    {p.cta} →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.note}>
          <div className="container">
            <h2 className={styles.h2}>Cómo se construye una tarifa SEO honesta</h2>
            <p>
              La pregunta "¿cuánto cuesta el SEO en Málaga?" no tiene una respuesta
              única, igual que no la tiene "¿cuánto cuesta una reforma?". Depende de tres cosas:
              tu punto de partida, la competencia de tu sector y el tiempo que decidas darle al
              trabajo. Pero sí hay rangos sensatos por debajo de los cuales el SEO no puede ser
              real, sólo automatización barata. Estos son los míos, y te explico cada uno.
            </p>
            <h3 className={styles.h3}>Lo que pagas cuando contratas SEO local</h3>
            <ul className={styles.bullets}>
              <li>
                <strong>Horas de análisis manual:</strong> auditoría técnica, keyword research
                real (no plantillas), análisis de competencia.
              </li>
              <li>
                <strong>Horas de implementación:</strong> escribir contenido geo-targeted,
                optimizar tu Google My Business, schema, enlaces internos.
              </li>
              <li>
                <strong>Horas de link building y citaciones:</strong> conseguir menciones
                legítimas en directorios y medios locales. No vale comprar enlaces baratos.
              </li>
              <li>
                <strong>Horas de reporting y reunión:</strong> mensual, con métricas que
                significan algo (impresiones, posición media, leads), no dashboards con humo.
              </li>
            </ul>
            <p>
              Si alguien te ofrece "SEO local en Málaga por 150 €/mes", está vendiendo paquetes
              automatizados con plantillas reutilizadas y enlaces de baja calidad. Te puede
              hacer perder posicionamiento y, en el peor caso, llevarte a una penalización
              manual de Google. Cuesta meses recuperarse de eso.
            </p>
          </div>
        </section>

        <FAQ
          faqs={pricingFaqs}
          eyebrow="/ Dudas sobre precio"
          title={
            <>
              Lo que <em>siempre</em>
              <br /> me preguntan sobre <span className={styles.faqAccent}>el precio del SEO</span>.
            </>
          }
        />

        <LeadForm />
      </main>
    </>
  )
}
