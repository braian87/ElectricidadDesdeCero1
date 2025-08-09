# Guía de Despliegue - Prompt Maestro Electricidad

Esta guía te ayudará a desplegar la aplicación en diferentes plataformas y configurar todos los servicios necesarios.

## 🚀 Opciones de Despliegue

### 1. Vercel (Recomendado)

Vercel es la opción más sencilla y optimizada para aplicaciones Next.js.

#### Despliegue Automático desde GitHub

1. **Conectar Repositorio**
   ```bash
   # Subir código a GitHub
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Configurar en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub
   - Importa el repositorio
   - Vercel detectará automáticamente Next.js

3. **Variables de Entorno**
   ```env
   NEXT_PUBLIC_APP_URL=https://tu-app.vercel.app
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXTAUTH_SECRET=tu-secret-super-seguro
   DATABASE_URL=postgresql://usuario:password@host:5432/db
   ```

4. **Configuración de Dominio**
   - Añadir dominio personalizado en Vercel
   - Configurar DNS: CNAME apuntando a cname.vercel-dns.com
   - SSL se configura automáticamente

#### Despliegue Manual con CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Desplegar
vercel --prod

# Configurar variables de entorno
vercel env add NEXT_PUBLIC_APP_URL
vercel env add NEXTAUTH_SECRET
```

### 2. Netlify

```bash
# Build command
npm run build

# Publish directory
.next

# Configurar redirects en netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. AWS Amplify

```bash
# Configurar amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### 4. Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
```

```bash
# Build y run
docker build -t prompt-maestro-electricidad .
docker run -p 3000:3000 prompt-maestro-electricidad
```

## 🔧 Configuración de Servicios

### Base de Datos (PostgreSQL)

#### Supabase (Recomendado)
```bash
# 1. Crear proyecto en supabase.com
# 2. Obtener URL de conexión
# 3. Configurar variable de entorno
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
```

#### PlanetScale
```bash
# 1. Crear base de datos en planetscale.com
# 2. Obtener connection string
# 3. Configurar variable
DATABASE_URL=mysql://username:password@host/database?sslaccept=strict
```

### Autenticación (NextAuth.js)

```env
NEXTAUTH_URL=https://tu-dominio.com
NEXTAUTH_SECRET=tu-secret-super-seguro-de-32-caracteres

# Google OAuth
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret

# GitHub OAuth
GITHUB_ID=tu-github-client-id
GITHUB_SECRET=tu-github-client-secret
```

### Analytics

#### Google Analytics
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### Vercel Analytics
```bash
# Se configura automáticamente en Vercel
# Habilitar en dashboard de Vercel
```

### Monitoreo de Errores (Sentry)

```env
SENTRY_DSN=https://tu-dsn@sentry.io/proyecto
NEXT_PUBLIC_SENTRY_DSN=https://tu-dsn@sentry.io/proyecto
```

### Email (Resend)

```env
RESEND_API_KEY=re_tu-api-key
FROM_EMAIL=noreply@tu-dominio.com
```

## 🌐 Configuración de CDN

### Cloudflare (Recomendado)

1. **Configurar DNS**
   ```
   Type: CNAME
   Name: @
   Target: cname.vercel-dns.com
   ```

2. **Configurar Page Rules**
   ```
   *.tu-dominio.com/api/*
   Cache Level: Bypass
   
   *.tu-dominio.com/_next/static/*
   Cache Level: Cache Everything
   Edge Cache TTL: 1 year
   ```

3. **Configurar Security**
   - SSL/TLS: Full (strict)
   - Always Use HTTPS: On
   - HSTS: Enable
   - Minimum TLS Version: 1.2

### AWS CloudFront

```json
{
  "Origins": [{
    "DomainName": "tu-app.vercel.app",
    "Id": "vercel-origin",
    "CustomOriginConfig": {
      "HTTPPort": 443,
      "OriginProtocolPolicy": "https-only"
    }
  }],
  "DefaultCacheBehavior": {
    "TargetOriginId": "vercel-origin",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "managed-caching-optimized"
  }
}
```

## 📊 Configuración de Monitoreo

### Uptime Monitoring

#### UptimeRobot
```bash
# Configurar checks cada 5 minutos
# URLs a monitorear:
- https://tu-dominio.com
- https://tu-dominio.com/api/health
- https://tu-dominio.com/niveles
```

#### Pingdom
```bash
# Configurar alertas por:
- Email
- SMS
- Slack webhook
```

### Performance Monitoring

#### Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Audit URLs using Lighthouse
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://tu-dominio.com
            https://tu-dominio.com/niveles
          uploadArtifacts: true
```

#### Web Vitals
```javascript
// pages/_app.js
export function reportWebVitals(metric) {
  // Enviar a analytics
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    event_label: metric.id,
  });
}
```

## 🔒 Configuración de Seguridad

### Headers de Seguridad

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];
```

### Content Security Policy

```javascript
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
  child-src *.youtube.com *.google.com *.twitter.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self' *.gstatic.com;
`;
```

### Rate Limiting

```javascript
// middleware.js
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function middleware(request) {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }
}
```

## 🚀 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

## 📱 Configuración PWA

### Verificación de PWA

```bash
# Lighthouse PWA audit
npx lighthouse https://tu-dominio.com --view

# PWA Builder
https://www.pwabuilder.com/

# Chrome DevTools
# Application > Manifest
# Application > Service Workers
```

### App Store Deployment

#### Google Play Store (TWA)
```bash
# Usar PWA Builder para generar APK
# O Bubblewrap CLI
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://tu-dominio.com/manifest.json
bubblewrap build
```

#### Apple App Store
```bash
# Usar PWA Builder para generar proyecto iOS
# O configurar manualmente con Capacitor
npm install @capacitor/core @capacitor/ios
npx cap init
npx cap add ios
npx cap sync
npx cap open ios
```

## 🔍 Troubleshooting

### Problemas Comunes

#### Build Failures
```bash
# Limpiar cache
rm -rf .next node_modules
npm install
npm run build

# Verificar variables de entorno
vercel env ls
```

#### PWA No Instala
```bash
# Verificar manifest
curl https://tu-dominio.com/manifest.json

# Verificar service worker
curl https://tu-dominio.com/sw.js

# Verificar HTTPS
curl -I https://tu-dominio.com
```

#### Performance Issues
```bash
# Analizar bundles
npm run analyze

# Verificar Core Web Vitals
npx lighthouse https://tu-dominio.com --only-categories=performance
```

### Logs y Debugging

```bash
# Vercel logs
vercel logs

# Sentry dashboard
https://sentry.io/organizations/tu-org/projects/

# Browser DevTools
# Console > Errors
# Network > Failed requests
# Application > Storage
```

## 📞 Soporte

Si encuentras problemas durante el despliegue:

1. **Revisa los logs** de la plataforma de despliegue
2. **Verifica las variables de entorno** están configuradas
3. **Comprueba la conectividad** a servicios externos
4. **Consulta la documentación** de la plataforma específica
5. **Contacta soporte** si el problema persiste

---

¡Tu aplicación PWA está lista para conquistar el mundo! ⚡🚀

