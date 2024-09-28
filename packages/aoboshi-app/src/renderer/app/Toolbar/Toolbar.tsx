import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import * as styles from "./Toolbar.css";
import { Container } from "~common/Container";

type ToolbarProps = ComponentPropsWithoutRef<"div">;

export const Toolbar: FunctionComponent<ToolbarProps> = ({
  children,
  ...props
}) => {
  return (
    <Container>
      <div className={styles.toolbar} {...props}>
        {children}
      </div>
    </Container>
  );
};
