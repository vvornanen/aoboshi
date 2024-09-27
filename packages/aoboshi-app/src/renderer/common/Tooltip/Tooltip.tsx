import { FunctionComponent, ReactElement } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type TooltipContentProps } from "@radix-ui/react-tooltip";
import * as styles from "./Tooltip.css";

export type TooltipProps = TooltipContentProps & {
  title: string;
  children?: ReactElement;
  defaultOpen?: boolean;
};

export const Tooltip: FunctionComponent<TooltipProps> = ({
  title,
  children,
  defaultOpen,
  ...props
}) => {
  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root defaultOpen={defaultOpen}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={styles.tooltip}
            side="bottom"
            sideOffset={4}
            {...props}
          >
            {title}
            <TooltipPrimitive.Arrow className={styles.tooltipArrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
