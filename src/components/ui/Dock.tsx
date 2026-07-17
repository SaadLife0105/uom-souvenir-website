'use client';

// ponytail: trimmed from reactbits.dev/components/dock — kept only the
// mouse-proximity magnification + a lightweight hover tooltip. The tooltip
// is a sibling of the scaling element, not a child of it, so the icon's own
// scale/lift doesn't drag the tooltip's position around. Scaling itself
// uses a CSS transform on a fixed-size measurement wrapper rather than
// animating width/height: animating literal size reflows sibling flex
// items and creates a measure/resize feedback loop.
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type SpringOptions,
} from 'motion/react';
import { useRef, useState } from 'react';
import { whiteSmokeHex } from '@/constants/variables';

export function useDockMouseX() {
  return useMotionValue(Infinity);
}

type DockItemProps = {
  children: React.ReactNode;
  mouseX: MotionValue<number>;
  className?: string;
  label?: string; // shown as a tooltip above the item on hover/focus
  labelColor?: string; // tooltip text color — defaults to matching the icon's current color
  scaleAmount?: number; // peak scale multiplier — 1.22 = 22% bigger at the cursor
  lift?: number; // px risen at peak (upward)
  distance?: number; // px radius of influence around the cursor
  spring?: SpringOptions;
};

export function DockItem({
  children,
  mouseX,
  className = '',
  label,
  labelColor,
  scaleAmount = 1.22,
  lift = 6,
  distance = 70,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [showLabel, setShowLabel] = useState(false);

  const distanceFromMouse = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - rect.x - rect.width / 2;
  });

  const targetScale = useTransform(distanceFromMouse, [-distance, 0, distance], [1, scaleAmount, 1]);
  const targetY = useTransform(distanceFromMouse, [-distance, 0, distance], [0, -lift, 0]);

  const scale = useSpring(targetScale, spring);
  const y = useSpring(targetY, spring);

  return (
    <div
      className="relative inline-flex shrink-0 items-center justify-center"
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
      onFocus={() => setShowLabel(true)}
      onBlur={() => setShowLabel(false)}
    >
      {label && (
        <AnimatePresence>
          {showLabel && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-[10.5px] -translate-x-1/2 whitespace-nowrap rounded px-[5px] py-0.5 text-xs font-semibold"
              style={{ color: labelColor, backgroundColor: `color-mix(in srgb, ${whiteSmokeHex} 100%, transparent)` }}
              role="tooltip"
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <motion.div
        ref={ref}
        style={{ scale, y }}
        className={`inline-flex shrink-0 items-center justify-center ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
