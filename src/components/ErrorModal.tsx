import * as React from "react";

interface ErrorModalIProps {
  eModal: boolean;
}

const ErrorModal: React.FC<ErrorModalIProps> = ({ ...props }) => {
  return (
    <div className={`error_box ${props.eModal && "error_box_show"}`}>
      <p>ポイントが不足しています。</p>
    </div>
  );
};

export default ErrorModal;
