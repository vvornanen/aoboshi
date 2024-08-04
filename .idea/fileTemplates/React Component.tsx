import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import * as styles from "./${NAME}.css";

type ${NAME}Props = ComponentPropsWithoutRef<"div">;

export const ${NAME}: FunctionComponent<${NAME}Props> = ({
  className,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div className={clsx(className)} {...props}/>
  );
};
