import { ComponentPropsWithoutRef, FunctionComponent, useMemo } from "react";
import { clsx } from "clsx";
import { hash } from "@vvornanen/aoboshi-core";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  badgeAngle,
  completedBadge,
  completedBadgeRoot,
} from "./CompletedBadge.css";

type CompletedBadgeProps = ComponentPropsWithoutRef<"div"> & {
  /**
   * Used for calculating a random angle.
   *
   * Guarantees that the same value always produces the same angle.
   * This is especially useful for visual snapshot testing.
   */
  seed?: string;

  /** If false, removes the badge from the DOM */
  show?: boolean;
};

export const CompletedBadge: FunctionComponent<CompletedBadgeProps> = ({
  className,
  seed,
  show = true,
  children,
  ...props
}) => {
  const maxAngle = 20;
  const angle = useMemo(() => newAngle(maxAngle, seed), [seed]);

  return (
    <div className={clsx(completedBadgeRoot, className)} {...props}>
      {children}
      {show && (
        <div
          className={completedBadge}
          style={assignInlineVars({ [badgeAngle]: `${angle}deg` })}
        >
          💮
        </div>
      )}
    </div>
  );
};

/**
 * Returns a value between -max and max.
 *
 * @param max
 * @param seed
 */
const newAngle = (max: number, seed?: string) =>
  Math.round((seed ? hash(seed, max * 2) : Math.random() * max * 2) - max);
