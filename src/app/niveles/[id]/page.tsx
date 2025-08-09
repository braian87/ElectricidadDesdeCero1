'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Star, 
  Trophy,
  PlayCircle,
  CheckCircle,
  Lock,
  Lightbulb,
  Calculator,
  FileText,
  Video,
  Image as ImageIcon,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore, useUser } from '@/store';
import { electricityLevels } from '@/data/levels';
import { cn } from '@/lib/utils';
import type { Level, TheorySection, Example, InteractiveElement } from '@/types';

export default function NivelPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = parseInt(params.id as string);
  
  const [activeTab, setActiveTab] = React.useState<'teoria' | 'ejemplos' | 'interactivo' | 'quiz'>('teoria');
  const [completedSections, setCompletedSections] = React.useState<string[]>([]);
  
  const user = useUser();
  const { setCurrentLevel, completeLevel, addNotification } = useAppStore();
  
  const level = electricityLevels.find(l => l.id === levelId);
  const completedLevels = user?.progress.completedLevels || [];
  const isCompleted = completedLevels.includes(levelId);
  
  const nextLevel = electricityLevels.find(l => l.id === levelId + 1);
  const prevLevel = electricityLevels.find(l => l.id === levelId - 1);

  React.useEffect(() => {
    if (level) {
      setCurrentLevel(level);
    }
  }, [level, setCurrentLevel]);

  if (!level) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Nivel no encontrado</h2>
            <p className="text-muted-foreground mb-6">
              El nivel que buscas no existe o ha sido movido.
            </p>
            <Button onClick={() => router.push('/niveles')}>
              Volver a Niveles
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (level.isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center p-8 max-w-md">
          <CardContent>
            <Lock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-4">Nivel Bloqueado</h2>
            <p className="text-muted-foreground mb-6">
              Completa los niveles prerequisitos para desbloquear este contenido.
            </p>
            <div className="space-y-2 mb-6">
              <p className="text-sm font-medium">Prerequisitos:</p>
              {level.prerequisites.map(prereqId => {
                const prereqLevel = electricityLevels.find(l => l.id === prereqId);
                return (
                  <div key={prereqId} className="flex items-center justify-between text-sm">
                    <span>Nivel {prereqId}: {prereqLevel?.title}</span>
                    {completedLevels.includes(prereqId) ? (
                      <CheckCircle className="h-4 w-4 text-resistance-500" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                );
              })}
            </div>
            <Button onClick={() => router.push('/niveles')}>
              Volver a Niveles
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'resistance';
      case 'intermediate': return 'voltage';
      case 'advanced': return 'current';
      case 'expert': return 'electric';
      default: return 'default';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      case 'expert': return 'Experto';
      default: return difficulty;
    }
  };

  const handleSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  const handleStartQuiz = () => {
    router.push(`/niveles/${levelId}/quiz`);
  };

  const handleCompleteLevel = () => {
    if (user) {
      completeLevel(levelId, 100); // Asumimos 100% por ahora
      addNotification({
        type: 'success',
        title: '¡Nivel Completado!',
        message: `Has completado "${level.title}" y ganado ${level.xpReward} XP`,
        read: false
      });
    }
  };

  const tabs = [
    { id: 'teoria', label: 'Teoría', icon: BookOpen },
    { id: 'ejemplos', label: 'Ejemplos', icon: Lightbulb },
    { id: 'interactivo', label: 'Interactivo', icon: Calculator },
    { id: 'quiz', label: 'Evaluación', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-electric-50/30 via-background to-voltage-50/30">
      <div className="container-responsive py-8">
        {/* Header del nivel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => router.push('/niveles')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a Niveles
            </Button>
          </div>

          <Card variant={getDifficultyColor(level.difficulty) as any} className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Nivel {level.id}
                    </span>
                    <span className={cn(
                      "level-badge",
                      `level-badge-${level.difficulty}`
                    )}>
                      {getDifficultyLabel(level.difficulty)}
                    </span>
                    {isCompleted && (
                      <span className="level-badge level-badge-beginner">
                        ✓ Completado
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-3xl mb-3">{level.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {level.description}
                  </CardDescription>
                </div>
                <div className="text-right space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {level.estimatedTime} min
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4" />
                    {level.xpReward} XP
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navegación de tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contenido del Nivel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab(tab.id as any)}
                  >
                    <tab.icon className="mr-2 h-4 w-4" />
                    {tab.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Progreso del nivel */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Progreso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completado</span>
                      <span>{Math.round((completedSections.length / 4) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div 
                        className={cn(
                          "h-2 rounded-full transition-all duration-500",
                          `bg-${getDifficultyColor(level.difficulty)}-400`
                        )}
                        style={{ width: `${(completedSections.length / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {completedSections.length === 4 && !isCompleted && (
                    <Button 
                      variant="electric" 
                      className="w-full"
                      onClick={handleCompleteLevel}
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      Completar Nivel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contenido principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <Card className="min-h-[600px]">
              <CardContent className="p-8">
                {activeTab === 'teoria' && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-4">Teoría</h2>
                      <p className="text-muted-foreground">
                        {level.content.introduction}
                      </p>
                    </div>

                    {level.content.theory.map((section, index) => (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="space-y-4"
                      >
                        <h3 className="text-xl font-semibold">{section.title}</h3>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                          <p>{section.content}</p>
                        </div>

                        {section.formulas && section.formulas.length > 0 && (
                          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                            {section.formulas.map((formula) => (
                              <div key={formula.id} className="space-y-3">
                                <h4 className="font-semibold">{formula.name}</h4>
                                <div className="text-center">
                                  <div className="text-2xl font-mono bg-background rounded p-4 border">
                                    {formula.formula}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {formula.description}
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  {formula.variables.map((variable) => (
                                    <div key={variable.symbol} className="flex items-center gap-2">
                                      <span className="font-mono font-bold">
                                        {variable.symbol}
                                      </span>
                                      <span>=</span>
                                      <span>{variable.name}</span>
                                      {variable.unit && (
                                        <span className="text-muted-foreground">
                                          ({variable.unit})
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {section.images && section.images.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.images.map((image, imgIndex) => (
                              <div key={imgIndex} className="border rounded-lg p-4 text-center">
                                <ImageIcon className="h-32 w-32 mx-auto text-muted-foreground mb-4" />
                                <p className="text-sm text-muted-foreground">
                                  Imagen: {image}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        <Button
                          variant="outline"
                          onClick={() => handleSectionComplete(section.id)}
                          disabled={completedSections.includes(section.id)}
                          className="w-full mt-4"
                        >
                          {completedSections.includes(section.id) ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Sección Completada
                            </>
                          ) : (
                            <>
                              <PlayCircle className="mr-2 h-4 w-4" />
                              Marcar como Completada
                            </>
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'ejemplos' && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-4">Ejemplos Prácticos</h2>
                      <p className="text-muted-foreground">
                        Aprende con ejemplos paso a paso que te ayudarán a entender mejor los conceptos.
                      </p>
                    </div>

                    {level.content.examples.map((example, index) => (
                      <motion.div
                        key={example.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle>{example.title}</CardTitle>
                            <CardDescription>{example.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="bg-muted/50 rounded-lg p-4">
                              <h4 className="font-semibold mb-2">Problema:</h4>
                              <p>{example.problem}</p>
                            </div>

                            <div className="space-y-3">
                              <h4 className="font-semibold">Pasos de solución:</h4>
                              <ol className="list-decimal list-inside space-y-2">
                                {example.steps.map((step, stepIndex) => (
                                  <li key={stepIndex} className="text-sm">
                                    {step}
                                  </li>
                                ))}
                              </ol>
                            </div>

                            <div className="bg-resistance-50 dark:bg-resistance-950 rounded-lg p-4 border border-resistance-200 dark:border-resistance-800">
                              <h4 className="font-semibold mb-2 text-resistance-700 dark:text-resistance-300">
                                Solución:
                              </h4>
                              <p className="font-mono text-lg">{example.solution}</p>
                            </div>

                            <Button
                              variant="outline"
                              onClick={() => handleSectionComplete(example.id)}
                              disabled={completedSections.includes(example.id)}
                              className="w-full"
                            >
                              {completedSections.includes(example.id) ? (
                                <>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Ejemplo Completado
                                </>
                              ) : (
                                <>
                                  <PlayCircle className="mr-2 h-4 w-4" />
                                  Marcar como Completado
                                </>
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'interactivo' && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-4">Elementos Interactivos</h2>
                      <p className="text-muted-foreground">
                        Experimenta con simulaciones y herramientas interactivas para reforzar tu aprendizaje.
                      </p>
                    </div>

                    {level.content.interactiveElements.map((element, index) => (
                      <motion.div
                        key={element.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Calculator className="h-5 w-5" />
                              {element.title}
                            </CardTitle>
                            <CardDescription>{element.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-muted/50 rounded-lg p-8 text-center">
                              <Zap className="h-16 w-16 mx-auto text-electric-500 mb-4" />
                              <p className="text-muted-foreground mb-4">
                                Simulación interactiva: {element.component}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Esta simulación se cargará aquí en la versión completa
                              </p>
                            </div>

                            <Button
                              variant="outline"
                              onClick={() => handleSectionComplete(element.id)}
                              disabled={completedSections.includes(element.id)}
                              className="w-full mt-4"
                            >
                              {completedSections.includes(element.id) ? (
                                <>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Simulación Completada
                                </>
                              ) : (
                                <>
                                  <PlayCircle className="mr-2 h-4 w-4" />
                                  Completar Simulación
                                </>
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'quiz' && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-4">Evaluación</h2>
                      <p className="text-muted-foreground">
                        Pon a prueba tus conocimientos con nuestro quiz interactivo.
                      </p>
                    </div>

                    <Card className="text-center p-8">
                      <CardContent>
                        <Trophy className="h-16 w-16 mx-auto text-voltage-500 mb-6" />
                        <h3 className="text-xl font-bold mb-4">Quiz: {level.title}</h3>
                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                          <div>
                            <span className="font-medium">Preguntas:</span> {level.quiz.questions.length}
                          </div>
                          <div>
                            <span className="font-medium">Puntuación mínima:</span> {level.quiz.passingScore}%
                          </div>
                          {level.quiz.timeLimit && (
                            <div className="col-span-2">
                              <span className="font-medium">Tiempo límite:</span> {Math.floor(level.quiz.timeLimit / 60)} minutos
                            </div>
                          )}
                        </div>
                        <Button
                          variant="electric"
                          size="lg"
                          onClick={handleStartQuiz}
                          className="w-full max-w-md"
                        >
                          <PlayCircle className="mr-2 h-5 w-5" />
                          Comenzar Quiz
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Navegación entre niveles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-between items-center mt-8"
        >
          {prevLevel ? (
            <Button
              variant="outline"
              onClick={() => router.push(`/niveles/${prevLevel.id}`)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Nivel {prevLevel.id}: {prevLevel.title}
            </Button>
          ) : (
            <div />
          )}

          {nextLevel && !nextLevel.isLocked ? (
            <Button
              variant="electric"
              onClick={() => router.push(`/niveles/${nextLevel.id}`)}
              className="flex items-center gap-2"
            >
              Nivel {nextLevel.id}: {nextLevel.title}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : nextLevel && nextLevel.isLocked ? (
            <Button variant="outline" disabled className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Siguiente Nivel Bloqueado
            </Button>
          ) : (
            <div />
          )}
        </motion.div>
      </div>
    </div>
  );
}

