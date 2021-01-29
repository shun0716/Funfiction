import * as React from "react";

interface SupportDoneModalIProps {
  isDoneModalClose: () => void;
  isDoneModal: boolean;
}

const SupportDoneModal: React.FC<SupportDoneModalIProps> = ({ ...props }) => {
  return (
    <div
      className={`done_modal_wrap ${props.isDoneModal && "done_modal_is-show"}`}
    >
      <img
        src="/icons/batsu02.svg"
        alt="close"
        className="done_modal_close"
        onClick={props.isDoneModalClose}
      />
      <div className="done_modal">
        <div className="done_support_user">
          <img src="/icons/userIcon01.png" alt="icon" />
          <p className="done_support_user_name">
            No Copy Right Girl<span className="honorific">さん</span>
          </p>
          <div className="done_user_message">
            <p>応援ありがとうございます！</p>
            <p>これからもよろしくね！</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportDoneModal;
