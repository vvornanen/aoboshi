import { FunctionComponent, ReactElement } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as styles from "./Tooltip.css";

export type TooltipProps = {
  title: string;
  children?: ReactElement;
};

export const Tooltip: FunctionComponent<TooltipProps> = ({
  title,
  children,
}) => {
  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={styles.tooltip}
            side="bottom"
            sideOffset={4}
          >
            {title}
            <TooltipPrimitive.Arrow className={styles.tooltipArrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
