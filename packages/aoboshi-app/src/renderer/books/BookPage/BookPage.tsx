import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { Typography } from "../../common/Typography/Typography";
import { PageMeta } from "../../common/PageMeta/PageMeta";
import { VolumeSection } from "../VolumeSection/VolumeSection";
import { Container } from "../../common/Container/Container";
import { useFindBookByIdQuery } from "../booksApi";
import { Skeleton } from "../../common/Skeleton/Skeleton";

export const BookPage: FunctionComponent = () => {
  const { bookId } = useParams();
  const {
    data: book,
    error,
    isLoading,
  } = useFindBookByIdQuery(bookId || skipToken);

  if (error) {
    // TODO: Error page component
    return (
      <main>
        <Container style={{ paddingTop: 16, paddingBottom: 48 }}>
          <Typography>{error.message}</Typography>
        </Container>
      </main>
    );
  }

  return (
    <main>
      {book && <PageMeta title={book.title} />}
      <Container
        aria-busy={isLoading}
        style={{ paddingTop: 16, paddingBottom: 48 }}
      >
        <Typography variant="headlineLarge" component="h1">
          {book?.title}
          {isLoading && <Skeleton length={8} />}
        </Typography>
        {book?.volumes.map((volume) => {
          return <VolumeSection key={volume.id} volume={volume} />;
        })}
        {isLoading && <VolumeSection loading />}
      </Container>
    </main>
  );
};
