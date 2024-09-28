import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { clsx } from "clsx";
import * as styles from "./Sidebar.css";
import { useFindAllBooksQuery } from "~books";
import { Typography } from "~common/Typography";
import { maru } from "~common";
import { ListSubheader } from "~common/ListSubheader";
import { ListItem } from "~common/ListItem";
import { List } from "~common/List";

type SidebarProps = ComponentPropsWithoutRef<"aside">;

export const Sidebar: FunctionComponent<SidebarProps> = ({
  className,
  ...props
}) => {
  const { t } = useTranslation();

  const {
    data: books,
    error: booksError,
    isLoading: booksLoading,
  } = useFindAllBooksQuery();

  return (
    <aside className={clsx(className, styles.sidebar)} {...props}>
      <nav>
        <List>
          <ListItem to="/">{t("Sidebar.recentlyStudied")}</ListItem>
        </List>
        <ListSubheader>{t("Sidebar.library")}</ListSubheader>
        <List aria-busy={booksLoading}>
          {!booksLoading &&
            books?.map((book) => (
              <ListItem key={book.id} to={`/books/${book.id}`}>
                {book.titleShort}
              </ListItem>
            ))}
          {booksLoading && (
            <>
              <ListItem loading>{maru(4)}</ListItem>
              <ListItem loading>{maru(5)}</ListItem>
              <ListItem loading>{maru(5)}</ListItem>
            </>
          )}
        </List>
        {/* TODO: Error component */}
        {booksError && <Typography>{booksError.message}</Typography>}
      </nav>
    </aside>
  );
};
