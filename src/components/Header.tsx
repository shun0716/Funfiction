import * as React from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import HeaderSearchModal from "./HeaderSearchModal";
import TemporaryDrawer from "../containers/TemporaryDrawer";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { IKeys } from "./Search";
import { NavLink } from "react-router-dom";

interface HeaderIProps {
  backButton: boolean;
  headerBar: boolean;
  headerTitle: string;
  modal: boolean;
  modalBox: boolean;
  modalText: boolean;
  searchResultPosts: IKeys[];
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  back: () => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const Header: React.FC<HeaderIProps> = ({ ...props }) => {
  return (
    <React.Fragment>
      {props.headerBar && (
        <header className="header">
          <nav className="back">
            {props.backButton && (
              <ArrowBackIosRoundedIcon onClick={props.back} />
            )}
          </nav>
          {props.headerTitle === "Funfiction" ? (
            <h1>
              <img src="/icons/logo_fin.png" alt="logo" width="100" />
            </h1>
          ) : (
            <h1>{props.headerTitle}</h1>
          )}
          <nav className="header_search">
            <NavLink to="/Search" activeClassName="active">
              <SearchRoundedIcon />
            </NavLink>
          </nav>
        </header>
      )}

      {props.headerBar && (
        <header className="pc_header">
          <div className="pc_header_items">
            <TemporaryDrawer />
            <h1>
              <img src="/icons/logo_fin.png" alt="logo" width="150" />
            </h1>
            <div className="pc_search">
              <input
                type="text"
                placeholder="&#xf002; 作品名・作者名で検索"
                onChange={props.onSearch}
                onClick={() => {
                  props.setModal(true);
                }}
              />
            </div>
          </div>
          <div className="pc_favorite">
            <NavLink to="/Library">
              <FavoriteRoundedIcon />
            </NavLink>
          </div>
        </header>
      )}

      <HeaderSearchModal
        modal={props.modal}
        modalBox={props.modalBox}
        modalText={props.modalText}
        setModal={props.setModal}
        searchResultPosts={props.searchResultPosts}
      />
    </React.Fragment>
  );
};

export default Header;
