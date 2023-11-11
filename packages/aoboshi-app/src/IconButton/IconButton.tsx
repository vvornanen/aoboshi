import { FunctionComponent } from "react";
import { Button, ButtonProps } from "@mui/base/Button";
import { clsx } from "clsx";
import { defaultColor, iconButton } from "./IconButton.css";

type IconButtonProps = ButtonProps;

export const IconButton: FunctionComponent<IconButtonProps> = ({
  className,
  ...props
}) => (
  <Button
    className={clsx(iconButton, defaultColor, className)}
    {...props}
  ></Button>
);
