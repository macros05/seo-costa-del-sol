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
  }
]

export function getCity(slug) {
  return cities.find((c) => c.slug === slug) ?? null
}
