import * as React from "react";

interface IPropsSearch {
  trends: string;
  tag: string;
}

const SearchTag: React.FC<IPropsSearch> = ({ ...props }) => {
  return (
    <React.Fragment>
      <div className="search_menu">
        <span>{props.trends}</span>
        <p>{props.tag}</p>
      </div>
    </React.Fragment>
  );
};

export default SearchTag;
