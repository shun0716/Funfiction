import * as React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

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

const Information: React.FC = () => {
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
        <p>お知らせ</p>
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
            <h2 id="transition-modal-title">お知らせ</h2>
            <p className="no_history">お知らせはありません。</p>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default Information;
