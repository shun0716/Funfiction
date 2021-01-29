import * as React from "react";
import * as H from "history";
import Header from "../components/Header";
import { IKeys } from "../components/Search";
import { index } from "./Search";
import { Action, Dispatch } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setSearchResultPosts } from "../actions/search";
import { UnionedAction } from "../actions/index";

interface HeaderIProps {
  history: H.History;
  backButton: boolean;
  headerBar: boolean;
  headerTitle: string;
  searchResultPosts: Array<IKeys>;
  setSearchResultPosts: (result: Array<object>) => UnionedAction;
}

const ContainerHeader: React.FC<HeaderIProps> = ({ ...props }) => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [modalBox, setModalBox] = React.useState<boolean>(true);
  const [modalText, setModalText] = React.useState<boolean>(false);

  const back = (): void => {
    props.history.goBack();
  };

  const onSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.target.value !== "") {
      setModalBox(false);
      let tempResults: Array<object> = [];
      await index
        .search({
          query: e.target.value,
        })
        .then((responses: { hits: [object] }) => {
          tempResults = responses.hits;
        });
      props.setSearchResultPosts(tempResults);
      if (tempResults.length === 0) {
        setModalText(true);
      } else {
        setModalText(false);
      }
    } else {
      props.setSearchResultPosts([]);
      setModalBox(true);
    }
  };

  return (
    <Header
      back={back}
      backButton={props.backButton}
      headerBar={props.headerBar}
      headerTitle={props.headerTitle}
      modal={modal}
      modalBox={modalBox}
      modalText={modalText}
      setModal={setModal}
      onSearch={onSearch}
      searchResultPosts={props.searchResultPosts}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    backButton: state.navigationReducer.backButton,
    headerBar: state.navigationReducer.headerBar,
    headerTitle: state.navigationReducer.headerTitle,
    searchResultPosts: state.searchReducer.searchResultPosts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setSearchResultPosts: (result: Array<object>) =>
    dispatch(setSearchResultPosts(result)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContainerHeader)
);
