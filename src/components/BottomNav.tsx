import * as React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { NavLink } from "react-router-dom";
import { items } from "./config/BottomNavData";
import { makeStyles } from "@material-ui/core/styles";

interface IPropsbottom {
  isBottomNav: boolean;
  value: string;
  handleChange: (event: React.ChangeEvent<{}>, newValue: string) => void;
}

const BottomNav: React.FC<IPropsbottom> = ({ ...props }) => {
  const useStyles: () => Record<"root", string> = makeStyles({
    root: {
      justifyContent: "space-evenly",
    },
  });
  const classes: Record<"root", string> = useStyles();

  return (
    <React.Fragment>
      {props.isBottomNav && (
        <nav className="bottom_sticky_nav">
          <BottomNavigation
            value={props.value}
            onChange={props.handleChange}
            className={classes.root}
            showLabels
          >
            {items.map((item, index) => (
              <BottomNavigationAction
                key={index}
                label={item.label}
                value={item.value}
                icon={<item.icon />}
                component={NavLink}
                to={item.to}
                activeClassName="active"
              />
            ))}
          </BottomNavigation>
        </nav>
      )}
    </React.Fragment>
  );
};

export default BottomNav;
