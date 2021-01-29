import * as React from "react";
import * as firebase from "firebase/app";
import MyPage from "../components/MyPage";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { clearState } from "../actions/navigation";
import { titleChange } from "../actions/navigation";
import { setUserName, setPoint, setUid } from "../actions/myPage";
import { setFavoriteItem } from "../actions/library";
import { UnionedAction, allState } from "../actions/index";

interface ContainerMyPage {
  userName: string;
  point: number;
  uid: string;
  setUserName: (name: string) => UnionedAction;
  setUid: (id: string) => UnionedAction;
  setPoint: (num: number) => UnionedAction;
  setFavoriteItem: (fav: number[]) => UnionedAction;
  clearState: () => UnionedAction;
  titleChange: (title: string) => UnionedAction;
}

const ContainerMyPage: React.FC<ContainerMyPage> = ({
  userName,
  point,
  uid,
  clearState,
  titleChange,
  setUserName,
  setPoint,
  setUid,
  setFavoriteItem,
}) => {
  const [disabled, setDisabled] = React.useState<boolean>(true);

  React.useEffect(() => {
    clearState();
  }, [clearState]);

  React.useEffect(() => {
    if (uid !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [uid]);
  React.useEffect(() => {
    titleChange("マイページ");
  }, [titleChange]);

  const logout = () => {
    firebase.auth().onAuthStateChanged((user) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          setPoint(0);
          setUid("");
          setFavoriteItem([]);
          setUserName("ゲスト");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <MyPage
      userName={userName}
      point={point}
      disabled={disabled}
      logout={logout}
    />
  );
};

const mapStateToProps = (state: allState) => {
  return {
    userName: state.myPageReducer.userName,
    point: state.myPageReducer.point,
    uid: state.myPageReducer.uid,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  clearState: () => dispatch(clearState()),
  titleChange: (title: string) => dispatch(titleChange(title)),
  setUserName: (name: string) => dispatch(setUserName(name)),
  setPoint: (num: number) => dispatch(setPoint(num)),
  setUid: (id: string) => dispatch(setUid(id)),
  setFavoriteItem: (fav: number[]) => dispatch(setFavoriteItem(fav)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerMyPage);
