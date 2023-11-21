import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { windowControlsWidth } from "../../styles.css";
import { Container } from "../../common/Container/Container";
import { toolbar } from "./Toolbar.css";

type ToolbarProps = ComponentPropsWithoutRef<"div"> & {
  sidebarOpen: boolean; // TODO: Read from store
};

export const Toolbar: FunctionComponent<ToolbarProps> = ({
  sidebarOpen,
  children,
  style,
  ...props
}) => {
  return (
    <div
      className={toolbar}
      style={{
        ...style,
        paddingLeft: sidebarOpen ? 0 : `calc(${windowControlsWidth} + 28px)`,
      }}
      {...props}
    >
      <Container>{children}</Container>
    </div>
  );
};
