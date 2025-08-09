'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Zap, 
  User, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppStore, useUser, useTheme, useNotifications } from '@/store';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  
  const user = useUser();
  const theme = useTheme();
  const notifications = useNotifications();
  const { setTheme, toggleSidebar } = useAppStore();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setIsUserMenuOpen(false);
  };

  const navigationItems = [
    { href: '/', label: 'Inicio' },
    { href: '/niveles', label: 'Niveles' },
    { href: '/dashboard', label: 'Dashboard', requiresAuth: true },
    { href: '/foro', label: 'Foro' },
    { href: '/recursos', label: 'Recursos' },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container-responsive">
        <div className="flex h-16 items-center justify-between">
          {/* Logo y título */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="relative">
                <Zap className="h-8 w-8 text-electric-500 electric-glow" />
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="h-8 w-8 text-voltage-400 opacity-30" />
                </motion.div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold electric-text">
                  Prompt Maestro
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">
                  Electricidad desde Cero
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => {
              if (item.requiresAuth && !user) return null;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:text-electric-500"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Acciones del usuario */}
          <div className="flex items-center space-x-2">
            {/* Búsqueda */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>

            {/* Notificaciones */}
            {user && (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleNotifications}
                  className="relative"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-5 w-5 bg-current-500 text-white text-xs rounded-full flex items-center justify-center"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </motion.span>
                  )}
                  <span className="sr-only">Notificaciones</span>
                </Button>

                {/* Panel de notificaciones */}
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-12 w-80 z-50"
                  >
                    <Card className="shadow-lg border">
                      <div className="p-4 border-b">
                        <h3 className="font-semibold">Notificaciones</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-muted-foreground">
                            No hay notificaciones
                          </div>
                        ) : (
                          notifications.slice(0, 5).map((notification) => (
                            <div
                              key={notification.id}
                              className={cn(
                                "p-4 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer",
                                !notification.read && "bg-electric-50/50 dark:bg-electric-950/50"
                              )}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={cn(
                                  "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                                  notification.type === 'success' && "bg-resistance-500",
                                  notification.type === 'error' && "bg-current-500",
                                  notification.type === 'warning' && "bg-voltage-500",
                                  notification.type === 'info' && "bg-electric-500"
                                )} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium">{notification.title}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(notification.timestamp).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      {notifications.length > 5 && (
                        <div className="p-4 border-t">
                          <Link 
                            href="/dashboard/notifications"
                            className="text-sm text-electric-500 hover:text-electric-600"
                          >
                            Ver todas las notificaciones
                          </Link>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                )}
              </div>
            )}

            {/* Menú de usuario */}
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleUserMenu}
                  className="relative"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-6 w-6 rounded-full"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="sr-only">Menú de usuario</span>
                </Button>

                {/* Dropdown del usuario */}
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-12 w-56 z-50"
                  >
                    <Card className="shadow-lg border">
                      <div className="p-4 border-b">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      
                      <div className="p-2">
                        <Link href="/dashboard">
                          <Button variant="ghost" className="w-full justify-start">
                            <User className="mr-2 h-4 w-4" />
                            Dashboard
                          </Button>
                        </Link>
                        
                        <Link href="/dashboard/settings">
                          <Button variant="ghost" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" />
                            Configuración
                          </Button>
                        </Link>

                        {/* Selector de tema */}
                        <div className="border-t mt-2 pt-2">
                          <p className="px-2 py-1 text-xs font-medium text-muted-foreground">
                            Tema
                          </p>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => handleThemeChange('light')}
                          >
                            <Sun className="mr-2 h-4 w-4" />
                            Claro
                            {theme === 'light' && <span className="ml-auto">✓</span>}
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => handleThemeChange('dark')}
                          >
                            <Moon className="mr-2 h-4 w-4" />
                            Oscuro
                            {theme === 'dark' && <span className="ml-auto">✓</span>}
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => handleThemeChange('system')}
                          >
                            <Monitor className="mr-2 h-4 w-4" />
                            Sistema
                            {theme === 'system' && <span className="ml-auto">✓</span>}
                          </Button>
                        </div>

                        <div className="border-t mt-2 pt-2">
                          <Button variant="ghost" className="w-full justify-start text-current-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            Cerrar Sesión
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="electric" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}

            {/* Botón de menú móvil */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
              <span className="sr-only">Menú</span>
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <nav className="flex flex-col space-y-2 p-4">
              {navigationItems.map((item) => {
                if (item.requiresAuth && !user) return null;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              {!user && (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link href="/auth/login">
                    <Button variant="ghost" className="w-full">
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button variant="electric" className="w-full">
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </div>

      {/* Overlay para cerrar menús */}
      {(isUserMenuOpen || isNotificationsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsNotificationsOpen(false);
          }}
        />
      )}
    </header>
  );
}

