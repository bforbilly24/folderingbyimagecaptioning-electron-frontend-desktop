import React, { ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'motion/react';
import { cn } from '@/lib/cn';

interface MobileNavProps {
  children: ReactNode;
  className?: string;
}

interface MobileNavIconProps {
  children: ReactNode;
  className?: string;
  iconSize?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
}

const DEFAULT_SIZE = 48;
const DEFAULT_MAGNIFICATION = 64;
const DEFAULT_DISTANCE = 120;

export function MobileNav({ children, className }: MobileNavProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "supports-backdrop-blur:bg-white/90 supports-backdrop-blur:dark:bg-black/90 mx-auto flex h-[70px] items-center justify-center gap-4 rounded-xl border border-gray-200 p-4 backdrop-blur-md shadow-lg",
        className
      )}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<MobileNavIconProps>(child)) {
          return React.cloneElement(child, { 
            mouseX, 
            key: child.key || index 
          });
        }
        return child;
      })}
    </motion.div>
  );
}

export function MobileNavIcon({ 
  children, 
  className,
  iconSize = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX: externalMouseX
}: MobileNavIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const defaultMouseX = useMotionValue(Infinity);
  const mouseX = externalMouseX || defaultMouseX;
  
  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [iconSize, magnification, iconSize],
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize }}
      className={cn(
        "relative flex items-center justify-center rounded-md transition-all duration-300 cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
