import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { List } from "../../common/List/List";
import { ListItem } from "../../common/ListItem/ListItem";
import { ListSubheader } from "../../common/ListSubheader/ListSubheader";
import { useFindAllBooksQuery } from "../../books/booksApi";
import { Typography } from "../../common/Typography/Typography";
import { maru } from "../../common/maru";
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

  // TODO: Skip query if sidebar is not open
  // Use a skip state and Base UI CssTransition when closing the sidebar to
  // keep data visible until the slide animation ends.
  const {
    data: books,
    error: booksError,
    isLoading: booksLoading,
  } = useFindAllBooksQuery();

  return (
    <aside className={clsx(sidebar, { open })} style={{ width }} {...props}>
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
