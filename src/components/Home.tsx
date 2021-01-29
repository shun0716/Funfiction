import * as React from "react";
import Box from "./Box";
import Slider from "./Slider";
import Footer from "./Footer";
import { CardLayoutIProps } from "./CardLayout";

export interface IKeys {
  id: number;
  src: string;
  title: string;
  creator: string;
  favorite: number;
  crown?: string;
  visibility?: "hidden";
  star?: number;
}

export interface HomeItem {
  topic: string;
  more: string;
  component: React.FC<CardLayoutIProps>;
  array: IKeys[];
  grid: string;
}

interface HomeIProps {
  items: HomeItem[];
}

const Home: React.FC<HomeIProps> = ({ ...props }) => {
  return (
    <div className="home_layout">
      <Slider />
      <div className="box_grid_container">
        {props.items.map((item: HomeItem, index: number) => (
          <Box
            topic={item.topic}
            component={item.component}
            array={item.array}
            grid={item.grid}
            key={index}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
