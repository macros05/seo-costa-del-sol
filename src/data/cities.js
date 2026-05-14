export const cities = [
  {
    slug: 'seo-malaga',
    city: 'Málaga',
    name: 'SEO en Málaga',
    population: '578.000 habitantes',
    intro:
      'Málaga capital concentra la mayor competencia online de la provincia: clínicas privadas en Teatinos, restaurantes en el Centro Histórico y la Malagueta, despachos en La Rosaleda, comercios en Soho. Posicionar aquí no es opcional: si no apareces en el top 3 de Google para tu búsqueda principal, el cliente entra en otro sitio sin pensarlo dos veces.',
    competitionNote:
      'Alta competencia en el centro y zonas turísticas (Soho, Muelle Uno, Centro Histórico). Más fácil destacar en barrios con menos saturación: Teatinos, Pedregalejo, Cerrado de Calderón, Carretera de Cádiz.',
    sectors: ['Restaurantes', 'Despachos profesionales', 'Clínicas estéticas y dentales', 'Comercios del centro', 'Hoteles y apartamentos turísticos'],
    keywords: ['agencia SEO Málaga', 'consultor SEO Málaga', 'posicionamiento web Málaga', 'SEO local Málaga', 'freelance SEO Málaga'],
    coords: { lat: 36.7213, lng: -4.4214 },
    near: ['seo-torremolinos', 'seo-benalmadena', 'seo-fuengirola']
  },
  {
    slug: 'seo-marbella',
    city: 'Marbella',
    name: 'SEO en Marbella',
    population: '147.000 habitantes',
    intro:
      'Marbella es el mercado más exigente de la Costa del Sol: clientela internacional, búsquedas multilenguaje (español + inglés), competencia de agencias internacionales con presupuestos altos. Aquí el SEO local no es una opción, es la única forma de que un negocio con sede física no quede sepultado bajo agencias y portales con domain authority gigante.',
    competitionNote:
      'Búsquedas habituales en inglés ("SEO Marbella", "real estate Marbella", "dentist Marbella"). Pensar siempre en estrategia bilingüe ES/EN si tu cliente objetivo es residente extranjero.',
    sectors: ['Inmobiliarias y real estate', 'Clínicas estéticas premium', 'Restaurantes Puerto Banús / Casco Antiguo', 'Servicios profesionales', 'Hoteles boutique'],
    keywords: ['SEO Marbella', 'agencia SEO Marbella', 'consultor SEO Marbella', 'posicionamiento web Marbella', 'SEO real estate Marbella'],
    coords: { lat: 36.5108, lng: -4.8850 },
    near: ['seo-estepona', 'seo-fuengirola', 'seo-malaga']
  },
  {
    slug: 'seo-fuengirola',
    city: 'Fuengirola',
    name: 'SEO en Fuengirola',
    population: '83.000 habitantes',
    intro:
      'Fuengirola es uno de los mercados con mejor relación esfuerzo/recompensa de la Costa del Sol: competencia digital aún moderada, demanda alta y constante (residentes + turismo nacional/europeo), y barrios bien definidos (Los Boliches, Torreblanca, El Castillo). Si tu negocio físico está en Fuengirola y no estás en el mapa de Google, te lo está comiendo el de al lado.',
    competitionNote:
      'Mercado mixto: residentes locales + extranjeros + turismo. La búsqueda más rentable suele ser "[servicio] + Fuengirola" o "[servicio] + Los Boliches".',
    sectors: ['Tiendas de proximidad', 'Restaurantes paseo marítimo', 'Clínicas dentales y veterinarias', 'Talleres y servicios técnicos', 'Academias e idiomas'],
    keywords: ['SEO Fuengirola', 'posicionamiento web Fuengirola', 'consultor SEO Fuengirola', 'agencia SEO Fuengirola'],
    coords: { lat: 36.5394, lng: -4.6256 },
    near: ['seo-benalmadena', 'seo-marbella', 'seo-malaga']
  },
  {
    slug: 'seo-benalmadena',
    city: 'Benalmádena',
    name: 'SEO en Benalmádena',
    population: '69.000 habitantes',
    intro:
      'Benalmádena es tres mercados en uno: Arroyo de la Miel (residencial/comercial), Benalmádena Pueblo (turismo cultural) y Costa (turismo de playa, hoteles, ocio). Cada zona requiere su propia estrategia de keywords. Trabajar SEO aquí pidiendo solo "Benalmádena" sin segmentar por barrio es desperdiciar la mitad del tráfico potencial.',
    competitionNote:
      'Tres núcleos con búsquedas distintas. Recomendado crear contenido específico por barrio: "[servicio] en Arroyo de la Miel", "[servicio] en Benalmádena Costa", etc.',
    sectors: ['Hoteles y apartamentos', 'Academias y centros formativos', 'Restaurantes y chiringuitos', 'Comercios Arroyo de la Miel', 'Clínicas y servicios profesionales'],
    keywords: ['SEO Benalmádena', 'posicionamiento web Benalmádena', 'consultor SEO Benalmádena', 'SEO Arroyo de la Miel'],
    coords: { lat: 36.5985, lng: -4.5161 },
    near: ['seo-torremolinos', 'seo-fuengirola', 'seo-malaga']
  },
  {
    slug: 'seo-torremolinos',
    city: 'Torremolinos',
    name: 'SEO en Torremolinos',
    population: '70.000 habitantes',
    intro:
      'Torremolinos es mi base operativa y un mercado que conozco al detalle. Densidad altísima de hoteles, restaurantes y comercios de proximidad, con una particularidad: el SEO local aquí compite con grandes plataformas turísticas (Booking, TripAdvisor) que se llevan los clics genéricos. La estrategia ganadora es atacar long-tails específicas: "menú del día Torremolinos", "fisio La Carihuela", "boda civil en Pueblo Blanco".',
    competitionNote:
      'Booking/TripAdvisor dominan las búsquedas genéricas. Estrategia: keywords long-tail por servicio + barrio (La Carihuela, El Bajondillo, Pueblo Blanco, Playamar, Montemar).',
    sectors: ['Hoteles y apartamentos', 'Restaurantes y chiringuitos', 'Bodas y eventos', 'Clínicas y fisioterapia', 'Tiendas y servicios locales'],
    keywords: ['SEO Torremolinos', 'posicionamiento web Torremolinos', 'consultor SEO Torremolinos', 'SEO La Carihuela', 'agencia SEO Torremolinos'],
    coords: { lat: 36.6202, lng: -4.4998 },
    near: ['seo-benalmadena', 'seo-malaga', 'seo-fuengirola']
  },
  {
    slug: 'seo-estepona',
    city: 'Estepona',
    name: 'SEO en Estepona',
    population: '74.000 habitantes',
    intro:
      'Estepona ha pasado en una década de pueblo dormido a uno de los mercados con mayor crecimiento de la Costa del Sol. Mercado muy similar a Marbella en perfil de cliente (alto poder adquisitivo, internacional) pero con competencia digital aún manejable. Es probablemente el mercado con mejor ROI para un negocio nuevo que apueste por SEO desde el primer día.',
    competitionNote:
      'Mercado en expansión, competencia SEO aún moderada comparada con Marbella. Ventana de oportunidad para posicionar antes de que se sature.',
    sectors: ['Inmobiliarias', 'Construcción y reformas', 'Restaurantes casco histórico', 'Clínicas estéticas y dentales', 'Servicios para extranjeros residentes'],
    keywords: ['SEO Estepona', 'posicionamiento web Estepona', 'consultor SEO Estepona', 'agencia SEO Estepona'],
    coords: { lat: 36.4276, lng: -5.1455 },
    near: ['seo-marbella', 'seo-fuengirola', 'seo-malaga']
  },
  {
    slug: 'seo-nerja',
    city: 'Nerja',
    name: 'SEO en Nerja',
    population: '21.000 habitantes',
    intro:
      'Nerja es el mercado más pequeño de la zona pero con la fidelidad de cliente más alta: turismo familiar repetidor, fuerte presencia británica e irlandesa. Aquí el SEO no se gana con volumen, se gana con micro-targeting: cada búsqueda con intención clara ("apartamento Burriana", "kayak Cuevas de Nerja", "veterinario urgente Nerja") es un cliente listo para reservar.',
    competitionNote:
      'Búsquedas en inglés muy frecuentes (turismo UK/IE). Recomendable contenido bilingüe ES/EN para captar al residente y al turista.',
    sectors: ['Apartamentos turísticos', 'Restaurantes Balcón de Europa / Burriana', 'Excursiones y actividades', 'Clínicas y servicios sanitarios', 'Comercios del casco antiguo'],
    keywords: ['SEO Nerja', 'posicionamiento web Nerja', 'consultor SEO Nerja', 'agencia SEO Nerja'],
    coords: { lat: 36.7521, lng: -3.8744 },
    near: ['seo-malaga', 'seo-torremolinos', 'seo-fuengirola']
  },
  {
    slug: 'seo-mijas',
    city: 'Mijas',
    name: 'SEO en Mijas',
    population: '85.000 habitantes',
    intro:
      'Mijas son tres mercados muy distintos bajo un mismo Ayuntamiento: Mijas Pueblo (turismo cultural, cliente extranjero acomodado), Mijas Costa / Calahonda (residencial y servicios para residentes UK/escandinavos) y La Cala de Mijas (turismo familiar y restauración). Un SEO genérico para "Mijas" pierde el 60% del tráfico potencial: aquí la estrategia ganadora es trabajar página específica por núcleo.',
    competitionNote:
      'Búsquedas bilingües ES/EN muy habituales por la alta densidad de residentes británicos, irlandeses y escandinavos. Recomendable contenido en inglés para inmobiliarias, restauración y servicios sanitarios.',
    sectors: ['Inmobiliarias y property management', 'Restaurantes y chiringuitos', 'Clínicas dentales y estéticas', 'Servicios para extranjeros residentes', 'Hoteles y apartamentos turísticos'],
    keywords: ['SEO Mijas', 'posicionamiento web Mijas', 'consultor SEO Mijas', 'SEO La Cala de Mijas', 'SEO Mijas Costa'],
    coords: { lat: 36.5959, lng: -4.6373 },
    near: ['seo-fuengirola', 'seo-benalmadena', 'seo-marbella']
  },
  {
    slug: 'seo-rincon-de-la-victoria',
    city: 'Rincón de la Victoria',
    name: 'SEO en Rincón de la Victoria',
    population: '49.000 habitantes',
    intro:
      'Rincón de la Victoria es la "Costa del Sol oriental": dormitorio de Málaga capital con alta densidad de comercio de proximidad, clínicas y servicios para familias residentes. La competencia digital es notablemente menor que en Málaga capital, lo que la convierte en una de las plazas con mejor retorno SEO por euro invertido en toda la provincia.',
    competitionNote:
      'Competencia digital baja-media. Búsquedas dominantes "[servicio] + Rincón de la Victoria" y "[servicio] + Torre de Benagalbón / Cala del Moral". Mercado de residentes, no de turismo masivo.',
    sectors: ['Clínicas dentales y veterinarias', 'Restaurantes paseo marítimo', 'Comercio de proximidad', 'Talleres y servicios técnicos', 'Academias y centros formativos'],
    keywords: ['SEO Rincón de la Victoria', 'posicionamiento web Rincón de la Victoria', 'consultor SEO Rincón de la Victoria', 'SEO Torre de Benagalbón', 'SEO Cala del Moral'],
    coords: { lat: 36.7177, lng: -4.2820 },
    near: ['seo-malaga', 'seo-velez-malaga', 'seo-torremolinos']
  },
  {
    slug: 'seo-velez-malaga',
    city: 'Vélez-Málaga',
    name: 'SEO en Vélez-Málaga',
    population: '83.000 habitantes',
    intro:
      'Vélez-Málaga y su núcleo costero Torre del Mar concentran la actividad económica de la Axarquía: capital comarcal con comercio fuerte, agricultura subtropical y un cinturón turístico cada vez más maduro. La búsqueda local "[servicio] + Vélez-Málaga" y "[servicio] + Torre del Mar" es prácticamente virgen en muchos sectores, lo que abre una ventana de oportunidad real para posicionar en el top 3 sin un gran presupuesto.',
    competitionNote:
      'Mercado en clara expansión, competencia SEO aún baja. Recomendable trabajar dos pilares: Vélez-Málaga (interior, comercio) y Torre del Mar (costa, restauración y turismo).',
    sectors: ['Comercio y servicios profesionales', 'Restaurantes y chiringuitos Torre del Mar', 'Cooperativas agrícolas (mango, aguacate)', 'Clínicas y servicios sanitarios', 'Inmobiliarias y construcción'],
    keywords: ['SEO Vélez-Málaga', 'posicionamiento web Vélez-Málaga', 'consultor SEO Vélez-Málaga', 'SEO Torre del Mar', 'agencia SEO Axarquía'],
    coords: { lat: 36.7811, lng: -4.0998 },
    near: ['seo-malaga', 'seo-nerja', 'seo-rincon-de-la-victoria']
  }
]

export function getCity(slug) {
  return cities.find((c) => c.slug === slug) ?? null
}
