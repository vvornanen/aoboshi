import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { windowControlsWidth } from "../../styles.css";
import { Container } from "../../common/Container/Container";
import { useSelector } from "../useSelector";
import { selectSidebarOpen } from "../settingsSlice";
import { toolbar } from "./Toolbar.css";

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
