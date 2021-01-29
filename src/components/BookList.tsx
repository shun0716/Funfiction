import * as React from "react";
import { NavLink } from "react-router-dom";
import { IKeys } from "../components/Home";
interface BookListProps {
  books: IKeys[];
}

const BookList: React.FC<BookListProps> = ({ books }) => (
  <React.Fragment>
    {books.map((book) => (
      <NavLink to={`/BookExplanation/commic/${book.id}`} key={book.id}>
        <div className="more" key={book.id}>
          <div className="more_image_area">
            <img src={book.src} alt="presentation" />
          </div>
          <div className="more_wrap">
            <p className="more_title">{book.title}</p>
            <p className="more_creator">{book.creator}</p>
          </div>
        </div>
      </NavLink>
    ))}
  </React.Fragment>
);

export default BookList;
