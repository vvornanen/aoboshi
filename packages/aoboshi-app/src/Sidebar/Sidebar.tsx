import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Typography } from "../Typography/Typography";
import { sidebar } from "./Sidebar.css";

type SidebarProps = ComponentPropsWithoutRef<"aside"> & {
  width: number;
  open: boolean;
};

export const Sidebar: FunctionComponent<SidebarProps> = ({
  width,
  open,
  ...props
}) => {
  const { t } = useTranslation();

  // TODO: Get data from storage
  const books = [
    {
      id: "1",
      title: "常用漢字",
    },
  ];

  return (
    <aside className={clsx(sidebar, { open })} style={{ width }} {...props}>
      <nav>
        <ul>
          <li>
            <a href="/">{t("Sidebar.recentlyStudied")}</a>
          </li>
        </ul>
        <Typography variant="labelSmall">{t("Sidebar.library")}</Typography>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <a href={`/books/${book.id}`}>{book.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
