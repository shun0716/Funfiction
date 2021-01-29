import * as React from "react";

interface RankingIProps {
  root: string;
  title: string;
  creator: string;
  crown?: string;
  ranknum: number;
  visibility?: "hidden";
  favorite: number;
}

const Ranking: React.FC<RankingIProps> = ({ ...props }) => {
  React.useEffect(() => {
    new (window as typeof globalThis).Image().src = props.root;
  }, [props.root]);

  return (
    <div className="ranking_wrap">
      <div className="ranking_left">
        <img
          src={props.crown}
          alt="ranking"
          style={{ visibility: props.visibility }}
        />
        <p>{props.ranknum}</p>
      </div>
      <div className="ranking_box">
        <p>
          <img src={props.root} alt="presentation" />
        </p>
        <div className="ranking_right">
          <p className="ranking_title">{props.title}</p>
          <p className="ranking_creator">{props.creator}</p>
          <p className="ranking_fav">
            <i className="fas fa-star"></i>
            {props.favorite}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
