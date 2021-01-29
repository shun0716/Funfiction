import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { layoutChange } from "../actions/navigation";
import { UnionedAction, allState } from "../actions/index";
import { IKeys } from "../components/Home";
import { Action, Dispatch } from "redux";
import BookList from "../components/BookList";

type BooksProps = {
  layoutChange: () => UnionedAction;
  bookData: IKeys[];
} & RouteComponentProps<{
  code: string;
}>;

const Books: React.FC<BooksProps> = ({ match, layoutChange, bookData }) => {
  useEffect(() => {
    layoutChange();
  }, [layoutChange]);

  return (
    <React.Fragment>
      <BookList books={bookData} />
    </React.Fragment>
  );
};

const mapStateToProps = (state: allState) => {
  return {
    bookData: state.bookExplanationReducer.bookData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  layoutChange: () => dispatch(layoutChange()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Books));
