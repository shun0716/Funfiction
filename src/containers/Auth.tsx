import * as React from "react";
import * as firebase from "firebase/app";
import Auth from "../components/Auth";
import { connect } from "react-redux";
import { auth, db, datetime } from "../firebase/firebase";
import { actionHandleChange as RegisteHandleChange } from "../actions/registe";
import {
  actionHandleChange,
  setEmailInput,
  setPasswdInput,
} from "../actions/auth";
import { Action, Dispatch } from "redux";
import { UnionedAction, allState } from "../actions/index";

interface ContainerAuthIProps {
  uid: string;
  open: boolean;
  emailInput: string;
  passwdInput: string;
  setEmailInput: (addess: string) => UnionedAction;
  setPasswdInput: (pass: string) => UnionedAction;
  actionHandleChange: (modal: boolean) => UnionedAction;
  RegisteHandleChange: (modal: boolean) => UnionedAction;
}

const ContainerAuth: React.FC<ContainerAuthIProps> = ({
  uid,
  RegisteHandleChange,
  actionHandleChange,
  setEmailInput,
  setPasswdInput,
  ...props
}) => {
  const [mailMessage, setMailMessage] = React.useState<string>("");
  const [passMessage, setPassMessage] = React.useState<string>("");
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [load, setLoad] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (props.emailInput !== "" && props.passwdInput !== "") {
      setDisabled(false);
    }
  }, [props.emailInput, props.passwdInput]);

  const handleOpen = (): void => {
    actionHandleChange(true);
  };

  const handleClose = (): void => {
    actionHandleChange(false);
  };

  const registeOpen = (): void => {
    RegisteHandleChange(true);
  };

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

  const login = async () => {
    setLoad(true);
    const email = await props.emailInput;
    const passwd = await props.passwdInput;

    await auth
      .signInWithEmailAndPassword(email, passwd)
      .then(() => {
        db.collection("users").where("Email", "==", email).get();
        handleClose();
        setLoad(false);
        setDisabled(false);
      })
      .catch((err) => {
        setLoad(false);
        setDisabled(true);
        setPassMessage("メールアドレスまたはパスワードが不正です。");
      });
  };

  const logout = () => {
    firebase.auth().onAuthStateChanged(() => {
      firebase.auth().signOut();
    });
  };

  //初期登録用(twitter用)///////////////////////////////////////////////////////////////
  const twitterCreate = async () => {
    const snap = await db.collection("users").get();
    const nowDate = datetime();
    const size = snap.size;
    const provider = new firebase.auth.TwitterAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
      const user: any = result.user;
      db.collection("users")
        .add({
          ID: size + 1, //ユーザーID
          Name: user.displayName, //ユーザーネーム
          favorite: [], //お気に入り
          uid: user.uid,
          Point: 0, //保持ポイント
          usePoint: 0, //応援総額
          acceptancePoint: 0, //受け取り総額
          settlement: 0, //決済総額
          src: user.photoURL, //アカウント画像(Twitterデフォ)
          createTime: nowDate,
          updateTime: nowDate,
        })
        .then(() => {
          handleClose();
        });
    });
  };

  return (
    <React.Fragment>
      <Auth
        uid={uid}
        registeOpen={registeOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        EmailHandleOnChange={EmailHandleOnChange}
        PasswdHandleOnChange={PasswdHandleOnChange}
        open={props.open}
        login={login}
        twitterCreate={twitterCreate}
        mailMessage={mailMessage}
        passMessage={passMessage}
        disabled={disabled}
        logout={logout}
        load={load}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: allState) => {
  return {
    uid: state.myPageReducer.uid,
    open: state.authReducer.open,
    emailInput: state.authReducer.emailInput,
    passwdInput: state.authReducer.passwdInput,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  RegisteHandleChange: (modal: boolean) => dispatch(RegisteHandleChange(modal)),
  actionHandleChange: (modal: boolean) => dispatch(actionHandleChange(modal)),
  setEmailInput: (aderess: string) => dispatch(setEmailInput(aderess)),
  setPasswdInput: (pass: string) => dispatch(setPasswdInput(pass)),
  // setUserName: (name: string) => dispatch(setUserName(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerAuth);
