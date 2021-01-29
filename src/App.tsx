import * as React from "react";
import Layout from "./containers/Layout";
import ScrollToTopOnMount from "./components/ScrollToTopOnMount";
import "./styles/App.scss";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { pages, PageItem } from "./components/config/RouterData";
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const currentkey: string = location.pathname.split("/")[1] || "";
  return (
    <Layout>
      <TransitionGroup>
        <CSSTransition key={currentkey} classNames="fade" timeout={210}>
          <React.Fragment>
            <ScrollToTopOnMount />
            <Switch location={location}>
              {pages.map((page: PageItem, index: number) => (
                <Route
                  key={index}
                  exact={page.exact}
                  path={page.path}
                  component={page.component}
                />
              ))}
            </Switch>
          </React.Fragment>
        </CSSTransition>
      </TransitionGroup>
    </Layout>
  );
};

export default withRouter(App);
