import { FunctionComponent } from "react";
import { Typography } from "../../Typography/Typography";
import { PageMeta } from "../../PageMeta/PageMeta";
import { grades } from "../grades";
import { VolumeSection } from "../VolumeSection/VolumeSection";

export const BookPage: FunctionComponent = () => {
  // TODO: Get data from storage
  const book = grades;

  return (
    <main>
      <PageMeta title={book.title} />
      <Typography variant="headlineLarge" component="h1">
        {book.title}
      </Typography>
      {book.volumes.map((volume) => {
        return <VolumeSection key={volume.id} volume={volume} />;
      })}
    </main>
  );
};
