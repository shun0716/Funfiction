import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

interface SupportModalIProps {
  modal: boolean;
  point: number;
  comment: string;
  load: boolean;
  choicePoint: number;
  supportItemRamen: any;
  supportItemSushi: any;
  supportItemMeat: any;
  addSupport: () => void;
  isModalclose: () => void;
  getComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SupportModal: React.FC<SupportModalIProps> = ({ ...props }) => {
  return (
    <div className={`support_modal ${props.modal && "support_modal_is-show"}`}>
      <div className=" support_header">
        <img
          src="/icons/batsu01.svg"
          alt="close"
          className="support_close"
          onClick={props.isModalclose}
        />
        <div className="support_mypoint">
          <img src="/icons/coin.png" alt="coin" />
          <p>{props.point}</p>
          <i className="fas fa-plus"></i>
        </div>
      </div>
      <div className="support_user">
        <img src="/icons/userIcon01.png" alt="user" />
        <p>No Copy Right Girl</p>
      </div>
      <div className="support_comment">
        <input
          type="text"
          placeholder="素敵なコメントを添えて応援しよう"
          value={props.comment}
          onChange={props.getComment}
        />
      </div>
      <div className="support_box">
        <div className="support_point_choice">
          {props.supportItemRamen.map((item, index) => (
            <div
              key={index}
              className={item.item ? "ba" : "support_items_box"}
              onClick={item.function}
            >
              <img src={item.src} alt={item.alt} className="support_items" />
              <p>{item.name}</p>
              <div className="items_point_box">
                <img src={item.coin} alt="coin" />
                <p>{item.num}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="support_point_choice">
          {props.supportItemSushi.map((item, index) => (
            <div
              key={index}
              className={item.item ? "ba" : "support_items_box"}
              onClick={item.function}
            >
              <img src={item.src} alt={item.alt} className="support_items" />
              <p>{item.name}</p>
              <div className="items_point_box">
                <img src={item.coin} alt="coin" />
                <p>{item.num}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="size">
          <div className="support_point_choice">
            {props.supportItemMeat.map((item, index) => (
              <div
                key={index}
                className={item.item ? "ba" : "support_items_box"}
                onClick={item.function}
              >
                <img src={item.src} alt={item.alt} className="support_items" />
                <p>{item.name}</p>
                <div className="items_point_box">
                  <img src={item.coin} alt="coin" />
                  <p>{item.num}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {props.load ? (
          <div className="support_load">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <button
            className="support_submit button"
            onClick={props.addSupport}
            disabled={!props.choicePoint}
          >
            <div className="support_submit_wrap" id="kesu">
              <p className="support_char">応援する！</p>
              <div className="support_char_point_box">
                <img src="/icons/coin.png" alt="coin" />
                <p className="support_char_point">{props.choicePoint}</p>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default SupportModal;
