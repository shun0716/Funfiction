import * as React from "react";

interface DetailsRecommendIProps {
  root: string;
  title: string;
}

const DetailsRecommend: React.FC<DetailsRecommendIProps> = ({ ...props }) => {
  React.useEffect(() => {
    new (window as typeof globalThis).Image().src = props.root;
  });

  return (
    <div className="details_recommend_box">
      <div className="Image_wrap">
        <img src={props.root} alt="book" />
      </div>
      <p className="Image_title">{props.title}</p>
      <p className="Image_favorite">No Copy Right Girl</p>
      <p className="test">
        <i className="fas fa-star"></i>5
      </p>
    </div>
  );
};

export default DetailsRecommend;
