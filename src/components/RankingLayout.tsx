import * as React from "react";
import Ranking from "./Ranking";
import { NavLink } from "react-router-dom";
import { IKeys } from "./Home";

interface CardLayoutIProps {
  array: IKeys[];
}

const RankingLayout: React.FC<CardLayoutIProps> = ({ ...props }) => {
  return (
    <div className="ranking_layout">
      {props.array.map((item: IKeys, index: number) => (
        <NavLink to={`/BookExplanation/comic/${item.id}`} key={index}>
          <Ranking
            crown={item.crown}
            ranknum={index + 1}
            root={item.src}
            title={item.title}
            creator={item.creator}
            visibility={item.visibility}
            favorite={item.favorite}
          />
        </NavLink>
      ))}
    </div>
  );
};

export default RankingLayout;
