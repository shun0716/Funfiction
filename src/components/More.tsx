import * as React from "react";

interface IPropsMore {
  title: string;
  word: string;
  creator: string;
  src: string;
}

const More: React.FC<IPropsMore> = ({ ...props }) => {
  return (
    <div className="Mores">
      <div>
        <img src={props.src} alt="presentation" width="100" />
      </div>
      <div className="chararea">
        <p style={{ fontWeight: "bold" }}>{props.title}</p>
        <p style={{ color: "#808080", fontSize: "12px", paddingTop: "7px" }}>
          {props.word}
        </p>
        <p style={{ color: "orange", fontSize: "10px", paddingTop: "10px" }}>
          {props.creator}
        </p>
      </div>
    </div>
  );
};

export default More;
