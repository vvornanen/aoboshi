import { FunctionComponent, ReactElement, useState } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type TooltipContentProps } from "@radix-ui/react-tooltip";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as styles from "./Tooltip.css";
import * as transitions from "~theme/transitions";

export type TooltipProps = TooltipContentProps & {
  title: string;
  children?: ReactElement;
  defaultOpen?: boolean;
};

export const Tooltip: FunctionComponent<TooltipProps> = ({
  title,
  children,
  defaultOpen = false,
  side = "bottom",
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [initial, setInitial] = useState(true);
  const [open, setOpen] = useState(defaultOpen);

  const initialScale = shouldReduceMotion ? 1 : 0.5;
  const initiallyOpen = defaultOpen && initial;

  const transition = shouldReduceMotion
    ? transitions.none
    : transitions.tooltip;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    setInitial(false);
  };

  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root open={open} onOpenChange={handleOpenChange}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <AnimatePresence>
          {open && (
            <TooltipPrimitive.Portal forceMount>
              <TooltipPrimitive.Content
                forceMount
                asChild
                side={side}
                sideOffset={4}
                {...props}
              >
                <motion.div
                  key="tooltip"
                  className={styles.tooltip}
                  initial={
                    initiallyOpen ? false : { opacity: 0, scale: initialScale }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: initialScale }}
                  transition={transition}
                >
                  {title}
                  <TooltipPrimitive.Arrow className={styles.tooltipArrow} />
                </motion.div>
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          )}
        </AnimatePresence>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
