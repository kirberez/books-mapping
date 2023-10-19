import "./styles.css";
import { Book, BookInformation } from "./lib/types";
import { getBooks, getUsers, getReviews } from "./lib/api";
import { useEffect, useState, FC } from "react";
import Card from "./Card";
import { toBookInformation, toDictionary } from "./lib/utils";


const App: FC = () => {
  const [books, setBooks] = useState<BookInformation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getBooks(), getUsers(), getReviews()])
      .then(([fetchedBooks, fetchedUsers, fetchedReviews]) => {
        const usersDict = toDictionary(fetchedUsers);
        const reviewsDict = toDictionary(fetchedReviews);
        const booksInformation = fetchedBooks.map((b) => 
          toBookInformation(b, usersDict, reviewsDict)
        );
        setBooks(booksInformation);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  return (
    <div>
      <h1>Мои книги:</h1>
      {isLoading && <div>Загрузка...</div>}
      {!isLoading &&
        books.map((b) => <Card key={b.id} book={b} />)}
    </div>
  );
};

export default App;



