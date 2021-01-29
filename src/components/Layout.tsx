import * as React from "react";
import Header from "../containers/Header";
import BottomNav from "../containers/BottomNav";

interface LayoutIProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutIProps> = ({ ...props }) => {
  return (
    <React.Fragment>
      <Header />
      <main className="main">{props.children}</main>
      <BottomNav />
    </React.Fragment>
  );
};

export default Layout;
