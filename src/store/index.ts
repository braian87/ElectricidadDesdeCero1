import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { 
  AppState, 
  User, 
  Level, 
  Notification, 
  UserProgress,
  Achievement,
  QuizScore 
} from '@/types';

// Store principal de la aplicación
interface AppStore extends AppState {
  // Acciones de usuario
  setUser: (user: User | null) => void;
  updateUserProgress: (progress: Partial<UserProgress>) => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
  
  // Acciones de niveles
  setLevels: (levels: Level[]) => void;
  setCurrentLevel: (level: Level | null) => void;
  completeLevel: (levelId: number, score: number) => void;
  unlockLevel: (levelId: number) => void;
  
  // Acciones de UI
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  // Acciones de notificaciones
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  
  // Acciones de estado
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Acciones de logros
  unlockAchievement: (achievement: Achievement) => void;
  
  // Acciones de quiz
  saveQuizScore: (score: QuizScore) => void;
  
  // Utilidades
  reset: () => void;
}

const initialState: AppState = {
  user: null,
  currentLevel: null,
  levels: [],
  isLoading: false,
  error: null,
  theme: 'system',
  sidebarOpen: false,
  notifications: [],
};

export const useAppStore = create<AppStore>()(
  persist(
    immer((set, get) => ({
      ...initialState,
      
      // Implementación de acciones de usuario
      setUser: (user) => 
        set((state) => {
          state.user = user;
        }),
        
      updateUserProgress: (progress) =>
        set((state) => {
          if (state.user) {
            state.user.progress = { ...state.user.progress, ...progress };
          }
        }),
        
      updateUserPreferences: (preferences) =>
        set((state) => {
          if (state.user) {
            state.user.preferences = { ...state.user.preferences, ...preferences };
          }
        }),
      
      // Implementación de acciones de niveles
      setLevels: (levels) =>
        set((state) => {
          state.levels = levels;
        }),
        
      setCurrentLevel: (level) =>
        set((state) => {
          state.currentLevel = level;
        }),
        
      completeLevel: (levelId, score) =>
        set((state) => {
          if (state.user) {
            const completedLevels = state.user.progress.completedLevels;
            if (!completedLevels.includes(levelId)) {
              state.user.progress.completedLevels.push(levelId);
            }
            
            // Actualizar nivel actual si es mayor
            if (levelId > state.user.progress.currentLevel) {
              state.user.progress.currentLevel = levelId;
            }
            
            // Agregar XP basado en el score
            const level = state.levels.find(l => l.id === levelId);
            if (level) {
              const xpGained = Math.floor((score / 100) * level.xpReward);
              state.user.progress.totalXP += xpGained;
            }
            
            // Actualizar última actividad
            state.user.progress.lastActivity = new Date();
            
            // Desbloquear siguiente nivel
            const nextLevel = state.levels.find(l => l.id === levelId + 1);
            if (nextLevel) {
              nextLevel.isLocked = false;
            }
          }
        }),
        
      unlockLevel: (levelId) =>
        set((state) => {
          const level = state.levels.find(l => l.id === levelId);
          if (level) {
            level.isLocked = false;
          }
        }),
      
      // Implementación de acciones de UI
      setTheme: (theme) =>
        set((state) => {
          state.theme = theme;
          // Aplicar tema al documento
          if (typeof window !== 'undefined') {
            const root = window.document.documentElement;
            root.classList.remove('light', 'dark');
            
            if (theme === 'system') {
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? 'dark' 
                : 'light';
              root.classList.add(systemTheme);
            } else {
              root.classList.add(theme);
            }
          }
        }),
        
      toggleSidebar: () =>
        set((state) => {
          state.sidebarOpen = !state.sidebarOpen;
        }),
        
      setSidebarOpen: (open) =>
        set((state) => {
          state.sidebarOpen = open;
        }),
      
      // Implementación de acciones de notificaciones
      addNotification: (notification) =>
        set((state) => {
          const newNotification: Notification = {
            ...notification,
            id: crypto.randomUUID(),
            timestamp: new Date(),
            read: false,
          };
          state.notifications.unshift(newNotification);
          
          // Limitar a 10 notificaciones máximo
          if (state.notifications.length > 10) {
            state.notifications = state.notifications.slice(0, 10);
          }
        }),
        
      removeNotification: (id) =>
        set((state) => {
          state.notifications = state.notifications.filter(n => n.id !== id);
        }),
        
      markNotificationAsRead: (id) =>
        set((state) => {
          const notification = state.notifications.find(n => n.id === id);
          if (notification) {
            notification.read = true;
          }
        }),
        
      clearAllNotifications: () =>
        set((state) => {
          state.notifications = [];
        }),
      
      // Implementación de acciones de estado
      setLoading: (loading) =>
        set((state) => {
          state.isLoading = loading;
        }),
        
      setError: (error) =>
        set((state) => {
          state.error = error;
        }),
      
      // Implementación de acciones de logros
      unlockAchievement: (achievement) =>
        set((state) => {
          if (state.user) {
            const existingAchievement = state.user.progress.achievements.find(
              a => a.id === achievement.id
            );
            
            if (!existingAchievement) {
              const unlockedAchievement = {
                ...achievement,
                unlockedAt: new Date(),
              };
              
              state.user.progress.achievements.push(unlockedAchievement);
              state.user.progress.totalXP += achievement.xpReward;
              
              // Mostrar notificación de logro desbloqueado
              const notification: Omit<Notification, 'id' | 'timestamp'> = {
                type: 'success',
                title: '¡Logro Desbloqueado!',
                message: `Has desbloqueado: ${achievement.title}`,
                read: false,
                action: {
                  label: 'Ver Logros',
                  onClick: () => {
                    // Navegar a la página de logros
                    if (typeof window !== 'undefined') {
                      window.location.href = '/dashboard/achievements';
                    }
                  },
                },
              };
              
              get().addNotification(notification);
            }
          }
        }),
      
      // Implementación de acciones de quiz
      saveQuizScore: (score) =>
        set((state) => {
          if (state.user) {
            state.user.progress.quizScores.push(score);
            
            // Actualizar racha si es necesario
            const today = new Date();
            const lastActivity = new Date(state.user.progress.lastActivity);
            const diffDays = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
              // Continuar racha
              state.user.progress.streak += 1;
            } else if (diffDays > 1) {
              // Reiniciar racha
              state.user.progress.streak = 1;
            }
            // Si diffDays === 0, mantener la racha actual
            
            state.user.progress.lastActivity = today;
          }
        }),
      
      // Utilidades
      reset: () =>
        set((state) => {
          Object.assign(state, initialState);
        }),
    })),
    {
      name: 'prompt-maestro-electricidad-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        theme: state.theme,
        // No persistir niveles, notificaciones, loading, error
      }),
    }
  )
);

