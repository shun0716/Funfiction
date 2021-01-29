import * as React from "react";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

export interface PageItem {
  name: string;
  icon: React.FC;
  component: React.FC;
}

interface TemporaryDrawerIProsp {
  pageItem: PageItem[];
  userName: string;
  point: number;
  disabled: boolean;
}

const useStyles: () => Record<"list" | "fullList", string> = makeStyles({
  list: {
    width: 350,
  },
  fullList: {
    width: "auto",
  },
});

type Anchor = "top" | "left" | "bottom" | "right";

const TemporaryDrawer: React.FC<TemporaryDrawerIProsp> = ({ ...props }) => {
  const classes = useStyles();
  const [state, setState] = React.useState<{ [s: string]: boolean }>({
    left: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="drawer_user">
        <div className="user_info">
          <i className="fas fa-user"></i>
        </div>
        <div>
          <p className="user_name">{props.userName}</p>
          <p className="drawer_user_point">保有ポイント</p>
          <div className="drawer_point">
            <img src="/icons/coin.png" alt="coin" />
            <p className="user_point_view">{props.point}</p>
          </div>
          <NavLink to="/PointBuy">
            <button
              disabled={props.disabled}
              className="user_point_buy"
              onClick={toggleDrawer(anchor, false)}
            >
              ポイント購入
            </button>
          </NavLink>
        </div>
      </div>
      <Divider />
      <List>
        {props.pageItem.map((item: PageItem) => (
          <ListItem button key={item.name}>
            <ListItemIcon>
              <item.icon />
            </ListItemIcon>
            <item.component />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {(["left"] as Anchor[]).map((anchor: Anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuRoundedIcon />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TemporaryDrawer;
