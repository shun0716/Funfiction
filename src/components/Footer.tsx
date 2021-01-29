import * as React from "react";
import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="footer_wrap">
      <div className="footer_layout">
        <p className="footer_logo">
          <img src="./icons/logo.png" alt="logo" width="250" />
        </p>
        <div className="footer_terms">
          <NavLink to="/TermsOfService" className="terms_of_service">
            <p>利用規約</p>
          </NavLink>
          <NavLink to="/PrivacyPolicy">
            <p>プライバシーポリシー</p>
          </NavLink>
        </div>
      </div>
      <p className="copyright">Copyright Fanfiction all right reserved</p>
    </div>
  );
};

export default Footer;
