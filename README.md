# Prompt Maestro - Electricidad desde Cero

Una Progressive Web App (PWA) educativa de última generación para aprender electricidad de forma interactiva, gamificada y completamente en español.

## 🚀 Características Principales

### 🎯 Educación Avanzada
- **100 Niveles Progresivos**: Desde conceptos básicos hasta proyectos profesionales
- **Contenido Estructurado**: Teoría, ejemplos prácticos, simulaciones y evaluaciones
- **Gamificación Total**: Sistema de XP, logros, insignias y clasificaciones
- **Aprendizaje Adaptativo**: Progreso personalizado según el ritmo del usuario

### ⚡ Tecnología de Vanguardia
- **PWA Completa**: Funciona offline, se instala como app nativa
- **Performance Extremo**: SSR/SSG, lazy loading, cache inteligente
- **Responsive Design**: Optimizada para móvil, tablet y desktop
- **Accesibilidad WCAG 2.1**: Compatible con lectores de pantalla

### 🎨 Diseño Moderno
- **Tema Eléctrico**: Colores y animaciones inspirados en electricidad
- **Modo Oscuro/Claro**: Cambio automático según preferencias
- **Microinteracciones**: Animaciones fluidas de 60fps
- **UI/UX Intuitiva**: Navegación clara y experiencia optimizada

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15**: Framework React con SSR/SSG
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Styling utility-first con tema personalizado
- **Framer Motion**: Animaciones y transiciones fluidas

### PWA & Performance
- **next-pwa**: Service Workers y cache strategies
- **Workbox**: Gestión avanzada de cache offline
- **Bundle Analyzer**: Optimización de tamaño de bundles
- **Turbopack**: Compilación ultra-rápida

### Estado y Datos
- **Zustand**: Estado global reactivo y persistente
- **React Query**: Cache y sincronización de datos
- **IndexedDB**: Almacenamiento local para offline
- **Immer**: Actualizaciones inmutables del estado

### Desarrollo y Calidad
- **ESLint + Prettier**: Linting y formateo de código
- **Jest + Testing Library**: Tests unitarios y de integración
- **Cypress**: Tests end-to-end
- **Playwright**: Tests cross-browser

## 📁 Estructura del Proyecto

```
prompt-maestro-electricidad/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── globals.css         # Estilos globales
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página de inicio
│   │   ├── niveles/            # Páginas de niveles
│   │   ├── sitemap.ts          # Sitemap dinámico
│   │   └── robots.ts           # Robots.txt
│   ├── components/             # Componentes React
│   │   ├── ui/                 # Componentes UI reutilizables
│   │   ├── layout/             # Componentes de layout
│   │   ├── educational/        # Componentes educativos
│   │   └── interactive/        # Componentes interactivos
│   ├── lib/                    # Utilidades y configuración
│   ├── hooks/                  # Custom hooks
│   ├── store/                  # Estado global (Zustand)
│   ├── types/                  # Definiciones TypeScript
│   ├── data/                   # Datos estáticos y niveles
│   └── utils/                  # Funciones utilitarias
├── public/                     # Archivos estáticos
│   ├── icons/                  # Iconos PWA
│   ├── images/                 # Imágenes y assets
│   ├── sounds/                 # Efectos de sonido
│   ├── manifest.json           # Manifest PWA
│   ├── sw.js                   # Service Worker
│   └── offline.html            # Página offline
├── docs/                       # Documentación
├── tests/                      # Tests automatizados
└── config files               # Configuración del proyecto
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/prompt-maestro-electricidad.git
cd prompt-maestro-electricidad

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting del código
npm run test         # Ejecutar tests
npm run test:e2e     # Tests end-to-end
npm run analyze      # Analizar bundles
```

## 🎓 Sistema Educativo

### Estructura de Niveles
El sistema educativo está organizado en 100 niveles progresivos divididos en categorías:

1. **Conceptos Básicos (0-9)**: Fundamentos de electricidad
2. **Corriente Eléctrica (10-19)**: Flujo de electrones y medición
3. **Voltaje (20-29)**: Diferencia de potencial y aplicaciones
4. **Resistencia (30-39)**: Oposición al flujo de corriente
5. **Potencia (40-49)**: Consumo y generación de energía
6. **Circuitos (50-69)**: Serie, paralelo y mixtos
7. **AC/DC (70-79)**: Corriente alterna y continua
8. **Componentes (80-89)**: Elementos electrónicos
9. **Aplicaciones (90-99)**: Proyectos reales

### Contenido por Nivel
Cada nivel incluye:
- **Teoría**: Explicaciones detalladas con fórmulas
- **Ejemplos**: Problemas resueltos paso a paso
- **Interactivo**: Simulaciones y calculadoras
- **Evaluación**: Quiz con retroalimentación

