import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import * as styles from "./Stroke.css";

type StrokeBackgroundProps = ComponentPropsWithoutRef<"div">;

/**
 * Wrap character strokes with this component to display a background grid
 * behind them.
 *
 * Subcomponent of {@link CharacterInfoCard}.
 */
export const StrokeBackground: FunctionComponent<StrokeBackgroundProps> = ({
  children,
}) => {
  const grid = (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={styles.strokeGrid}>
      <line
        x1="0"
        y1="50"
        x2="100"
        y2="50"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 8"
      />
      <line
        x1="50"
        y1="0"
        x2="50"
        y2="100"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 8"
      />
    </svg>
  );

  return (
    <div className={styles.strokeBackground}>
      {grid}
      <div className={styles.strokeContent}>{children}</div>
    </div>
  );
};
