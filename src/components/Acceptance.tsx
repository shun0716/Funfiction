import * as React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export interface AcceptanceItem {
  userName: string;
  date: string;
  Point: number;
}

interface AcceptanceIProps {
  acceptance: AcceptanceItem[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: "#fff",
      borderRadius: "3px",
      boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.12)",
      padding: theme.spacing(2, 4, 3),
      maxHeight: "60vh",
    },
    box: {
      overflow: "scroll",
      maxHeight: "50vh",
    },
  })
);

const Acceptance: React.FC<AcceptanceIProps> = ({ ...props }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div onClick={handleOpen}>
        <p>受け取りBOX</p>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">受け取りBOX</h2>
            <div className={classes.box}>
              {props.acceptance.length !== 0 ? (
                props.acceptance.map((item: AcceptanceItem, index: number) => (
                  <div className="history_box" key={index}>
                    <p className="history_name">
                      {item.userName}さんから受け取り
                    </p>
                    <p className="history_date">{item.date}</p>
                    <div className="done_point">
                      <p className="done">受け取り完了</p>
                      <p className="point">
                        {item.Point}
                        <span>p</span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no_history">受け取り履歴がありません。</p>
              )}
            </div>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default Acceptance;
