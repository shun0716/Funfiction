import React from "react";
import Library from "../components/Library";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { IKeys } from "../components/Home";
import { clearState } from "../actions/navigation";
import { titleChange } from "../actions/navigation";
import { UnionedAction } from "../actions/index";

interface ContainerLibraryIProps {
  favoriteArray: IKeys[];
  uid: string;
  clearState: () => UnionedAction;
  titleChange: (title: string) => UnionedAction;
}

const ContainerLibrary: React.FC<ContainerLibraryIProps> = ({
  clearState,
  favoriteArray,
  titleChange,
  uid,
}) => {
  const [libraryNoData, setLibraryNoData] = React.useState<string>("");

  React.useEffect(() => {
    clearState();
  }, [clearState]);

  React.useEffect(() => {
    titleChange("お気に入り");
  }, [titleChange]);

  React.useEffect(() => {
    if (favoriteArray.length === 0 && uid === "") {
      setLibraryNoData("ログインしてお気に入りの作品を登録しよう！");
    } else if (favoriteArray.length === 0 && uid !== "") {
      setLibraryNoData("お気に入りに登録した作品はありません");
    } else {
      setLibraryNoData("");
    }
  }, [favoriteArray.length, uid]);

  return <Library favoriteBook={favoriteArray} libraryNoData={libraryNoData} />;
};

const mapStateToProps = (state) => {
  return {
    favoriteArray: state.libraryReducer.favoriteArray,
    uid: state.myPageReducer.uid,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  clearState: () => dispatch(clearState()),
  titleChange: (title: string) => dispatch(titleChange(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerLibrary);
