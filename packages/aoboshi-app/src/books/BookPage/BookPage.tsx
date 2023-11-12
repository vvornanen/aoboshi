import { FunctionComponent } from "react";
import { Typography } from "../../Typography/Typography";
import { PageMeta } from "../../PageMeta/PageMeta";
import { grades } from "../grades";
import { VolumeSection } from "../VolumeSection/VolumeSection";
import { Container } from "../../Container/Container";

export const BookPage: FunctionComponent = () => {
  // TODO: Get data from storage
  const book = grades;

  return (
    <main>
      <PageMeta title={book.title} />
      <Container style={{ paddingTop: 16, paddingBottom: 48 }}>
        <Typography variant="headlineLarge" component="h1">
          {book.title}
        </Typography>
        {book.volumes.map((volume) => {
          return <VolumeSection key={volume.id} volume={volume} />;
        })}
      </Container>
    </main>
  );
};
