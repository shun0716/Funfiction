import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
// import Button from "@material-ui/core/Button";

interface RegisteIProps {
  open: boolean;
  createStatus: string;
  mailMessage: string;
  nameMessage: string;
  passMessage: string;
  disabled: boolean;
  load: boolean;
  userCreate: () => void;
  handleOpen: () => void;
  handleClose: () => void;
  authOpen: () => void;
  EmailHandleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  PasswdHandleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  NameHandleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "3px",
      boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.12)",
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const Registe: React.FC<RegisteIProps> = ({ ...props }) => {
  const classes: Record<"modal" | "paper", string> = useStyles({});

  return (
    <React.Fragment>
      <div onClick={props.handleOpen}>
        <p>新規登録</p>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">アカウントを作成</h2>
            <p className="notes">
              アカウントを作成する事により、
              <span onClick={props.handleClose}>
                <NavLink to="/TermsOfService">利用規約</NavLink>
              </span>
              及び
              <span onClick={props.handleClose}>
                <NavLink to="/PrivacyPolicy">プライバシーポリシー</NavLink>
              </span>
              に同意するものとします
            </p>
            <form className="auth_form">
              <input
                type="text"
                name="email"
                placeholder="メールアドレス"
                onChange={(e) => props.EmailHandleOnChange(e)}
              />
              <p className="error_message">{props.mailMessage}</p>
              <br />
              <input
                type="text"
                name="uname"
                placeholder="ユーザー名"
                onChange={(e) => props.NameHandleOnChange(e)}
              />
              <br />
              <p className="error_message">{props.nameMessage}</p>
              <br />
              <input
                type="password"
                name="passwd"
                placeholder="パスワード"
                onChange={(e) => props.PasswdHandleOnChange(e)}
              />
              <p className="error_message">{props.passMessage}</p>
              <br />
            </form>
            {props.load ? (
              <div className="load">
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <button
                onClick={props.userCreate}
                className="auth_button"
                disabled={props.disabled}
              >
                <div className="support_submit_wrap" id="kesu2">
                  新規登録
                </div>
              </button>
            )}
            <p className="not_have">
              すでにアカウントをお持ちですか？&nbsp;
              <span
                onClick={() => {
                  props.handleClose();
                  props.authOpen();
                }}
              >
                ログイン
              </span>
            </p>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default Registe;
