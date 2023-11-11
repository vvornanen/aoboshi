import { FunctionComponent } from "react";
import { Typography } from "../Typography/Typography";

export const BookPage: FunctionComponent = () => {
  // TODO: Get data from storage
  const book = {
    title: "常用漢字一覧",
  };

  return (
    <div>
      <Typography variant="headlineLarge">{book.title}</Typography>
    </div>
  );
};
