import {
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
  cloneElement,
  isValidElement,
  useRef,
  useState,
} from "react";
import { Popup } from "@mui/base/Unstable_Popup/Popup";
import * as styles from "./Tooltip.css";

type TooltipProps = {
  title: string;
  children?: ReactNode;
};

export const Tooltip: FunctionComponent<TooltipProps> = ({
  title,
  children: childrenProp,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);

  const handleMouseEnter: MouseEventHandler = () => {
    setOpen(true);
  };

  const handleMouseLeave: MouseEventHandler = () => {
    setOpen(false);
  };

  const children = isValidElement(childrenProp) ? (
    childrenProp
  ) : (
    <span>{childrenProp}</span>
  );

  const childrenProps = {
    ...children.props,
    ref: ref,
    "aria-label": title,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  return (
    <>
      {cloneElement(children, childrenProps)}
      <Popup anchor={ref.current} open={open} placement="bottom" offset={8}>
        <div className={styles.tooltip}>{title}</div>
      </Popup>
    </>
  );
};
