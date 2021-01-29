import React from "react";
import { NavLink } from "react-router-dom";
import { IKeys } from "./Home";

interface LibraryIProps {
  favoriteBook: IKeys[];
  libraryNoData: string;
}

const Library: React.FC<LibraryIProps> = ({ ...props }) => {
  return (
    <div className="library_height">
      <p className="library_no_data">{props.libraryNoData}</p>
      <div className="library_layout">
        {props.favoriteBook.map((book: IKeys, index: number) => (
          <NavLink to={`/BookExplanation/comic/${book.id}`} key={index}>
            <div className="library_box">
              <div className="library_wrap">
                <img src={book.src} alt="book" />
              </div>
              <p className="library_title">{book.title}</p>
              <p className="library_favorite">{book.creator}</p>
              <p className="test">
                <i className="fas fa-star"></i>
                {book.favorite}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Library;
