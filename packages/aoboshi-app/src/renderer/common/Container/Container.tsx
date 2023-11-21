import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { container } from "./Container.css";

type ContainerProps = ComponentPropsWithoutRef<"div">;

/** Provides consistent padding for the toolbar and the page content */
export const Container: FunctionComponent<ContainerProps> = ({
  className,
  ...props
}) => <div className={clsx(container, className)} {...props}></div>;