// Store para configuración de la aplicación
interface ConfigStore {
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
  updateFeature: (feature: keyof ConfigStore['features'], enabled: boolean) => void;
  updateLimit: (limit: keyof ConfigStore['limits'], value: number) => void;
}

export const useConfigStore = create<ConfigStore>((set) => ({
  version: '1.0.0',
  features: {
    forum: true,
    leaderboard: true,
    achievements: true,
    darkMode: true,
    offline: true,
    notifications: true,
  },
  limits: {
    maxLevelsPerDay: 10,
    maxQuizAttempts: 3,
    maxForumPosts: 5,
  },
  updateFeature: (feature, enabled) =>
    set((state) => ({
      features: { ...state.features, [feature]: enabled },
    })),
  updateLimit: (limit, value) =>
    set((state) => ({
      limits: { ...state.limits, [limit]: value },
    })),
}));

// Store para el estado de la PWA
interface PWAStore {
  isInstalled: boolean;
  isOnline: boolean;
  updateAvailable: boolean;
  installPrompt: unknown;
  setInstalled: (installed: boolean) => void;
  setOnline: (online: boolean) => void;
  setUpdateAvailable: (available: boolean) => void;
  setInstallPrompt: (prompt: unknown) => void;
  install: () => Promise<void>;
  update: () => void;
}

