import { FunctionComponent } from "react";
import { Typography } from "../Typography/Typography";
import { PageMeta } from "./PageMeta";

export const BookPage: FunctionComponent = () => {
  // TODO: Get data from storage
  const book = {
    title: "常用漢字一覧",
  };

  return (
    <main>
      <PageMeta title={book.title} />
      <Typography variant="headlineLarge">{book.title}</Typography>
    </main>
  );
};
