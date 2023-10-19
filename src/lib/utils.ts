import { users } from "./mocks";
import { User, Review, ReviewInformation, Book, BookInformation } from "./types";

export const toDictionary = <T extends { id: string }>(
  items: T[]
): Record<string, T> => 
  items.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

export const toReviewInformation = (
    review: Review,
    usersDict: Record<string, User>
  ): ReviewInformation => ({
    id: review.id,
    text: review.text,
    user: usersDict[review.userId]
  });
  
export const toBookInformation = (
    book: Book,
    usersDict: Record<string, User>,
    reviewsDict: Record<string, Review>
  ): BookInformation => {
    return {
      id: book.id,
      name: book.name || "Книга без названия",
      author: usersDict[book.authorId],
      reviews: book.reviewIds
        .map((r) => {
          const review = reviewsDict[r];
          if (!review) return null;
          return toReviewInformation(review, usersDict);
        })
        .filter(Boolean) as ReviewInformation[],
      description: book.description
    };
  };