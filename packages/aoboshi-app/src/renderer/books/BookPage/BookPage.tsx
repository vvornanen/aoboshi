import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "../../common/Typography/Typography";
import { PageMeta } from "../../common/PageMeta/PageMeta";
import { VolumeSection } from "../VolumeSection/VolumeSection";
import { Container } from "../../common/Container/Container";
import { useFindBookByIdQuery } from "../booksApi";

export const BookPage: FunctionComponent = () => {
  const { bookId } = useParams();
  const { data: book, error } = useFindBookByIdQuery(bookId || "", {
    skip: !bookId,
  });

  if (error) {
    // TODO: Error page component
    return (
      <main>
        <Container style={{ paddingTop: 16, paddingBottom: 48 }}>
          <Typography>{String(error)}</Typography>
        </Container>
      </main>
    );
  } else if (!book) {
    // TODO: Not found page component
    return (
      <main>
        <Container style={{ paddingTop: 16, paddingBottom: 48 }}>
          <Typography>Book {String(bookId)} not found</Typography>
        </Container>
      </main>
    );
  }

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
