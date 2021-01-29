import * as React from "react";

interface FeaturedIProps {
  root: string;
  title: string;
  creator: string;
}

const Featured: React.FC<FeaturedIProps> = ({ ...props }) => {
  React.useEffect(() => {
    new (window as typeof globalThis).Image().src = props.root;
  }, [props.root]);

  return (
    <div className="featured_wrap">
      <p>
        <img src={props.root} alt="featured" />
      </p>
      <div className="featured_text">
        <p className="featured_title">{props.title}</p>
        <p className="featured_creator">{props.creator}</p>
      </div>
    </div>
  );
};

export default Featured;
