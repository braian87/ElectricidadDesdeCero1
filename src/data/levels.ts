import type { Level, ElectricalCategory } from '@/types';

// Datos de los niveles educativos de electricidad (0-100)
export const electricityLevels: Level[] = [
  // NIVEL 0-10: Conceptos Básicos
  {
    id: 0,
    title: "¿Qué es la Electricidad?",
    description: "Introducción a los conceptos fundamentales de la electricidad y su importancia en nuestra vida diaria.",
    difficulty: 'beginner',
    category: 'basics',
    prerequisites: [],
    estimatedTime: 15,
    xpReward: 100,
    isLocked: false,
    completionRate: 0,
    content: {
      introduction: "Bienvenido al fascinante mundo de la electricidad. En este nivel aprenderás qué es la electricidad y cómo funciona a nivel básico.",
      theory: [
        {
          id: "theory-1",
          title: "Definición de Electricidad",
          content: "La electricidad es una forma de energía que resulta del movimiento de partículas cargadas, principalmente electrones. Es una fuerza fundamental de la naturaleza que nos rodea constantemente.",
          images: ["/images/levels/0/electricity-definition.svg"],
          diagrams: [
            {
              id: "atom-diagram",
              title: "Estructura del Átomo",
              description: "Visualización de protones, neutrones y electrones",
              svgPath: "/diagrams/atom-structure.svg"
            }
          ]
        },
        {
          id: "theory-2",
          title: "Historia de la Electricidad",
          content: "Desde los antiguos griegos hasta Benjamin Franklin y Thomas Edison, la electricidad ha fascinado a la humanidad durante milenios.",
          images: ["/images/levels/0/electricity-history.svg"]
        }
      ],
      examples: [
        {
          id: "example-1",
          title: "Electricidad en la Naturaleza",
          description: "Los rayos son una manifestación natural de la electricidad",
          problem: "¿Por qué se producen los rayos?",
          solution: "Los rayos se producen por la acumulación de cargas eléctricas en las nubes",
          steps: [
            "Las gotas de agua en las nubes se frotan entre sí",
            "Se acumulan cargas eléctricas positivas y negativas",
            "Cuando la diferencia es muy grande, se produce una descarga",
            "Esta descarga es lo que vemos como un rayo"
          ]
        }
      ],
      interactiveElements: [
        {
          id: "static-demo",
          type: "simulation",
          title: "Demostración de Electricidad Estática",
          description: "Experimenta con cargas eléctricas virtuales",
          component: "StaticElectricityDemo"
        }
      ],
      summary: "La electricidad es el movimiento de cargas eléctricas y es fundamental para la tecnología moderna.",
      resources: [
        {
          id: "resource-1",
          title: "Video: ¿Qué es la Electricidad?",
          type: "video",
          url: "/videos/what-is-electricity.mp4",
          description: "Explicación visual de los conceptos básicos",
          tags: ["básico", "introducción"]
        }
      ]
    },
    quiz: {
      id: "quiz-0",
      levelId: 0,
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          question: "¿Qué es la electricidad?",
          options: [
            "El movimiento de partículas cargadas",
            "Un tipo de gas",
            "Una forma de luz",
            "Un tipo de sonido"
          ],
          correctAnswer: "El movimiento de partículas cargadas",
          explanation: "La electricidad es efectivamente el movimiento de partículas cargadas, principalmente electrones.",
          points: 10,
          difficulty: "easy",
          tags: ["definición", "conceptos básicos"]
        },
        {
          id: "q2",
          type: "true-false",
          question: "Los rayos son una forma natural de electricidad.",
          options: ["Verdadero", "Falso"],
          correctAnswer: "Verdadero",
          explanation: "Los rayos son descargas eléctricas naturales que ocurren en la atmósfera.",
          points: 10,
          difficulty: "easy",
          tags: ["naturaleza", "rayos"]
        }
      ],
      passingScore: 70,
      timeLimit: 300
    }
  },
  
  {
    id: 1,
    title: "Átomos y Cargas Eléctricas",
    description: "Comprende la estructura atómica y cómo se generan las cargas eléctricas.",
    difficulty: 'beginner',
    category: 'basics',
    prerequisites: [0],
    estimatedTime: 20,
    xpReward: 120,
    isLocked: true,
    completionRate: 0,
    content: {
      introduction: "Para entender la electricidad, primero debemos comprender la estructura de los átomos y cómo se comportan las cargas eléctricas.",
      theory: [
        {
          id: "theory-1",
          title: "Estructura del Átomo",
          content: "Los átomos están compuestos por protones (carga positiva), neutrones (sin carga) y electrones (carga negativa). Los electrones orbitan alrededor del núcleo.",
          diagrams: [
            {
              id: "atom-detailed",
              title: "Átomo Detallado",
              description: "Estructura completa del átomo con órbitas electrónicas",
              svgPath: "/diagrams/atom-detailed.svg"
            }
          ]
        },
        {
          id: "theory-2",
          title: "Tipos de Cargas",
          content: "Existen dos tipos de cargas eléctricas: positiva y negativa. Las cargas iguales se repelen, las cargas opuestas se atraen.",
          formulas: [
            {
              id: "coulomb-law",
              name: "Ley de Coulomb",
              formula: "F = k × (q₁ × q₂) / r²",
              variables: [
                { symbol: "F", name: "Fuerza", unit: "N", description: "Fuerza entre las cargas" },
                { symbol: "k", name: "Constante de Coulomb", unit: "N⋅m²/C²", description: "9 × 10⁹ N⋅m²/C²" },
                { symbol: "q₁, q₂", name: "Cargas", unit: "C", description: "Magnitud de las cargas" },
                { symbol: "r", name: "Distancia", unit: "m", description: "Distancia entre las cargas" }
              ],
              description: "Describe la fuerza entre dos cargas puntuales"
            }
          ]
        }
      ],
      examples: [
        {
          id: "example-1",
          title: "Globo y Cabello",
          description: "¿Por qué un globo frotado atrae el cabello?",
          problem: "Explica el fenómeno del globo que atrae el cabello después de frotarlo.",
          solution: "Al frotar el globo, los electrones se transfieren del cabello al globo, creando cargas opuestas que se atraen.",
          steps: [
            "El globo inicialmente es neutro (igual cantidad de protones y electrones)",
            "Al frotar, los electrones del cabello pasan al globo",
            "El globo queda con carga negativa, el cabello con carga positiva",
            "Las cargas opuestas se atraen, por eso el cabello se pega al globo"
          ]
        }
      ],
      interactiveElements: [
        {
          id: "charge-simulator",
          type: "simulation",
          title: "Simulador de Cargas",
          description: "Experimenta con cargas positivas y negativas",
          component: "ChargeSimulator"
        }
      ],
      summary: "Los átomos contienen cargas eléctricas que pueden moverse y crear fenómenos eléctricos.",
      resources: []
    },
    quiz: {
      id: "quiz-1",
      levelId: 1,
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          question: "¿Cuál es la carga del electrón?",
          options: ["Positiva", "Negativa", "Neutra", "Variable"],
          correctAnswer: "Negativa",
          explanation: "Los electrones tienen carga negativa, mientras que los protones tienen carga positiva.",
          points: 10,
          difficulty: "easy",
          tags: ["átomo", "cargas"]
        }
      ],
      passingScore: 70,
      timeLimit: 300
    }
  },

  // NIVEL 2-5: Corriente Eléctrica
  {
    id: 2,
    title: "Corriente Eléctrica",
    description: "Aprende qué es la corriente eléctrica y cómo se mide.",
    difficulty: 'beginner',
    category: 'current',
    prerequisites: [1],
    estimatedTime: 25,
    xpReward: 150,
    isLocked: true,
    completionRate: 0,
    content: {
      introduction: "La corriente eléctrica es el flujo de cargas eléctricas a través de un conductor. Es uno de los conceptos más importantes en electricidad.",
      theory: [
        {
          id: "theory-1",
          title: "Definición de Corriente",
          content: "La corriente eléctrica (I) es la cantidad de carga eléctrica (Q) que pasa por un punto en un tiempo determinado (t).",
          formulas: [
            {
              id: "current-formula",
              name: "Corriente Eléctrica",
              formula: "I = Q / t",
              variables: [
                { symbol: "I", name: "Corriente", unit: "A", description: "Intensidad de corriente en amperios" },
                { symbol: "Q", name: "Carga", unit: "C", description: "Cantidad de carga en coulombios" },
                { symbol: "t", name: "Tiempo", unit: "s", description: "Tiempo en segundos" }
              ],
              description: "Fórmula básica de la corriente eléctrica"
            }
          ]
        },
        {
          id: "theory-2",
          title: "Tipos de Corriente",
          content: "Existen dos tipos principales: corriente continua (DC) donde los electrones fluyen en una dirección, y corriente alterna (AC) donde cambian de dirección periódicamente.",
          images: ["/images/levels/2/dc-vs-ac.svg"]
        }
      ],
      examples: [
        {
          id: "example-1",
          title: "Cálculo de Corriente",
          description: "Si 10 coulombios pasan por un punto en 2 segundos, ¿cuál es la corriente?",
          problem: "Calcular la corriente cuando Q = 10 C y t = 2 s",
          solution: "I = Q / t = 10 C / 2 s = 5 A",
          steps: [
            "Identificar los valores: Q = 10 C, t = 2 s",
            "Aplicar la fórmula: I = Q / t",
            "Sustituir valores: I = 10 / 2",
            "Resultado: I = 5 amperios"
          ]
        }
      ],
      interactiveElements: [
        {
          id: "current-flow",
          type: "animation",
          title: "Flujo de Corriente",
          description: "Visualiza cómo fluyen los electrones en un conductor",
          component: "CurrentFlowAnimation"
        }
      ],
      summary: "La corriente eléctrica es el flujo de cargas y se mide en amperios.",
      resources: []
    },
    quiz: {
      id: "quiz-2",
      levelId: 2,
      questions: [
        {
          id: "q1",
          type: "calculation",
          question: "Si 20 coulombios pasan por un punto en 4 segundos, ¿cuál es la corriente?",
          correctAnswer: 5,
          explanation: "I = Q / t = 20 C / 4 s = 5 A",
          points: 15,
          difficulty: "medium",
          tags: ["cálculo", "corriente"]
        }
      ],
      passingScore: 70,
      timeLimit: 400
    }
  },

  // NIVEL 3-10: Voltaje y Resistencia
  {
    id: 3,
    title: "Voltaje y Diferencia de Potencial",
    description: "Comprende qué es el voltaje y cómo impulsa la corriente eléctrica.",
    difficulty: 'beginner',
    category: 'voltage',
    prerequisites: [2],
    estimatedTime: 30,
    xpReward: 180,
    isLocked: true,
    completionRate: 0,
    content: {
      introduction: "El voltaje es la fuerza que impulsa a los electrones a moverse, creando corriente eléctrica.",
      theory: [
        {
          id: "theory-1",
          title: "¿Qué es el Voltaje?",
          content: "El voltaje (V) es la diferencia de potencial eléctrico entre dos puntos. Se mide en voltios (V).",
          formulas: [
            {
              id: "voltage-formula",
              name: "Voltaje",
              formula: "V = W / Q",
              variables: [
                { symbol: "V", name: "Voltaje", unit: "V", description: "Diferencia de potencial en voltios" },
                { symbol: "W", name: "Trabajo", unit: "J", description: "Trabajo realizado en julios" },
                { symbol: "Q", name: "Carga", unit: "C", description: "Carga en coulombios" }
              ],
              description: "Voltaje como trabajo por unidad de carga"
            }
          ]
        }
      ],
      examples: [
        {
          id: "example-1",
          title: "Analogía del Agua",
          description: "El voltaje es como la presión del agua en una tubería",
          problem: "¿Cómo se relaciona la presión del agua con el voltaje?",
          solution: "Mayor presión = mayor flujo de agua. Mayor voltaje = mayor corriente eléctrica.",
          steps: [
            "La presión del agua impulsa el flujo",
            "El voltaje impulsa el flujo de electrones",
            "Mayor presión/voltaje = mayor flujo",
            "Sin presión/voltaje = sin flujo"
          ]
        }
      ],
      interactiveElements: [
        {
          id: "voltage-demo",
          type: "simulation",
          title: "Demostración de Voltaje",
          description: "Experimenta con diferentes voltajes",
          component: "VoltageDemo"
        }
      ],
      summary: "El voltaje es la fuerza que impulsa la corriente eléctrica.",
      resources: []
    },
    quiz: {
      id: "quiz-3",
      levelId: 3,
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          question: "¿En qué unidad se mide el voltaje?",
          options: ["Amperios", "Voltios", "Ohmios", "Vatios"],
          correctAnswer: "Voltios",
          explanation: "El voltaje se mide en voltios (V), en honor a Alessandro Volta.",
          points: 10,
          difficulty: "easy",
          tags: ["unidades", "voltaje"]
        }
      ],
      passingScore: 70,
      timeLimit: 400
    }
  },

  // Continuar con más niveles...
  {
    id: 4,
    title: "Resistencia Eléctrica",
    description: "Descubre cómo los materiales se oponen al flujo de corriente.",
    difficulty: 'beginner',
    category: 'resistance',
    prerequisites: [3],
    estimatedTime: 35,
    xpReward: 200,
    isLocked: true,
    completionRate: 0,
    content: {
      introduction: "La resistencia es la oposición que presenta un material al paso de la corriente eléctrica.",
      theory: [
        {
          id: "theory-1",
          title: "Ley de Ohm",
          content: "La ley más fundamental de la electricidad: V = I × R",
          formulas: [
            {
              id: "ohms-law",
              name: "Ley de Ohm",
              formula: "V = I × R",
              variables: [
                { symbol: "V", name: "Voltaje", unit: "V", description: "Voltaje en voltios" },
                { symbol: "I", name: "Corriente", unit: "A", description: "Corriente en amperios" },
                { symbol: "R", name: "Resistencia", unit: "Ω", description: "Resistencia en ohmios" }
              ],
              description: "Relación fundamental entre voltaje, corriente y resistencia"
            }
          ]
        }
      ],
      examples: [
        {
          id: "example-1",
          title: "Cálculo con Ley de Ohm",
          description: "Si tenemos 12V y 3A, ¿cuál es la resistencia?",
          problem: "Calcular R cuando V = 12V e I = 3A",
          solution: "R = V / I = 12V / 3A = 4Ω",
          steps: [
            "Usar la fórmula: R = V / I",
            "Sustituir: R = 12 / 3",
            "Resultado: R = 4 ohmios"
          ]
        }
      ],
      interactiveElements: [
        {
          id: "ohms-law-calc",
          type: "calculator",
          title: "Calculadora de Ley de Ohm",
          description: "Calcula V, I o R usando la ley de Ohm",
          component: "OhmsLawCalculator"
        }
      ],
      summary: "La resistencia se opone al flujo de corriente y sigue la Ley de Ohm.",
      resources: []
    },
    quiz: {
      id: "quiz-4",
      levelId: 4,
      questions: [
        {
          id: "q1",
          type: "calculation",
          question: "Si V = 24V e I = 6A, ¿cuál es la resistencia?",
          correctAnswer: 4,
          explanation: "R = V / I = 24V / 6A = 4Ω",
          points: 15,
          difficulty: "medium",
          tags: ["ley de ohm", "cálculo"]
        }
      ],
      passingScore: 70,
      timeLimit: 450
    }
  },

  // Nivel 5: Potencia Eléctrica
  {
    id: 5,
    title: "Potencia Eléctrica",
    description: "Aprende sobre la potencia eléctrica y cómo se consume la energía.",
    difficulty: 'intermediate',
    category: 'power',
    prerequisites: [4],
    estimatedTime: 40,
    xpReward: 250,
    isLocked: true,
    completionRate: 0,
    content: {
      introduction: "La potencia eléctrica es la velocidad a la que se consume o produce energía eléctrica.",
      theory: [
        {
          id: "theory-1",
          title: "Fórmulas de Potencia",
          content: "La potencia se puede calcular de varias formas dependiendo de los datos disponibles.",
          formulas: [
            {
              id: "power-basic",
              name: "Potencia Básica",
              formula: "P = V × I",
              variables: [
                { symbol: "P", name: "Potencia", unit: "W", description: "Potencia en vatios" },
                { symbol: "V", name: "Voltaje", unit: "V", description: "Voltaje en voltios" },
                { symbol: "I", name: "Corriente", unit: "A", description: "Corriente en amperios" }
              ],
              description: "Fórmula básica de potencia"
            },
            {
              id: "power-resistance",
              name: "Potencia con Resistencia",
              formula: "P = I² × R = V² / R",
              variables: [
                { symbol: "P", name: "Potencia", unit: "W", description: "Potencia en vatios" },
                { symbol: "I", name: "Corriente", unit: "A", description: "Corriente en amperios" },
                { symbol: "R", name: "Resistencia", unit: "Ω", description: "Resistencia en ohmios" },
                { symbol: "V", name: "Voltaje", unit: "V", description: "Voltaje en voltios" }
              ],
              description: "Fórmulas alternativas usando resistencia"
            }
          ]
        }
      ],
      examples: [
        {
          id: "example-1",
          title: "Consumo de una Bombilla",
          description: "Una bombilla de 60W conectada a 120V, ¿qué corriente consume?",
          problem: "Calcular la corriente de una bombilla de 60W a 120V",
          solution: "I = P / V = 60W / 120V = 0.5A",
          steps: [
            "Datos: P = 60W, V = 120V",
            "Usar: I = P / V",
            "Calcular: I = 60 / 120 = 0.5A"
          ]
        }
      ],
      interactiveElements: [
        {
          id: "power-calc",
          type: "calculator",
          title: "Calculadora de Potencia",
          description: "Calcula potencia usando diferentes fórmulas",
          component: "PowerCalculator"
        }
      ],
      summary: "La potencia eléctrica mide la velocidad de consumo de energía.",
      resources: []
    },
    quiz: {
      id: "quiz-5",
      levelId: 5,
      questions: [
        {
          id: "q1",
          type: "calculation",
          question: "¿Cuál es la potencia si V = 220V e I = 5A?",
          correctAnswer: 1100,
          explanation: "P = V × I = 220V × 5A = 1100W",
          points: 20,
          difficulty: "medium",
          tags: ["potencia", "cálculo"]
        }
      ],
      passingScore: 75,
      timeLimit: 500
    }
  }

  // Continuaríamos con los niveles 6-100, cubriendo:
  // - Circuitos serie y paralelo (6-15)
  // - Capacitores e inductores (16-25)
  // - Corriente alterna (26-35)
  // - Transformadores (36-45)
  // - Motores eléctricos (46-55)
  // - Electrónica básica (56-65)
  // - Sistemas de potencia (66-75)
  // - Energías renovables (76-85)
  // - Automatización (86-95)
  // - Proyectos avanzados (96-100)
];

