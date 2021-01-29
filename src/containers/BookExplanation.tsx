import * as React from "react";
import * as firebase from "firebase/app";
import BookExplanationList from "../components/BookExplanationList";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { layoutChange } from "../actions/navigation";
import { db, datetime } from "../firebase/firebase";
import { setFavoriteItem } from "../actions/library";
import { setPoint } from "../actions/myPage";
import { setFavButton, setFavStatus } from "../actions/bookExplanation";
import { setBookData } from "../actions/bookExplanation";
import { IKeys } from "../components/Home";
import { UnionedAction, allState } from "../actions/index";
import { setCommentView } from "../actions/bookExplanation";

type BooksProps = {
  uid: string;
  point: number;
  layoutChange: () => UnionedAction;
  setFavoriteItem: (av: number[]) => UnionedAction;
  setPoint: (num: number) => UnionedAction;
  setFavButton: (char: string) => UnionedAction;
  setFavStatus: (boolean: boolean) => UnionedAction;
  setCommentView: (comment: string) => UnionedAction;
  setBookData: (
    array: Array<{ [s: string]: string | number }>
  ) => UnionedAction;
  favStatus: boolean;
  favButton: string;
  bookData: IKeys;
} & RouteComponentProps<{
  code: string;
  details: any;
}>;

