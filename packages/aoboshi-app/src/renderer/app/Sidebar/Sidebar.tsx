import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { List } from "../../common/List/List";
import { ListItem } from "../../common/ListItem/ListItem";
import { ListSubheader } from "../../common/ListSubheader/ListSubheader";
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
        <List>
          <ListItem to="/">{t("Sidebar.recentlyStudied")}</ListItem>
        </List>
        <ListSubheader>{t("Sidebar.library")}</ListSubheader>
        <List>
          {books.map((book) => (
            <ListItem key={book.id} to={`/books/${book.id}`}>
              {book.title}
            </ListItem>
          ))}
        </List>
      </nav>
    </aside>
  );
};