// Función para obtener niveles por categoría
export const getLevelsByCategory = (category: ElectricalCategory): Level[] => {
  return electricityLevels.filter(level => level.category === category);
};

// Función para obtener niveles por dificultad
export const getLevelsByDifficulty = (difficulty: Level['difficulty']): Level[] => {
  return electricityLevels.filter(level => level.difficulty === difficulty);
};

// Función para obtener niveles disponibles (desbloqueados)
export const getAvailableLevels = (completedLevels: number[]): Level[] => {
  return electricityLevels.filter(level => {
    if (level.id === 0) return true; // El primer nivel siempre está disponible
    return level.prerequisites.every(prereq => completedLevels.includes(prereq));
  });
};

// Función para obtener el siguiente nivel recomendado
export const getNextRecommendedLevel = (completedLevels: number[]): Level | null => {
  const availableLevels = getAvailableLevels(completedLevels);
  const uncompletedLevels = availableLevels.filter(level => !completedLevels.includes(level.id));
  
  if (uncompletedLevels.length === 0) return null;
  
  // Devolver el nivel con menor ID (más básico)
  return uncompletedLevels.reduce((prev, current) => 
    prev.id < current.id ? prev : current
  );
};

// Función para calcular el progreso total
export const calculateTotalProgress = (completedLevels: number[]): number => {
  return (completedLevels.length / electricityLevels.length) * 100;
};

// Función para obtener estadísticas por categoría
export const getCategoryStats = (completedLevels: number[]) => {
  const categories: ElectricalCategory[] = [
    'basics', 'current', 'voltage', 'resistance', 'power', 
    'circuits', 'ac-dc', 'components', 'measurements', 
    'safety', 'applications', 'advanced'
  ];

  return categories.map(category => {
    const categoryLevels = getLevelsByCategory(category);
    const completedInCategory = categoryLevels.filter(level => 
      completedLevels.includes(level.id)
    ).length;

    return {
      category,
      total: categoryLevels.length,
      completed: completedInCategory,
      progress: categoryLevels.length > 0 ? (completedInCategory / categoryLevels.length) * 100 : 0
    };
  });
};

