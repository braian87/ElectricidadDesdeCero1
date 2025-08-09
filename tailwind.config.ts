import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Colores personalizados para la temática eléctrica
      colors: {
        // Paleta principal eléctrica
        electric: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        // Paleta de voltaje (amarillo-naranja)
        voltage: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        // Paleta de corriente (rojo-rosa)
        current: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          950: "#500724",
        },
        // Paleta de resistencia (verde)
        resistance: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        // Sistema de colores base
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      // Tipografía optimizada
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        display: [
          "Cal Sans",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      // Espaciado y dimensiones
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
        "144": "36rem",
      },
      // Animaciones personalizadas
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "fade-in-down": "fadeInDown 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "bounce-soft": "bounceSoft 2s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "electric-pulse": "electricPulse 2s ease-in-out infinite",
        "voltage-flow": "voltageFlow 3s linear infinite",
        "current-wave": "currentWave 1.5s ease-in-out infinite",
        "resistance-glow": "resistanceGlow 2s ease-in-out infinite alternate",
      },
      // Keyframes para animaciones
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        bounceSoft: {
          "0%, 20%, 53%, 80%, 100%": { transform: "translate3d(0,0,0)" },
          "40%, 43%": { transform: "translate3d(0, -8px, 0)" },
          "70%": { transform: "translate3d(0, -4px, 0)" },
          "90%": { transform: "translate3d(0, -2px, 0)" },
        },
        electricPulse: {
          "0%, 100%": { 
            boxShadow: "0 0 5px #0ea5e9, 0 0 10px #0ea5e9, 0 0 15px #0ea5e9",
            transform: "scale(1)",
          },
          "50%": { 
            boxShadow: "0 0 10px #0ea5e9, 0 0 20px #0ea5e9, 0 0 30px #0ea5e9",
            transform: "scale(1.05)",
          },
        },
        voltageFlow: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        currentWave: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(1.2)" },
        },
        resistanceGlow: {
          "0%": { 
            boxShadow: "0 0 5px #22c55e",
            filter: "brightness(1)",
          },
          "100%": { 
            boxShadow: "0 0 20px #22c55e, 0 0 30px #22c55e",
            filter: "brightness(1.2)",
          },
        },
      },
      // Sombras personalizadas
      boxShadow: {
        "electric": "0 0 20px rgba(14, 165, 233, 0.3)",
        "voltage": "0 0 20px rgba(245, 158, 11, 0.3)",
        "current": "0 0 20px rgba(236, 72, 153, 0.3)",
        "resistance": "0 0 20px rgba(34, 197, 94, 0.3)",
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "medium": "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "hard": "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)",
      },
      // Gradientes personalizados
      backgroundImage: {
        "electric-gradient": "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
        "voltage-gradient": "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        "current-gradient": "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
        "resistance-gradient": "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
        "hero-gradient": "linear-gradient(135deg, #0ea5e9 0%, #ec4899 50%, #f59e0b 100%)",
        "dark-gradient": "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      },
      // Bordes redondeados
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Plugin personalizado para utilidades eléctricas
    function({ addUtilities, theme }: any) {
      const newUtilities = {
        ".electric-glow": {
          boxShadow: theme("boxShadow.electric"),
          animation: theme("animation.electric-pulse"),
        },
        ".voltage-flow": {
          background: theme("backgroundImage.voltage-gradient"),
          animation: theme("animation.voltage-flow"),
        },
        ".current-wave": {
          animation: theme("animation.current-wave"),
        },
        ".resistance-glow": {
          animation: theme("animation.resistance-glow"),
        },
        ".glass-effect": {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".dark-glass-effect": {
          background: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;

