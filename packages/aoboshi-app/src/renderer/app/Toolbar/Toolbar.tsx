import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { toolbar } from "./Toolbar.css";
import { windowControlsWidth } from "~/renderer/styles.css";
import { Container } from "~common/Container";
import { selectSidebarOpen } from "~app/settingsSlice";
import { useSelector } from "~app/useSelector";

type ToolbarProps = ComponentPropsWithoutRef<"div">;

export const Toolbar: FunctionComponent<ToolbarProps> = ({
  children,
  style,
  ...props
}) => {
  const sidebarOpen = useSelector(selectSidebarOpen);

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
