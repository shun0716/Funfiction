import * as React from "react";

interface ImageIProps {
  root: string;
  title: string;
  star: number | undefined;
}

const Image: React.FC<ImageIProps> = ({ ...props }) => {
  React.useEffect(() => {
    new (window as typeof globalThis).Image().src = props.root;
  });

  return (
    <div className="Image_box">
      <div className="Image_wrap">
        <img src={props.root} alt="book" />
      </div>
      <p className="Image_title">{props.title}</p>
      <p className="Image_favorite">No Copy Right Girl</p>
      <p className="test">
        <i className="fas fa-star"></i>
        {props.star}
      </p>
    </div>
  );
};

export default Image;