export const usePWAStore = create<PWAStore>((set, get) => ({
  isInstalled: false,
  isOnline: true,
  updateAvailable: false,
  installPrompt: null,
  
  setInstalled: (installed) => set({ isInstalled: installed }),
  setOnline: (online) => set({ isOnline: online }),
  setUpdateAvailable: (available) => set({ updateAvailable: available }),
  setInstallPrompt: (prompt) => set({ installPrompt: prompt }),
  
  install: async () => {
    const { installPrompt } = get();
    if (installPrompt) {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        set({ isInstalled: true, installPrompt: null });
        useAppStore.getState().addNotification({
          type: 'success',
          title: '¡Aplicación Instalada!',
          message: 'Prompt Maestro se ha instalado correctamente en tu dispositivo.',
          read: false,
        });
      }
    }
  },
  
  update: () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration?.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      });
    }
  },
}));

// Hooks personalizados para facilitar el uso
export const useUser = () => useAppStore((state) => state.user);
export const useUserProgress = () => useAppStore((state) => state.user?.progress);
export const useLevels = () => useAppStore((state) => state.levels);
export const useCurrentLevel = () => useAppStore((state) => state.currentLevel);
export const useTheme = () => useAppStore((state) => state.theme);
export const useNotifications = () => useAppStore((state) => state.notifications);
export const useLoading = () => useAppStore((state) => state.isLoading);
export const useError = () => useAppStore((state) => state.error);

// Selectores optimizados
export const useUnreadNotifications = () => 
  useAppStore((state) => state.notifications.filter(n => !n.read));

export const useCompletedLevels = () =>
  useAppStore((state) => state.user?.progress.completedLevels || []);

export const useAvailableLevels = () =>
  useAppStore((state) => state.levels.filter(level => !level.isLocked));

export const useUserStats = () =>
  useAppStore((state) => {
    if (!state.user) return null;
    
    const { progress } = state.user;
    const totalLevels = state.levels.length;
    const completionPercentage = totalLevels > 0 
      ? (progress.completedLevels.length / totalLevels) * 100 
      : 0;
    
    return {
      totalXP: progress.totalXP,
      completedLevels: progress.completedLevels.length,
      totalLevels,
      completionPercentage,
      streak: progress.streak,
      achievements: progress.achievements.length,
      averageQuizScore: progress.quizScores.length > 0
        ? progress.quizScores.reduce((acc, score) => acc + (score.score / score.totalPoints) * 100, 0) / progress.quizScores.length
        : 0,
    };
  });

// Inicialización del store
if (typeof window !== 'undefined') {
  // Detectar tema del sistema
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleThemeChange = () => {
    const { theme, setTheme } = useAppStore.getState();
    if (theme === 'system') {
      setTheme('system'); // Esto aplicará el tema correcto
    }
  };
  
  mediaQuery.addEventListener('change', handleThemeChange);
  
  // Aplicar tema inicial
  handleThemeChange();
  
  // Detectar estado online/offline
  const handleOnlineStatus = () => {
    usePWAStore.getState().setOnline(navigator.onLine);
  };
  
  window.addEventListener('online', handleOnlineStatus);
  window.addEventListener('offline', handleOnlineStatus);
  
  // Detectar si la app está instalada
  window.addEventListener('appinstalled', () => {
    usePWAStore.getState().setInstalled(true);
  });
  
  // Capturar evento de instalación
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    usePWAStore.getState().setInstallPrompt(e);
  });
}

