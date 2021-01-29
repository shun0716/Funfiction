import * as React from "react";
import CardLayout from "../components/CardLayout";
import RankingLayout from "../components/RankingLayout";
import FeaturedLayout from "../components/FeaturedLayout";
import Home, { IKeys, HomeItem } from "../components/Home";
import { connect } from "react-redux";
import { clearState } from "../actions/navigation";
import { setBookData } from "../actions/bookExplanation";
import { Action, Dispatch } from "redux";
import { UnionedAction, allState } from "../actions/index";

interface ContainerHomeIProps {
  bookData: Array<IKeys>;
  clearState: () => UnionedAction;
  setBookData: (
    array: Array<{ [s: string]: string | number }>
  ) => UnionedAction;
}

const ContainerHome: React.FC<ContainerHomeIProps> = ({
  bookData,
  clearState,
  setBookData,
}) => {
  React.useEffect(() => {
    clearState();
  }, [clearState]);

  const recommendes: IKeys[] = bookData.slice(0, 10);
  const newWorks: IKeys[] = bookData.slice(15, 25);
  const ranking: IKeys[] = bookData.slice(30, 35);
  let featured2: IKeys[] = [];
  let featured1: IKeys[] = [];
  let featuredComponent = FeaturedLayout;

  if (window.innerWidth > 1024) {
    featured1 = bookData.slice(45, 50);
    featured2 = bookData.slice(50, 55);
    featuredComponent = CardLayout;
  } else if (window.innerWidth > 481) {
    featured1 = bookData.slice(45, 49);
    featured2 = bookData.slice(50, 54);
  } else {
    featured1 = bookData.slice(45, 48);
    featured2 = bookData.slice(50, 53);
  }

  const items: HomeItem[] = [
    {
      topic: "みんなが読んでる話題作",
      more: "/books/AllComics",
      component: CardLayout,
      array: recommendes,
      grid: "grid_item1",
    },
    {
      topic: "今月の新着作品",
      more: "/books/AllComics",
      component: CardLayout,
      array: newWorks,
      grid: "grid_item2",
    },
    {
      topic: "人気ランキング",
      more: "/books/AllComics",
      component: RankingLayout,
      array: ranking,
      grid: "grid_item3",
    },
    {
      topic: "特集作品群01",
      more: "/books/AllComics",
      component: featuredComponent,
      array: featured1,
      grid: "grid_item4",
    },
    {
      topic: "特集作品群02",
      more: "/books/AllComics",
      component: featuredComponent,
      array: featured2,
      grid: "grid_item5",
    },
  ];

  return <Home items={items} />;
};

const mapStateToProps = (state: allState) => {
  return {
    bookData: state.bookExplanationReducer.bookData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  clearState: () => dispatch(clearState()),
  setBookData: (array: Array<{ [s: string]: string | number }>) =>
    dispatch(setBookData(array)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerHome);
