import { MetadataRoute } from 'next';
import { electricityLevels } from '@/data/levels';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://prompt-maestro-electricidad.vercel.app';
  
  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/niveles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/simulaciones`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculadoras`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/foro`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/recursos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/eventos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ayuda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/auth/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // Páginas dinámicas de niveles
  const levelPages: MetadataRoute.Sitemap = electricityLevels.map((level) => ({
    url: `${baseUrl}/niveles/${level.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Páginas de quiz de niveles
  const quizPages: MetadataRoute.Sitemap = electricityLevels.map((level) => ({
    url: `${baseUrl}/niveles/${level.id}/quiz`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Páginas de categorías
  const categories = [
    'basics',
    'current',
    'voltage',
    'resistance',
    'power',
    'circuits',
    'ac-dc',
    'components',
    'measurements',
    'safety',
    'applications',
    'advanced',
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/niveles/categoria/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Páginas de dificultad
  const difficulties = ['beginner', 'intermediate', 'advanced', 'expert'];
  
  const difficultyPages: MetadataRoute.Sitemap = difficulties.map((difficulty) => ({
    url: `${baseUrl}/niveles/dificultad/${difficulty}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Páginas de simulaciones específicas
  const simulationTypes = [
    'circuitos-basicos',
    'ley-ohm',
    'circuitos-serie',
    'circuitos-paralelo',
    'circuitos-mixtos',
    'corriente-alterna',
    'transformadores',
    'motores',
    'generadores',
    'electronica-basica',
  ];

  const simulationPages: MetadataRoute.Sitemap = simulationTypes.map((type) => ({
    url: `${baseUrl}/simulaciones/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Páginas de calculadoras específicas
  const calculatorTypes = [
    'ley-ohm',
    'potencia',
    'resistencias-serie',
    'resistencias-paralelo',
    'divisor-voltaje',
    'caida-voltaje',
    'corriente-alterna',
    'transformadores',
    'capacitores',
    'inductores',
    'factor-potencia',
    'consumo-energia',
  ];

  const calculatorPages: MetadataRoute.Sitemap = calculatorTypes.map((type) => ({
    url: `${baseUrl}/calculadoras/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Páginas de recursos específicos
  const resourceTypes = [
    'formulas',
    'tablas',
    'simbolos',
    'unidades',
    'conversiones',
    'codigos-colores',
    'normas',
    'seguridad',
    'herramientas',
    'libros',
    'videos',
    'cursos',
  ];

  const resourcePages: MetadataRoute.Sitemap = resourceTypes.map((type) => ({
    url: `${baseUrl}/recursos/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Combinar todas las páginas
  return [
    ...staticPages,
    ...levelPages,
    ...quizPages,
    ...categoryPages,
    ...difficultyPages,
    ...simulationPages,
    ...calculatorPages,
    ...resourcePages,
  ];
}

