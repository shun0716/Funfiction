import React from "react";
import { NavLink } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

export interface UserKeys {
  comment: string;
  date: string;
  src: string;
  userName: string;
}

interface FullWidthTabsIProps {
  getComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  commentAdd: () => void;
  cancel: () => void;
  commentView: Array<UserKeys>;
  commentContent: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fafafafa",
  },
  comment: {
    "& > *": {
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "100%",
        position: "static",
      },
      [theme.breakpoints.up("lg")]: {
        width: "60%",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
  },
}));

const FullWidthTabs: React.FC<FullWidthTabsIProps> = ({
  getComment,
  commentAdd,
  commentView,
  cancel,
  commentContent,
}) => {
  const classes = useStyles({});
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="作品詳細" {...a11yProps(0)} />
          <Tab label="コメント一覧" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {/* <p>作品詳細</p> */}
          <div className="details-description">
            <p>
              今回は平成の終わりと令和の始まりに描いてきた作品たちの総集編です。なかなかこんな風にまとめて出すこともないので詩を織り交ぜてみたんですがどうでしたでしょうか？気に入っていただければ幸いです。これからもいろいろな絵を描き続けていきますので末長くよろしく願いします。
            </p>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className={classes.comment}>
            <TextField
              id="standard-basic"
              label="コメントを入力"
              onChange={getComment}
              value={commentContent}
            />
          </div>
          <div className="comment_submit">
            <button onClick={cancel} className="cancel">
              キャンセル
            </button>
            <button onClick={commentAdd} className="submit">
              送信
            </button>
          </div>
          {commentView.map((users: UserKeys, index: number) => (
            <div className="comment_box" key={index}>
              <div>
                <img src={users.src} alt="usericon" />
              </div>
              <div>
                <p className="comment_user_name">{users.userName}</p>
                <p className="comment">{users.comment}</p>
                <p className="date">{users.date}</p>
              </div>
            </div>
          ))}
        </TabPanel>
      </SwipeableViews>
      <div className="readnav">
        <NavLink to="/Read">
          <p>今すぐ読む！</p>
        </NavLink>
      </div>
    </div>
  );
};

export default FullWidthTabs;
