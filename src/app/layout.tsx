import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prompt Maestro - Electricidad desde Cero",
    template: "%s | Prompt Maestro"
  },
  description: "La mejor plataforma educativa en español para aprender electricidad desde cero hasta nivel experto. Cursos interactivos, simulaciones y gamificación.",
  keywords: [
    "electricidad",
    "educación",
    "cursos online",
    "aprendizaje interactivo",
    "simulaciones eléctricas",
    "gamificación",
    "PWA",
    "español"
  ],
  authors: [{ name: "Prompt Maestro Team" }],
  creator: "Prompt Maestro",
  publisher: "Prompt Maestro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://prompt-maestro-electricidad.vercel.app",
    siteName: "Prompt Maestro - Electricidad",
    title: "Prompt Maestro - Electricidad desde Cero",
    description: "Aprende electricidad de forma interactiva y gamificada. 100 niveles progresivos desde conceptos básicos hasta proyectos avanzados.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prompt Maestro - Electricidad desde Cero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Maestro - Electricidad desde Cero",
    description: "La mejor plataforma educativa para aprender electricidad de forma interactiva.",
    images: ["/og-image.png"],
    creator: "@promptmaestro",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icons/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Prompt Maestro",
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://prompt-maestro-electricidad.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      "en-US": "/en",
      "fr-FR": "/fr",
      "pt-BR": "/pt",
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
  },
  category: "education",
  classification: "Educational Platform",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0ea5e9" },
    { media: "(prefers-color-scheme: dark)", color: "#0284c7" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preconnect para optimización de fuentes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preload de recursos críticos */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Meta tags adicionales para PWA */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Prompt Maestro" />
        <meta name="application-name" content="Prompt Maestro" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Viewport optimizado para PWA */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover"
        />
        
        {/* Configuración de tema */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('prompt-maestro-electricidad-store');
                const parsedTheme = theme ? JSON.parse(theme) : null;
                const themeValue = parsedTheme?.state?.theme || 'system';
                
                if (themeValue === 'dark' || (themeValue === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {
                console.warn('Error applying theme:', e);
              }
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          "pwa-safe-area",
          inter.variable
        )}
      >
        {/* Skip to main content para accesibilidad */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
        >
          Saltar al contenido principal
        </a>

        {/* Header principal */}
        <Header />

        {/* Contenido principal */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t bg-muted/50">
          <div className="container-responsive py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <h3 className="font-semibold">Prompt Maestro</h3>
                <p className="text-sm text-muted-foreground">
                  La mejor plataforma para aprender electricidad desde cero.
                </p>
                <div className="flex space-x-2">
                  <div className="w-6 h-6 bg-electric-500 rounded electric-glow" />
                  <div className="w-6 h-6 bg-voltage-500 rounded" />
                  <div className="w-6 h-6 bg-current-500 rounded" />
                  <div className="w-6 h-6 bg-resistance-500 rounded" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Aprender</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/niveles" className="hover:text-foreground transition-colors">Niveles</a></li>
                  <li><a href="/simulaciones" className="hover:text-foreground transition-colors">Simulaciones</a></li>
                  <li><a href="/calculadoras" className="hover:text-foreground transition-colors">Calculadoras</a></li>
                  <li><a href="/recursos" className="hover:text-foreground transition-colors">Recursos</a></li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Comunidad</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/foro" className="hover:text-foreground transition-colors">Foro</a></li>
                  <li><a href="/leaderboard" className="hover:text-foreground transition-colors">Clasificación</a></li>
                  <li><a href="/eventos" className="hover:text-foreground transition-colors">Eventos</a></li>
                  <li><a href="/blog" className="hover:text-foreground transition-colors">Blog</a></li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Soporte</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/ayuda" className="hover:text-foreground transition-colors">Ayuda</a></li>
                  <li><a href="/contacto" className="hover:text-foreground transition-colors">Contacto</a></li>
                  <li><a href="/privacidad" className="hover:text-foreground transition-colors">Privacidad</a></li>
                  <li><a href="/terminos" className="hover:text-foreground transition-colors">Términos</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © 2024 Prompt Maestro. Todos los derechos reservados.
              </p>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <span className="text-xs text-muted-foreground">
                  Hecho con ⚡ y mucho ❤️
                </span>
              </div>
            </div>
          </div>
        </footer>

        {/* Scripts para PWA */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Registrar Service Worker
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }

              // Detectar instalación de PWA
              let deferredPrompt;
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                // Mostrar botón de instalación personalizado
                const installButton = document.getElementById('install-button');
                if (installButton) {
                  installButton.style.display = 'block';
                }
              });

              // Manejar instalación
              window.addEventListener('appinstalled', (evt) => {
                console.log('PWA was installed');
                // Analytics o notificación de instalación exitosa
              });

              // Detectar modo standalone
              if (window.matchMedia('(display-mode: standalone)').matches) {
                document.body.classList.add('standalone');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

