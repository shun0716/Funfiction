import * as React from "react";
import FullWidthTabs from "../containers/FullWidthTabs";
import SupportModal from "../containers/SupportModal";
import ErrorModal from "./ErrorModal";

interface BookListProps {
  src: string;
  title: string;
  creator: string;
  comic_background: React.RefObject<HTMLInputElement>;
  favButton: string;
  bookDetailsComicID: number;
  point: number;
  choicePoint: number;
  favStatus: boolean;
  isDoneModal: boolean;
  load: boolean;
  setisDoneModal: React.Dispatch<React.SetStateAction<boolean>>;
  comment: string;
  eModal: boolean;
  lCheck: boolean;
  favoriteStatusChange: () => void;
  support: () => void;
  pointSelection: (number: number) => void;
  getComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BookExplanationList: React.FC<BookListProps> = ({ ...props }) => {
  const [modal, setModal] = React.useState(false);

  const isModalOpen = () => {
    setModal(true);
  };

  const isModalclose = () => {
    setModal(false);
  };

  const isDoneModalClose = () => {
    setModal(false);
    props.setisDoneModal(false);
  };

  return (
    <div className="details_wrap">
      <div className="details_top" ref={props.comic_background}>
        <div className="details_layout">
          <img src={props.src} alt="presentation" height="160" />
          <div className="details_info">
            <p className="details_title">{props.title}</p>
            <p className="details_creator">{props.creator}</p>
            <div className="details_button_box">
              <p>
                <button
                  disabled={props.lCheck}
                  className={
                    props.favStatus
                      ? "details_favorite_true"
                      : "details_favorite"
                  }
                  onClick={props.favoriteStatusChange}
                >
                  <i className="far fa-star"></i>
                  {props.favButton}
                </button>
              </p>
              <p>
                <button
                  disabled={props.lCheck}
                  className="details_support"
                  onClick={isModalOpen}
                >
                  <i className="far fa-thumbs-up"></i>
                  応援する
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <FullWidthTabs bookDetailsComicID={props.bookDetailsComicID} />
      <SupportModal
        support={props.support}
        pointSelection={props.pointSelection}
        point={props.point}
        choicePoint={props.choicePoint}
        load={props.load}
        modal={modal}
        isModalclose={isModalclose}
        isDoneModalClose={isDoneModalClose}
        isDoneModal={props.isDoneModal}
        getComment={props.getComment}
        comment={props.comment}
      />
      <ErrorModal eModal={props.eModal} />
    </div>
  );
};

export default BookExplanationList;
