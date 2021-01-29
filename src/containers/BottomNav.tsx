import * as React from "react";
import BottomNav from "../components/BottomNav";
import { connect } from "react-redux";
import { allState } from "../actions/index";

interface IPropsbottom {
  isBottomNav: boolean;
}

const ContainerBottomNav: React.FC<IPropsbottom> = ({ ...props }) => {
  const [value, setValue] = React.useState("home");
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNav
      isBottomNav={props.isBottomNav}
      value={value}
      handleChange={handleChange}
    />
  );
};

const mapStateToProps = (state: allState) => {
  return {
    isBottomNav: state.navigationReducer.isBottomNav,
  };
};

export default connect(mapStateToProps, {})(ContainerBottomNav);
