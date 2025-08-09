import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-border",
        electric: "border-electric-200 bg-electric-50/50 dark:border-electric-800 dark:bg-electric-950/50",
        voltage: "border-voltage-200 bg-voltage-50/50 dark:border-voltage-800 dark:bg-voltage-950/50",
        current: "border-current-200 bg-current-50/50 dark:border-current-800 dark:bg-current-950/50",
        resistance: "border-resistance-200 bg-resistance-50/50 dark:border-resistance-800 dark:bg-resistance-950/50",
        glass: "glass-effect border-white/20",
        darkGlass: "dark-glass-effect border-white/10",
      },
      size: {
        default: "",
        sm: "p-4",
        lg: "p-8",
      },
      hover: {
        none: "",
        lift: "hover:transform hover:-translate-y-1 hover:shadow-lg",
        glow: "hover:shadow-electric",
        scale: "hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hover: "none",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, hover, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, hover, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Componente especializado para niveles
export interface LevelCardProps extends CardProps {
  level: {
    id: number;
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: string;
    estimatedTime: number;
    xpReward: number;
    isLocked: boolean;
    completionRate: number;
  };
  isCompleted?: boolean;
  onClick?: () => void;
}

const LevelCard = React.forwardRef<HTMLDivElement, LevelCardProps>(
  ({ level, isCompleted, onClick, className, ...props }, ref) => {
    const getDifficultyColor = (
      difficulty: string
    ): 'default' | 'electric' | 'voltage' | 'current' | 'resistance' | 'glass' | 'darkGlass' | null | undefined => {
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

    return (
      <Card
        ref={ref}
  variant={getDifficultyColor(level.difficulty)}
        hover={level.isLocked ? "none" : "lift"}
        className={cn(
          "cursor-pointer transition-all duration-300",
          level.isLocked && "opacity-50 cursor-not-allowed",
          isCompleted && "ring-2 ring-resistance-400",
          className
        )}
        onClick={level.isLocked ? undefined : onClick}
        {...props}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-1">
                Nivel {level.id}: {level.title}
              </CardTitle>
              <CardDescription className="text-sm">
                {level.description}
              </CardDescription>
            </div>
            <div className="flex flex-col items-end space-y-1">
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
              {level.isLocked && (
                <span className="level-badge bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  🔒 Bloqueado
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <span>⏱️ {level.estimatedTime} min</span>
            <span>⭐ {level.xpReward} XP</span>
          </div>
          
          {level.completionRate > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Progreso</span>
                <span>{Math.round(level.completionRate)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div 
                  className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    level.difficulty === 'beginner' && "bg-resistance-400",
                    level.difficulty === 'intermediate' && "bg-voltage-400",
                    level.difficulty === 'advanced' && "bg-current-400",
                    level.difficulty === 'expert' && "bg-electric-400"
                  )}
                  style={{ width: `${level.completionRate}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);
LevelCard.displayName = "LevelCard";

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  LevelCard,
  cardVariants 
};

