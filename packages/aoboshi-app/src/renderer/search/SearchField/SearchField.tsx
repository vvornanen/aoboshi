import { ComponentPropsWithoutRef, FunctionComponent, useState } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { motion } from "framer-motion";
import * as styles from "./SearchField.css";
import * as cardStyles from "~common/Card/Card.css";
import { visuallyHidden } from "~common/visuallyHidden.css";

type SearchFieldProps = Pick<
  ComponentPropsWithoutRef<"button">,
  "className" | "style"
> & {
  defaultOpen?: boolean;
};

export const SearchField: FunctionComponent<SearchFieldProps> = ({
  defaultOpen = false,
  className,
  ...props
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // TODO: Navigate to search results page
    // TODO: Save query to recent search queries
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className={clsx(styles.searchButton, className)}
        {...props}
      >
        <motion.span layout="position" className={styles.searchButtonLabel}>
          {t("SearchField.inputLabel")}
        </motion.span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          className={clsx(
            cardStyles.card({ variant: "raised" }),
            styles.dialog,
          )}
        >
          <Dialog.Title className={visuallyHidden}>
            {t("SearchField.inputLabel")}
          </Dialog.Title>
          <Command>
            <Command.Input
              aria-label={t("SearchField.inputLabel")}
              placeholder={t("SearchField.inputPlaceholder")}
              className={styles.searchInput}
              value={query}
              onValueChange={setQuery}
            ></Command.Input>
            <Command.List>
              {query.trim().length > 0 && (
                <Command.Item
                  className={styles.item}
                  value={query}
                  onSelect={handleSearch}
                >
                  {/* TODO: search icon */}
                  {query}
                </Command.Item>
              )}
              <RecentItems />
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const RecentItems: FunctionComponent = () => {
  const { t } = useTranslation();

  // TODO: Get recent search queries
  const recentItems: string[] = [];

  if (recentItems.length === 0) {
    return null;
  }

  return (
    <Command.Group
      heading={
        <h3 className={styles.groupHeader}>{t("SearchField.recentLabel")}</h3>
      }
    >
      {recentItems.map((item) => (
        <Command.Item key={item} className={styles.item}>
          {item}
        </Command.Item>
      ))}
    </Command.Group>
  );
};
