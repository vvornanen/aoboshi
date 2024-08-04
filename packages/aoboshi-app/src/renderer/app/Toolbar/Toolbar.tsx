import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import * as styles from "./Toolbar.css";
import { Container } from "~common/Container";
import { selectSidebarOpen } from "~app/settingsSlice";
import { useSelector } from "~app/useSelector";
import * as theme from "~theme/theme.css";

type ToolbarProps = ComponentPropsWithoutRef<"div">;

export const Toolbar: FunctionComponent<ToolbarProps> = ({
  children,
  style,
  ...props
}) => {
  const sidebarOpen = useSelector(selectSidebarOpen);

  return (
    <div
      className={styles.toolbar}
      style={{
        ...style,
        paddingLeft: sidebarOpen
          ? 0
          : `calc(${theme.vars.windowControls.width} + 28px)`,
      }}
      {...props}
    >
      <Container>{children}</Container>
    </div>
  );
};
