import * as React from "react";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import ImgMediaCard from "./ImgMediaCard";
import { IKeys } from "./Search";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { allState } from "../actions/index";

interface IBooks {
  id: number;
  src: string;
  title: string;
  creator: string;
  star: number;
}

interface HeaderSearchModalIProps {
  modal: boolean;
  modalBox: boolean;
  modalText: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  searchResultPosts: IKeys[];
  bookData: IKeys[];
}

const HeaderSearchModal: React.FC<HeaderSearchModalIProps> = ({
  bookData,
  ...props
}) => {
  const [oftenSearchedBooks, setOftenSearchedBooks] = React.useState<any[]>([]);
  React.useEffect(() => {
    const getData = () => {
      const newArray = bookData.slice(0, 10);
      setOftenSearchedBooks(newArray);
    };
    getData();
  }, [bookData]);

  return (
    <article className="pc_modal">
      <div
        className={`pc_search_modal ${
          props.modal && "pc_search_modal_is-show"
        }`}
      >
        <div className="pc_search_modal_box">
          <div className="pc_search_close">
            <ClearRoundedIcon
              onClick={() => {
                props.setModal(false);
              }}
            />
          </div>
          {props.modalBox ? (
            <React.Fragment>
              <h2>よく検索されている作品</h2>
              <section className="search_modal_books">
                {oftenSearchedBooks.map((book, index: number) => (
                  <NavLink
                    to={`/BookExplanation/bookData/${book.id}`}
                    key={index}
                    onClick={() => {
                      props.setModal(false);
                    }}
                  >
                    <ImgMediaCard
                      key={index}
                      width={200}
                      height="160"
                      left={10}
                      right={10}
                      bottom={20}
                      image={book.src}
                      title={book.title}
                      creator={book.creator}
                      favorite={book.favorite}
                    />
                  </NavLink>
                ))}
              </section>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {props.modalText ? (
                <h2>検索結果0件</h2>
              ) : (
                <div className="search_modal_books_layout">
                  <section className="search_modal_books">
                    {props.searchResultPosts.map(
                      (post: IKeys, index: number) => (
                        <NavLink
                          to={`/BookExplanation/bookData/${post.id}`}
                          key={index}
                          onClick={() => {
                            props.setModal(false);
                          }}
                        >
                          <ImgMediaCard
                            width={200}
                            height="160"
                            left={10}
                            right={10}
                            bottom={20}
                            image={post.root}
                            title={post.title}
                            creator={post.user}
                            favorite={5}
                          />
                        </NavLink>
                      )
                    )}
                  </section>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </article>
  );
};

const mapStateToProps = (state: allState) => {
  return {
    bookData: state.bookExplanationReducer.bookData,
  };
};

export default connect(mapStateToProps, {})(HeaderSearchModal);
