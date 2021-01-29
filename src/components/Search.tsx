import * as React from "react";
import SearchTag from "./SearchTag";
import { NavLink } from "react-router-dom";

export interface IKeys {
  id: number;
  root: string;
  title: string;
  user: string;
}

interface SearchIProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  hideTrend: () => void;
  searchResultPosts: IKeys[];
  trend: boolean;
}

const Search: React.FC<SearchIProps> = ({ ...props }) => {
  return (
    <React.Fragment>
      <div style={{ minHeight: "78.5vh" }}>
        <div className="search_wrap">
          <input
            type="text"
            onChange={props.onSearch}
            placeholder="&#xf002; 作品を探す"
            onClick={props.hideTrend}
          />
        </div>
        <div style={{ paddingTop: "61px" }}>
          {props.trend ? (
            <React.Fragment>
              <SearchTag trends="1・トレンド" tag="甘き恋にはチョコレートを" />
              <SearchTag trends="2・トレンド" tag="“I”を忘れた人魚姫" />
              <SearchTag trends="3・トレンド" tag="恋日" />
              <SearchTag trends="4・トレンド" tag="路地裏とネコ" />
              <SearchTag trends="5・トレンド" tag="虚ろなセカイと死神嬢" />
              <SearchTag trends="運営のおすすめ" tag="Spring Works" />
            </React.Fragment>
          ) : (
            <div className="library_layout">
              {props.searchResultPosts.map(
                (post: IKeys, index: string | number) => (
                  <NavLink
                    to={`/BookExplanation/AllComics/${post.id}`}
                    key={index}
                  >
                    <div className="library_box">
                      <div className="library_wrap">
                        <img src={post.root} alt="book" />
                      </div>
                      <p className="library_title">{post.title}</p>
                      <p className="library_favorite">{post.user}</p>
                      <p className="test">
                        <i className="fas fa-star"></i>5
                      </p>
                    </div>
                  </NavLink>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Search;
