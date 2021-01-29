import React from "react";
import { db, datetime } from "../firebase/firebase";
import { connect } from "react-redux";
import { setCommentView } from "../actions/bookExplanation";
import * as firebase from "firebase/app";
import FullWidthTabs, { UserKeys } from "../components/FullWidthTabs";
import { Action, Dispatch } from "redux";
import { UnionedAction, allState } from "../actions/index";

interface ContainerFullWidthTabs {
  uid: string;
  bookDetailsComicID: number;
  setCommentView: (comment: string) => UnionedAction;
  commentView: UserKeys[];
}

const ContainerFullWidthTabs: React.FC<ContainerFullWidthTabs> = ({
  uid,
  bookDetailsComicID,
  setCommentView,
  commentView,
}) => {
  React.useEffect(() => {
    const getFireData = async () => {
      const querySnapshot = await db
        .collection("books")
        .where("id", "==", bookDetailsComicID)
        .get();
      querySnapshot.forEach((doc) => {
        setCommentView(doc.data().comment.reverse());
      });
    };
    getFireData();
  }, [bookDetailsComicID, setCommentView]);

  //コメント内容の取得
  const [commentContent, setCommentContent] = React.useState("");
  const getComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommentContent(value);
  };

  //キャンセル
  const cancel = () => {
    setCommentContent("");
  };

  //コメント処理
  const commentAdd = async () => {
    if (uid !== "") {
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
                    comment: commentContent,
                  }),
                });
              await db
                .collection("books")
                .where("id", "==", bookDetailsComicID)
                .get()
                .then((d) => {
                  setCommentView(d.docs[0].data().comment.reverse());
                });
            });
        });
    } else {
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
                userName: "ゲスト",
                src:
                  "https://firebasestorage.googleapis.com/v0/b/hew-fansa.appspot.com/o/default_user.png?alt=media&token=3d539089-401d-463b-8fc9-7d5aa7b9f70c",
                comment: commentContent,
              }),
            });
          await db
            .collection("books")
            .where("id", "==", bookDetailsComicID)
            .get()
            .then(async (d) => {
              setCommentView(d.docs[0].data().comment.reverse());
            });
        });
    }
    setCommentContent("");
  };

  return (
    <FullWidthTabs
      getComment={getComment}
      commentAdd={commentAdd}
      commentView={commentView}
      cancel={cancel}
      commentContent={commentContent}
    />
  );
};

const mapStateToProps = (state: allState) => {
  return {
    uid: state.myPageReducer.uid,
    commentView: state.bookExplanationReducer.commentView,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setCommentView: (comment: string) => dispatch(setCommentView(comment)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerFullWidthTabs);
