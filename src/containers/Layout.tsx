import * as React from "react";
import Layout from "../components/Layout";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { auth, db } from "../firebase/firebase";
import { setUserName, setPoint, setUid } from "../actions/myPage";
import { setFavoriteItem } from "../actions/library";
import { setBookData } from "../actions/bookExplanation";
import { UnionedAction, allState } from "../actions/index";

interface LayoutIProps {
  children: React.ReactNode;
  bookData: any;
  setUserName: (name: string) => UnionedAction;
  setUid: (id: string) => UnionedAction;
  setPoint: (num: number) => UnionedAction;
  setFavoriteItem: (fav: number[]) => UnionedAction;
  setBookData: (
    array: Array<{ [s: string]: string | number }>
  ) => UnionedAction;
}

const ContainerLayout: React.FC<LayoutIProps> = ({
  setUserName,
  setPoint,
  setUid,
  setFavoriteItem,
  setBookData,
  bookData,
  children,
}) => {
  React.useEffect(() => {
    let bookDataArray: Array<{ [s: string]: string | number }> = [];
    const getFireData = async () => {
      const querySnapshot = await db.collection("books").orderBy("id").get();
      querySnapshot.forEach((doc) => {
        bookDataArray.push(doc.data());
      });
      setBookData(bookDataArray);
    };
    getFireData();
  }, [setBookData]);

  React.useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await db
          .collection("users")
          .where("uid", "==", user.uid)
          .orderBy("ID")
          .get()
          .then(async (d) => {
            let favoriteArray: number[] = [];
            const docsData = d.docs[0].data();
            for (let i = 0; i < (await docsData.favorite.length); i++) {
              favoriteArray.push(bookData[(await docsData.favorite[i]) - 1]);
            }
            setFavoriteItem(favoriteArray);
            setUserName(docsData.Name);
            setPoint(docsData.Point);
          });
        setUid(user.uid);
      }
    });
  }, [setUserName, setPoint, setUid, setFavoriteItem, bookData]);

  return <Layout children={children} />;
};

const mapStateToProps = (state: allState) => {
  return {
    bookData: state.bookExplanationReducer.bookData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setUserName: (name: string) => dispatch(setUserName(name)),
  setPoint: (num: number) => dispatch(setPoint(num)),
  setUid: (id: string) => dispatch(setUid(id)),
  setFavoriteItem: (fav: number[]) => dispatch(setFavoriteItem(fav)),
  setBookData: (array: Array<{ [s: string]: string | number }>) =>
    dispatch(setBookData(array)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerLayout);
