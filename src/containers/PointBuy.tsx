import * as React from "react";
import PointBuy from "../components/PointBuy";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { layoutChange } from "../actions/navigation";
import { titleChange } from "../actions/navigation";
import { UnionedAction, allState } from "../actions/index";

interface ContainerPointBuyIProps {
  point: number;
  layoutChange: () => UnionedAction;
  titleChange: (title: string) => UnionedAction;
}

const ContainerPointBuy: React.FC<ContainerPointBuyIProps> = ({
  point,
  layoutChange,
  titleChange
}) => {
  React.useEffect(() => {
    layoutChange();
  }, [layoutChange]);

  React.useEffect(() => {
    titleChange("ポイント購入");
  }, [titleChange]);

  return <PointBuy point={point} />;
};

const mapStateToProps = (state: allState) => {
  return {
    point: state.myPageReducer.point
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  layoutChange: () => dispatch(layoutChange()),
  titleChange: (title: string) => dispatch(titleChange(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerPointBuy);
