'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Star, 
  Trophy,
  Zap,
  ChevronDown,
  Grid3X3,
  List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, LevelCard } from '@/components/ui/card';
import { useAppStore, useUser, useUserStats } from '@/store';
import { electricityLevels, getLevelsByCategory, getLevelsByDifficulty } from '@/data/levels';
import { cn } from '@/lib/utils';
import type { ElectricalCategory, Level } from '@/types';

export default function NivelesPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<ElectricalCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<Level['difficulty'] | 'all'>('all');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = React.useState(false);

  const user = useUser();
  const userStats = useUserStats();
  const { setCurrentLevel, addNotification } = useAppStore();

  const completedLevels = user?.progress.completedLevels || [];

  // Filtrar niveles
  const filteredLevels = React.useMemo(() => {
    let levels = electricityLevels;

    // Filtrar por búsqueda
    if (searchQuery) {
      levels = levels.filter(level => 
        level.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        level.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      levels = getLevelsByCategory(selectedCategory);
    }

    // Filtrar por dificultad
    if (selectedDifficulty !== 'all') {
      levels = levels.filter(level => level.difficulty === selectedDifficulty);
    }

    return levels;
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const categories: { value: ElectricalCategory | 'all'; label: string; color: string }[] = [
    { value: 'all', label: 'Todas las Categorías', color: 'gray' },
    { value: 'basics', label: 'Conceptos Básicos', color: 'electric' },
    { value: 'current', label: 'Corriente Eléctrica', color: 'current' },
    { value: 'voltage', label: 'Voltaje', color: 'voltage' },
    { value: 'resistance', label: 'Resistencia', color: 'resistance' },
    { value: 'power', label: 'Potencia', color: 'electric' },
    { value: 'circuits', label: 'Circuitos', color: 'current' },
    { value: 'ac-dc', label: 'AC/DC', color: 'voltage' },
    { value: 'components', label: 'Componentes', color: 'resistance' },
    { value: 'measurements', label: 'Mediciones', color: 'electric' },
    { value: 'safety', label: 'Seguridad', color: 'current' },
    { value: 'applications', label: 'Aplicaciones', color: 'voltage' },
    { value: 'advanced', label: 'Avanzado', color: 'resistance' },
  ];

  const difficulties: { value: Level['difficulty'] | 'all'; label: string; color: string }[] = [
    { value: 'all', label: 'Todas las Dificultades', color: 'gray' },
    { value: 'beginner', label: 'Principiante', color: 'resistance' },
    { value: 'intermediate', label: 'Intermedio', color: 'voltage' },
    { value: 'advanced', label: 'Avanzado', color: 'current' },
    { value: 'expert', label: 'Experto', color: 'electric' },
  ];

  const handleLevelClick = (level: Level) => {
    if (level.isLocked) {
      addNotification({
        type: 'warning',
        title: 'Nivel Bloqueado',
        message: `Completa los niveles prerequisitos para desbloquear "${level.title}"`,
        read: false
      });
      return;
    }

    setCurrentLevel(level);
    // Navegar al nivel específico
    window.location.href = `/niveles/${level.id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-electric-50/30 via-background to-voltage-50/30">
      <div className="container-responsive py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="heading-1">
            Niveles de <span className="electric-text">Electricidad</span>
          </h1>
          <p className="body-large text-muted-foreground max-w-3xl mx-auto">
            100 niveles progresivos que te llevarán desde los conceptos más básicos 
            hasta proyectos profesionales de electricidad. Cada nivel incluye teoría, 
            ejemplos prácticos y evaluaciones interactivas.
          </p>
        </motion.div>

        {/* Estadísticas del usuario */}
        {user && userStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-electric-500/10 to-voltage-500/10 border-electric-200">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-electric-600">
                      {userStats.completedLevels}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Niveles Completados
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-voltage-600">
                      {Math.round(userStats.completionPercentage)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Progreso Total
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-current-600">
                      {userStats.totalXP.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      XP Total
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-resistance-600">
                      {userStats.streak}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Días de Racha
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Controles de búsqueda y filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Búsqueda */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar niveles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-electric-400"
              />
            </div>

            {/* Botones de control */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtros
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  showFilters && "rotate-180"
                )} />
              </Button>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Panel de filtros */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50"
            >
              <div>
                <label className="block text-sm font-medium mb-2">Categoría</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ElectricalCategory | 'all')}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Dificultad</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as Level['difficulty'] | 'all')}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Resultados */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {filteredLevels.length} nivel{filteredLevels.length !== 1 ? 'es' : ''} encontrado{filteredLevels.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredLevels.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No se encontraron niveles</h3>
                <p className="text-muted-foreground">
                  Intenta ajustar tus filtros de búsqueda
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className={cn(
              viewMode === 'grid' 
                ? "levels-grid" 
                : "space-y-4"
            )}>
              {filteredLevels.map((level, index) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <LevelCard
                    level={level}
                    isCompleted={completedLevels.includes(level.id)}
                    onClick={() => handleLevelClick(level)}
                    className={cn(
                      viewMode === 'list' && "flex-row items-center"
                    )}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA para usuarios no registrados */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-electric-600 to-current-600 text-white border-0">
              <CardContent className="text-center py-12">
                <Zap className="h-16 w-16 mx-auto mb-6 text-white" />
                <h3 className="text-2xl font-bold mb-4">
                  ¡Regístrate para Guardar tu Progreso!
                </h3>
                <p className="text-electric-100 mb-6 max-w-2xl mx-auto">
                  Crea una cuenta gratuita para guardar tu progreso, ganar XP, 
                  desbloquear logros y competir en las clasificaciones.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="secondary" size="lg">
                    <Trophy className="mr-2 h-5 w-5" />
                    Crear Cuenta Gratis
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-electric-600">
                    Iniciar Sesión
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

