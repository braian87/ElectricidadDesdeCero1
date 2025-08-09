// Tipos principales para la aplicación educativa de electricidad

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
  progress: UserProgress;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'es' | 'en' | 'fr' | 'pt';
  notifications: {
    email: boolean;
    push: boolean;
    reminders: boolean;
  };
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
}

export interface UserProgress {
  currentLevel: number;
  completedLevels: number[];
  totalXP: number;
  streak: number;
  lastActivity: Date;
  achievements: Achievement[];
  quizScores: QuizScore[];
}

export interface Level {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: ElectricalCategory;
  prerequisites: number[];
  estimatedTime: number; // en minutos
  xpReward: number;
  content: LevelContent;
  quiz: Quiz;
  isLocked: boolean;
  completionRate: number;
}

export interface LevelContent {
  introduction: string;
  theory: TheorySection[];
  examples: Example[];
  interactiveElements: InteractiveElement[];
  summary: string;
  resources: Resource[];
}

export interface TheorySection {
  id: string;
  title: string;
  content: string;
  images?: string[];
  videos?: string[];
  diagrams?: Diagram[];
  formulas?: Formula[];
}

export interface Example {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  steps: string[];
  visualization?: string;
}

export interface InteractiveElement {
  id: string;
  type: 'simulation' | 'calculator' | 'diagram' | 'game' | 'animation';
  title: string;
  description: string;
  component: string; // Nombre del componente React
  props?: Record<string, any>;
}

export interface Diagram {
  id: string;
  title: string;
  description: string;
  svgPath: string;
  interactiveAreas?: InteractiveArea[];
}

export interface InteractiveArea {
  id: string;
  coordinates: { x: number; y: number; width: number; height: number };
  tooltip: string;
  action?: () => void;
}

export interface Formula {
  id: string;
  name: string;
  formula: string;
  variables: Variable[];
  description: string;
  units?: string;
}

export interface Variable {
  symbol: string;
  name: string;
  unit?: string;
  description: string;
}

export interface Quiz {
  id: string;
  levelId: number;
  questions: Question[];
  passingScore: number;
  timeLimit?: number; // en segundos
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'calculation' | 'diagram';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface QuizScore {
  quizId: string;
  levelId: number;
  score: number;
  totalPoints: number;
  timeSpent: number;
  completedAt: Date;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: string;
  userAnswer: string | number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progress' | 'knowledge' | 'streak' | 'special';
  requirement: string;
  xpReward: number;
  unlockedAt?: Date;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'article' | 'tool' | 'external';
  url: string;
  description: string;
  tags: string[];
}

export type ElectricalCategory = 
  | 'basics'           // Conceptos básicos
  | 'current'          // Corriente eléctrica
  | 'voltage'          // Voltaje
  | 'resistance'       // Resistencia
  | 'power'            // Potencia
  | 'circuits'         // Circuitos
  | 'ac-dc'            // Corriente alterna y continua
  | 'components'       // Componentes eléctricos
  | 'measurements'     // Mediciones
  | 'safety'           // Seguridad eléctrica
  | 'applications'     // Aplicaciones prácticas
  | 'advanced';        // Temas avanzados

export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
  requiresAuth?: boolean;
  roles?: User['role'][];
}

export interface AppState {
  user: User | null;
  currentLevel: Level | null;
  levels: Level[];
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Tipos para simulaciones interactivas
export interface CircuitElement {
  id: string;
  type: 'resistor' | 'capacitor' | 'inductor' | 'battery' | 'switch' | 'led' | 'wire';
  position: { x: number; y: number };
  rotation: number;
  value?: number;
  unit?: string;
  connections: string[];
  properties: Record<string, any>;
}

export interface Circuit {
  id: string;
  name: string;
  description: string;
  elements: CircuitElement[];
  connections: Connection[];
  analysis?: CircuitAnalysis;
}

export interface Connection {
  id: string;
  from: { elementId: string; terminal: string };
  to: { elementId: string; terminal: string };
  current?: number;
  voltage?: number;
}

export interface CircuitAnalysis {
  totalResistance: number;
  totalCurrent: number;
  totalPower: number;
  voltageDistribution: Record<string, number>;
  currentDistribution: Record<string, number>;
  powerDistribution: Record<string, number>;
}

// Tipos para el sistema de gamificación
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: string;
  requirements: BadgeRequirement[];
}

export interface BadgeRequirement {
  type: 'level_complete' | 'quiz_score' | 'streak' | 'time_spent' | 'special';
  value: number;
  description: string;
}

export interface Leaderboard {
  id: string;
  type: 'global' | 'weekly' | 'monthly' | 'friends';
  entries: LeaderboardEntry[];
  lastUpdated: Date;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  score: number;
  change: number; // Cambio de posición
}

// Tipos para el sistema de comentarios y foro
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  replies: ForumReply[];
  isPinned: boolean;
  isLocked: boolean;
}

export interface ForumReply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  parentReplyId?: string;
}

// Tipos para analytics y métricas
export interface AnalyticsEvent {
  id: string;
  userId: string;
  event: string;
  properties: Record<string, any>;
  timestamp: Date;
  sessionId: string;
}

export interface UserAnalytics {
  userId: string;
  totalTimeSpent: number;
  levelsCompleted: number;
  averageQuizScore: number;
  streakDays: number;
  favoriteCategory: ElectricalCategory;
  deviceInfo: {
    type: 'desktop' | 'tablet' | 'mobile';
    os: string;
    browser: string;
  };
  lastActivity: Date;
}

// Tipos para configuración de la aplicación
export interface AppConfig {
  version: string;
  features: {
    forum: boolean;
    leaderboard: boolean;
    achievements: boolean;
    darkMode: boolean;
    offline: boolean;
    notifications: boolean;
  };
  limits: {
    maxLevelsPerDay: number;
    maxQuizAttempts: number;
    maxForumPosts: number;
  };
  urls: {
    api: string;
    cdn: string;
    support: string;
    privacy: string;
    terms: string;
  };
}

// Tipos para PWA
export interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface ServiceWorkerMessage {
  type: 'SKIP_WAITING' | 'CACHE_UPDATED' | 'OFFLINE_READY';
  payload?: any;
}

// Tipos de utilidad
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
  timestamp: Date;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}>;

// Tipos para formularios
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => boolean | string;
  };
  options?: { value: string; label: string }[];
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Exportar todos los tipos como un namespace para facilitar el uso
export namespace ElectricityApp {
  export type {
    User,
    UserPreferences,
    UserProgress,
    Level,
    LevelContent,
    Quiz,
    Question,
    Achievement,
    Circuit,
    CircuitElement,
    AppState,
    Notification,
    Badge,
    ForumPost,
    AnalyticsEvent,
    AppConfig,
    PWAInstallPrompt,
    LoadingState,
    ApiResponse,
    PaginatedResponse,
    FormField,
    FormState,
  };
}

