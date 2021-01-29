import * as React from "react";
import Auth from "../containers/Auth";
import Registe from "../containers/Registe";
import Acceptance from "../containers/Acceptance";
import CheeringHistory from "../containers/CheeringHistory";
import Information from "./Information";
import { NavLink } from "react-router-dom";

interface MyPageIProps {
  userName: string;
  point: number;
  disabled: boolean;
  logout: () => void;
}

const MyPage: React.FC<MyPageIProps> = ({
  userName,
  point,
  disabled,
  logout,
}) => {
  return (
    <React.Fragment>
      <div className="mypage_height">
        <div className="user_wrap">
          <div className="user_info">
            <i className="fas fa-user"></i>
          </div>
          <div className="user_status">
            <p className="user_name">{userName}</p>
            <div className="user_point_system">
              <p className="user_point">保有ポイント</p>
              <img src="/icons/coin.png" alt="coin" />
              <p className="user_point_view">{point}</p>
            </div>
            <NavLink to="/PointBuy">
              <button className="user_point_buy" disabled={disabled}>
                ポイント購入
              </button>
            </NavLink>
          </div>
        </div>

        <div className="user_box">
          <div className="user_information">
            <i className="fas fa-user-plus"></i>
            <Registe />
          </div>
          <div className="user_point_history">
            <i className="fas fa-sign-in-alt"></i>
            {disabled ? (
              <Auth />
            ) : (
              <NavLink to="/">
                <p onClick={logout}>ログアウト</p>
              </NavLink>
            )}
          </div>
          <div className="user_support_box">
            <i className="fas fa-info-circle"></i>
            <Information />
          </div>
          <div className="user_post">
            <i className="fas fa-history"></i>
            <CheeringHistory />
          </div>
          <div className="user_contact">
            <i className="fas fa-gift"></i>
            <Acceptance />
          </div>
        </div>

        <section className="guideline">
          <NavLink to="/TermsOfService" className="terms_of_service">
            <p>利用規約</p>
            <i className="fas fa-chevron-right"></i>
          </NavLink>
          <NavLink to="/PrivacyPolicy">
            <p>プライバシーポリシー</p>
            <i className="fas fa-chevron-right"></i>
          </NavLink>
        </section>
      </div>
    </React.Fragment>
  );
};

export default MyPage;
