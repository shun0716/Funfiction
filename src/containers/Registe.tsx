import * as React from "react";
import { connect } from "react-redux";
import { auth, datetime, db } from "../firebase/firebase";
import Registe from "../components/Registe";
import { setUserName } from "../actions/myPage";
import { actionHandleChange as authHandleChange } from "../actions/auth";
import {
  actionHandleChange,
  setEmailInput,
  setPasswdInput,
  setNameInput,
  setCreateStatus,
} from "../actions/registe";
import { Action, Dispatch } from "redux";
import { UnionedAction, allState } from "../actions/index";

interface ContainerRegisteIProps {
  open: boolean;
  emailInput: string;
  passwdInput: string;
  nameInput: string;
  createStatus: string;
  setEmailInput: (addess: string) => UnionedAction;
  setPasswdInput: (pass: string) => UnionedAction;
  setNameInput: (name: string) => UnionedAction;
  setUserName: (name: string) => UnionedAction;
  setCreateStatus: (message: string) => UnionedAction;
  actionHandleChange: (modal: boolean) => UnionedAction;
  authHandleChange: (modal: boolean) => UnionedAction;
}

const ContainerRegiste: React.FC<ContainerRegisteIProps> = ({
  actionHandleChange,
  setEmailInput,
  setPasswdInput,
  setNameInput,
  setCreateStatus,
  setUserName,
  authHandleChange,
  ...props
}) => {
  const [mailMessage, setMailMessage] = React.useState<string>("");
  const [nameMessage, setNameMessage] = React.useState<string>("");
  const [passMessage, setPassMessage] = React.useState<string>("");
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [load, setLoad] = React.useState<boolean>(false);

  const handleOpen = (): void => {
    actionHandleChange(true);
  };
  const handleClose = (): void => {
    actionHandleChange(false);
  };

  const authOpen = (): void => {
    authHandleChange(true);
  };

  React.useEffect(() => {
    if (
      props.emailInput !== "" &&
      props.nameInput !== "" &&
      props.passwdInput !== ""
    ) {
      setDisabled(false);
    }
  }, [props.emailInput, props.nameInput, props.passwdInput]);

  const EmailHandleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (e.currentTarget.value !== "") {
      if (e.currentTarget.value.match(REGEX_EMAIL)) {
        setEmailInput(e.currentTarget.value);
        setMailMessage("");
      } else {
        setMailMessage("メールアドレスの形式が不正です");
        setDisabled(true);
      }
    } else {
      setMailMessage("メールアドレスを入力してください");
      setDisabled(true);
    }
  };

  const NameHandleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value !== "") {
      setNameInput(e.currentTarget.value);
      setNameMessage("");
    } else {
      setNameMessage("ユーザ名を入力してください");
      setDisabled(true);
    }
  };

  const PasswdHandleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.currentTarget.value !== "") {
      if (e.currentTarget.value.length >= 6) {
        setPasswdInput(e.currentTarget.value);
        setPassMessage("");
      } else {
        setPassMessage("パスワードは6文字以上で入力してください");
        setDisabled(true);
      }
    } else {
      setPassMessage("パスワードを入力してください");
      setDisabled(true);
    }
  };

  const userCreate = async () => {
    setLoad(true);
    const email = props.emailInput;
    const Name = props.nameInput;
    const passwd = props.passwdInput;
    // const nowDate: string = datetime();
    const snap: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = await db
      .collection("users")
      .get();
    const size: number = snap.size;

    auth
      .createUserWithEmailAndPassword(email, passwd)
      .then((d) => {
        db.collection("users")
          .add({
            ID: size + 1, //ユーザーID
            Name: Name, //ユーザーネーム
            uid: d.user!.uid, //メールアドレス
            src:
              "https://firebasestorage.googleapis.com/v0/b/hew-fansa.appspot.com/o/default_user.png?alt=media&token=3d539089-401d-463b-8fc9-7d5aa7b9f70c",
            Point: 0, //保持ポイント
            usePoint: 0, //応援総額
            acceptancePoint: 0, //受け取り総額
            settlement: 0, //決済総額
            favorite: [],
            createTime: datetime(),
            updateTime: datetime(),
          })
          .catch((err) => {
            setLoad(false);
            console.log(err);
          });
        auth
          .signInWithEmailAndPassword(email, passwd)
          .then(() => {
            setLoad(false);
            handleClose();
            setDisabled(true);
          })
          .catch((err) => {
            console.log(err);
            setLoad(false);
            setDisabled(true);
          });
      })
      .catch((err) => {
        setMailMessage("既に登録済みのメールアドレスです。");
        setLoad(false);
        setDisabled(true);
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Registe
        handleOpen={handleOpen}
        handleClose={handleClose}
        EmailHandleOnChange={EmailHandleOnChange}
        PasswdHandleOnChange={PasswdHandleOnChange}
        NameHandleOnChange={NameHandleOnChange}
        open={props.open}
        userCreate={userCreate}
        createStatus={props.createStatus}
        authOpen={authOpen}
        mailMessage={mailMessage}
        nameMessage={nameMessage}
        passMessage={passMessage}
        disabled={disabled}
        load={load}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: allState) => {
  return {
    open: state.registeReducer.open,
    emailInput: state.registeReducer.emailInput,
    passwdInput: state.registeReducer.passwdInput,
    nameInput: state.registeReducer.nameInput,
    createStatus: state.registeReducer.createStatus,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  authHandleChange: (modal: boolean) => dispatch(authHandleChange(modal)),
  actionHandleChange: (modal: boolean) => dispatch(actionHandleChange(modal)),
  setEmailInput: (aderess: string) => dispatch(setEmailInput(aderess)),
  setNameInput: (name: string) => dispatch(setNameInput(name)),
  setPasswdInput: (pass: string) => dispatch(setPasswdInput(pass)),
  setCreateStatus: (message: string) => dispatch(setCreateStatus(message)),
  setUserName: (name: string) => dispatch(setUserName(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerRegiste);