const Books: React.FC<BooksProps> = ({
  match,
  layoutChange,
  uid,
  setFavoriteItem,
  setPoint,
  point,
  setFavButton,
  setFavStatus,
  setBookData,
  favStatus,
  favButton,
  bookData,
  setCommentView,
}) => {
  const targetID: number = match.params.details;
  const bookDetails: any = bookData[targetID - 1];
  const bookDetailsBackGround: string = bookData[targetID - 1].src;
  const bookDetailsComicID: number = bookData[targetID - 1].id;
  const comic_background: React.RefObject<HTMLInputElement> = React.createRef<
    HTMLInputElement
  >();
  const [load, setLoad] = React.useState<boolean>(false);
  const [lCheck, setLCheck] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (uid !== "") {
      setLCheck(false);
    } else {
      setLCheck(true);
    }
  }, [uid]);

  React.useEffect(() => {
    if (uid === "") {
      setFavStatus(false);
    }
  }, [uid, setFavStatus]);

  React.useEffect(() => {
    layoutChange();
  }, [layoutChange]);

  React.useEffect(() => {
    comic_background.current!.style.background = `url(${bookDetailsBackGround}) center / cover`;
  }, [bookDetailsBackGround, comic_background]);

  React.useEffect(() => {
    db.collection("users")
      .where("uid", "==", uid)
      .orderBy("ID")
      .get()
      .then((d) => {
        if (uid !== "") {
          if (d.docs[0].data().favorite.indexOf(bookDetailsComicID) !== -1) {
            //お気に入り済ならの処理
            setFavButton("お気に入り済み");
            setFavStatus(true);
          } else {
            //お気に入りされてない場合
            setFavButton("お気に入り登録");
            setFavStatus(false);
          }
        }
      });
  }, [bookDetailsComicID, uid, setFavButton, setFavStatus]);

  const favoriteStatusChange = async () => {
    const querySnapshot = await db
      .collection("users")
      .where("uid", "==", uid)
      .orderBy("ID")
      .get();

    if (uid !== "") {
      if (
        querySnapshot.docs[0].data().favorite.indexOf(bookDetailsComicID) !== -1
      ) {
        setFavButton("お気に入り登録");
        setFavStatus(false);

        //お気に入り済ならの処理
        await db
          .collection("users")
          .doc(querySnapshot.docs[0].id)
          .update({
            favorite: firebase.firestore.FieldValue.arrayRemove(
              bookDetailsComicID
            ),
          });

        //お気に入り更新
        await db
          .collection("users")
          .where("uid", "==", uid)
          .orderBy("ID")
          .get()
          .then(async (d) => {
            let favoriteArray: number[] = [];
            for (let i = 0; i < d.docs[0].data().favorite.length; i++) {
              favoriteArray.push(bookData[d.docs[0].data().favorite[i] - 1]);
            }
            setFavoriteItem(favoriteArray);
          });

        //お気に入り数低下
        await db
          .collection("books")
          .where("id", "==", bookDetailsComicID)
          .get()
          .then((d) => {
            const favoriteID = d.docs[0].id;
            const favoriteNumber: number = d.docs[0].data().favorite;
            db.collection("books")
              .doc(favoriteID)
              .update({
                favorite: favoriteNumber - 1,
              });
          });
      } else {
        setFavButton("お気に入り済み");
        setFavStatus(true);

        //お気に入りされてない場合(お気に入り追加する処理)
        await db
          .collection("users")
          .doc(querySnapshot.docs[0].id)
          .update({
            favorite: firebase.firestore.FieldValue.arrayUnion(
              bookDetailsComicID
            ),
          });

        //お気に入り更新
        await db
          .collection("users")
          .where("uid", "==", uid)
          .orderBy("ID")
          .get()
          .then(async (d) => {
            let favoriteArray: number[] = [];
            for (let i = 0; i < d.docs[0].data().favorite.length; i++) {
              favoriteArray.push(bookData[d.docs[0].data().favorite[i] - 1]);
            }
            setFavoriteItem(favoriteArray);
          });

        //お気に入り数追加
        await db
          .collection("books")
          .where("id", "==", bookDetailsComicID)
          .get()
          .then((d) => {
            const favoriteID = d.docs[0].id;
            const favoriteNumber: number = d.docs[0].data().favorite;
            db.collection("books")
              .doc(favoriteID)
              .update({
                favorite: favoriteNumber + 1,
              });
          });
      }
    }
  };

  const [choicePoint, setChoicePoint] = React.useState(0);
  const [isDoneModal, setisDoneModal] = React.useState(false);
  const [eModal, setEModal] = React.useState(false);
  const [comment, setComment] = React.useState("");

  const pointSelection = (num: number) => {
    setChoicePoint(choicePoint + num);
  };
  const isDoneModalOpen = () => {
    setisDoneModal(true);
    setLoad(false);
  };

  const getComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setComment(value);
  };

  const eModalClose = () => {
    setEModal(false);
  };

  //応援押したとき
  const support = async () => {
    setLoad(true);
    db.collection("users")
      .where("uid", "==", uid)
      .orderBy("ID")
      .get()
      .then(async (user) => {
        const userName = await user.docs[0].data().Name;
        const userPoint: number = await user.docs[0].data().Point;
        const usePoint: number = await user.docs[0].data().usePoint;
        const nowData = datetime();
        const userDocumentID = user.docs[0].id;

        db.collection("users")
          .where("uid", "==", bookData[0].creatorid)
          .orderBy("ID")
          .get()
          .then(async (d) => {
            const creatorName = d.docs[0].data().Name;
            const creatorPoint: number = d.docs[0].data().Point;
            const acceptancePoint: number = d.docs[0].data().acceptancePoint;
            const creatorDocumentID = d.docs[0].id;

            //100は使う予定のポイント
            if (userPoint < choicePoint) {
              setLoad(false);
              setChoicePoint(0);
              setEModal(true);
              setTimeout(eModalClose, 3500);
            } else {
              await db
                .collection("users")
                .doc(userDocumentID)
                .update({
                  Point: userPoint - choicePoint,
                  usePoint: usePoint + choicePoint,
                  updateTime: nowData,
                  presentHistory: firebase.firestore.FieldValue.arrayUnion({
                    date: nowData,
                    userName: creatorName,
                    FORorTO: "FOR",
                    Point: choicePoint,
                  }),
                });

              await db
                .collection("users")
                .doc(creatorDocumentID)
                .update({
                  Point: creatorPoint + choicePoint,
                  acceptancePoint: acceptancePoint + choicePoint,
                  updateTime: nowData,
                  presentHistory: firebase.firestore.FieldValue.arrayUnion({
                    date: nowData,
                    userName: userName,
                    FORorTO: "TO",
                    Point: choicePoint,
                  }),
                });

              await db.collection("Support").add({
                date: nowData,
                point: choicePoint,
                forUser: userName,
                toUser: creatorName,
              });
              setPoint(point - choicePoint);
              setTimeout(isDoneModalOpen, 1500);
              setChoicePoint(0);

              await db
                .collection("users")
                .where("uid", "==", uid)
                .orderBy("ID")
                .get()
                .then(async (d) => {
                  const commentUserName: string = await d.docs[0].data().Name;
                  const commentUserPhoto: string = await d.docs[0].data().src;
                  await db
                    .collection("books")
                    .where("id", "==", bookDetailsComicID)
                    .get()
                    .then(async (c) => {
                      await db
                        .collection("books")
                        .doc(c.docs[0].id)
                        .update({
                          comment: firebase.firestore.FieldValue.arrayUnion({
                            date: datetime(),
                            userName: commentUserName,
                            src: commentUserPhoto,
                            comment: comment,
                          }),
                        });
                      await db
                        .collection("books")
                        .where("id", "==", bookDetailsComicID)
                        .get()
                        .then((d) => {
                          setCommentView(d.docs[0].data().comment.reverse());
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                });
              setComment("");
            }
          });
      });
  };

  return (
    <React.Fragment>
      <BookExplanationList
        src={bookDetails.src}
        title={bookDetails.title}
        creator={bookDetails.creator}
        comic_background={comic_background}
        favoriteStatusChange={favoriteStatusChange}
        favButton={favButton}
        bookDetailsComicID={bookDetailsComicID}
        support={support}
        point={point}
        pointSelection={pointSelection}
        choicePoint={choicePoint}
        favStatus={favStatus}
        isDoneModal={isDoneModal}
        load={load}
        setisDoneModal={setisDoneModal}
        getComment={getComment}
        comment={comment}
        eModal={eModal}
        lCheck={lCheck}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: allState) => {
  return {
    uid: state.myPageReducer.uid,
    point: state.myPageReducer.point,
    favButton: state.bookExplanationReducer.favButton,
    favStatus: state.bookExplanationReducer.favStatus,
    bookData: state.bookExplanationReducer.bookData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  layoutChange: () => dispatch(layoutChange()),
  setFavoriteItem: (fav: number[]) => dispatch(setFavoriteItem(fav)),
  setPoint: (num: number) => dispatch(setPoint(num)),
  setFavButton: (char: string) => dispatch(setFavButton(char)),
  setFavStatus: (boolean: boolean) => dispatch(setFavStatus(boolean)),
  setCommentView: (comment: string) => dispatch(setCommentView(comment)),
  setBookData: (array: Array<{ [s: string]: string | number }>) =>
    dispatch(setBookData(array)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Books));
