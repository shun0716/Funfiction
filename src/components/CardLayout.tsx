import * as React from "react";
import ImgMediaCard from "../containers/ImgMediaCard";
import { NavLink } from "react-router-dom";
import { IKeys } from "./Home";

export interface CardLayoutIProps {
  array: IKeys[];
}

const CardLayout: React.FC<CardLayoutIProps> = ({ ...props }) => {
  return (
    <div className="image_layout">
      {props.array.map((item: IKeys, index: number) => (
        <NavLink to={`/BookExplanation/comic/${item.id}`} key={index}>
          <ImgMediaCard
            image={item.src}
            title={item.title}
            creator={item.creator}
            favorite={item.favorite}
          />
        </NavLink>
      ))}
    </div>
  );
};

export default CardLayout;
