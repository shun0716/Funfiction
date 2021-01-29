import * as React from "react";
import ImgMediaCard from "../components/ImgMediaCard";
import { setCardStyle } from "../actions/home";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { UnionedAction, allState } from "../actions/index";

interface ContainerImgMediaCardIProps {
  width: number;
  height: string;
  left: number;
  right: number;
  bottom: number;
  image: string;
  title: string;
  creator: string;
  favorite: number;
  setCardStyle: (
    width: number,
    height: string,
    left: number,
    right: number,
    bottom: number
  ) => UnionedAction;
}

const ContainerImgMediaCard: React.FC<ContainerImgMediaCardIProps> = ({
  width,
  height,
  left,
  right,
  bottom,
  image,
  title,
  creator,
  favorite,
  setCardStyle
}) => {
  React.useEffect(() => {
    if (window.innerWidth > 1024) {
      setCardStyle(157, "140", 10, 10, 15);
    } else if (window.innerWidth > 481) {
      setCardStyle(137, "120", 5, 5, 10);
    } else {
      setCardStyle(137, "120", 5, 5, 10);
    }
  }, [setCardStyle]);

  return (
    <ImgMediaCard
      width={width}
      height={height}
      left={left}
      right={right}
      bottom={bottom}
      image={image}
      title={title}
      creator={creator}
      favorite={favorite}
    />
  );
};

const mapStateToProps = (state: allState) => {
  return {
    width: state.homeReducer.width,
    height: state.homeReducer.height,
    left: state.homeReducer.left,
    right: state.homeReducer.right,
    bottom: state.homeReducer.bottom
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setCardStyle: (
    width: number,
    height: string,
    left: number,
    right: number,
    bottom: number
  ) => dispatch(setCardStyle(width, height, left, right, bottom))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerImgMediaCard);
