import { FunctionComponent, ReactElement } from "react";
import * as BaseTooltip from "@radix-ui/react-tooltip";
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
    <BaseTooltip.Provider delayDuration={300}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger asChild>{children}</BaseTooltip.Trigger>
        <BaseTooltip.Portal>
          <BaseTooltip.Content
            className={styles.tooltip}
            side="bottom"
            sideOffset={4}
          >
            {title}
            <BaseTooltip.Arrow />
          </BaseTooltip.Content>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
};