### Sistema de Gamificación
- **XP (Puntos de Experiencia)**: Ganados al completar actividades
- **Logros**: Insignias por hitos específicos
- **Racha**: Días consecutivos de actividad
- **Clasificación**: Ranking global de usuarios
- **Progreso Visual**: Barras y medidores de avance

## 🔧 Configuración PWA

### Manifest
La aplicación incluye un manifest completo con:
- Iconos adaptativos para todas las plataformas
- Shortcuts para acceso rápido
- Configuración de pantalla completa
- Metadatos de instalación

### Service Worker
Estrategias de cache implementadas:
- **Cache First**: Recursos estáticos (CSS, JS, imágenes)
- **Network First**: Contenido dinámico (API, niveles)
- **Stale While Revalidate**: Recursos frecuentes

### Funcionalidad Offline
- Niveles visitados disponibles offline
- Calculadoras básicas funcionan sin conexión
- Progreso guardado localmente
- Sincronización automática al reconectar

## 🎨 Sistema de Diseño

### Paleta de Colores
```css
/* Colores principales */
--electric: #0ea5e9    /* Azul eléctrico */
--voltage: #eab308     /* Amarillo voltaje */
--current: #ec4899     /* Rosa corriente */
--resistance: #22c55e  /* Verde resistencia */

/* Variantes */
--electric-50: #f0f9ff
--electric-500: #0ea5e9
--electric-900: #0c4a6e
```

### Tipografía
- **Fuente Principal**: Inter (Google Fonts)
- **Tamaños**: Sistema escalable con rem
- **Pesos**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Componentes UI
- **Buttons**: 5 variantes con estados hover/focus
- **Cards**: Múltiples estilos con efectos de elevación
- **Forms**: Inputs accesibles con validación
- **Navigation**: Responsive con menú móvil

## 📊 SEO y Performance

### Optimización SEO
- **Meta Tags**: Completos para todas las páginas
- **Structured Data**: Schema.org para contenido educativo
- **Sitemap**: Generado dinámicamente
- **Robots.txt**: Configurado para crawlers
- **Open Graph**: Metadatos para redes sociales

### Performance
- **Core Web Vitals**: Optimizado para métricas de Google
- **Lazy Loading**: Imágenes y componentes bajo demanda
- **Code Splitting**: Bundles optimizados por ruta
- **Preloading**: Recursos críticos precargados

### Accesibilidad
- **WCAG 2.1 AA**: Cumplimiento de estándares
- **Keyboard Navigation**: Navegación completa por teclado
- **Screen Readers**: Compatible con lectores de pantalla
- **Color Contrast**: Ratios optimizados para legibilidad

## 🧪 Testing

### Tests Unitarios
```bash
npm run test           # Jest + Testing Library
npm run test:watch     # Modo watch
npm run test:coverage  # Reporte de cobertura
```

### Tests E2E
```bash
npm run test:e2e       # Cypress
npm run test:playwright # Playwright
```

### Auditorías
```bash
npm run lighthouse     # Auditoría de performance
npm run analyze        # Análisis de bundles
```

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

### Variables de Entorno
```env
NEXT_PUBLIC_APP_URL=https://tu-dominio.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=tu-secret-key
```

### Configuración de Dominio
1. Configurar DNS en tu proveedor
2. Añadir dominio personalizado en Vercel
3. Configurar SSL automático
4. Verificar PWA en dispositivos móviles

## 📈 Analytics y Monitoreo

### Métricas Implementadas
- **Vercel Analytics**: Performance y Core Web Vitals
- **Google Analytics**: Comportamiento de usuarios
- **Sentry**: Monitoreo de errores
- **LogRocket**: Sesiones de usuario

### KPIs Educativos
- Tiempo promedio por nivel
- Tasa de completación de niveles
- Progreso de usuarios
- Engagement con simulaciones

## 🤝 Contribución

### Guías de Desarrollo
1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Añadir nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Estándares de Código
- Usar TypeScript para todo el código
- Seguir convenciones de ESLint/Prettier
- Escribir tests para nuevas funcionalidades
- Documentar componentes complejos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **Next.js Team**: Por el increíble framework
- **Tailwind CSS**: Por el sistema de diseño
- **Framer Motion**: Por las animaciones fluidas
- **Vercel**: Por la plataforma de despliegue

## 📞 Soporte

- **Email**: soporte@promptmaestro.com
- **Discord**: [Servidor de la Comunidad](https://discord.gg/promptmaestro)
- **GitHub Issues**: [Reportar problemas](https://github.com/tu-usuario/prompt-maestro-electricidad/issues)

---

**Prompt Maestro - Electricidad desde Cero** | Hecho con ⚡ y mucho ❤️

