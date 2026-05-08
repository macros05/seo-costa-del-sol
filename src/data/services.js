export const services = [
  {
    slug: 'auditoria-seo',
    name: 'Auditoría SEO',
    title: 'Auditoría SEO técnica completa | Costa del Sol',
    description:
      'Auditoría SEO completa para negocios de Málaga y la Costa del Sol: rastreo técnico, contenidos, keywords y plan de acción priorizado. Informe en 48 horas.',
    summary:
      'Una auditoría SEO no es un PDF de 80 páginas que nadie lee. Es un mapa quirúrgico: dónde estás perdiendo dinero ahora mismo, qué arreglar primero y qué impacto esperar.',
    deliverables: [
      'Auditoría técnica: velocidad, indexación, errores de rastreo, datos enriquecidos',
      'Auditoría de contenidos: thin content, canibalización, oportunidades sin explotar',
      'Análisis de keywords: qué búsquedas tienen demanda real y cuáles ignoras',
      'Análisis de competencia: top 3 competidores en tu sector + gaps',
      'Plan de acción priorizado por impacto: 3 quick-wins en 7 días + roadmap 90 días',
      'Reunión opcional de 30 minutos para resolver dudas'
    ],
    duration: '48 horas',
    price: 'Auditoría inicial GRATIS · Plan ejecutado desde 800 €',
    faqs: [
      {
        q: '¿La auditoría es realmente gratis?',
        a: 'Sí. La auditoría inicial — la que te entrego en PDF con los problemas detectados, las prioridades y un calendario realista — es 0 €. Si después decides ejecutarla conmigo, hablamos de presupuesto. Si la quieres aplicar tú o pasársela a otro, también vale.'
      },
      {
        q: '¿Cuánto tiempo tarda?',
        a: 'Recibes el informe en 48 horas desde que rellenas el formulario. No es una respuesta automática: la hago a mano, web por web.'
      },
      {
        q: '¿Qué necesitas de mí?',
        a: 'Solo la URL de tu web y, si lo tienes, acceso de lectura a Search Console. Sin acceso aún se puede auditar, pero con Search Console el diagnóstico es más preciso.'
      },
      {
        q: '¿Sirve para cualquier sector?',
        a: 'Para negocios locales con sede física en la Costa del Sol, sí. Para SaaS internacionales o ecommerce con catálogos de 50.000 SKUs, no soy el perfil adecuado y te lo digo de entrada.'
      }
    ]
  },
  {
    slug: 'seo-local',
    name: 'SEO local',
    title: 'SEO local para negocios de la Costa del Sol',
    description:
      'SEO local para que tu negocio aparezca en Google Maps y en el top 3 cuando alguien busca tu servicio en Málaga, Marbella, Fuengirola o Costa del Sol.',
    summary:
      'El SEO local es lo que hace que cuando alguien escribe "fisio cerca de mí" en Pedregalejo, le aparezcas tú y no la cadena de al lado. Trabajo Google My Business, citaciones locales, schema y contenido de barrio.',
    deliverables: [
      'Optimización completa de Google My Business (categorías, atributos, posts, fotos)',
      'Citaciones NAP en directorios relevantes de Málaga y nacionales',
      'Schema LocalBusiness + AggregateRating + OpeningHours',
      'Contenido de barrio: páginas específicas por zona de servicio',
      'Estrategia de reseñas: cómo conseguir 1 reseña real por semana de forma automática',
      'Seguimiento mensual de posiciones en el pack local de Google Maps'
    ],
    duration: '90 días para resultados visibles, 6 meses para consolidar top 3',
    price: 'Desde 600 €/mes',
    faqs: [
      {
        q: '¿Cuánto tarda el SEO local en dar resultados?',
        a: 'En negocios sin trabajo previo, los primeros movimientos en el pack local se ven entre 30 y 60 días. Para consolidar top 3 estables, calcula 4-6 meses.'
      },
      {
        q: '¿Y si todavía no tengo Google My Business?',
        a: 'Te lo creo, lo verifico y te entrego acceso. La verificación por postal puede tardar 1-2 semanas — empezamos en paralelo con la web mientras llega.'
      },
      {
        q: '¿Trabajáis con cadenas de varios locales?',
        a: 'Sí, pero requiere un setup distinto: location pages, GMB por sucursal, gestión coordinada de reseñas. Te lo explico en una llamada.'
      }
    ]
  },
  {
    slug: 'seo-ecommerce',
    name: 'SEO para ecommerce',
    title: 'SEO para tiendas online en Málaga y Costa del Sol',
    description:
      'SEO técnico y de contenidos para ecommerce: arquitectura, fichas de producto, categorías, paginación, schema Product. Para tiendas con sede en Málaga.',
    summary:
      'En un ecommerce el SEO se gana en tres frentes: arquitectura (que Google entienda tu catálogo), fichas (que la ficha del producto X compita con Amazon) y enlazado interno (que el linkjuice llegue a las páginas que venden).',
    deliverables: [
      'Auditoría arquitectónica: silos, paginación, faceted navigation, parámetros',
      'Optimización de fichas de producto: schema Product, microdatos, contenido único',
      'Optimización de categorías: H1, descripciones, internal linking',
      'Schema markup completo: Product, BreadcrumbList, AggregateOffer',
      'Plan de contenido informacional para captar tráfico top-of-funnel',
      'Configuración de Search Console + GA4 ecommerce + eventos de conversión'
    ],
    duration: '6 meses mínimo (ecommerce es maratón, no sprint)',
    price: 'Desde 1.200 €/mes según tamaño del catálogo',
    faqs: [
      {
        q: '¿Qué tamaño de tienda manejas?',
        a: 'De 50 a 5.000 SKUs cómodamente. Por encima de eso necesitas un equipo dedicado y herramientas enterprise — no soy el perfil.'
      },
      {
        q: '¿Da igual la plataforma (Shopify, WooCommerce, PrestaShop)?',
        a: 'A nivel SEO da igual. A nivel implementación cambia. Yo trabajo bien con Shopify y WooCommerce; con PrestaShop se puede pero los plazos se alargan.'
      },
      {
        q: '¿Y si vendo solo a clientes de la Costa del Sol?',
        a: 'Entonces lo tuyo es ecommerce + SEO local mezclados. Trabajamos categoría nacional + landing locales por ciudad.'
      }
    ]
  },
  {
    slug: 'link-building',
    name: 'Link building',
    title: 'Link building local y nacional para negocios de la Costa del Sol',
    description:
      'Construcción de autoridad con enlaces relevantes: directorios locales, prensa de Málaga, partnerships sectoriales y contenido linkable. Sin PBNs, sin granjas.',
    summary:
      'El link building serio es lento y aburrido — y es exactamente por eso que funciona. Olvida paquetes de "100 enlaces 19 €". Aquí trabajamos cantidad razonable + relevancia + nichos correctos.',
    deliverables: [
      'Auditoría de backlinks actuales: identificación de enlaces tóxicos a desautorizar',
      'Alta en 20 directorios locales relevantes con NAP consistente',
      'Outreach a medios locales (Diario Sur, Málaga Hoy, La Opinión de Málaga, blogs sectoriales)',
      'Partnerships con negocios complementarios no competidores',
      'Contenido linkable: estudios, guías, recursos descargables',
      'Reporte mensual de enlaces conseguidos con métricas (DR, tráfico, relevancia)'
    ],
    duration: '6-12 meses para impacto medible',
    price: 'Desde 800 €/mes',
    faqs: [
      {
        q: '¿Garantizas X enlaces al mes?',
        a: 'No. Cualquier SEO que te garantice cantidad de enlaces específica está vendiendo enlaces de baja calidad. Yo trabajo por relevancia: prefiero 3 enlaces excelentes que 30 mediocres.'
      },
      {
        q: '¿Compráis enlaces?',
        a: 'No. Y si te lo ofrecen, huye: es contra las directrices de Google y, antes o después, acabas penalizado.'
      },
      {
        q: '¿Funciona si mi web es nueva?',
        a: 'Sí, pero con paciencia. En webs nuevas el link building agresivo levanta sospechas. Empezamos por la base: directorios + citaciones + 1-2 partnerships orgánicos al mes.'
      }
    ]
  }
]

export function getService(slug) {
  return services.find((s) => s.slug === slug) ?? null
}
