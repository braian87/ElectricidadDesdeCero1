'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Zap, 
  BookOpen, 
  Trophy, 
  Users, 
  Smartphone,
  Globe,
  ArrowRight,
  Play,
  Star,
  CheckCircle,
  Lightbulb,
  Calculator,
  Gamepad2,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore } from '@/store';

export default function HomePage() {
  const { addNotification } = useAppStore();

  const features = [
    {
      icon: BookOpen,
      title: "100 Niveles Progresivos",
      description: "Desde conceptos básicos hasta proyectos avanzados, aprende paso a paso.",
      color: "electric"
    },
    {
      icon: Gamepad2,
      title: "Gamificación Total",
      description: "Gana XP, desbloquea logros y compite en las clasificaciones.",
      color: "voltage"
    },
    {
      icon: Calculator,
      title: "Simulaciones Interactivas",
      description: "Experimenta con circuitos virtuales y calculadoras especializadas.",
      color: "current"
    },
    {
      icon: Users,
      title: "Comunidad Activa",
      description: "Conecta con otros estudiantes y expertos en nuestro foro.",
      color: "resistance"
    },
    {
      icon: Smartphone,
      title: "PWA Optimizada",
      description: "Funciona offline, se instala como app nativa en cualquier dispositivo.",
      color: "electric"
    },
    {
      icon: Shield,
      title: "Seguro y Privado",
      description: "Tus datos están protegidos con las mejores prácticas de seguridad.",
      color: "voltage"
    }
  ];

  const stats = [
    { number: "100+", label: "Niveles Educativos", icon: BookOpen },
    { number: "50+", label: "Simulaciones", icon: Zap },
    { number: "1000+", label: "Estudiantes Activos", icon: Users },
    { number: "95%", label: "Tasa de Satisfacción", icon: Star },
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Estudiante de Ingeniería",
      content: "Nunca había entendido la electricidad tan fácilmente. Las simulaciones son increíbles.",
      rating: 5,
      avatar: "/avatars/maria.jpg"
    },
    {
      name: "Carlos Rodríguez",
      role: "Técnico Electricista",
      content: "Perfecto para repasar conceptos y aprender nuevas técnicas. Lo recomiendo 100%.",
      rating: 5,
      avatar: "/avatars/carlos.jpg"
    },
    {
      name: "Ana Martín",
      role: "Profesora de Física",
      content: "Uso esta plataforma con mis estudiantes. Es didáctica y muy completa.",
      rating: 5,
      avatar: "/avatars/ana.jpg"
    }
  ];

  const handleGetStarted = () => {
    addNotification({
      type: 'info',
      title: '¡Bienvenido!',
      message: 'Comienza tu viaje en el mundo de la electricidad',
      read: false
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-electric-50 via-voltage-50 to-current-50 dark:from-electric-950 dark:via-voltage-950 dark:to-current-950">
        {/* Fondo animado */}
        <div className="absolute inset-0 circuit-board opacity-10" />
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-electric-400/20 rounded-full blur-xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-48 h-48 bg-voltage-400/20 rounded-full blur-xl"
            animate={{ 
              x: [0, -80, 0],
              y: [0, 30, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative container-responsive section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-electric-100 dark:bg-electric-900 px-4 py-2 rounded-full"
                >
                  <Zap className="w-4 h-4 text-electric-600 dark:text-electric-400" />
                  <span className="text-sm font-medium text-electric-700 dark:text-electric-300">
                    PWA Educativa de Nueva Generación
                  </span>
                </motion.div>

                <h1 className="heading-1 text-balance">
                  Domina la{' '}
                  <span className="electric-text">Electricidad</span>{' '}
                  desde Cero
                </h1>

                <p className="body-large text-muted-foreground text-balance max-w-2xl">
                  La plataforma educativa más avanzada para aprender electricidad de forma 
                  interactiva, gamificada y completamente en español. 100 niveles progresivos 
                  te llevarán desde los conceptos básicos hasta proyectos profesionales.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/niveles">
                  <Button 
                    variant="electric" 
                    size="xl" 
                    className="w-full sm:w-auto"
                    onClick={handleGetStarted}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Comenzar Ahora
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    Ver Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-voltage-400 text-voltage-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>4.9/5</strong> basado en 1,200+ reseñas
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  {/* Simulación de interfaz */}
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-current-500 rounded-full" />
                    <div className="w-3 h-3 bg-voltage-500 rounded-full" />
                    <div className="w-3 h-3 bg-resistance-500 rounded-full" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Nivel 5: Potencia Eléctrica</span>
                        <span className="text-xs bg-resistance-500 text-white px-2 py-1 rounded">
                          Completado
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <motion.div 
                          className="bg-resistance-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2, delay: 1 }}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Nivel 6: Circuitos Serie</span>
                        <span className="text-xs bg-electric-500 text-white px-2 py-1 rounded">
                          En Progreso
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <motion.div 
                          className="bg-electric-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '65%' }}
                          transition={{ duration: 2, delay: 1.5 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span>XP Total: 2,450</span>
                    <span>Racha: 7 días</span>
                  </div>
                </div>
              </div>

              {/* Elementos decorativos */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-electric-400 rounded-full electric-glow"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-voltage-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-muted/50">
        <div className="container-responsive">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-2"
              >
                <stat.icon className="w-8 h-8 mx-auto text-electric-500" />
                <div className="text-3xl font-bold electric-text">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="section-padding">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="heading-2">¿Por qué elegir Prompt Maestro?</h2>
            <p className="body-large text-muted-foreground max-w-3xl mx-auto">
              Combinamos la mejor tecnología educativa con metodologías probadas 
              para ofrecerte una experiencia de aprendizaje única y efectiva.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  variant={feature.color as any}
                  hover="lift"
                  className="h-full"
                >
                  <CardHeader>
                    <feature.icon className={`w-12 h-12 mb-4 text-${feature.color}-500`} />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="section-padding bg-muted/50">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="heading-2">Lo que dicen nuestros estudiantes</h2>
            <p className="body-large text-muted-foreground">
              Miles de personas ya han transformado su comprensión de la electricidad
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card hover="lift" className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-voltage-400 text-voltage-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-electric-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-electric-600" />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-r from-electric-600 to-current-600 text-white">
        <div className="container-responsive text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="heading-2 text-white">
                ¿Listo para comenzar tu viaje eléctrico?
              </h2>
              <p className="body-large text-electric-100 max-w-2xl mx-auto">
                Únete a miles de estudiantes que ya están dominando la electricidad 
                con nuestra plataforma. ¡Es gratis para empezar!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  <Zap className="mr-2 h-5 w-5" />
                  Crear Cuenta Gratis
                </Button>
              </Link>
              <Link href="/niveles">
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-electric-600">
                  Explorar Niveles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-electric-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Sin Anuncios</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Funciona Offline</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Importar User para el testimonial
function User({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

