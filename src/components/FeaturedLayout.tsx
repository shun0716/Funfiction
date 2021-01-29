import * as React from "react";
import Featured from "./Featured";
import { NavLink } from "react-router-dom";
import { IKeys } from "./Home";

interface CardLayoutIProps {
  array: IKeys[];
}

const FeaturedLayout: React.FC<CardLayoutIProps> = ({ ...props }) => {
  return (
    <div className="featured_layout">
      {props.array.map((item: IKeys, index: number) => (
        <NavLink to={`/BookExplanation/comic/${item.id}`} key={index}>
          <Featured root={item.src} title={item.title} creator={item.creator} />
        </NavLink>
      ))}
    </div>
  );
};

export default FeaturedLayout;
